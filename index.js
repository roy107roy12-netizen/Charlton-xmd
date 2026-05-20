const { default: makeWASocket, useMultiFileAuthState, DisconnectReason } = require('@whiskeysockets/baileys');
const pino = require('pino');
const express = require('express');
require('dotenv').config();

const { commandHandler } = require('./src/handlers/commandHandler');
const { autoReplyHandler } = require('./src/handlers/autoReplyHandler');

const app = express();
const log = pino({ transport: { target: 'pino-pretty' } });

let sock;

// =========================
// EXPRESS SERVER
// =========================

app.get("/", (req, res) => {
  res.send("CHARLTON BOT RUNNING ✅");
});

app.get("/pair", async (req, res) => {
  const number = req.query.number;

  if (!sock) {
    return res.send("Bot not connected yet. Please wait...");
  }

  if (!number) {
    return res.send("Use /pair?number=2547XXXXXXXX");
  }

  try {
    const code = await sock.requestPairingCode(number);

    res.send(`
      <html>
        <head>
          <title>CHARLTON BOT PAIR</title>
        </head>
        <body style="font-family:sans-serif;text-align:center;padding-top:50px;">
          <h2>CHARLTON WHATSAPP BOT</h2>
          <h1>${code}</h1>
          <p>Open WhatsApp → Linked Devices → Link with phone number</p>
        </body>
      </html>
    `);

  } catch (err) {
    console.log(err);
    res.send("Failed to generate pairing code");
  }
});

// =========================
// WHATSAPP CONNECTION
// =========================

async function connectToWhatsApp() {
  const { state, saveCreds } = await useMultiFileAuthState('auth_info_baileys');

  sock = makeWASocket({
    auth: state,
    printQRInTerminal: false,
    logger: pino({ level: 'silent' }),
    browser: ['CHARLTON BOT', 'Chrome', '1.0']
  });

  sock.ev.on('creds.update', saveCreds);

  sock.ev.on('connection.update', (update) => {
    const { connection, lastDisconnect } = update;

    if (connection === 'close') {
      const shouldReconnect =
        lastDisconnect?.error?.output?.statusCode !== DisconnectReason.loggedOut;

      if (shouldReconnect) {
        connectToWhatsApp();
      } else {
        log.info("Logged out. Restart required.");
      }

    } else if (connection === 'open') {
      log.info("✅ WhatsApp Connected");
    }
  });

  sock.ev.on('messages.upsert', async (m) => {
    const message = m.messages[0];
    if (!message.message || message.key.fromMe) return;

    const messageText =
      message.message.conversation ||
      message.message.extendedTextMessage?.text ||
      '';

    const sender = message.key.remoteJid;
    const isGroup = sender.endsWith('@g.us');
    const senderName = message.pushName || 'User';

    log.info(`📩 ${senderName}: ${messageText}`);

    const commandResult = await commandHandler(
      sock,
      message,
      messageText,
      sender,
      senderName,
      isGroup
    );

    if (!commandResult) {
      await autoReplyHandler(sock, message, messageText, sender, senderName, isGroup);
    }
  });
}

// =========================
// START SERVER + BOT
// =========================

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("🌐 Server running on port " + PORT);
  connectToWhatsApp();
});
