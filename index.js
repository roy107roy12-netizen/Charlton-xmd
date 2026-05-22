const http = require('http');
const fs = require('fs');
const path = require('path');
const QRCode = require('qrcode');
const pino = require('pino');

const {
default: makeWASocket,
useMultiFileAuthState,
makeCacheableSignalKeyStore,
DisconnectReason
} = require('@whiskeysockets/baileys');

const PORT = process.env.PORT || 3000;
const sessions = new Map();
const activeSessions = new Map(); // Track active pairing sessions

const HTML = `
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Netizen WhatsApp Pair</title>

<style>
body{
background:#0d1117;
font-family:sans-serif;
display:flex;
justify-content:center;
align-items:center;
height:100vh;
color:white;
margin:0;
}

.box{
background:#161b22;
padding:30px;
border-radius:20px;
width:350px;
text-align:center;
box-shadow:0 0 20px rgba(0,0,0,.4);
}

input{
width:100%;
padding:14px;
border:none;
border-radius:10px;
margin-top:15px;
background:#21262d;
color:white;
box-sizing:border-box;
}

button{
width:100%;
padding:14px;
border:none;
border-radius:10px;
margin-top:15px;
background:#25D366;
color:white;
font-weight:bold;
cursor:pointer;
transition:0.3s;
}

button:hover{
background:#1fa857;
}

.code{
margin-top:20px;
font-size:30px;
letter-spacing:5px;
color:#25D366;
font-weight:bold;
}

.small{
font-size:13px;
color:#8b949e;
margin-top:15px;
}

.status{
margin-top:20px;
padding:10px;
border-radius:10px;
font-size:13px;
}

.status.active{
background:#238636;
color:white;
}

.status.inactive{
background:#da3633;
color:white;
}
</style>
</head>

<body>

<div class="box">
<h2>🤖 Netizen Pair</h2>

<div id="pairStatus" class="status inactive">Checking status...</div>

<input id="num" placeholder="254712345678">

<button onclick="pair()">Get Pair Code</button>

<div id="out"></div>

<div class="small">
Open WhatsApp → Linked Devices → Link with phone number
</div>
</div>

<script>
// Check if pairing site is active
async function checkPairingSiteStatus(){
  try{
    const res = await fetch('/api/status');
    const data = await res.json();
    const statusDiv = document.getElementById('pairStatus');
    
    if(data.site_active){
      statusDiv.className = 'status active';
      statusDiv.innerHTML = '✅ Pairing Site: ACTIVE';
    }else{
      statusDiv.className = 'status inactive';
      statusDiv.innerHTML = '❌ Pairing Site: INACTIVE';
    }
  }catch(e){
    console.error('Status check failed:', e);
  }
}

async function pair(){
  const num=document.getElementById('num').value;
  const out=document.getElementById('out');
  
  if(!num){
    out.innerHTML='<div style="color:#da3633;">Please enter a phone number</div>';
    return;
  }
  
  out.innerHTML='Generating...';
  
  const res=await fetch('/pair',{
    method:'POST',
    headers:{'Content-Type':'application/json'},
    body:JSON.stringify({number:num})
  });
  
  const data=await res.json();
  
  if(data.code){
    out.innerHTML='<div class="code">'+data.code+'</div><div class="small">Code expires in 1 minute</div>';
  }else{
    out.innerHTML='<div style="color:#da3633;">Failed: '+data.error+'</div>';
  }
}

// Check status on page load and every 5 seconds
checkPairingSiteStatus();
setInterval(checkPairingSiteStatus, 5000);
</script>

</body>
</html>
`;

