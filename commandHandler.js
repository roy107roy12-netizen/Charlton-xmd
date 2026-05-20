const path = require('path');
const fs = require('fs');

// ==============================
// Load Commands
// ==============================

const commands = new Map();
const aliases = new Map();

const commandsPath = path.join(__dirname, 'commands');

if (!fs.existsSync(commandsPath)) {
    fs.mkdirSync(commandsPath, { recursive: true });
}

const commandFiles = fs
    .readdirSync(commandsPath)
    .filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    try {
        const filePath = path.join(commandsPath, file);
        const command = require(filePath);

        // Validate command structure
        if (!command || !command.name || typeof command.execute !== 'function') {
            console.warn(`[WARNING] Invalid command file skipped: ${file}`);
            continue;
        }

        const commandName = command.name.toLowerCase();

        // Register main command
        commands.set(commandName, command);

        // Register aliases
        if (Array.isArray(command.aliases)) {
            command.aliases.forEach(alias => {
                aliases.set(alias.toLowerCase(), commandName);
            });
        }

        console.log(`[COMMAND LOADED] ${commandName}`);

    } catch (err) {
        console.error(`[ERROR LOADING COMMAND] ${file}`, err);
    }
}

// ==============================
// Command Handler
// ==============================

async function commandHandler(
    sock,
    message,
    messageText,
    sender,
    senderName,
    isGroup
) {
    try {

        // ==============================
        // PREFIX
        // ==============================

        const prefix = '.';

        // Ignore empty messages
        if (!messageText || typeof messageText !== 'string') {
            return false;
        }

        // Ignore messages without prefix
        if (!messageText.startsWith(prefix)) {
            return false;
        }

        // Remove prefix
        const body = messageText.slice(prefix.length).trim();

        // Ignore empty commands
        if (!body.length) {
            return false;
        }

        // Split arguments
        const args = body.split(/\s+/);
        const commandInput = args.shift().toLowerCase();

        // Resolve alias
        const resolvedName =
            aliases.get(commandInput) || commandInput;

        // Find command
        const command = commands.get(resolvedName);

        if (!command) {
            await sock.sendMessage(sender, {
                text: `❌ Unknown command: ${commandInput}`
            });

            return true;
        }

        // ==============================
        // Cooldown System
        // ==============================

        if (!global.commandCooldowns) {
            global.commandCooldowns = new Map();
        }

        const cooldownKey = `${sender}_${resolvedName}`;
        const cooldown = command.cooldown || 3;

        if (global.commandCooldowns.has(cooldownKey)) {
            const expirationTime =
                global.commandCooldowns.get(cooldownKey) + cooldown * 1000;

            if (Date.now
