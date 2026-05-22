````markdown name=DEPLOY_QUICK_START.md url=https://github.com/roy107roy12-netizen/Whatsapp-bot/blob/main/DEPLOY_QUICK_START.md
# 🚀 WhatsApp Bot - Quick Deploy

[![Deploy on Render](https://img.shields.io/badge/Deploy%20on-Render-46E3B7?style=for-the-badge&logo=render)](https://render.com)
[![Fork on GitHub](https://img.shields.io/badge/Fork%20on-GitHub-181717?style=for-the-badge&logo=github)](https://github.com/roy107roy12-netizen/Whatsapp-bot/fork)
[![Pair with WhatsApp](https://img.shields.io/badge/Pair%20with-WhatsApp-25D366?style=for-the-badge&logo=whatsapp)](https://www.whatsapp.com/)

---

## 📱 What is This?

A **production-ready WhatsApp bot** built with Node.js & Baileys that:
- 🤖 Responds to commands (`.ping`, `.menu`, `.time`, `.echo`)
- 💬 Auto-replies to messages
- 🔗 Pairs with your WhatsApp account
- ⏱️ Runs 24/7 on Render
- 🆓 Completely free to deploy

---

## ⚡ 3-Step Deployment

### **Step 1️⃣: Fork the Repository**

```bash
Click the Fork button → Choose your account
```

[![Fork Now](https://img.shields.io/badge/🍴%20FORK%20NOW-blue?style=flat-square&labelColor=black&color=555)](https://github.com/roy107roy12-netizen/Whatsapp-bot/fork)

---

### **Step 2️⃣: Deploy to Render**

1. Go to **[render.com](https://render.com)**
2. Sign up with GitHub
3. Click **New → Web Service**
4. Select your forked repository
5. Configure:
   - **Name:** `whatsapp-bot`
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
   - **Plan:** Free

**Environment Variables** (add these):
```
NODE_ENV = production
PORT = 3000
PREFIX = .
SESSION_ID = default_session
OWNER_NUMBER = your_whatsapp_number
```

6. Click **Deploy** 🚀

[![Deploy to Render](https://render.com/images/deploy-to-render-button.svg)](https://render.com)

---

### **Step 3️⃣: Pair Your WhatsApp**

1. After deployment, visit your Render URL (e.g., `https://whatsapp-bot-xxx.onrender.com`)
2. Enter your WhatsApp number (with country code, e.g., `254712345678`)
3. Click **"Get Pair Code"**
4. Open WhatsApp → **Linked Devices → Link with phone number**
5. Scan the QR code from the browser
6. ✅ Bot is now live 24/7!

---

## 🎮 Bot Commands

Send messages with prefix `.`

| Command | Function | Example |
|---------|----------|---------|
| `.ping` | Check latency | `.ping` → `Pong! Latency: 45ms` |
| `.menu` | Show commands | `.menu` → Shows all available commands |
| `.time` | Current time | `.time` → Shows current time |
| `.echo` | Echo message | `.echo Hello` → Echoes "Hello" |
| `.hello` | Greet user | `.hello` → Returns greeting |

**Auto-replies** (no prefix needed):
- Say "hello" → Gets greeted 👋
- Say "thanks" → Gets thanked 😊
- Say "help" → Gets assistance guidance 🆘

---

## 🔧 System Requirements

✅ Node.js 14+ (handled by Render)
✅ Valid WhatsApp account
✅ Internet connection
✅ Free Render account

---

## 📊 What's Included?

```
✅ Pair code generation UI
✅ Command handler system
✅ Auto-reply triggers
✅ Error handling
✅ Logging with Pino
✅ Environment configuration
✅ Render deployment ready
```

---

## ⚠️ Important Notes

- 🔐 **Never share your session files** - Keep your `.env` private
- 📱 **Use your personal number** - Not a business account
- ⏱️ **24/7 uptime** - On free Render tier with limitations
- 💾 **Sessions persist** - Bot remembers connection across restarts
- 🔄 **Auto-restart** - Render auto-restarts if bot crashes

---

## 🛠️ Customization

### Add Custom Commands

Create a file in the root: `mycommand.js`

```javascript
module.exports = {
  name: 'mycommand',
  description: 'My custom command',
  usage: '.mycommand',
  async execute(sock, message, args, sender, senderName, isGroup) {
    await sock.sendMessage(sender, {
      text: '✅ My command works!'
    });
  }
};
```

### Change Command Prefix

Update in `render.yaml` or `.env`:
```
PREFIX = !
```

---

## 🐛 Troubleshooting

| Problem | Solution |
|---------|----------|
| **"Module not found: qrcode"** | Run `npm install` |
| **Bot not receiving messages** | Check Render logs |
| **QR code not showing** | Ensure browser can access Render URL |
| **Connection drops** | Free tier has restart cycles; upgrade to Starter |
| **Pairing code expired** | Refresh browser and get a new code |

---

## 📚 Full Documentation

See **[ERRORS_FOUND_AND_FIXED.md](./ERRORS_FOUND_AND_FIXED.md)** for:
- Detailed error fixes
- Advanced configuration
- Performance optimization
- Deployment troubleshooting

---

## 📞 Support

- 📖 [Render Documentation](https://render.com/docs)
- 🤖 [Baileys Library](https://github.com/WhiskeySockets/Baileys)
- 💬 [WhatsApp Official](https://www.whatsapp.com/)

---

## 🌟 Quick Links

| Action | Link |
|--------|------|
| 🍴 Fork | [Fork Repository](https://github.com/roy107roy12-netizen/Whatsapp-bot/fork) |
| 🚀 Deploy | [Deploy to Render](https://render.com) |
| 📱 WhatsApp | [Open WhatsApp](https://www.whatsapp.com/) |
| 🔗 Source | [View on GitHub](https://github.com/roy107roy12-netizen/Whatsapp-bot) |

---

## 📄 License

MIT License - Free to use and modify

---

**Made with ❤️ by Kaka | Deploy in Minutes, Run Forever 🚀**
````
