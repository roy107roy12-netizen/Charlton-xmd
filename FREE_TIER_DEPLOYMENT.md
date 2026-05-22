# 🚀 Free Tier Deployment Guide for WhatsApp Bot

Get your WhatsApp bot running for FREE on multiple platforms!

---

## 📊 Quick Comparison

| Platform | Free Tier | Session Limit | Uptime | Setup Time |
|----------|-----------|---------------|--------|------------|
| **Render.com** | ✅ Yes | Unlimited | 99.9% | 5 min |
| **Railway.app** | ✅ Yes ($5/mo free) | Unlimited | 99.9% | 5 min |
| **Replit** | ✅ Yes | Unlimited | Limited* | 3 min |
| **Heroku** | ❌ Paid Only | N/A | 99.9% | N/A |

*Replit may sleep after 1 hour of inactivity (upgrade prevents this)

---

## 🎯 Option 1: Render.com (RECOMMENDED)

### ✨ Why Render?
- ✅ **Truly Free** - No credit card needed
- ✅ **Always Running** - No sleep mode
- ✅ **Unlimited Sessions**
- ✅ **Easy Deploy**

### Steps:

1. **Create Account**
   ```
   Go to: https://render.com
   Sign up with GitHub
   ```

2. **Deploy Your Bot**
   ```
   Click "New" → "Web Service"
   Connect your GitHub repo: roy107roy12-netizen/Whatsapp-bot
   ```

3. **Configure**
   ```
   Name: whatsapp-bot
   Environment: Node
   Build Command: npm install
   Start Command: node index.js
   ```

4. **Set Environment Variables**
   - Go to "Environment" tab
   - Add: `PORT=10000`

5. **Deploy**
   ```
   Click "Create Web Service"
   Wait 2-3 minutes for deployment
   ```

6. **Get Your URL**
   ```
   After deployment:
   Pairing Site: https://your-app-name.onrender.com
   Admin Panel: https://your-app-name.onrender.com/admin
   ```

### 📱 Create Session
```
1. Open: https://your-app-name.onrender.com
2. Enter your WhatsApp phone number (with country code)
   Example: 254712345678
3. Click "Get Pair Code"
4. Open WhatsApp → Linked Devices → Link with phone number
5. Enter the 8-digit code
✅ Done! Your session is active
```

---

## 🚂 Option 2: Railway.app

### ✨ Why Railway?
- ✅ **$5/month Free Credit** (enough for bot)
- ✅ **Easy GitHub Integration**
- ✅ **Unlimited Sessions**
- ✅ **Great Dashboard**

### Steps:

1. **Create Account**
   ```
   Go to: https://railway.app
   Sign up with GitHub
   ```

2. **Deploy**
   ```
   Click "New Project"
   Select "Deploy from GitHub repo"
   Choose: roy107roy12-netizen/Whatsapp-bot
   ```

3. **Configure**
   ```
   Railway auto-detects Node.js
   Sets start command: node index.js
   ```

4. **Environment Variables**
   - Go to "Variables"
   - Add: `PORT=3000`

5. **Generate Domain**
   ```
   Go to "Networking"
   Click "Generate Domain"
   ```

6. **Get URL**
   ```
   Pairing Site: https://your-domain.railway.app
   Admin Panel: https://your-domain.railway.app/admin
   ```

### 📱 Create Session
```
1. Open: https://your-domain.railway.app
2. Enter WhatsApp number
3. Get pair code
4. Scan in WhatsApp → Linked Devices
✅ Session created!
```

---

## 💻 Option 3: Replit

### ✨ Why Replit?
- ✅ **Instant Setup** - No configurations needed
- ✅ **Web IDE Included**
- ✅ **Good for Testing**
- ⚠️ Free tier may sleep (but sessions persist)

### Steps:

1. **Fork to Replit**
   ```
   Go to: https://replit.com
   Click "Import from GitHub"
   Paste: https://github.com/roy107roy12-netizen/Whatsapp-bot
   ```

2. **Install Dependencies**
   ```
   Replit auto-installs from package.json
   ```

3. **Run**
   ```
   Click "Run"
   Bot starts automatically
   ```

4. **Access Bot**
   ```
   Get URL from output
   Usually: https://replit-username.replit.dev
   ```

5. **Make Always-On** (Optional)
   ```
   Upgrade to Replit+ for $7/month
   Or use uptimerobot.com to ping every 5 min
   ```

### 📱 Create Session
```
1. Open your Replit web URL
2. Enter phone number
3. Get code and scan
✅ Session ready!
```

---

## 🔄 Multiple Sessions (Free Tier Tips)

### Create Multiple Sessions on One Deployment:
```
1. Visit pairing site
2. Enter different phone number
3. Get new pairing code
4. Scan in WhatsApp
5. Repeat for more numbers
```

### Sessions Persist:
- ✅ Sessions stored in `/sessions` folder
- ✅ Survives deployment restarts
- ✅ Automatic re-connection

---

## ⚙️ Environment Variables

If you need to customize:

```env
PORT=3000                    # Default: 3000
NODE_ENV=production          # For stability
LOG_LEVEL=info              # Logging level
```

---

## 🐛 Troubleshooting Free Tier Deploys

### Problem: "Cannot GET /"
**Solution:** Check if Node.js is running. Click "Run" again.

### Problem: Bot goes offline after 1 hour
**Solution:** 
- Render.com: Won't happen ✅
- Railway.app: Won't happen ✅
- Replit: Upgrade to Replit+ OR use uptimerobot.com

### Problem: Pairing code expires
**Solution:** Code lasts 1 minute. Get new one immediately.

### Problem: Port already in use
**Solution:** Change PORT in environment variables to 8000 or 5000

---

## 💡 Pro Tips

### Uptime Monitoring (FREE)
```
1. Go to: https://uptimerobot.com
2. Create account (free)
3. Add monitor: https://your-bot-url/admin
4. Check every 5 minutes
5. Alerts if bot goes down
```

### Custom Domain (FREE)
```
Render.com & Railway.app offer free subdomains
For custom domain, use Namecheap free DNS forwarding
```

### Backup Sessions
```
1. Sessions auto-stored in /sessions folder
2. Each number gets own folder
3. Git commit to backup
4. Can restore by uploading folder
```

---

## 📊 Recommended Setup

**For Most Users: Use Render.com**
```
✅ Free forever
✅ No credit card
✅ Always online
✅ Unlimited sessions
✅ 5 minute setup
```

**For Production: Use Railway.app**
```
✅ $5 monthly credit (more than enough)
✅ Professional dashboard
✅ Better uptime monitoring
✅ Easy scaling if needed
```

**For Learning: Use Replit**
```
✅ Fastest setup
✅ Edit code in browser
✅ Good for testing
⚠️ May sleep if free
```

---

## 🆘 Need Help?

- Check the main `DEPLOYMENT_GUIDE.md`
- Review `README.md` for command info
- Check logs in deployment dashboard

**Happy Botting! 🤖**
