module.exports = {
  name: 'antidelete',
  description: 'Anti-delete feature to recover deleted messages',
  usage: '.antidelete',
  aliases: ['nodelelete', 'savemsgs', 'antiremove'],
  async execute(sock, message, args, sender, senderName, isGroup) {
    if (!global.antideleteEnabled) {
      global.antideleteEnabled = new Set();
    }
    
    if (!global.deletedMessages) {
      global.deletedMessages = new Map();
    }
    
    const isEnabled = global.antideleteEnabled.has(sender);
    
    if (isEnabled) {
      global.antideleteEnabled.delete(sender);
      await sock.sendMessage(sender, {
        text: `❌ *ANTIDELETE DISABLED*\n\n🔓 Deleted messages will no longer be saved.`
      });
    } else {
      global.antideleteEnabled.add(sender);
      await sock.sendMessage(sender, {
        text: `✅ *ANTIDELETE ENABLED*\n\n🛡️ All deleted messages in this chat will be saved!\n\n📋 To view deleted messages, type: .viewdeleted\n\n⚠️ Note: Messages deleted before enabling antidelete cannot be recovered.`
      });
    }
  }
};