// commands/menu.js
const { charlton } = require('../commandHandler');

module.exports = charlton(
    {
        name: 'menu',
        description: 'Display bot menu',
        category: 'General',
        usage: '.menu',
        react: '📋',
    },
    async (sock, msg) => {
        const prefix = process.env.PREFIX || '.';
        const from = msg.key.remoteJid;

        const menuText = `
╔════════════════════════════════╗
   🤖 CHARLTON-XMD BOT MENU 🤖
╚════════════════════════════════╝

👋 *Welcome to Charlton-XMD!*

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

⚡ *CORE COMMANDS*
  ${prefix}ping - Check bot speed
  ${prefix}uptime - Bot uptime
  ${prefix}help - Full command list
  ${prefix}menu - This menu

😂 *FUN COMMANDS*
  ${prefix}joke - Random joke
  ${prefix}quote - Motivational quote
  ${prefix}dice - Roll dice 🎲
  ${prefix}hello - Greeting
  ${prefix}random - Random number

ℹ️ *BOT INFO*
  ${prefix}about - About bot
  ${prefix}owner - Owner info
  ${prefix}support - Support link
  ${prefix}source - Source code

👨‍💼 *ADMIN COMMANDS*
  ${prefix}promote [@user] - Make admin
  ${prefix}demote [@user] - Remove admin
  ${prefix}kick [@user] - Remove member

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📝 *How to Use:*
  Type: ${prefix}command [arguments]
  Example: ${prefix}help ping

💡 *Need Help?*
  Type ${prefix}help for detailed information
  Type ${prefix}support for support link

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✨ Features:
  ✅ Fast & Reliable
  ✅ Easy to Use
  ✅ Regularly Updated
  ✅ 24/7 Available

Made with ❤️ by Charlton
        `;

        try {
            await sock.sendMessage(from, { text: menuText });
        } catch (error) {
            console.error('Menu command error:', error);
        }
    }
);
