const Discord = require(`discord.js`);
const ytdl = require(`ytdl-core`);
const ytSearch = require(`yt-search`);
const ffmpeg = require(`ffmpeg`);
const ffmpegstatic = require(`ffmpeg-static`);
const Canvas = require(`canvas`);
const fetch = require('node-fetch');
const weather = require('weather-js')
const cron = require(`cron`);
const db = require('quick.db');

const Client = new Discord.Client();
const Token = `Nzg4MDc2NDIyNzc4MDYwOTIw.X9ePXA.qR66PFA-aflspGRWnXRmvtwgrYc`

const CreatorTag = `Xitef156#1822`
const CreatorID = `776140752752869398`
const AuthifCreator = `message.author.id === ${CreatorID}`
const AuthifNotCreator = `message.author.id !== ${CreatorID}`
const Ch_Logs_1 = `831987411265388575`
const Ch_Logs_2 = `831987484300410920`
const Ch_Err = `834751451090911292`
const Ch_cmd = `777937994245996545`
const Ch_Msg = `835926106719780885`
const Ch_Msg_RG = `835932970979557376`
const Gu_RG_ID = `687720397638336550`
const Bot_link = `https://discord.com/api/oauth2/authorize?client_id=788076422778060920&permissions=402794686&scope=bot`
const Font = "Electramaniacal"

let Font_Size = `150`


var servers = {};

Client.on(`ready`, async () => {
    console.log(`Coucou`)
    Client.user.setStatus(`dnd`);
    Client.user.setActivity(`Prefix ` + `help`);
    const GuildsID = Client.guilds.cache.map(guild => guild.id);
    const GuildsName = Client.guilds.cache.map(guild => guild.name);
    console.log(`${GuildsID} , ${GuildsName}`);

    const Gu_RG = Client.guilds.cache.get(Gu_RG_ID)

    var memberCount = Gu_RG.memberCount;
    const Channel = Client.channels.cache.get(`836914665103425536`)
    Channel.setName(`Membre RG : ${memberCount}`);
});

Client.on("voiceStateUpdate", (oldVoiceState, newVoiceState) => { // Listeing to the voiceStateUpdate event
  if (newVoiceState.channel) { // The member connected to a channel.
    
  if(newVoiceState.channel.guild.id == Gu_RG_ID){
    Client.channels.cache.get(Ch_Msg_RG).send(`**${newVoiceState.member.user.tag}** connecté à **${newVoiceState.channel.name}**.`);
  if (oldVoiceState.channel) {
    Client.channels.cache.get(Ch_Msg_RG).send(`**${oldVoiceState.member.user.tag}** déconnecté à **${oldVoiceState.channel.name}** ou s'est mute/demute.`)
  }
} else {
  Client.channels.cache.get(Ch_Logs_2).send(`Serveur : **${newVoiceState.guild.name}** : **${newVoiceState.member.user.tag}** connecté à **${newVoiceState.channel.name}**.`);
  } if (oldVoiceState.channel) { // The member disconnected from a channel.
    Client.channels.cache.get(Ch_Logs_2).send(`Serveur : **${oldVoiceState.guild.name}** : **${oldVoiceState.member.user.tag}** déconnecté à **${oldVoiceState.channel.name}** ou s'est mute/demute.`)
  }
}
});

Client.on(`channelCreate`, async (channel) => {
  if(channel.guild.member(Client.user).hasPermission('VIEW_AUDIT_LOG')){
	const fetchedLogs = await channel.guild.fetchAuditLogs({
		limit: 1,
		type: 'CHANNEL_CREATE',
	})
	const banLog = fetchedLogs.entries.first();
	const { executor } = banLog;
  Client.channels.cache.get(Ch_Logs_2).send(`Channel crée : **${channel.name}** dans **${channel.guild.name}** par **${executor.tag}**`);
} else {
  Client.channels.cache.get(Ch_Logs_2).send(`Channel crée : **${channel.name}** dans **${channel.guild.name}**`);
}
});

Client.on(`channelDelete`, async (channel) => {
  if(channel.guild.member(Client.user).hasPermission('VIEW_AUDIT_LOG')) {
	const fetchedLogs = await channel.guild.fetchAuditLogs({
		limit: 1,
		type: 'CHANNEL_DELETE',
	})
	const banLog = fetchedLogs.entries.first();
	const { executor } = banLog;
  Client.channels.cache.get(Ch_Logs_2).send(`Channel détruit : **${channel.name}** dans **${channel.guild.name}** par **${executor.tag}**`);
} else {
  Client.channels.cache.get(Ch_Logs_2).send(`Channel détruit : **${channel.name}** dans **${channel.guild.name}**`);
}
});

Client.on('shardError', error => {
  Client.channels.cache.get(Ch_Err).send(`Erreur Client : **${error}**`);
  console.log(error)
  console.error(error)
});

Client.on(`guildBanRemove`, async (guild, user) => {
  if(guild.member(Client.user).hasPermission('VIEW_AUDIT_LOG')) {
	const fetchedLogs = await guild.fetchAuditLogs({
		limit: 1,
		type: 'MEMBER_BAN_REMOVE',
	})
	const banLog = fetchedLogs.entries.first();
	const { executor } = banLog;
  Client.channels.cache.get(Ch_Logs_1).send(`**${user.tag}** est débanni de **${guild.name}** par **${executor.tag}**`);
} else {
  Client.channels.cache.get(Ch_Logs_1).send(`**${user.tag}** est débanni de **${guild.name}**`);
}
});

