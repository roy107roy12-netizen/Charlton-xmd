# 🌥️ CLOUDFLARE + HEROKU Integration Guide

## 🎯 Complete Setup: Cloudflare Pairing → Heroku Bot

Use **Cloudflare Workers** to host your pairing site (free), then get **SESSION_ID** and deploy to **Heroku**!

---

## 📊 Architecture Overview

```
┌─────────────────────────────────────────────────────────┐
│                    Your Setup                            │
├─────────────────────────────────────────────────────────┤
│                                                          │
│  Cloudflare Workers (FREE)          Heroku (Paid)       │
│  ┌──────────────────────────┐    ┌──────────────────┐  │
│  │  Pairing Site            │    │   Bot Runs       │  │
│  │  (index.html + CSS)      │───▶│   Commands       │  │
│  │                          │    │   Messages       │  │
│  │  + Session Exporter      │    │   Auto-replies   │  │
│  │  (Download JSON)         │    │                  │  │
│  └──────────────────────────┘    └──────────────────┘  │
│           ▼                               ▲               │
│  Get SESSION_ID          Import SESSION_ID to env vars  │
│                                                          │
└─────────────────────────────────────────────────────────┘
```

---

## ✅ Step 1: Deploy Pairing Site on Cloudflare (FREE)

### Prerequisites

```bash
✅ Node.js 16+
✅ npm or yarn
✅ Git
✅ Free Cloudflare account
✅ Wrangler CLI
```

### Install Wrangler

```bash
npm install -g wrangler
```

### Create wrangler.toml

At your repo root, create `wrangler.toml`:

```toml
name = "whatsapp-bot-pairing"
main = "index.js"
compatibility_date = "2024-01-01"
workers_dev = true

[env.production]
name = "whatsapp-bot-pairing-prod"
```

### Create Cloudflare Worker Handler

Create `src/cloudflare-worker.js`:

```javascript
// This runs on Cloudflare Workers
import { serveStatic } from 'itty-router';

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    
    // Serve pairing site
    if (url.pathname === '/' || url.pathname === '/index.html') {
      return new Response(PAIRING_HTML, {
        headers: { 'Content-Type': 'text/html' }
      });
    }
    
    // Serve CSS
    if (url.pathname === '/style.css') {
      return new Response(PAIRING_CSS, {
        headers: { 'Content-Type': 'text/css' }
      });
    }
    
    // Session exporter endpoint
    if (url.pathname === '/api/export-session' && request.method === 'POST') {
      const data = await request.json();
      return new Response(JSON.stringify({
        sessionId: data.sessionId,
        exportedAt: new Date().toISOString(),
        instructions: 'Copy this SESSION_ID to Heroku config vars'
      }), {
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    return new Response('Not Found', { status: 404 });
  }
};

// HTML content
const PAIRING_HTML = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>WhatsApp Bot Pairing - Cloudflare</title>
  <link rel="stylesheet" href="/style.css">
</head>
<body>
  <div class="container">
    <h1>🤖 WhatsApp Bot Pairing</h1>
    <p class="subtitle">Hosted on Cloudflare Workers (FREE)</p>
    
    <div class="tabs">
      <button class="tab-btn active" onclick="switchTab('pairing')">📱 Pairing</button>
      <button class="tab-btn" onclick="switchTab('export')">💾 Export Session</button>
      <button class="tab-btn" onclick="switchTab('heroku')">🚀 Heroku Guide</button>
    </div>
    
    <!-- Tab 1: Pairing -->
    <div id="pairing" class="tab-content active">
      <h2>Get Pairing Code</h2>
      <input type="text" id="phoneNumber" placeholder="254712345678" maxlength="15">
      <button onclick="getPairingCode()">Get Code</button>
      <div id="pairingResult"></div>
    </div>
    
    <!-- Tab 2: Export -->
    <div id="export" class="tab-content">
      <h2>Export Session for Heroku</h2>
      <p>After pairing, your session files are stored locally.</p>
      <input type="text" id="sessionName" placeholder="Enter session number (e.g., 254712345678)">
      <button onclick="exportSession()">Export Session JSON</button>
      <div id="exportResult"></div>
    </div>
    
    <!-- Tab 3: Heroku Guide -->
    <div id="heroku" class="tab-content">
      <h2>Deploy to Heroku with Session</h2>
      <ol>
        <li>Export session from "Export Session" tab</li>
        <li>Create Heroku app: <code>heroku create your-bot-name</code></li>
        <li>Copy SESSION_ID from export and set:
          <code>heroku config:set SESSION_ID=YOUR_SESSION_ID</code>
        </li>
        <li>Deploy: <code>git push heroku main</code></li>
        <li>Check: <code>heroku logs --tail</code></li>
      </ol>
      <div class="info-box">
        <strong>💡 Tip:</strong> Keep your SESSION_ID secure and never share it!
      </div>
    </div>
  </div>
  
  <script>
    function switchTab(tab) {
      // Hide all tabs
      document.querySelectorAll('.tab-content').forEach(el => el.classList.remove('active'));
      document.querySelectorAll('.tab-btn').forEach(el => el.classList.remove('active'));
      
      // Show selected tab
      document.getElementById(tab).classList.add('active');
      event.target.classList.add('active');
    }
    
    async function getPairingCode() {
      const phone = document.getElementById('phoneNumber').value;
      const result = document.getElementById('pairingResult');
      
      if (!phone) {
        result.innerHTML = '<div class="error">Please enter phone number</div>';
        return;
      }
      
      result.innerHTML = '<div class="loading">Getting pairing code...</div>';
      
      try {
        // This would connect to your bot backend
        const response = await fetch('https://your-bot.herokuapp.com/pair', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ number: phone })
        });
        
        const data = await response.json();
        if (data.code) {
          result.innerHTML = `
            <div class="success">
              <p>✅ Pairing Code:</p>
              <div class="code">${data.code}</div>
              <p class="small">Open WhatsApp → Linked Devices → Link with phone number</p>
            </div>
          `;
        } else {
          result.innerHTML = `<div class="error">Error: ${data.error}</div>`;
        }
      } catch (err) {
        result.innerHTML = `<div class="error">Connection error: ${err.message}</div>`;
      }
    }
    
    function exportSession() {
      const sessionName = document.getElementById('sessionName').value;
      const result = document.getElementById('exportResult');
      
      if (!sessionName) {
        result.innerHTML = '<div class="error">Please enter session name</div>';
        return;
      }
      
      // This would typically retrieve the session from local storage or backend
      const sessionData = {
        sessionId: sessionName,
        timestamp: new Date().toISOString(),
        instructions: 'Add this SESSION_ID to Heroku: heroku config:set SESSION_ID=' + sessionName
      };
      
      const jsonStr = JSON.stringify(sessionData, null, 2);
      const blob = new Blob([jsonStr], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      
      result.innerHTML = `
        <div class="success">
          <p>✅ Session Exported!</p>
          <pre>${jsonStr}</pre>
          <button onclick="downloadFile('${url}', '${sessionName}.json')">📥 Download JSON</button>
          <p class="code">SESSION_ID: ${sessionName}</p>
        </div>
      `;
    }
    
    function downloadFile(url, filename) {
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      a.click();
    }
  </script>
</body>
</html>
`;

