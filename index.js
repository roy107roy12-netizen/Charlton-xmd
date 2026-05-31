const http = require('http');
const fs = require('fs');
const path = require('path');
const pino = require('pino');

const {
  default: makeWASocket,
  useMultiFileAuthState,
  makeCacheableSignalKeyStore
} = require('@whiskeysockets/baileys');

const PORT = process.env.PORT || 3000;

const sessions = new Map();
const activeSessions = new Map();

/* ================= ERROR HANDLERS ================= */
process.on("uncaughtException", (err) => {
  console.log("❌ UNCAUGHT ERROR:", err);
});

process.on("unhandledRejection", (err) => {
  console.log("❌ PROMISE ERROR:", err);
});

/* ================= HTML ================= */
const HTML = `
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>CHARLTON Pair</title>
<style>
body{background:#0d1117;color:white;font-family:sans-serif;display:flex;justify-content:center;align-items:center;height:100vh;margin:0}
.box{background:#161b22;padding:25px;border-radius:15px;width:320px;text-align:center}
input,button{width:100%;padding:12px;margin-top:10px;border-radius:8px;border:none}
button{background:#25D366;color:white;font-weight:bold;cursor:pointer}
.code{font-size:28px;color:#25D366;margin-top:15px}
</style>
</head>
<body>
<div class="box">
<h2>CHARLTON PAIR</h2>
<input id="num" placeholder="254712345678">
<button onclick="pair()">Get Code</button>
<div id="out"></div>
</div>

<script>
async function pair(){
  const num=document.getElementById('num').value;
  const out=document.getElementById('out');

  if(!num){
    out.innerHTML="Enter number";
    return;
  }

  out.innerHTML="Loading...";

  const res=await fetch('/pair',{
    method:'POST',
    headers:{'Content-Type':'application/json'},
    body:JSON.stringify({number:num})
  });

  const data=await res.json();

  if(data.code){
    out.innerHTML='<div class="code">'+data.code+'</div>';
  }else{
    out.innerHTML=data.error;
  }
}
</script>
</body>
</html>
`;

/* ================= SESSION FUNCTION ================= */
async function createSession(number) {
  try {
    const dir = path.join('/tmp', number); // IMPORTANT FIX for Heroku

    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    const { state, saveCreds } = await useMultiFileAuthState(dir);

    const sock = makeWASocket({
      auth: {
        creds: state.creds,
        keys: makeCacheableSignalKeyStore(state.keys, pino({ level: 'silent' }))
      },
      logger: pino({ level: 'silent' }),
      printQRInTerminal: false
    });

    sock.ev.on('creds.update', saveCreds);

    activeSessions.set(number, {
      number,
      status: 'pairing',
      created_at: new Date(),
      sock
    });

    return new Promise((resolve, reject) => {

      let done = false;

      sock.ev.on('connection.update', async (update) => {
        const { connection } = update;

        if (connection === 'open' && !done) {
          done = true;

          const s = activeSessions.get(number);
          if (s) s.status = 'connected';

          return resolve('connected');
        }

        try {
          const code = await sock.requestPairingCode(number);

          if (!done) {
            done = true;
            return resolve(code);
          }
        } catch (e) {}
      });

      setTimeout(() => {
        reject(new Error("Pairing timeout"));
      }, 60000);

    });

  } catch (err) {
    console.log("SESSION ERROR:", err);
    throw err;
  }
}

/* ================= SERVER ================= */
const server = http.createServer(async (req, res) => {

  res.setHeader('Access-Control-Allow-Origin', '*');

  if (req.url === '/' && req.method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    return res.end(HTML);
  }

  if (req.url === '/pair' && req.method === 'POST') {

    let body = '';

    req.on('data', chunk => body += chunk);

    req.on('end', async () => {

      try {
        const { number } = JSON.parse(body
