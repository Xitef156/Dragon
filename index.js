const Discord = require(`discord.js`);
require(`@discordjs/opus`)
const ytdl = require(`ytdl-core`);
const ytSearch = require(`yt-search`);
const Canvas = require(`canvas`);
const weather = require('weather-js');
const db = require('quick.db');
const moment = require('moment')
const fs = require(`fs`)
const path = require('path');
const SoundCloud = require("soundcloud-scraper");
const ffmpeg = require('fluent-ffmpeg');
const NodeID3 = require('node-id3');
const download = require('image-downloader');

const SC = new SoundCloud.Client();
const Client = new Discord.Client();
const queue = new Map();
const Token = `Nzg4MDc2NDIyNzc4MDYwOTIw.X9ePXA.1OTjcbzMD9GnBTlglesMAIecReo`

const Bot_Color = `#42ff00`
const CreatorTag = `Xitef156#1822`
const CreatorID = `776140752752869398`
const Charlotte_Tag = `charlotte_lbc#8842`
const AuthifCreator = `message.author.id === ${CreatorID}`
const AuthifNotCreator = `message.author.id !== ${CreatorID}`
const Youtube_Guild_ID = `776473077780840509`
const Bot_Guild_ID = `850033010350096414`
const Ch_Err = `834751451090911292`
const Bot_link = `https://discord.com/api/oauth2/authorize?client_id=788076422778060920&permissions=402794686&scope=bot`
const Font = `Vermin Verile`
moment.locale('fr');
var Font_Size = 50
var Font_Size_2 = 20

function makeid(length) {
  var result           = '';
  var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for ( var i = 0; i < length; i++ ) result += characters.charAt(Math.floor(Math.random() * charactersLength));
 return result;
}
function getFilesizeInBytes(filename) { return fs.statSync(filename).size }

