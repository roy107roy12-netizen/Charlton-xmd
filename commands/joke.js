// commands/joke.js
const { charlton } = require('../commandHandler');

const jokes = [
    { setup: "Why don't scientists trust atoms?", answer: "Because they make up everything! 😂" },
    { setup: "What do you call a fake noodle?", answer: "An impasta! 🍝" },
    { setup: "Why did the scarecrow win an award?", answer: "He was outstanding in his field! 🌾" },
    { setup: "What do you call a bear with no teeth?", answer: "A gummy bear! 🍬" },
    { setup: "Why don't eggs tell jokes?", answer: "They'd crack each other up! 🥚" },
    { setup: "What did the ocean say to the beach?", answer: "Nothing, it just waved! 🌊" },
    { setup: "Why don't skeletons fight each other?", answer: "They don't have the guts! 💀" },
    { setup: "What's orange and sounds like a parrot?", answer: "A carrot! 🥕" },
    { setup: "Did you hear about the mathematician who's afraid of negative numbers?", answer: "He'll stop at nothing to avoid them! 📐" },
    { setup: "Why did the coffee file a police report?", answer: "It got mugged! ☕" },
];

module.exports = charlton(
    {
        name: 'joke',
        description: 'Get a random joke',
        category: 'Fun',
        usage: '.joke',
        react: '😂',
    },
    async (sock, msg) => {
        const from = msg.key.remoteJid;
        const randomJoke = jokes[Math.floor(Math.random() * jokes.length)];

        const jokText = `
╔════════════════════════════════╗
     😂 JOKE FOR YOU 😂
╚════════════════════════════════╝

❓ ${randomJoke.setup}

💭 ...

✅ ${randomJoke.answer}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Want another? Type ${process.env.PREFIX || '.'}joke

Made with ❤️ by Charlton
        `;

        try {
            await sock.sendMessage(from, { text: jokText });
        } catch (error) {
            console.error('Joke command error:', error);
        }
    }
);
