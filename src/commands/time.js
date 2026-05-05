const pino = require('pino');
const log = pino({ transport: { target: 'pino-pretty' } });

module.exports = {
  name: 'time',
  description: 'Get current time',
  usage: '!time',
  async execute(sock, message, args, sender, senderName, isGroup) {
    const now = new Date();
    const timeText = `
⏰ Current Time

📅 Date: ${now.toLocaleDateString()}
🕐 Time: ${now.toLocaleTimeString()}
🌍 Timezone: ${Intl.DateTimeFormat().resolvedOptions().timeZone}`;

    await sock.sendMessage(sender, {
      text: timeText.trim()
    });

    log.info('Time command executed');
  }
};
