const pino = require('pino');
const log = pino({ transport: { target: 'pino-pretty' } });

module.exports = {
  name: 'menu',
  description: 'Show available commands',
  usage: '!menu',
  async execute(sock, message, args, sender, senderName, isGroup) {
    const menuText = `
╔════════════════════════════════╗
║     🤖 WhatsApp Bot Menu       ║
╚════════════════════════════════╝

📌 Available Commands:

1️⃣ !ping
   → Check bot latency

2️⃣ !menu
   → Show this menu

3️⃣ !hello [name]
   → Get a personalized greeting

4️⃣ !time
   → Get current time

5️⃣ !echo [text]
   → Echo back your message

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

💡 Tip: Just say hello, thanks, or ask for help to trigger auto-replies!

═════════════════════════════════`;

    await sock.sendMessage(sender, {
      text: menuText.trim()
    });

    log.info('Menu command executed');
  }
};
