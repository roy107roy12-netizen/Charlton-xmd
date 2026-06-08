// commands/hello.js
const { charlton } = require('../commandHandler');

module.exports = charlton(
    {
        name: 'hello',
        description: 'Get a friendly greeting',
        category: 'Fun',
        usage: '.hello',
        react: '👋',
    },
    async (sock, msg) => {
        const from = msg.key.remoteJid;
        const greetings = [
            '👋 Hello! How are you today?',
            '🙋 Hey there! What\'s up?',
            '😊 Hi! Great to see you!',
            '🤖 Beep boop! Hello human!',
            '✨ Greetings! Ready to help!',
            '🎉 Hello my friend! Welcome!',
        ];

        const greeting = greetings[Math.floor(Math.random() * greetings.length)];

        try {
            await sock.sendMessage(from, { text: greeting });
        } catch (error) {
            console.error('Hello command error:', error);
        }
    }
);
