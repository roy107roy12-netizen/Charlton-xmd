/**
 * Owner Info Command
 */

module.exports = async (context) => {
  const { m } = context;

  const ownerInfo = `
╭─────「 *Bot Owner* 」──────
│
│ 👤 Name: Charlton
│ 📱 WhatsApp: +254712345678
│ 🌐 GitHub: roy107roy12-netizen
│ 📧 Email: otienocharlton460@gmail.com
│
│ 🤖 Bot: Charlton-XMD
│ ⭐ Version: 1.0.0
│
╰──────────────────────────────╯
  `;

  return m.reply(ownerInfo);
};