Client.on(`guildDelete`, async (guild) => {
  Client.channels.cache.get(Ch_Logs_2).send(`Le client a détruit/quitté **${guild.name}**`);
});

Client.on(`messageDelete`, async (message) => {
  if(message.guild.member(Client.user).hasPermission('VIEW_AUDIT_LOG')) {
	const fetchedLogs = await message.guild.fetchAuditLogs({
		limit: 1,
		type: 'MESSAGE_DELETE',
	})
	const banLog = fetchedLogs.entries.first();
	const { executor, target } = banLog;
  Client.channels.cache.get(Ch_Logs_2).send(`Message supprimé -> **${message}** dans **${message.guild.name}** par **${executor.tag}** de **${target.tag}**`);
} else {
  Client.channels.cache.get(Ch_Logs_2).send(`Message supprimé -> **${message}** dans **${message.guild.name}**  de **${message.member.tag}**`);
}
});

Client.on(`messageUpdate`, async (oldMessage, newMessage) => {
  Client.channels.cache.get(Ch_Logs_2).send(`Le message **${oldMessage}** a été changé en **${newMessage}** dans **${newMessage.guild.name}**`);
});

Client.on(`roleCreate`, async (role) => {
  if(role.guild.member(Client.user).hasPermission('VIEW_AUDIT_LOG')) {
	const fetchedLogs = await role.guild.fetchAuditLogs({
		limit: 1,
		type: 'ROLE_CREATE',
	})
	const banLog = fetchedLogs.entries.first();
	const { executor } = banLog;
  Client.channels.cache.get(Ch_Logs_2).send(`**${role.name}** a été créer dans **${role.guild.name}** par **${executor.tag}**`);
} else {
  Client.channels.cache.get(Ch_Logs_2).send(`**${role.name}** a été créer dans **${role.guild.name}**`);
}
});

Client.on(`roleDelete`, async (role) => {
  if(role.guild.member(Client.user).hasPermission('VIEW_AUDIT_LOG')) {
	const fetchedLogs = await role.guild.fetchAuditLogs({
		limit: 1,
		type: 'ROLE_DELETE',
	})
	const banLog = fetchedLogs.entries.first();
	const { executor } = banLog;
  Client.channels.cache.get(Ch_Logs_2).send(`Le role **${role.name}** a été retiré dans **${role.guild.name}** par **${executor.tag}**`);
} else {
  Client.channels.cache.get(Ch_Logs_2).send(`Le role **${role.name}** a été retiré dans **${role.guild.name}**`);
}
});

Client.on(`roleUpdate`, async (role) => {
  if(role.guild.member(Client.user).hasPermission('VIEW_AUDIT_LOG')) {
	const fetchedLogs = await role.guild.fetchAuditLogs({
		limit: 1,
		type: 'ROLE_UPDATE',
	})
	const banLog = fetchedLogs.entries.first()
	const { executor } = banLog
  Client.channels.cache.get(Ch_Logs_2).send(`Le role **${role.name}** a été changé dans **${role.guild.name}** par **${executor.tag}**`);
} else {
  Client.channels.cache.get(Ch_Logs_2).send(`Le role **${role.name}** a été changé dans **${role.guild.name}**`);
}
});

