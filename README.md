# 🤖 CHARLTON MD

A fast and lightweight WhatsApp Multi-Device bot built with Baileys.

---

## ⚡ FEATURES

- ✅ Pairing Code Login
- ✅ Fast WhatsApp Connection
- ✅ Session ID Support
- ✅ Auto Reconnect
- ✅ Easy Deployment
- ✅ Clean and Simple Structure

---

# 🍴 FORK REPOSITORY

https://github.com/roy107roy12-netizen/Whatsapp-bot

---

# 🔐 SESSION GENERATOR

Use this code to generate your session ID from `creds.json`.

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

# 🔗 PAIRING PLATFORM

Use these platforms to host your pairing code system:

- https://render.com
- https://railway.app

---

# ☁️ SESSION GENERATOR PLATFORM

Recommended platforms for session generator hosting:

- https://replit.com
- https://glitch.com

---

# ☁️ DEPLOY ON HEROKU

https://www.heroku.com

## HEROKU COMMANDS

```bash
heroku login
heroku create
git push heroku main
```

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

# 🛠 REQUIREMENTS

- Node.js 18+
- Git
- WhatsApp Account

---

# 👑 OWNER

CHARLTON MD

GitHub:
https://github.com/roy107roy12-netizen

---

# ⭐ SUPPORT

Give this repository a star if you like the project ⭐
