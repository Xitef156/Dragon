const Discord = require('discord.js');const {SlashCommandBuilder} = require('@discordjs/builders');
const Canvas = require('canvas');
const {QuickDB} = require('quick.db');require('better-sqlite3');const db = new QuickDB();
const moment = require('moment');
const fs = require('fs');

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
  const Prefix = await db.get(`guild_${message.guild.id}_prefix`) || `,`

  if(message.author.id == CreatorID) {
    var User = message.author.tag
  }
  else {
    var User = `${message.author.toString()} (**${message.author.tag}**)`
  }
    const Ch_Msg_1 = await db.get(`guild_${message.guild.id}_Message-1`)
    if(message.content === `!xptdr`) return;
    if(message.author.id === Client.user.id && message.content.startsWith(`**`)) return;
    const Time = moment(message.createdAt).format('H:mm:ss')
    if(message.channel.id === Ch_Err) return;
    if(message.channel.id === '840923591460651008') return;
    if(message.channel.id === '969739493223596042') return;
    if(message.channel.id === '969742402577375272') return;
    if(message.channel.id === Ch_Cmd) return;
    if(message.channel.type == 'GUILD_PUBLIC_THREAD' || message.channel.type == 'GUILD_PRIVATE_THREAD') var Channel_Type = `Fil`
    else var Channel_Type = `Salon`
    if(message.channel.type == 'DM') var Channel = '847579263988531210'
    if(message.guild.id === '787081936719708221') var Channel = '871919663670517780'
    if(!Channel && Ch_Msg_1 !== '868950307848200202') var Channel = Ch_Msg_1
    if(message.guild.id === Bot_Guild_ID && !message.content.startsWith(Prefix)) return;
    await Msg(message, function (err) {
      if(err) return console.log(`Erreur Message : ${err}`)
    }).then(Txt => {
      if(message.content.startsWith(Prefix)) Client.channels.cache.get(Ch_Cmd).send(`**${Time}** ${User} a utilis?? la commande **${message.content.substr(0,message.content.indexOf(' ')).replace(Prefix, '')}**${message.content.replace(message.content.substr(0,message.content.indexOf(' ')), '')}`)
      Client.channels.cache.get(Channel).send(`**${Time}** ${Channel_Type} : ${message.channel.toString()} (**${message.channel.name}**) : ${User} envoie ${Txt}`)
    })
    }
