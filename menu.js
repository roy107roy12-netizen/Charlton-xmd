module.exports = {
  name: 'menu',
  description: 'Display available commands',
  usage: '!menu',
  async execute(sock, message, args, sender, senderName, isGroup) {
    const menuText = `
╔════════════════════════════════╗
║   🤖 WhatsApp Bot Menu 🤖   ║
╠════════════════════════════════╣
║ !ping         - Check bot latency
║ !menu         - Show this menu
║ !hello [name] - Get a greeting
║ !time         - Get current time
║ !echo [text]  - Echo back message
╚════════════════════════════════╝

💡 *Tip:* Just say "hello", "thanks", or "goodbye" for auto-replies!
    `;
    
    await sock.sendMessage(sender, {
      text: menuText
    });
  }
};
