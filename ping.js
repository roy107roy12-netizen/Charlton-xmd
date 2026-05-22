module.exports = {
  name: 'ping',
  description: 'Check bot latency',
  usage: '!ping',
  async execute(sock, message, args, sender, senderName, isGroup) {
    const startTime = Date.now(); // ✅ Capture start time FIRST
    
    await sock.sendMessage(sender, {
      text: `🏓 Pong!\n⏱️ Latency: ${Date.now() - startTime}ms\n✅ Bot is online!`
    });
  }
};
