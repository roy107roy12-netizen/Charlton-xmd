module.exports = {
  name: 'time',
  description: 'Get current time',
  usage: '!time',
  async execute(sock, message, args, sender, senderName, isGroup) {
    const now = new Date();
    const timeString = now.toLocaleString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true,
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
    
    await sock.sendMessage(sender, {
      text: `⏰ *Current Time*\n\n${timeString}`
    });
  }
};
