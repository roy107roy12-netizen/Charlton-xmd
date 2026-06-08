# Charlton-MD WhatsApp Bot

A powerful WhatsApp bot built with Node.js using Baileys library with command handler and database support.

## Features

- 🤖 Command handler system
- 💾 SQLite/PostgreSQL database support
- ⚙️ Configuration management
- 🎯 Event-driven architecture
- 🔧 Extensible plugin system

## Installation

```bash
npm install
```

## Configuration

1. Copy or create `set.env` file:
```env
SESSION=Charlton-md
OWNER_NUMBER=254712345678
OWNER_NAME=Charlton
PREFIX=.
BOT_MODE=public
BOTNAME=CHARLTON-MD
```

## Usage

```bash
npm start
```

## Project Structure

```
Charlton-xmd/
├── commands/          # Bot commands
├── database/          # Database models
├── lib/              # Utility libraries
├── session/          # WhatsApp sessions
├── commandHandler.js # Command handler
├── settings.js       # Configuration
├── set.env          # Environment variables
├── index.js         # Main entry point
└── package.json
```

## License

ISC
