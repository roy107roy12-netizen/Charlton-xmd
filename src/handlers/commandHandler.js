const { readdirSync } = require('fs');
const path = require('path');
const pino = require('pino');

const log = pino({ transport: { target: 'pino-pretty' } });
const commands = new Map();

// Load all commands
function loadCommands() {
  const commandsPath = path.join(__dirname, '../commands');
  const commandFiles = readdirSync(commandsPath).filter(file => file.endsWith('.js'));

  for (const file of commandFiles) {
    const command = require(path.join(commandsPath, file));
    commands.set(command.name, command);
    log.info(`✅ Loaded command: ${command.name}`);
  }
}

loadCommands();

async function commandHandler(sock, message, messageText, sender, senderName, isGroup) {
  const prefix = process.env.PREFIX || '!';
  
  if (!messageText.startsWith(prefix)) {
    return false;
  }

  const args = messageText.slice(prefix.length).trim().split(/ +/);
  const commandName = args.shift().toLowerCase();

  const command = commands.get(commandName);

  if (!command) {
    return false;
  }

  try {
    log.info(`🚀 Executing command: ${commandName}`);
    await command.execute(sock, message, args, sender, senderName, isGroup);
    return true;
  } catch (error) {
    log.error(`Error executing command ${commandName}:`, error);
    await sock.sendMessage(sender, {
      text: `❌ Error executing command: ${error.message}`
    });
    return true;
  }
}

module.exports = { commandHandler };
