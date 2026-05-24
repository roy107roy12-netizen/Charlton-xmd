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
// CHANNEL MEMBERSHIP CHECK
// ==============================

async function isUserInChannel(sock, sender) {
    try {
        // Check user's channel memberships
        const userChannels = await sock.query({
            tag: 'query',
            attrs: { type: 'get', jid: 'channels' }
        });

        if (!userChannels || userChannels.length === 0) {
            console.warn(`⚠️ User ${sender} has no channel memberships`);
            return false;
        }

        return true;
    } catch (error) {
        console.warn(`⚠️ Channel verification failed for ${sender}:`, error.message);
        return false;
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
        // PREFIX VALIDATION
        // ==============================

        const prefix = process.env.PREFIX || '.';

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
        // CHANNEL MEMBERSHIP ENFORCEMENT
        // ==============================
        
        if (process.env.ENFORCE_CHANNEL_JOIN === 'true') {
            const inChannel = await isUserInChannel(sock, sender);
            
            if (!inChannel) {
                const channelUrl = process.env.REQUIRED_CHANNEL_URL || 'https://whatsapp.com/channel/0029Vb8CRCa3GJP6wd0XtW0t';
                await sock.sendMessage(sender, {
                    text: `❌ *Channel Membership Required*\n\n📢 You must join our channel to use this bot.\n\n🔗 *Join Channel:*\n${channelUrl}\n\n✅ After joining, you can use all bot commands!`
                });
                return true;
            }
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

            if (Date.now() < expirationTime) {
                const timeLeft = Math.ceil((expirationTime - Date.now()) / 1000);
                await sock.sendMessage(sender, {
                    text: `⏳ Wait ${timeLeft} second(s) before using this command again.`
                });

                return true;
            }
        }

        global.commandCooldowns.set(cooldownKey, Date.now());

        // ==============================
        // Execute Command
        // ==============================

        console.log(`[COMMAND EXECUTED] ${resolvedName} by ${senderName}`);

        await command.execute(
            sock,
            message,
            args,
            sender,
            senderName,
            isGroup
        );

        return true;

    } catch (error) {
        console.error('[ERROR IN COMMAND HANDLER]', error);

        try {
            await sock.sendMessage(sender, {
                text: `❌ An error occurred: ${error.message}`
            });
        } catch (err) {
            console.error('[ERROR SENDING ERROR MESSAGE]', err);
        }

        return true;
    }
}

module.exports = { commandHandler };
