const Discord = require('discord.js');
const Canvas = require('canvas');
const db = require('quick.db');require('better-sqlite3');
const moment = require('moment');
const fs = require('fs');
const ncu = require('npm-check-updates');

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
const React = new Map();

const Bot_Color = `#42ff00`
const CreatorTag = `Xitef156#1822`
const CreatorID = '776140752752869398'
const Charlotte_Tag = `charlotte_lbc#8842`
const Hack_Guild_ID = '880444663914459166'
const Bot_Guild_ID = '850033010350096414'
const Ch_Err = '834751451090911292'
const Ch_Cmd = '777937994245996545'
const Token = `Nzg4MDc2NDIyNzc4MDYwOTIw.GvnEoB.fkrTwWasIdwfNRryegli6nR42kgG4OENaoLIsk`
const Bot_link = `https://discord.com/api/oauth2/authorize?client_id=788076422778060920&permissions=402794686&scope=bot`
const Font = 'Vermin Vibes'
const { registerFont } = require(`canvas`);
registerFont(`./${Font}.ttf`, {family: Font})
moment.locale('fr');
const Font_Size_max = 80
const Font_Size_min = 50
const Canvas_Larg = 700
const Canvas_Haut = 250

async function Msg(message) {
  var msg1 = message.content.replace("<@!688327045129699400>", "@-Charlotte")
  var Msg1 = msg1.replace("<@!776140752752869398>", "@-Xitef156")
  var msg2 = Msg1.replace("<@688327045129699400>", "@-Charlotte")
  var Msg2 = msg2.replace("<@776140752752869398>", "@-Xitef156")
    var Message = Msg2.replace(/@(everyone)/gi, `@-everyone`).replace(/@(here)/gi, `@-here`);
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
if(message.content === ``) var Message = ``
if(Message && Embeds_3) var and1 = ` et `
if(Message && Attachment_2) var and1 = ` et `
if(Embeds_3 && Attachment_2) var and2 = ` et `
const Txt = `${Message || ``}${and1 || ``}${Attachment_2 || ``}${and2 || ``}${Embeds_3 || ``}`
return Txt;
}
async function Message(message){
  const Prefix = db.get(`guild_${message.guild.id}_prefix`) || `,`

  if(message.author.id == CreatorID) {
    var User = message.author.tag
  }
  else {
    var User = `${message.author.toString()} (**${message.author.tag}**)`
  }
    const Ch_Msg_1 = db.get(`guild_${message.guild.id}_Message-1`)
    if(message.content === `!xptdr`) return;
    if(message.author.id === Client.user.id && message.content.startsWith(`**`)) return;
    const Time = moment(message.createdAt).format('H:mm:ss')
    if(message.channel.id === Ch_Err) return;
    if(message.channel.id === 840923591460651008) return;
    if(message.channel.id === 969739493223596042) return;
    if(message.channel.id === 969742402577375272) return;
    if(message.channel.id === Ch_Cmd) return;
    if(message.channel.type == 'GUILD_PUBLIC_THREAD' || message.channel.type == 'GUILD_PRIVATE_THREAD') var Channel_Type = `Fil`
    else var Channel_Type = `Salon`
    if(message.channel.type == 'DM') var Channel = await 847579263988531210
    if(message.guild.id === 787081936719708221) var Channel = await 871919663670517780
    if(!Channel && Ch_Msg_1 !== 868950307848200202) var Channel = await Ch_Msg_1
    if(message.guild.id === Bot_Guild_ID && !message.content.startsWith(Prefix)) return;
    await Msg(message, function (err) {
      if(err) return console.log(`Erreur Message : ${err}`)
    }).then(Txt => {
      if(message.content.startsWith(Prefix)) Client.channels.cache.get(Ch_Cmd).send(`**${Time}** ${User} a utilisé la commande **${message.content.substr(0,message.content.indexOf(' ')).replace(Prefix, '')}**${message.content.replace(message.content.substr(0,message.content.indexOf(' ')), '')}`)
      Client.channels.cache.get(Channel).send(`**${Time}** ${Channel_Type} : ${message.channel.toString()} (**${message.channel.name}**) : ${User} envoie ${Txt}`)
    })
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
        Embed.setFooter({"text": `${guild.name}'s ID: ${guild.id}`})
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
async function canvas_card(member, type = String, color = String, color1 = String, color2 = String){
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

async function Msg(message) {
  var msg1 = message.content.replace("<@!688327045129699400>", "@-Charlotte")
  var Msg1 = msg1.replace("<@!776140752752869398>", "@-Xitef156")
  var msg2 = Msg1.replace("<@688327045129699400>", "@-Charlotte")
  var Msg2 = msg2.replace("<@776140752752869398>", "@-Xitef156")
    var Message = Msg2.replace(/@(everyone)/gi, `@-everyone`).replace(/@(here)/gi, `@-here`);
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
if(message.content === ``) var Message = ``
if(Message && Embeds_3) var and1 = ` et `
if(Message && Attachment_2) var and1 = ` et `
if(Embeds_3 && Attachment_2) var and2 = ` et `
const Txt = `${Message || ``}${and1 || ``}${Attachment_2 || ``}${and2 || ``}${Embeds_3 || ``}`
return Txt;
}

Client.on(`ready`, async () => {
  const upgraded = await ncu.run({
  packageFile: './package.json',
  upgrade: true,
  jsonUpgraded: true
})

console.log(upgraded) // { "mypackage": "^2.0.0", ... }
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

Client.on("error", function(error){
  console.error(`client's WebSocket encountered a connection error: ${error}`);
});

Client.on("disconnect", function(event){
  console.log(`The WebSocket has closed and will no longer attempt to reconnect`);
});

Client.on("warn", function(info){
  console.log(`warn: ${info}`);
});

Client.on("reconnecting", function(){
  console.log(`client tries to reconnect to the WebSocket`);
});

Client.on("resume", function(replayed){
  console.log(`whenever a WebSocket resumes, ${replayed} replays`);
});

Client.on('voiceStateUpdate', async (oldState, newState) => { // Listeing to the voiceStateUpdate event
  const Ch_Voice = db.get(`guild_${oldState.guild.id}_Voice`)
  var User = `${oldState.member.toString()} (**${oldState.member.user.tag}**)`
  if(newState.member.id == `688327045129699400`) var User = `**${oldState.member.user.tag}** (**${oldState.member.user.tag}**)`
  if(newState.member.id == CreatorID) var User = `**${oldState.member.user.tag}** (**${oldState.member.user.tag}**)`
  if(newState.channel === null) var event = `déconnecté à ${oldState.channel} (**${oldState.channel.name}**)`      // Disconnect
  else if(oldState.channel === null) var event = `connecté à ${newState.channel} (**${newState.channel.name}**)`   // Connect
  else if (oldState.selfDeaf === false && newState.selfDeaf === true) var event = `s'est mit en sourdine dans ${newState.channel} (**${newState.channel.name}**)`  // Sourdine
  else if (oldState.selfDeaf === true && newState.selfDeaf === false) var event = `n'est plus en sourdine dans ${newState.channel} (**${newState.channel.name}**)` // Dé-sourdine
  else if (oldState.selfMute === false && newState.selfMute === true) var event = `s'est mute dans ${newState.channel} (**${newState.channel.name}**)`             // Mute
  else if (oldState.selfMute === true && newState.selfMute === false) var event = `s'est demute dans ${newState.channel} (**${newState.channel.name}**)`           // Dé-mute
  else if (oldState.channel !== newState.channel) var event = `à été move de ${oldState.channel} (**${oldState.channel.name}**) à ${newState.channel} (**${newState.channel.name}**)`   // Move
  else var event = `est mute/demute dans ${oldState.channel} (**${oldState.channel.name}**) à ${newState.channel} (**${newState.channel.name}**) par un admin.`         // Admin
  Client.channels.cache.get(Ch_Voice).send(`**${moment().format('H:mm:ss')}** ${User} ${event}`);
});

Client.on('messageReactionAdd', async (Reaction,user) => {
  const react = React.get(Reaction.message.guild.id)
  if(!react) return;
  
  react.forEach(async Reacting => {
    if(Reacting.message.id === Reaction.message.id){
      var index = Reacting.emojis.indexOf(Reaction.emoji.name)
      Reacting.message.guild.members.fetch(user.id).then(User => User.roles.add(Reacting.roles[index]))
    }
  })
});

Client.on('messageReactionRemove', async (Reaction,user) => {
  const react = React.get(Reaction.message.guild.id)
  if(!react) return;
  
  react.forEach(async Reacting => {
    if(Reacting.message.id === Reaction.message.id){
      var index = Reacting.emojis.indexOf(Reaction.emoji.name)
      Reacting.message.guild.members.fetch(user.id).then(User => User.roles.remove(Reacting.roles[index]))
    }
  })
});

Client.on("messageReactionRemoveAll", function(message){
  console.error(`all reactions are removed from a message`);
});

Client.on('threadCreate', async thread => Client.channels.cache.get(db.get(`guild_${thread.guild.id}_Channel`)).send(`**${moment().format('H:mm:ss')}** Fil créer : **${thread.name}** (de type: ${thread.type}) dans le Channel : **${thread.parent.name}**`));

Client.on('threadDelete', async thread => Client.channels.cache.get(db.get(`guild_${thread.guild.id}_Channel`)).send(`**${moment().format('H:mm:ss')}** Fil détruit : **${thread.name}** (de type: ${thread.type}) dans le Channel : **${thread.parent.name}**`));

Client.on(`channelCreate`, async channel => {
  if(channel.type == 'dm') return;
  const Ch_Channel = db.get(`guild_${channel.guild.id}_Channel`);
  Client.channels.cache.get(Ch_Channel).send(`**${moment(channel.createdAt).format('H:mm:ss')}** Salon crée : ${channel.toString()} (**${channel.name}**) dans la Catégorie : **${channel.parent.name}**`);
});

Client.on(`channelDelete`, async channel => Client.channels.cache.get(db.get(`guild_${channel.guild.id}_Channel`)).send(`**${moment().format('H:mm:ss')}** Salon détruit : **${channel.name}** dans la Catégorie : **${channel.parent.name}**`));

Client.on("channelPinsUpdate", function(channel, time){
  console.log(`channelPinsUpdate: ${channel}:${time}`);
});
Client.on("channelUpdate", function(oldChannel, newChannel){
  console.log(`channelUpdate -> a channel is updated - e.g. name change, topic change`);
});

Client.on(`guildMemberUpdate`, async (oldMember, newMember) => {
  const Ch_Nickname = db.get(`guild_${oldMember.guild.id}_Nickname`)
  const Ch_Role = db.get(`guild_${oldMember.guild.id}_Role`)
  if(oldMember === newMember) return;

  if (oldMember.roles.cache.size > newMember.roles.cache.size) {
    const Embed = new Discord.MessageEmbed()
    Embed.setColor(`RED`)
    Embed.setAuthor({"name": newMember.user.tag, "iconURL": newMember.user.avatarURL()})
    
    oldMember.roles.cache.forEach(role => {
        if (!newMember.roles.cache.has(role.id)) {
            Embed.addField(`Role Retiré`, role.name)
            .addField(`Serveur`, newMember.guild.name)
            .setTimestamp()
            .setFooter({"text": `${newMember.user.username}'s ID: ${newMember.id}`})
            Client.channels.cache.get(Ch_Role).send({ embeds: [Embed]})
            return;
        }
    })
} else if (oldMember.roles.cache.size < newMember.roles.cache.size) {
    const Embed = new Discord.MessageEmbed()
    Embed.setColor(`GREEN`)
    Embed.setAuthor({"name": newMember.user.tag, "iconURL": newMember.user.avatarURL()})
    
    newMember.roles.cache.forEach(role => {
        if (!oldMember.roles.cache.has(role.id)) {
            Embed.addField(`Role Ajouté`, role.name)
            .addField(`Serveur`, newMember.guild.name)
            .setTimestamp()
            .setFooter({"text": `${newMember.user.username}'s ID: ${newMember.id}`})
            Client.channels.cache.get(Ch_Role).send({ embeds: [Embed]})
            return;
        }
    })
} else if (!oldMember.nickname && newMember.nickname) {
  const membernewnicklog = new Discord.MessageEmbed()
    .setAuthor({"name": newMember.user.tag, "iconURL": newMember.user.displayAvatarURL({ format: `png`, dynamic: true })})
    .setDescription(`**${newMember} pseudo ajouté dans : ${oldMember.guild.name}**`)
    .setFooter({"text": `${newMember.user.username}'s ID: ${newMember.id}` })
    .setTimestamp()
    .setColor('#ffff00')
    .addField(`Nouveau Pseudo`, newMember.nickname)
  Client.channels.cache.get(Ch_Nickname).send({ embeds: [membernewnicklog]})
  return;
} else if (oldMember.nickname && !newMember.nickname) {
  const memberremovenicklog = new Discord.MessageEmbed()
    .setAuthor({"name": oldMember.user.tag, "iconURL": oldMember.user.displayAvatarURL({ format: `png`, dynamic: true })})
    .setDescription(`**${oldMember} pseudo retiré dans : ${oldMember.guild.name}**`)
    .setFooter({"text": `${oldMember.user.username}'s ID: ${oldMember.id}` })
    .setTimestamp()
    .setColor('#f04747')
    .addField(`Ancien Pseudo`, oldMember.nickname)
  Client.channels.cache.get(Ch_Nickname).send({ embeds: [memberremovenicklog]})
  return;
} else if (oldMember.nickname && newMember.nickname) {
  if(oldMember.nickname === newMember.nickname) return;
  const memberchangednicklog = new Discord.MessageEmbed()
    .setAuthor({"name": `${newMember.user.tag}`, "iconURL": `${newMember.user.displayAvatarURL({ format: `png`, dynamic: true })}`})
    .setDescription(`**${newMember} pseudo changé dans : ${oldMember.guild.name}**`)
    .setFooter({"text": `${newMember.user.username}'s ID: ${newMember.id}`})
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

	if (kickLog.target.id === member.id) Client.channels.cache.get(Ch_Logs).send(`**${moment().format('H:mm:ss')}** **${member.user.tag}** a quitté le serveur ; il est kick par **${kickLog.executor.tag}**`);
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
	if (!banLog) Client.channels.cache.get(Ch_Logs).send(`**${moment().format('H:mm:ss')}** **${user.tag}** est banni de **${guild.name}** mais rien n'a pu être trouvé.`);
	const { executor, target, reason } = banLog;
	if (target.id === user.id) Client.channels.cache.get(Ch_Logs).send(`**${moment().format('H:mm:ss')}** **${user.tag}** est ban de **${guild.name}** par **${executor.tag}**\nRaison : **${reason || `aucune`}**`);
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
  embed.setAuthor({"name": `Créateur : ${CreatorTag} ; ${Client.user.tag}`, "iconURL": Client.users.cache.get(CreatorID).displayAvatarURL({ dynamic: true, size: 4096 })})
  embed.setTitle(`Xitef156`)
  embed.setURL('https://www.youtube.com/channel/UCDdDwCLs63dLZsUP7xz1QaA')
  embed.setDescription(`Regardez mes vidéos [Youtube](https://www.youtube.com/channel/UCDdDwCLs63dLZsUP7xz1QaA)`)
  embed.addField(`Teespring`, `Regarder ma boutique sur [Teespring](https://teespring.com/fr/vetements-xitef-rouge)`, true)
  embed.setURL('https://teespring.com/fr/vetements-xitef-rouge')
  embed.addField(`Discord`, `[Invite moi !](${Bot_link}) ou [Rejoin le serveur officiel](https://discord.gg/VsQG7ccj9t)`, true)
  embed.setTimestamp()
  embed.setFooter({"text": `Team Dragon`, "iconURL": Client.user.displayAvatarURL()})
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
  Embed_2.setFooter({"text": `${newGuild.name}'s ID: ${newGuild.id}`})
  Embed_2.setTimestamp()

  Embed.setColor(`#42ff00`)
  if(oldGuild.name !== newGuild.name){
  Embed.addField(`Nouveau Nom`, newGuild.name)
  .addField(`Ancien Nom`, oldGuild.name)
  .setFooter({"text": `${newGuild.name}'s ID: ${newGuild.id}`})
  Client.channels.cache.get(Ch_Logs).send({ embeds: [Embed]})
  } else if(oldGuild.icon !== newGuild.icon){
    Embed.addField(`Nouvelle Icon`, newGuild.iconURL({size: 4096}))
    .setImage(newGuild.iconURL({size: 4096}))
    .addField(`Ancienne Icon`, oldGuild.iconURL({size: 4096}))
    .setImage(oldGuild.iconURL({size: 4096}))
    .setFooter({"text": `${newGuild.name}'s ID: ${newGuild.id}`})
    Client.channels.cache.get(Ch_Logs).send({ embeds: [Embed]})
    }
  
    else if(oldGuild.ownerId !== newGuild.ownerId){
      oldGuild.fetch(oldGuild.ownerId)
      newGuild.fetch(newGuild.ownerId)
      Embed.addField(`Nouveau gérant`, creator2.toString())
      .addField(`Ancien gérant`, creator.toString())
      .setFooter({"text": `${newGuild.name}'s ID: ${newGuild.id}`})
      Client.channels.cache.get(Ch_Logs).send({ embeds: [Embed]})
      }
    Client.channels.cache.get(Ch_Infos).send({ embeds: [Embed_2] })
  })
  })
  
});

Client.on(`guildDelete`, async (guild) => Client.channels.cache.get(`831987411265388575`).send(`**${moment().format('H:mm:ss')}** **${guild.owner}** a détruit/quitté **${guild.name}**`));

Client.on('messageCreate', async (message) => {
await Message(message)
})

Client.on(`messageDeleteBulk`, async (messages) => {
  const Ch_Clear = db.get(`guild_${messages.first().guild.id}_Clear`)
  const length = messages.map().length;
  const channel = Client.channels.cache.get(messages.first().channel.id)
  const embed = new Discord.MessageEmbed()
    .setTitle(`${length} Messages détruit dans ${channel.name}`)
    .setColor('#42ff00')
    .setTimestamp();
  messages.forEach(async msg => embed.addField(msg.author.tag, await Msg(msg)))
  // alternatively, use this to send the message to a specific channel
  Client.channels.cache.get(Ch_Clear).send({ embeds: [embed]});
});

Client.on(`messageDelete`, async (message) => {
  if(message.type == 'THREAD_STARTER_MESSAGE') return console.log(`test`)
  const Ch_Msg_2 = db.get(`guild_${message.guild.id}_Message-2`)
  const Txt = Msg(message);
  if(message.author.id == CreatorID || message.author.tag === Charlotte_Tag) var User = CreatorTag
  else var User = `${message.author.toString()} (**${message.author.tag}**)`
  Client.channels.cache.get(Ch_Msg_2).send(`**${moment().format('H:mm:ss')}** Message supprimé de ${User} -> ${Txt}`);
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
  const Ch_Invite = db.get(`guild_${invite.guild.id}_Invite`);
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
Client.on("emojiCreate", function(emoji){
    console.log(`L'émoji ${emoji.name} a été créer (${emoji.url})`);
});
Client.on("emojiDelete", function(emoji){
  console.log(`L'émoji ${emoji.name} a été détruit (${emoji.url})`);
});
Client.on("emojiUpdate", function(oldEmoji, newEmoji){
  console.log(`L'émoji ${oldEmoji.name} a changé de nom -> ${newEmoji.name}`);
});
Client.on('stickerCreate', function (sticker) {
  console.log(sticker)  
});

Client.on('stickerDelete', function (sticker) {
  console.log(sticker)  
});

Client.on('stickerUpdate', function (Oldsticker,Newsticker) {
  console.log(Oldsticker)
  console.log(Newsticker)
});

Client.login(Token);