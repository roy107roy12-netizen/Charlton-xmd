// commands/about.js
const { charlton } = require('../commandHandler');

module.exports = charlton(
    {
        name: 'about',
        description: 'About this bot',
        category: 'Info',
        usage: '.about',
        react: 'ℹ️',
    },
    async (sock, msg) => {
        const from = msg.key.remoteJid;

        const aboutText = `
╔════════════════════════════════╗
   ℹ️ ABOUT CHARLTON-XMD ℹ️
╚════════════════════════════════╝

🤖 *Bot Name:* CHARLTON-XMD
📦 *Version:* 1.0.0
🔧 *Engine:* Baileys WhatsApp API
💻 *Language:* Node.js
💾 *Database:* SQLite/PostgreSQL
⚡ *Status:* Active & Online

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✨ *Features:*
✅ Modern Command System
✅ Fast & Reliable
✅ Easy to Deploy
✅ Customizable Prefix
✅ Group & DM Support
✅ No MongoDB Required

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📍 *Hosted On:* Heroku
👤 *Developer:* Charlton
🔗 *Repository:* GitHub
📧 *Contact:* otienocharlton460@gmail.com

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Type ${process.env.PREFIX || '.'}support for support link
Type ${process.env.PREFIX || '.'}owner for owner details

Made with ❤️ by Charlton
        `;

        try {
            await sock.sendMessage(from, { text: aboutText });
        } catch (error) {
            console.error('About command error:', error);
        }
    }
);
