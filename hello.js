module.exports = {
  name: 'hello',
  description: 'Get a personalized greeting',
  usage: '!hello [name]',
  async execute(sock, message, args, sender, senderName, isGroup) {
    const name = args.length > 0 ? args.join(' ') : senderName;
    
    await sock.sendMessage(sender, {
      text: `👋 Hello ${name}! Welcome to the WhatsApp Bot! 🎉\n\nType !menu to see all available commands.`
    });
  }
};
