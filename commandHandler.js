const path = require('path');
const fs = require('fs');

const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

const commands = new Map();

for (const file of commandFiles) {
  const filePath = path.join(commandsPath, file);
  const command = require(filePath);
  if (command.name) {
    commands.set(command.name, command);
  }
}

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
    await command.execute(sock, message, args, sender, senderName, isGroup);
    return true;
  } catch (error) {
    console.error('Error executing command:', error);
    await sock.sendMessage(sender, {
      text: '❌ An error occurred while executing the command.'
    });
    return true;
  }
}

module.exports = { commandHandler };