Client.on(`guildMemberUpdate`, async (oldMember, newMember) => {
  if(oldMember.guild.member(Client.user).hasPermission('VIEW_AUDIT_LOG')) {
  
	const fetchedLogs = await oldMember.guild.fetchAuditLogs({
		limit: 1,
		type: 'MEMBER_UPDATE',
	})
	const banLog = fetchedLogs.entries.first()
	const { executor } = banLog

  if (oldMember.roles.cache.size > newMember.roles.cache.size) {
      const Embed = new Discord.MessageEmbed()
      Embed.setColor(`RED`)
      Embed.setAuthor(newMember.user.tag, newMember.user.avatarURL())
      
      oldMember.roles.cache.forEach(role => {
          if (!newMember.roles.cache.has(role.id)) {
              Embed.addField(`Role Retiré`, role.name)
              .addField(`Serveur`, newMember.guild.name)
              .addField(`Exécuteur`, executor.tag)
              .setTimestamp()
              .setFooter(`${newMember.user.username}'s ID: ${newMember.id}`)
              Client.channels.cache.get(Ch_Logs_2).send(Embed)
              return;
          }
      })

      Client.channels.cache.get(Ch_Logs_2).send(Embed)
  } else if (oldMember.roles.cache.size < newMember.roles.cache.size) {
      const Embed = new Discord.MessageEmbed()
      Embed.setColor(`GREEN`)
      Embed.setAuthor(newMember.user.tag, newMember.user.avatarURL())
      
      newMember.roles.cache.forEach(role => {
          if (!oldMember.roles.cache.has(role.id)) {
              Embed.addField(`Role Ajouté`, role.name)
              .addField(`Serveur`, newMember.guild.name)
              .addField(`Exécuteur`, executor.tag)
              .setTimestamp()
              .setFooter(`${newMember.user.username}'s ID: ${newMember.id}`)
              Client.channels.cache.get(Ch_Logs_2).send(Embed)
              return;
          }
      })
  } else if (!oldMember.nickname && newMember.nickname) {
    const membernewnicklog = new Discord.MessageEmbed()
      .setAuthor(`${newMember.user.tag}`, `${newMember.user.displayAvatarURL({ format: `png`, dynamic: true })}`)
      .setDescription(`**${newMember} pseudo ajouté dans : ${oldMember.guild.name}**`)
      .setFooter(`${newMember.user.username}'s ID: ${newMember.id}`)
      .addField(`Exécuteur`, executor.tag)
      .setTimestamp()
      .setColor('#ffff00')
      .addField(`New nickname`, newMember.nickname)
    Client.channels.cache.get(Ch_Logs_2).send(membernewnicklog)
    return;
  } else if (oldMember.nickname && !newMember.nickname) {
    const memberremovenicklog = new Discord.MessageEmbed()
      .setAuthor(`${oldMember.user.tag}`, `${oldMember.user.displayAvatarURL({ format: `png`, dynamic: true })}`)
      .setDescription(`**${oldMember} pseudo retiré dans : ${oldMember.guild.name}**`)
      .setFooter(`${oldMember.user.username}'s ID: ${oldMember.id}`)
      .addField(`Exécuteur`, executor.tag)
      .setTimestamp()
      .setColor('#f04747')
      .addField(`Old nickname`, oldMember.nickname)
    Client.channels.cache.get(Ch_Logs_2).send(memberremovenicklog)
    return;
  } else if (oldMember.nickname && newMember.nickname) {
    const memberchangednicklog = new Discord.MessageEmbed()
      .setAuthor(`${newMember.user.tag}`, `${newMember.user.displayAvatarURL({ format: `png`, dynamic: true })}`)
      .setDescription(`**${newMember} pseudo changé dans : ${oldMember.guild.name}**`)
      .setFooter(`${newMember.user.username}'s ID: ${newMember.id}`)
      .addField(`Exécuteur`, executor.tag)
      .setTimestamp()
      .setColor('#ff4500')
      .addField(`Avant`, oldMember.nickname)
      .addField(`Après`, newMember.nickname)
    Client.channels.cache.get(Ch_Logs_2).send(memberchangednicklog)
    return;
  }
} else {
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
            Client.channels.cache.get(Ch_Logs_2).send(Embed)
            return;
        }
    })

    Client.channels.cache.get(Ch_Logs_2).send(Embed)
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
            Client.channels.cache.get(Ch_Logs_2).send(Embed)
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
    .addField(`New nickname`, newMember.nickname)
  Client.channels.cache.get(Ch_Logs_2).send(membernewnicklog)
  return;
} else if (oldMember.nickname && !newMember.nickname) {
  const memberremovenicklog = new Discord.MessageEmbed()
    .setAuthor(`${oldMember.user.tag}`, `${oldMember.user.displayAvatarURL({ format: `png`, dynamic: true })}`)
    .setDescription(`**${oldMember} pseudo retiré dans : ${oldMember.guild.name}**`)
    .setFooter(`${oldMember.user.username}'s ID: ${oldMember.id}`)
    .setTimestamp()
    .setColor('#f04747')
    .addField(`Old nickname`, oldMember.nickname)
  Client.channels.cache.get(Ch_Logs_2).send(memberremovenicklog)
  return;
} else if (oldMember.nickname && newMember.nickname) {
  const memberchangednicklog = new Discord.MessageEmbed()
    .setAuthor(`${newMember.user.tag}`, `${newMember.user.displayAvatarURL({ format: `png`, dynamic: true })}`)
    .setDescription(`**${newMember} pseudo changé dans : ${oldMember.guild.name}**`)
    .setFooter(`${newMember.user.username}'s ID: ${newMember.id}`)
    .setTimestamp()
    .setColor('#ff4500')
    .addField(`Avant`, oldMember.nickname)
    .addField(`Après`, newMember.nickname)
  Client.channels.cache.get(Ch_Logs_2).send(memberchangednicklog)
}
}
});

Client.on(`guildMemberRemove`, async (member) => {
  const fetchedLogs = await member.guild.fetchAuditLogs({
		limit: 1,
		type: 'MEMBER_KICK',
	});
	const kickLog = fetchedLogs.entries.first();

	if (!kickLog) return Client.channels.cache.get(Ch_Logs_1).send(`**${member.user.tag}** a quitté le serveur, très probablement de sa propre volonté.`);

	const { executor, target } = kickLog;

	if (target.id === member.id) {
		Client.channels.cache.get(Ch_Logs_1).send(`**${member.user.tag}** a quitté le serveur ; il est kick par **${executor.tag}**`);
	} else {
		Client.channels.cache.get(Ch_Logs_1).send(`**${member.user.tag}** a quitté le serveur, rien n'a été trouvé.`);
	}
});

Client.on('guildBanAdd', async (guild, user) => {
	const fetchedLogs = await guild.fetchAuditLogs({
		limit: 1,
		type: 'MEMBER_BAN_ADD',
	});
	const banLog = fetchedLogs.entries.first();
  const banReason = fetchedLogs.entries.first().reason;

	if (!banLog) return Client.channels.cache.get(Ch_Logs_1).send(`**${user.tag}** est banni de **${guild.name}** mais rien n'a pu être trouvé.`);

	const { executor, target } = banLog;

	if (target.id === user.id) {
		Client.channels.cache.get(Ch_Logs_1).send(`**${user.tag}** est ban de **${guild.name}** par **${executor.tag}**\nRaison : **${banReason}**`);
	} else {
		Client.channels.cache.get(Ch_Logs_1).send(`**${user.tag}** est ban de **${guild.name}**`);
	}
});

