// commands/dice.js
const { charlton } = require('../commandHandler');

module.exports = charlton(
    {
        name: 'dice',
        description: 'Roll a virtual dice',
        category: 'Fun',
        usage: '.dice',
        react: '🎲',
    },
    async (sock, msg) => {
        const from = msg.key.remoteJid;
        const diceResult = Math.floor(Math.random() * 6) + 1;
        
        const diceEmojis = ['❌', '1️⃣', '2️⃣', '3️⃣', '4️⃣', '5️⃣', '6️⃣'];
        const diceEmoji = diceEmojis[diceResult];

        const diceText = `
╔════════════════════════════════╗
        🎲 DICE ROLL 🎲
╚════════════════════════════════╝

Rolling the dice...

${diceEmoji} ${diceEmoji} ${diceEmoji}

🎯 You rolled: ${diceResult}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Want to roll again? Type ${process.env.PREFIX || '.'}dice

Made with ❤️ by Charlton
        `;

        try {
            await sock.sendMessage(from, { text: diceText });
        } catch (error) {
            console.error('Dice command error:', error);
        }
    }
);
