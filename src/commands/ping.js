const pino = require('pino');
const log = pino({ transport: { target: 'pino-pretty' } });

module.exports = {
  name: 'ping',
  description: 'Check bot latency',
  usage: '!ping',
  async execute(sock, message, args, sender, senderName, isGroup) {
    const startTime = Date.now();
    
    const sentMessage = await sock.sendMessage(sender, {
      text: '🏓 Pong!'
    });
    
    const latency = Date.now() - startTime;
    
    // Send latency info
    await sock.sendMessage(sender, {
      text: `🏓 Pong!\n⏱️ Latency: ${latency}ms`
    });
    
    log.info(`Ping command executed. Latency: ${latency}ms`);
  }
};