Client.on(`guildMemberAdd`, async member => {
  Client.channels.cache.get(Ch_Logs_1).send(`**${member.user.tag}** est arrivé dans **${member.guild.name}**`)
    const applyText = (canvas, text) => {
        const ctx = canvas.getContext('2d');
    
    
        do {
            ctx.font = `${Font_Size -= 10}px ${Font}`;
        } while (ctx.measureText(text).width > canvas.width - 300);
    
        return ctx.font;
    };
  const channel = await member.guild.channels.cache.find(ch => ch.name.includes(`arrivée`));

	if (!channel) return;

	const canvas = Canvas.createCanvas(700, 250);
	const ctx = canvas.getContext('2d');

	const background = await Canvas.loadImage('./wallpaper.png');
	ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

  var grd = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
  grd.addColorStop(0, "#00fbff");
  grd.addColorStop(1, "#ffffff");
	ctx.strokeStyle = grd;
  ctx.lineWidth = 5;
	ctx.strokeRect(0, 0, canvas.width, canvas.height);

	ctx.font = `${Font_Size - 80}px ${Font}`;
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

  if(member.displayName.includes(" ")){
    var str = member.displayName
  var DisplayName = str.replace(" ", "      ")
  }

	ctx.font = applyText(canvas, `${DisplayName}!`);
  ctx.shadowOffsetX = 2;
  ctx.shadowOffsetY = 2;
  ctx.shadowBlur = 5;
  ctx.shadowColor = '#bb0000';
  ctx.strokeStyle = '#ffffff';
	ctx.fillStyle = '#ff0000';
  ctx.lineWidth = 8;
  ctx.strokeText(`${DisplayName}`, canvas.width - 450, canvas.height / 1.75);
	ctx.fillText(`${DisplayName}`, canvas.width - 450, canvas.height / 1.75);
  ctx.globalAlpha = 0.5;
  ctx.strokeStyle = '#ffffff';
  ctx.lineWidth = 1.25;
  ctx.strokeText(`${DisplayName}`, canvas.width - 450, canvas.height / 1.75);

  
  ctx.globalAlpha = 1;
	ctx.beginPath();
  var grd2 = ctx.createLinearGradient(0, 0, 200, 0);
  grd2.addColorStop(0, "#ff0f00");
  grd2.addColorStop(0.17, "#ff5100");
  grd2.addColorStop(0.34, "#f3ff00");
  grd2.addColorStop(0.53, "#32ff00");
  grd2.addColorStop(0.72, "#00f7ff");
  grd2.addColorStop(0.85, "#0004ff");
  grd2.addColorStop(1, "#7c00ff");
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
});

Client.on(`guildMemberRemove`, async member => {
  Client.channels.cache.get(Ch_Logs_1).send(`**${member.user.tag}** est parti dans **${member.guild.name}**`)
    const applyText = (canvas, text) => {
        const ctx = canvas.getContext('2d');
    
        do {
            ctx.font = `${Font_Size -= 10}px ${Font}`;
        } while (ctx.measureText(text).width > canvas.width - 300);
    
        return ctx.font;
    };
  const channel = await member.guild.channels.cache.find(ch => ch.name.includes(`adieu`));

	if (!channel) return;

	const canvas = Canvas.createCanvas(700, 250);
	const ctx = canvas.getContext('2d');

	const background = await Canvas.loadImage('./wallpaper 2.png');
	ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

	var grd1 = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
  grd1.addColorStop(0, "#ff0f00");
  grd1.addColorStop(1, "#ffffff");
	ctx.strokeStyle = grd1;
  ctx.lineWidth = 5;
	ctx.strokeRect(0, 0, canvas.width, canvas.height);

	ctx.font = `${Font_Size - 80}px ${Font}`;
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

  if(member.displayName.includes(" ")){
    var str = member.displayName
  var DisplayName = str.replace(" ", "      ")
  }

	ctx.font = applyText(canvas, `${DisplayName}!`);
  ctx.shadowOffsetX = 2;
  ctx.shadowOffsetY = 2;
  ctx.shadowBlur = 5;
  ctx.shadowColor = '#bb0000';
  ctx.strokeStyle = '#ffffff';
	ctx.fillStyle = '#ff0000';
  ctx.lineWidth = 8;
  ctx.strokeText(`${DisplayName}`, canvas.width - 450, canvas.height / 1.75);
	ctx.fillText(`${DisplayName}`, canvas.width - 450, canvas.height / 1.75);
  ctx.globalAlpha = 0.5;
  ctx.strokeStyle = '#ffffff';
  ctx.lineWidth = 1.25;
  ctx.strokeText(`${DisplayName}`, canvas.width - 450, canvas.height / 1.75);

  
  ctx.globalAlpha = 1;
	ctx.beginPath();
  var grd2 = ctx.createLinearGradient(0, 0, 200, 0);
  grd2.addColorStop(0, "#ff0f00");
  grd2.addColorStop(0.17, "#ff5100");
  grd2.addColorStop(0.34, "#f3ff00");
  grd2.addColorStop(0.53, "#32ff00");
  grd2.addColorStop(0.72, "#00f7ff");
  grd2.addColorStop(0.85, "#0004ff");
  grd2.addColorStop(1, "#7c00ff");
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
});

Client.on('guildCreate', guild => {
    guild.systemChannel.send(`Coucou !`,{embed: {
      color: `42ff00`,
      author: {
        name: `Créateur : ${CreatorTag} ; ${Client.user.tag}`,
        icon_url: `https://i.ibb.co/TwgW11w/Logo-Xitef156-2-5.png`
      },
      title: `Xitef156`,
      url: `https://www.youtube.com/channel/UCDdDwCLs63dLZsUP7xz1QaA`,
      description: `Regardez mes vidéos [Youtube](https://www.youtube.com/channel/UCDdDwCLs63dLZsUP7xz1QaA)`,
      fields: [{
          name: `Teespring`,
          url: `https://teespring.com/fr/vetements-xitef-rouge`,
          value: `Regarder ma boutique sur [Teespring](https://teespring.com/fr/vetements-xitef-rouge)`
        },
        {
        name: `Discord`,
        value: `[Invite moi !](${Bot_link}) ou [Rejoin le serveur officiel](https://discord.gg/VsQG7ccj9t)`
      }
      ],
      timestamp: new Date(),
      footer: {
        icon_url: Client.user.displayAvatarURL(),
        text: `Team Dragon`
      }
    }
  })
});