function remSpCh(sentence) { return sentence.replace(/[&\/\\#,+()$~%.'":*?<>{}|]/gi, '') }

const videoFinder = async (query) => {
  const videoResult = await ytSearch(query)
  return (videoResult.videos.length > 1) ? videoResult.videos[0] : null
}

Client.on(`ready`, async () => {
  console.log('Coucou')
  console.log(`\x1b[32m\x1b[1mJe suis dans ${Client.guilds.cache.size} serveurs`)
  var dir = './Guilds_Bot';
  if (!fs.existsSync(dir)) fs.mkdirSync(dir);
  var date = moment().locale('fr').format('Do MMMM YYYY');
  Client.user.setStatus('invisible')
  Client.user.setActivity(`Prefix help ${date}`)
    Client.guilds.cache.forEach(guild => {
      db.set(`guild_${guild.id}_Music_Looping_Message`, 0)
      if(!fs.existsSync(`Guilds_Bot/${guild.id}.json`)){
          setTimeout(function (){
          
            const Guild = Client.guilds.cache.get(Bot_Guild_ID)
            Guild.channels.create(guild.name, {
              type: 'category',
              permissionOverwrites: [
                {id: Guild.id,deny: ['VIEW_CHANNEL']
                },
                {id: CreatorID,allow: ['VIEW_CHANNEL']
              }]
            })
            setTimeout(function(){
              if(!Guild.channels.cache.find(ch => ch.name === `${guild.name}`)) return;
            const Category = Guild.channels.cache.find(ch => ch.name === `${guild.name}`)
            db.set(`guild_${guild.name}`, Category.id)
            
            Guild.channels.create('Message-1', {
              type: 'text',
              parent: Category
              }).then(DB => {
                db.set(`guild_${guild.id}_Message-1_${Client.user.id}`, DB.id)
              })
          
            Guild.channels.create('Message-2', {
              type: 'text',
              parent: Category
              }).then(DB => {
                db.set(`guild_${guild.id}_Message-2_${Client.user.id}`, DB.id)
              })
          
            Guild.channels.create('Voice', {
              type: 'text',
              parent: Category
              }).then(DB => {
                db.set(`guild_${guild.id}_Voice_${Client.user.id}`, DB.id)
              })
          
            Guild.channels.create('Logs', {
              type: 'text',
              parent: Category
              }).then(DB => {
                db.set(`guild_${guild.id}_Logs_${Client.user.id}`, DB.id)
              })
            
            Guild.channels.create('Role', {
              type: 'text',
              parent: Category
              }).then(DB => {
                db.set(`guild_${guild.id}_Role_${Client.user.id}`, DB.id)
              })
          
            Guild.channels.create('Channel', {
              type: 'text',
              parent: Category
              }).then(DB => {
                db.set(`guild_${guild.id}_Channel_${Client.user.id}`, DB.id)
              })
          
            Guild.channels.create('Nickname', {
              type: 'text',
              parent: Category
              }).then(DB => {
                db.set(`guild_${guild.id}_Nickname_${Client.user.id}`, DB.id)
              })
          
            Guild.channels.create('Clear', {
              type: 'text',
              parent: Category
              }).then(DB => {
                db.set(`guild_${guild.id}_Clear_${Client.user.id}`, DB.id)
              })
          
            Guild.channels.create('Infos', {
              type: 'text',
              parent: Category
              }).then(DB => {
                db.set(`guild_${guild.id}_Infos_${Client.user.id}`, DB.id)
              })
          
            Guild.channels.create('MemberCount', {
              type: 'voice',
              parent: Category
              }).then(DB => {
                db.set(`guild_${guild.id}_MemberCount_${Client.user.id}`, DB.id)
              })
            }, 4000);
            }, 2000);
          }
      guild.members.fetch(guild.ownerID).then(creator => {
      let Guild = { 
      Name: `${guild.name}`,
      MemberCount: `${guild.memberCount}`, 
      ID: `${guild.id}`,
      Logo: `${guild.iconURL({ dynamic: true, size: 4096})}`,
      Owner: `Tag : ${creator.user.tag} ; ID : ${guild.ownerID}`
      }
      fs.writeFileSync(path.resolve(__dirname, `Guilds_Bot/${guild.id}.json`), JSON.stringify(Guild));
  })
            });
});

process.on('unhandledRejection', error => {
  Client.channels.cache.get(Ch_Err).send(`**${moment().locale('fr').format('H:mm:ss')}** Erreur : ${error}`);
  console.log(`\x1b[31m\x1b[1m${error}`);
  console.log(error)
});

Client.on(`voiceStateUpdate`, async (oldState, newState) => { // Listeing to the voiceStateUpdate event
  const Ch_Voice = db.get(`guild_${oldState.guild.id}_Voice_${Client.user.id}`)
  var User = `${oldState.member.toString()} (**${oldState.member.user.tag}**)`
  if(newState.member.id == `688327045129699400`) var User = `**${oldState.member.user.tag}** (**${oldState.member.user.tag}**)`
  if(newState.member.id == CreatorID) var User = `**${oldState.member.user.tag}** (**${oldState.member.user.tag}**)`
  if(newState.channel === null) {                                         // Disconnect
    var oldChannel = `${oldState.channel} (**${oldState.channel.name}**)`
  Client.channels.cache.get(Ch_Voice).send(`**${moment().locale('fr').format('H:mm:ss')}** ${User} déconnecté à ${oldChannel}.`);
  } else if(oldState.channel === null){                                   // Connect
    var newChannel = `${newState.channel} (**${newState.channel.name}**)`
    Client.channels.cache.get(Ch_Voice).send(`**${moment().locale('fr').format('H:mm:ss')}** ${User} connecté à ${newChannel}.`);
  } else if (oldState.selfDeaf === false && newState.selfDeaf === true) { // Sourdine
    var newChannel = `${newState.channel} (**${newState.channel.name}**)`
    Client.channels.cache.get(Ch_Voice).send(`**${moment().locale('fr').format('H:mm:ss')}** ${User} s'est mit en sourdine dans ${newChannel}.`);
  } else if (oldState.selfDeaf === true && newState.selfDeaf === false) { // Dé-sourdine
    var newChannel = `${newState.channel} (**${newState.channel.name}**)`
    Client.channels.cache.get(Ch_Voice).send(`**${moment().locale('fr').format('H:mm:ss')}** ${User} n'est plus en sourdine dans ${newChannel}.`);
  } else if (oldState.selfMute === false && newState.selfMute === true) { // Mute
    var newChannel = `${newState.channel} (**${newState.channel.name}**)`
    Client.channels.cache.get(Ch_Voice).send(`**${moment().locale('fr').format('H:mm:ss')}** ${User} s'est mute dans ${newChannel}.`);
  } else if (oldState.selfMute === true && newState.selfMute === false) { // Dé-mute
    var newChannel = `${newState.channel} (**${newState.channel.name}**)`
    Client.channels.cache.get(Ch_Voice).send(`**${moment().locale('fr').format('H:mm:ss')}** ${User} s'est demute dans ${newChannel}.`);
  } else if (oldState.channel !== newState.channel){                      // Move
    var oldChannel = `${oldState.channel} (**${oldState.channel.name}**)`
    var newChannel = `${newState.channel} (**${newState.channel.name}**)`
  Client.channels.cache.get(Ch_Voice).send(`**${moment().locale('fr').format('H:mm:ss')}** ${User} à été move de ${oldChannel} à ${newChannel}.`);
} else {
  var oldChannel = `${oldState.channel} (**${oldState.channel.name}**)`
  var newChannel = `${newState.channel} (**${newState.channel.name}**)`
      Client.channels.cache.get(Ch_Voice).send(`**${moment().locale('fr').format('H:mm:ss')}** ${User} est mute/demute dans ${oldChannel} à ${newChannel} par un admin.`);
    }
});

Client.on(`channelCreate`, async (channel) => {
  if(channel.type == 'dm') return;
  const Ch_Channel = db.get(`guild_${channel.guild.id}_Channel_${Client.user.id}`)
  Client.channels.cache.get(Ch_Channel).send(`**${moment(channel.createdAt).format('H:mm:ss')}** Salon crée : ${channel.toString()} (**${channel.name}**) dans la Catégorie : **${channel.parent.name}**`);
});

Client.on(`channelDelete`, async (channel) => Client.channels.cache.get(db.get(`guild_${channel.guild.id}_Channel_${Client.user.id}`)).send(`**${moment().locale('fr').format('H:mm:ss')}** Salon détruit : **${channel.name}** dans la Catégorie : **${channel.parent.name}**`));

Client.on(`guildMemberUpdate`, async (oldMember, newMember) => {
  const Ch_Nickname = db.get(`guild_${oldMember.guild.id}_Nickname_${Client.user.id}`)
  const Ch_Role = db.get(`guild_${oldMember.guild.id}_Role_${Client.user.id}`)
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
            Client.channels.cache.get(Ch_Role).send(Embed)
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
            Client.channels.cache.get(Ch_Role).send(Embed)
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
  Client.channels.cache.get(Ch_Nickname).send(membernewnicklog)
  return;
} else if (oldMember.nickname && !newMember.nickname) {
  const memberremovenicklog = new Discord.MessageEmbed()
    .setAuthor(`${oldMember.user.tag}`, `${oldMember.user.displayAvatarURL({ format: `png`, dynamic: true })}`)
    .setDescription(`**${oldMember} pseudo retiré dans : ${oldMember.guild.name}**`)
    .setFooter(`${oldMember.user.username}'s ID: ${oldMember.id}`)
    .setTimestamp()
    .setColor('#f04747')
    .addField(`Ancien Pseudo`, oldMember.nickname)
  Client.channels.cache.get(Ch_Nickname).send(memberremovenicklog)
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
  Client.channels.cache.get(Ch_Nickname).send(memberchangednicklog)
}
});

Client.on(`guildMemberAdd`, async member => {

  if(db.get(`guild_${member.guild.id}_MemberCount_${Client.user.id}`)){
  const Ch_MemberCount = db.get(`guild_${member.guild.id}_MemberCount_${Client.user.id}`)
  const Ch_mc = Client.channels.cache.get(Ch_MemberCount)
  const mc_guild = Client.guilds.cache.find(gui => gui.name == member.guild.name)
  var memberCount = mc_guild.memberCount;
  await Ch_mc.setName(`Membre : ${memberCount}`)
  }
  const Ch_Logs = db.get(`guild_${member.guild.id}_Logs_${Client.user.id}`)
  Client.channels.cache.get(Ch_Logs).send(`**${moment(member.joinedAt).format('H:mm:ss')}** **${member.user.tag}** est arrivé dans **${member.guild.name}**`)

    const applyText = (canvas, text) => {
        const ctx = canvas.getContext('2d');
        do ctx.font = `${Font_Size -= 10}px ${Font}`;
        while (ctx.measureText(text).width > canvas.width - 300);
        return ctx.font;
    };
    var Welcome = db.get(`guild_${member.guild.id}_Memberwelcome_${Client.user.id}`)
    if(Welcome == `Off`) return;
    if(Welcome == `On`){

    if(!db.get(`guild_${member.guild.id}_MemberAdd_${Client.user.id}`)) return;
  const mdr = db.get(`guild_${member.guild.id}_MemberAdd_${Client.user.id}`)
  const channel = await Client.channels.cache.find(ch => ch.id == mdr);
	if (!channel) return;
	const canvas = Canvas.createCanvas(700, 250);
	const ctx = canvas.getContext('2d');
	const background = await Canvas.loadImage('./wallpaper.png');
	ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
  var grd = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
  grd.addColorStop(0, `#00fbff`);
  grd.addColorStop(1, `#ffffff`);
	ctx.strokeStyle = grd;
  ctx.lineWidth = 5;
	ctx.strokeRect(0, 0, canvas.width, canvas.height);

	ctx.font = `${Font_Size_2}px ${Font}`;
  ctx.shadowOffsetX = 2;
  ctx.shadowOffsetY = 2;
  ctx.shadowBlur = 5;
  ctx.shadowColor = '#53dad8';
	ctx.fillStyle = `#0c00ff`;
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

	const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'welcome-image.png');

	channel.send(`Bienvenue dans le serveur, ${member}!`, attachment);
}
});

Client.on(`guildMemberRemove`, async member => {
  if(db.get(`guild_${member.guild.id}_MemberCount_${Client.user.id}`)){
  const Ch_MemberCount = db.get(`guild_${member.guild.id}_MemberCount_${Client.user.id}`)

  const Ch_mc = Client.channels.cache.get(Ch_MemberCount)
  const mc_guild = Client.guilds.cache.find(gui => gui.name == member.guild.name)
  var memberCount = mc_guild.memberCount;
  await Ch_mc.setName(`Membre : ${memberCount}`)
  }

  
  const Ch_Logs = db.get(`guild_${member.guild.id}_Logs_${Client.user.id}`)
  const fetchedLogs = await member.guild.fetchAuditLogs({
		limit: 1,
		type: 'MEMBER_KICK',
	});
	const kickLog = fetchedLogs.entries.first();

	if (!kickLog) Client.channels.cache.get(Ch_Logs).send(`**${moment().locale('fr').format('H:mm:ss')}** **${member.user.tag}** a quitté le serveur, très probablement de sa propre volonté.`);

	const { executor, target } = kickLog;

	if (target.id === member.id) Client.channels.cache.get(Ch_Logs).send(`**${moment().locale('fr').format('H:mm:ss')}** **${member.user.tag}** a quitté le serveur ; il est kick par **${executor.tag}**`);
	else Client.channels.cache.get(Ch_Logs).send(`**${moment().locale('fr').format('H:mm:ss')}** **${member.user.tag}** a quitté le serveur, rien n'a été trouvé.`);

    const applyText = (canvas, text) => {
        const ctx = canvas.getContext('2d');
    
        do ctx.font = `${Font_Size -= 10}px ${Font}`;
        while (ctx.measureText(text).width > canvas.width - 300);
    
        return ctx.font;
    };
    var Left = db.get(`guild_${member.guild.id}_Memberleft_${Client.user.id}`)
    if(Left == `Off`) return;
    if(Left == `On`){

    if(!db.get(`guild_${member.guild.id}_MemberRemove_${Client.user.id}`)) return;
  const mdr = db.get(`guild_${member.guild.id}_MemberRemove_${Client.user.id}`)
  const channel = await Client.channels.cache.find(ch => ch.id == mdr);

	if (!channel) return;

	const canvas = Canvas.createCanvas(700, 250);
	const ctx = canvas.getContext('2d');

	const background = await Canvas.loadImage('./wallpaper 2.png');
	ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

	var grd1 = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
  grd1.addColorStop(0, `#ff0f00`);
  grd1.addColorStop(1, `#ffffff`);
	ctx.strokeStyle = grd1;
  ctx.lineWidth = 5;
	ctx.strokeRect(0, 0, canvas.width, canvas.height);

	ctx.font = `${Font_Size_2}px ${Font}`;
  ctx.shadowOffsetX = 2;
  ctx.shadowOffsetY = 2;
  ctx.shadowBlur = 5;
  ctx.shadowColor = '#bb0000';
	ctx.fillStyle = `#ff2e00`;
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

	const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'welcome-image.png');

	channel.send(`Au revoir, ${member}!`, attachment);
}
});

