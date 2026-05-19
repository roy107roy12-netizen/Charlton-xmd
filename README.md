# WhatsApp Bot with Baileys - Heroku Ready

A feature-rich WhatsApp bot built with Node.js using Baileys library with command handler and auto-reply functionality. **Now optimized for Heroku deployment!**

## Features

✅ **Command Handler** - Modular command system  
✅ **Auto-Reply** - Automatic responses to keywords  
✅ **Built-in Commands** - ping, menu, hello, time, echo  
✅ **Group Support** - Works in groups and private chats  
✅ **Customizable** - Easy to add new commands  
✅ **Logging** - Detailed logging with Pino  
✅ **Heroku Ready** - Complete deployment configuration  

## Prerequisites

- Node.js v18+
- npm or yarn
- WhatsApp account
- Heroku account (for deployment)

## Local Installation

1. Clone the repository
```bash
git clone https://github.com/roy107roy12-netizen/Whatsapp-bot.git
cd Whatsapp-bot
```

2. Install dependencies
```bash
npm install
```

3. Create `.env` file
```bash
cp .env.example .env
```

4. Start the bot
```bash
npm start
```

5. Scan the QR code with your WhatsApp app

## Heroku Deployment

### Quick Start
```bash
# Login to Heroku
heroku login

# Create app
heroku create your-app-name

# Deploy
git push heroku main

# View logs
heroku logs --tail
```

### Configure Environment Variables
```bash
heroku config:set PREFIX=!
heroku config:set NODE_ENV=production
```

⚠️ **Important**: See [HEROKU_DEPLOYMENT.md](./HEROKU_DEPLOYMENT.md) for critical Heroku configuration guidelines!

## Usage

### Built-in Commands

- `!ping` - Check bot latency
- `!menu` - Display available commands
- `!hello [name]` - Get a personalized greeting
- `!time` - Get current time
- `!echo [text]` - Echo back your message

### Creating Custom Commands

Create a new file in `src/commands/` directory:

```javascript
module.exports = {
  name: 'yourcommand',
  description: 'Command description',
  usage: '!yourcommand [args]',
  async execute(sock, message, args, sender, senderName, isGroup) {
    // Your command logic here
    await sock.sendMessage(sender, {
      text: 'Response text'
    });
  }
};
```

### Auto-Reply

Edit `autoReplyHandler.js` to add or modify auto-replies:

```javascript
const autoReplies = [
  {
    trigger: /your-pattern/i,
    reply: 'Your auto-reply message'
  }
];
```

## Project Structure

```
Whatsapp-bot/
├── commandHandler.js          # Main command handler
├── autoReplyHandler.js        # Auto-reply handler
├── ping.js                    # Ping command
├── menu.js                    # Menu command
├── hello.js                   # Hello command
├── time.js                    # Time command
├── echo.js                    # Echo command
├── index.js                   # Main bot file
├── .env                       # Environment variables
├── package.json               # Dependencies
├── Procfile                   # Heroku configuration
├── HEROKU_DEPLOYMENT.md       # Heroku guide
└── README.md
```

## Important Notes

### Security
- Never share your `auth_info_baileys` folder
- Keep `.env` file private
- Don't commit authentication files to version control

### Heroku Limitations
- Free dyno sleeps after 30 minutes of inactivity
- Filesystem resets on dyno restart
- 550 free dyno hours per month

### Solution for Persistent Auth
Use cloud storage (S3, Firebase, etc.) to persist authentication files. See HEROKU_DEPLOYMENT.md for details.

### Terms of Service
- This bot may violate WhatsApp's Terms of Service
- Use at your own risk
- For business use, consider WhatsApp Business API

## Troubleshooting

### QR Code not scanning
- Make sure your WhatsApp is updated
- Check your internet connection
- Try deleting the `auth_info_baileys` folder and restart

### Bot not responding
- Check the logs for errors
- Verify the command prefix matches
- Ensure the bot has internet connectivity

### Heroku App Won't Start
- Check logs: `heroku logs --tail`
- Verify environment variables: `heroku config`
- Check Procfile syntax
- Ensure all dependencies are listed in package.json

## Dependencies

- **@whiskeysockets/baileys** - WhatsApp Web API
- **dotenv** - Environment variable management
- **pino** - Logging library
- **qrcode-terminal** - QR code display

## License

MIT License - feel free to use this project for your own purposes

## Support

For issues and questions, please open an issue on GitHub.

---

Made with ❤️ by roy107roy12-netizen

**Deployment Status**: ✅ Ready for Heroku