Client.on(`message`,async message => {

const Prefix = db.get(`guild_${message.guild.id}_prefix`) || `,`
  const args = message.content.substring(Prefix.length).split(` `);

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
      Client.channels.cache.get(Ch_cmd).send(`**${P_author.tag}** a utilisé la commande : **${Prefix}prefix** ; Le prefix de **${P_guild}** est maintenant **${args[1]}**`)
    }

let command = args.shift().toLowerCase()
    
    if(message.content == Prefix + `help`){
        message.channel.send(
        Prefix + `**help** Cette liste apparait\n` + 
        Prefix + `**prefix** Change le prefix du bot pour le serveur\n` + 
        Prefix + `**stat** Statistiques du joueur\n` + 
        Prefix + `**role** Créer un changement pour les roles dans le serveur\n` + 
        Prefix + `**join** Le bot vient dans votre vocal\n` + 
        Prefix + `**leave** Le bot quitte votre vocal\n` + 
        Prefix + `**play** Le bot joue de la musique dans votre vocal\n` + 
        Prefix + `**membercount** Affiche le nombre de joueur sur le serveur\n` + 
        Prefix + `**invite** (* bot , server *) Donne en mp l'url du bot/serveur\n` + 
        Prefix + `**ban** Permet de Ban le joueur mentionné du serveur\n` + 
        Prefix + `**kick** Permet de Kick le joueur mentionné du serveur\n` + 
        Prefix + `**clear** (*__nombre de message à supprimer__*) Retire les messages\n` + 
        Prefix + `**pres** Présente le bot\n` + 
        Prefix + `**maths** ( + , - , * , / , mod , pow , root ) Fait des maths\n` + 
        Prefix + `**say** Fait parler le bot`)
        Client.channels.cache.get(Ch_cmd).send(`**${message.author.tag}** a utilisé la commande : **${Prefix}help** dans **${message.guild.name}**`)
    }

    if(message.content == Prefix + `pres`){
      Client.channels.cache.get(Ch_cmd).send(`**${message.author.tag}** a utilisé la commande : **${Prefix}pres** dans **${message.guild.name}**`)
      message.channel.send({embed: {
          color: `42ff00`,
          author: {
            name: `Créateur : ${CreatorTag} ; ${Client.user.tag}`,
            icon_url: `https://i.ibb.co/TwgW11w/Logo-Xitef156-2-5.png`
          },
          title: `Xitef156`,
          url: `https://www.youtube.com/channel/UCDdDwCLs63dLZsUP7xz1QaA`,
          description: `Regardez mes vidéos [Youtube](https://www.youtube.com/channel/UCDdDwCLs63dLZsUP7xz1QaA)`,
          fields: [{
              name: `Teespring`,
              url: `https://teespring.com/fr/vetements-xitef-rouge`,
              value: `Regarder ma boutique sur [Teespring](https://teespring.com/fr/vetements-xitef-rouge)`
            },
            {
            name: `Discord`,
            value: `[Invite moi !](${Bot_link}) ou [Rejoin le serveur officiel](https://discord.gg/VsQG7ccj9t)`
          }
          ],
          timestamp: new Date(),
          footer: {
            icon_url: Client.user.displayAvatarURL(),
            text: `Team Dragon`
          }
        }
      })
  }

  if(message.content == Prefix + `ptdr`){
    message.delete()
    const Embed = new Discord.MessageEmbed()
      .setAuthor(`Nouveau Logo`)
      .setImage("https://media.discordapp.net/attachments/787081937248059445/833821421012123658/Logo_Zoo_des_Geeks_1.1.png?width=406&height=468")
      .setTimestamp()
      .setColor('#42ff00')
    message.channel.send(Embed)
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
      Client.channels.cache.get(Ch_cmd).send(`**${message.author.tag}** a utilisé la commande : **${Prefix}weather ${args[0]}** dans **${message.guild.name}**`)

    })

  }

    if (command === `maths`) {
        let op = args[1]
    let no1 = args[0]
    let no2 = args[2]

    let parseNo1 = parseInt(no1)
    let parseNo2 = parseInt(no2)

    let ans
    Client.channels.cache.get(Ch_cmd).send(`**${message.author.tag}** a utilisé la commande : **${Prefix}maths ${args[0]} ${args[1]} ${args[2]}** dans **${message.guild.name}**`)

    if (!op) {
      message.reply(`Vous devez entrer l'opération et les opérandes à côté de la commande comme : \`,maths 1 + 2\``)
    }
    else {
      if (op === `+`) {
        if (args[0] === `Charlotte`){
          if (args[2] === `génie`){
            message.channel.send(`ça va bien ensemble`)
        }
      } else if (args[2] === `Charlotte`){
        if (args[0] === `génie`){
          message.channel.send(`ça va bien ensemble`)
      }
    } else if (args[0] === `Martin`){
      if (args[2] === `génie`){
        message.channel.send(`ça va bien ensemble`)
    }
  } else if (args[2] === `Martin`){
    if (args[0] === `génie`){
      message.channel.send(`ça va bien ensemble`)
  }
} else if (!args[0] || !args[2]) {
  message.reply(`Vous devez entrer l'opération et les opérandes à côté de la commande comme : \`,maths 1 + 2\``)
}
          else {
              ans = parseNo1 + parseNo2
              if (ans === 0){
                message.channel.send(`La tête à toto ptdr`)
              } else if (ans === 69){
                message.channel.send(`http://www.sexologie-couple.com/wp-content/uploads/2007/11/69.jpg`)
              }
              else {
              message.channel.send(`Réponse : ` + ans)
            }
        }
      }

      else if (op === `-`) {
      if (!args[0] || !args[2]) {
          message.reply(`Vous devez entrer l'opération et les opérandes à côté de la commande comme : \`,maths 1 - 2\``)
        }
        else {
          ans = parseNo1 - parseNo2
          if (ans === 69){
            message.channel.send(`http://www.sexologie-couple.com/wp-content/uploads/2007/11/69.jpg`)
          } else {
          message.channel.send(`Réponse : ` + ans)
        }
      }
      }
      else if (op === `*`) {
        if (!args[0] || !args[2]) {
          message.reply(`Vous devez entrer l'opération et les opérandes à côté de la commande comme : \`,maths 1 * 2\``)
        }
        else {
          ans = parseNo1 * parseNo2
          if (ans === 69){
            message.channel.send(`http://www.sexologie-couple.com/wp-content/uploads/2007/11/69.jpg`)
          } else {
          message.channel.send(`Réponse : ` + ans)
        }
      }
      }
      else if (op === `/`) {
        if (!args[0] || !args[2]) {
          message.reply(`Vous devez entrer l'opération et les opérandes à côté de la commande comme : \`,maths 1 / 2\``)
        }
        else {
          ans = parseNo1 / parseNo2
          if (ans === 69){
            message.channel.send(`http://www.sexologie-couple.com/wp-content/uploads/2007/11/69.jpg`)
          } else {
          message.channel.send(`Réponse : ` + ans)
        }
      }
      }
      else if (op === `mod`) {
        if (!args[0] || !args[2]) {
          message.reply(`Vous devez entrer l'opération et les opérandes à côté de la commande comme : \`,maths 1 mod 2\``)
        }
        else {
          ans = parseNo1 % parseNo2
          message.channel.send(`Réponse : ` + ans)
        }
      }
      else if (op === `pow`) {
        if (!args[0] || !args[2]) {
          message.reply(`Vous devez entrer l'opération et les opérandes à côté de la commande comme : \`,maths 1 pow 2\``)
        }
        else {
          ans = Math.pow(parseNo1, parseNo2)
          message.channel.send(`Réponse : ` + ans)
        }
      }
      else if (op === `root`) {
        if (!args[0] || !args[2]) {
          message.reply(`Vous devez entrer l'opération et les opérandes à côté de la commande comme : \`,maths 1 root 2\``)
        }
        else {
          ans = Math.pow(parseNo1, 1/parseNo2)
          message.channel.send(`Réponse : ` + ans)
        }
      }
    }
}

