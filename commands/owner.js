/**
 * Owner Info Command
 * Display bot owner contact information
 */

module.exports = async (context) => {
  const { m } = context;

  const ownerInfo = `
╭─────────────────────────────╮
│     👤 BOT OWNER INFO       │
╰─────────────────────────────╯

📌 PRIMARY OWNER
├─ Name: Charlton
├─ WhatsApp: +254727411435
├─ Available: 24/7
└─ Response Time: Quick

📞 CONTACT METHODS
├─ 💬 WhatsApp: wa.me/254727411435
├─ 🐙 GitHub: github.com/roy107roy12-netizen
├─ 📧 Email: otienocharlton460@gmail.com
└─ 💻 Website: Coming Soon

🤖 BOT INFORMATION
├─ Name: Charlton-XMD
├─ Version: 1.0.0
├─ Status: ✅ ACTIVE
└─ Last Update: 2026-05-24

⚠️ FOR SUPPORT & HELP
├─ WhatsApp: +254727411435
├─ Type: .help [command]
├─ Report Issues: Contact owner
└─ Feature Requests: Contact owner

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

💡 Need help? Contact the owner via WhatsApp
  `;

  return m.reply(ownerInfo);
};
