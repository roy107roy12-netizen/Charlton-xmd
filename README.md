
<h1 align="center">CHARLTON-XMD</h1>

<h1 align="center">
  🤖 A Modern WhatsApp Bot using Baileys with Advanced Features
</h1>

<div style="text-align: center;">
  <a href="https://github.com/roy107roy12-netizen/Charlton-xmd">
    <img src="https://i.ibb.co/pvTCfNqV/0333084a6a55.jpg" alt="Charlton Bot" border="0" width="300"/></a>
  </a>
  <hr style="margin-top: 20px; margin-bottom: 20px;"/>
</div>

## ⚡ Quick Start

<table align="center" cellpadding="15" border="1" style="border-collapse: collapse;">
  <tr>
    <td align="center">
      <h3>📋 FORK</h3>
      Fork the repository to customize the bot for your needs.
      <br><br>
      <a href="https://github.com/roy107roy12-netizen/Charlton-xmd/fork">
        <img src="https://img.shields.io/badge/FORK_REPO-Click_Here-purple?style=for-the-badge&logo=github" alt="FORK" width="220">
      </a>
    </td>
    <td align="center">
      <h3>🔐 PAIR SESSION</h3>
      Scan QR code to generate your session string.
      <br><br>
      <a href="https://bot-deployer--otienojunior806.replit.app">
        <img src="https://img.shields.io/badge/GET_SESSION-Pair_Now-blue?style=for-the-badge&logo=whatsapp" alt="Pair Session Code" width="220">
      </a>
    </td>
  </tr>
  <tr>
    <td colspan="2" align="center">
      <h3>🚀 DEPLOY</h3>
      Deploy to Heroku with one click (requires forked repo & session).
      <br><br>
      <a href="https://heroku.com/deploy?template=https://github.com/roy107roy12-netizen/Charlton-xmd">
        <img src="https://www.herokucdn.com/deploy/button.svg" alt="Deploy to Heroku" width="250">
      </a>
    </td>
  </tr>
</table>

---

## ✨ Features

- ✅ **Modern Command System** - Easy to add and manage commands
- ✅ **SQLite/PostgreSQL Support** - No MongoDB required
- ✅ **Auto-Reply System** - Respond to specific keywords
- ✅ **Prefix-based Commands** - Customizable command prefix
- ✅ **Group & DM Support** - Works in both groups and private chats
- ✅ **Real-time Status Updates** - Live bot notifications
- ✅ **Lightweight & Fast** - Minimal dependencies
- ✅ **Free Heroku Deployment** - Deploy in minutes

---

## 📝 Available Commands

### Core Commands
- `.help` - Show all available commands
- `.menu` - Display bot menu
- `.ping` - Check bot response time
- `.uptime` - Show bot uptime

### Fun Commands
- `.hello` - Get a friendly greeting
- `.joke` - Random joke
- `.quote` - Inspirational quote
- `.dice` - Roll a dice (1-6)

### Bot Info
- `.about` - About this bot
- `.owner` - Bot owner info
- `.support` - Get support link

### Admin Commands (Group Leaders)
- `.promote [@user]` - Promote user to admin
- `.demote [@user]` - Demote user from admin
- `.kick [@user]` - Remove user from group

---

## 🛠️ Installation

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- Heroku account (for deployment)

### Local Setup

1. **Clone your forked repository**
```bash
git clone https://github.com/YOUR_USERNAME/Charlton-xmd.git
cd Charlton-xmd
```

2. **Install dependencies**
```bash
npm install
```

