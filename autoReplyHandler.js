const autoReplies = [
  {
    trigger: /hello|hi|hey|assalamu alaikum/i,
    reply: '👋 Hello! How can I help you today?'
  },
  {
    trigger: /thanks|thank you|thx|tq/i,
    reply: '😊 You\'re welcome! Always happy to help.'
  },
  {
    trigger: /good morning|good night|good afternoon|good evening/i,
    reply: '🌟 Good wishes to you too! How\'s your day going?'
  },
  {
    trigger: /how are you|how you doing|how's it going/i,
    reply: '✨ I\'m doing great! Thanks for asking. How about you?'
  },
  {
    trigger: /bye|goodbye|see you|see ya/i,
    reply: '👋 Goodbye! Talk to you soon!'
  }
];

async function autoReplyHandler(sock, message, messageText, sender, senderName, isGroup) {
  for (const autoReply of autoReplies) {
    if (autoReply.trigger.test(messageText)) {
      try {
        await sock.sendMessage(sender, {
          text: autoReply.reply
        });
        return true;
      } catch (error) {
        console.error('Error sending auto-reply:', error);
      }
    }
  }
  return false;
}

module.exports = { autoReplyHandler };
