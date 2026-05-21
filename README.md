# 🤖 CHARLTON-MD - WhatsApp Bot

<div align="center">

![CHARLTON BOT](https://img.shields.io/badge/CHARLTON--MD-WhatsApp%20Bot-blue?style=for-the-badge&logo=whatsapp)
![Status](https://img.shields.io/badge/Status-Active-success?style=for-the-badge)
![Node](https://img.shields.io/badge/Node-20.x-green?style=for-the-badge&logo=node.js)
![License](https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge)

**A powerful WhatsApp Multi-Device Bot built with Baileys API**

[🔗 Live Pair Site](#pair-site--active) • [📚 Docs](#documentation) • [🚀 Deploy](#deployment) • [🍴 Fork](#fork-the-repo)

</div>

---

## ✨ Features

- ✅ **Multi-Device Support** - Works with WhatsApp Web and Linked Devices
- ✅ **Pairing Code Authentication** - Secure pairing without QR codes
- ✅ **Custom Commands** - Easy command system to add your own functionality
- ✅ **Auto-Reply System** - Automatic responses to specific keywords
- ✅ **Fast & Stable** - Built with Baileys for reliability
- ✅ **Auto-Reconnect** - Handles disconnections gracefully
- ✅ **Error Handling** - Comprehensive error management
- ✅ **Easy Deployment** - Deploy to Heroku, Railway, Cloudflare, or any server
- ✅ **Public & Forkable** - Anyone can fork and deploy their own instance

---

## 🔐 Pair Site - ACTIVE ✅

### **Live Pairing Site**

The pairing site is **FULLY FUNCTIONAL** and built-in:

#### **Quick Access**
After deploying your bot, the pair site is automatically available:
```
http://localhost:3000
```

#### **Features**
- 🎨 Beautiful modern UI with gradient background
- 📱 Mobile responsive design
- ⚡ Real-time pairing code generation
- 🔒 Secure pairing code display
- 📋 Feature showcase
- 🔗 Quick links to GitHub

#### **How to Use the Pair Site**

1. **Start your bot:**
   ```bash
   npm install
   npm start
   ```

2. **Open pair site in browser:**
   ```
   http://localhost:3000
   ```
   (Or your deployment URL)

3. **Enter your WhatsApp phone number:**
   - Format: `2547XXXXXXXX` (include country code)
   - Click "Generate Code"

4. **Get your pairing code:**
   - Code displays in large green text
   - Valid for 1 minute
   - Shows instructions

5. **Complete pairing in WhatsApp:**
   - Open WhatsApp on your phone
   - Settings → Linked Devices
   - Click "Link a Device"
   - Paste the code from pair site
   - Done! ✅

#### **Pair Site Endpoints**

| Endpoint | Purpose | Response |
|----------|---------|----------|
| `GET /` | Pair site UI | HTML page |
| `GET /pair?number=254...` | Generate code | Pairing code |
| `GET /health` | Health check | JSON status |
| `GET /api/status` | Bot status | JSON info |

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

## 🚀 Quick Start

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

### Access Pair Site
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

## 🌍 Deployment

### Option 1: Heroku (Recommended)

```bash
# Create Heroku app
heroku create your-app-name

# Deploy
git push heroku main

# View logs
heroku logs --tail
```

**Your pair site will be at:** `https://your-app-name.herokuapp.com`

### Option 2: Railway.app

```bash
# Install Railway CLI
npm install -g @railway/cli

# Login and deploy
railway login
railway up
```

### Option 3: Cloudflare Workers (Pair Site)

```bash
npm install -g wrangler
wrangler login
wrangler publish
```

### Option 4: Local/VPS

```bash
npm install
npm start
```

---

## 🆚 Comparison

| Feature | Local | Heroku | Railway | Cloudflare |
|---------|-------|--------|---------|-----------|
| **Cost** | Free | Free tier | $5/mo | Free |
| **Uptime** | While running | 99.9% | 99.9% | 99.99% |
| **Setup** | Easy | Easy | Easy | Medium |
| **Pair Site** | ✅ | ✅ | ✅ | ✅ |
| **Best for** | Testing | Production | Production | Static |

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

# 3. Deploy
cd Whatsapp-bot
npm install
npm start
```

### Deploy to Heroku
[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://dashboard.heroku.com/new?template=https://github.com/roy107roy12-netizen/Whatsapp-bot)

---

## 📚 Documentation

| Document | Purpose |
|----------|---------|
| [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) | Complete deployment setup |
| [CLOUDFLARE_DEPLOYMENT.md](./CLOUDFLARE_DEPLOYMENT.md) | Cloudflare Workers setup |
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

### Want to improve CHARLTON-MD?
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

### [Fork Now](https://github.com/roy107roy12-netizen/Whatsapp-bot/fork)

```bash
npm install && npm start
```

Visit: **http://localhost:3000**

**Made with ❤️ by CHARLTON-MD**

</div>