Client.on('guildBanAdd', async (guild, user) => {
  const Ch_Logs = db.get(`guild_${guild.id}_Logs_${Client.user.id}`)
	const fetchedLogs = await guild.fetchAuditLogs({
		limit: 1,
		type: 'MEMBER_BAN_ADD',
	});
	const banLog = fetchedLogs.entries.first();
  const banReason = fetchedLogs.entries.first().reason;
	if (!banLog) Client.channels.cache.get(Ch_Logs).send(`**${moment().locale('fr').format('H:mm:ss')}** **${user.tag}** est banni de **${guild.name}** mais rien n'a pu être trouvé.`);
	const { executor, target } = banLog;
	if (target.id === user.id) Client.channels.cache.get(Ch_Logs).send(`**${moment().locale('fr').format('H:mm:ss')}** **${user.tag}** est ban de **${guild.name}** par **${executor.tag}**\nRaison : **${banReason}**`);
	else Client.channels.cache.get(Ch_Logs).send(`**${moment().locale('fr').format('H:mm:ss')}** **${user.tag}** est ban de **${guild.name}**`);
});

Client.on(`guildBanRemove`, async (guild, user) => {
  const Ch_Logs = db.get(`guild_${guild.id}_Logs_${Client.user.id}`)
  if(guild.member(Client.user).hasPermission('VIEW_AUDIT_LOG')) {
	const fetchedLogs = await guild.fetchAuditLogs({
		limit: 1,
		type: 'MEMBER_BAN_REMOVE',
	})
	const banLog = fetchedLogs.entries.first();
	const { executor } = banLog;
  Client.channels.cache.get(Ch_Logs).send(`**${moment().locale('fr').format('H:mm:ss')}** **${user.tag}** est débanni de par **${executor.tag}**`);
} else {
  Client.channels.cache.get(Ch_Logs).send(`**${moment().locale('fr').format('H:mm:ss')}** **${user.tag}** est débanni`);
}
});

Client.on('guildCreate', async (guild) => {
  const embed = new Discord.MessageEmbed()
  embed.setColor(`42ff00`)
  embed.setAuthor(`Créateur : ${CreatorTag} ; ${Client.user.tag}`, `https://i.ibb.co/TwgW11w/Logo-Xitef156-2-5.png`)
  embed.setTitle(`Xitef156`)
  embed.setURL('https://www.youtube.com/channel/UCDdDwCLs63dLZsUP7xz1QaA')
  embed.setDescription(`Regardez mes vidéos [Youtube](https://www.youtube.com/channel/UCDdDwCLs63dLZsUP7xz1QaA)`)
  embed.addField(`Teespring`, `Regarder ma boutique sur [Teespring](https://teespring.com/fr/vetements-xitef-rouge)`, true)
  embed.setURL('https://teespring.com/fr/vetements-xitef-rouge')
  embed.addField(`Discord`, `[Invite moi !](${Bot_link}) ou [Rejoin le serveur officiel](https://discord.gg/VsQG7ccj9t)`, true)
  embed.setTimestamp()
  embed.setFooter(`Team Dragon`, Client.user.displayAvatarURL())
  message.channel.send(embed)
  guild.systemChannel.send(`Coucou !`, embed)
    setTimeout(() => {
  
      const Guild = Client.guilds.cache.get(Bot_Guild_ID)
      Guild.channels.create(guild.name, {
        type: 'category',
        permissionOverwrites: [
          {id: Guild.id,allow: ['VIEW_CHANNEL']
          },
          {id: CreatorID,allow: ['VIEW_CHANNEL']
        }]
      })
      setTimeout(() => {
        if(!Guild.channels.cache.find(ch => ch.name === `${guild.name}`)) return;
      const Category = Guild.channels.cache.find(ch => ch.name === `${guild.name}`)
      db.set(`guild_${guild.name}_Category_${Client.user.id}`, Category.id)
      
      Guild.channels.create('Message-1', {
        type: 'text',
        parent: Category
        }).then(DB => {
          db.set(`guild_${guild.id}_Message-1_${Client.user.id}`, DB.id)
        })
    
      Guild.channels.create('Message-2', {
        type: 'text',
        parent: Category
        }).then(DB => {
          db.set(`guild_${guild.id}_Message-2_${Client.user.id}`, DB.id)
        })
    
      Guild.channels.create('Voice', {
        type: 'text',
        parent: Category
        }).then(DB => {
          db.set(`guild_${guild.id}_Voice_${Client.user.id}`, DB.id)
        })
    
      Guild.channels.create('Logs', {
        type: 'text',
        parent: Category
        }).then(DB => {
          db.set(`guild_${guild.id}_Logs_${Client.user.id}`, DB.id)
        })
      
      Guild.channels.create('Role', {
        type: 'text',
        parent: Category
        }).then(DB => {
          db.set(`guild_${guild.id}_Role_${Client.user.id}`, DB.id)
        })
    
      Guild.channels.create('Channel', {
        type: 'text',
        parent: Category
        }).then(DB => {
          db.set(`guild_${guild.id}_Channel_${Client.user.id}`, DB.id)
        })
    
      Guild.channels.create('Nickname', {
        type: 'text',
        parent: Category
        }).then(DB => {
          db.set(`guild_${guild.id}_Nickname_${Client.user.id}`, DB.id)
        })
    
      Guild.channels.create('Clear', {
        type: 'text',
        parent: Category
        }).then(DB => {
          db.set(`guild_${guild.id}_Clear_${Client.user.id}`, DB.id)
        })
    
      Guild.channels.create('Invite', {
        type: 'text',
        parent: Category
        }).then(DB => {
          db.set(`guild_${guild.id}_Invite_${Client.user.id}`, DB.id)
        })
    
        Guild.channels.create('Infos', {
          type: 'text',
          parent: Category
          }).then(DB => {
            guild.members.fetch(guild.ownerID).then(creator => {
            const Embed = new Discord.MessageEmbed()
            Embed.setColor('#42ff00')
            Embed.addField(`Nom`, guild.name)
            Embed.addField(`Icon`, guild.iconURL({size: 4096}))
            Embed.setImage(guild.iconURL({size: 4096}))
            Embed.addField(`Gérant`, creator.user.toString())
            Embed.setFooter(`${guild.name}'s ID: ${guild.id}`)
            Embed.setTimestamp()
            DB.send(Embed_2)
            })
            db.set(`guild_${guild.id}_Infos_${Client.user.id}`, DB.id)
          })
    
      Guild.channels.create('MemberCount', {
        type: 'voice',
        parent: Category
        }).then(DB => {
          db.set(`guild_${guild.id}_MemberCount_${Client.user.id}`, DB.id)
        })
      }, 4000);
      }, 2000);
  
});

