/**
 * Anti-Delete Command
 * Prevents message deletion in private and group chats
 * Restores deleted messages automatically
 */

module.exports = async (context) => {
  const { m, sock, isGroup, from, args } = context;

  try {
    // Check if command is enable/disable
    const action = args[0]?.toLowerCase();

    if (!action || !['on', 'off', 'enable', 'disable'].includes(action)) {
      return m.reply('❌ Usage: .antidelete <on|off>');
    }

    const isEnable = ['on', 'enable'].includes(action);
    const chatId = isGroup ? from : m.sender;
    const chatType = isGroup ? 'Group' : 'Private';

    // Store in database/config
    global.antiDelete = global.antiDelete || {};
    global.antiDelete[chatId] = isEnable;

    const status = isEnable ? '✅ ENABLED' : '❌ DISABLED';
    const message = `${status}\n\n🛡️ Anti-Delete ${isEnable ? 'activated' : 'deactivated'} for ${chatType} chat\n\n${isEnable ? '📌 All deleted messages will be restored automatically' : 'Messages can be deleted normally'}`;

    return m.reply(message);
  } catch (error) {
    console.error('Anti-Delete Error:', error);
    return m.reply('❌ Error: ' + error.message);
  }
};

// Export handler for message events
module.exports.handleMessageDelete = async (context) => {
  const { sock, deletedMessage, chatId } = context;

  // Check if antidelete is enabled for this chat
  if (!global.antiDelete || !global.antiDelete[chatId]) return;

  try {
    // Restore the deleted message
    await sock.sendMessage(chatId, {
      text: `🔄 *Message Restored*\n\n${deletedMessage.text || '[Media Message]'}\n\n_This message was deleted by @${deletedMessage.sender}_`
    });
  } catch (error) {
    console.error('Failed to restore message:', error);
  }
};
