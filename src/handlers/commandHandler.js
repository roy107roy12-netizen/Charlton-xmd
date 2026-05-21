const { readdirSync } = require('fs');
const path = require('path');
const pino = require('pino');
const fs = require('fs');

const log = pino({ transport: { target: 'pino-pretty' } });
const commands = new Map();

// Load all commands with error handling
function loadCommands() {
  const commandsPath = path.join(__dirname, '../commands');
  
  // Create commands directory if it doesn't exist
  if (!fs.existsSync(commandsPath)) {
    fs.mkdirSync(commandsPath, { recursive: true });
    log.warn(`⚠️ Created empty commands directory. Add commands to: ${commandsPath}`);
    return;
  }
  
  try {
    const commandFiles = readdirSync(commandsPath).filter(file => file.endsWith('.js'));

    if (commandFiles.length === 0) {
      log.warn('⚠️ No commands found in src/commands/');
      return;
    }

    for (const file of commandFiles) {
      try {
        const commandPath = path.join(commandsPath, file);
        const command = require(commandPath);
        
        // Validate command structure
        if (!command.name || !command.execute) {
          log.error(`❌ Command ${file} missing required properties (name, execute)`);
          continue;
        }
        
        commands.set(command.name, command);
        log.info(`✅ Loaded command: ${command.name}`);
      } catch (error) {
        log.error(`❌ Error loading command ${file}:`, error.message);
      }
    }
  } catch (error) {
    log.error('❌ Error reading commands directory:', error.message);
  }
}

loadCommands();

async function commandHandler(sock, message, messageText, sender, senderName, isGroup) {
  try {
    const prefix = process.env.PREFIX || '.';
    
    if (!messageText || typeof messageText !== 'string' || !messageText.startsWith(prefix)) {
      return false;
    }

    const args = messageText.slice(prefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();

    if (!commandName) {
      return false;
    }

    const command = commands.get(commandName);

    if (!command) {
      return false;
    }

    log.info(`🚀 Executing command: ${commandName}`);
    await command.execute(sock, message, args, sender, senderName, isGroup);
    return true;
  } catch (error) {
    log.error(`❌ Error in commandHandler:`, error.message);
    try {
      await sock.sendMessage(sender, {
        text: `❌ Error executing command: ${error.message}`
      });
    } catch (sendError) {
      log.error('❌ Error sending error message:', sendError.message);
    }
    return true;
  }
}

module.exports = { commandHandler };