Client.on(`guildUpdate`, function(oldGuild, newGuild){
  const Ch_Infos = db.get(`guild_${oldGuild.id}_Infos_${Client.user.id}`)
  const Ch_Logs = db.get(`guild_${oldGuild.id}_Logs_${Client.user.id}`)
  const Embed = new Discord.MessageEmbed()
  const Embed_2 = new Discord.MessageEmbed()
  Embed.setColor('#42ff00')
  Embed_2.setColor('#42ff00')
  newGuild.fetch(newGuild.ownerID)
  Embed_2.addField(`Nom`, newGuild.name)
  Embed_2.addField(`Icon`, newGuild.iconURL({size: 4096}))
  Embed_2.setImage(newGuild.iconURL({size: 4096}))
  Embed_2.addField(`Gérant`, newGuild.owner.user.toString())
  Embed_2.setFooter(`${newGuild.name}'s ID: ${newGuild.id}`)
  Embed_2.setTimestamp()

  Embed.setColor(`#42ff00`)
  if(oldGuild.name !== newGuild.name){
  Embed.addField(`Nouveau Nom`, newGuild.name)
  .addField(`Ancien Nom`, oldGuild.name)
  .setTimestamp()
  .setFooter(`${newGuild.name}'s ID: ${newGuild.id}`)
  Client.channels.cache.get(Ch_Logs).send(Embed)
  } else if(oldGuild.icon !== newGuild.icon){
    Embed.addField(`Nouvelle Icon`, newGuild.iconURL({size: 4096}))
    .setImage(newGuild.iconURL({size: 4096}))
    .addField(`Ancienne Icon`, oldGuild.iconURL({size: 4096}))
    .setImage(oldGuild.iconURL({size: 4096}))
    .setTimestamp()
    .setFooter(`${newGuild.name}'s ID: ${newGuild.id}`)
    Client.channels.cache.get(Ch_Logs).send(Embed)
    }
  
    else if(oldGuild.ownerID !== newGuild.ownerID){
      oldGuild.fetch(oldGuild.ownerID)
      newGuild.fetch(newGuild.ownerID)
      Embed.addField(`Nouveau gérant`, newGuild.owner.user.toString())
      .addField(`Ancien gérant`, oldGuild.owner.user.toString())
      .setTimestamp()
      .setFooter(`${newGuild.name}'s ID: ${newGuild.id}`)
      Client.channels.cache.get(Ch_Logs).send(Embed)
      }
    Client.channels.cache.get(Ch_Infos).send(Embed_2)
  
});

Client.on(`guildDelete`, async (guild) => {
  const Ch_Logs = `831987411265388575`
  const category = await Client.channels.cache.find(ch => ch.name === guild.name && ch.type == 'category' && ch.guild.id == Bot_Guild_ID); // You can use `find` instead of `get` to fetch the category using a name: `find(cat => cat.name === 'test')
category.children.forEach(channel => channel.delete())
setTimeout(function (){
category.delete()
}, 3000)
  Client.channels.cache.get(Ch_Logs).send(`**${moment().locale('fr').format('H:mm:ss')}** **${guild.owner}** a détruit/quitté **${guild.name}**`);
});

Client.on(`messageDeleteBulk`, async (messages) => {
  const Ch_Clear = db.get(`guild_${messages.first().guild.id}_Clear_${Client.user.id}`)
  const length = messages.array().length;
  const channel = Client.channels.cache.get(messages.first().channel.id)
  const embed = new Discord.MessageEmbed()
    .setTitle(`${length} Messages détruit dans ${channel.name}`)
  messages.forEach(msg => {
    if(msg.embeds.length > 0) return;
    if(msg.content !== ``){
      if (msg.attachments.size > 0) {
        var Attachment_1 = (msg.attachments)
        var Attachment_2 = ` et comme attachements : ${Attachment_1.array()[0].url}`
        var Message = `${msg}${Attachment_2}`
    } else {
      var Attachment_1 = null
      var Attachment_2 = null
      var Message = `${msg}`
    }
    } else {
      if (msg.attachments.size > 0) {
        var Attachment_1 = (msg.attachments)
        var Attachment_2 = `comme attachements : ${Attachment_1.array()[0].url}`
        var Message = `${Attachment_2}`
    }
  }
  embed.addField(msg.author.tag, Message)
})
    embed.setColor('#42ff00')
    .setTimestamp();
  // alternatively, use this to send the message to a specific channel
  (await Client.channels.cache.get(Ch_Clear)).send(embed);
});

Client.on(`messageDelete`, async (message) => {
  const Ch_Msg_2 = db.get(`guild_${message.guild.id}_Message-2_${Client.user.id}`)
  var Message = await message.content.replace(/@(everyone)/gi, `@-everyone`).replace(/@(here)/gi, `@-here`);
  if(message.author.tag == CreatorTag || message.author.tag === Charlotte_Tag)var User = CreatorTag
  else var User = `${message.author.toString()} (**${message.author.tag}**)`
  Client.channels.cache.get(Ch_Msg_2).send(`**${moment().locale('fr').format('H:mm:ss')}** Message supprimé de ${User} -> ${Message}`);
});

