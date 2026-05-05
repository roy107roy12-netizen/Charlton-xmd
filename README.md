# WhatsApp Bot with Baileys

A feature-rich WhatsApp bot built with Node.js using Baileys library with command handler and auto-reply functionality.

## Features

✅ **Command Handler** - Modular command system  
✅ **Auto-Reply** - Automatic responses to keywords  
✅ **Built-in Commands** - ping, menu, hello, time, echo  
✅ **Group Support** - Works in groups and private chats  
✅ **Customizable** - Easy to add new commands  
✅ **Logging** - Detailed logging with Pino  

## Prerequisites

- Node.js v14+ 
- npm or yarn
- WhatsApp account

## Installation

1. Clone the repository
```bash
git clone https://github.com/roy107roy12-netizen/Whatsapp-bot.git
cd Whatsapp-bot
```

2. Install dependencies
```bash
npm install
```

3. Start the bot
```bash
npm start
```

4. Scan the QR code with your WhatsApp app

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

Edit `src/handlers/autoReplyHandler.js` to add or modify auto-replies:

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
├── src/
│   ├── commands/          # Command files
│   │   ├── ping.js
│   │   ├── menu.js
│   │   ├── hello.js
│   │   ├── time.js
│   │   └── echo.js
│   └── handlers/          # Message handlers
│       ├── commandHandler.js
│       └── autoReplyHandler.js
├── auth_info_baileys/     # Authentication data (auto-generated)
├── index.js               # Main bot file
├── .env                   # Environment variables
├── package.json
└── README.md
```

## Important Notes

⚠️ **Security**
- Never share your `auth_info_baileys` folder
- Keep `.env` file private
- Don't commit authentication files to version control

⚠️ **Terms of Service**
- This bot may violate WhatsApp's Terms of Service
- Use at your own risk
- For business use, consider using WhatsApp Business API

## Troubleshooting

### QR Code not scanning
- Make sure your WhatsApp is updated
- Check your internet connection
- Try deleting the `auth_info_baileys` folder and restart

### Bot not responding
- Check the logs for errors
- Verify the command prefix matches
- Ensure the bot has internet connectivity

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