3. **Get your session string**
   - Visit: [https://bot-deployer--otienojunior806.replit.app](https://bot-deployer--otienojunior806.replit.app)
   - Scan QR code with WhatsApp
   - Copy the session string

4. **Create `.env` file**
```env
SESSION=your_session_string_here
OWNER_NUMBER=254712345678
PREFIX=.
BOTNAME=CHARLTON-XMD
BOT_MODE=public
BOT_TIMEZONE=Africa/Nairobi
```

5. **Start the bot**
```bash
npm start
```

---

## 🌍 Environment Variables

| Variable | Description | Required | Example |
|----------|-------------|----------|----------|
| `SESSION` | WhatsApp session string | ✅ Yes | `Charlton-md;SESSIONID...` |
| `OWNER_NUMBER` | Your WhatsApp number | ✅ Yes | `254712345678` |
| `PREFIX` | Command prefix | ❌ No | `.` |
| `BOTNAME` | Bot display name | ❌ No | `CHARLTON-XMD` |
| `BOT_MODE` | public or private | ❌ No | `public` |
| `BOT_TIMEZONE` | Your timezone | ❌ No | `Africa/Nairobi` |
| `BOT_PIC` | Bot picture URL | ❌ No | `https://i.ibb.co/pvTCfNqV/0333084a6a55.jpg` |

---

## 🚀 Heroku Deployment

### Step 1: Fork Repository
Click the **FORK** button above and log in with your GitHub account.

### Step 2: Get Session String
Click the **PAIR SESSION** button and scan the QR code with your WhatsApp.

### Step 3: Deploy
Click the **DEPLOY** button and fill in the required environment variables:
- `SESSION` - Your session string from Step 2
- `OWNER_NUMBER` - Your WhatsApp number (include country code)

That's it! Your bot will be live in minutes.

---

## 📂 Project Structure

```
Charlton-xmd/
├── commands/              # Bot commands
├── database/              # Database models
├── session/               # WhatsApp sessions (auto-created)
├── Cmds/                  # Additional command files
├── public/                # Static files
├── index.js              # Main entry point
├── commandHandler.js     # Command handler
├── settings.js           # Configuration
├── set.env              # Environment variables
├── package.json          # Dependencies
├── Procfile             # Heroku configuration
├── app.json             # Heroku app manifest
└── README.md            # This file
```

---

## 🔧 Troubleshooting

### Bot Not Responding
- ✅ Check if `SESSION` is valid and not expired
- ✅ Verify `OWNER_NUMBER` format (include country code)
- ✅ Ensure bot is running: `npm start`
- ✅ Check Heroku logs: `heroku logs --tail -a your-app-name`

### Session Expired
- Get a new session from [https://bot-deployer--otienojunior806.replit.app](https://bot-deployer--otienojunior806.replit.app)
- Update `SESSION` variable in Heroku or `.env`
- Restart bot: `npm start` or `heroku restart`

### Commands Not Working
- Verify prefix is correct (default: `.`)
- Check if you're using the command with proper format
- Example: `.help` not `help`

---

## 📚 For Developers

### Adding New Commands

Create a file in `commands/` directory:

```javascript
module.exports = {
    name: 'hello',
    description: 'Say hello',
    category: 'Fun',
    execute: async (sock, msg, args) => {
        await sock.sendMessage(msg.key.remoteJid, { 
            text: 'Hello! 👋' 
        });
    }
};
```

### Database Usage

```javascript
const { database, getSettings } = require('./settings');
const settings = await getSettings();
```

---

## 🤝 Contributing

Found a bug or want to suggest a feature?
[Create an issue](https://github.com/roy107roy12-netizen/Charlton-xmd/issues)

---

## 📄 License

This project is licensed under the ISC License - see LICENSE file for details.

---

## ⭐ Support

If you found this helpful, please star ⭐ the repository!

**Need Help?**
- 📧 Email: [otienocharlton460@gmail.com](mailto:otienocharlton460@gmail.com)
- 💬 GitHub Issues: [Create an issue](https://github.com/roy107roy12-netizen/Charlton-xmd/issues)

---

<div align="center">

**Made with ❤️ by Charlton**

[GitHub](https://github.com/roy107roy12-netizen) • [Fork this repo](https://github.com/roy107roy12-netizen/Charlton-xmd/fork) • [Deploy Now](https://heroku.com/deploy?template=https://github.com/roy107roy12-netizen/Charlton-xmd)

</div>