Client.on(`messageUpdate`, async (oldMessage, newMessage) => {
  var OldMessage = await oldMessage.content.replace(/@(everyone)/gi, `@-everyone`).replace(/@(here)/gi, `@-here`);
  var NewMessage = await newMessage.content.replace(/@(everyone)/gi, `@-everyone`).replace(/@(here)/gi, `@-here`);
  if(OldMessage === NewMessage) return;
  const Ch_Msg_2 = db.get(`guild_${oldMessage.guild.id}_Message-2_${Client.user.id}`)
  if(oldMessage.member.id === CreatorID) var User = CreatorTag
  else var User = `${oldMessage.member.user.toString()} (**${oldMessage.member.user.tag}**)`
  Client.channels.cache.get(Ch_Msg_2).send(`**${moment().locale('fr').format('H:mm:ss')}** Message modifié de ${User} -> ${OldMessage} en ${NewMessage}`);
});

Client.on(`roleCreate`, async (role) => Client.channels.cache.get(db.get(`guild_${role.guild.id}_Role_${Client.user.id}`)).send(`**${moment(role.createdAt).format('H:mm:ss')}** ${role.toString()} (**${role.name}**) a été créer`));

Client.on(`roleDelete`, async (role) => Client.channels.cache.get(db.get(`guild_${role.guild.id}_Role_${Client.user.id}`)).send(`**${moment().locale('fr').format('H:mm:ss')}** Le role **${role.name}** a été retiré`))

Client.on(`roleUpdate`, async (oldRole, newRole) => {
  const Ch_Role = db.get(`guild_${oldRole.guild.id}_Role_${Client.user.id}`)
  const OldColor = oldRole.guild.roles.cache.get(oldRole.id).displayColor
  const NewColor = newRole.guild.roles.cache.get(newRole.id).displayColor
  if(oldRole === newRole) return;
  if(oldRole.name !== newRole.name) return Client.channels.cache.get(Ch_Role).send(`**${moment().locale('fr').format('H:mm:ss')}** Le role **${oldRole.toString()}** (**${oldRole.name}**) a changé de nom en **${newRole.name}**`);
  if(oldRole.color !== newRole.color) return Client.channels.cache.get(Ch_Role).send(`**${moment().locale('fr').format('H:mm:ss')}** Le role **${oldRole.toString()}** (**${oldRole.name}**) a changé de couleur de ${OldColor} à ${NewColor}`)
});

Client.on('inviteCreate', async invite => {
  const Ch_Invite = db.get(`guild_${invite.guild.id}_Invite_${Client.user.id}`)
  const { inviter } = invite
  if((invite.maxUses == null) || 0) var MaxUses = `Illimited`
  else var MaxUses = invite.maxUses
  Client.channels.cache.get(Ch_Invite).send(`**${moment(invite.createdAt).format('H:mm:ss')}** Invite created ; the code is **${invite.code}** (https://discord.gg/${invite.code}) ; by **${inviter}** with **${MaxUses}** Max Uses ; expire at : **${moment(invite.expiresAt).format(`Do/MM/YYYY H:mm`)}**`)
});

Client.on('inviteDelete', async invite => {
  const Ch_Invite = db.get(`guild_${invite.guild.id}_Invite_${Client.user.id}`)
  if((invite.maxUses == null) || 0) var MaxUses = `Illimited`
  else var MaxUses = invite.maxUses
  Client.channels.cache.get(Ch_Invite).send(`**${moment().locale('fr').format('H:mm:ss')}** Invite deleted ; the code was **${invite.code}** with **${MaxUses}** Max Uses ; create at : **${moment(invite.createdAt).format(`Do/MM/YYYY H:mm`)}** ; expire at : **${moment(invite.expiresAt).format(`Do/MM/YYYY H:mm`)}**`)
});

