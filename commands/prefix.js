module.exports = {
  name: 'prefix',
  description: 'Change bot prefix',
  usage: '.prefix <new prefix>',
  aliases: ['setprefix', 'changeprefix'],
  async execute(sock, message, args, sender, senderName, isGroup) {
    if (!args[0] || args[0].length > 1) {
      await sock.sendMessage(sender, {
        text: `❌ Usage: .prefix <single character>\n\n📌 Examples:\n.prefix !\n.prefix #\n.prefix ~`
      });
      return;\n    }\n    \n    if (!global.botPrefix) {\n      global.botPrefix = new Map();\n    }\n    \n    const newPrefix = args[0];\n    global.botPrefix.set(sender, newPrefix);\n    \n    await sock.sendMessage(sender, {\n      text: `✅ *PREFIX CHANGED*\n\n🔄 Old Prefix: .\n🆕 New Prefix: ${newPrefix}\n\n📝 Example: ${newPrefix}help`\n    });\n  }\n};