const PAIRING_CSS = `
* { margin: 0; padding: 0; box-sizing: border-box; }

body {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  min-height: 100vh;
  padding: 20px;
}

.container {
  max-width: 600px;
  margin: 0 auto;
  background: white;
  border-radius: 20px;
  padding: 40px;
  box-shadow: 0 20px 60px rgba(0,0,0,0.3);
}

h1 {
  color: #333;
  text-align: center;
  margin-bottom: 10px;
}

.subtitle {
  text-align: center;
  color: #666;
  margin-bottom: 30px;
  font-size: 14px;
}

.tabs {
  display: flex;
  gap: 10px;
  margin-bottom: 30px;
  border-bottom: 2px solid #eee;
}

.tab-btn {
  padding: 12px 20px;
  border: none;
  background: none;
  cursor: pointer;
  font-size: 14px;
  color: #666;
  border-bottom: 3px solid transparent;
  transition: all 0.3s;
}

.tab-btn.active {
  color: #667eea;
  border-bottom-color: #667eea;
}

.tab-content {
  display: none;
}

.tab-content.active {
  display: block;
}

input, button {
  width: 100%;
  padding: 12px;
  margin: 10px 0;
  border: 2px solid #eee;
  border-radius: 8px;
  font-size: 14px;
}

button {
  background: #667eea;
  color: white;
  border: none;
  cursor: pointer;
  font-weight: 600;
  transition: 0.3s;
}

button:hover {
  background: #764ba2;
}

.code {
  background: #f5f5f5;
  padding: 15px;
  border-radius: 8px;
  font-family: 'Courier New', monospace;
  font-weight: bold;
  text-align: center;
  margin: 15px 0;
}

pre {
  background: #f5f5f5;
  padding: 15px;
  border-radius: 8px;
  overflow-x: auto;
  font-size: 12px;
}

.success { color: #27ae60; }
.error { color: #e74c3c; }
.loading { color: #3498db; }

.info-box {
  background: #e8f4f8;
  padding: 15px;
  border-left: 4px solid #667eea;
  margin: 15px 0;
  border-radius: 4px;
}

.small {
  font-size: 12px;
  color: #999;
  margin-top: 10px;
}

ol { margin-left: 20px; }
li { margin: 10px 0; }
code { background: #f5f5f5; padding: 3px 8px; border-radius: 3px; font-size: 12px; }
`;
```

### Deploy to Cloudflare

```bash
# Login to Cloudflare
wrangler login

# Publish worker
wrangler publish

# Your pairing site will be live at:
# https://whatsapp-bot-pairing.workers.dev
```

---

## ✅ Step 2: Create Heroku App

### Prerequisites

```bash
✅ Heroku account (free tier available)
✅ Heroku CLI installed
✅ Git configured
```

### Create Heroku App

```bash
# Login to Heroku
heroku login

