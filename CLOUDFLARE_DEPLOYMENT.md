# 🚀 Cloudflare Workers Deployment Guide

Deploy **CHARLTON-MD Pairing Site** on Cloudflare Workers for FREE!

## 📋 Prerequisites

- Cloudflare Account (free tier works)
- Wrangler CLI installed
- Git installed
- Node.js 16+

## 🔧 Installation & Setup

### Step 1: Install Wrangler CLI

```bash
npm install -g @cloudflare/wrangler
# or
npm install -g wrangler
```

### Step 2: Fork the Repository

```bash
git clone https://github.com/yourusername/Whatsapp-bot.git
cd Whatsapp-bot
```

### Step 3: Login to Cloudflare

```bash
wrangler login
```

This opens your browser to authorize Wrangler with your Cloudflare account.

### Step 4: Configure wrangler.toml

Edit `wrangler.toml` and update:

```toml
name = "charlton-bot-pair-site"
type = "javascript"
account_id = "YOUR_ACCOUNT_ID"  # Get from Cloudflare dashboard
workers_dev = true
```

Get your Account ID from: https://dash.cloudflare.com/

### Step 5: Deploy Pairing Site

```bash
wrangler publish
```

Your pairing site will be live at:
```
https://charlton-bot-pair-site.<your-subdomain>.workers.dev
```

---

## 📦 Deployment Options

### Option A: Pairing Site Only (Cloudflare Workers)
Perfect for a lightweight pairing code generator

```bash
wrangler publish
```

**Advantages:**
- ✅ Free tier includes 100,000 requests/day
- ✅ Global CDN for fast performance
- ✅ No server maintenance
- ✅ Auto-scaling

### Option B: Full Setup (Recommended)

**Pairing Site:** Cloudflare Workers (this)  
**Bot Backend:** Heroku or your own server  
**Database:** Optional

```bash
# Deploy pair site
wrangler publish

# Deploy bot separately to Heroku
git push heroku main
```

---

## 🤖 Connect Bot Backend

Update `functions/pair-handler.js` to point to your bot:

```javascript
const BOT_URL = 'https://your-bot-backend.herokuapp.com';
```

Replace with your actual bot backend URL.

---

## 📝 Configuration

### Environment Variables

Set in Cloudflare Workers dashboard or with Wrangler:

```bash
# For storing bot URL
wrangler secret put BOT_URL
# Enter: https://your-bot.herokuapp.com
```

### Custom Domain

To use a custom domain:

1. Add domain to Cloudflare
2. Create CNAME record pointing to Workers
3. Update `wrangler.toml`:

```toml
route = "pair.yourdomain.com/*"
zone_id = "YOUR_ZONE_ID"
```

---

## 🚀 Deployment Workflow

### Initial Deploy

```bash
# 1. Make changes
git add .
git commit -m "Update pairing site"

# 2. Deploy to Cloudflare
wrangler publish

# 3. Check logs
wrangler tail
```

### Auto-Deploy with GitHub Actions

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Cloudflare

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '16'
      - run: npm install -g wrangler
      - run: wrangler publish
        env:
          CLOUDFLARE_API_TOKEN: ${{ secrets.CLOUDFLARE_API_TOKEN }}
```

---

## 📊 Monitoring & Logs

### View Real-time Logs

```bash
wrangler tail
```

### View on Dashboard

https://dash.cloudflare.com/ → Workers → Your Worker → Logs

---

## 🔒 Security

### Protect with Authentication

Add to `functions/pair-handler.js`:

```javascript
// Validate API key
const apiKey = request.headers.get('X-API-Key');
if (!apiKey || apiKey !== YOUR_SECRET_KEY) {
  return unauthorized();
}
```

### Rate Limiting

```javascript
// Add rate limiting middleware
const rateLimiter = new Map();

function checkRateLimit(ip) {
  const now = Date.now();
  const limit = rateLimiter.get(ip) || [];
  const recent = limit.filter(t => now - t < 60000);
  
  if (recent.length > 30) {
    return false; // Too many requests
  }
  
  recent.push(now);
  rateLimiter.set(ip, recent);
  return true;
}
```

---

## 💰 Pricing

**Cloudflare Workers Free Tier:**
- 100,000 requests/day
- $0.50 per million requests after free tier
- Perfect for personal/small bots

---

## 🐛 Troubleshooting

### Deploy Fails

```bash
# Check configuration
wrangler publish --dry-run

# Clear cache
rm -rf node_modules
npm install
wrangler publish
```

### 404 Errors

- Verify path routing in `functions/pair-handler.js`
- Check static file serving
- View logs: `wrangler tail`

### Bot Connection Issues

- Update `BOT_URL` in `functions/pair-handler.js`
- Ensure bot is running
- Check CORS headers

### Slow Response

- Add caching headers
- Minimize file sizes
- Use Workers Analytics

---

## 📈 Scaling

### Handle More Traffic

1. **Upgrade Cloudflare Plan** (if needed)
2. **Add Caching** to reduce origin requests
3. **Use KV Storage** for pairing sessions:

```javascript
export async function handlePairRequest(request) {
  const cache = await CHARLTON_BOT_CACHE.get('pair_sessions');
  // Use KV to store session data
}
```

---

## 🎯 Next Steps

After deploying pairing site:

1. ✅ Deploy bot backend (Heroku/Railway/Fly)
2. ✅ Link bot URL in pairing site
3. ✅ Test pairing code generation
4. ✅ Share pairing site link with users

**Pairing Site URL:**
```
https://charlton-bot-pair-site.workers.dev
```

---

## 📚 Resources

- [Cloudflare Workers Docs](https://developers.cloudflare.com/workers/)
- [Wrangler CLI Reference](https://developers.cloudflare.com/workers/wrangler/)
- [Worker Examples](https://github.com/cloudflare/worker-examples)

---

## 💬 Support

Need help?
- 📖 [GitHub Wiki](https://github.com/roy107roy12-netizen/Whatsapp-bot/wiki)
- 🐛 [Report Issues](https://github.com/roy107roy12-netizen/Whatsapp-bot/issues)
- 💬 [Discussions](https://github.com/roy107roy12-netizen/Whatsapp-bot/discussions)

---

**Made with ❤️ by CHARLTON-MD**

**Fork the repo and deploy your own bot instance!**
