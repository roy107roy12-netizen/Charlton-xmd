const pino = require('pino');
const log = pino({ transport: { target: 'pino-pretty' } });

module.exports = {
  name: 'hello',
  description: 'Greet the user',
  usage: '!hello [name]',
  async execute(sock, message, args, sender, senderName, isGroup) {
    const name = args.length > 0 ? args.join(' ') : senderName;
    
    const greetingText = `
👋 Hello ${name}!

Welcome to the WhatsApp Bot!
I'm here to help you with various commands.

Type !menu to see what I can do.`;

    await sock.sendMessage(sender, {
      text: greetingText.trim()
    });

    log.info(`Hello command executed for: ${name}`);
  }
};
