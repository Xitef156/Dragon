const Discord = require('discord.js');require('@discordjs/opus');const Voice = require('@discordjs/voice');
require('opusscript');require('libsodium-wrappers');require('tweetnacl');
const ytdl = require('ytdl-core');
const ytSearch = require('yt-search');
const Canvas = require('canvas');
const weather = require('weather-js');
const db = require('quick.db');
const moment = require('moment');
const fs = require('fs');
const SoundCloud = require('soundcloud-scraper');
const ffmpeg = require('fluent-ffmpeg');require('ffmpeg-static');
const NodeID3 = require('node-id3');
const ncu = require('npm-check-updates');
var Download = require('image-downloader');
const express = require('express');

// Constants
const PORT = 8080;
const HOST = '0.0.0.0';

// App
const app = express();
app.get('/', (req, res) => {
  res.send('Hello World');
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);

const SC = new SoundCloud.Client();
const Instent = Discord.Intents.FLAGS
const Client = new Discord.Client({ intents: [
  Instent.GUILDS,
  Instent.GUILD_MESSAGES,
  Instent.GUILD_MESSAGE_REACTIONS,
  Instent.GUILD_MESSAGE_TYPING,
  Instent.DIRECT_MESSAGES,
  Instent.DIRECT_MESSAGE_REACTIONS,
  Instent.DIRECT_MESSAGE_TYPING,
  Instent.GUILD_MEMBERS,
  Instent.GUILD_VOICE_STATES,
  Instent.GUILD_BANS,
  Instent.GUILD_EMOJIS_AND_STICKERS,
  Instent.GUILD_INVITES,
  Instent.GUILD_INTEGRATIONS,
  Instent.GUILD_WEBHOOKS
],
makeCache: Discord.Options.cacheWithLimits({
  MessageManager: 200, // This is default
  PresenceManager: 1,
  // Add more class names here
}), allowedMentions: { parse: ['users', 'roles', 'everyone'], repliedUser: true }
});
const queue = new Map();
const player = Voice.createAudioPlayer();player.setMaxListeners(3)

const Bot_Color = `#42ff00`
const CreatorTag = `Xitef156#1822`
const CreatorID = '776140752752869398'
const Charlotte_Tag = `charlotte_lbc#8842`
const AuthifCreator = `message.author.id === ${CreatorID}`
const AuthifNotCreator = `message.author.id !== ${CreatorID}`
const Hack_Guild_ID = '880444663914459166'
const Bot_Guild_ID = '850033010350096414'
const Ch_Err = '834751451090911292'
const Ch_Cmd = '777937994245996545'
const Bot_link = `https://discord.com/api/oauth2/authorize?client_id=788076422778060920&permissions=402794686&scope=bot`
const Font = 'Vermin Vibes'
const { registerFont } = require(`canvas`);
registerFont(`./${Font}.ttf`, {family: Font})
moment.locale('fr');
const Font_Size_max = 80
const Font_Size_min = 50
const Canvas_Larg = 700
const Canvas_Haut = 250

function makeid(length) {
  var result           = '';
  var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for ( var i = 0; i < length; i++ ) result += characters.charAt(Math.floor(Math.random() * charactersLength));
 return result;
}
async function getFilesizeInBytes(filename) { 
  var File = await fs.statSync(filename)
  return File.size;
}

function remSpCh(sentence) {
  var res = sentence;
  var result = res.replace(/[&\/\\#,+()$~%.'":*?<>{}|]/gi, '');
  return result;
}

function sleep(s) {
  return new Promise((resolve) => {
    setTimeout(resolve, (s * 1000));
  });
}

async function play(guild){
  var Songs = queue.get(guild)
  var Song = Songs[0];
  if (!Song) {
    Voice.getVoiceConnection(guild).disconnect();
    queue.delete(guild.id);
    return;
  }
  async function Audio(song){
  if(song.type = 'sc') SC.getSongInfo(song.url).then(async Song => {
    await Song.downloadProgressive().then(stream => Play(stream))
  }) 
  else {
    var Stream = await ytdl(`https://youtu.be/${song.id}`, { volume: db.get(`guild_${guild}_Volume`) || 1, filter : 'audioonly', highWaterMark: 1 << 25 })
    Play(Stream);
  }
}
Audio(Song)
  async function Play(stream){
  var Stream = await Voice.createAudioResource(stream)
player.play(Stream)
player.on(Voice.AudioPlayerStatus.Idle, async () => {
  if(db.get(`guild_${guild}_Music_Looping`) == true) play(guild);
  else {
    await Songs.shift();
  if (!Song) {
    Voice.getVoiceConnection(guild).disconnect();
    queue.delete(guild.id);
    return;
  }
  play(guild);
  }
})
  }
}

function youtube_parser(url){
  var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
  var match = url.match(regExp);
  return (match&&match[7].length==11)? match[7] : url;
}

const videoFinder = async (search) => {
  var search = await youtube_parser(search)
  if(search.length === 11) var videoResult1 = await ytSearch({ videoId: search })
  else var videoResult2 = await ytSearch({ query: search })
  if(videoResult1) return videoResult1
  else return videoResult2.videos[0];
}

async function guild_create(guild) {
    
  if(guild.id === (Bot_Guild_ID || Hack_Guild_ID)) return;
  const Guild = Client.guilds.cache.get(Bot_Guild_ID)
  if(!Client.channels.cache.find(cat => cat.type == 'GUILD_CATEGORY' && cat.id === db.get(`guild_${guild.id}_Category`)))
  await Guild.channels.create(guild.name, {
    type: 'GUILD_CATEGORY',
    permissionOverwrites: [{id: Guild.id,deny: ['VIEW_CHANNEL']}]
  }).then(async Category => {
  db.set(`guild_${guild.id}_Category`, Category.id)
  function text_create(name){
    Guild.channels.create(name, {
      type: 'GUILD_TEXT',
      parent: Category
      }).then(DB => {
        db.set(`guild_${guild.id}_${name}`, DB.id)
      })
  }
  await text_create('Message-1')
  await text_create('Message-2')
  await text_create('Voice')
  await text_create('Logs')
  await text_create('Role')
  await text_create('Channel')
  await text_create('Nickname')
  await text_create('Clear')
  await text_create('Invite')
  await Guild.channels.create('Infos', {
      type: 'GUILD_TEXT',
      parent: Category
      }).then(DB => {
        guild.members.fetch(guild.ownerId).then(creator => {
        const Embed = new Discord.MessageEmbed()
        Embed.setColor(Bot_Color)
        Embed.addField(`Nom`, guild.name)
        Embed.addField(`Icon`, guild.iconURL({size: 4096}))
        Embed.setImage(guild.iconURL({size: 4096}))
        Embed.addField(`Gérant`, creator.user.toString())
        Embed.setFooter(`${guild.name}'s ID: ${guild.id}`)
        Embed.setTimestamp()
        DB.send({ embeds: [Embed] })
        })
        db.set(`guild_${guild.id}_Infos`, DB.id)
      })

  await Guild.channels.create('MemberCount', {
    type: 'GUILD_VOICE',
    parent: Category
    }).then(DB => {
      db.set(`guild_${guild.id}_MemberCount`, DB.id)
    })
  })
}
async function canvas_card(member, type, color, color1, color2){
  var Font_Size_1 = Font_Size_max
  var Font_Size_2 = Font_Size_min
  if(type == `Left`) var x = ` 2`
  else var x = ``
  const applyText = (canvas, text) => {
      const ctx = canvas.getContext('2d');
      do ctx.font = `${Font_Size_1 -= 10}px ${Font}`;
      while (ctx.measureText(text).width > canvas.width - 300);
      return ctx.font;
  };
  
	const canvas = Canvas.createCanvas(Canvas_Larg, Canvas_Haut);
	const ctx = canvas.getContext('2d');
	const background = await Canvas.loadImage(`./wallpaper${x}.png`);
	ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
  var grd = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
  grd.addColorStop(0, color);
  grd.addColorStop(1, `#ffffff`);
	ctx.strokeStyle = grd;
  ctx.lineWidth = 5;
	ctx.strokeRect(0, 0, canvas.width, canvas.height);

	ctx.font = `${Font_Size_2}px ${Font}`;
  ctx.shadowOffsetX = 2;
  ctx.shadowOffsetY = 2;
  ctx.shadowBlur = 5;
  ctx.shadowColor = color1;
	ctx.fillStyle = color2;
  ctx.strokeStyle = '#ffffff';
  ctx.lineWidth = 5;
  ctx.strokeText(`${member.user.tag}`, canvas.width - 450, canvas.height - 25);
	ctx.fillText(`${member.user.tag}`, canvas.width - 450, canvas.height - 25);
  ctx.globalAlpha = 0.5;
  ctx.strokeStyle = '#ffffff';
  ctx.lineWidth = 0.78125;
  ctx.strokeText(`${member.user.tag}`, canvas.width - 450, canvas.height - 25);
  ctx.globalAlpha = 1;

	ctx.font = applyText(canvas, `${member.displayName}!`);
  ctx.shadowOffsetX = 2;
  ctx.shadowOffsetY = 2;
  ctx.shadowBlur = 5;
  ctx.shadowColor = '#bb0000';
  ctx.strokeStyle = '#ffffff';
	ctx.fillStyle = '#ff0000';
  ctx.lineWidth = 8;
  ctx.strokeText(`${member.displayName}`, canvas.width - 450, canvas.height / 1.75);
	ctx.fillText(`${member.displayName}`, canvas.width - 450, canvas.height / 1.75);
  ctx.globalAlpha = 0.5;
  ctx.strokeStyle = '#ffffff';
  ctx.lineWidth = 1.25;
  ctx.strokeText(`${member.displayName}`, canvas.width - 450, canvas.height / 1.75);

  
  ctx.globalAlpha = 1;
	ctx.beginPath();
  var grd2 = ctx.createLinearGradient(0, 0, 200, 0);
  grd2.addColorStop(0, `#ff0f00`);
  grd2.addColorStop(0.17, `#ff5100`);
  grd2.addColorStop(0.34, `#f3ff00`);
  grd2.addColorStop(0.53, `#32ff00`);
  grd2.addColorStop(0.72, `#00f7ff`);
  grd2.addColorStop(0.85, `#0004ff`);
  grd2.addColorStop(1, `#7c00ff`);
	ctx.arc(125, 125, 100, 0, Math.PI * 2);
  ctx.lineWidth = 5;
  ctx.strokeStyle = grd2
  ctx.stroke();
	ctx.closePath();
	ctx.clip();

	const avatar = await Canvas.loadImage(member.user.displayAvatarURL({ format: 'jpg', size: 4096 }));
	ctx.drawImage(avatar, 25, 25, 200, 200);
	const attachment = new Discord.MessageAttachment(canvas.toBuffer(), `${type}-image.png`);
  return attachment;
}

async function Message(message){
  const Prefix = db.get(`guild_${message.guild.id}_prefix`) || `,`

  if(message.author.tag == CreatorTag)var User = CreatorTag
  else var User = `${message.author.toString()} (**${message.author.tag}**)`
    const Ch_Msg_1 = db.get(`guild_${message.guild.id}_Message-1`)
    if(message.content === `!xptdr`) return;
    if(message.author.id === Client.user.id && message.content.startsWith(`**`)) return;
    const Time = moment(message.createdAt).format('H:mm:ss')
  var msg = message.content.replace("<@!688327045129699400>", "@-Charlotte")
  var Msg = msg.replace("<@!776140752752869398>", "@-Xitef156")
  var msg = Msg.replace("<@688327045129699400>", "@-Charlotte")
  var Msg = msg.replace("<@776140752752869398>", "@-Xitef156")
    var Message = Msg.replace(/@(everyone)/gi, `@-everyone`).replace(/@(here)/gi, `@-here`);
    if(message.channel.id === Ch_Err) return;
    if(message.channel.id === 840923591460651008) return;
    if(message.channel.id === Ch_Cmd) return;
    if(message.channel.type == 'GUILD_PUBLIC_THREAD' || message.channel.type == 'GUILD_PRIVATE_THREAD') var Channel_Type = `Fil`
    else var Channel_Type = `Salon`
    if(message.channel.type == 'DM') var Channel = await 847579263988531210
    if(message.guild.id === 787081936719708221) var Channel = await 871919663670517780
    if(!Channel && Ch_Msg_1 !== 868950307848200202) var Channel = await Ch_Msg_1
    if(message.guild.id === Bot_Guild_ID && !message.content.startsWith(Prefix)) return;
      if (message.attachments.size > 0) {
        var Attachment_1 = message.attachments
        var Attachment_2 = `comme fichier : [ ${Attachment_1.map(att => `${att.name} : ${att.size / 1000}Ko ${att.url}`).join(` ; `)} ]`
    } else var Attachment_2 = ``
    if (message.embeds.length > 0) {
      const Embeds = new Map();
      const Embed = {
        embeds: []
      }
      Embeds.set(Client.user.id, Embed);
      const map = Embeds.get(Client.user.id)
      var Embeds_1 = message.embeds
      Embeds_1.forEach(embed => {
      if(embed.title) var Title = `\nTitre : ${embed.title}`
      if(embed.author) var Aut = `\nAuteur : ${embed.author.name}`
      if(embed.hexColor) var Color = `\nCouleur : ${embed.hexColor}`
      if(embed.description) var Desc = "\nDescription : ```" + embed.description + "```"
      if(embed.fields.length > 1) var Fields = `\nFields : [ ${embed.fields.map(field => `Nom : ${field.name}, Valeur : ${field.value}, Inline : ${field.inline}`)} ]`
      if(embed.timestamp) var Time = `\nHeure : ${moment(embed.timestamp).format(`Do:MM:YYYY H:mm:ss`)}`
      if(embed.footer !== null) var Foot = `\nFooter : ${embed.footer}`
      if(embed.image) var Img = `\nImage : ${embed.image.url}`
      if(embed.thumbnail !== null) var Minia = `\nMiniature : ${embed.thumbnail}`
      if(embed.video) var Vid = `\nVideo : ${embed.video}`
      Embed.embeds.push(`${Title || ``}${Aut || ``}${Color || ``}${Desc || ``}${Fields || ``}${Time || ``}${Foot || ``}${Img || ``}${Minia || ``}${Vid || ``}`)
    })
      var Embeds_3 = `comme embeds : [ ${map.embeds.join(`\n ------------------------------------------------ \n`)} ]`
  } else var Embeds_3 = ``
  if(message.content !== ``)var Message = message.content
  else var Message = ``
  if(Message && Embeds_3) var and1 = ` et `
  if(Message && Attachment_2) var and1 = ` et `
  if(Embeds_3 && Attachment_2) var and2 = ` et `
    if(message.content.startsWith(Prefix)) Client.channels.cache.get(Ch_Cmd).send(`**${Time}** **${message.author.tag}** a utilisé la commande **${message.content.substr(0,message.content.indexOf(' ')).replace(Prefix, '')}**${message.content.replace(message.content.substr(0,message.content.indexOf(' ')), '')}`)
    Client.channels.cache.get(Channel).send(`**${Time}** ${Channel_Type} : ${message.channel.toString()} (**${message.channel.name}**) : ${User} envoie ${Message || ``}${and1 || ``}${Attachment_2 || ``}${and2 || ``}${Embeds_3 || ``}`)
  }

Client.on(`ready`, async () => {
  const upgraded = await ncu.run({
      packageFile: './package.json',
      upgrade: true,
    })
    console.log(upgraded);
  var dir = './Guilds_Bot';
  if (!fs.existsSync(dir)) fs.mkdirSync(dir);
  console.log('Coucou')
  console.log(`\x1b[32m\x1b[1mJe suis dans ${Client.guilds.cache.size} serveurs`)
setInterval(() => {
  var date = moment().format('Do MMMM YYYY');
  Client.user.setActivity(`${date}`)
}, 30000);
    await Client.guilds.cache.forEach(async guild => {
      if(!fs.existsSync(`./Guilds_Bot/${guild.id}.json`)) await guild_create(guild);
      var obj = JSON.parse(fs.readFileSync(`./Guilds_Bot/${guild.id}.json`));
      [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].forEach(count => {
        if(count == 1 && !db.get(`guild_${guild.id}_Message-1`)) db.set(`guild_${guild.id}_Message-1`, obj.Channels.Message1)
        if(count == 2 && !db.get(`guild_${guild.id}_Message-2`)) db.set(`guild_${guild.id}_Message-2`, obj.Channels.Message2)
        if(count == 3 && !db.get(`guild_${guild.id}_Voice`)) db.set(`guild_${guild.id}_Voice`, obj.Channels.Voice)
        if(count == 4 && !db.get(`guild_${guild.id}_Logs`)) db.set(`guild_${guild.id}_Logs`, obj.Channels.Logs)
        if(count == 5 && !db.get(`guild_${guild.id}_Role`)) db.set(`guild_${guild.id}_Role`, obj.Channels.Role)
        if(count == 6 && !db.get(`guild_${guild.id}_Channel`)) db.set(`guild_${guild.id}_Channel`, obj.Channels.Channel)
        if(count == 7 && !db.get(`guild_${guild.id}_Nickname`)) db.set(`guild_${guild.id}_Nickname`, obj.Channels.Nickname)
        if(count == 8 && !db.get(`guild_${guild.id}_Clear`)) db.set(`guild_${guild.id}_Clear`, obj.Channels.Clear)
        if(count == 9 && !db.get(`guild_${guild.id}_Infos`)) db.set(`guild_${guild.id}_Infos`, obj.Channels.Infos)
        if(count == 10 && !db.get(`guild_${guild.id}_MemberCount`)) db.set(`guild_${guild.id}_MemberCount`, obj.Channels.MemberCount)
        if(count == 11 && !db.get(`guild_${guild.id}_MemberAdd`)) db.set(`guild_${guild.id}_MemberAdd`, obj.Custom.Welcome_Ch)
        if(count == 12 && !db.get(`guild_${guild.id}_Memberwelcome`)) db.set(`guild_${guild.id}_Memberwelcome`, obj.Custom.Welcome)
        if(count == 13 && !db.get(`guild_${guild.id}_MemberRemove`)) db.set(`guild_${guild.id}_MemberRemove`, obj.Custom.Left_Ch)
        if(count == 14 && !db.get(`guild_${guild.id}_Memberleft`)) db.set(`guild_${guild.id}_Memberleft`, obj.Custom.Left)
        if(count == 15 && !db.get(`guild_${guild.id}_prefix`) && obj.Prefix !== null) db.set(`guild_${guild.id}_prefix`, obj.Prefix)
      })
      guild.fetchOwner().then(creator => {
      let Guild = { 
      Name: `${guild.name}`,
      MemberCount: `${guild.memberCount}`, 
      ID: `${guild.id}`,
      Logo: `${guild.iconURL({ dynamic: true, size: 4096})}`,
      Owner: `Tag : ${creator.user.tag} ; ID : ${guild.ownerId}`,
      Prefix: db.get(`guild_${guild.id}_prefix`),
      Category: db.get(`guild_${guild.id}_Category`),
      Channels: {
        Message1: db.get(`guild_${guild.id}_Message-1`),
        Message2: db.get(`guild_${guild.id}_Message-2`),
        Voice: db.get(`guild_${guild.id}_Voice`),
        Logs: db.get(`guild_${guild.id}_Logs`),
        Role: db.get(`guild_${guild.id}_Role`),
        Channel: db.get(`guild_${guild.id}_Channel`),
        Nickname: db.get(`guild_${guild.id}_Nickname`),
        Clear: db.get(`guild_${guild.id}_Clear`),
        Infos: db.get(`guild_${guild.id}_Infos`),
        MemberCount: db.get(`guild_${guild.id}_MemberCount`),
      },
      Custom: {
        Welcome_Ch: db.get(`guild_${guild.id}_MemberAdd`),
        Welcome: db.get(`guild_${guild.id}_Memberwelcome`),
        Left_Ch: db.get(`guild_${guild.id}_MemberRemove`),
        Left: db.get(`guild_${guild.id}_Memberleft`),
      }
      }
      let data = JSON.stringify(Guild, null, 2)
      fs.writeFileSync(`./Guilds_Bot/${guild.id}.json`, data);
  })
            });
	process.on('uncaughtException', error => {
  Client.channels.cache.get(Ch_Err).send(`**${moment().format('H:mm:ss')}** Erreur : ${error}`)
  console.log(error)
});
});

Client.on('voiceStateUpdate', async (oldState, newState) => { // Listeing to the voiceStateUpdate event
  const Ch_Voice = db.get(`guild_${oldState.guild.id}_Voice`)
  var User = `${oldState.member.toString()} (**${oldState.member.user.tag}**)`
  if(newState.member.id == `688327045129699400`) var User = `**${oldState.member.user.tag}** (**${oldState.member.user.tag}**)`
  if(newState.member.id == CreatorID) var User = `**${oldState.member.user.tag}** (**${oldState.member.user.tag}**)`
  if(newState.channel === null) var event = `déconnecté à ${oldState.channel} (**${oldState.channel.name}**)`                                                      // Disconnect
  else if(oldState.channel === null) var event = `connecté à ${oldState.channel} (**${oldState.channel.name}**)`                                                   // Connect
  else if (oldState.selfDeaf === false && newState.selfDeaf === true) var event = `s'est mit en sourdine dans ${newState.channel} (**${newState.channel.name}**)`  // Sourdine
  else if (oldState.selfDeaf === true && newState.selfDeaf === false) var event = `n'est plus en sourdine dans ${newState.channel} (**${newState.channel.name}**)` // Dé-sourdine
  else if (oldState.selfMute === false && newState.selfMute === true) var event = `s'est mute dans ${newState.channel} (**${newState.channel.name}**)`             // Mute
  else if (oldState.selfMute === true && newState.selfMute === false) var event = `s'est demute dans ${newState.channel} (**${newState.channel.name}**)`           // Dé-mute
  else if (oldState.channel !== newState.channel) var event = `à été move de ${oldState.channel} (**${oldState.channel.name}**) à ${newState.channel} (**${newState.channel.name}**)`                   // Move
  else var event = `est mute/demute dans ${oldState.channel} (**${oldState.channel.name}**) à ${newState.channel} (**${newState.channel.name}**) par un admin.`                                         // Admin
  Client.channels.cache.get(Ch_Voice).send(`**${moment().format('H:mm:ss')}** ${User} ${event}`);
});

Client.on('threadCreate', async thread => Client.channels.cache.get(db.get(`guild_${thread.guild.id}_Channel`)).send(`**${moment().format('H:mm:ss')}** Fil créer : **${thread.name}** (de type: ${thread.type}) dans le Channel : **${thread.parent.name}**`));

Client.on('threadDelete', async thread => Client.channels.cache.get(db.get(`guild_${thread.guild.id}_Channel`)).send(`**${moment().format('H:mm:ss')}** Fil détruit : **${thread.name}** (de type: ${thread.type}) dans le Channel : **${thread.parent.name}**`));

Client.on(`channelCreate`, async channel => {
  if(channel.type == 'dm') return;
  const Ch_Channel = db.get(`guild_${channel.guild.id}_Channel`);
  Client.channels.cache.get(Ch_Channel).send(`**${moment(channel.createdAt).format('H:mm:ss')}** Salon crée : ${channel.toString()} (**${channel.name}**) dans la Catégorie : **${channel.parent.name}**`);
});

Client.on(`channelDelete`, async channel => Client.channels.cache.get(db.get(`guild_${channel.guild.id}_Channel`)).send(`**${moment().format('H:mm:ss')}** Salon détruit : **${channel.name}** dans la Catégorie : **${channel.parent.name}**`));

Client.on(`guildMemberUpdate`, async (oldMember, newMember) => {
  const Ch_Nickname = db.get(`guild_${oldMember.guild.id}_Nickname`)
  const Ch_Role = db.get(`guild_${oldMember.guild.id}_Role`)
  if(oldMember === newMember) return;

  if (oldMember.roles.cache.size > newMember.roles.cache.size) {
    const Embed = new Discord.MessageEmbed()
    Embed.setColor(`RED`)
    Embed.setAuthor(newMember.user.tag, newMember.user.avatarURL())
    
    oldMember.roles.cache.forEach(role => {
        if (!newMember.roles.cache.has(role.id)) {
            Embed.addField(`Role Retiré`, role.name)
            .addField(`Serveur`, newMember.guild.name)
            .setTimestamp()
            .setFooter(`${newMember.user.username}'s ID: ${newMember.id}`)
            Client.channels.cache.get(Ch_Role).send({ embeds: [Embed]})
            return;
        }
    })
} else if (oldMember.roles.cache.size < newMember.roles.cache.size) {
    const Embed = new Discord.MessageEmbed()
    Embed.setColor(`GREEN`)
    Embed.setAuthor(newMember.user.tag, newMember.user.avatarURL())
    
    newMember.roles.cache.forEach(role => {
        if (!oldMember.roles.cache.has(role.id)) {
            Embed.addField(`Role Ajouté`, role.name)
            .addField(`Serveur`, newMember.guild.name)
            .setTimestamp()
            .setFooter(`${newMember.user.username}'s ID: ${newMember.id}`)
            Client.channels.cache.get(Ch_Role).send({ embeds: [Embed]})
            return;
        }
    })
} else if (!oldMember.nickname && newMember.nickname) {
  const membernewnicklog = new Discord.MessageEmbed()
    .setAuthor(`${newMember.user.tag}`, `${newMember.user.displayAvatarURL({ format: `png`, dynamic: true })}`)
    .setDescription(`**${newMember} pseudo ajouté dans : ${oldMember.guild.name}**`)
    .setFooter(`${newMember.user.username}'s ID: ${newMember.id}`)
    .setTimestamp()
    .setColor('#ffff00')
    .addField(`Nouveau Pseudo`, newMember.nickname)
  Client.channels.cache.get(Ch_Nickname).send({ embeds: [membernewnicklog]})
  return;
} else if (oldMember.nickname && !newMember.nickname) {
  const memberremovenicklog = new Discord.MessageEmbed()
    .setAuthor(`${oldMember.user.tag}`, `${oldMember.user.displayAvatarURL({ format: `png`, dynamic: true })}`)
    .setDescription(`**${oldMember} pseudo retiré dans : ${oldMember.guild.name}**`)
    .setFooter(`${oldMember.user.username}'s ID: ${oldMember.id}`)
    .setTimestamp()
    .setColor('#f04747')
    .addField(`Ancien Pseudo`, oldMember.nickname)
  Client.channels.cache.get(Ch_Nickname).send({ embeds: [memberremovenicklog]})
  return;
} else if (oldMember.nickname && newMember.nickname) {
  if(oldMember.nickname === newMember.nickname) return;
  const memberchangednicklog = new Discord.MessageEmbed()
    .setAuthor(`${newMember.user.tag}`, `${newMember.user.displayAvatarURL({ format: `png`, dynamic: true })}`)
    .setDescription(`**${newMember} pseudo changé dans : ${oldMember.guild.name}**`)
    .setFooter(`${newMember.user.username}'s ID: ${newMember.id}`)
    .setTimestamp()
    .setColor('#ff4500')
    .addField(`Avant`, oldMember.nickname)
    .addField(`Après`, newMember.nickname)
  Client.channels.cache.get(Ch_Nickname).send({ embeds: [memberchangednicklog]})
}
});

Client.on(`guildMemberAdd`, async member => {
  if(db.get(`guild_${member.guild.id}_MemberCount`)){

  const Ch_MemberCount = db.get(`guild_${member.guild.id}_MemberCount`)
  const Ch_mc = Client.channels.cache.get(Ch_MemberCount)
  const mc_guild = Client.guilds.cache.find(gui => gui.name == member.guild.name)

  var memberCount = mc_guild.memberCount;
  await Ch_mc.setName(`Membre : ${memberCount}`)
  }
  const Ch_Logs = db.get(`guild_${member.guild.id}_Logs`)
  Client.channels.cache.get(Ch_Logs).send(`**${moment(member.joinedAt).format('H:mm:ss')}** **${member.user.tag}** est arrivé dans **${member.guild.name}**`)

    var Welcome = db.get(`guild_${member.guild.id}_Memberwelcome`)
    if(Welcome == `Off`) return;
    if(Welcome == `On`){
    if(!db.get(`guild_${member.guild.id}_MemberAdd`)) return;
  const mdr = db.get(`guild_${member.guild.id}_MemberAdd`)
  const channel = Client.channels.cache.get(mdr);

	if (!channel) return;
  if(fs.existsSync(`./Custom/Welcome/${member.id}.png`)) return channel.send({content: `Bienvenue dans le serveur, ${member}!`, files: [`./Custom/Welcome/${member.id}.png`]});
  else {
    const attachment = await canvas_card(member, `Welcome`, `#00fbff`, `#53dad8`, `#0c00ff`)
	channel.send({content: `Bienvenue dans le serveur, ${member}!`, files: [attachment]});
  }
}
});

Client.on(`guildMemberRemove`, async member => {
  if(db.get(`guild_${member.guild.id}_MemberCount`)){
  const Ch_MemberCount = db.get(`guild_${member.guild.id}_MemberCount`)

  const Ch_mc = Client.channels.cache.get(Ch_MemberCount)
  const mc_guild = Client.guilds.cache.find(gui => gui.name == member.guild.name)
  var memberCount = mc_guild.memberCount;
  await Ch_mc.setName(`Membre : ${memberCount}`)
  }

  
  const Ch_Logs = db.get(`guild_${member.guild.id}_Logs`)
  const fetchedLogs = await member.guild.fetchAuditLogs({
		limit: 1,
		type: 'MEMBER_KICK',
	});
	const kickLog = fetchedLogs.entries.first();

	if (!kickLog) Client.channels.cache.get(Ch_Logs).send(`**${moment().format('H:mm:ss')}** **${member.user.tag}** a quitté le serveur, très probablement de sa propre volonté.`);

	const { executor, target } = kickLog;

	if (target.id === member.id) Client.channels.cache.get(Ch_Logs).send(`**${moment().format('H:mm:ss')}** **${member.user.tag}** a quitté le serveur ; il est kick par **${executor.tag}**`);
	else Client.channels.cache.get(Ch_Logs).send(`**${moment().format('H:mm:ss')}** **${member.user.tag}** a quitté le serveur, rien n'a été trouvé.`);

    var Left = db.get(`guild_${member.guild.id}_Memberleft`)
    if(Left == `Off`) return;
    if(Left == `On`){

    if(!db.get(`guild_${member.guild.id}_MemberRemove`)) return;
  const mdr = db.get(`guild_${member.guild.id}_MemberRemove`)
  const channel = Client.channels.cache.get(mdr);

	if (!channel) return;
  if(fs.existsSync(`./Custom/Left/${member.id}.png`)) return channel.send({content: `Au revoir, ${member}!`, files: [`./Custom/Left/${member.id}.png`]});
  else {
    const attachment = await canvas_card(member, `Left`, `#ff0000`, `#ff2e00`, `#ff5d00`)
	channel.send({content: `Au revoir, ${member}!`, files: [attachment]});
  }
}
});

Client.on('guildBanAdd', async Ban => {
  const guild = Ban.guild
  const user = Ban.user
  const Ch_Logs = db.get(`guild_${guild.id}_Logs`)
	const fetchedLogs = await guild.fetchAuditLogs({
		limit: 1,
		type: 'MEMBER_BAN_ADD',
	});
	const banLog = fetchedLogs.entries.first();
  const banReason = fetchedLogs.entries.first().reason;
	if (!banLog) Client.channels.cache.get(Ch_Logs).send(`**${moment().format('H:mm:ss')}** **${user.tag}** est banni de **${guild.name}** mais rien n'a pu être trouvé.`);
	const { executor, target } = banLog;
	if (target.id === user.id) Client.channels.cache.get(Ch_Logs).send(`**${moment().format('H:mm:ss')}** **${user.tag}** est ban de **${guild.name}** par **${executor.tag}**\nRaison : **${banReason}**`);
	else Client.channels.cache.get(Ch_Logs).send(`**${moment().format('H:mm:ss')}** **${user.tag}** est ban de **${guild.name}**`);
});

Client.on(`guildBanRemove`, async Ban => {
  const guild = Ban.guild
  const user = Ban.user
  const Ch_Logs = db.get(`guild_${guild.id}_Logs`)
  if(guild.me.permissionsIn().has('VIEW_AUDIT_LOG')) {
	const fetchedLogs = await guild.fetchAuditLogs({
		limit: 1,
		type: 'MEMBER_BAN_REMOVE',
	})
	const banLog = fetchedLogs.entries.first();
	const { executor } = banLog;
  Client.channels.cache.get(Ch_Logs).send(`**${moment().format('H:mm:ss')}** **${user.tag}** est débanni de par **${executor.tag}**`);
} else Client.channels.cache.get(Ch_Logs).send(`**${moment().format('H:mm:ss')}** **${user.tag}** est débanni`);
});

Client.on('guildCreate', async (guild) => {
  guild_create(guild);
      
  const embed = new Discord.MessageEmbed()
  embed.setColor(`42ff00`)
  embed.setAuthor(`Créateur : ${CreatorTag} ; ${Client.user.tag}`, Client.users.cache.get(CreatorID).displayAvatarURL({ dynamic: true, size: 4096 }))
  embed.setTitle(`Xitef156`)
  embed.setURL('https://www.youtube.com/channel/UCDdDwCLs63dLZsUP7xz1QaA')
  embed.setDescription(`Regardez mes vidéos [Youtube](https://www.youtube.com/channel/UCDdDwCLs63dLZsUP7xz1QaA)`)
  embed.addField(`Teespring`, `Regarder ma boutique sur [Teespring](https://teespring.com/fr/vetements-xitef-rouge)`, true)
  embed.setURL('https://teespring.com/fr/vetements-xitef-rouge')
  embed.addField(`Discord`, `[Invite moi !](${Bot_link}) ou [Rejoin le serveur officiel](https://discord.gg/VsQG7ccj9t)`, true)
  embed.setTimestamp()
  embed.setFooter(`Team Dragon`, Client.user.displayAvatarURL())
  guild.systemChannel.send({ content: `Coucou !`, embeds: [embed]});
  
});

Client.on(`guildUpdate`, async (oldGuild, newGuild) => {
  const Ch_Infos = db.get(`guild_${oldGuild.id}_Infos`);
  const Ch_Logs = db.get(`guild_${oldGuild.id}_Logs`);
  newGuild.members.fetch(newGuild.ownerId).then(async creator2 => {
  oldGuild.members.fetch(oldGuild.ownerId).then(async creator => {
  const Embed = new Discord.MessageEmbed()
  const Embed_2 = new Discord.MessageEmbed()
  Embed.setColor('#42ff00')
  .setTimestamp()
  Embed_2.setColor('#42ff00')
  Embed_2.addField(`Nom`, newGuild.name)
  Embed_2.addField(`Icon`, newGuild.iconURL({size: 4096}))
  Embed_2.setImage(newGuild.iconURL({size: 4096}))
  Embed_2.addField(`Gérant`, creator2.toString())
  Embed_2.setFooter(`${newGuild.name}'s ID: ${newGuild.id}`)
  Embed_2.setTimestamp()

  Embed.setColor(`#42ff00`)
  if(oldGuild.name !== newGuild.name){
  Embed.addField(`Nouveau Nom`, newGuild.name)
  .addField(`Ancien Nom`, oldGuild.name)
  .setFooter(`${newGuild.name}'s ID: ${newGuild.id}`)
  Client.channels.cache.get(Ch_Logs).send({ embeds: [Embed]})
  } else if(oldGuild.icon !== newGuild.icon){
    Embed.addField(`Nouvelle Icon`, newGuild.iconURL({size: 4096}))
    .setImage(newGuild.iconURL({size: 4096}))
    .addField(`Ancienne Icon`, oldGuild.iconURL({size: 4096}))
    .setImage(oldGuild.iconURL({size: 4096}))
    .setFooter(`${newGuild.name}'s ID: ${newGuild.id}`)
    Client.channels.cache.get(Ch_Logs).send({ embeds: [Embed]})
    }
  
    else if(oldGuild.ownerId !== newGuild.ownerId){
      oldGuild.fetch(oldGuild.ownerId)
      newGuild.fetch(newGuild.ownerId)
      Embed.addField(`Nouveau gérant`, creator2.toString())
      .addField(`Ancien gérant`, creator.toString())
      .setFooter(`${newGuild.name}'s ID: ${newGuild.id}`)
      Client.channels.cache.get(Ch_Logs).send({ embeds: [Embed]})
      }
    Client.channels.cache.get(Ch_Infos).send({ embeds: [Embed_2] })
  })
  })
  
});

Client.on(`guildDelete`, async (guild) => Client.channels.cache.get(`831987411265388575`).send(`**${moment().format('H:mm:ss')}** **${guild.owner}** a détruit/quitté **${guild.name}**`));

Client.on(`messageDeleteBulk`, async (messages) => {
  const Ch_Clear = db.get(`guild_${messages.first().guild.id}_Clear`)
  const length = messages.map().length;
  const channel = Client.channels.cache.get(messages.first().channel.id)
  const embed = new Discord.MessageEmbed()
    .setTitle(`${length} Messages détruit dans ${channel.name}`)
  messages.forEach(msg => {
    if(msg.embeds.length > 0) return;
    if(msg.content !== ``){
      if (msg.attachments.size > 0) {
        var Attachment_1 = (msg.attachments)
        var Attachment_2 = ` et comme attachements : ${Attachment_1.map(att => att.proxyURL)}`
        var Message = `${msg}${Attachment_2}`
    } else {
      var Attachment_1 = null
      var Attachment_2 = null
      var Message = `${msg}`
    }
    } else {
      if (msg.attachments.size > 0) {
        var Attachment_1 = (msg.attachments)
        var Attachment_2 = `comme attachements : ${Attachment_1.map(att => att.proxyURL)}`
        var Message = `${Attachment_2}`
    } else var Message = `???`
  }
  embed.addField(msg.author.tag, Message)
})
    embed.setColor('#42ff00')
    .setTimestamp();
  // alternatively, use this to send the message to a specific channel
  Client.channels.cache.get(Ch_Clear).send({ embeds: [embed]});
});

Client.on(`messageDelete`, async (message) => {
  if(message.type == 'THREAD_STARTER_MESSAGE') return console.log(`test`)
  const Ch_Msg_2 = db.get(`guild_${message.guild.id}_Message-2`)
  var Message = message.content.replace(/@(everyone)/gi, `@-everyone`).replace(/@(here)/gi, `@-here`);
  if (message.attachments.size > 0) {
    var Attachment_1 = message.attachments
    var Attachment_2 = `comme fichier : [ ${Attachment_1.map(att => `${att.name} : ${att.size / 1000}Ko ${att.url}`).join(` ; `)} ]`
} else var Attachment_2 = ``
if (message.embeds.length > 0) {
  const Embeds = new Map();
  const Embed = {
    embeds: []
  }
  Embeds.set(Client.user.id, Embed);
  const map = Embeds.get(Client.user.id)
  var Embeds_1 = message.embeds
  Embeds_1.forEach(embed => {
  if(embed.title) var Title = `\nTitre : ${embed.title}`
  if(embed.author) var Aut = `\nAuteur : ${embed.author.name}`
  if(embed.hexColor) var Color = `\nCouleur : ${embed.hexColor}`
  if(embed.description) var Desc = "\nDescription : ```" + embed.description + "```"
  if(embed.fields.length > 1) var Fields = `\nFields : [ ${embed.fields.map(field => `Nom : ${field.name}, Valeur : ${field.value}, Inline : ${field.inline}`)} ]`
  if(embed.timestamp) var Time = `\nHeure : ${moment(embed.timestamp).format(`Do:MM:YYYY H:mm:ss`)}`
  if(embed.footer !== null) var Foot = `\nFooter : ${embed.footer}`
  if(embed.image) var Img = `\nImage : ${embed.image.url}`
  if(embed.thumbnail !== null) var Minia = `\nMiniature : ${embed.thumbnail}`
  if(embed.video) var Vid = `\nVideo : ${embed.video}`
  Embed.embeds.push(`${Title || ``}${Aut || ``}${Color || ``}${Desc || ``}${Fields || ``}${Time || ``}${Foot || ``}${Img || ``}${Minia || ``}${Vid || ``}`)
})
  var Embeds_3 = `comme embeds : [ ${map.embeds.join(`\n ------------------------------------------------ \n`)} ]`
} else var Embeds_3 = ``
if(message.content !== ``)var Message = message.content
else var Message = ``
if(Message && Embeds_3) var and1 = ` et `
if(Message && Attachment_2) var and1 = ` et `
if(Embeds_3 && Attachment_2) var and2 = ` et `
  if(message.author.tag == CreatorTag || message.author.tag === Charlotte_Tag)var User = CreatorTag
  else var User = `${message.author.toString()} (**${message.author.tag}**)`
  Client.channels.cache.get(Ch_Msg_2).send(`**${moment().format('H:mm:ss')}** Message supprimé de ${User} -> ${Message || ``}${and1 || ``}${Attachment_2 || ``}${and2 || ``}${Embeds_3 || ``}`);
});

Client.on(`messageUpdate`, async (oldMessage, newMessage) => {
  var OldMessage = oldMessage.content.replace(/@(everyone)/gi, `@-everyone`).replace(/@(here)/gi, `@-here`);
  var NewMessage = newMessage.content.replace(/@(everyone)/gi, `@-everyone`).replace(/@(here)/gi, `@-here`);
  if(OldMessage === NewMessage) return;
  const Ch_Msg_2 = db.get(`guild_${oldMessage.guild.id}_Message-2`)
  if(oldMessage.member.id === CreatorID) var User = CreatorTag
  else var User = `${oldMessage.member.user.toString()} (**${oldMessage.author.tag}**)`
  Client.channels.cache.get(Ch_Msg_2).send(`**${moment().format('H:mm:ss')}** Message modifié de ${User} -> ${OldMessage} en ${NewMessage}`);
});

Client.on(`roleCreate`, async (role) => Client.channels.cache.get(db.get(`guild_${role.guild.id}_Role`)).send(`**${moment(role.createdAt).format('H:mm:ss')}** ${role.toString()} (**${role.name}**) a été créer`));

Client.on(`roleDelete`, async (role) => Client.channels.cache.get(db.get(`guild_${role.guild.id}_Role`)).send(`**${moment().format('H:mm:ss')}** Le role **${role.name}** a été retiré`))

Client.on(`roleUpdate`, async (oldRole, newRole) => {
  const Ch_Role = db.get(`guild_${oldRole.guild.id}_Role`)
  const OldColor = oldRole.guild.roles.cache.get(oldRole.id).displayColor
  const NewColor = newRole.guild.roles.cache.get(newRole.id).displayColor
  if(oldRole === newRole) return;
  if(oldRole.name !== newRole.name) return Client.channels.cache.get(Ch_Role).send(`**${moment().format('H:mm:ss')}** Le role **${oldRole.toString()}** (**${oldRole.name}**) a changé de nom en **${newRole.name}**`);
  if(oldRole.color !== newRole.color) return Client.channels.cache.get(Ch_Role).send(`**${moment().format('H:mm:ss')}** Le role **${oldRole.toString()}** (**${oldRole.name}**) a changé de couleur de ${OldColor} à ${NewColor}`)
});

Client.on('inviteCreate', async invite => {
  const Ch_Invite = db.get(`guild_${invite.guild.id}_Invite`)
  const { inviter } = invite
  if((invite.maxUses == null) || 0) var MaxUses = `Illimited`
  else var MaxUses = invite.maxUses
  Client.channels.cache.get(Ch_Invite).send(`**${moment(invite.createdAt).format('H:mm:ss')}** Invite created ; the code is **${invite.code}** (https://discord.gg/${invite.code}) ; by **${inviter}** with **${MaxUses}** Max Uses ; expire at : **${moment(invite.expiresAt).format(`Do/MM/YYYY H:mm`)}**`)
});

Client.on('inviteDelete', async invite => {
  const Ch_Invite = db.get(`guild_${invite.guild.id}_Invite`)
  if((invite.maxUses == null) || 0) var MaxUses = `Illimited`
  else var MaxUses = invite.maxUses
  Client.channels.cache.get(Ch_Invite).send(`**${moment().format('H:mm:ss')}** Invite deleted ; the code was **${invite.code}** with **${MaxUses}** Max Uses ; create at : **${moment(invite.createdAt).format(`Do/MM/YYYY H:mm`)}** ; expire at : **${moment(invite.expiresAt).format(`Do/MM/YYYY H:mm`)}**`)
});

Client.on('messageCreate', async message => {
  const Prefix = db.get(`guild_${message.guild.id}_prefix`) || `,`
    const args = message.content.substring(Prefix.length).split(` `);

await Message(message)

    if(message.content.startsWith(`${Prefix}prefix`))  {

      if(!message.member.permissionsIn().has('MANAGE_GUILD')) return message.channel.send (`Tu n'as pas les perms`)
      if(!args[1]) return message.channel.send(`Tu doit spécialiser un prefix`)
      if(args[1].length > 3) return message.channel.send(`U prefix ne peut avoir plus de 3 charactères`)
      if(args[1] === db.get(`guild_${message.guild.id}_prefix`)) return message.channel.send(`C'est déjà le prefix`)
      if(args[1] === `,`) db.delete(`guild_${message.guild.id}_prefix`)
      db.set(`guild_${message.guild.id}_prefix`, args[1])
      message.channel.send(`Le nouveau prefix est ${args[1]}`)
      message.guild.owner.send(`Dans votre serveur : **${message.guild.name}**, **${message.author.tag}** a changé le prefix en : *${args[1]}* . Notez-le`)
    }
const command = args.shift().toLowerCase()

if(message.content.startsWith(Prefix + `view`)){
  if(!args[0]) return message.channel.send(`${Prefix}view **channel**/**role**`)
    if(args[0] == `channel`){
      var a = db.get(`guild_${message.guild.id}_MemberAdd`)
      var b = db.get(`guild_${message.guild.id}_Memberwelcome`)
      if(a == `undefined`) var c = `*Non définie*`
      else var c = Client.channels.cache.find(ch => ch.id == a)
      var e = db.get(`guild_${message.guild.id}_MemberRemove`)
      var f = db.get(`guild_${message.guild.id}_Memberleft`)
      if(e == `undefined`)var g = `*Non définie*`
      else var g = Client.channels.cache.find(ch => ch.id == e)
      if(!message.guild.me.permissionsIn(c).has('SEND_MESSAGES')) message.channel.send(`Je n'ai pas les permissions dans **${c}**`)
      message.channel.send(`Le channel **welcome** est : **${c}** et il est **${b}**`)
      if(!message.guild.me.permissionsIn(g).has('SEND_MESSAGES')) message.channel.send(`Je n'ai pas les permissions dans **${g}**`)
        message.channel.send(`Le channel **left** est : **${g}** et il est **${f}**`)
        }
  }

if(message.content.startsWith(Prefix + `set`)){
  if(!args[0]) return message.channel.send(`${Prefix}set **channel**/**role**`)
    if(args[0] == `channel`){
      var Channel = message.channel
      if(!args[1]) return message.channel.send(`${Prefix}set **channel** (welcome/left) (on/off/name_channel/id_channel)`)
      if(args[1] == `welcome`){
        if(!args[2]) {
          db.set(`guild_${message.guild.id}_MemberAdd`, Channel.id)
          message.channel.send(`Le channel ${Channel} est maintenant le lieu du message de bienvenue`)
        }
      else if(args[2]){
        if(isNaN(args[2])){
        if(args[2] == `on`){
          db.set(`guild_${message.guild.id}_Memberwelcome`, `On`)
          message.channel.send(`Le channel **${args[1]}** de bienvenue est maintenant activé`);
        } else if(args[2] == `off`){
          db.set(`guild_${message.guild.id}_Memberwelcome`, `Off`)
          message.channel.send(`Le channel **${args[1]}** de bienvenue est maintenant désactivé`);
        } else {
          var Channel = message.guild.channels.cache.find(ch => ch.name == args[2])
          db.set(`guild_${message.guild.id}_MemberAdd`, Channel.id)
          message.channel.send(`Le channel ${Channel} est maintenant le lieu du message de bienvenue`)
        }
        } else {
          if(!message.guild.channels.cache.find(ch => ch.id == args[2])) return;
          db.set(`guild_${message.guild.id}_MemberAdd`, args[2])
          var Ch = message.guild.channels.cache.find(ch => ch.id == args[2])
          message.channel.send(`Le channel ${Ch} est maintenant le lieu du message de bienvenue`)
        }
      }
    } else if(args[1] == `left`){
      if(!args[2]) {
        db.set(`guild_${message.guild.id}_MemberRemove`, Channel.id)
        message.channel.send(`Le channel ${Channel} est maintenant le lieu du message d'adieu`)
      }
    else if(args[2]){
      if(isNaN(args[2])){
      if(args[2] == `on`){
        db.set(`guild_${message.guild.id}_Memberleft`, `On`)
        message.channel.send(`Le channel **${args[1]}** d'adieu est maintenant activé`);
      } else if(args[2] == `off`){
        db.set(`guild_${message.guild.id}_Memberleft`, `Off`)
        message.channel.send(`Le channel **${args[1]}** d'adieu est maintenant désactivé`);
      } else {
        var Channel = message.guild.channels.cache.find(ch => ch.name == args[2])
        db.set(`guild_${message.guild.id}_MemberRemove`, Channel.id)
        message.channel.send(`Le channel ${Channel} est maintenant le lieu du message d'adieu`)
      }
      } else {
        if(!message.guild.channels.cache.find(ch => ch.id == args[2])) return;
        db.set(`guild_${message.guild.id}_MemberRemove`, args[2])
        var Ch = message.guild.channels.cache.find(ch => ch.id == args[2])
        message.channel.send(`Le channel ${Ch} est maintenant le lieu du message d'adieu`)
      }
    }
    }
  }
}
    
    if(message.content == Prefix + `help`){
      const Embed = new Discord.MessageEmbed()
      Embed.setColor(Bot_Color)
      Embed.setAuthor(`Créateur : ${CreatorTag}`, Client.users.cache.get(CreatorID).avatarURL({ dynamic: true, size: 4096}))
      Embed.setTitle(`Les commandes du bot (certaines peuvent être activés en message privé_)`)
      Embed.addField(`${Prefix}prefix`, `Change le prefix du bot pour le serveur`, true)
      Embed.addField(`${Prefix}stat`, `Statistiques du joueur`, true)
      Embed.addField(`${Prefix}role`, `Créer un changement pour les roles dans le serveur`, true)
      Embed.addField(`${Prefix}join`, `Le bot vient dans votre vocal`, true)
      Embed.addField(`${Prefix}leave`, `Le bot quitte votre vocal`, true)
      Embed.addField(`${Prefix}play`, `Le bot joue de la musique dans votre vocal`, true)
      Embed.addField(`${Prefix}skip`, `Le bot passe la musique dans votre vocal`, true)
      Embed.addField(`${Prefix}loop`, `Le bot joue en boucle la musique dans votre vocal`, true)
      Embed.addField(`${Prefix}queue`, `Montre la liste des musiques du serveur`, true)
      Embed.addField(`${Prefix}volume`, `Modifie le volume dans votre vocal (à la fin de la musique en cours)`, true)
      Embed.addField(`${Prefix}membercount`, `Affiche le nombre de joueur sur le serveur`, true)
      Embed.addField(`${Prefix}invite`, `Donne en mp l'url du bot/serveur`, true)
      Embed.addField(`${Prefix}ban`, `Permet de Ban le joueur mentionné du serveur`, true)
      Embed.addField(`${Prefix}kick`, `Permet de Kick le joueur mentionné du serveur`, true)
      Embed.addField(`${Prefix}clear`, `Retire les messages du salon`, true)
      Embed.addField(`${Prefix}pres`, `Présente le bot`, true)
      Embed.addField(`${Prefix}maths_`, `Fait des maths`, true)
      Embed.addField(`${Prefix}say_`, `Fait parler le bot`, true)
      Embed.addField(`${Prefix}set`, `Paramètre le bot`, true)
      Embed.addField(`${Prefix}view`, `Vois les paramètres de bot`, true)
      Embed.addField(`${Prefix}download_`, `Télécharge votre musique/vidéo (Youtube et Soundcloud)`, true)
      Embed.addField(`${Prefix}search_`, `Cherche votre musique/vidéo (Youtube et Soundcloud)`, true)
        message.channel.send({ embeds: [Embed]})
    }

    if(message.content == Prefix + `pres`){
      const embed = new Discord.MessageEmbed()
      .setColor(`42ff00`)
      .setAuthor(`Créateur : ${CreatorTag} ; ${Client.user.tag}`, `https://i.ibb.co/TwgW11w/Logo-Xitef156-2-5.png`)
      .setTitle(`Xitef156`)
      .setURL('https://www.youtube.com/channel/UCDdDwCLs63dLZsUP7xz1QaA')
      .setDescription(`Regardez mes vidéos [Youtube](https://www.youtube.com/channel/UCDdDwCLs63dLZsUP7xz1QaA)`)
      .addField(`Teespring`, `Regarder ma boutique sur [Teespring](https://teespring.com/fr/vetements-xitef-rouge)`, true)
      .setURL('https://teespring.com/fr/vetements-xitef-rouge')
      .addField(`Discord`, `[Invite moi !](${Bot_link}) ou [Rejoin le serveur officiel](https://discord.gg/VsQG7ccj9t)`, true)
      .setTimestamp()
      .setFooter(`Team Dragon`, Client.user.displayAvatarURL())
      message.channel.send({ embeds: [embed]})
  }

  if(message.content.startsWith(Prefix + `download`)){
    if(!args[0]) return message.channel.send(`Envoie un lien (youtube ou soundcloud) pour que je puisse télécharger ta vidéo/musique 
    (si tu met des mots clés je rechercherai sur youtube et si tu marque mp3, je t'enverrai un fichier mp3`)
    if (!fs.existsSync(`./Download/MP3`)) fs.mkdirSync(`./Download/MP3`);
    if (!fs.existsSync(`./Download/MP4`)) fs.mkdirSync(`./Download/MP4`);
    if (!fs.existsSync(`./Download/Others/MP3`)) fs.mkdirSync(`./Download/Others/MP3`);
    if (!fs.existsSync(`./Download/Others/MP4`)) fs.mkdirSync(`./Download/Others/MP4`);
    message.channel.send(`Recherche en cours...`)
    if(AuthifCreator) var Location = `/`
    else var Location = `/Others/`
    var Code = makeid(10)
    var Title = remSpCh(`${message.author.tag} - ${Code}`)
    if(message.content.includes(`soundcloud.com`) || message.content.includes(`sc`)) {
      var ARGS = args.join(` `).replace('sc', '').replace('soundlcoud', '').replace('  ', ' ').replace('  ', ' ')
      if(message.content.includes(`soundcloud.com`)) var type = true
      else var type = false
        if(type == true){
          if(ARGS.includes(`?in=`) || ARGS.split(`/`).length - 1 > 5) var Args = ARGS.substring(0, ARGS.indexOf(`?in=`)).replace(' ', '')
          else var Args = ARGS.replace(' ', '')
          console.log(Args)
          SC.getSongInfo(Args).then(song => download(song))
        } else {
          SC.search(ARGS).then(Song => {
            SC.getSongInfo(Song[0].url).then(song => download(song))
          })
        }
        async function download(song){
            message.channel.send(`Téléchargement de **${song.title || 'fail'}.mp3** (Cette étape peut prendre plusieurs minutes alors soyer patient)`)
            if(message.author.id == CreatorID) var Title = await remSpCh(song.title)
            var File = `./Download${Location}MP3/${Title}.mp3`
            const url = song.thumbnail
        const options = {
          url: url,
          dest: `./Download/${song.id}.png`                // will be saved to /path/to/dest/image.jpg
        }
        Download.image(options)
              const stream = await song.downloadProgressive();
              const writer = stream.pipe(fs.createWriteStream(File));
              writer.on("finish", () => {
        db.set(`Title1_${Code}`, song.title)
        db.set(`Author_${Code}`, song.author.name)
        db.set(`Format`, 3)
        db.set(`Image_${Code}`, `./Download/${song.id}.png`)
        db.set(`Title2_${Code}`, Title)
        db.set(`Location`, `./Download${Location}work${Code}.mp3`)
        db.set(`Code_Image_${Code}`, `./Download/${song.id}.png`)
        db.set(`Format`, 3)
        ChangeFile()
              })
            }
} else {
      var format = `4`
    if(message.content.includes(`mp3`) || message.content.includes(`Mp3`) || message.content.includes(`MP3`)){
      var format = `3`
      var filter = `audio`
      var vid = args.join(` `).replace(`mp3`, ``)
      } else {
      var format = `4`
      var filter = `video`
      var vid = args.join(` `)
    }
    db.set(`Format`, format)
    const video = await videoFinder(vid)
    if(message.author.id == CreatorID) var Title = remSpCh(video.title)
    const stream = ytdl(video.url, {
      filter: `${filter}only`,
      quality: 'highest'
    })
    var File = `./Download${Location}MP${format}/${Title}.mp${format}`
    if(format == `3`){
  const options = {
    url: video.image,
    dest: `./Download/${video.videoId}.png`                // will be saved to /path/to/dest/image.jpg
  }
  Download.image(options)
  db.set(`Title_${Code}`, video.title)
  db.set(`Author_${Code}`, video.author.name)
  db.set(`Image_${Code}`, `./Download/${video.videoId}.png`)
  db.set(`Location`, `./Download${Location}work${Code}.mp${format}`)
}
      db.set(`Title2_${Code}`, Title)
              db.set(`Title_${video.videoId}`, video.title)
              db.set(`Duration_${video.videoId}`, video.timestamp)
    message.channel.send(`Téléchargement de **${video.title}.mp${format}** de **${video.author.name}** (Cette étape peut prendre plusieurs minutes alors soyer patient)`)
    const download = stream.pipe(fs.createWriteStream(File))
    download.on('finish', async () => {
      if(format == `4`) {
        ytdl(video.url, {
          filter: 'audioonly',
          quality: 'highest'
        })
        .pipe(fs.createWriteStream(`./Download${Location}MP4/${Code}_2.mp3`))
        .on('finish', async () => {
              ffmpeg(File)
              .addInput(`./Download${Location}MP4/${Code}_2.mp3`)
              .output(`./Download${Location}work_${Code}.mp4`)
              .on('end', async () => {
                await fs.renameSync(`./Download${Location}work_${Code}.mp4`, File);
                fs.unlinkSync(`./Download${Location}MP4/${Code}_2.mp3`);
                SendFile();
              })
              .on('progress', async function(progress) {
                await sleep(2)
                if(pourc !== Math.round(progress.percent * 1) / 1){
                console.log(`Downloading... (${Math.round(progress.percent * 1) / 1}%)`)
                var pourc = Math.round(progress.percent * 1) / 1
                }
              })
              .run()
            })
      } else ChangeFile()
      })
  await sleep(2);
    if(getFilesizeInBytes(File) === 0) message.channel.send(`Cette vidéo ne peut pas se télécharger`);
}
    function ChangeFile() {
      message.channel.send(`50%...`)
      var format = db.get(`Format`)
      var LOCATION = db.get(`Location`)
      var TITLE = db.get(`Title2_${Code}`)
      var AUTHOR = db.get(`Author_${Code}`)
      var File = `./Download${Location}MP${format}/${TITLE}.mp${format}`
      var IMAGE = db.get(`Image_${Code}`)
      ffmpeg(File)
      .outputOptions('-metadata', 'title=' + TITLE)
      .outputOptions('-metadata', 'artist=' + AUTHOR)
      .output(LOCATION)
      .on('end', () => {
        const Tag = { image: IMAGE }
        NodeID3.update(Tag, LOCATION)
        function check2() {
          setTimeout(async () => {
          var tag = NodeID3.read(LOCATION)
          if(!tag.image) check2();
          else {
            await fs.unlinkSync(File)
            fs.renameSync(LOCATION, File)
            fs.unlinkSync(IMAGE)
            SendFile()
          }
          }, 5000)
        }
        check2();
  })
      .run()
    }
    async function SendFile() {
      var format = db.get(`Format`)
      var TITLE = db.get(`Title2_${Code}`)
      var File = `./Download${Location}MP${format}/${TITLE}.mp${format}`
      var File_Size = await getFilesizeInBytes(File)
      if(File_Size < (8 * 1000 * 1000)) {
        const attachment = new Discord.MessageAttachment(File, `${TITLE}.mp${format}`);
        message.channel.send({content: `**${TITLE}** a été téléchargé avec succès`, files: [attachment]});
      }
      else {
        if(message.author.id == CreatorID) message.channel.send(`**${Title}** a été téléchargé avec succès (Download/MP${format}/${Title}.mp${format})`);
        else message.channel.send(`**${Title}** a été téléchargé avec succès mais le fichier est trop lourd (**${Math.round(File_Size * 1) / 1}**Mo), veuillez envoyé ce code : **${Code}** à **${CreatorTag}**)`)
      }
    }
  }

if(AuthifCreator){

if(message.content.startsWith(Prefix + `get_msg`)){
  var amount = args[0]; // Amount of messages which should be deleted
    if(!amount)return message.channel.send('Vous n\'avez pas donné une quantité de messages qui devraient être supprimés !') // Checks if the `amount` parameter is given
    if(isNaN(amount)) return message.channel.send('Le paramètre de quantité n\'est pas un nombre !') // Checks if the `amount` parameter is a number. If not, the command throws an error
    if(amount > 100) return message.channel.send('Vous ne pouvez pas supprimer plus de 100 messages à la fois !') // Checks if the `amount` integer is bigger than 100
    if(amount < 1) return message.channel.send('Vous devez supprimer au moins 1 message !') // Checks if the `amount` integer is smaller than 1
    if(!Client.channels.cache.get(args[1])) return message.channel.send(`Mauvais id de channel`)
    message.delete()
    if(1 < amount > 100) var amount = amount + 1
    message.author.send('```dans '+ message.guild.name + ', les messages supprimés de ' + message.author + ' sont : ```')
    Client.channels.cache.get(args[1]).messages.fetch({ limit: amount }).then(messages => {
          messages.forEach(msg => message.author.send('**' + msg.author.tag + '** : ```' + msg.content + '```\n'))
  })
}

  if(message.content === Prefix + `ptdr`){
    const id = `VzTR0rduUYo`
    const Embed = new Discord.MessageEmbed()
    .setAuthor(`Nouvelle vidéo`)
    .setImage(`https://img.youtube.com/vi/${id}/maxresdefault.jpg`)
    .setTitle(`On avance ! Interdit de Casser #2`)
    .setURL(`https://www.youtube.com/watch?v=${id}`)
    .setDescription(`Bonjour, aujourd'hui c'est une survie Minecraft 1.17 où je n'ai pas le droit de casser de bloc.


    Ceci est le second épisode, regarder la premier si vous ne l'avez pas vu et dite-moi si cette série de vidéos vous plaît.
    
    
    Jeu : https://www.minecraft.net/fr-fr/get-minecraft
    
    Version : 1.17.1
    Ressource pack : Sphax PureBDCraft : https://bdcraft.net/downloads/purebdcraft-minecraft/
    Seed : 1173031306648354940`)
    .setTimestamp()
    .setColor('#42ff00')
    message.channel.send({content: `@everyone`, embeds: [Embed]})
}

if(message.content == Prefix + `xd`){
  message.guild.channels.create('⛏-Minecraft-Console-⛏', {
    type: 'GUILD_TEXT',
    parent: message.channel.parent,
    permissionOverwrites: [
      {id: message.guild.id,deny: ['SEND_MESSAGES','VIEW_CHANNEL']
      },
      {id: CreatorID,allow: ['SEND_MESSAGES','MANAGE_CHANNELS','VIEW_CHANNEL']
    }],
    position: 2
    }).then(Console => {
      db.set(`guild_${message.guild.id}_Minecraft-Console`, Console.id)
      message.author.send(`${Console.id}`)
    })
}

if(message.content.startsWith(Prefix + `lol`)){
          const c = Client.channels.cache.get(args[0])
          console.log(c)
        message.channel.send(`${c.toString()}`)
    }

if(message.content == Prefix + `xD`){
  message.channel.overwritePermissions([
    {
      id: message.guild.id,
      allow: ['SEND_MESSAGES'],
    },
  ]);
}
if(message.content === `!xptdr`){
  const category = message.guild.channels.cache.get(message.channel.parentId); // You can use `find` instead of `get` to fetch the category using a name: `find(cat => cat.name === 'test')
const guild = await Client.guilds.cache.find(g => g.name === message.channel.parent);
category.children.forEach(async Ch => {
  const ch = await Client.channels.cache.get(Ch.id)
  setTimeout(() => {
  if(ch.type == 'GUILD_CATEGORY') return db.set(`guild_${guild.id}_Category`, ch.id);
  if(ch.isVoice()) var Channel = `MemberCount`
  else {
    var i = ch.name.charAt(0);
    var Channel = ch.name.replace(i, i.toUpperCase());
  }
  db.set(`guild_${guild.name}_${Channel}`, ch.id)
}, 1000);
});
}
if(message.content == `,mdr`){
  const category = message.guild.channels.cache.get(message.channel.parentId); // You can use `find` instead of `get` to fetch the category using a name: `find(cat => cat.name === 'test')
await category.children.forEach(channel => channel.delete())
category.delete()
}
}

    if (command === `weather`) {
        const city = args[0]
    weather.find({search: args.join(` `), degreeType: `C`}, function(error, result){
      if (error) return message.channel.send(error)
      if (error) return Client.channels.cache.get(Ch_Err).send(`Erreur de la commande *weather* : **${error}**`)
      if (!city) return message.channel.send(`Vous n'avez pas entré le nom du lieu dont vous souhaitez connaître la météo.`)
      if (result === undefined || result.length === 0) return message.channel.send(`Vous n'avez pas spécifié de lieu valide`)
      let current = result[0].current
      let location = result[0].location
      const embed = new Discord.MessageEmbed()
      .setTitle(`Affichage des informations météo pour ${current.observationpoint}`)
      .setDescription(current.skytext)
      .setThumbnail(current.imageUrl)
      .setColor(`#42ff00`)
      .setTimestamp()
      .addField(`Temperature : `, current.temperature + `°C`, true)
      .addField(`Vitesse du vent : `, current.winddisplay, true)
      .addField(`Humidité : `, `${current.humidity}%`, true)
      .addField(`Timezone : `, `UTC${location.timezone}`, true)
      message.channel.send({ embeds: [embed]})

    })

  }

    if (command === `maths`) {
        let op = args[1]
    let no1 = args[0]
    let no2 = args[2]
    let parseNo1 = parseInt(no1)
    let parseNo2 = parseInt(no2)
    let xD = `Vous devez entrer l'opération et les opérandes à côté de la commande comme : `
    let ans
    if (!op) return message.reply(`${xD}\`,maths 1 + 2\``)
    if (!args[0] || !args[2]) return message.reply(`${xD}\`,maths 1 ${args[1]} 2\``)
      if (op === `+`) ans = parseNo1 + parseNo2
      else if (op === `-`) ans = parseNo1 - parseNo2
      else if (op === `*`) ans = parseNo1 * parseNo2
      else if (op === `/`) ans = parseNo1 / parseNo2
      else if (op === `mod`) ans = parseNo1 % parseNo2
      else if (op === `pow`) ans = Math.pow(parseNo1, parseNo2)
      else if (op === `root`) ans = Math.pow(parseNo1, 1/parseNo2)
      setTimeout(function () {
        if (ans === 69) message.channel.send(`http://www.sexologie-couple.com/wp-content/uploads/2007/11/69.jpg`)
        if (ans === 0) message.channel.send(`La tête à toto ptdr`)
      message.channel.send(`Réponse : ` + ans)
    }, 25)
}
if(message.content == Prefix + `link`){
  var Perm = Discord.Permissions.FLAGS
  message.author.send(
  Client.generateInvite({ scopes: ['bot'], permissions: [Perm.ADMINISTRATOR, Perm.VIEW_AUDIT_LOG, Perm.KICK_MEMBERS, Perm.BAN_MEMBERS, Perm.SEND_MESSAGES, Perm.MANAGE_NICKNAMES, Perm.MANAGE_CHANNELS, Perm.MANAGE_MESSAGES, Perm.MANAGE_ROLES, Perm.MANAGE_GUILD, Perm.MENTION_EVERYONE]
  }))
  }
if(message.channel.type == `dm`) return;
if(message.author.bot) return; // Les commandes en privé ne peuvent pa être reçu

    if(message.member.permissions.toArray().includes(`ADMINISTRATOR`) || AuthifCreator){
        if(message.content.startsWith(Prefix + `ban`)){
            let mention = message.mentions.members.first();
            if(mention == undefined)message.reply(`Membre non ou mal mentionné`);
            else {
                if(mention.bannable){
                    mention.ban()
                    message.channel.send(mention.displayName.tag + ` a été banni avec succès`);
                }
                else message.reply(`Impossible de ban ce membre`);
            }
        }
        else if(message.content.startsWith(Prefix + `kick`)){
            let mention = message.mentions.members.first();
            if(mention == undefined)message.reply(`Membre non ou mal mentionné`);
            else {
                if(mention.kickable){
                    mention.kick()
                    message.channel.send(mention.displayName.tag + ` a été kick avec succès`);
                }
                else  message.reply(`Impossible de kick ce membre`);
            }
        }
  }
    
    if(message.content == Prefix + `membercount` || message.content == Prefix + `mc`)message.channel.send(`Nous sommes **${memberCount}** membres sur le serveurs (y compris moi)`);

    if(message.content.startsWith(Prefix + `role`)){
          const mention = message.mentions.members.first();
      if(!args[0]) return message.channel.send (`add ; remove ; delete ; create`);
        if(args[0] == `add`){
          if(mention == undefined) return message.reply(`Membre non ou mal mentionné`);
          } else {
            if(message.guild.roles.cache.find(role => role.name == `${args[2]}`)){
              let a_role = message.guild.roles.cache.find(role => role.name === `${args[2]}`);
              mention.roles.add(a_role.id)
              message.channel.send(`${mention} a eu le rôle ${a_role}`)
            } 
            else message.reply(args[0] + ` as déjà ce rôle`)
          }
        if(args[0] == `remove`){
          const mention = message.mentions.members.first();
          if(mention == undefined) return message.reply(`Membre non ou mal mentionné`);
          else {
          if(message.guild.roles.cache.find(role => role.name == args[2])){
            let r_role = message.guild.roles.cache.find(role => role.name === args[2]);
            mention.roles.remove(r_role.id)
            message.channel.send(`${mention} n'a plus le rôle ${r_role}`)
          } 
          else message.reply(`Tu n'as pas ce rôle`)
        }
      }
      if(args[0] == `delete`){
          const role_d = message.guild.roles.cache.find(role => role.name === args[2])
        if(message.guild.roles.cache.find(role => role.name == args[2])){
          if(message.member.permissions.toArray().includes(`ADMINISTRATOR`) || AuthifCreator){
          role_d.delete()
          message.channel.send(`${args[1]} n'existe plus`)
        }
      } else message.reply(`${role_d} n\'existe pas`)
      }

      if(args[0] == `create`){
        if(!args[1]) return message.channel.send(`Donne une couleur de role en premier`)
        if(!args[2]) return message.channel.send(`Donne un nom de role après`)
        if(message.member.permissions.toArray().includes(`ADMINISTRATOR`) || AuthifCreator){
              message.guild.roles.create({ // Creating the role since it doesn't exist.
                    data: {
                        name: `${args.slice(2).join(` `)}`,
                        color: `${args[1]}`,
                        permissions: 0
                    }
                })
                message.channel.send(`Le role ${args.slice(2).join(` `)} a été créer`);
              }
      }
  }

if(message.content.startsWith(Prefix + `list`)){
  const Embed = new Discord.MessageEmbed()
  Embed.setColor(`#42ff00`)
    if(args[0] === `role`){
      const Role_g = message.guild.roles.cache.map(role => `**${role.toString()}** ; **${role.name}** en **${role.position}** position`);
      Embed.setTitle(`Les ${message.guild.roles.cache.size} du serveur`)
      Embed.setDescription(Role_g)
    }
    if(args[0] === `member`){
      const Role_m = message.guild.members.cache.map(member => `**${member.toString()}** ; **${member.user.username}** ; **${member.user.tag}**`);
      Embed.setTitle(`Les ${message.guild.members.cache.size} membres du serveur`)
      Embed.setDescription(Role_m)
    }
    message.author.send({ embeds: [Embed]})
}

      if(message.content.startsWith(Prefix + `clear`)){
        console.log(parseInt(args[0]))
        var amount = parseInt(args[0]); // Amount of messages which should be deleted
        var Reset = 0
        if(AuthifCreator) var Reset = 1
        if(message.author.id === message.guild.ownerId) var Reset = 1
        if(message.member.permissions.toArray().includes('ADMINISTRATOR')) var Reset = 1
        if(Reset === 0) return message.channel.send (`Tu n\'es pas le chef du serveur`);
          if(!amount) return message.channel.send('Vous n\'avez pas donné une quantité de messages qui devraient être supprimés !') // Checks if the `amount` parameter is given
          if(isNaN(amount)) return message.channel.send('Le paramètre de quantité n\'est pas un nombre !') // Checks if the `amount` parameter is a number. If not, the command throws an error
          if(amount > 100) return message.channel.send('Vous ne pouvez pas supprimer plus de 100 messages à la fois !') // Checks if the `amount` integer is bigger than 100
          if(1 > amount) return message.channel.send('Vous devez supprimer au moins 1 message !') // Checks if the `amount` integer is smaller than 1
          await message.delete()
          message.channel.messages.fetch({ limit: amount }).then(messages => message.channel.bulkDelete(messages))
  }

  if(message.content.startsWith(Prefix + `ulti_clear`)){
    setInterval(() => {
      message.channel.messages.fetch({ limit: 25 }).then(messages => {// Fetches the messages
        message.channel.bulkDelete(messages // Bulk deletes all messages that have been fetched and are not older than 14 days (due to the Discord API);
        )
      })
    }, 5000)
}

    if(message.content.startsWith(Prefix + `invite`)){
      if(args[0] == `bot`)message.author.send(`https://discord.com/api/oauth2/authorize?client_id=788076422778060920&permissions=402794686&scope=bot`);
   else if(args[0] == `server`)message.author.send(`https://discord.gg/VsQG7ccj9t`);
    else message.reply( Prefix + `bot ; ` + Prefix + `server` );
  }

    if(command === `say`) message.channel.send(args.join(` `))
    
    if(message.content.startsWith(Prefix + `stat`)){
      if(!args[0] || !args[0].startsWith('<@&') && args[0].endsWith('>')) return message.channel.send(`Mentionne quelqu'un pour l'utiliser`)
      message.guild.members.fetch(message.guild.ownerId).then(creator => {
      let Mention = args[0].slice(3, -1);
      const MenTion = Client.users.cache.get(Mention);
      const mention = Client.guilds.cache.get(message.guild.id).members.fetch(MenTion)
      const U_Role = mention.roles.cache.map(role => role.name).join(` `);
      if(!mention) return message.reply(`Membre non ou mal mentionné`)
    message.author.send(`**${mention.user.username}** qui a pour identifient : **${mention.user.toString()}** *ou* **${mention.user.tag}** il a comme role : **${U_Role.toString()}** dans le serveur : **${message.guild.name}**, créer par ${creator.user.tag}`)
    })
  }

    if(message.content == Prefix + `join`){
      if(!message.member.voice.channel.id) return message.channel.send(`Je ne suis n\'es pas en vocal`)
      if (!Client.voice.adapters.get(message.guild.id)) {
      Voice.joinVoiceChannel({
        channelId: message.member.voice.channel.id,
        guildId: message.guild.id,
        adapterCreator: message.guild.voiceAdapterCreator
    }).subscribe(player)
  }
}

    if(message.content.startsWith(Prefix)){
      var args2 = message.content.substring(Prefix.length).split(" ");
    const voiceChannel = message.member.voice.channel
    switch (args2[0].toLowerCase()) {
      case "play":
  if(!message.member.voice.channel) return message.channel.send(`Tu dois être dans un vocal`);
  const permissions = message.member.voice.channel.permissionsFor(message.member.user);
  if(!permissions.has('CONNECT')) return message.channel.send(`Tu n\'as pas les bonnes permissions`);
  if(!permissions.has('SPEAK')) return message.channel.send(`Tu n\'as pas les bonnes permissions`);
  if(!args.length) return message.channel.send(`Tu dois mettre un titre de video`)

  if(args.includes(`soundcloud`) || args.includes(`sc`)){
  await message.channel.send(`Recherche de **${args.join(` `).replace('soundcloud', '')}**`).then((msg => msg.suppressEmbeds(true)))

    SC.search(args.join(` `).replace('soundcloud', '').replace('sc', '').replace('  ', ' ').replace('  ', ' '), 'track').then(async Song => {

      SC.getSongInfo(Song[0].url).then(async song => {

      const New = new Discord.MessageEmbed()
      if (!Client.voice.adapters.get(message.guild.id)) {
      Voice.joinVoiceChannel({
        channelId: message.member.voice.channel.id,
        guildId: message.guild.id,
        adapterCreator: message.guild.voiceAdapterCreator
    }).subscribe(player)
  }
      var SONG = {
        type: 'sc',
        title: song.title,
        url: song.url,
        author: {
          name: song.author.name,
          url: song.author.url
        },
        url: song.url,
        duration: song.duration,
      };
      var Songs = queue.get(message.guild.id);
      if (!Songs) {
        var Songs = [];
        queue.set(message.guild.id, Songs);
        Songs.push(SONG);
        New.setColor('#ff5d00')
        play(message.guild.id)
      } else {
        Songs.push(SONG);
        New.setColor('FUCHSIA')
      }
        New.setTimestamp().setThumbnail(song.thumbnail).setTitle(song.title).setAuthor(song.author.name).setURL(song.url).setFooter(`Vidéo ID : ${song.id} ; Duration : ${song.duration}`)
        message.channel.send({ embeds : [New]})
    })
  })
  } else {
  await message.channel.send(`Recherche de **${args.join(' ')}**`).then((msg => msg.suppressEmbeds(true)))
            const video = await videoFinder(args.join(' '));

            if(video){
              const New = new Discord.MessageEmbed()
              var song = {
                type: 'ytb',
                id: video.videoId,
                title: video.title,
                url: video.url,
                author: {
                  name: video.author.name,
                  url: video.author.url
                },
                url: video.url,
                duration: video.timestamp,
              };
              if (!Songs) {
                var Songs = [];
                queue.set(message.guild.id, Songs);
                Songs.push(song);
                play(message.guild.id)
              } else {
                Songs.push(song);
                New.setColor(`#0xd677ff`)
              }
              if (!Client.voice.adapters.get(message.guild.id)) {
                New.setColor('RED')
              Voice.joinVoiceChannel({
                channelId: message.member.voice.channel.id,
                guildId: message.guild.id,
                adapterCreator: message.guild.voiceAdapterCreator
            }).subscribe(player)
          }
            New.setTimestamp().setThumbnail(video.image).setTitle(video.title).setAuthor(video.author.name).setURL(video.url).setFooter(`Vidéo ID : ${video.videoId} ; Duration : ${video.timestamp}`)
            message.channel.send({ embeds : [New]})
          } else {
              message.channel.send(`Pas de vidéo trouvée`)
                   queue.delete(message.guild.id);
                   return;
                 }
                }
                 break;
                 case "leave":
  if(!voiceChannel) return message.channel.send(`Tu dois être dans un vocal`);
  queue.delete(message.guild.id);
  Voice.getVoiceConnection(message.guild.id).disconnect();
  message.channel.send(`Vocal quitté :smiling_face_with_tear:`)
  break;
                 case "skip":
                  var Songs = queue.get(message.guild.id);
        if(!Songs) {
          await Voice.getVoiceConnection(message.guild.id).disconnect();
          return message.channel.send(`Il y a rien a skip`)
        } else {
          await player.stop()
          play(message.guild.id)
        }
  message.channel.send(`Skipped !`)
  break;
                 case "queue":
                  var Songs = queue.get(message.guild.id);
        if(!Songs) return message.channel.send(`Il y a rien a voir`)
              const Queue = new Discord.MessageEmbed()
              .setColor(`#00ffff`)
              .setTitle(`Queue de ${message.guild.name}`)
              await Songs.forEach((song, index) => Queue.addField(`${index}:`, `[${song.title}](${song.url}) \nDe [${song.author.name}](${song.author.url})\n${song.duration}`))
              await message.channel.send({ embeds: [Queue]})
  break;
                }
    }
if(message.content === Prefix + `loop`){
  if(db.get(`guild_${message.guild.id}_Music_Looping`) === true){
    db.set(`guild_${message.guild.id}_Music_Looping`, false)
    message.channel.send(`Loop désactivé`)
  } else {
    db.set(`guild_${message.guild.id}_Music_Looping`, true)
    message.channel.send(`Loop activé`)
  }
}
if(message.content.startsWith(Prefix + `volume`)){
  if(!args[0]) return message.channel.send(`Le volume du serveur est à ${db.get(`guild_${message.guild.id}_Volume`)}`)
  db.set(`guild_${message.guild.id}_Volume`, args[0])
  message.channel.send(`Le volume est maintenant de ${args[0]}`)
}

if(message.content == Prefix + `left`){
  if(message.author.id !== message.guild.ownerId || AuthifNotCreator) return message.channel.send(`Tu n'es pas le chef du serveur`);
    await message.channel.send(`Adieu...`)
    message.guild.leave()
  }

if(message.content.startsWith(Prefix + `search`)){
  if(!isNaN(args[0]) && !args[0]) message.channel.send(`Tu peux indiquer le nombre de résultat`)
  if(!args) return message.channel.send(`Tu doit indiquer ce que tu recherche`)
  if(args[0] && !isNaN(args[0])) {
    var search1 = await message.content.replace(args[0], ``)
    var search2 = await search1.replace(search1.substr(0,message.content.indexOf(' ')), ``)
    var search = await search2.replace(`  `, ``)
    var result = args[0]
  } else {
    var search = args.join(` `)
    var result = 35
  }
  if((args[0] || args[1]) == ('sc' ||'soundcloud')){
    await SC.search(search).then(async Songs => {
      var songs = Songs.slice( 0, result )
      if(!songs[0]) return message.channel.send(`Rien trouvé`)
      await songs.forEach(async (Song,index) => {
        await SC.getSongInfo(Song.url).then(async song => {
  const Search2 = new Discord.MessageEmbed()
  .setColor(Bot_Color)
  .setImage(song.thumbnail)
  .setTitle(`${songs.length || 1}/${result || 1} Résultats pour ${search}`)
  await Search2.addField(`${index + 1} : ${song.title}`, `${song.author.name} (ID: ${song.id} ; Url: ${song.url}) ; ${song.duration} ; ${song.likes} Likes ; Date : ${song.age}`)
  await message.channel.send({ embeds: [Search2]})
        })
      })
})
  }
  else {
  var Video = await ytSearch({ search: search })
  var videos = Video.videos.slice( 0, result )
  videos.forEach(async (video, index) => {
  const Search = new Discord.MessageEmbed()
  .setColor(Bot_Color)
  .setImage(video.image)
  .setTitle(`${videos.length || 1}/${result || 1} Résultats pour ${search}`)
  await Search.addField(`${index + 1} : ${video.title}`, `${video.author.name} (${video.videoId}) ; ${video.timestamp} ; ${video.views} Vues ; Date : ${video.ago}`)
  await message.channel.send({ embeds: [Search]})
})
  }
}

if(message.content == Prefix + `voice`){
  if(message.guild.id == Bot_Guild_ID) var Guild = Client.guilds.cache.find(g => g.name === message.channel.parent.name)
  else var Guild = message.guild
    Guild.channels.cache.filter((c) => c.type == `voice`).forEach((voicechannel) => {
      var members = `${voicechannel.members.map(z => z.user.toString()).join(` ; `)}`
      if(members === ``) return;
            var text = `dans **${voicechannel.name}**, il y a : `
          message.channel.send(`${text}${members}`)
        });
}
if(message.content == `forget_prefix`) return message.channel.send(Prefix)
if(message.content == Prefix) return message.channel.send(`Tape une commande. Ex : ${Prefix}help`)
});

Client.login(process.env.Token)