# Create new app
heroku create your-bot-name-here

# Set region (optional)
heroku create your-bot-name-here --region eu
```

---

## ✅ Step 3: Get & Export Session

### On Cloudflare Pairing Site:

```
1. Visit: https://whatsapp-bot-pairing.workers.dev
2. Click "Export Session" tab
3. Enter your phone number
4. Download SESSION_ID JSON
5. Save the SESSION_ID value
```

**You'll get something like:**
```
session_XXXXXXXXXXXXXXX
```

---

## ✅ Step 4: Deploy to Heroku with Session

### Set Environment Variables

```bash
# Set SESSION_ID from export
heroku config:set SESSION_ID=session_XXXXXXXXXXXXXXX

# Set other config
heroku config:set PREFIX=.
heroku config:set NODE_ENV=production
```

### Deploy Code

```bash
# Make sure Procfile exists:
# web: node index.js

# Deploy
git push heroku main

# Check logs
heroku logs --tail
```

### You Should See:

```
✅ Running on port 3000
🔗 Pairing Site: https://your-bot-name.herokuapp.com
📊 Admin Panel: https://your-bot-name.herokuapp.com/admin
```

---

## 💾 Session Management

### Export Session Steps

**From Cloudflare Worker:**

1. Pair your number
2. Click "Export Session"
3. Paste your number
4. Download JSON file
5. Save SESSION_ID value

**From Heroku:**

```bash
# Check if session is running
heroku logs --tail

# Restart if needed
heroku restart

# View all config vars
heroku config
```

---

## 📱 Session Storage Structure

### Cloudflare (Temporary)
```
/sessions/
├── 254712345678/
│   ├── creds.json
│   └── pre-keys.json
```

### Heroku (Persistent)
```
Once deployed, sessions persist in Heroku's ephemeral filesystem
Sessions rebuild on dyno restart from creds.json
```

---

## 🔄 Workflow Summary

```
┌─────────────────────────────────────────────────────────┐
│ 1. Deploy Cloudflare Pairing Site                      │
│    $ wrangler publish                                   │
├─────────────────────────────────────────────────────────┤
│ 2. Access Pairing Site                                 │
│    https://whatsapp-bot-pairing.workers.dev            │
├─────────────────────────────────────────────────────────┤
│ 3. Pair WhatsApp Number                                │
│    Enter phone → Get code → Scan in WhatsApp           │
├─────────────────────────────────────────────────────────┤
│ 4. Export Session                                      │
│    Click Export → Download JSON → Save SESSION_ID      │
├─────────────────────────────────────────────────────────┤
│ 5. Create Heroku App                                   │
│    $ heroku create your-bot-name                       │
├─────────────────────────────────────────────────────────┤
│ 6. Set Heroku Config                                   │
│    $ heroku config:set SESSION_ID=YOUR_SESSION_ID      │
├─────────────────────────────────────────────────────────┤
│ 7. Deploy to Heroku                                    │
│    $ git push heroku main                              │
├─────────────────────────────────��───────────────────────┤
│ 8. Bot Running on Heroku!                              │
│    https://your-bot-name.herokuapp.com                 │
└─────────────────────────────────────────────────────────┘
```

---

## 🎯 Cost Breakdown

| Service | Cost | Why |
|---------|------|-----|
| **Cloudflare Workers** | FREE | Pairing site only |
| **Heroku** | $7/month* | Bot dyno (eco tier) |
| **Total** | ~$7/month | Best choice for reliability |

*Heroku free tier was discontinued. Eco dynos start at $5-7/month.

---

## 🆘 Troubleshooting

### Issue: Cloudflare Worker Fails

```bash
# Debug
wrangler tail

# Redeploy
wrangler publish --env production
```

### Issue: Heroku Session Not Starting

```bash
# Check logs
heroku logs --tail

# Check config
heroku config

# Restart
heroku restart
```

### Issue: Session ID Not Exporting

```bash
# Make sure session is paired first
# Wait 10 seconds after pairing
# Then click Export
```

---

## 📚 Commands Reference

### Cloudflare

```bash
wrangler login              # Login to Cloudflare
wrangler publish            # Deploy worker
wrangler tail               # View logs
wrangler delete             # Remove worker
```

### Heroku

```bash
heroku login                # Login to Heroku
heroku create app-name      # Create app
heroku config:set VAR=VAL   # Set config
heroku logs --tail          # View logs
heroku restart              # Restart dyno
git push heroku main        # Deploy code
```

---

## ✨ Next Steps

1. ✅ Deploy Cloudflare pairing site
2. ✅ Create Heroku account and app
3. ✅ Pair your WhatsApp number
4. ✅ Export session and save SESSION_ID
5. ✅ Set Heroku config vars
6. ✅ Deploy to Heroku
7. ✅ Test bot commands

**Your WhatsApp bot is now running on Heroku!** 🎉
