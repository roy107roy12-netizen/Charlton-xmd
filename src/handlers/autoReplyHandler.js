const pino = require('pino');

const log = pino({ transport: { target: 'pino-pretty' } });

const autoReplies = [
  {
    trigger: /hello|hi|hey/i,
    reply: 'Hello! 👋 Thanks for messaging. Type !menu to see available commands.'
  },
  {
    trigger: /thanks|thank you|thx/i,
    reply: 'You\'re welcome! 😊'
  },
  {
    trigger: /help/i,
    reply: 'Need help? Type !menu to see all available commands!'
  }
];

async function autoReplyHandler(sock, message, messageText, sender, senderName, isGroup) {
  for (const autoReply of autoReplies) {
    if (autoReply.trigger.test(messageText)) {
      try {
        log.info(`🤖 Auto-reply triggered for: ${messageText}`);
        await sock.sendMessage(sender, {
          text: autoReply.reply
        });
        return true;
      } catch (error) {
        log.error('Error sending auto-reply:', error);
      }
    }
  }
  return false;
}

module.exports = { autoReplyHandler };