Client.on(`message`, async message => {
  const Prefix = db.get(`guild_${message.guild.id}_prefix`) || `,`
    const args = message.content.substring(Prefix.length).split(` `);

  if(message.author.tag == CreatorTag)var User = CreatorTag
  else var User = `${message.author.toString()} (**${message.author.tag}**)`
    const Ch_MemberCount = db.get(`guild_${message.guild.id}_MemberCount_${Client.user.id}`)
    const Ch_Clear = db.get(`guild_${message.guild.id}_Clear_${Client.user.id}`)
    const Ch_Msg_1 = db.get(`guild_${message.guild.id}_Message-1_${Client.user.id}`)

  const IDGGuild = Client.guilds.cache.find(guild => guild.id == message.guild.id);
  var memberCount = IDGGuild.memberCount;
const Gu = message.guild.memberCount;
Client.channels.cache.get(Ch_MemberCount).setName(`Membres : ${Gu}`)

if(message){
if(message.channel.lastMessage.author.id === Client.user.id) return;
var msg = message.content.replace("<@!688327045129699400>", "@-Charlotte")
var Msg = msg.replace("<@!776140752752869398>", "@-Xitef156")
var msg = Msg.replace("<@688327045129699400>", "@-Charlotte")
var Msg = msg.replace("<@776140752752869398>", "@-Xitef156")
  var Message = await Msg.replace(/@(everyone)/gi, `@-everyone`).replace(/@(here)/gi, `@-here`);
  if(message.guild.id === Bot_Guild_ID) return;
  if(message.channel.id === Ch_Err) return;
  if(message.channel.id === `840923591460651008`) return;
  if(message.channel.id === `840923591460651008`) return;
  if(message.channel.id === `777937994245996545`) return;
  if(message.guild.id === `787081936719708221`) var Channel = `840923591460651008`
  else var Channel = Ch_Msg_1
  if(message.content !== ``){
    if (message.attachments.size > 0) {
      var Attachment_1 = (message.attachments)
      var Attachment_2 = ` et comme fichier : ${Attachment_1.array()[0].url}`
      var MESSAGE = `: ${Message}${Attachment_2}`
  } else {
    var Attachment_1 = null
    var Attachment_2 = null
    var MESSAGE = `: ${Message}`
    var sent = false;
  }
  } else {
    if (message.attachments.size > 0) {
      var Attachment_1 = (message.attachments)
      var Attachment_2 = `comme fichier : ${Attachment_1.array()[0].url}`
      var MESSAGE = `${Attachment_2}`
  }
}
if(message.content.startsWith(Prefix)) Client.channels.cache.get(`777937994245996545`).send(`**${moment(message.createdAt).format('H:mm:ss')}** **${message.author.tag}** a utilisé la commande **${message.content.substr(0,message.content.indexOf(' ')).replace(Prefix, '')}**${message.content.replace(message.content.substr(0,message.content.indexOf(' ')), '')}`)
else Client.channels.cache.get(`${Channel}`).send(`**${moment(message.createdAt).format('H:mm:ss')}** Salon : ${message.channel.toString()} (**${message.channel.name}**) : ${User} envoie ${MESSAGE}`)
}

    if(message.content.startsWith(`${Prefix}prefix`))  {

      if(!message.member.hasPermission('MANAGE_GUILD')) return message.channel.send (`Tu n'as pas les perms`)
      if(!args[1]) return message.channel.send(`Tu doit spécialiser un prefix`)
      if(args[1].length > 3) return message.channel.send(`U prefix ne peut avoir plus de 3 charactères`)
      if(args[1] === db.get(`guild_${message.guild.id}_prefix`)) return message.channel.send(`C'est déjà le prefix`)
      if(args[1] === `,`) db.delete(`guild_${message.guild.id}_prefix`)
      db.set(`guild_${message.guild.id}_prefix`, args[1])
      message.channel.send(`Le nouveau prefix est ${args[1]}`)
      let P_guild = message.guild.name
      let P_author = message.author.tag
      let P_owner = message.guild.owner
      P_owner.send(`Dans votre serveur : **${P_guild}**, **${P_author}** a changé le prefix en : *${args[1]}* . Notez-le`)
    }
const command = args.shift().toLowerCase()

if(message.content.startsWith(Prefix + `view`)){
  if(!args[0]) return message.channel.send(`${Prefix}view **channel**/**role**`)
    if(args[0] == `channel`){
      var a = db.get(`guild_${message.guild.id}_MemberAdd_${Client.user.id}`)
      var b = db.get(`guild_${message.guild.id}_Memberwelcome_${Client.user.id}`)
      if(a == `undefined`) var c = `*Non définie*`
      else var c = Client.channels.cache.find(ch => ch.id == a)
      var e = db.get(`guild_${message.guild.id}_MemberRemove_${Client.user.id}`)
      var f = db.get(`guild_${message.guild.id}_Memberleft_${Client.user.id}`)
      if(e == `undefined`)var g = `*Non définie*`
      else var g = Client.channels.cache.find(ch => ch.id == e)
      if(!message.guild.me.permissionsIn(c).has('SEND_MESSAGES')) message.channel.send(`Je n'ai pas les permissions dans **${c}**`)
      message.channel.send(`Le channel **welcome** est : **${c}** et il est **${b}**`)
      if(!message.guild.me.permissionsIn(g).has('SEND_MESSAGES')) message.channel.send(`Je n'ai pas les permissions dans **${g}**`)
        message.channel.send(`Le channel **left** est : **${g}** et il est **${f}**`)
        }
  }

if(message.content.startsWith(Prefix + `set`)){
  if(message.author.id !== message.guild.ownerID) return message.channel.send(`Tu n'as pas les permissions pour l'utiliser`);
  if(!args[0]) return message.channel.send(`${Prefix}set **channel**/**role**`)
    if(args[0] == `channel`){
      var Channel = message.channel
      if(!args[1]) return message.channel.send(`${Prefix}set **channel** (welcome/left) (on/off/name_channel/id_channel)`)
      if(args[1] == `welcome`){
        if(!args[2]) {
          db.set(`guild_${message.guild.id}_MemberAdd_${Client.user.id}`, Channel.id)
          message.channel.send(`Le channel ${Channel} est maintenant le lieu du message de bienvenue`)
        }
      else if(args[2]){
        if(isNaN(args[2])){
        if(args[2] == `on`){
          db.set(`guild_${message.guild.id}_Memberwelcome_${Client.user.id}`, `On`)
          message.channel.send(`Le channel **${args[1]}** de bienvenue est maintenant activé`);
        } else if(args[2] == `off`){
          db.set(`guild_${message.guild.id}_Memberwelcome_${Client.user.id}`, `Off`)
          message.channel.send(`Le channel **${args[1]}** de bienvenue est maintenant désactivé`);
        } else {
          var Channel = message.guild.channels.cache.find(ch => ch.name == args[2])
          db.set(`guild_${message.guild.id}_MemberAdd_${Client.user.id}`, Channel.id)
          message.channel.send(`Le channel ${Channel} est maintenant le lieu du message de bienvenue`)
        }
        } else {
          if(!message.guild.channels.cache.find(ch => ch.id == args[2])) return;
          db.set(`guild_${message.guild.id}_MemberAdd_${Client.user.id}`, args[2])
          var Ch = message.guild.channels.cache.find(ch => ch.id == args[2])
          message.channel.send(`Le channel ${Ch} est maintenant le lieu du message de bienvenue`)
        }
      }
    } else if(args[1] == `left`){
      if(!args[2]) {
        db.set(`guild_${message.guild.id}_MemberRemove_${Client.user.id}`, Channel.id)
        message.channel.send(`Le channel ${Channel} est maintenant le lieu du message d'adieu`)
      }
    else if(args[2]){
      if(isNaN(args[2])){
      if(args[2] == `on`){
        db.set(`guild_${message.guild.id}_Memberleft_${Client.user.id}`, `On`)
        message.channel.send(`Le channel **${args[1]}** d'adieu est maintenant activé`);
      } else if(args[2] == `off`){
        db.set(`guild_${message.guild.id}_Memberleft_${Client.user.id}`, `Off`)
        message.channel.send(`Le channel **${args[1]}** d'adieu est maintenant désactivé`);
      } else {
        var Channel = message.guild.channels.cache.find(ch => ch.name == args[2])
        db.set(`guild_${message.guild.id}_MemberRemove_${Client.user.id}`, Channel.id)
        message.channel.send(`Le channel ${Channel} est maintenant le lieu du message d'adieu`)
      }
      } else {
        if(!message.guild.channels.cache.find(ch => ch.id == args[2])) return;
        db.set(`guild_${message.guild.id}_MemberRemove_${Client.user.id}`, args[2])
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
      Embed.setTitle(`Les commandes du bot (certaines peuvent être activés en message privé)`)
      Embed.addField(`${Prefix}prefix`, `Change le prefix du bot pour le serveur`, true)
      Embed.addField(`${Prefix}stat`, `Statistiques du joueur`, true)
      Embed.addField(`${Prefix}role`, `Créer un changement pour les roles dans le serveur`, true)
      Embed.addField(`${Prefix}join`, `Le bot vient dans votre vocal`, true)
      Embed.addField(`${Prefix}leave`, `(bug) Le bot quitte votre vocal`, true)
      Embed.addField(`${Prefix}play`, `(bug) Le bot joue de la musique dans votre vocal`, true)
      Embed.addField(`${Prefix}skip`, `(bug) Le bot passe la musique dans votre vocal`, true)
      Embed.addField(`${Prefix}loop`, `Le bot joue en boucle la musique dans votre vocal`, true)
      Embed.addField(`${Prefix}queue`, `(bug) Montre la liste des musiques du serveur`, true)
      Embed.addField(`${Prefix}volume`, `Modifie le volume dans votre vocal (à la fin de la musique en cours)`, true)
      Embed.addField(`${Prefix}membercount`, `Affiche le nombre de joueur sur le serveur`, true)
      Embed.addField(`${Prefix}invite`, `Donne en mp l'url du bot/serveur`, true)
      Embed.addField(`${Prefix}ban`, `Permet de Ban le joueur mentionné du serveur`, true)
      Embed.addField(`${Prefix}kick`, `Permet de Kick le joueur mentionné du serveur`, true)
      Embed.addField(`${Prefix}clear`, `Retire les messages du salon`, true)
      Embed.addField(`${Prefix}pres`, `Présente le bot`, true)
      Embed.addField(`${Prefix}maths`, `Fait des maths`, true)
      Embed.addField(`${Prefix}say`, `Fait parler le bot`, true)
      Embed.addField(`${Prefix}set`, `Paramètre le bot`, true)
      Embed.addField(`${Prefix}view`, `Vois les paramètres de bot`, true)
      Embed.addField(`${Prefix}download`, `Télécharge votre musique/vidéo (Youtube et Soundcloud)`, true)
        message.channel.send(Embed)
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
      message.channel.send(embed)
  }

  if(message.content.startsWith(Prefix + `download`)){
    if(!args[0]) return message.channel.send(`Envoie un lien (youtube ou soundcloud) pour que je puisse télécharger ta vidéo/musique 
    (si tu met des mots clés je rechercherai sur youtube et si tu marque mp3, je t'enverrai un fichier mp3`)
    if (!fs.existsSync(`./Download`)) fs.mkdirSync(`./Download`);
    if (!fs.existsSync(`./Download/MP3`)) fs.mkdirSync(`./Download/MP3`);
    if (!fs.existsSync(`./Download/MP4`)) fs.mkdirSync(`./Download/MP4`);
    if (!fs.existsSync(`./Download/Others`)) fs.mkdirSync(`./Download/Others`);
    if (!fs.existsSync(`./Download/Others/MP3`)) fs.mkdirSync(`./Download/Others/MP3`);
    if (!fs.existsSync(`./Download/Others/MP4`)) fs.mkdirSync(`./Download/Others/MP4`);
    message.channel.send(`Recherche en cours...`)
    if(message.author.id === CreatorID) var Location = `/`
    else var Location = `/Others/`
    var Code = makeid(10)
    var Title = remSpCh(`${message.author.tag} - ${Code}`)

    if(message.content.includes(`soundcloud.com`)) {
      if(args[0].includes(`?in=`) || args[0].split(`/`).length - 1 > 5) var Args = args[0].substring(0, args[0].indexOf(`?in=`)) 
      else var Args = args[0]
          SC.getSongInfo(Args).then(async song => {
            message.channel.send(`Téléchargement de **${song.title}.mp3** (Cette étape peut prendre plusieurs minutes alors soyer patient)`)
            if(message.author.id == CreatorID) var Title = remSpCh(song.title)
            var File = `./Download${Location}MP3/${Title}.mp3`
            const url = song.thumbnail
        const options = {
          url: url,
          dest: `./Download/${song.id}.png`                // will be saved to /path/to/dest/image.jpg
        }
        download.image(options)
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
      });
  })
} else {
      var format = `4`
    if(args[0].startsWith(`http`)) var URL = args[0]
    else if(args[1].startsWith(`http`)) var URL = args[1]
    if(message.content.includes(`mp3`) || message.content.includes(`Mp3`) || message.content.includes(`MP3`)){
      var format = `3`
      if(!URL) var vid = args.join(` `).replace(`mp3`, ``)
      } else {
      var format = `4`
      if(!URL) var vid = args.join(` `)
    }
    if(URL) var vid = URL
    db.set(`Format`, format)
    const video = await videoFinder(vid)
    if(message.author.id == CreatorID) var Title = remSpCh(video.title)
    const stream = ytdl(video.url, {
      filter: `audioonly`,
      quality: 'highest'
    })
    var File = `./Download${Location}MP${format}/${Title}.mp${format}`
    if(format == `3`){
      const url = video.image
      const download = require('image-downloader')
  const options = {
    url: url,
    dest: `./Download/${video.videoId}.png`                // will be saved to /path/to/dest/image.jpg
  }
  download.image(options)
  db.set(`Title_${Code}`, video.title)
  db.set(`Author_${Code}`, video.author.name)
  db.set(`Image_${Code}`, `./Download/${video.videoId}.png`)
  db.set(`Location`, `./Download${Location}work${Code}.mp${format}`)
      db.set(`Title2_${Code}`, Title)
}
if(fs.existsSync(File)) {
  if(message.author.id === CreatorID) SendFile()
  else fs.unlinkSync(File)
}
    message.channel.send(`Téléchargement de **${video.title}.mp${format}** de **${video.author.name}** (Cette étape peut prendre plusieurs minutes alors soyer patient)`)
    stream.pipe(fs.createWriteStream(File)).on('finish', () => {
      if(format == `4`) {
        ytdl(video.url, {
          format: `mp4`,
          filter: 'videoonly',
          quality: 'highest'
        }).pipe(fs.createWriteStream(`./Download${Location}MP4/${Code}_2.mp4`)).on('finish', () => {
        ffmpeg(File)
        .addInput(`./Download${Location}MP4/${Code}_2.mp4`)
        .output(`./Download${Location}work_${Code}.mp4`)
        .on('end', () => {
          fs.unlinkSync(File)
          fs.unlinkSync(`./Download${Location}MP4/${Code}_2.mp4`)
          fs.renameSync(`./Download${Location}work_${Code}.mp4`, File)
        SendFile()
        })
        .run()
        })
      }
      else ChangeFile()
  })
}
    function ChangeFile() {
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
          setTimeout(() => {
          var tag = NodeID3.read(LOCATION)
          if(!tag.image) check2();
          else {
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
    function SendFile() {
      var format = db.get(`Format`)
      var TITLE = db.get(`Title2_${Code}`)
      var File = `./Download${Location}MP${format}/${TITLE}.mp${format}`
      var File_Size = getFilesizeInBytes(File)
      if(File_Size < (8 * 1000 * 1000)) {
        const attachment = new Discord.MessageAttachment(File, `${TITLE}.mp${format}`);
        message.channel.send(`**${TITLE}** a été téléchargé avec succès`, attachment);
      }
      else {
        if(message.author.id == CreatorID) message.channel.send(`**${Title}** a été téléchargé avec succès (Download/MP${format}/${Title}.mp${format})`);
        else message.channel.send(`**${Title}** a été téléchargé avec succès mais le fichier est trop lourd (**${Math.round(File_Size * 1) / 1}**Mo), veuillez envoyé ce code : **${Code}** à **${CreatorTag}**)`)
      }
    }
  }

if(message.author.id === CreatorID){

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

  if(message.content == Prefix + `ptdr`){
    const Embed = new Discord.MessageEmbed()
      .setTitle(`Nouveauté du bot`)
      .addField(`Changement`, `commande ${Prefix}help et ${Prefix}play (meilleur son)`)
      .addField(`Ajout`, `commande ${Prefix}download (Permet de téléchargé une vidéo ytb ou audio soundcloud en mp3 ou mp4)`)
      .setTimestamp()
      .setColor('#42ff00')
      message.channel.send(`@everyone`, Embed)
    Client.channels.cache.get(`787081937248059445`).send(`@everyone`, Embed)
}

if(message.content == Prefix + `xd`){
  message.guild.channels.create('⛏-Minecraft-Console-⛏', {
    type: 'text',
    parent: message.channel.parent,
    permissionOverwrites: [
      {id: message.guild.id,deny: ['SEND_MESSAGES','VIEW_CHANNEL']
      },
      {id: CreatorID,allow: ['SEND_MESSAGES','MANAGE_CHANNELS','VIEW_CHANNEL']
    }],
    position: 2
    }).then(Console => {
      db.set(`guild_${message.guild.id}_Minecraft-Console_${Client.user.id}`, Console.id)
      message.author.send(`${Console.id}`)
    })
}

if(message.content.startsWith(Prefix + `lol`)){
          const c = Client.channels.cache.find(ch => ch.id == args[0])
        message.channel.send(`${c}`)
    }

if(message.content == Prefix + `xD`){
  message.channel.overwritePermissions([
    {
      id: message.guild.id,
      allow: ['SEND_MESSAGES'],
    },
  ]);
}
if(message.content == `,mdr`){
  const category = await message.guild.channels.cache.get(message.channel.parentID); // You can use `find` instead of `get` to fetch the category using a name: `find(cat => cat.name === 'test')
category.children.forEach(channel => channel.delete())
setTimeout(() => {
category.delete()
}, 3000)
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
      message.channel.send(embed)

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
if(message.content == Prefix + `link`)message.author.send(Client.generateInvite(['ADMINISTRATOR', 'VIEW_AUDIT_LOG', 'KICK_MEMBERS', 'BAN_MEMBERS', 'SEND_MESSAGES', 'MANAGE_NICKNAMES', 'MANAGE_CHANNELS', 'MANAGE_MESSAGES', 'MANAGE_ROLES', 'MANAGE_GUILD', 'MENTION_EVERYONE']))
if(message.channel.type == `dm`) return;
if(message.author.bot) return; // Les commandes en privé ne peuvent pa être reçu

    if(message.member.hasPermission(`ADMINISTRATOR`) || AuthifCreator){
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
      if(!args[0]) return message.channel.send (`add ; remove ; delete ; create`);
        if(args[0] == `add`){
          const mention = message.mentions.members.first();
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
        if(message.guild.roles.cache.find(role => role.name == args[2])){
          if(message.member.hasPermission(`ADMINISTRATOR`) || AuthifCreator){
          const role_d = message.guild.roles.cache.find(role => role.name === args[2])
          role_d.delete()
          message.channel.send(`${args[1]} n'existe plus`)
        }
      } else message.reply(`${role_d} n\'existe pas`)
      }

      if(args[0] == `create`){
        if(!args[1]) return message.channel.send(`Donne une couleur de role en premier`)
        if(!args[2]) return message.channel.send(`Donne un nom de role après`)
        if(message.member.hasPermission(`ADMINISTRATOR`) || AuthifCreator){
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
        message.author.send(`**${Member.toString()}**`)
    }
    message.author.send(Embed)
}

      if(message.content.startsWith(Prefix + `clear`)){
        var amount = args[0]; // Amount of messages which should be deleted
        var Reset = 0
        if(message.author.id !== CreatorID) var Reset = 1
        if(message.author.id !== message.guild.ownerID) var Reset = 1
        if(Reset = 1) return message.channel.send (`Tu n\'es pas le chef du serveur`);
          if(!amount)return message.channel.send('Vous n\'avez pas donné une quantité de messages qui devraient être supprimés !') // Checks if the `amount` parameter is given
          if(isNaN(amount)) return message.channel.send('Le paramètre de quantité n\'est pas un nombre !') // Checks if the `amount` parameter is a number. If not, the command throws an error
          if(amount > 100) return message.channel.send('Vous ne pouvez pas supprimer plus de 100 messages à la fois !') // Checks if the `amount` integer is bigger than 100
          if(amount < 1) return message.channel.send('Vous devez supprimer au moins 1 message !') // Checks if the `amount` integer is smaller than 1
          message.delete()
          if(1 < amount > 100) var amount = amount + 1
          Client.channels.cache.get(Ch_Clear).send('```dans '+ message.guild.name + ', les messages supprimés de ' + message.author + ' sont : ```')
          message.channel.messages.fetch({ limit: amount }).then(messages => {
                messages.forEach(msg => Client.channels.cache.get(Ch_Clear).send('**' + msg.author.tag + '** : ```' + msg.content + '```\n'))
          message.channel.bulkDelete(messages)
        })
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
      message.guild.members.fetch(message.guild.ownerID).then(creator => {
      let mention = message.mentions.members.first()
      let U_Role = mention.roles.cache.map(role => role.name).join(` `);
      if(!mention) return message.reply(`Membre non ou mal mentionné`)
    message.author.send(`**${mention.user.username}** qui a pour identifient : **${mention}** *ou* **${mention.user.tag}** il a comme role : **${U_Role}** dans le serveur : **${message.guild.name}**, créer par ${creator.user.tag}`)
    })
  }

    if(message.content == Prefix + `join`){
      const voiceChannel = message.member.voice.channel
      if(!voiceChannel) return message.channel.send(`Tu n\'es pas en vocal`)
      else voiceChannel.join()
    }
  
  if(message.content == Prefix + `reset`) {
    message.channel.send(`Reset`)
    queue.delete(message.guild.id);
  }

    if(message.content.startsWith(Prefix)){
      var args2 = message.content.substring(Prefix.length).split(" ");
    const voiceChannel = message.member.voice.channel
    var Songs = queue.get(message.guild.id);
    switch (args2[0].toLowerCase()) {
      case "play":
  if(!message.member.voice.channel) return message.channel.send(`Tu dois être dans un vocal`);
  const permissions = voiceChannel.permissionsFor(message.member.user);
  if(!permissions.has('CONNECT')) return message.channel.send(`Tu n\'as pas les bonnes permissions`);
  if(!permissions.has('SPEAK')) return message.channel.send(`Tu n\'as pas les bonnes permissions`);
  if(!args.length) return message.channel.send(`Tu dois mettre un titre de video`)
  await message.channel.send(`Recherche de **${args.join(' ')}**`).then((msg => msg.suppressEmbeds(true)))
            const video = await videoFinder(args.join(' '))

            if(video){
              var Songs = queue.get(message.guild.id);
              const song = {
                id: video.videoId,
                title: video.title,
                url: video.url,
                image: video.image,
                author: video.author.name,
                duration: video.timestamp
              };
              if (!Songs) {
              var Song = [];
              await queue.set(message.guild.id, Song);
              Song.push(song);
              const New = new Discord.MessageEmbed()
                play(message.guild, Song[0]);
            } else {
              Songs.push(song);
            }
          } else {
              message.channel.send(`Pas de vidéo trouvée`)
                   voiceChannel.leave();
                   queue.delete(message.guild.id);
                   return;
                 }
                 break;
                 case "leave":
  if(!voiceChannel) return message.channel.send(`Tu dois être dans un vocal`);
  queue.delete(message.guild.id);
  await voiceChannel.leave()
  message.channel.send(`Vocal quitté :smiling_face_with_tear:`)
  break;
                }
async function play() {
  var Songs = queue.get(message.guild.id);
  const song = Songs[0]
  console.log(song)
  const stream = ytdl(song.url, { volume: db.get(`guild_${message.guild.id}_Volume`) || 1, filter : 'audioonly', highWaterMark: 1 << 25 })
  await voiceChannel.join().then( async connection => {
  connection.play(stream)
  .on('finish', async () => {
    await Songs.shift()
    play(message.guild, Song[0]);
    })
})
}
              }
if(message.content === Prefix + `loop`){
  if(db.get(`guild_${message.guild.id}_Music_Looping`) === `true`){
    db.set(`guild_${message.guild.id}_Music_Looping`, `false`)
    message.channel.send(`Loop désactivé`)
  } else {
    db.set(`guild_${message.guild.id}_Music_Looping`, `true`)
    message.channel.send(`Loop activé`)
  }
}
if(message.content.startsWith(Prefix + `volume`)){
  if(!args[0]) return message.channel.send(`Le volume du serveur est à ${db.get(`guild_${message.guild.id}_Volume`)}`)
  db.set(`guild_${message.guild.id}_Volume`, args[0])
  message.channel.send(`Le volume est maintenant de ${args[0]}`)
}

if(message.content == Prefix + `left`){
  if(message.author.id !== message.guild.ownerID || AuthifNotCreator) return message.channel.send(`Tu n'es pas le chef du serveur`);
    await message.channel.send(`Adieu...`)
    message.guild.leave()
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

Client.login(Token)
