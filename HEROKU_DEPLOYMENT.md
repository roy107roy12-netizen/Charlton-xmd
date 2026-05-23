# 🚀 Heroku Deployment Guide for WhatsApp Bot Session Pairing Site

## Overview
This guide will help you deploy your WhatsApp Bot's **session pairing site holder** on Heroku. The site allows users to pair their WhatsApp accounts via a web interface.

---

## ✅ Pre-Deployment Checklist

Before deploying, ensure:
- ✅ `package.json` has all dependencies (including `qrcode`)
- ✅ `Procfile` is configured correctly
- ✅ `.env` variables are ready (will be set in Heroku config)
- ✅ `index.js` includes both the pairing UI and admin panel

---

## 🔧 Step-by-Step: Deploy on Heroku

### Step 1: Create a Heroku Account
1. Go to https://www.heroku.com
2. Click **Sign Up** and create a free account
3. Verify your email

### Step 2: Install Heroku CLI
```bash
# macOS
brew install heroku/brew/heroku

# Windows (via npm)
npm install -g heroku

# Linux
curl https://cli-assets.heroku.com/install.sh | sh
```

### Step 3: Login to Heroku
```bash
heroku login
```
This opens a browser window to authenticate. Click "Log In" and return to terminal.

### Step 4: Create a Heroku App
```bash
cd path/to/Whatsapp-bot
heroku create whatsapp-bot-pair  # Replace with your desired app name
```

**Note:** If the name is taken, Heroku will suggest alternatives. Your app URL will be:
```
https://whatsapp-bot-pair.herokuapp.com
```

### Step 5: Add Environment Variables
```bash
# Set environment variables (use your values)
heroku config:set NODE_ENV=production
heroku config:set PORT=3000
heroku config:set SESSION_ID=default_session
heroku config:set PREFIX=.
heroku config:set OWNER_NUMBER=your_whatsapp_number_here
```

To verify:
```bash
heroku config
```

### Step 6: Deploy Your Code
```bash
# Add remote if not already done
git remote add heroku https://git.heroku.com/whatsapp-bot-pair.git

# Deploy
git push heroku main
# (or 'master' if that's your default branch)
```

### Step 7: View Logs
```bash
heroku logs --tail
```

You should see:
```
✅ Running on port 3000
🔗 Pair Site: http://localhost:3000
📊 Admin Panel: http://localhost:3000/admin
```

### Step 8: Access Your Pairing Site
Open your browser and go to:
- **Pairing Site:** `https://whatsapp-bot-pair.herokuapp.com/`
- **Admin Panel:** `https://whatsapp-bot-pair.herokuapp.com/admin`

---

## 📱 Using the Pairing Site

1. Open your deployed Heroku URL
2. Enter your WhatsApp phone number (with country code, e.g., `254712345678`)
3. Click **"Get Pair Code"**
4. You'll get a **6-digit code**
5. Open WhatsApp on your phone:
   - Settings → Linked Devices → Link with Phone Number
   - Enter the code
6. Your bot is now paired and running 24/7 on Heroku!

---

## 🛠️ Troubleshooting

### Issue: "Application error" when accessing the site
**Solution:**
```bash
heroku logs --tail
```
Look for error messages. Common issues:
- Missing `qrcode` dependency → Run `npm install qrcode`
- PORT not set → Run `heroku config:set PORT=3000`

### Issue: App crashes immediately
**Solution:**
```bash
# Check if index.js has syntax errors
node index.js

# Verify all dependencies are installed
npm install
```

### Issue: "Cannot find module" error
**Solution:**
```bash
# Reinstall dependencies
rm package-lock.json
npm install
git add package.json package-lock.json
git commit -m "Update dependencies"
git push heroku main
```

### Issue: Pairing code not working
**Solution:**
- Ensure your phone number includes country code
- Check if WhatsApp is updated to latest version
- Try unlinking other devices first
- Wait a few seconds between attempts

---

## 📊 Monitoring

### View Real-Time Logs
```bash
heroku logs --tail
```

### Check App Status
```bash
heroku ps
```

### View Admin Panel Metrics
- Active Sessions counter
- Uptime tracker
- Session status (Pairing/Connected)
- Real-time updates every 5 seconds

---

## 💰 Heroku Free Tier Limitations

| Feature | Free | Paid |
|---------|------|------|
| Monthly hours | 550 | Unlimited |
| Sleep after inactivity | Yes (30 min) | No |
| Max uptime | ~22 days/month | 24/7 |
| Price | Free | $7+/month |

**Note:** With free tier, your app sleeps if inactive for 30 minutes. For 24/7 uptime, upgrade to at least **$7/month** (Hobby dyno).

---

## 🔄 Continuous Deployment

### Automatic Deploys (Recommended)
1. Go to your app dashboard: `https://dashboard.heroku.com/apps/whatsapp-bot-pair`
2. Click **Deploy** tab
3. Connect to GitHub
4. Search for "Whatsapp-bot"
5. Click **Connect**
6. Enable **Automatic deploys** from `main` branch

Now every push to GitHub automatically deploys to Heroku!

### Manual Deploy
```bash
git push heroku main
```

---

## 🔐 Security Tips

1. **Never commit `.env` to GitHub** - Set variables in Heroku config instead
2. **Use strong session IDs** - Set `SESSION_ID` to something unpredictable
3. **Restrict admin panel** - Consider adding password protection
4. **Monitor logs regularly** - Check for suspicious activity

---

## 📝 App Configuration Files

### Procfile
```
web: node index.js
```

### package.json
Ensure you have:
```json
{
  "dependencies": {
    "@whiskeysockets/baileys": "^6.7.7",
    "dotenv": "^16.4.5",
    "pino": "^9.3.2",
    "qrcode": "^1.5.3",
    "qrcode-terminal": "^0.12.0"
  }
}
```

### Environment Variables Required
```
NODE_ENV=production
PORT=3000  (Heroku sets this automatically, but good to have)
SESSION_ID=default_session
PREFIX=.
OWNER_NUMBER=your_number
```

---

## 🚀 Next Steps

1. ✅ Deploy on Heroku (this guide)
2. 📱 Pair your WhatsApp account
3. 🤖 Test bot commands
4. 📊 Monitor admin panel
5. 💬 Add more features (commands, auto-replies, etc.)

---

## 📞 Support

**If deployment fails:**
1. Check Heroku logs: `heroku logs --tail`
2. Verify all environment variables are set
3. Ensure `Procfile` is in repository root
4. Try rebuilding: `heroku rebuild`

**For general help:**
- Heroku Docs: https://devcenter.heroku.com/
- Baileys Wiki: https://github.com/WhiskeySockets/Baileys

---

**Status:** ✅ Ready for Heroku deployment!
