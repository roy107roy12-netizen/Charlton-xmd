// commands/menu.js
const { charlton } = require('../commandHandler');

module.exports = charlton(
    {
        name: 'menu',
        description: 'Display bot menu with all available commands',
        category: 'General',
        usage: '.menu',
        react: '📋',
    },
    async (sock, msg) => {
        const prefix = process.env.PREFIX || '.';
        const from = msg.key.remoteJid;

        const menuText = `
╭───〔 *CHARLTON-XMD* 〕──────┈
├──────────────
│✵│▸ 𝐓𝐎𝐓𝐀𝐋 𝐂𝐎𝐌𝐌𝐀𝐍𝐃𝐒: 405
│✵│▸ 𝐁𝐎𝐓 𝐄𝐗𝐏𝐈𝐑𝐀𝐓𝐈𝐎𝐍 𝐃𝐀𝐓𝐄: 11/03/2027
╰──────────────────────⊷

╭─────「 AI 」───┈⊷
││◦➛ mistral
││◦➛ claudeai
││◦➛ bard
││◦➛ perplexity
││◦➛ o3
││◦➛ copilot
││◦➛ venice
││◦➛ qwenai
││◦➛ metai
││◦➛ blackbox
││◦➛ ilama
││◦➛ gemini
││◦➛ deepseek
││◦➛ grok
││◦➛ wormgpt
││◦➛ keithai
││◦➛ hd
││◦➛ flux
││◦➛ vision
││◦➛ vocalremover
││◦➛ transcribe
││◦➛ shazam
││◦➛ imageedit
││◦➛ bing
││◦➛ removebg
╰──────────────┈⊷

╭─────「 EDUCATION 」───┈⊷
││◦➛ speechwriter
││◦➛ fruit
││◦➛ poem
││◦➛ dictionary
╰──────────────┈⊷

╭─────「 RELIGION 」───┈⊷
││◦➛ muslimai
││◦➛ bibleai
││◦➛ quranaudio
││◦➛ surahlist
││◦➛ hymnal
││◦➛ biblesearch
││◦➛ bible
╰──────────────┈⊷

╭─────「 GENERAL 」───┈⊷
││◦➛ vcard
││◦➛ gitclone
││◦➛ report
││◦➛ checkbotexpiry
││◦➛ owner
││◦➛ developer
││◦➛ readmore
││◦➛ screenshot
││◦➛ getdesc
││◦➛ getcategory
││◦➛ getalias
││◦➛ keithsite
││◦➛ pair
││◦➛ location
││◦➛ copy
││◦➛ repo2
││◦➛ repo
││◦➛ menu2
││◦➛ menu
╰──────────────┈⊷

╭─────「 TOOLS 」───┈⊷
││◦➛ sharephone
││◦➛ onwhatsapp
││◦➛ fancy
││◦➛ langcodes
││◦➛ translate
││◦➛ scan
││◦➛ ip
││◦➛ tts
││◦➛ genemail
││◦➛ inbox
││◦➛ checkmail
││◦➛ walink
││◦➛ qrgenerator
╰──────────────┈⊷

╭─────「 SEARCH 」───┈⊷
││◦➛ similarimage
││◦➛ weather
││◦➛ movie
││◦➛ news
││◦➛ google
││◦➛ brave
││◦➛ wagroup
││◦➛ lyrics
││◦➛ yts
││◦➛ image
╰──────────────┈⊷

╭─────「 18+ 」───┈⊷
││◦➛ xnxxsearch
││◦➛ xvideosearch
││◦➛ xxx
││◦➛ xvideo
││◦➛ hentaivid
╰──────────────┈⊷

╭─────「 NEWS 」───┈⊷
││◦➛ citizen
╰──────────────┈⊷

╭─────「 GPT 」───┈⊷
││◦➛ gpt
││◦➛ gpthistory
││◦➛ lastchat
││◦➛ clearai
╰──────────────┈⊷

╭─────「 UPLOADER 」───┈⊷
││◦➛ postimage
││◦➛ freeimage
││◦➛ aws
││◦➛ gofile
││◦➛ uploadf
││◦➛ uguu
││◦➛ url
││◦➛ catbox
││◦➛ litterbox
╰──────────────┈⊷

╭─────「 RANDOM 」───┈⊷
││◦➛ randomvideo
╰──────────────┈⊷

╭─────「 ANONYMOUS 」───┈⊷
││◦➛ groupanon
││◦➛ text
╰──────────────┈⊷

╭─────「 CONVERTER 」───┈⊷
││◦➛ toviewonce
││◦➛ toptt
││◦➛ tom4a
││◦➛ tomp3
││◦➛ toaudio
││◦➛ toimg
││◦➛ toptv
││◦➛ togif
││◦➛ toaudiodoc
╰──────────────┈⊷

╭─────「 CHANNEL 」───┈⊷
││◦➛ channeljid
││◦➛ channelunmute
││◦➛ channelmute
││◦➛ channeldescription
││◦➛ channelname
││◦➛ channeljid2
││◦➛ channelcreate
╰──────────────┈⊷

╭─────「 PHOTOFUNIA 」───┈⊷
││◦➛ calendar
││◦➛ pencilsketch
││◦➛ wanted
││◦➛ missing
││◦➛ bookcover
││◦➛ press
││◦➛ newspaper
││◦➛ billboard
││◦➛ valentinecard
││◦➛ bunnyears
││◦➛ xmaspresent
││◦➛ zombie
││◦➛ blackandwhite
││◦➛ sepia
││◦➛ apocalypse
││◦➛ aliensky
││◦➛ retrowave
││◦➛ painting
││◦➛ cinema
││◦➛ dollar
╰──────────────┈⊷

╭─────「 SYSTEM 」───┈⊷
││◦➛ update
││◦➛ deljunk
││◦➛ ping
││◦➛ resetdb
││◦➛ restart
││◦➛ uptime
││◦➛ test
╰──────────────┈⊷

╭─────「 UTILITY 」───┈⊷
││◦➛ loop
││◦➛ slideshow
││◦➛ imgsize
││◦➛ resize
││◦➛ watermark
││◦➛ trim
││◦➛ volume
││◦➛ amplify
││◦➛ currency
╰──────────────┈⊷

╭─────「 CODING 」───┈⊷
││◦➛ time
││◦➛ encrypt2
││◦➛ encrypt
││◦➛ dhex
││◦➛ hex
││◦➛ urldecode
││◦➛ urlencode
││◦➛ runjava
││◦➛ runc
││◦➛ runcpp
││◦➛ unbase64
││◦➛ zlib
││◦➛ dzlib
││◦➛ base64
││◦➛ dbinary
││◦➛ binary
││◦➛ runpy
││◦➛ runjs
╰──────────────┈⊷

╭─────「 AUDIO-EDIT 」───┈⊷
││◦➛ blown
││◦➛ earrape
││◦➛ fat
││◦➛ robot
││◦➛ tupai
││◦➛ deep
││◦➛ bass
││◦➛ reverse
││◦➛ slow
││◦➛ tempo
││◦➛ nightcore
││◦➛ chipmunk
││◦➛ vaporwave
││◦➛ echo
││◦➛ reverb
││◦➛ phaser
││◦➛ flanger
││◦➛ distort
││◦➛ surround
╰──────────────┈⊷

╭─────「 MOVIE 」───┈⊷
││◦➛ trailer
╰──────────────┈⊷

╭─────「 FUN 」───┈⊷
││◦➛ neverhaveiever
││◦➛ quote
││◦➛ quickquiz
││◦➛ meme
││◦➛ jokes
││◦➛ fact
││◦➛ paranoia
││◦➛ wyrather
││◦➛ dare
││◦➛ truth
││◦➛ quoteaudio
╰──────────────┈⊷

╭─────「 GROUP 」───┈⊷
││◦➛ rejectall
││◦➛ togroupstatus2
││◦➛ ckick
││◦➛ hidetag
││◦➛ all
││◦➛ kickall2
││◦➛ kickall
││◦➛ rgpp
││◦➛ togroupstatus
││◦➛ creategc
││◦➛ join
││◦➛ left
││◦➛ demote
││◦➛ promote
││◦➛ kick
││◦➛ groupjid
││◦➛ gcdesc
││◦➛ groupname
││◦➛ demoteall
││◦➛ gpp
││◦➛ tagall
││◦➛ opentime
││◦➛ closetime
││◦➛ disap-off
││◦➛ disap1
││◦➛ disap7
││◦➛ disap90
││◦➛ revoke
││◦➛ grouplink
││◦➛ approveall
││◦➛ add
││◦➛ delete
││◦➛ poll
││◦➛ open
││◦➛ close
││◦➛ setgpp
╰──────────────┈⊷

╭─────「 OWNER 」───┈⊷
││◦➛ mygroups
││◦➛ pp
││◦➛ createcall
││◦➛ disappearing
││◦➛ groupprivacy
││◦➛ readreceipts
││◦➛ statusprivacy
││◦➛ profileprivacy
││◦➛ updateonline
││◦➛ lastseen
││◦➛ privacy
││◦➛ blocklist
││◦➛ rpp
││◦➛ logout
││◦➛ eval
││◦➛ fetch
││◦➛ shell
││◦➛ chunk
││◦➛ save
││◦➛ vv2
││◦➛ vv
││◦➛ profile
││◦➛ fullpp
││◦➛ jid
││◦➛ setsudo
││◦➛ delsudo
││◦➛ issudo
││◦➛ getsudo
││◦➛ reshare
││◦➛ jidcount
││◦➛ warn
││◦➛ gtcdd
││◦➛ note
││◦➛ listnote
││◦➛ viewnote
││◦➛ updatenote
││◦➛ removenote
││◦➛ clearnotes
││◦➛ pdf
╰──────────────┈⊷

╭─────「 EPHOTO 」───┈⊷
││◦➛ 1917
││◦➛ advancedglow
││◦➛ comic
││◦➛ dragonball
││◦➛ blackpink
││◦➛ naruto
││◦➛ pixelglitch
││◦➛ underwater
││◦➛ cartoonstyle
││◦➛ graffiti
││◦➛ glittertext
││◦➛ lighteffect
││◦➛ gradient
││◦➛ fireworks
││◦➛ hologram
││◦➛ greenneon
││◦➛ starnight
││◦➛ twilight
││◦➛ devilwings
││◦➛ halloween
││◦➛ plasma
││◦➛ foggy
││◦➛ bokeh
││◦➛ hacker
││◦➛ deadpool
││◦➛ captainamerica
││◦➛ thor
││◦➛ avengers
││◦➛ purletext
││◦➛ matrix
││◦➛ incandescent
││◦➛ jewel
││◦➛ watereffect
││◦➛ womensday
││◦➛ happybirthday
││◦➛ flame
╰──────────────┈⊷

╭─────「 DOWNLOADER 」───┈⊷
││◦➛ play
││◦➛ video
││◦➛ facebook
││◦➛ apk
││◦➛ pinterest
││◦➛ spotify
││◦➛ instagram
││◦➛ mfire
││◦➛ twitter
││◦➛ soundcloud
││◦➛ tiktok
╰──────────────┈⊷

╭─────「 SHORTENER 」───┈⊷
││◦➛ bitly
││◦➛ tinube
││◦➛ tinyurl
╰──────────────┈⊷

╭─────「 SPORTS 」───┈⊷
││◦➛ surebet
││◦➛ livescore
││◦➛ sportnews
││◦➛ topscorers
││◦➛ standings
││◦➛ upcomingmatches
││◦➛ gamehistory
││◦➛ venuesearch
││◦➛ teamsearch
││◦➛ playersearch
╰──────────────┈⊷

╭─────「 MODED-APK 」───┈⊷
││◦➛ termux
││◦➛ termuxhub
││◦➛ youcine
││◦➛ playfy
││◦➛ sportzfy
╰──────────────┈⊷

╭─────「 SETTINGS 」───┈⊷
││◦➛ antidemote
││◦➛ antipromote
││◦➛ autosocialdl
││◦➛ antibot
││◦➛ botsettings
││◦➛ antispam
││◦➛ anticall
││◦➛ autoblock
││◦➛ antibad
││◦➛ antitag
││◦➛ antisticker
││◦➛ chatbot
││◦➛ events
││◦➛ antistatusmention
││◦➛ antilink
││◦➛ botname
││◦➛ author
││◦➛ packname
││◦➛ timezone
││◦➛ botpic
││◦➛ boturl
││◦➛ mode
││◦➛ prefix
││◦➛ presence
││◦➛ greet
││◦➛ autoviewstatus
││◦➛ autoreplystatus
││◦➛ autoread
││◦➛ autolikestatus
││◦➛ autobio
││◦➛ antidelete
╰──────────────┈⊷

╭─────「 STALKER 」───┈⊷
││◦➛ pintereststalk
││◦➛ npmstalk
││◦➛ countrystalk
││◦➛ wachannel
││◦➛ ytstalk
││◦➛ twistalk
││◦➛ repostalk
││◦➛ igstalk
││◦➛ tiktokstalk
╰──────────────┈⊷

╭─────「 STICKER 」───┈⊷
││◦➛ tgs
││◦➛ sticker
││◦➛ tovideo
││◦➛ attp2
││◦➛ bratvideo
││◦➛ attp
││◦➛ egif
││◦➛ qc
││◦➛ emomix
││◦➛ brat
││◦➛ stickersearch
╰──────────────┈⊷

💡 *Usage:* Type ${prefix}command_name
📞 *Need Help?* Type ${prefix}help
🔗 *Bot Link:* Stay tuned for updates!

Made with ❤️ by Charlton-XMD
        `;

        try {
            await sock.sendMessage(from, { text: menuText });
        } catch (error) {
            console.error('Menu command error:', error);
        }
    }
);