const ADMIN_HTML = `
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Session Status - Netizen Bot</title>

<style>
body{
background:#0d1117;
color:white;
font-family:sans-serif;
padding:20px;
}

.container{
max-width:800px;
margin:0 auto;
}

h1{
text-align:center;
color:#25D366;
}

.status-grid{
display:grid;
gap:15px;
}

.session{
background:#161b22;
padding:15px;
border-radius:10px;
border-left:5px solid #25D366;
}

.session.connected{
border-left-color:#238636;
}

.session.pairing{
border-left-color:#d29922;
}

.session h3{
margin:0 0 10px 0;
}

.info{
font-size:13px;
color:#8b949e;
}

.badge{
display:inline-block;
padding:3px 8px;
border-radius:5px;
font-size:11px;
font-weight:bold;
margin-right:5px;
}

.badge.active{
background:#238636;
color:white;
}

.badge.pairing{
background:#d29922;
color:black;
}

.stats{
background:#161b22;
padding:15px;
border-radius:10px;
margin-bottom:20px;
}

.stat{
display:flex;
justify-content:space-between;
padding:8px 0;
border-bottom:1px solid #21262d;
}

.stat:last-child{
border:none;
}

.empty{
text-align:center;
color:#8b949e;
padding:30px;
}
</style>
</head>

<body>

<div class="container">
<h1>🤖 Netizen Bot - Session Status</h1>

<div class="stats">
<div class="stat">
<span>Pairing Site Active:</span>
<span id="siteStatus">✅ YES</span>
</div>
<div class="stat">
<span>Active Sessions:</span>
<span id="sessionCount">0</span>
</div>
<div class="stat">
<span>Uptime:</span>
<span id="uptime">0s</span>
</div>
</div>

<h2>📱 Sessions</h2>
<div id="sessionsList" class="status-grid">
<div class="empty">No active sessions</div>
</div>
</div>

<script>
const startTime = Date.now();

async function updateStatus(){
  try{
    const res = await fetch('/api/status');
    const data = await res.json();
    
    // Update uptime
    const uptime = Math.floor((Date.now() - startTime) / 1000);
    const hours = Math.floor(uptime / 3600);
    const minutes = Math.floor((uptime % 3600) / 60);
    const seconds = uptime % 60;
    document.getElementById('uptime').textContent = \`\${hours}h \${minutes}m \${seconds}s\`;
    
    // Update session count
    document.getElementById('sessionCount').textContent = data.total_sessions || 0;
    
    // Update sessions list
    const list = document.getElementById('sessionsList');
    const sessions = data.active_sessions || [];
    
    if(sessions.length === 0){
      list.innerHTML = '<div class="empty">No active sessions</div>';
      return;
    }
    
    list.innerHTML = sessions.map(s => \`
      <div class="session \${s.status}">
        <h3>
          📱 \${s.number}
          <span class="badge \${s.status}">\${s.status.toUpperCase()}</span>
        </h3>
        <div class="info">
          Status: \${s.status === 'connected' ? 'Connected' : 'Pairing'}<br>
          Started: \${new Date(s.created_at).toLocaleString()}<br>
          Duration: \${Math.floor((Date.now() - new Date(s.created_at)) / 1000)}s
        </div>
      </div>
    \`).join('');
  }catch(e){
    console.error('Update failed:', e);
  }
}

updateStatus();
setInterval(updateStatus, 3000);
</script>

</body>
</html>
`;

async function createSession(number){
  
  const dir = path.join(__dirname,'sessions',number);
  
  if(!fs.existsSync(dir)){
    fs.mkdirSync(dir,{recursive:true});
  }
  
  const { state, saveCreds } = await useMultiFileAuthState(dir);
  
  const sock = makeWASocket({
    auth:{
      creds:state.creds,
      keys:makeCacheableSignalKeyStore(
        state.keys,
        pino({level:'silent'})
      )
    },
    printQRInTerminal:false,
    logger:pino({level:'silent'})
  });
  
  sock.ev.on('creds.update',saveCreds);
  
  // Track session
  activeSessions.set(number, {
    number,
    status: 'pairing',
    created_at: new Date(),
    sock
  });
  
  return new Promise((resolve,reject)=>{
    
    sock.ev.on('connection.update',async(update)=>{
      
      const { connection } = update;
      
      if(connection==='open'){
        // Update session status
        const session = activeSessions.get(number);
        if(session){
          session.status = 'connected';
        }
        resolve('connected');
      }
      
      try{
        const code = await sock.requestPairingCode(number);
        resolve(code);
      }catch(e){}
      
    });
    
    // Timeout after 2 minutes
    setTimeout(() => {
      reject(new Error('Pairing timeout'));
    }, 120000);
  });
}

const server = http.createServer(async(req,res)=>{
  
  if(req.url==='/' && req.method==='GET'){
    res.writeHead(200,{'Content-Type':'text/html'});
    return res.end(HTML);
  }
  
  if(req.url==='/admin' && req.method==='GET'){
    res.writeHead(200,{'Content-Type':'text/html'});
    return res.end(ADMIN_HTML);
  }
  
  if(req.url==='/api/status' && req.method==='GET'){
    const activeSessArray = Array.from(activeSessions.values()).map(s => ({
      number: s.number,
      status: s.status,
      created_at: s.created_at
    }));
    
    res.writeHead(200,{
      'Content-Type':'application/json'
    });
    
    return res.end(JSON.stringify({
      site_active: true,
      uptime: Math.floor((Date.now() - server.startTime) / 1000),
      total_sessions: activeSessions.size,
      active_sessions: activeSessArray
    }));
  }
  
  if(req.url==='/pair' && req.method==='POST'){
    
    let body='';
    
    req.on('data',c=>body+=c);
    
    req.on('end',async()=>{
      
      try{
        
        const { number } = JSON.parse(body);
        
        if(!number){
          res.writeHead(400,{
            'Content-Type':'application/json'
          });
          return res.end(JSON.stringify({
            error:'Phone number required'
          }));
        }
        
        const code = await createSession(number);
        
        res.writeHead(200,{
          'Content-Type':'application/json'
        });
        
        res.end(JSON.stringify({
          code,
          number,
          status: 'success'
        }));
        
      }catch(e){
        
        res.writeHead(500,{
          'Content-Type':'application/json'
        });
        
        res.end(JSON.stringify({
          error:e.message
        }));
        
      }
      
    });
    
    return;
  }
  
  res.writeHead(404);
  res.end('Not Found');
  
});

server.startTime = Date.now();

server.listen(PORT,()=>{
  console.log('✅ Running on port '+PORT);
  console.log('🔗 Pair Site: http://localhost:'+PORT);
  console.log('📊 Admin Panel: http://localhost:'+PORT+'/admin');
});
