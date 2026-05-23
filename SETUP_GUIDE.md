# 🎯 Complete WhatsApp Bot Setup Guide - Session Pairing Site Holder

## 📋 What This Bot Does

This is a **WhatsApp Bot** with a **Session Pairing Web Interface**. It allows users to:

1. **Pair their WhatsApp account** through a web UI without QR scanning
2. **Use bot commands** after pairing
3. **Monitor bot status** via admin dashboard
4. **Run 24/7** on Heroku cloud hosting
5. **Hold multiple WhatsApp sessions** simultaneously

---

## 🚀 Quick Start (3 Steps)

### Option A: Deploy to Heroku (One-Click)
Click this button:
[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy?template=https://github.com/roy107roy12-netizen/Whatsapp-bot)

Then:
1. Enter your WhatsApp number in `OWNER_NUMBER`
2. Click **Deploy App**
3. Wait 5-10 minutes
4. Open your app URL and start pairing!

### Option B: Deploy Manually to Heroku
```bash
# 1. Install Heroku CLI
npm install -g heroku

# 2. Clone repo
git clone https://github.com/roy107roy12-netizen/Whatsapp-bot.git
cd Whatsapp-bot

# 3. Login and create app
heroku login
heroku create your-app-name

# 4. Set config variables
heroku config:set OWNER_NUMBER=254712345678

# 5. Deploy
git push heroku main

# 6. Open app
heroku open
```

### Option C: Run Locally
```bash
# 1. Clone repo
git clone https://github.com/roy107roy12-netizen/Whatsapp-bot.git
cd Whatsapp-bot

# 2. Install dependencies
npm install

# 3. Create .env file
echo "PREFIX=." > .env
echo "OWNER_NUMBER=254712345678" >> .env

# 4. Start bot
npm start

# 5. Open browser
# http://localhost:3000 - Pairing site
# http://localhost:3000/admin - Admin panel
```

---

## 📁 File Structure

```
Whatsapp-bot/
├── index.js                          # Main server + pairing UI + admin panel ⭐
├── package.json                      # Dependencies (includes qrcode)
├── Procfile                          # Heroku configuration
├── app.json                          # One-click deploy config
├── HEROKU_DEPLOYMENT.md              # Detailed Heroku guide ⭐
├── SETUP_GUIDE.md                    # This file
├── .env                              # Your local config (NOT on GitHub)
├── .gitignore                        # Ignore .env and node_modules
├── ping.js                           # Ping command
├── menu.js                           # Menu command  
├── hello.js                          # Hello command
├── echo.js                           # Echo command
├── time.js                           # Time command
├── commandHandler.js                 # Command handler system
├── autoReplyHandler.js               # Auto-reply system
├── index.html                        # Pairing UI (embedded in index.js)
├── style.css                         # UI styling (embedded in index.js)
└── sessions/                         # WhatsApp session data (auto-created)
    └── [phone_number]/               # Folder per paired device
        ├── creds.json
        ├── pre-keys.json
        └── ...
```

---

## 🎯 Key Features

### ✨ Features Included
- ✅ **Web-based pairing** - Pair via browser, no app needed
- ✅ **Session holder** - Maintain multiple WhatsApp sessions
- ✅ **Admin dashboard** - Monitor all active sessions
- ✅ **Command handler** - Easy to add custom commands
- ✅ **Auto-reply system** - Automatic response patterns
- ✅ **Session persistence** - Data survives restarts
- ✅ **Real-time status** - Live updates every 5 seconds
- ✅ **Pairing code generation** - 6-digit pairing codes

### 📱 Available Commands
- `.ping` - Check bot latency and status
- `.menu` - Show available commands
- `.hello` - Get greeting
- `.echo [message]` - Echo back your message
- `.time` - Get current time

---

## 🛠️ Configuration

### Get Your WhatsApp Number
Format: `[Country Code][Phone Number]`
- **Kenya:** `254` + `712345678` = `254712345678`
- **USA:** `1` + `2025551234` = `12025551234`
- **UK:** `44` + `7911123456` = `447911123456`

### Environment Variables

**For Local Development** (`.env` file):
```env
NODE_ENV=development
PORT=3000
PREFIX=.
OWNER_NUMBER=254712345678
SESSION_ID=default_session
```

**For Heroku** (set via `heroku config:set`):
```bash
heroku config:set OWNER_NUMBER=254712345678
heroku config:set PREFIX=.
heroku config:set NODE_ENV=production
```

### Dependencies Installed
```json
{
  "@whiskeysockets/baileys": "^6.7.7",  // WhatsApp API
  "qrcode": "^1.5.3",                   // QR code generation
  "pino": "^9.3.2",                     // Logging
  "dotenv": "^16.4.5",                  // Environment variables
  "qrcode-terminal": "^0.12.0"          // Terminal QR display
}
```

---

## 🚀 Deployment Options

### Option 1: Heroku (Recommended) ⭐
- ✅ Free tier available
- ✅ One-click deploy
- ✅ Persistent WebSocket connections
- ✅ Perfect for session holding
- ⚠️ Free tier sleeps after 30 min
- 💰 Paid tier: $7/month for 24/7

**Deploy:** See HEROKU_DEPLOYMENT.md

### Option 2: Render
- ✅ Free tier includes hours
- ✅ GitHub integration
- ✅ Good WebSocket support

### Option 3: DigitalOcean
- ✅ $5/month droplet
- ✅ Full control
- ✅ 24/7 uptime

### Option 4: Local/VPS
- ✅ Complete control
- ✅ No vendor lock-in
- ⚠️ Need server management

---

## 📱 How to Pair Your WhatsApp (Session Holder)

### Step 1: Access Pairing Site
Go to: `https://your-app-name.herokuapp.com`

You'll see the Netizen Pair interface with status indicator.

### Step 2: Enter Your Number
- Enter phone number with country code
- Example: `254712345678`
- Click **Get Pair Code**

### Step 3: Get 6-Digit Code
You'll receive a **6-digit pairing code** on screen.
- Code expires in **1 minute**
- Make note of it

### Step 4: Link in WhatsApp
On your phone:
1. Open **WhatsApp**
2. Go to **Settings** → **Linked Devices** → **Link with Phone Number**
3. Enter the **6-digit code**
4. Confirm pairing

### Step 5: Session Established!
- Your number is now stored in `sessions/[number]/` folder
- Session data persists even after bot restart
- Admin panel shows: "Connected" status
- Bot can now receive/send messages
- Multiple sessions can be paired!

---

## 💬 Testing Bot After Pairing

### Test Ping Command
Send: `.ping`  
Bot replies: `🏓 Pong! ⏱️ Latency: XXms ✅ Bot is online!`

### Test Menu Command
Send: `.menu`  
Bot replies: List of available commands

### Test Echo Command
Send: `.echo Hello World`  
Bot replies: `Hello World`

### Test Hello Command
Send: `.hello`  
Bot replies: `👋 Hello!`

### Test Time Command
Send: `.time`  
Bot replies: Current time

---

## 📊 Admin Dashboard

Access: `https://your-app-name.herokuapp.com/admin`

**View:**
- Pairing Site Status (Active/Inactive)
- Active Sessions Count
- Total Uptime
- Each Session Details:
  - Phone number
  - Status (Connected/Pairing)
  - Start time
  - Duration

**Updates:** Every 3 seconds automatically

---

## 🐛 Common Issues & Fixes

### "Cannot find module 'qrcode'"
```bash
npm install qrcode
npm start
```

### Pairing code not generating
- Check internet connection
- Verify phone number format (with country code)
- Try again in 30 seconds
- Ensure WhatsApp is up to date

### Bot offline after restart
- Free tier Heroku apps sleep after 30 min
- Upgrade to paid plan for 24/7 uptime
- Or use different hosting

### "PORT already in use"
```bash
# Change in .env
PORT=3001
npm start
```

### Heroku deployment fails
```bash
# Check logs
heroku logs --tail

# Rebuild
heroku rebuild

# Verify package.json locally
npm install
```

---

## 🔐 Security Best Practices

1. **Never commit `.env` to GitHub**
   - Add to `.gitignore` ✅
   - Set on Heroku instead ✅

2. **Protect session data**
   - Keep `sessions/` folder private
   - Don't share session files

3. **Use unique prefixes**
   - Change `.` to something unique
   - Example: `.bot` or `.netizen`

4. **Monitor admin panel**
   - Check for unauthorized sessions
   - Clear old sessions regularly

5. **Update dependencies**
   ```bash
   npm update
   npm audit fix
   ```

---

## 📚 Adding Custom Commands

Create `mycommand.js`:
```javascript
module.exports = {
  name: 'mycommand',
  description: 'My custom command',
  usage: '.mycommand [args]',
  async execute(sock, message, args, sender, senderName, isGroup) {
    await sock.sendMessage(sender, {
      text: '👋 This is my custom command!'
    });
  }
};
```

Add to `commandHandler.js`:
```javascript
const mycommand = require('./mycommand');
commands.set('mycommand', mycommand);
```

Send: `.mycommand`

---

## 📞 Support & Resources

- **Baileys (WhatsApp API):** https://github.com/WhiskeySockets/Baileys
- **Heroku Documentation:** https://devcenter.heroku.com/
- **Node.js Guide:** https://nodejs.org/docs/
- **npm Help:** https://docs.npmjs.com/

---

## ✅ Pre-Deployment Checklist

- [ ] WhatsApp number format verified (with country code)
- [ ] `package.json` includes all dependencies
- [ ] `Procfile` exists in root directory
- [ ] Environment variables documented
- [ ] Tested locally with `npm start`
- [ ] Code pushed to GitHub
- [ ] Heroku account created
- [ ] Connected to GitHub repository
- [ ] Environment variables configured in Heroku
- [ ] App deployed successfully
- [ ] Pairing site accessible and working
- [ ] Successfully paired WhatsApp account
- [ ] Commands tested and working
- [ ] Admin dashboard monitored
- [ ] Sessions are being held properly

---

## 🎉 You're All Set!

Your **WhatsApp Bot Session Pairing Site** is ready for deployment!

**Next Steps:**
1. Follow HEROKU_DEPLOYMENT.md to deploy
2. Pair your WhatsApp account
3. Test bot commands
4. Add custom commands
5. Monitor admin dashboard
6. Share with friends!

---

**Last Updated:** May 23, 2026  
**Status:** ✅ Production Ready  
**Hosting:** Heroku (Recommended for Session Holding)
