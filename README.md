<h1 align="center">CHARLTON-XMD</h1>

<p align="center">
Simple WhatsApp Multi Device Bot built with Baileys API with WhatsApp Channel Membership Enforcement.
</p>

<div align="center">
  <img src="https://i.ibb.co/rK0G8VVm/005db45ad93c.jpg" width="250"/>
</div>

<hr>

<table align="center">
  <tr>
    <td align="center">
      <b>🍴 FORK REPO</b><br><br>
      <a href="https://github.com/roy107roy12-netizen/Whatsapp-bot/fork">
        <img src="https://img.shields.io/badge/FORK-REPOSITORY-blue?style=for-the-badge&logo=github" width="220">
      </a>
    </td>

   <td align="center">
      <b>🔗 PAIR SESSION</b><br><br>
      <a href="https://session.gifted.co.ke/roy107roy12-netizen/Charlton-xmd">
        <img src="https://img.shields.io/badge/PAIR-SESSION-white?style=for-the-badge" width="220">
      </a>
    </td>
  </tr>

  <tr>
    <td align="center">
      <b>📥 DOWNLOAD ZIP</b><br><br>
      <a href="https://github.com/roy107roy12-netizen/Whatsapp-bot/archive/refs/heads/main.zip">
        <img src="https://img.shields.io/badge/DOWNLOAD-ZIP-green?style=for-the-badge" width="220">
      </a>
    </td>

   <td align="center">
      <b>🚀 DEPLOY</b><br><br>
      <a href="https://dashboard.heroku.com/new?template=https://github.com/roy107roy12-netizen/Whatsapp-bot">
        <img src="https://www.herokucdn.com/deploy/button.svg">
      </a>
    </td>
  </tr>
</table>

---

## ✨ FEATURES

- ✅ Multi Device Support
- ✅ Pair Code Authentication
- ✅ **WhatsApp Channel Membership Enforcement** ⭐ **NEW**
- ✅ Fast & Stable
- ✅ Auto Reconnect
- ✅ Easy Deployment
- ✅ Command Handler with Cooldown System

---

## 🌐 PAIR SITE

```
https://session.gifted.co.ke/roy107roy12-netizen/Charlton-xmd
```

---

## 📱 Channel Membership Enforcement

**NEW FEATURE!** Enforce that users must join your WhatsApp channel before using bot commands.

### How It Works

1. When `ENFORCE_CHANNEL_JOIN=true` in `.env`
2. Users trying to use commands must first join your channel
3. Bot sends channel join link if user hasn't joined
4. After joining, all commands become available

### Setup

1. **Get your channel URL:**
   - Open WhatsApp
   - Go to **Channels** → Create or select your channel
   - Tap menu (⋯) → **Share Channel**
   - Copy the link

2. **Update `.env`:**
   ```env
   ENFORCE_CHANNEL_JOIN=true
   REQUIRED_CHANNEL_URL=https://whatsapp.com/channel/YOUR_CHANNEL_ID
   ```

3. **User sees this message when trying to use a command:**
   ```
   ❌ Channel Membership Required
   
   📢 You must join our channel to use this bot.
   
   🔗 Join Channel:
   https://whatsapp.com/channel/0029Vb8CRCa3GJP6wd0XtW0t
   
   ✅ After joining, you can use all bot commands!
   ```

---

## ⚙️ BOT VARIABLES

### Core Configuration

```env
# Bot Settings
PREFIX=.
OWNER_NUMBER=254712345678

# Channel Enforcement (NEW!)
ENFORCE_CHANNEL_JOIN=true
REQUIRED_CHANNEL_URL=https://whatsapp.com/channel/0029Vb8CRCa3GJP6wd0XtW0t

# Session
SESSION_ID=your_session_id
PAIR_SITE_URL=https://kpl-26293a8556cb.herokuapp.com/

# Optional
PORT=3000
NODE_ENV=production
```

### Environment Variables Reference

| Variable | Description | Default |
|----------|-------------|----------|
| `PREFIX` | Command prefix | `.` |
| `OWNER_NUMBER` | Owner's WhatsApp number | - |
| `ENFORCE_CHANNEL_JOIN` | Enable channel membership check | `true` |
| `REQUIRED_CHANNEL_URL` | WhatsApp channel URL | - |
| `SESSION_ID` | Session ID | - |
| `PAIR_SITE_URL` | Pairing website | - |
| `PORT` | Server port | `3000` |
| `NODE_ENV` | Environment | `production` |

---

## 🚀 Quick Start

### 1. Clone & Install

```bash
git clone https://github.com/roy107roy12-netizen/Charlton-xmd.git
cd Charlton-xmd
npm install
```

### 2. Setup Environment

```bash
cp .env.example .env
```

### 3. Configure Your Channel

Edit `.env` and add your WhatsApp channel URL:

```env
ENFORCE_CHANNEL_JOIN=true
REQUIRED_CHANNEL_URL=https://whatsapp.com/channel/0029Vb8CRCa3GJP6wd0XtW0t
```

### 4. Start Bot

```bash
npm start
```

---

## 📋 Creating Commands

Create command files in `commands/` directory:

```javascript
// commands/ping.js
module.exports = {
    name: 'ping',
    aliases: ['p'],
    cooldown: 3,
    async execute(sock, message, args, sender, senderName, isGroup) {
        await sock.sendMessage(sender, {
            text: 'Pong! 🏓'
        });
    }
};
```

**Command Properties:**
- `name` - Command name
- `aliases` - Alternative names
- `cooldown` - Seconds before user can use again
- `execute` - Function to run command

---

## 📁 File Structure

```
Charlton-xmd/
├── index.js                    # Main entry point
├── commandHandler.js           # Command processor
├── autoReplyHandler.js         # Auto-reply logic
├── commands/                   # Bot commands
├── src/handlers/               # Additional handlers
├── sessions/                   # WhatsApp sessions
├── .env                        # Configuration
├── .env.example                # Configuration template
├── package.json                # Dependencies
└── README.md                   # Documentation
```

---

## ⚠️ Important Notes

- **Do NOT commit `.env`** - Contains sensitive session data
- **Backup sessions folder** - Contains WhatsApp authentication
- **Update channel URL** - Set your actual WhatsApp channel
- **Test mode** - Set `ENFORCE_CHANNEL_JOIN=false` to temporarily disable

---

## 🐛 Troubleshooting

| Issue | Solution |
|-------|----------|
| Bot not responding | Check channel enforcement isn't blocking commands |
| Session errors | Delete `sessions/` folder and re-pair |
| Channel check fails | Verify `REQUIRED_CHANNEL_URL` is correct |
| Commands not loading | Check command files in `commands/` folder |

---

## 📝 License

GNU General Public License v3.0

---

<p align="center">
Made with ❤️ by Charlton & Netizen Community
</p>