if(message.content == Prefix + "link"){
  Client.generateInvite(['ADMINISTRATOR', 'VIEW_AUDIT_LOG', 'KICK_MEMBERS', 'BAN_MEMBERS', 'SEND_MESSAGES', 'MANAGE_NICKNAMES', 'MANAGE_CHANNELS', 'MANAGE_MESSAGES', 'MANAGE_ROLES', 'MANAGE_GUILD', 'MENTION_EVERYONE']).then(link => {
  message.author.send(link)
  })
}

if(message.author.bot) return; // Les commandes en privé ne peuvent pa être reçu
if(message.channel.type == `dm`) return;

  if(message.guild.member(Client.user).hasPermission('MANAGE_ROLES')){
  var role = message.guild.roles.cache.find(role => role.name === "Dragon Bot");
      role.edit({
          color: '#42ff00'
      })
}

if(message.content.startsWith(Prefix + `canvas`)){
  const canvas = Canvas.createCanvas(150, 100);
  const ctx = canvas.getContext('2d');

  ctx.font = `${Font_Size - 80}px ${Font}`;
ctx.shadowOffsetX = 2;
ctx.shadowOffsetY = 2;
ctx.shadowBlur = 5;
ctx.shadowColor = '#53dad8';
ctx.fillStyle = `#0c00ff`;
ctx.strokeStyle = '#ffffff';
ctx.lineWidth = 5;
ctx.strokeText(`${args.join(` `)}`, 5, 50);
ctx.fillText(`${args.join(` `)}`, 5, 50);

const attachment = new Discord.MessageAttachment(canvas.toBuffer(), `${args.join(` `)}.png`)

  message.channel.send(attachment)
}

