/**
 * Security Settings Manager
 * Manages all security features in one place
 */

module.exports = async (context) => {
  const { m, args, isGroup, from } = context;

  try {
    const chatId = isGroup ? from : m.sender;
    const chatType = isGroup ? 'Group' : 'Private';

    // Initialize global config
    global.securitySettings = global.securitySettings || {};
    global.securitySettings[chatId] = global.securitySettings[chatId] || {};

    const settings = global.securitySettings[chatId];
    const action = args[0]?.toLowerCase();
    const feature = args[1]?.toLowerCase();
    const value = args[2]?.toLowerCase();

    if (!action) {
      // Show current settings
      const settingsText = `
╭─────「 *Security Settings* 」──────
│
│ 🛡️ Chat Type: ${chatType}
│
│ 📌 Enabled Features:
│ • Anti-Delete: ${settings.antiDelete ? '✅' : '❌'}
│ • Anti-Status: ${settings.antiStatus ? '✅' : '❌'}
│ • Anti-Link: ${settings.antiLink ? '✅' : '❌'}
│ • Anti-Spam: ${settings.antiSpam ? '✅' : '❌'}
│ • Anti-Tag: ${settings.antiTag ? '✅' : '❌'}
│
│ 💡 Usage: .security <enable|disable> <feature>
│ Features: antidelete, antistatus, antilink, antispam, antitag
│
╰──────────────────────────────────╯
      `;
      return m.reply(settingsText);
    }

    if (!['enable', 'disable'].includes(action) || !feature) {
      return m.reply('❌ Usage: .security <enable|disable> <feature>');
    }

    const isEnable = action === 'enable';

    // Update setting
    settings[feature] = isEnable;

    const featureName = feature.charAt(0).toUpperCase() + feature.slice(1);
    const status = isEnable ? '✅ ENABLED' : '❌ DISABLED';

    return m.reply(`${status}\n\n${featureName} has been ${isEnable ? 'enabled' : 'disabled'} for this ${chatType.toLowerCase()}.`);
  } catch (error) {
    console.error('Security Settings Error:', error);
    return m.reply('❌ Error: ' + error.message);
  }
};
