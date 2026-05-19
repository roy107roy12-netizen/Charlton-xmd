<h1 align="center">CHARLTON-MD</h1>

<h3 align="center">
A simple WhatsApp Multi Device bot using the latest Baileys API.
</h3>

<div style="text-align: center;">
  <a href="https://github.com/roy107roy12-netizen/Whatsapp-bot">
    <img src="https://i.ibb.co/PsZnb9NH/0d81ac6b1fb1.jpg" alt="CHARLTON-MD" border="0" />
  </a>

  <hr style="margin-top: 20px; margin-bottom: 20px;"/>
</div>

<table align="center" cellpadding="10" border="1">

<tr>
<td align="center">

<b>🍴 FORK</b><br>
Fork the repository and customize the bot for your own use.

<br><br>

<a href="https://github.com/roy107roy12-netizen/Whatsapp-bot/fork">
<img src="https://img.shields.io/badge/FORK-CHARLTON--MD-purple" width="170">
</a>

</td>

<td align="center">

<b>🔐 SESSION</b><br>
Generate and link your WhatsApp session ID easily.

<br><br>

<a href="https://replit.com">
<img src="https://img.shields.io/badge/PAIR%20SESSION-CODE-white" width="260">
</a>

</td>
</tr>

<tr>
<td align="center">

<b>📥 DOWNLOAD ZIP</b><br>
Download the latest CHARLTON-MD zip package.

<br><br>

<a href="https://github.com/roy107roy12-netizen/Whatsapp-bot/archive/refs/heads/main.zip">
<img src="https://img.shields.io/badge/DOWNLOAD-ZIP-blue" width="200">
</a>

</td>

<td align="center">

<b>☁️ DEPLOY</b><br>
Deploy the bot easily on Heroku.

<br><br>

<a href="https://www.heroku.com">
<img src="https://www.herokucdn.com/deploy/button.svg">
</a>

</td>
</tr>

</table>

---

# ⚡ FEATURES

- Pairing Code Login
- Session ID Support
- Fast WhatsApp Connection
- Auto Reconnect
- Baileys Based
- Easy Deployment

---

# 🔐 SESSION GENERATOR

```js
import zlib from "zlib"
import fs from "fs"

function generateSession() {
  const data = fs.readFileSync("./session/creds.json")
  const compressed = zlib.gzipSync(data).toString("base64")
  return "KEITH;;;" + compressed
}

console.log(generateSession())
```

---

# 📦 INSTALLATION

```bash
git clone https://github.com/roy107roy12-netizen/Whatsapp-bot

cd Whatsapp-bot

npm install
```

---

# ▶️ START BOT

```bash
npm start
```

---

# ☁️ DEPLOYMENT PLATFORMS

### HEROKU
https://www.heroku.com

### RAILWAY
https://railway.app

### RENDER
https://render.com

---

# 📂 PROJECT STRUCTURE

```bash
.
├── session/
│   └── creds.json
├── index.js
├── package.json
└── README.md
```

---

# 👑 OWNER

### CHARLTON MD

GitHub:
https://github.com/roy107roy12-netizen

---

<p align="center">
<i>
I created this bot to make WhatsApp automation simple and enjoyable.
Maintaining and improving the project is what keeps me motivated every day.
</i>
</p>
