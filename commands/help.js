/**
 * Help Command - Show command documentation
 * With mandatory channel join requirement
 */

module.exports = async (context) => {
  const { m, args } = context;

  // Channel requirement info
  const channelRequired = `
╭─────────────────────────────╮
│  ⚠️ IMPORTANT - MANDATORY  │
╰─────────────────────────────╯

📢 TO USE THIS BOT YOU MUST:

1️⃣ Join the Official Channel
   👉 https://whatsapp.com/channel/0029Vb8CRCa3GJP6wd0XtW0t

2️⃣ Do NOT Leave the Channel
   While using this bot, you CANNOT leave the channel

3️⃣ Channel Benefits
   ✅ Latest bot updates
   ✅ Feature announcements
   ✅ Security notices
   ✅ Support information

━━━━━━━━━━━━━━━━━━━━━━━━━━━━

⚠️ NOT FOLLOWING THIS RULE?
└─ Your bot access will be SUSPENDED
`;

  const commands = {
    antidelete: 'Restore automatically deleted messages',
    antistatus: 'Block or auto-delete status updates',
    security: 'Manage all security settings',
    ping: 'Check bot response time',
    menu: 'Show all available commands',
    owner: 'Show bot owner information & contact',
    admin: 'Admin panel for bot management',
    help: 'Display help information'
  };

  if (args[0]) {
    const cmd = args[0].toLowerCase();
    if (commands[cmd]) {
      return m.reply(`📖 *Help: ${cmd}*\n\n${commands[cmd]}\n\n${channelRequired}`);
    }
    return m.reply('❌ Command not found. Type .help to see all commands');
  }

  let helpText = `
╭─────────────────────────────╮
│      📚 HELP MENU           │
╰─────────────────────────────╯

🎯 *AVAILABLE COMMANDS*

Security Commands:
├─ .antidelete  - Restore deleted messages
├─ .antistatus  - Auto-delete status updates
├─ .security    - Manage security settings
└─ .admin       - Admin dashboard

General Commands:
├─ .menu        - Show all bot commands
├─ .ping        - Check bot response
├─ .owner       - Owner contact info
├─ .help        - This help menu
└─ .admin       - Management panel

📖 USAGE:
• Type: .help <command>
• Example: .help antidelete

━━━━━━━━━━━━━━━━━━━━━━━━━━━━

${channelRequired}

💬 QUICK SUPPORT
├─ Owner: +254727411435
├─ Channel: https://whatsapp.com/channel/0029Vb8CRCa3GJP6wd0XtW0t
└─ Email: otienocharlton460@gmail.com

🔗 IMPORTANT LINKS:
├─ GitHub: github.com/roy107roy12-netizen
├─ Version: 1.0.0
└─ Status: ✅ ACTIVE
  `;

  return m.reply(helpText);
};