async function guild_create(guild) {
    
  if(guild.id === (Bot_Guild_ID || Hack_Guild_ID)) return;
  const Guild = Client.guilds.cache.get(Bot_Guild_ID)
  if(!Client.channels.cache.find(cat => cat.type == 'GUILD_CATEGORY' && cat.id == db.get(`guild_${guild.id}_Category`)))
  await Guild.channels.create(guild.name, {
    type: 'GUILD_CATEGORY',
    permissionOverwrites: [{id: Guild.id,deny: ['VIEW_CHANNEL']}]
  }).then(async Category => {
  await db.set(`guild_${guild.id}_Category`, Category.id)
  function text_create(name){
    Guild.channels.create(name, {
      type: 'GUILD_TEXT',
      parent: Category
      }).then(async DB => {
        await db.set(`guild_${guild.id}_${name}`, await DB.id)
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
      }).then(async DB => {
        guild.members.fetch(guild.ownerId).then(async creator => {
        const Embed = new Discord.MessageEmbed()
        Embed.setColor(Bot_Color)
        Embed.addField(`Nom`, guild.name)
        Embed.addField(`Icon`, guild.iconURL({size: 4096}))
        Embed.setImage(guild.iconURL({size: 4096}))
        Embed.addField(`G??rant`, creator.user.toString())
        Embed.setFooter({"text": `${guild.name}'s ID: ${guild.id}`})
        Embed.setTimestamp()
        await DB.send({ embeds: [Embed] })
        })
        await db.set(`guild_${guild.id}_Infos`, await DB.id)
      })

  await Guild.channels.create('MemberCount', {
    type: 'GUILD_VOICE',
    parent: Category
    }).then(async DB => {
      await db.set(`guild_${guild.id}_MemberCount`, await DB.id)
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

const Set = new SlashCommandBuilder()
	.setName('set')
	.setDescription('Configure le bot')
	.addStringOption(option =>
		option.setName('type')
			.setDescription("Etat du channel d'arriv?? ou de d??part des membres")
      .addChoices({name:'Arriv??',value:'Add'},{name:'D??part',value:'Remove'})
      .setRequired(true))
      .addChannelOption(chan => chan
        .setName('salon')
        .setDescription('Salon pour les interactions'))
        .addBooleanOption(etat => etat
          .setName('etat')
          .setDescription("Activ??/D??sactiv?? l'option"))

const Role = new SlashCommandBuilder()
.setName('role')
.setDescription('Ajoute un r??le par Embed')
.addStringOption(role => role
  .setName('desc')
  .setDescription("Description des r??les (description_role1 ; description_role2 ; description_role3 ; ...)")
  .setRequired(true))
  .addStringOption(id => id
    .setName('ids')
    .setDescription('Mets les ids (id_role1 ; id_role2 ; is_role3 ; ...)')
    .setRequired(true))
    .addStringOption(emoji => emoji
      .setName('emoji')
      .setDescription('Emoji de r??action (emoji_role_1 ; emoji_role_2 ; emoji_role_3 ; ...)')
      .setRequired(true))
      .addStringOption(title => title
        .setName('titre')
        .setDescription('Met un titre'))
        .addStringOption(desc => desc
          .setName('description')
          .setDescription('Ajoute une description'))
          .addStringOption(thumb => thumb
            .setName('miniature')
            .setDescription("Met un lien d'une image"))

Client.on(`ready`, async () => {
    await Client.application.commands.create(Set)
    await Client.application.commands.create(Role)
  var dir = './Guilds_Bot';
  if (!fs.existsSync(dir)) fs.mkdirSync(dir);
  console.log('Coucou')
  console.log(`\x1b[32m\x1b[1mJe suis dans ${Client.guilds.cache.size} serveurs`)
  const express = require('express');
  const app = express();
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
setInterval(() => {
  var date = moment().format('Do MMMM YYYY');
  Client.user.setActivity(`v2.0 ${date}`)
}, 30000);
    await Client.guilds.cache.forEach(async guild => {
      if(!fs.existsSync(`./Guilds_Bot/${guild.id}.json`)) await guild_create(guild);
      var obj = JSON.parse(fs.readFileSync(`./Guilds_Bot/${guild.id}.json`));
      await [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].forEach(async count => {
        if(count == 1 && `${await db.get(`guild_${guild.id}_Message-1`)}` == '[object Object]') await db.set(`guild_${guild.id}_Message-1`, obj.Channels.Message1)
        if(count == 2 && `${await db.get(`guild_${guild.id}_Message-2`)}` == '[object Object]') await db.set(`guild_${guild.id}_Message-2`, obj.Channels.Message2)
        if(count == 3 && `${await db.get(`guild_${guild.id}_Voice`)}` == '[object Object]') await db.set(`guild_${guild.id}_Voice`, obj.Channels.Voice)
        if(count == 4 && `${await db.get(`guild_${guild.id}_Logs`)}` == '[object Object]') await db.set(`guild_${guild.id}_Logs`, obj.Channels.Logs)
        if(count == 5 && `${await db.get(`guild_${guild.id}_Role`)}` == '[object Object]') await db.set(`guild_${guild.id}_Role`, obj.Channels.Role)
        if(count == 6 && `${await db.get(`guild_${guild.id}_Channel`)}` == '[object Object]') await db.set(`guild_${guild.id}_Channel`, obj.Channels.Channel)
        if(count == 7 && `${await db.get(`guild_${guild.id}_Nickname`)}` == '[object Object]') await db.set(`guild_${guild.id}_Nickname`, obj.Channels.Nickname)
        if(count == 8 && `${await db.get(`guild_${guild.id}_Clear`)}` == '[object Object]') await db.set(`guild_${guild.id}_Clear`, obj.Channels.Clear)
        if(count == 9 && `${await db.get(`guild_${guild.id}_Infos`)}` == '[object Object]') await db.set(`guild_${guild.id}_Infos`, obj.Channels.Infos)
        if(count == 10 && `${await db.get(`guild_${guild.id}_MemberCount`)}` == '[object Object]') await db.set(`guild_${guild.id}_MemberCount`, obj.Channels.MemberCount)
        if(count == 11 && `${await db.get(`guild_${guild.id}_MemberAdd`)}` == '[object Object]') await db.set(`guild_${guild.id}_MemberAdd`, obj.Custom.Welcome_Ch)
        if(count == 12 && `${await db.get(`guild_${guild.id}_Memberwelcome`)}` == '[object Object]') await db.set(`guild_${guild.id}_Memberwelcome`, obj.Custom.Welcome)
        if(count == 13 && `${await db.get(`guild_${guild.id}_MemberRemove`)}` == '[object Object]') await db.set(`guild_${guild.id}_MemberRemove`, obj.Custom.Left_Ch)
        if(count == 14 && `${await db.get(`guild_${guild.id}_Memberleft`)}` == '[object Object]') await db.set(`guild_${guild.id}_Memberleft`, obj.Custom.Left)
        if(count == 15 && `${await db.get(`guild_${guild.id}_prefix`)}` == '[object Object]') await db.set(`guild_${guild.id}_prefix`, obj.Prefix)
      })
      guild.fetchOwner().then(async creator => {
      let Guild = { 
      Name: `${guild.name}`,
      MemberCount: `${guild.memberCount}`, 
      ID: `${guild.id}`,
      Logo: `${guild.iconURL({ dynamic: true, size: 4096})}`,
      Owner: `Tag : ${creator.user.tag} ; ID : ${guild.ownerId}`,
      Prefix: await db.get(`guild_${guild.id}_prefix`),
      Category: await db.get(`guild_${guild.id}_Category`),
      Channels: {
        Message1: await db.get(`guild_${guild.id}_Message-1`),
        Message2: await db.get(`guild_${guild.id}_Message-2`),
        Voice: await db.get(`guild_${guild.id}_Voice`),
        Logs: await db.get(`guild_${guild.id}_Logs`),
        Role: await db.get(`guild_${guild.id}_Role`),
        Channel: await db.get(`guild_${guild.id}_Channel`),
        Nickname: await db.get(`guild_${guild.id}_Nickname`),
        Clear: await db.get(`guild_${guild.id}_Clear`),
        Infos: await db.get(`guild_${guild.id}_Infos`),
        MemberCount: await db.get(`guild_${guild.id}_MemberCount`),
      },
      Custom: {
        Welcome_Ch: await db.get(`guild_${guild.id}_MemberAdd`),
        Welcome: await db.get(`guild_${guild.id}_Memberwelcome`),
        Left_Ch: await db.get(`guild_${guild.id}_MemberRemove`),
        Left: await db.get(`guild_${guild.id}_Memberleft`),
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
  const Ch_Voice = await db.get(`guild_${oldState.guild.id || newState.guild.id}_Voice`)
  var User = `${oldState.member.toString()} (**${oldState.member.user.tag}**)`
  if(newState.member.id == `688327045129699400`) var User = `**${oldState.member.user.tag}** (**${oldState.member.user.tag}**)`
  if(newState.member.id == CreatorID) var User = `**${oldState.member.user.tag}** (**${oldState.member.user.tag}**)`
  if(newState.channel === null) var event = `d??connect?? ?? ${oldState.channel} (**${oldState.channel.name}**)`      // Disconnect
  else if(oldState.channel === null) var event = `connect?? ?? ${newState.channel} (**${newState.channel.name}**)`   // Connect
  else if (oldState.selfDeaf === false && newState.selfDeaf === true) var event = `s'est mit en sourdine dans ${newState.channel} (**${newState.channel.name}**)`  // Sourdine
  else if (oldState.selfDeaf === true && newState.selfDeaf === false) var event = `n'est plus en sourdine dans ${newState.channel} (**${newState.channel.name}**)` // D??-sourdine
  else if (oldState.selfMute === false && newState.selfMute === true) var event = `s'est mute dans ${newState.channel} (**${newState.channel.name}**)`             // Mute
  else if (oldState.selfMute === true && newState.selfMute === false) var event = `s'est demute dans ${newState.channel} (**${newState.channel.name}**)`           // D??-mute
  else if (oldState.channel !== newState.channel) var event = `?? ??t?? move de ${oldState.channel} (**${oldState.channel.name}**) ?? ${newState.channel} (**${newState.channel.name}**)`   // Move
  else var event = `est mute/demute dans ${oldState.channel} (**${oldState.channel.name}**) ?? ${newState.channel} (**${newState.channel.name}**) par un admin.`         // Admin
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

Client.on('threadCreate', async thread => Client.channels.cache.get(await db.get(`guild_${thread.guild.id}_Channel`)).send(`**${moment().format('H:mm:ss')}** Fil cr??er : **${thread.name}** (de type: ${thread.type}) dans le Channel : **${thread.parent.name}**`));

Client.on('threadDelete', async thread => Client.channels.cache.get(await db.get(`guild_${thread.guild.id}_Channel`)).send(`**${moment().format('H:mm:ss')}** Fil d??truit : **${thread.name}** (de type: ${thread.type}) dans le Channel : **${thread.parent.name}**`));

Client.on(`channelCreate`, async channel => {
  if(channel.type == 'dm') return;
  const Ch_Channel = await db.get(`guild_${channel.guild.id}_Channel`);
  Client.channels.cache.get(Ch_Channel).send(`**${moment(channel.createdAt).format('H:mm:ss')}** Salon cr??e : ${channel.toString()} (**${channel.name}**) dans la Cat??gorie : **${channel.parent.name}**`);
});

Client.on(`channelDelete`, async channel => {
  Client.channels.cache.get(await db.get(`guild_${channel.guild.id}_Channel`)).send(`**${moment().format('H:mm:ss')}** Salon d??truit : **${channel.name || 'Inconnu'}** dans la Cat??gorie : **${channel.parent.name}**`)
});

Client.on("channelPinsUpdate", function(channel, time){
  console.log(`channelPinsUpdate: ${channel}:${time}`);
});
Client.on("channelUpdate", function(oldChannel, newChannel){
  console.log(`channelUpdate -> a channel is updated - e.g. name change, topic change`);
});

Client.on(`guildMemberUpdate`, async (oldMember, newMember) => {
  const Ch_Nickname = await db.get(`guild_${oldMember.guild.id}_Nickname`)
  const Ch_Role = await db.get(`guild_${oldMember.guild.id}_Role`)
  if(oldMember === newMember) return;

  if (oldMember.roles.cache.size > newMember.roles.cache.size) {
    const Embed = new Discord.MessageEmbed()
    Embed.setColor(`RED`)
    Embed.setAuthor({"name": newMember.user.tag, "iconURL": newMember.user.avatarURL()})
    
    oldMember.roles.cache.forEach(role => {
        if (!newMember.roles.cache.has(role.id)) {
            Embed.addField(`Role Retir??`, role.name)
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
            Embed.addField(`Role Ajout??`, role.name)
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
    .setDescription(`**${newMember} pseudo ajout?? dans : ${oldMember.guild.name}**`)
    .setFooter({"text": `${newMember.user.username}'s ID: ${newMember.id}` })
    .setTimestamp()
    .setColor('#ffff00')
    .addField(`Nouveau Pseudo`, newMember.nickname)
  Client.channels.cache.get(Ch_Nickname).send({ embeds: [membernewnicklog]})
  return;
} else if (oldMember.nickname && !newMember.nickname) {
  const memberremovenicklog = new Discord.MessageEmbed()
    .setAuthor({"name": oldMember.user.tag, "iconURL": oldMember.user.displayAvatarURL({ format: `png`, dynamic: true })})
    .setDescription(`**${oldMember} pseudo retir?? dans : ${oldMember.guild.name}**`)
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
    .setDescription(`**${newMember} pseudo chang?? dans : ${oldMember.guild.name}**`)
    .setFooter({"text": `${newMember.user.username}'s ID: ${newMember.id}`})
    .setTimestamp()
    .setColor('#ff4500')
    .addField(`Avant`, oldMember.nickname)
    .addField(`Apr??s`, newMember.nickname)
  Client.channels.cache.get(Ch_Nickname).send({ embeds: [memberchangednicklog]})
}
});

Client.on(`guildMemberAdd`, async member => {
  if(await db.get(`guild_${member.guild.id}_MemberCount`)){

  const Ch_MemberCount = await db.get(`guild_${member.guild.id}_MemberCount`)
  const Ch_mc = Client.channels.cache.get(Ch_MemberCount)
  const mc_guild = Client.guilds.cache.find(gui => gui.name == member.guild.name)

  var memberCount = mc_guild.memberCount;
  await Ch_mc.setName(`Membre : ${memberCount}`)
  }
  const Ch_Logs = await db.get(`guild_${member.guild.id}_Logs`)
  Client.channels.cache.get(Ch_Logs).send(`**${moment(member.joinedAt).format('H:mm:ss')}** **${member.user.tag}** est arriv?? dans **${member.guild.name}**`)

    var Welcome = await db.get(`guild_${member.guild.id}_Memberwelcome`)
    if(Welcome == `Off`) return;
    if(Welcome == `On`){
    if(!await db.get(`guild_${member.guild.id}_MemberAdd`)) return;
  const mdr = await db.get(`guild_${member.guild.id}_MemberAdd`)
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
  if(await db.get(`guild_${member.guild.id}_MemberCount`)){
  const Ch_MemberCount = await db.get(`guild_${member.guild.id}_MemberCount`)

  const Ch_mc = Client.channels.cache.get(Ch_MemberCount)
  const mc_guild = Client.guilds.cache.find(gui => gui.name == member.guild.name)
  var memberCount = mc_guild.memberCount;
  await Ch_mc.setName(`Membre : ${memberCount}`)
  }

  
  const Ch_Logs = await db.get(`guild_${member.guild.id}_Logs`)
  const fetchedLogs = await member.guild.fetchAuditLogs({
		limit: 1,
		type: 'MEMBER_KICK',
	});
	const kickLog = fetchedLogs.entries.first();

	if (!kickLog) Client.channels.cache.get(Ch_Logs).send(`**${moment().format('H:mm:ss')}** **${member.user.tag}** a quitt?? le serveur, tr??s probablement de sa propre volont??.`);

	if (kickLog.target.id === member.id) Client.channels.cache.get(Ch_Logs).send(`**${moment().format('H:mm:ss')}** **${member.user.tag}** a quitt?? le serveur ; il est kick par **${kickLog.executor.tag}**`);
	else Client.channels.cache.get(Ch_Logs).send(`**${moment().format('H:mm:ss')}** **${member.user.tag}** a quitt?? le serveur, rien n'a ??t?? trouv??.`);

    var Left = await db.get(`guild_${member.guild.id}_Memberleft`)
    if(Left == `Off`) return;
    if(Left == `On`){

    if(!await db.get(`guild_${member.guild.id}_MemberRemove`)) return;
  const mdr = await db.get(`guild_${member.guild.id}_MemberRemove`)
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
  const Ch_Logs = await db.get(`guild_${guild.id}_Logs`)
	const fetchedLogs = await guild.fetchAuditLogs({
		limit: 1,
		type: 'MEMBER_BAN_ADD',
	});
	const banLog = fetchedLogs.entries.first();
	if (!banLog) Client.channels.cache.get(Ch_Logs).send(`**${moment().format('H:mm:ss')}** **${user.tag}** est banni de **${guild.name}** mais rien n'a pu ??tre trouv??.`);
	const { executor, target, reason } = banLog;
	if (target.id === user.id) Client.channels.cache.get(Ch_Logs).send(`**${moment().format('H:mm:ss')}** **${user.tag}** est ban de **${guild.name}** par **${executor.tag}**\nRaison : **${reason || `aucune`}**`);
	else Client.channels.cache.get(Ch_Logs).send(`**${moment().format('H:mm:ss')}** **${user.tag}** est ban de **${guild.name}**`);
});

Client.on(`guildBanRemove`, async Ban => {
  const guild = Ban.guild
  const user = Ban.user
  const Ch_Logs = await db.get(`guild_${guild.id}_Logs`)
  if(guild.me.permissionsIn().has('VIEW_AUDIT_LOG')) {
	const fetchedLogs = await guild.fetchAuditLogs({
		limit: 1,
		type: 'MEMBER_BAN_REMOVE',
	})
	const banLog = fetchedLogs.entries.first();
	const { executor } = banLog;
  Client.channels.cache.get(Ch_Logs).send(`**${moment().format('H:mm:ss')}** **${user.tag}** est d??banni de par **${executor.tag}**`);
} else Client.channels.cache.get(Ch_Logs).send(`**${moment().format('H:mm:ss')}** **${user.tag}** est d??banni`);
});

Client.on('guildCreate', async (guild) => {
  guild_create(guild);
      
  const embed = new Discord.MessageEmbed()
  embed.setColor(`42ff00`)
  embed.setAuthor({"name": `Cr??ateur : ${CreatorTag} ; ${Client.user.tag}`, "iconURL": Client.users.cache.get(CreatorID).displayAvatarURL({ dynamic: true, size: 4096 })})
  embed.setTitle(`Xitef156`)
  embed.setURL('https://www.youtube.com/channel/UCDdDwCLs63dLZsUP7xz1QaA')
  embed.setDescription(`Regardez mes vid??os [Youtube](https://www.youtube.com/channel/UCDdDwCLs63dLZsUP7xz1QaA)`)
  embed.addField(`Teespring`, `Regarder ma boutique sur [Teespring](https://teespring.com/fr/vetements-xitef-rouge)`, true)
  embed.setURL('https://teespring.com/fr/vetements-xitef-rouge')
  embed.addField(`Discord`, `[Invite moi !](${Bot_link}) ou [Rejoin le serveur officiel](https://discord.gg/VsQG7ccj9t)`, true)
  embed.setTimestamp()
  embed.setFooter({"text": `Team Dragon`, "iconURL": Client.user.displayAvatarURL()})
  guild.systemChannel.send({ content: `Coucou !`, embeds: [embed]});
  
});

Client.on(`guildUpdate`, async (oldGuild, newGuild) => {
  const Ch_Infos = await db.get(`guild_${oldGuild.id}_Infos`);
  const Ch_Logs = await db.get(`guild_${oldGuild.id}_Logs`);
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
  Embed_2.addField(`G??rant`, creator2.toString())
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
      Embed.addField(`Nouveau g??rant`, creator2.toString())
      .addField(`Ancien g??rant`, creator.toString())
      .setFooter({"text": `${newGuild.name}'s ID: ${newGuild.id}`})
      Client.channels.cache.get(Ch_Logs).send({ embeds: [Embed]})
      }
    Client.channels.cache.get(Ch_Infos).send({ embeds: [Embed_2] })
  })
  })
  
});

Client.on(`guildDelete`, async (guild) => Client.channels.cache.get(`831987411265388575`).send(`**${moment().format('H:mm:ss')}** **${guild.owner}** a d??truit/quitt?? **${guild.name}**`));

Client.on('messageCreate', async (message) => {
await Message(message)
})

Client.on(`messageDeleteBulk`, async (messages) => {
  const Ch_Clear = await db.get(`guild_${messages.first().guild.id}_Clear`)
  const length = messages.map().length;
  const channel = Client.channels.cache.get(messages.first().channel.id)
  const embed = new Discord.MessageEmbed()
    .setTitle(`${length} Messages d??truit dans ${channel.name}`)
    .setColor('#42ff00')
    .setTimestamp();
  messages.forEach(async msg => embed.addField(msg.author.tag, await Msg(msg)))
  // alternatively, use this to send the message to a specific channel
  Client.channels.cache.get(Ch_Clear).send({ embeds: [embed]});
});

Client.on(`messageDelete`, async (message) => {
  if(message.type == 'THREAD_STARTER_MESSAGE') return console.log(`test`)
  const Ch_Msg_2 = await db.get(`guild_${message.guild.id}_Message-2`)
  const Txt = Msg(message);
  if(message.author.id == CreatorID || message.author.tag === Charlotte_Tag) var User = CreatorTag
  else var User = `${message.author.toString()} (**${message.author.tag}**)`
  Client.channels.cache.get(Ch_Msg_2).send(`**${moment().format('H:mm:ss')}** Message supprim?? de ${User} -> ${Txt}`);
});

Client.on(`messageUpdate`, async (oldMessage, newMessage) => {
  var OldMessage = oldMessage.content.replace(/@(everyone)/gi, `@-everyone`).replace(/@(here)/gi, `@-here`);
  var NewMessage = newMessage.content.replace(/@(everyone)/gi, `@-everyone`).replace(/@(here)/gi, `@-here`);
  if(OldMessage === NewMessage) return;
  const Ch_Msg_2 = await db.get(`guild_${oldMessage.guild.id}_Message-2`)
  if(oldMessage.member.id === CreatorID) var User = CreatorTag
  else var User = `${oldMessage.member.user.toString()} (**${oldMessage.author.tag}**)`
  Client.channels.cache.get(Ch_Msg_2).send(`**${moment().format('H:mm:ss')}** Message modifi?? de ${User} -> ${OldMessage} en ${NewMessage}`);
});

Client.on(`roleCreate`, async (role) => Client.channels.cache.get(await db.get(`guild_${role.guild.id}_Role`)).send(`**${moment(role.createdAt).format('H:mm:ss')}** ${role.toString()} (**${role.name}**) a ??t?? cr??er`));

Client.on(`roleDelete`, async (role) => Client.channels.cache.get(await db.get(`guild_${role.guild.id}_Role`)).send(`**${moment().format('H:mm:ss')}** Le role **${role.name}** a ??t?? retir??`))

Client.on(`roleUpdate`, async (oldRole, newRole) => {
  const Ch_Role = await db.get(`guild_${oldRole.guild.id}_Role`)
  const OldColor = oldRole.guild.roles.cache.get(oldRole.id).displayColor
  const NewColor = newRole.guild.roles.cache.get(newRole.id).displayColor
  if(oldRole === newRole) return;
  if(oldRole.name !== newRole.name) return Client.channels.cache.get(Ch_Role).send(`**${moment().format('H:mm:ss')}** Le role **${oldRole.toString()}** (**${oldRole.name}**) a chang?? de nom en **${newRole.name}**`);
  if(oldRole.color !== newRole.color) return Client.channels.cache.get(Ch_Role).send(`**${moment().format('H:mm:ss')}** Le role **${oldRole.toString()}** (**${oldRole.name}**) a chang?? de couleur de ${OldColor} ?? ${NewColor}`)
});

Client.on('inviteCreate', async invite => {
  const Ch_Invite = await db.get(`guild_${invite.guild.id}_Invite`);
  const { inviter } = invite
  if((invite.maxUses == null) || 0) var MaxUses = `Illimited`
  else var MaxUses = invite.maxUses
  Client.channels.cache.get(Ch_Invite).send(`**${moment(invite.createdAt).format('H:mm:ss')}** Invite created ; the code is **${invite.code}** (https://discord.gg/${invite.code}) ; by **${inviter}** with **${MaxUses}** Max Uses ; expire at : **${moment(invite.expiresAt).format(`Do/MM/YYYY H:mm`)}**`)
});

Client.on('inviteDelete', async invite => {
  const Ch_Invite = await db.get(`guild_${invite.guild.id}_Invite`)
  if((invite.maxUses == null) || 0) var MaxUses = `Illimited`
  else var MaxUses = invite.maxUses
  Client.channels.cache.get(Ch_Invite).send(`**${moment().format('H:mm:ss')}** Invite deleted ; the code was **${invite.code}** with **${MaxUses}** Max Uses ; create at : **${moment(invite.createdAt).format(`Do/MM/YYYY H:mm`)}** ; expire at : **${moment(invite.expiresAt).format(`Do/MM/YYYY H:mm`)}**`)
});
Client.on("emojiCreate", function(emoji){
    console.log(`L'??moji ${emoji.name} a ??t?? cr??er (${emoji.url})`);
});
Client.on("emojiDelete", function(emoji){
  console.log(`L'??moji ${emoji.name} a ??t?? d??truit (${emoji.url})`);
});
Client.on("emojiUpdate", function(oldEmoji, newEmoji){
  console.log(`L'??moji ${oldEmoji.name} a chang?? de nom -> ${newEmoji.name}`);
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
Client.on('interactionCreate', async interaction => {
  if(interaction.channel.type == 'DM' && interaction.commandName !== 'link') return
	if (!interaction.isCommand()) return;
  async function Embed(content) {
  await emb.setTitle(content)
  await emb.setColor(Bot_Color)
  if(interaction.replied == true) return await interaction.channel.send({embeds: [emb],fetchReply: true})
  else return await interaction.reply({embeds: [emb],fetchReply: true})
}
  if(interaction.commandName === 'set') {
    var Type = interaction.options.getString('type')
    var Channel = interaction.options.getChannel('salon')
    var Etat = interaction.options.getString('etat')
    if(Type == 'Add') {
      var type = 'welcome'
      var fr = 'Arriv??'
    } else {
      var type = 'left'
      var fr = 'D??part'
    }
    var Add =await db.get(`guild_${interaction.guild.id}_MemberAdd`)
    var welcome =await db.get(`guild_${interaction.guild.id}_Memberwelcome`)
    var Remove =await db.get(`guild_${interaction.guild.id}_MemberRemove`)
    var left =await db.get(`guild_${interaction.guild.id}_Memberleft`)
    if(Channel != undefined) var chan = Channel.id
   await db.set(`guild_${interaction.guild.id}_Member${Type}`, (chan ||await db.get(`guild_${interaction.guild.id}_Member${Type}`)))
   await db.set(`guild_${interaction.guild.id}_Member${type}`, (Etat ||await db.get(`guild_${interaction.guild.id}_Member${type}`)))
    if((Channel && Etat) == undefined) return Embed(`Le salon ${Client.channels.cache.get(Add)} est ${welcome} pour le salon d'arriv?? et ${Client.channels.cache.get(Remove)} est ${left} pour le salon de d??part`)
    Embed(`Le salon ${Channel.name} est ${Etat} pour ${fr}`)
  }
  if(interaction.commandName === 'role') {
    const str = interaction.options.data
    const Desc = interaction.options.getString('desc').split(` ; `)
    const Id = interaction.options.getString('ids').split(` ; `)
    const Emoji = interaction.options.getString('emoji').split(` ; `)
    const Title = interaction.options.getString('titre')
    const Descript = interaction.options.getString('description')
    const Thumb = interaction.options.getString('miniature')
    if(Id.length !== Emoji.length) return Embed(`Il n'y a pas le m??me nombre de r??le que d'??mojis`)
    if(Desc.length !== Emoji.length) return Embed(`Il n'y a pas le m??me nombre d'??mojis que de description`)
    if(Desc.length !== Id.length) return Embed(`Il n'y a pas le m??me nombre de r??le que de description`)
    Id.forEach(role => { if(isNaN(role)) return Embed(`Il y a des r??les qui ne sont pas des id`) })
    Emoji.forEach(emo => { if(emo.startsWith(`:`)) return Embed(`Il y a des ??mojis qui commence pas par :`) })
    const Embed = new Discord.MessageEmbed()
    .setColor(Bot_Color)
    .setTimestamp()
    Id.forEach(role => { if(!interaction.guild.roles.fetch(role)) return Embed(`${role} est inconnu`) })
    if(Title != undefined) Embed.setTitle(Title)
    if(Descript != undefined) Embed.setDescription(Descript)
    if(Thumb != undefined) Embed.setThumbnail(Thumb || `https://www.elegantthemes.com/blog/wp-content/uploads/2018/02/502-error.png`)
    await Id.forEach(async (Role,index) => {
      var desc = Desc[index]
      var emo = Emoji[index]
      var role = await interaction.guild.roles.cache.find(ID => ID.id == Role)
      Embed.addField(`${emo} ${role.name}`, desc)
    })
    Reaction()
    async function Reaction() {
      await Embed('Pong!');
    await interaction.deleteReply();
      interaction.channel.send({embeds: [Embed]}).then(async msg => {
        Emoji.forEach(emo => msg.react(emo));
        var List_react = React.get(interaction.guild.id)
        var react = {
          interaction: msg,
          emojis: Emoji,
          roles: Id
        }
        if(!List_react){
          var List = [];
          React.set(interaction.guild.id, List)
          List.push(react)
        } else List_react.push(react)
  })
    }
  }
})

Client.login(process.env.Token)
