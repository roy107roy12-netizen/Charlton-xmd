// commands/help.js
const { charlton } = require('../commandHandler');

module.exports = charlton(
    {
        name: 'help',
        description: 'Show all available commands',
        category: 'General',
        usage: '.help [command]',
        react: '📚',
    },
    async (sock, msg, args) => {
        const prefix = process.env.PREFIX || '.';
        const from = msg.key.remoteJid;

        let helpText = `
╔════════════════════════════════╗
     🤖 CHARLTON-XMD HELP 🤖
╚════════════════════════════════╝

💬 *Command Usage:* ${prefix}command

📂 *Available Categories:*
  1️⃣ General Commands
  2️⃣ Fun & Entertainment  
  3️⃣ Bot Information
  4️⃣ Admin Commands

*Type:* ${prefix}help <command_name>
*Example:* ${prefix}help ping

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

*General Commands:*
  ${prefix}ping - Check bot response time ⚡
  ${prefix}menu - Display bot menu 📋
  ${prefix}uptime - Show bot uptime ⏱️
  ${prefix}echo <text> - Echo your message 📢

*Fun Commands:*
  ${prefix}hello - Get a greeting 👋
  ${prefix}joke - Random joke 😂
  ${prefix}quote - Inspirational quote 💭
  ${prefix}dice - Roll a dice 🎲
  ${prefix}random - Generate random number 🎯

*Bot Info:*
  ${prefix}about - About this bot ℹ️
  ${prefix}owner - Bot owner info 👤
  ${prefix}support - Get support link 🆘
  ${prefix}source - Source code link 💻

*Admin Commands:*
  ${prefix}promote [@user] - Promote user 📈
  ${prefix}demote [@user] - Demote user 📉
  ${prefix}kick [@user] - Remove user 🚫
  ${prefix}mute - Mute group 🔇
  ${prefix}unmute - Unmute group 🔊

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

💡 *Tips:*
  • Use ${prefix}help <command> for more info
  • Commands work in DM and groups
  • Some commands require admin rights

Made with ❤️ by Charlton
        `;

        if (args[0]) {
            const cmd = args[0].toLowerCase();
            const commands = {
                'ping': `${prefix}ping\n\nCheck if the bot is responding and show response time.`,
                'menu': `${prefix}menu\n\nDisplay the main bot menu with all features.`,
                'hello': `${prefix}hello\n\nGet a friendly greeting from the bot.`,
                'joke': `${prefix}joke\n\nReceive a random funny joke.`,
                'quote': `${prefix}quote\n\nGet an inspirational quote to motivate you.`,
                'dice': `${prefix}dice\n\nRoll a virtual dice (1-6).`,
            };

            if (commands[cmd]) {
                helpText = `\n📖 *Command Information*\n\n${commands[cmd]}`;
            }
        }

        try {
            await sock.sendMessage(from, { text: helpText });
        } catch (error) {
            console.error('Help command error:', error);
        }
    }
);
