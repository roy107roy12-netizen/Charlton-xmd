# Heroku Deployment Guide for Charlton-XMD

## Prerequisites
- Heroku account (free tier available)
- GitHub account with forked Charlton-XMD repository
- Node.js installed locally (optional)

## Quick Deploy

### Option 1: One-Click Deploy (Easiest)
Click the button below to deploy directly to Heroku:

[![Deploy to Heroku](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy?template=https://github.com/roy107roy12-netizen/Charlton-xmd)

### Option 2: Manual Heroku CLI Deployment

1. **Install Heroku CLI**
   ```bash
   # Download from https://devcenter.heroku.com/articles/heroku-cli
   ```

2. **Login to Heroku**
   ```bash
   heroku login
   ```

3. **Create a new Heroku app**
   ```bash
   heroku create your-app-name
   ```

4. **Add this repository as remote**
   ```bash
   git remote add heroku https://git.heroku.com/your-app-name.git
   ```

5. **Set environment variables**
   ```bash
   heroku config:set SESSION="your_session_string"
   heroku config:set OWNER_NUMBER="your_phone_number"
   heroku config:set PREFIX="."
   heroku config:set BOTNAME="CHARLTON-XMD"
   ```

6. **Deploy**
   ```bash
   git push heroku main
   ```

7. **View logs**
   ```bash
   heroku logs --tail
   ```

## Getting Your Session String

1. Go to: [bot-deployer--otienojunior806.replit.app](https://bot-deployer--otienojunior806.replit.app)
2. Scan the QR code with your WhatsApp
3. Copy the session string provided
4. Paste it in the `SESSION` environment variable in Heroku

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| SESSION | Your WhatsApp session string | Yes |
| OWNER_NUMBER | Your WhatsApp number with country code | Yes |
| PREFIX | Command prefix (default: .) | No |
| BOTNAME | Bot display name | No |
| BOT_MODE | public or private | No |
| BOT_TIMEZONE | Timezone for bot | No |

## Troubleshooting

### Bot not responding
- Check if SESSION is valid
- Verify OWNER_NUMBER format (include country code)
- Check logs: `heroku logs --tail`

### App crashed
- Check logs for errors
- Ensure all required variables are set
- Verify session hasn't expired

### Restart the app
```bash
heroku restart -a your-app-name
```

### View current config
```bash
heroku config -a your-app-name
```

## Free Tier Limitations
- App sleeps after 30 mins of inactivity
- Limited to 550 free dyno hours per month
- For 24/7 uptime, upgrade to paid tier

## Support
For issues, create an issue on: https://github.com/roy107roy12-netizen/Charlton-xmd/issues
