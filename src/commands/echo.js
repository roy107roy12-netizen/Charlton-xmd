const pino = require('pino');
const log = pino({ transport: { target: 'pino-pretty' } });

module.exports = {
  name: 'echo',
  description: 'Echo back your message',
  usage: '!echo [text]',
  async execute(sock, message, args, sender, senderName, isGroup) {
    if (args.length === 0) {
      await sock.sendMessage(sender, {
        text: '❌ Please provide text to echo!\n\nUsage: !echo [your text]'
      });
      return;
    }

    const text = args.join(' ');
    const echoText = `
🔊 Echo:

"${text}"`;

    await sock.sendMessage(sender, {
      text: echoText.trim()
    });

    log.info(`Echo command executed: ${text}`);
  }
};
