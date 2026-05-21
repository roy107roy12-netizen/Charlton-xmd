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
</style>
</head>

<body>

<div class="box">
<h2>🤖 Netizen Pair</h2>

<input id="num" placeholder="254712345678">

<button onclick="pair()">Get Pair Code</button>

<div id="out"></div>

<div class="small">
Open WhatsApp → Linked Devices → Link with phone number
</div>
</div>

<script>
async function pair(){
const num=document.getElementById('num').value;
const out=document.getElementById('out');

out.innerHTML='Generating...';

const res=await fetch('/pair',{
method:'POST',
headers:{'Content-Type':'application/json'},
body:JSON.stringify({number:num})
});

const data=await res.json();

if(data.code){
out.innerHTML='<div class="code">'+data.code+'</div>';
}else{
out.innerHTML='Failed';
}
}
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

return new Promise((resolve,reject)=>{

sock.ev.on('connection.update',async(update)=>{

const { connection } = update;

if(connection==='open'){
resolve('connected');
}

try{
const code = await sock.requestPairingCode(number);
resolve(code);
}catch(e){}

});
});
}

const server = http.createServer(async(req,res)=>{

if(req.url==='/' && req.method==='GET'){
res.writeHead(200,{'Content-Type':'text/html'});
return res.end(HTML);
}

if(req.url==='/pair' && req.method==='POST'){

let body='';

req.on('data',c=>body+=c);

req.on('end',async()=>{

try{

const { number } = JSON.parse(body);

const code = await createSession(number);

res.writeHead(200,{
'Content-Type':'application/json'
});

res.end(JSON.stringify({
code
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

server.listen(PORT,()=>{
console.log('Running on '+PORT);
});
