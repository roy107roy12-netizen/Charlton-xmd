// commands/ping.js
const { charlton } = require('../commandHandler');

module.exports = charlton(
    {
        name: 'ping',
        description: 'Check bot response time',
        category: 'General',
        usage: '.ping',
        react: '⚡',
    },
    async (sock, msg) => {
        const from = msg.key.remoteJid;
        const startTime = Date.now();

        try {
            const sentMsg = await sock.sendMessage(from, { text: '🏓 Pinging...' });
            const endTime = Date.now();
            const responseTime = endTime - startTime;

            await sock.sendMessage(from, { 
                text: `
╔════════════════════════╗
     🏓 PONG! 🏓
╚════════════════════════╝

⚡ Response Time: ${responseTime}ms
📍 Status: ${responseTime < 500 ? '✅ Excellent' : responseTime < 1000 ? '⚠️ Good' : '❌ Slow'}
🤖 Bot: Online & Active

Made with ❤️ by Charlton
                ` 
            });
        } catch (error) {
            console.error('Ping command error:', error);
        }
    }
);
