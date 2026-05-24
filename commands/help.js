/**
 * Help Command - Show command documentation
 */

module.exports = async (context) => {
  const { m, args } = context;

  const commands = {
    antidelete: 'Restore automatically deleted messages',
    antistatus: 'Block or auto-delete status updates',
    security: 'Manage all security settings',
    ping: 'Check bot response time',
    menu: 'Show all available commands',
    owner: 'Show bot owner information',
    help: 'Display help information'
  };

  if (args[0]) {
    const cmd = args[0].toLowerCase();
    if (commands[cmd]) {
      return m.reply(`📖 *Help: ${cmd}*\n\n${commands[cmd]}`);
    }
    return m.reply('❌ Command not found');
  }

  let helpText = `
╭─────「 *Help Menu* 」──────
│
│ 📚 Available Commands:
`;

  Object.entries(commands).forEach(([cmd, desc]) => {
    helpText += `│ • .${cmd} - ${desc}\n`;
  });

  helpText += `│
│ 💡 Usage: .help <command>
│
╰──────────────────────────────╯
  `;

  return m.reply(helpText);
};
