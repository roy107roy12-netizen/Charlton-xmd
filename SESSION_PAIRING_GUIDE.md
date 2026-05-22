# 📱 WhatsApp Session Pairing Guide

## What is Session Pairing?

Session pairing links your WhatsApp account to the bot without giving away your password. It's like connecting a "linked device" (similar to WhatsApp Web).

---

## ✅ Prerequisites

- ✅ Bot deployed and running
- ✅ Access to the pairing website
- ✅ WhatsApp app installed on your phone
- ✅ An active WhatsApp account

---

## 🔗 How to Pair Your Session

### Step 1: Access Pairing Site

**Local Testing:**
```
http://localhost:3000
```

**Cloud Deployment:**
```
https://your-bot-url.onrender.com
https://your-bot-url.railway.app
https://your-replit-name.replit.dev
```

### Step 2: Enter Your Phone Number

```
💡 Format: Country Code + Number (no spaces, no +)

Examples:
- Kenya:     254712345678
- India:     919876543210
- Nigeria:   2348012345678
- US:        12025551234
- UK:        441632960000
```

**Where to find your number:**
```
Settings → About → Phone number
(Copy without the + symbol)
```

### Step 3: Get Pairing Code

```
1. Enter your number in the input field
2. Click "Get Pair Code" button
3. Wait for code to appear (2-5 seconds)
4. You'll see an 8-digit code like: 123-456-789
```

### Step 4: Pair in WhatsApp

**On Your Phone:**

```
1. Open WhatsApp
2. Go to Settings → Linked Devices (or Connected devices)
3. Tap "Link a device"
4. Select "Link with phone number"
5. Enter the 8-digit code from step 3
6. Confirm
```

### Step 5: Verify Connection

**Wait for confirmation message:**
```
✅ "Device linked successfully"
⏳ Usually takes 5-10 seconds
```

**Check Admin Panel:**
```
Visit: https://your-bot-url/admin
Your number should appear with status: CONNECTED ✅
```

---

## 🎯 Multiple Sessions

### Pair Multiple Numbers on Same Bot

```
1. Go to pairing site again
2. Enter different phone number
3. Get new pairing code
4. Pair in that WhatsApp
5. Repeat for more numbers
```

### Each Number Gets Its Own:
- ✅ Session folder
- ✅ Authentication credentials
- ✅ Message history
- ✅ Settings

---

## ⏱️ Important Timing

**Pairing Code Expires In:** 1 minute
```
If code expires, just get a new one
No harm in trying multiple times
```

**Connection Timeout:** 2 minutes
```
If bot doesn't see pairing completion in 2 min,
the session will timeout
Just pair again with new code
```

---

## 🔍 Monitor Your Sessions

### Admin Panel

**Access:** `https://your-bot-url/admin`

**See:**
```
📊 Active Sessions Count
⏱️ Bot Uptime
📱 Individual Session Status
⏰ When Each Session Was Created
💾 Session Duration
```

### Session Status Types:

```
🟢 CONNECTED    = Session is active and working
🟡 PAIRING      = Waiting for phone to confirm
🔴 DISCONNECTED = Session lost (will reconnect)
```

---

## ⚡ Common Issues & Fixes

### Issue: "Code expired"
```
❌ Problem: Took too long to pair (>1 minute)
✅ Solution: Get a new code and pair immediately
```

### Issue: "Invalid phone number"
```
❌ Problem: Wrong format or number
✅ Solution: 
   - Remove + or spaces
   - Include country code
   - Check number is correct
   
   Example: 254712345678 (not +254 712 345 678)
```

### Issue: "Cannot see pairing code"
```
❌ Problem: Server error or slow connection
✅ Solution:
   - Refresh the page
   - Check bot is running
   - Try different number
   - Check browser console (F12)
```

### Issue: "Session keeps disconnecting"
```
❌ Problem: Network issues or bot restarting
✅ Solution:
   - Check bot deployment status
   - Re-pair the session
   - Use stable internet
   - Check no other devices logged in
```

### Issue: "Won't let me pair more sessions"
```
❌ Problem: Bot limit or session conflict
✅ Solution:
   - Ensure bot has enough resources
   - Close old sessions first
   - Restart bot
   - Try after 5 minutes
```

---

## 🔐 Security Tips

### ✅ Do This:
```
✅ Pair only on HTTPS sites (cloud deployment)
✅ Keep pairing code private
✅ Don't share admin panel URL
✅ Use strong passwords for deployment platform
✅ Monitor connected devices in WhatsApp
```

### ❌ Don't Do This:
```
❌ Share pairing codes
❌ Leave pairing site publicly accessible
❌ Pair on HTTP (local only is OK)
❌ Use same session across devices
```

---

## 📊 Session Data Storage

### Where Sessions Are Stored:
```
/sessions/
  ├── 254712345678/      (Session 1)
  │   ├── creds.json
  │   ├── pre-keys.json
  │   └── session.json
  ├── 919876543210/      (Session 2)
  │   ├── creds.json
  │   ├── pre-keys.json
  │   └── session.json
```

### What's Stored:
```
- Session credentials
- Encryption keys
- Connection state
- Message history (local)
```

### Privacy:
```
✅ Only metadata stored
✅ NO messages stored permanently
✅ NO personal data sent to external servers
✅ Fully private and local
```

---

## 🚀 After Pairing

### Bot is Ready to:
```
✅ Receive messages
✅ Send auto-replies
✅ Execute commands (.ping, .menu, .hello, etc.)
✅ Forward messages
✅ Handle multiple sessions
```

### Test Your Bot:

```
Send test message:

.ping          → Bot responds with latency
.menu          → Bot shows commands
.hello         → Bot greets you
.time          → Bot shows current time
.echo hello    → Bot repeats message

Or just say "hello" for auto-reply!
```

---

## 🆘 Still Not Working?

### Debug Checklist:

```
□ Bot is running (check deployment dashboard)
□ Can access pairing site (no 404)
□ Phone number format is correct
□ WhatsApp is updated to latest version
□ Internet connection is stable
□ No other device is logged into WhatsApp
□ Pairing code not expired (refresh page)
□ Check browser console for errors (F12)
```

### If Still Stuck:

```
1. Check deployment logs for errors
2. Restart the bot
3. Clear browser cache
4. Try different phone number
5. Try from different browser/device
```

---

## 📚 Additional Resources

- **Deployment Guide:** See `FREE_TIER_DEPLOYMENT.md`
- **Bot Commands:** See `README.md`
- **Technical Details:** See `DEPLOYMENT_GUIDE.md`

---

**🎉 You're all set! Your WhatsApp bot is now connected and ready to use.**
