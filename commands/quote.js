// commands/quote.js
const { charlton } = require('../commandHandler');

const quotes = [
    { text: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
    { text: "Innovation distinguishes between a leader and a follower.", author: "Steve Jobs" },
    { text: "Life is what happens when you're busy making other plans.", author: "John Lennon" },
    { text: "The future belongs to those who believe in the beauty of their dreams.", author: "Eleanor Roosevelt" },
    { text: "It is during our darkest moments that we must focus to see the light.", author: "Aristotle" },
    { text: "The way to get started is to quit talking and begin doing.", author: "Walt Disney" },
    { text: "Don't let yesterday take up too much of today.", author: "Will Rogers" },
    { text: "You learn more from failure than from success.", author: "Unknown" },
    { text: "Success is not final, failure is not fatal.", author: "Winston Churchill" },
    { text: "Believe you can and you're halfway there.", author: "Theodore Roosevelt" },
    { text: "The best time to plant a tree was 20 years ago. The second best time is now.", author: "Chinese Proverb" },
    { text: "Success is not about money, it's about making a difference.", author: "Oprah Winfrey" },
];

module.exports = charlton(
    {
        name: 'quote',
        description: 'Get an inspirational quote',
        category: 'Fun',
        usage: '.quote',
        react: '💭',
    },
    async (sock, msg) => {
        const from = msg.key.remoteJid;
        const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];

        const quoteText = `
╔════════════════════════════════╗
   💭 INSPIRATIONAL QUOTE 💭
╚════════════════════════════════╝

"${randomQuote.text}"

— ${randomQuote.author}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Want another? Type ${process.env.PREFIX || '.'}quote

Made with ❤️ by Charlton
        `;

        try {
            await sock.sendMessage(from, { text: quoteText });
        } catch (error) {
            console.error('Quote command error:', error);
        }
    }
);