if(message.content.startsWith(Prefix + `canvas_c`)){
  const canvas = Canvas.createCanvas(args.join(` `).length * 400, 690);
  const ctx = canvas.getContext('2d');

  ctx.font = `700px ${Font}`;
ctx.shadowOffsetX = 20;
ctx.shadowOffsetY = 20;
ctx.shadowBlur = 50;
ctx.shadowColor = '#53dad8';
ctx.fillStyle = `#0c00ff`;
ctx.strokeStyle = '#ffffff';
ctx.lineWidth = 50;
ctx.strokeText(`${args.join(` `)}`, 100, 400);
ctx.fillText(`${args.join(` `)}`, 100, 400);

const attachment = new Discord.MessageAttachment(canvas.toBuffer(), `${args.join(` `)}.png`)

  message.channel.send(attachment)
}

    if(!message.member.hasPermission(`ADMINISTRATOR`) || AuthifCreator){
        if(message.content.startsWith(Prefix + `ban`)){
          Client.channels.cache.get(Ch_cmd).send(`**${message.author.tag}** a utilisé la commande : **${Prefix}ban** dans **${message.guild.name}**`)
            let mention = message.mentions.members.first();

            if(mention == undefined){
                    message.reply(`Membre non ou mal mentionné`);
            }
            else {
                if(mention.bannable){
                    mention.ban()
                    message.channel.send(mention.displayName.tag + ` a été banni avec succès`);
                }
                else {
                    message.reply(`Impossible de ban ce membre`);
                }
            }
        }
        else if(message.content.startsWith(Prefix + `kick`)){
          Client.channels.cache.get(Ch_cmd).send(`**${message.author.tag}** a utilisé la commande : **${Prefix}kick** dans **${message.guild.name}**`)
            let mention = message.mentions.members.first();
            
            if(mention == undefined){
                message.reply(`Membre non ou mal mentionné`);
            }
            else {
                if(mention.kickable){
                    mention.kick()
                    message.channel.send(mention.displayName.tag + ` a été kick avec succès`);
                }
                else {
                    message.reply(`Impossible de kick ce membre`);
                }
            }
        }
  }
    
    if(message.content == Prefix + `membercount` || message.content == Prefix + `mc`){
      Client.channels.cache.get(Ch_cmd).send(`**${message.author.tag}** a utilisé la commande : **${Prefix}memcount** dans **${message.guild.name}**`)
        const IDGGuild = Client.guilds.cache.find(guild => guild.id == message.guild.id);
        var memberCount = IDGGuild.memberCount;
        message.channel.send(`Nous sommes **${memberCount}** membres sur le serveurs (y compris moi)`);
    }

    if(message.content.startsWith(Prefix + `role`)){
      Client.channels.cache.get(Ch_cmd).send(`**${message.author.tag}** a utilisé la commande : **${Prefix}role** **${args[1]} ${args[2]} ${args[3]}** dans **${message.guild.name}**`)
      if(!args[0]) return message.channel.send ("add ; remove ; delete ; create");
        if(args[0] == "add"){

          const mention = message.mentions.members.first();
          if(mention == undefined){
            message.reply(`Membre non ou mal mentionné`);
          } else {

            if(message.guild.roles.cache.find(role => role.name == `${args[2]}`)){
              let a_role = message.guild.roles.cache.find(role => role.name === `${args[2]}`);
              mention.roles.add(a_role.id)
              message.channel.send(`${mention} a eu le rôle ${a_role}`)
            } 
            else {
              message.reply(args[0] + ` as déjà ce rôle`)
            }
          }
        }
        if(args[0] == "remove"){

          const mention = message.mentions.members.first();
          if(mention == undefined){
            message.reply(`Membre non ou mal mentionné`);
          }  else {

          if(message.guild.roles.cache.find(role => role.name == args[2])){
            let r_role = message.guild.roles.cache.find(role => role.name === args[2]);
            mention.roles.remove(r_role.id)
            message.channel.send(`${mention} n'a plus le rôle ${r_role}`)
          } 
          else {
            message.reply(`Tu n'as pas ce rôle`)
          }
        }
      }
        
      if(args[0] == `delete`){
        if(message.guild.roles.cache.find(role => role.name == args[2])){
          if(message.member.hasPermission(`ADMINISTRATOR`) || AuthifCreator){
          const role_d = message.guild.roles.cache.find(role => role.name === args[2])
          role_d.delete()
          message.channel.send(`${args[1]} n'existe plus`)
        }
      } else {
          message.reply(`${role_d} n\'existe pas`)
        }
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
  Client.channels.cache.get(Ch_cmd).send(`**${message.author.tag}** a utilisé la commande : **${Prefix}list ${args[0]} ${args[1]}** dans **${message.guild.name}**`)
  if(args[1] === `name`, `id`){
    if(args[0] === `role`){
      if(args[1] === `name`){
      let Role_gn = message.guild.roles.cache.map(role => role.name);
      message.author.send(Role_gn)
      }
      else if(args[1] === `id`){
      let Role_gid = message.guild.roles.cache.map(role => role.id);
      message.author.send(Role_gid)
      }
    }
  } else {
    message.channel.send(`Précise **name** ou **id**`)
  }
}

      if(message.content.startsWith(Prefix + `clear`)){
        const amount = args.join(' '); // Amount of messages which should be deleted
        if(message.guild.ownerID !== message.author.id || message.author.id !== CreatorID) return message.channel.send (`Tu n\'es pas le chef du serveur`);
          Client.channels.cache.get(Ch_cmd).send(`**${message.author.tag}** a utilisé la commande : **${Prefix}clear ${args[0]}** dans **${message.channel.name}** de **${message.guild.name}**`)
          if(!amount){
          return message.channel.send('Vous n\'avez pas donné une quantité de messages qui devraient être supprimés !') // Checks if the `amount` parameter is given
          }
          if(isNaN(amount)){
              return message.channel.send('Le paramètre de quantité n\'est pas un nombre !') // Checks if the `amount` parameter is a number. If not, the command throws an error
          }
          if(amount > 100){
              return message.channel.send('Vous ne pouvez pas supprimer plus de 100 messages à la fois !') // Checks if the `amount` integer is bigger than 100
          }
          if(amount < 1){
              return message.channel.send('Vous devez supprimer au moins 1 message !') // Checks if the `amount` integer is smaller than 1
          }
          message.delete()
          const Messages = message.channel.messages.fetch({ limit: amount })
          message.channel.messages.fetch({ limit: amount }).then(messages => { // Fetches the messages
            Client.channels.cache.get(Ch_Logs_2).send(`Message supprimés de ${message.author.tag} : ${Messages}`)
              message.channel.bulkDelete(messages // Bulk deletes all messages that have been fetched and are not older than 14 days (due to the Discord API);
          )
        })
  }

    if(message.content == Prefix + `ping`){
        message.channel.send(`pong`)
        Client.channels.cache.get(Ch_cmd).send(`**${message.author.tag}** a utilisé la commande : **${Prefix}ping** dans **${message.guild.name}**`)
    }

    if(message.content.startsWith(Prefix + `invite`)){
      Client.channels.cache.get(Ch_cmd).send(`**${message.author.tag}** a utilisé la commande : **${Prefix}invite ${args[0]}** dans **${message.guild.name}**`)
      if(args[0] == `bot`){
        Client.generateInvite(['SEND_MESSAGES', 'MANAGE_GUILD', 'MENTION_EVERYONE']).then(link => {
        message.author.send(`${link}`);
    })
   } else if(args[0] == `server`){
        message.author.send(`https://discord.gg/VsQG7ccj9t`);
    } else {
      message.reply( Prefix + `bot ; ` + Prefix + `server` );
    }
  }

    if(command === `say`){
      message.channel.send(args.join(` `))
      Client.channels.cache.get(Ch_cmd).send(`**${message.author.tag}** a utilisé la commande : **${Prefix}say ${args.join(` `)}**`)
    }
    
    if(message.content.startsWith(Prefix + `stat`)){
      Client.channels.cache.get(Ch_cmd).send(`**${message.author.tag}** a utilisé la commande : **${Prefix}stat** ; **${mention.user.username}** qui a pour identifient : **${mention}** *ou* **${mention.user.tag}** 
      il a comme role : **${U_Role}** dans le serveur : **${message.guild.name}** dans **${message.guild.name}**`)
      let mention = message.mentions.members.first()
      if(!mention) return message.reply(`Membre non ou mal mentionné`)

      let U_Role = mention.roles.cache.map(role => role.name).join(` `);
    message.author.send(`**${mention.user.username}** qui a pour identifient : **${mention}** *ou* **${mention.user.tag}** 
    il a comme role : **${U_Role}** dans le serveur : **${message.guild.name}**`)
    }

    if(message.content == Prefix + `join`){
      const voiceChannel = message.member.voice.channel
      if(!voiceChannel) return message.channel.send(`Tu n\'es pas en vocal`)
      voiceChannel.join()
      Client.channels.cache.get(Ch_cmd).send(`**${message.author.tag}** a utilisé la commande : **${Prefix}join** pour que j'aille dans **${voiceChannel.name}** dans **${message.guild.name}**`)
    }

if(message.content.startsWith(Prefix + `play`)){
  const voiceChannel = message.member.voice.channel

  if(!message.member.voice.channel) return message.channel.send(`Tu dois être dans un vocal`);
  const permissions = voiceChannel.permissionsFor(message.member.user);
  if(!permissions.has('CONNECT')) return message.channel.send(`Tu n\'as pas les bonnes permissions`);
  if(!permissions.has('SPEAK')) return message.channel.send(`Tu n\'as pas les bonnes permissions`);
  if(!args.length) return message.channel.send(`Tu dois mettre un titre de video`)
        
  const connection = await voiceChannel.join()
  message.channel.send(`Recherche de **${args.join(' ')}**`)
  

            const videoFinder = async (query) => {
              const videoResult = await ytSearch(query)

              return (videoResult.videos.length > 1) ? videoResult.videos[0] : null
            }
            const video = await videoFinder(args.join(' '))

            if(video){
              const stream = ytdl(video.url, {filter: 'audioonly'});
              const dispatcher = connection.play(stream, { seek: 0, volume: 1})
              dispatcher.on('finish', () => {
                  voiceChannel.leave();
              });

              await message.channel.send(`:thumbsup: Joue maintenant ***${video.title}***`)
            } else {
              message.channel.send(`Pas de vidéo trouvée`)
            }
}
if(message.content == Prefix + `leave`){
  const voiceChannel = message.member.voice.channel
  if(!voiceChannel) return message.channel.send(`Tu dois être dans un vocal`);
  await voiceChannel.leave()
  message.channel.send(`Vocal quitté :smiling_face_with_tear:`)
  Client.channels.cache.get(Ch_cmd).send(`**${message.author.tag}** a utilisé la commande : **${Prefix}leave** pour que sorte de **${voiceChannel.name}** dans **${message.guild.name}**`)
}

if(message.content == Prefix + `left`){
  if(message.author.id !== message.guild.ownerID || AuthifNotCreator) return message.channel.send("Tu n'es pas le chef du serveur");
    await message.channel.send("Adieu...")
    message.guild.leave()
  }

if(message.content == Prefix){
  message.channel.send(`Tape une commande. Ex : ${Prefix}help`)
}

if(message.guild.id === `787081936719708221`) return;
if(message.guild.id == Gu_RG_ID){
  Client.channels.cache.get(Ch_Msg_RG).send(`Channel : **${message.channel.name}** : **${message.author.tag}** envoie : ${message}`);
} else if(!message.channel.name.includes(`bot-`)) {
Client.channels.cache.get(Ch_Msg).send(`Serveur : **${message.guild.name}**, Channel : **${message.channel.name}** : **${message.author.tag}** envoie : ${message}`)
}

});

Client.login(Token)
