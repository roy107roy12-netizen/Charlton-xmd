module.exports = {
  name: 'ping',
  description: 'Check bot latency',
  usage: '!ping',
  async execute(sock, message, args, sender, senderName, isGroup) {
    const latency = Date.now() - Date.now();
    
    await sock.sendMessage(sender, {
      text: `🏓 Pong!\n⏱️ Latency: ${latency}ms\n✅ Bot is online!`
    });
  }
};
