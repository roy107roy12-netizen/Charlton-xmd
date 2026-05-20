<h1 align="center">CHARLTON-MD</h1>

<h3 align="center">
A simple WhatsApp Multi Device bot using the latest Baileys API.
</h3>

<div style="text-align: center;">
  <a href="https://github.com/roy107roy12-netizen/Whatsapp-bot">
    <img src="https://i.ibb.co/twqdcc2y/ba0d6b394b57.jpg" alt="CHARLTON-MD" border="0" />
  </a>

  <hr style="margin-top: 20px; margin-bottom: 20px;"/>
</div>

<p align="center">
  <a href="https://github.com/roy107roy12-netizen/Whatsapp-bot">
    <img title="Author" src="https://img.shields.io/badge/AUTHOR-CHARLTON--MD-green?style=for-the-badge&logo=github">
  </a>

  <a href="https://github.com/roy107roy12-netizen/Whatsapp-bot/stargazers">
    <img title="Stars" src="https://img.shields.io/github/stars/roy107roy12-netizen/Whatsapp-bot?style=for-the-badge&color=yellow">
  </a>

  <a href="https://github.com/roy107roy12-netizen/Whatsapp-bot/network/members">
    <img title="Forks" src="https://img.shields.io/github/forks/roy107roy12-netizen/Whatsapp-bot?style=for-the-badge&color=orange">
  </a>
</p>

---

<table align="center" cellpadding="10" border="1">

<tr>
<td align="center">

<b>🍴 FORK REPO</b><br>
Fork and customize CHARLTON-MD.

<br><br>

<a href="https://github.com/roy107roy12-netizen/Whatsapp-bot/fork">
<img src="https://img.shields.io/badge/FORK-CHARLTON--MD-purple?style=for-the-badge" width="220">
</a>

</td>

<td align="center">

<b>🔐 PAIR SESSION</b><br>
Generate your WhatsApp Session ID.

<br><br>

<a href="https://charlton-pairsite.com">
<img src="https://img.shields.io/badge/PAIRING%20CODE-SESSION-success?style=for-the-badge" width="260">
</a>

</td>
</tr>

<tr>
<td align="center">

<b>📥 DOWNLOAD ZIP</b><br>
Download latest bot files.

<br><br>

<a href="https://github.com/roy107roy12-netizen/Whatsapp-bot/archive/refs/heads/main.zip">
<img src="https://img.shields.io/badge/DOWNLOAD-ZIP-blue?style=for-the-badge" width="220">
</a>

</td>

<td align="center">

<b>☁️ DEPLOY HEROKU</b><br>
Deploy CHARLTON-MD easily.

<br><br>

<a href="https://dashboard.heroku.com/new?template=https://github.com/roy107roy12-netizen/Whatsapp-bot">
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
- Multi Device Support
- Easy Heroku Deployment
- Baileys Based
- Simple Plugin System
- Custom Pair Site
- QR + Pair Code Support

---

# 🚀 DEPLOYMENT STEPS

### 1️⃣ Fork The Repository
Click the fork button above.

### 2️⃣ Generate Session ID
Use the pairing site below:

<a href="https://charlton-pairsite.onrender.com">
<img src="https://img.shields.io/badge/GENERATE-SESSION-green?style=for-the-badge">
</a>

### 3️⃣ Deploy To Heroku

<a href="https://dashboard.heroku.com/new?template=https://github.com/roy107roy12-netizen/Whatsapp-bot">
<img src="https://www.herokucdn.com/deploy/button.svg">
</a>

---

# 🔐 SESSION GENERATOR

```js
import zlib from "zlib"
import fs from "fs"

function generateSession() {
  const data = fs.readFileSync("./session/creds.json")
  const compressed = zlib.gzipSync(data).toString("base64")
  console.log(`CHARLTON;;;${compressed}`)
}

generateSession()
