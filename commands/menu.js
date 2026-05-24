const axios = require('axios');
const fs = require('fs');
const path = require('path');

// Modern Menu Command Handler
module.exports = async (context) => {
  const { m, args, client } = context;

  const menuData = {
    AI: [
      'aiphoto', 'mistral', 'claudeai', 'bard', 'perplexity', 'o3', 'copilot',
      'venice', 'qwenai', 'metai', 'blackbox', 'ilama', 'gemini', 'deepseek',
      'grok', 'wormgpt', 'keithai', 'hd', 'sora', 'flux', 'vision', 'vocalremover',
      'transcribe', 'shazam', 'imageedit', 'rc', 'image2video', 'bing', 'removebg'
    ],
    EDUCATION: [
      'speechwriter', 'knec', 'fruit', 'math', 'poem', 'dictionary'
    ],
    RELIGION: [
      'muslimai', 'bibleai', 'quranaudio', 'surahlist', 'hymnal', 'biblesearch', 'bible'
    ],
    SECURITY: [
      'antidelete', 'antistatus', 'antilink', 'antibad', 'antispam', 'anticall',
      'antibot', 'antitag', 'antisticker', 'antidemote', 'antipromote', 'autoblock'
    ],
    GENERAL: [
      'vcard', 'gitclone', 'report', 'owner', 'developer', 'readmore', 'screenshot',
      'getdesc', 'getcategory', 'getalias', 'keithsite', 'pair', 'location', 'copy', 'repo'
    ],
    TOOLS: [
      'sharephone', 'onwhatsapp', 'fancy', 'langcodes', 'translate', 'scan', 'ip', 'tts',
      'genemail', 'inbox', 'checkmail', 'walink', 'qrgenerator'
    ],
    SEARCH: [
      'similarimage', 'weather', 'ghfollowing', 'ghfollowers', 'movie', 'news',
      'google', 'brave', 'wagroup', 'lyrics', 'yts', 'image'
    ],
    DOWNLOADER: [
      'play', 'video', 'facebook', 'apk', 'pinterest', 'spotify', 'instagram',
      'mfire', 'twitter', 'soundcloud', 'tiktok'
    ],
    CONVERTER: [
      'toviewonce', 'toptt', 'tom4a', 'tomp3', 'toaudio', 'toimg', 'toptv', 'togif', 'toaudiodoc'
    ],
    STICKER: [
      'attp', 'bratvideo', 'attp2', 'egif', 'qc', 'emomix', 'brat', 'tgs',
      'stickersearch', 'circle', 'round', 'take', 'sticker'
    ],
    GROUP: [
      'rejectall', 'togroupstatus', 'ckick', 'hidetag', 'all', 'kickall', 'rgpp',
      'creategc', 'join', 'left', 'demote', 'promote', 'kick', 'groupjid', 'gcdesc',
      'groupname', 'demoteall', 'gpp', 'tagall', 'opentime', 'closetime', 'revoke',
      'grouplink', 'approveall', 'add', 'delete', 'poll', 'open', 'close', 'setgpp'
    ],
    AUDIO_EDIT: [
      'blown', 'earrape', 'fat', 'robot', 'tupai', 'deep', 'bass', 'reverse', 'slow',
      'tempo', 'nightcore', 'chipmunk', 'vaporwave', 'echo', 'reverb', 'phaser', 'flanger', 'distort'
    ],
    FUN: [
      'neverhaveiever', 'quote', 'quickquiz', 'meme', 'jokes', 'fact', 'paranoia',
      'wyrather', 'dare', 'truth', 'quoteaudio'
    ],
    UTILITY: [
      'loop', 'slideshow', 'imgsize', 'resize', 'watermark', 'trim', 'volume',
      'amplify', 'currency', 'ping', 'uptime', 'test'
    ],
    SETTINGS: [
      'botsettings', 'botname', 'author', 'packname', 'timezone', 'botpic', 'boturl',
      'mode', 'prefix', 'presence', 'greet', 'autoread', 'autobio', 'chatbot', 'events'
    ],
    OWNER: [
      'eval', 'fetch', 'shell', 'save', 'profile', 'jid', 'setsudo', 'delsudo',
      'issudo', 'getsudo', 'warn', 'note', 'listnote', 'viewnote', 'updatenote',
      'removenote', 'clearnotes', 'pdf', 'logout'
    ]
  };

  const generateMenu = () => {
    let menu = `╭───〔 *CHARLTON-XMD* 〕──────┈
├──────────────
│✵│▸ 𝐓𝐎𝐓𝐀𝐋 𝐂𝐎𝐌𝐌𝐀𝐍𝐃𝐒: ${Object.values(menuData).flat().length}
│✵│▸ 𝐁𝐎𝐓 𝐏𝐑𝐄𝐅𝐈𝐗: .
╰──────────────────────⊷\n\n`;

    Object.entries(menuData).forEach(([category, commands]) => {
      menu += `╭─────「 ${category} 」───┈⊷\n`;
      commands.forEach(cmd => {
        menu += `││◦➛ ${cmd}\n`;
      });
      menu += `╰──────────────┈⊷\n\n`;
    });

    return menu;
  };

  await m.reply(generateMenu());
};
