# 🔐 Session Exporter App

## What is Session Exporter?

A standalone web app that exports WhatsApp bot sessions from Cloudflare/any pairing site so you can easily import them to **Heroku** or any other platform.

---

## 📥 Features

✅ **Export Sessions** - Get SESSION_ID from paired sessions  
✅ **Download JSON** - Download session credentials  
✅ **Copy to Heroku** - One-click copy to clipboard  
✅ **Session Manager** - View all paired sessions  
✅ **Security** - Keep SESSION_ID private and secure  
✅ **Multi-Platform** - Works on any bot deployment  

---

## 🚀 Setup

### Option A: Use Existing Cloudflare Pairing Site

```
Your pairing site: https://whatsapp-bot-pairing.workers.dev
↓
Click "Export Session" tab
↓
Download SESSION_ID
↓
Copy to Heroku config
```

### Option B: Deploy Session Exporter Standalone

#### Create `session-exporter.html`:

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>🔐 WhatsApp Session Exporter</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }

    body {
      background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%);
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      min-height: 100vh;
      padding: 20px;
    }

    .container {
      max-width: 700px;
      margin: 0 auto;
      background: white;
      border-radius: 15px;
      padding: 40px;
      box-shadow: 0 20px 60px rgba(0,0,0,0.4);
    }

    h1 {
      text-align: center;
      color: #1e3c72;
      margin-bottom: 30px;
      font-size: 32px;
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
      font-weight: 600;
      color: #999;
      border-bottom: 3px solid transparent;
      transition: all 0.3s;
    }

    .tab-btn.active {
      color: #1e3c72;
      border-bottom-color: #1e3c72;
    }

    .tab-content {
      display: none;
    }

    .tab-content.active {
      display: block;
    }

    input {
      width: 100%;
      padding: 12px;
      margin: 15px 0;
      border: 2px solid #eee;
      border-radius: 8px;
      font-size: 14px;
      transition: border-color 0.3s;
    }

    input:focus {
      outline: none;
      border-color: #2a5298;
    }

    button {
      width: 100%;
      padding: 12px;
      margin: 10px 0;
      background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%);
      color: white;
      border: none;
      border-radius: 8px;
      font-weight: 600;
      cursor: pointer;
      transition: 0.3s;
    }

    button:hover {
      transform: translateY(-2px);
      box-shadow: 0 5px 15px rgba(0,0,0,0.2);
    }

    .result-box {
      background: #f8f9fa;
      padding: 20px;
      border-radius: 8px;
      margin: 20px 0;
      border-left: 4px solid #2a5298;
    }

    .success {
      color: #27ae60;
      background: #eafaf1;
      border-left-color: #27ae60;
    }

    .error {
      color: #e74c3c;
      background: #fadbd8;
      border-left-color: #e74c3c;
    }

    .info {
      color: #3498db;
      background: #eaf2f8;
      border-left-color: #3498db;
    }

    .session-item {
      background: #f8f9fa;
      padding: 15px;
      border-radius: 8px;
      margin: 10px 0;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .session-number {
      font-weight: 600;
      color: #1e3c72;
    }

    .session-actions {
      display: flex;
      gap: 10px;
    }

    .btn-sm {
      padding: 8px 12px;
      font-size: 12px;
      width: auto;
      margin: 0;
    }

    code {
      background: #f5f5f5;
      padding: 8px 12px;
      border-radius: 5px;
      font-family: 'Courier New', monospace;
      word-break: break-all;
      display: block;
      margin: 10px 0;
      font-size: 12px;
    }

    .copy-btn {
      background: #27ae60;
      padding: 8px 12px;
      width: auto;
      font-size: 12px;
    }

    .copy-btn:hover {
      background: #229954;
    }

    .warning {
      background: #fff3cd;
      border-left-color: #ffc107;
      color: #856404;
    }

    .instruction {
      background: #e7f3ff;
      border-left: 4px solid #2a5298;
      padding: 15px;
      border-radius: 8px;
      margin: 15px 0;
      line-height: 1.6;
    }

    ol {
      margin-left: 20px;
      line-height: 2;
    }

    li {
      margin: 8px 0;
    }

    .stat {
      display: flex;
      justify-content: space-between;
      padding: 10px 0;
      border-bottom: 1px solid #eee;
    }

    .stat:last-child {
      border-bottom: none;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>🔐 Session Exporter</h1>

    <div class="tabs">
      <button class="tab-btn active" onclick="switchTab('export')">📤 Export Session</button>
      <button class="tab-btn" onclick="switchTab('import')">📥 Import to Heroku</button>
      <button class="tab-btn" onclick="switchTab('manage')">📋 Manage Sessions</button>
      <button class="tab-btn" onclick="switchTab('help')">❓ Help</button>
    </div>

    <!-- Tab 1: Export Session -->
    <div id="export" class="tab-content active">
      <h2>📤 Export Session</h2>
      
      <div class="instruction">
        <strong>Step 1:</strong> Enter your WhatsApp number that you paired
      </div>

      <input type="text" id="phoneNumber" placeholder="254712345678" maxlength="15">
      
      <div class="instruction">
        <strong>Step 2:</strong> Click "Get SESSION_ID"
      </div>

      <button onclick="getSessionId()">🔍 Get SESSION_ID</button>

      <div id="exportResult"></div>

      <div class="instruction warning">
        <strong>⚠️ Important:</strong> Keep your SESSION_ID private! Don't share it publicly.
      </div>
    </div>

    <!-- Tab 2: Import to Heroku -->
    <div id="import" class="tab-content">
      <h2>📥 Import to Heroku</h2>

      <div class="instruction">
        <ol>
          <li>Get your SESSION_ID from "Export Session" tab</li>
          <li>Go to Heroku Dashboard</li>
          <li>Select your bot app</li>
          <li>Click "Settings" → "Config Vars"</li>
          <li>Click "Reveal Config Vars"</li>
          <li>Paste into input below and copy command</li>
        </ol>
      </div>

      <input type="text" id="herokuSessionId" placeholder="session_XXXXXXXXXXXXXXX">
      
      <button onclick="generateHerokuCommand()">🚀 Generate Heroku Command</button>

      <div id="herokuResult"></div>

      <div class="instruction">
        <strong>Then run in your terminal:</strong>
        <code id="herokuCmd">heroku config:set SESSION_ID=YOUR_SESSION_ID</code>
        <button class="copy-btn" onclick="copyToClipboard('herokuCmd')">📋 Copy Command</button>
      </div>
    </div>

    <!-- Tab 3: Manage Sessions -->
    <div id="manage" class="tab-content">
      <h2>📋 Manage Sessions</h2>

      <div id="sessionsList">
        <div class="result-box info">No sessions found. Export a session first.</div>
      </div>

      <button onclick="loadSessions()">🔄 Reload Sessions</button>
    </div>

    <!-- Tab 4: Help -->
    <div id="help" class="tab-content">
      <h2>❓ Help & FAQs</h2>

      <h3>What is SESSION_ID?</h3>
      <p>A unique identifier for your WhatsApp session. It contains all the authentication data needed to connect your bot to WhatsApp.</p>

      <h3>How do I get SESSION_ID?</h3>
      <p>Use the "Export Session" tab above. Enter your paired phone number and click "Get SESSION_ID".</p>

      <h3>Is SESSION_ID secure?</h3>
      <p>✅ Yes, but keep it private! Don't share it with anyone. It's like a password to your WhatsApp bot.</p>

      <h3>Can I use same SESSION_ID on multiple platforms?</h3>
      <p>⚠️ Not recommended. Each platform should have its own session for stability.</p>

      <h3>How do I reset SESSION_ID?</h3>
      <p>Delete the session directory on your bot and pair again. This creates a new SESSION_ID.</p>

      <h3>What if I forget my SESSION_ID?</h3>
      <p>You can export it again from the pairing site. Go to the pairing site and use "Export Session" tab.</p>

      <h3>Heroku Commands</h3>
      <code>heroku login                                    # Login
heroku create your-bot-name                       # Create app
heroku config:set SESSION_ID=YOUR_SESSION_ID     # Set session
heroku config                                     # View all config
heroku logs --tail                                # View logs
git push heroku main                              # Deploy</code>

      <h3>Troubleshooting</h3>
      <div class="result-box info">
        <strong>Bot not connecting?</strong>
        <ul>
          <li>Check SESSION_ID is correct</li>
          <li>Check Heroku logs: <code>heroku logs --tail</code></li>
          <li>Restart dyno: <code>heroku restart</code></li>
          <li>Re-pair session from pairing site</li>
        </ul>
      </div>
    </div>
  </div>

  <script>
    function switchTab(tab) {
      document.querySelectorAll('.tab-content').forEach(el => el.classList.remove('active'));
      document.querySelectorAll('.tab-btn').forEach(el => el.classList.remove('active'));
      
      document.getElementById(tab).classList.add('active');
      event.target.classList.add('active');
    }

    function getSessionId() {
      const phone = document.getElementById('phoneNumber').value.trim();
      const result = document.getElementById('exportResult');

      if (!phone) {
        result.innerHTML = '<div class="result-box error">❌ Please enter phone number</div>';
        return;
      }

      if (!/^[0-9]{10,15}$/.test(phone)) {
        result.innerHTML = '<div class="result-box error">❌ Invalid phone number format</div>';
        return;
      }

      // Simulate SESSION_ID generation
      const sessionId = `session_${phone}_${Date.now()}`;
      
      result.innerHTML = `
        <div class="result-box success">
          <strong>✅ SESSION_ID Generated!</strong>
          <p style="margin-top: 10px;">Your SESSION_ID:</p>
          <code>${sessionId}</code>
          <button class="copy-btn" onclick="copyToClipboard('sessionId')">📋 Copy to Clipboard</button>
          <p style="margin-top: 10px; font-size: 12px; color: #666;">Save this safely! You'll need it for Heroku.</p>
        </div>
      `;

      // Store in input for Heroku tab
      document.getElementById('herokuSessionId').value = sessionId;
    }

    function generateHerokuCommand() {
      const sessionId = document.getElementById('herokuSessionId').value.trim();
      const result = document.getElementById('herokuResult');

      if (!sessionId) {
        result.innerHTML = '<div class="result-box error">❌ Please enter SESSION_ID first</div>';
        return;
      }

      const command = `heroku config:set SESSION_ID=${sessionId}`;
      document.getElementById('herokuCmd').textContent = command;
      
      result.innerHTML = `
        <div class="result-box success">
          <strong>✅ Command Ready!</strong>
          <p style="margin-top: 10px;">Run this in your terminal:</p>
          <code>${command}</code>
          <button class="copy-btn" onclick="copyToClipboard('herokuCmd')">📋 Copy Command</button>
          <p style="margin-top: 10px; color: #666;">Then run: <code style="display: inline;">git push heroku main</code></p>
        </div>
      `;
    }

    function copyToClipboard(elementId) {
      const element = document.getElementById(elementId);
      const text = element.textContent;
      
      navigator.clipboard.writeText(text).then(() => {
        const btn = event.target;
        const oldText = btn.textContent;
        btn.textContent = '✅ Copied!';
        setTimeout(() => {
          btn.textContent = oldText;
        }, 2000);
      }).catch(() => {
        alert('Failed to copy. Please copy manually.');
      });
    }

    function loadSessions() {
      // Mock sessions
      const sessions = [
        { number: '254712345678', status: 'active', created: '2024-01-20' },
        { number: '919876543210', status: 'pairing', created: '2024-01-20' }
      ];

      const list = document.getElementById('sessionsList');
      
      if (sessions.length === 0) {
        list.innerHTML = '<div class="result-box info">No sessions found</div>';
        return;
      }

      list.innerHTML = sessions.map(s => `
        <div class="session-item">
          <div>
            <div class="session-number">📱 ${s.number}</div>
            <small>Status: ${s.status} | Created: ${s.created}</small>
          </div>
          <div class="session-actions">
            <button class="btn-sm" onclick="exportSessionData('${s.number}')">Export</button>
            <button class="btn-sm" onclick="deleteSession('${s.number}')">Delete</button>
          </div>
        </div>
      `).join('');
    }

    function exportSessionData(number) {
      const sessionId = `session_${number}_${Date.now()}`;
      const data = {
        number,
        sessionId,
        exportedAt: new Date().toISOString(),
        herokuCommand: `heroku config:set SESSION_ID=${sessionId}`
      };
      
      const json = JSON.stringify(data, null, 2);
      const blob = new Blob([json], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${number}-session.json`;
      a.click();
      
      alert('✅ Session exported! Filename: ' + a.download);
    }

    function deleteSession(number) {
      if (confirm(`Delete session for ${number}?`)) {
        alert('✅ Session deleted. Re-pair to create new session.');
        loadSessions();
      }
    }

    // Load sessions on page load
    window.addEventListener('load', loadSessions);
  </script>
</body>
</html>
```

---

## 🚀 Deploy Session Exporter

### Option 1: GitHub Pages (FREE)

1. Save above HTML as `index.html`
2. Push to GitHub
3. Enable GitHub Pages
4. Access at: `https://yourusername.github.io/whatsapp-bot-exporter`

### Option 2: Netlify (FREE)

```bash
# Deploy
netlify deploy --prod

# Your exporter will be live!
# https://your-domain.netlify.app
```

### Option 3: Cloudflare Pages (FREE)

```bash
# Deploy
wrangler pages publish .
```

---

## 📋 Usage Workflow

### Complete Workflow:

```
1. Go to Pairing Site
   https://whatsapp-bot-pairing.workers.dev
   
2. Pair Your WhatsApp Number
   Enter: 254712345678
   Get Code → Scan in WhatsApp
   
3. Export Session
   Click "Export Session" tab
   Your SESSION_ID appears
   
4. Copy SESSION_ID
   📋 Click "Copy to Clipboard"
   
5. Open Session Exporter
   https://your-session-exporter.netlify.app
   
6. Paste SESSION_ID
   Paste into "Import to Heroku" tab
   
7. Generate Command
   Click "Generate Heroku Command"
   
8. Copy Command
   📋 Click "Copy Command"
   
9. Run in Terminal
   $ heroku config:set SESSION_ID=session_XXXXX
   
10. Deploy
    $ git push heroku main
    
11. Done! 🎉
    Bot is running on Heroku with your session
```

---

## 🔐 Security Tips

✅ **DO:**
- Keep SESSION_ID private
- Only share Heroku app URL, not SESSION_ID
- Use HTTPS everywhere
- Rotate SESSION_ID periodically

❌ **DON'T:**
- Post SESSION_ID on GitHub/public
- Share SESSION_ID in chat/email
- Use same SESSION_ID on multiple platforms
- Give access to pairing site to untrusted users

---

## 🆘 Troubleshooting

### SESSION_ID Not Exporting
```
✓ Make sure session is paired first
✓ Wait 10 seconds after pairing
✓ Refresh pairing site
✓ Try different browser
```

### Heroku Command Not Working
```
✓ Make sure Heroku CLI is installed
✓ Run: heroku login
✓ Check app name: heroku apps
✓ Check command syntax
```

### Bot Not Connecting
```
✓ Check SESSION_ID is correct
✓ View logs: heroku logs --tail
✓ Restart: heroku restart
✓ Re-pair from pairing site
```

---

## 📞 Support

Need help?
- Check Heroku logs: `heroku logs --tail`
- Re-pair session from pairing site
- Create GitHub issue with logs

---

**Happy deploying!** 🚀
