/**
 * Ping Command - Check bot response time
 */

module.exports = async (context) => {
  const { m } = context;
  const now = Date.now();
  
  try {
    const reply = await m.reply('🏓 Pong!');
    const latency = Date.now() - now;
    
    await reply.edit(`🏓 Pong!\n⚡ Response time: ${latency}ms`);
  } catch (error) {
    return m.reply('❌ Error: ' + error.message);
  }
};
