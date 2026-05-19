const { default: makeWASocket, useMultiFileAuthState, DisconnectReason } = require('@whiskeysockets/baileys');
const { Boom } = require('@hapi/boom');
const pino = require('pino');
const path = require('path');
require('dotenv').config();

const { commandHandler } = require('./src/handlers/commandHandler');
const { autoReplyHandler } = require('./src/handlers/autoReplyHandler');

const logger = pino();
const log = pino({ transport: { target: 'pino-pretty' } });

let sock;

async function connectToWhatsApp() {
  const { state, saveCreds } = await useMultiFileAuthState('auth_info_baileys');
  
  sock = makeWASocket({
    auth: state,
    printQRInTerminal: false,
    logger: pino({ level: 'silent' }),
    browser: ['WhatsApp Bot', 'Chrome', '10.15.3']
  });

  sock.ev.on('creds.update', saveCreds);

  sock.ev.on('connection.update', (update) => {
    const { connection, lastDisconnect } = update;
    
    if (connection === 'close') {
      if (lastDisconnect?.error?.output?.statusCode !== DisconnectReason.loggedOut) {
        connectToWhatsApp();
      } else {
        log.info('Connection closed. Device logged out.');
        process.exit();
      }
    } else if (connection === 'open') {
      log.info('✅ Connection opened');
    }
  });

  sock.ev.on('messages.upsert', async (m) => {
    const message = m.messages[0];
    
    if (!message.message || message.key.fromMe) return;

    const messageText = message.message.conversation || 
                       message.message.extendedTextMessage?.text || '';
    
    const sender = message.key.remoteJid;
    const isGroup = sender.endsWith('@g.us');
    const senderName = message.pushName || 'User';

    log.info(`📨 Message from ${senderName}: ${messageText}`);

    // Handle commands
    const commandResult = await commandHandler(sock, message, messageText, sender, senderName, isGroup);
    
    // Handle auto-reply if no command matched
    if (!commandResult) {
      await autoReplyHandler(sock, message, messageText, sender, senderName, isGroup);
    app.get("/pair", async (req, res) => {
  const number = req.query.number

  if (!number) {
    return res.send("Use /pair?number=2547XXXXXXXX")
  }

  try {
    const code = await sock.requestPairingCode(number)

    res.send(`
      <html>
      <head>
        <title>CHARLTON BOT PAIR</title>
      </head>
      <body style="font-family:sans-serif;text-align:center;padding-top:50px;">
        <h2>CHARLTON WHATSAPP BOT</h2>
        <h1>${code}</h1>
        <p>Open WhatsApp > Linked Devices > Link with phone number</p>
      </body>
      </html>
    `)

  } catch (err) {
    console.log(err)
    res.send("Failed to generate pairing code")
  const express = require("express")
const app = express()

app.get("/", (req, res) => {
  res.send("CHARLTON BOT RUNNING")
})

app.get("/pair", async (req, res) => {
  const number = req.query.number

  if (!number) {
    return res.send("Use /pair?number=2547XXXXXXXX")
  }

  try {
    const code = await sock.requestPairingCode(number)

    res.send(`
      <html>
      <body style="font-family:sans-serif;text-align:center;padding-top:50px;">
      <h2>CHARLTON WHATSAPP BOT</h2>
      <h1>${code}</h1>
      </body>
      </html>
    `)

  } catch (err) {
    console.log(err)
    res.send("Failed to generate pairing code")
  }
})

app.listen(process.env.PORT || 3000, () => {
  console.log("Server running")
})
