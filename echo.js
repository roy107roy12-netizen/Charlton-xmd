module.exports = {
  name: 'echo',
  description: 'Echo back your message',
  usage: '!echo [text]',
  async execute(sock, message, args, sender, senderName, isGroup) {
    if (args.length === 0) {
      await sock.sendMessage(sender, {
        text: '❌ Please provide text to echo!\n📝 Usage: !echo [text]'
      });
      return;
    }
    
    const echoText = args.join(' ');
    
    await sock.sendMessage(sender, {
      text: `🔊 *Echo:* ${echoText}`
    });
  }
};
