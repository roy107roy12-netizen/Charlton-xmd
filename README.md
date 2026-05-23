<div align="center">

# 🤖 Netizen WhatsApp Bot

[![Deploy to Heroku](https://www.herokucdn.com/deploy/button.svg)](https://dashboard.heroku.com/new?template=https://github.com/roy107roy12-netizen/Whatsapp-bot)

[![Fork this repo](https://img.shields.io/badge/Fork-this%20repo-blue?style=for-the-badge&logo=github)](https://github.com/roy107roy12-netizen/Whatsapp-bot/fork)

</div>

---

**A powerful WhatsApp Multi-Device Bot built with Baileys API**

---

## ✨ Features

- ✅ **Multi-Device Support** - Works with WhatsApp Web and Linked Devices
- ✅ **Pairing Code Authentication** - Secure pairing without QR codes
- ✅ **Custom Commands** - Easy command system to add your own functionality
- ✅ **Auto-Reply System** - Automatic responses to specific keywords
- ✅ **Fast & Stable** - Built with Baileys for reliability
- ✅ **Auto-Reconnect** - Handles disconnections gracefully
- ✅ **Error Handling** - Comprehensive error management
- ✅ **Easy Deployment** - Deploy to Heroku with one click
- ✅ **Public & Forkable** - Anyone can fork and deploy their own instance

---

## 🌐 Pair Site

The pair site is a web interface for pairing your WhatsApp account with the bot using a secure pairing code method.

### Online Pair Site
**Live URL:** https://kpl-26293a8556cb.herokuapp.com/

### Local Pair Site
When running the bot locally, access the pair site at:
**http://localhost:3000**

### How to Use Pair Site
1. Open the pair site URL
2. Enter your WhatsApp phone number (with country code)
3. Click "Get Pairing Code"
4. A code will be displayed on your WhatsApp linked device
5. Enter the code in the pair site
6. Your bot will be authenticated and ready to use!

---

## 🚀 Quick Deployment to Heroku

### One-Click Deploy

[![Deploy to Heroku](https://www.herokucdn.com/deploy/button.svg)](https://dashboard.heroku.com/new?template=https://github.com/roy107roy12-netizen/Whatsapp-bot)

**Click the button above to deploy instantly to Heroku!**

### Manual Heroku Deployment

```bash
# 1. Install Heroku CLI
# Download from: https://devcenter.heroku.com/articles/heroku-cli

# 2. Login to Heroku
heroku login

# 3. Clone the repository
git clone https://github.com/roy107roy12-netizen/Whatsapp-bot.git
cd Whatsapp-bot

# 4. Create Heroku app
heroku create your-app-name

# 5. Deploy
git push heroku main

# 6. View logs
heroku logs --tail
```

**Your pair site will be at:** `https://your-app-name.herokuapp.com`

---

## 📋 Available Commands

| Command | Prefix | Description | Example |
|---------|--------|-------------|---------|
| **ping** | `.` | Check bot response time | `.ping` |
| **menu** | `.` | Show all available commands | `.menu` |
| **time** | `.` | Get current time and date | `.time` |
| **echo** | `.` | Repeat your message | `.echo Hello World` |

**Default prefix:** `.` (configurable in `.env`)

---

## 🚀 Quick Start (Local)

### Prerequisites
- Node.js 20+
- npm or yarn
- A WhatsApp account

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/yourusername/Whatsapp-bot.git
cd Whatsapp-bot

# 2. Install dependencies
npm install

# 3. Create environment file
cp .env.example .env

# 4. Edit .env (optional - defaults work fine)
# nano .env

# 5. Start the bot
npm start
```

### Access Pair Site Locally
Open your browser: **http://localhost:3000**

---

## 📊 Project Structure

```
Whatsapp-bot/
├── public/                    # 🌐 Pair site frontend
│   ├── index.html            # Main pairing page
│   ├── style.css             # Beautiful styling
│   └── script.js             # Pairing logic
├── src/
│   ├── commands/             # Custom commands
│   │   ├── ping.js
│   │   ├── menu.js
│   │   ├── time.js
│   │   └── echo.js
│   └── handlers/
│       ├── commandHandler.js # Command processing
│       └── autoReplyHandler.js # Auto-reply logic
├── index.js                  # 🤖 Bot entry point
├── package.json
├── .env.example              # Configuration template
├── .nvmrc                    # Node version (20)
└── README.md
```

---

## 🔧 Configuration

### Environment Variables

Create `.env` file:
```bash
cp .env.example .env
```

Example `.env`:
```env
# Command Prefix (default: .)
PREFIX=.

# Owner Phone Number (with country code)
OWNER_NUMBER=254712345678

# Server Port (default: 3000)
PORT=3000

# Environment
NODE_ENV=production

# Active Pair Site URL
PAIR_SITE_URL=https://kpl-26293a8556cb.herokuapp.com/
```

---

## 🎨 Customization

### Add Custom Commands

Create a new file in `src/commands/`:

```javascript
// src/commands/hello.js
module.exports = {
  name: 'hello',
  description: 'Say hello',
  async execute(sock, message, args, sender, senderName, isGroup) {
    await sock.sendMessage(sender, {
      text: `👋 Hello ${senderName}!`
    });
  }
};
```

Command will auto-load! Use: `.hello`

### Add Auto-Replies

Edit `src/handlers/autoReplyHandler.js`:

```javascript
const autoReplies = [
  {
    trigger: /hello|hi/i,
    reply: 'Hello back! 👋'
  }
];
```

---

## 🐛 Troubleshooting

### Pair Site Not Loading?
```bash
# 1. Check if bot is running
npm start

# 2. Verify port
# Visit: http://localhost:3000

# 3. Check firewall
# Allow port 3000

# 4. Clear browser cache
# Ctrl + Shift + Delete (Cmd + Shift + Delete on Mac)
```

### Pairing Code Not Generating?
- ✅ Ensure bot is connected (check logs)
- ✅ Use correct format: `2547XXXXXXXX`
- ✅ Code expires in 1 minute
- ✅ WhatsApp must be updated

### Commands Not Working?
- ✅ Check prefix: `.command`
- ✅ Verify command file exists
- ✅ Restart bot: `npm start`
- ✅ Check logs for errors

### Bot Crashes on Start?
```bash
# 1. Check Node version
node --version  # Should be 20+

# 2. Reinstall dependencies
rm -rf node_modules package-lock.json
npm install

# 3. Start with debug
npm start
```

---

## 📱 Testing

### Test Pair Site Locally
```bash
# Terminal 1 - Start bot
npm start

# Terminal 2 - Test endpoints
curl http://localhost:3000/health
curl http://localhost:3000/api/status

# Browser
open http://localhost:3000
```

### Test Commands
```
Message bot with:
.ping
.menu
.time
.echo test
```

---

## 🍴 Fork The Repo

**Everyone is welcome to fork and deploy their own instance!**

### Quick Fork
```bash
# 1. Fork on GitHub
# Visit: https://github.com/roy107roy12-netizen/Whatsapp-bot/fork

# 2. Clone your fork
git clone https://github.com/YOUR-USERNAME/Whatsapp-bot.git

# 3. Deploy to Heroku
cd Whatsapp-bot
heroku create your-app-name
git push heroku main
```

---

## 📚 Documentation

| Document | Purpose |
|----------|---------|
| [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) | Complete deployment setup |
| [HEROKU_DEPLOYMENT.md](./HEROKU_DEPLOYMENT.md) | Heroku specific guide |

---

## 🔒 Security Best Practices

- ✅ Keep `.env` private (add to `.gitignore`)
- ✅ Never commit `.env` file
- ✅ Use strong environment variables
- ✅ Validate all user input
- ✅ Handle errors gracefully
- ✅ Regular backups

---

## 🤝 Contributing

### Want to improve this bot?
1. Fork the repository
2. Create feature branch: `git checkout -b feature/awesome`
3. Commit: `git commit -m 'Add awesome feature'`
4. Push: `git push origin feature/awesome`
5. Submit pull request

---

## ⭐ Credits

- **Baileys** - WhatsApp API
- **Express.js** - Web framework
- **Pino** - Logging
- **Community** - For support

---

## 📄 License

MIT License - Free for personal and commercial use

---

## 💬 Support

- 🐛 [Report Issues](https://github.com/roy107roy12-netizen/Whatsapp-bot/issues)
- 💬 [Discussions](https://github.com/roy107roy12-netizen/Whatsapp-bot/discussions)
- ⭐ [Star Us](https://github.com/roy107roy12-netizen/Whatsapp-bot)

---

<div align="center">

## 🎉 Ready to Get Started?

### [![Deploy to Heroku](https://www.herokucdn.com/deploy/button.svg)](https://dashboard.heroku.com/new?template=https://github.com/roy107roy12-netizen/Whatsapp-bot)

### [![Fork this repo](https://img.shields.io/badge/Fork-this%20repo-blue?style=for-the-badge&logo=github)](https://github.com/roy107roy12-netizen/Whatsapp-bot/fork)

**Made with ❤️ by Roy**

</div>
