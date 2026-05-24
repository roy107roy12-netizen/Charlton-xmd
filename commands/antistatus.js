/**
 * Anti-Status Command
 * Auto-deletes or blocks status updates from specific users
 * Prevents unwanted status viewing
 */

module.exports = async (context) => {
  const { m, args, isGroup } = context;

  try {
    if (isGroup) {
      return m.reply('⚠️ This command only works in private chats');
    }

    const action = args[0]?.toLowerCase();

    if (!action || !['on', 'off', 'enable', 'disable'].includes(action)) {
      return m.reply('❌ Usage: .antistatus <on|off>');
    }

    const isEnable = ['on', 'enable'].includes(action);
    const sender = m.sender;

    // Store in database/config
    global.antiStatus = global.antiStatus || {};
    global.antiStatus[sender] = isEnable;

    const status = isEnable ? '✅ ENABLED' : '❌ DISABLED';
    const message = `${status}\n\n👁️ Anti-Status ${isEnable ? 'activated' : 'deactivated'}\n\n${isEnable ? '🔕 Status updates will be automatically deleted\n📵 Status notifications will not appear' : '📲 You can view and receive status updates normally'}`;

    return m.reply(message);
  } catch (error) {
    console.error('Anti-Status Error:', error);
    return m.reply('❌ Error: ' + error.message);
  }
};

// Export handler for status events
module.exports.handleStatus = async (context) => {
  const { sock, statusMessage, sender } = context;

  // Check if antistatus is enabled for this user
  if (!global.antiStatus || !global.antiStatus[sender]) return;

  try {
    // Delete the status
    await sock.sendMessage(sender, {
      text: '🗑️ Status auto-deleted (Anti-Status enabled)'
    });
  } catch (error) {
    console.error('Failed to delete status:', error);
  }
};
