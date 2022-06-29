const Discord = require('discord.js');const Voice = require('@discordjs/voice');const {SlashCommandBuilder} = require('@discordjs/builders');
const ytSearch = require('yt-search');
const weather = require('weather-js');
const {QuickDB} = require('quick.db');
require('better-sqlite3');
const db = new QuickDB();
const moment = require('moment');
const fs = require('fs');
const SoundCloud = require('soundcloud-scraper');
const ytdl = require('ytdl-core')

const SC = new SoundCloud.Client();
const Instent = Discord.Intents.FLAGS
const Client = new Discord.Client({ intents: [
  Instent.GUILDS,
  Instent.GUILD_INTEGRATIONS,
  Instent.GUILD_MESSAGE_REACTIONS,
  Instent.GUILD_MESSAGE_TYPING,
  Instent.DIRECT_MESSAGES,
  Instent.DIRECT_MESSAGE_TYPING,
  Instent.DIRECT_MESSAGE_REACTIONS,
  Instent.GUILD_MEMBERS,
  Instent.GUILD_VOICE_STATES,
  Instent.GUILD_BANS,
  Instent.GUILD_EMOJIS_AND_STICKERS,
  Instent.GUILD_INVITES,
  Instent.GUILD_INTEGRATIONS,
  Instent.GUILD_WEBHOOKS,
  Instent.GUILD_SCHEDULED_EVENTS,
  Instent.GUILD_PRESENCES
],
makeCache: Discord.Options.cacheWithLimits({
  interactionManager: 200,
  PresenceManager: 1,
}), allowedMentions: { parse: ['users', 'roles', 'everyone'], repliedUser: true }
});

const queue = new Map();
const React = new Map();
const player = Voice.createAudioPlayer();

const Bot_Color = `#42ff00`
const Ch_Err = '834751451090911292'
moment.locale('fr');

async function play(channel, guild){
  var Songs = await queue.get(guild.id)
  var Song = await Songs[0];
  if (!Song) {
    connection.destroy();
    queue.delete(guild);
    return;
  }
  async function Audio(song){
  if(song.type == 'sc') {
    SC.getSongInfo(song.url).then(async Song => {
    await Song.downloadProgressive().then(stream => Play(stream))
  })
}
  else {
    var Stream = await ytdl(song.url,{filter : 'audioonly', quality: 'highest', highWaterMark: 1<<25})
    await Play(Stream)
  }
}
Audio(Song)
  async function Play(stream){
    var connection = await Voice.getVoiceConnection(guild.id)
  var STREAM = await Voice.createAudioResource(stream)
  await connection.subscribe(player);
  await player.play(STREAM)
  player.on(Voice.AudioPlayerStatus.Idle, async () => {
    var Loop = await db.get(`guild_${channel.guild}_Music_Looping`)
    if(Loop == true) return play(channel, guild);
    await Songs.shift();
    if(!Songs[0]) {
      connection.destroy();
      queue.delete(channel.guild);
    } else Audio(Songs[0]);
    })
  }
}

function youtube_parser(url = String){
  var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
  var match = url.match(regExp);
  return (match&&match[7].length==11)? match[7] : url;
}

const songFinder = async (search) => {
    return new Promise((resolve, reject) => {
    var ARGS = search.replace('sc ', '').replace('soundlcoud', '').replace('  ', ' ').replace('  ', ' ')
    if(search.includes(`soundcloud.com`)){
        if(ARGS.includes(`?in=`)) var Args = ARGS.substring(0, ARGS.indexOf(`?in=`)).replace(' ', '')
        else var Args = ARGS.replace(' ', '')
        SC.getSongInfo(Args).then((data,err) => {
          if(err) {
            reject(err)
            return;
          } else resolve(data)
        })
    }
    else {
        SC.search(ARGS).then(Song => {
          SC.getSongInfo(Song[0].url).then(song => resolve(song))
        })
      }
    })
}

const videoFinder = async (search) => {
  var Search = await youtube_parser(search)
  if(Search.length === 11) var videoResult1 = await ytSearch({ videoId: `${Search}` })
  else var videoResult2 = await ytSearch({ query: `${Search}` })
  if(videoResult1) return videoResult1
  else if(videoResult2) return videoResult2.videos[0];
  else {
    var videoResult3 = await ytSearch({ query: `${Search}` });
    return videoResult3.videos[0];
  }
}

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

async function Unban(member,guild,ms,user,now){
  var G = Client.guilds.cache.get(guild)
  await sleep(ms)
  await G.bans.remove(member)
  Client.users.cache.get(user).send(`<@${member.user.id}> que vous avez banni sur ${G.name} le ${now} a été débanni`)

}

const Weather = new SlashCommandBuilder()
.setName('weather')
.setDescription("Indique la météo d'une ville")
.addStringOption(city => city
  .setName('ville')
  .setDescription('Marque le nom de ta ville')
  .setRequired(true))
  .addStringOption(country =>(country
    .setName('pays')
    .setDescription('Indique la pays de ta ville')
    .setRequired(true)
  ))

const Maths = new SlashCommandBuilder()
.setName('maths')
.setDescription('Fais des maths')
.addNumberOption(num1 => num1
  .setName('num1')
  .setDescription('Choisis un premier nombre')
  .setRequired(true))
  .addStringOption(symbol => symbol
    .setName('signe')
    .setDescription("Choisis le signe de l'opération")
    .setRequired(true)
    .addChoices({name:'+ (Addition)',value:'+'},{name:'- (Soustraction)',value:'-'},{name:'* (Multiplication)',value:'*'},{name:'/ (division)',value:'/'},{name:'mod (modulo)',value:'mod'},{name:'pow (puissance)',value:'pow'},{name:'root (Racine)',value:'root'}))
    .addNumberOption(num2 => num2
      .setName('num2')
      .setDescription('Choisis le deuxième numbre')
      .setRequired(true))

const Link = new SlashCommandBuilder()
.setName('link')
.setDescription('Vous envoie le lien du bot')

const Role = new SlashCommandBuilder()
.setName('role')
.setDescription('Ajoute un rôle par Embed')
.addStringOption(role => role
  .setName('desc')
  .setDescription("Description des rôles (description_role1 ; description_role2 ; description_role3 ; ...)")
  .setRequired(true))
  .addStringOption(id => id
    .setName('ids')
    .setDescription('Mets les ids (id_role1 ; id_role2 ; is_role3 ; ...)')
    .setRequired(true))
    .addStringOption(emoji => emoji
      .setName('emoji')
      .setDescription('Emoji de réaction (emoji_role_1 ; emoji_role_2 ; emoji_role_3 ; ...)')
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

const List = new SlashCommandBuilder()
.setName('list')
.setDescription('Donne la liste')
.addStringOption(list => list
  .setName('type')
  .setDescription('Choisis le type de liste')
  .setRequired(true)
  .addChoices({name:'Role',value:'role'},{name:'Membre',value:'member'}))

const Say = new SlashCommandBuilder()
.setName('say')
.setDescription('Fait parler le bot')
.addStringOption(msg => msg
  .setName('msg')
  .setDescription('interaction à dire')
  .setRequired(true))
  .addChannelOption(channel => channel
    .setName('salon')
    .setDescription("Indique sur quel salon je l'envoie (si vide je l'envoie içi)"))

const TempBan = new SlashCommandBuilder()
.setName('tempban')
.setDescription('Ban temporairement un membre')
.setDefaultPermission(false)
.addUserOption( user => user
  .setName('membre')
  .setDescription('Les membre a bannir')
  .setRequired(true))
  .addNumberOption(minute => minute
    .setName('minute')
    .setDescription('Nombres de minutes avant le bannisement')
    .setRequired(true))
    .addNumberOption(hour => hour
      .setName('heure')
      .setDescription("Nombres d'heures' avant le bannisement"))
      .addNumberOption(days => days
        .setName('jour')
        .setDescription('Nombres de jours avant le bannisement'))
        .addStringOption(reason => reason
          .setName('raison')
          .setDescription('Raison du bannisement'))
        
const Clear = new SlashCommandBuilder()
.setName('clear')
.setDescription('Nettoie le salon de interactions')
.addNumberOption(num => num
  .setName('nombre')
  .setDescription('Nombre de interactions à détruire')
  .setRequired(true))

const Join = new SlashCommandBuilder()
.setName('join')
.setDescription('Je rejoin ton salon vocal si possible')

const Leave = new SlashCommandBuilder()
.setName('leave')
.setDescription('Quitte le salon vocal si possible')

const Skip = new SlashCommandBuilder()
.setName('skip')
.setDescription('Saute la musique en cours si possible')

const Queue = new SlashCommandBuilder()
.setName('queue')
.setDescription("Montre la file d'attente de musique en cours si possible")

const Loop = new SlashCommandBuilder()
.setName('loop')
.setDescription('Active/Désactive la boucle de musique')
.addBooleanOption(on => on
  .setName('etat')
  .setDescription("Choisis l'état de la boucle"))

const Volume = new SlashCommandBuilder()
.setName('volume')
.setDescription('Modifie le volume de bot')
.addNumberOption(vol => vol
  .setName('nombre')
  .setDescription('nombre du volume'))

const Search = new SlashCommandBuilder()
.setName('search')
.setDescription('Recherche des vidéos/musique sur Youtube ou Soundcloud')
.addStringOption(s => s
  .setName('recherche')
  .setDescription('Mot-clés pour la recherche')
  .setRequired(true))
  .addStringOption(type => type
    .setName('type')
    .setDescription('Choisis la plateforme')
    .setRequired(true)
    .addChoices({name:'Youtube',value:'Youtube'},{name:'SoundCloud',value:'SoundCloud'}))
    .addNumberOption(nmb => nmb
      .setName('nombre')
      .setDescription("Nombre d'éléments de la recherche")
      .setRequired(true))

const Play = new SlashCommandBuilder()
.setName('play')
.setDescription('Joue de la musique en vocal')
.addStringOption(type => type
  .setName('type')
  .setDescription('Type de plateforme')
  .addChoices({name: 'Youtube', value:'Youtube'},{name:'SoundCloud',value:'SoundCloud'})
  .setRequired(true))
  .addStringOption(query => query
    .setName('recherche')
    .setDescription('Mot-clés de la recherche')
    .setRequired(true))

const Support = new SlashCommandBuilder()
.setName('support')
.setDescription('Envoie à mon créateur un problème ou une idée sur mon fonctionnement')
.addStringOption(type => type
  .setName('type')
  .setDescription('Une idée ou un problème')
  .addChoices({name: 'Idée', value:'Idée'},{name:'Problème',value:'Problème'})
  .setRequired(true))
  .addStringOption(msg => msg
    .setName('message')
    .setDescription('Message à transmettre')
    .setRequired(true))

Client.on(`ready`, async () => {
  const express = require('express');
  const app = express();
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
  var dir = './Guilds_Bot';
  var Perm = Discord.Permissions.FLAGS
  if (!fs.existsSync(dir)) fs.mkdirSync(dir);
  console.log('Coucou')
  console.log(`\x1b[32m\x1b[1mJe suis dans ${Client.guilds.cache.size} serveurs`)
  try {
    await Client.application.commands.create(Weather)
    await Client.application.commands.create(Maths)
    await Client.application.commands.create(Link)
    await Client.application.commands.create(Role)
    await Client.application.commands.create(List)
    await Client.application.commands.create(Say)
    await Client.application.commands.create(TempBan)
    await Client.application.commands.create(Clear)
    await Client.application.commands.create(Join)
    await Client.application.commands.create(Leave)
    await Client.application.commands.create(Skip)
    await Client.application.commands.create(Queue)
    await Client.application.commands.create(Loop)
    await Client.application.commands.create(Volume)
    await Client.application.commands.create(Search)
    await Client.application.commands.create(Play)
    await Client.application.commands.create(Support)
    console.log('Commandes installés')
  }catch(e) {
    console.log('Erreur')
    console.log(e)
  }
setInterval(() => {
  var date = moment().format('Do MMMM YYYY');
  Client.user.setActivity(`${date}`)
}, 30000);
await Client.guilds.cache.forEach(async guild => {
  var obj = JSON.parse(fs.readFileSync(`./Guilds_Bot/${guild.id}.json`));
  await [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].forEach(async (count) => {
    if(count == 1 && await db.get(`guild_${guild.id}_Message-1`) == undefined)await db.set(`guild_${guild.id}_Message-1`, obj.Channels.Message1)
    if(count == 2 && await db.get(`guild_${guild.id}_Message-2`) == undefined)await db.set(`guild_${guild.id}_Message-2`, obj.Channels.Message2)
    if(count == 3 && await db.get(`guild_${guild.id}_Voice`) == undefined)await db.set(`guild_${guild.id}_Voice`, obj.Channels.Voice)
    if(count == 4 && await db.get(`guild_${guild.id}_Logs`) == undefined)await db.set(`guild_${guild.id}_Logs`, obj.Channels.Logs)
    if(count == 5 && await db.get(`guild_${guild.id}_Role`) == undefined)await db.set(`guild_${guild.id}_Role`, obj.Channels.Role)
    if(count == 6 && await db.get(`guild_${guild.id}_Channel`) == undefined)await db.set(`guild_${guild.id}_Channel`, obj.Channels.Channel)
    if(count == 7 && await db.get(`guild_${guild.id}_Nickname`) == undefined)await db.set(`guild_${guild.id}_Nickname`, obj.Channels.Nickname)
    if(count == 8 && await db.get(`guild_${guild.id}_Clear`) == undefined)await db.set(`guild_${guild.id}_Clear`, obj.Channels.Clear)
    if(count == 9 && await db.get(`guild_${guild.id}_Infos`) == undefined)await db.set(`guild_${guild.id}_Infos`, obj.Channels.Infos)
    if(count == 10 && await db.get(`guild_${guild.id}_MemberCount`) == undefined)await db.set(`guild_${guild.id}_MemberCount`, obj.Channels.MemberCount)
    if(count == 11 && await db.get(`guild_${guild.id}_MemberAdd`) == undefined)await db.set(`guild_${guild.id}_MemberAdd`, obj.Custom.Welcome_Ch)
    if(count == 12 && await db.get(`guild_${guild.id}_Memberwelcome`) == undefined)await db.set(`guild_${guild.id}_Memberwelcome`, obj.Custom.Welcome)
    if(count == 13 && await db.get(`guild_${guild.id}_MemberRemove`) == undefined)await db.set(`guild_${guild.id}_MemberRemove`, obj.Custom.Left_Ch)
    if(count == 14 && await db.get(`guild_${guild.id}_Memberleft`) == undefined)await db.set(`guild_${guild.id}_Memberleft`, obj.Custom.Left)
    if(count == 15 && await db.get(`guild_${guild.id}_prefix`) == undefined)await db.set(`guild_${guild.id}_prefix`, obj.Prefix)
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
})
db.set(`guild_787081936719708221_prefix`, ",")
	process.on('uncaughtException', error => {
  Client.channels.cache.get(Ch_Err).send(`**${moment().format('H:mm:ss')}** Erreur : ${error}`)
  console.log(error)
});
});

Client.on('interactionCreate', async interaction => {
  if(interaction.commandName === 'weather'){
    const city = interaction.options.data[0].value
    const country = interaction.options.data[1].value
    weather.find({search: `${city}, ${country}`, degreeType: `C`}, function(error, result){
      if (error) return interaction.reply(error)
      if (error) return Client.channels.cache.get(Ch_Err).send(`Erreur de la commande *weather* : **${error}**`)
      if (!city) return interaction.reply(`Vous n'avez pas entré le nom du lieu dont vous souhaitez connaître la météo.`)
      if (result === undefined || result.length === 0) return interaction.reply(`Vous n'avez pas spécifié de lieu valide`)
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
      interaction.reply({ embeds: [embed]})
  })
}
if(interaction.commandName === 'maths') {
  const args = interaction.options.data
  let op = args[1].value
  let no1 = args[0].value
  let no2 = args[2].value
  let parseNo1 = parseInt(no1)
  let parseNo2 = parseInt(no2)
  let xD = `Vous devez entrer l'opération et les opérandes à côté de la commande comme : `
  let ans
  if (!op) return interaction.reply(`${xD}\`,maths 1 + 2\``)
  if (!args[0] || !args[2]) return interaction.reply(`${xD}\`,maths 1 ${args[1]} 2\``)
    if (op === `+`) ans = parseNo1 + parseNo2
    else if (op === `-`) ans = parseNo1 - parseNo2
    else if (op === `*`) ans = parseNo1 * parseNo2
    else if (op === `/`) ans = parseNo1 / parseNo2
    else if (op === `mod`) ans = parseNo1 % parseNo2
    else if (op === `pow`) ans = Math.pow(parseNo1, parseNo2)
    else if (op === `root`) ans = Math.pow(parseNo1, 1/parseNo2)
    setTimeout(function () {
      interaction.reply(`Réponse : ` + ans)
  }, 25)
}
if(interaction.commandName === 'link') {
  var Perm = Discord.Permissions.FLAGS
  interaction.reply(
  Client.generateInvite({ scopes: ['bot'], permissions: [Perm.ADMINISTRATOR, Perm.VIEW_AUDIT_LOG, Perm.KICK_MEMBERS, Perm.BAN_MEMBERS, Perm.SEND_MESSAGES, Perm.MANAGE_NICKNAMES, Perm.MANAGE_CHANNELS, Perm.MANAGE_MESSAGES, Perm.MANAGE_ROLES, Perm.MANAGE_GUILD, Perm.MENTION_EVERYONE]
  }))
}
if(interaction.commandName === 'role') {
  const str = interaction.options.data
  const Desc = interaction.options.getString('desc').split(` ; `)
  const Id = interaction.options.getString('ids').split(` ; `)
  const Emoji = interaction.options.getString('emoji').split(` ; `)
  const Title = interaction.options.getString('titre')
  const Descript = interaction.options.getString('description')
  const Thumb = interaction.options.getString('miniature')
  if(Id.length !== Emoji.length) return interaction.reply(`Il n'y a pas le même nombre de rôle que d'émojis`)
  if(Desc.length !== Emoji.length) return interaction.reply(`Il n'y a pas le même nombre d'émojis que de description`)
  if(Desc.length !== Id.length) return interaction.reply(`Il n'y a pas le même nombre de rôle que de description`)
  Id.forEach(role => { if(isNaN(role)) return interaction.reply(`Il y a des rôles qui ne sont pas des id`) })
  Emoji.forEach(emo => { if(emo.startsWith(`:`)) return interaction.reply(`Il y a des émojis qui commence pas par :`) })
  const Embed = new Discord.MessageEmbed()
  .setColor(Bot_Color)
  .setTimestamp()
  Id.forEach(role => { if(!interaction.guild.roles.fetch(role)) return interaction.reply(`${role} est inconnu`) })
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
    await interaction.reply('Pong!');
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
if(interaction.commandName === 'list') {
  await interaction.reply('Ok')
  await interaction.deleteReply()
  const Embed = new Discord.interactionEmbed
  Embed.setColor(`#42ff00`)
    if(interaction.options.getString('type') === `role`){
      const Role_g = interaction.guild.roles.cache.map(role => `**${role.toString()}** ; **${role.name}** en **${role.position}** position`);
      await Embed.setTitle(`Les ${interaction.guild.roles.cache.size} du serveur`)
      await Embed.setDescription(Role_g.join(' ; '))
      interaction.member.send({ embeds: [Embed]})
    }
    if(interaction.options.getString('type') === `member`){
      const Role_m = interaction.guild.members.cache.map(member => `**${member.toString()}** ; **${member.user.username}** ; **${member.user.tag}**`);
      await Embed.setTitle(`Les ${interaction.guild.members.cache.size} membres du serveur`)
      await Embed.setDescription(Role_m.join(' ; '))
      interaction.member.send({ embeds: [Embed]})
    }
}
if(interaction.commandName === 'say') {
  await interaction.reply('Envoie..')
  await interaction.deleteReply()
  Client.channels.cache.get(interaction.options.getChannel('salon').id || interaction.channelId).send(interaction.options.getString('msg'))
}
if(interaction.commandName === 'tempban') {
  if(interaction.member.permissions.toArray().includes(`ADMINISTRATOR`) || interaction.member.id === '776140752752869398'){
    var now = moment()
    var NOW = `${moment().format('lll')}`
        let member = interaction.options.getMember('membre')
        let reason = interaction.options.getString('raison')
        let min = interaction.options.getNumber('minute')
        let hour = interaction.options.getMember('heure')
        let day = interaction.options.getMember('jour')
        var hours = day * 24 + hour
        var mins = hours * 60 + min
        var s = mins * 60
        var ms = s * 1000
        var finish = now.add({milliseconds:ms})
        if(member == undefined)interaction.reply(`Membre non ou mal mentionné`);
        else {
            if(member.bannable && interaction.member.user.id != member.user.id){
                member.ban({reason: `${reason || 'Aucune raison'}\n\n(Par Dragon Bot et ${interaction.member.user.tag})`})
                Unban(member,interaction.guild.id,ms,interaction.member.user.id,NOW)
                interaction.reply(`<@${member.user.id}> a été banni avec succès ; Il sera débanni le ${finish.format('lll')}`);
            }
            else interaction.reply(`Impossible de ban ce membre`);
        }
} else interaction.reply("Tu n'es pas administrateur")
}
if(interaction.commandName === 'clear') {
  var amount = parseInt(interaction.options.getNumber('nombre')); // Amount of interactions which should be deleted
  var Reset = 0
  var Author = interaction.member.user.id
  if(interaction.member.user.id === '776140752752869398') var Reset = 1
  if(Author === interaction.guild.ownerId) var Reset = 1
  if(interaction.member.permissions.toArray().includes('ADMINISTRATOR')) var Reset = 1
  if(Reset === 0) return interaction.reply(`Tu n\'es pas le chef du serveur`);
    if(!amount) return interaction.reply('Vous n\'avez pas donné une quantité de interactions qui devraient être supprimés !') // Checks if the `amount` parameter is given
    if(isNaN(amount)) return interaction.reply('Le paramètre de quantité n\'est pas un nombre !') // Checks if the `amount` parameter is a number. If not, the command throws an error
    if(amount > 100) return interaction.reply('Vous ne pouvez pas supprimer plus de 100 interactions à la fois !') // Checks if the `amount` integer is bigger than 100
    if(1 > amount) return interaction.reply('Vous devez supprimer au moins 1 interaction !') // Checks if the `amount` integer is smaller than 1
    await interaction.reply('Ok ça marche')
    await interaction.deleteReply()
    interaction.channel.interactions.fetch({ limit: amount }).then(interactions => {
      try {
        interaction.channel.bulkDelete(interactions)
      }
      catch(e) {
        interaction.channel.send(`Impossible, erreur : ${e}`)
      }
    })
}
if(interaction.commandName === 'join') {
  if(!interaction.member.voice.channel.id) return interaction.reply(`Je ne suis n\'es pas en vocal`)
  if (!Client.voice.adapters.get(interaction.guild.id)) {
  await Voice.joinVoiceChannel({
    channelId: interaction.member.voice.channel.id,
    guildId: interaction.guild.id,
    adapterCreator: interaction.guild.voiceAdapterCreator
})
interaction.reply(`Salon ${interaction.member.voice.channel.name} rejoin avec succès`)
}
}
if(interaction.commandName === 'leave') {
  if(!interaction.member.voice.channel) return interaction.reply(`Tu dois être dans un vocal`);
    await player.stop()
  queue.delete(interaction.guild.id);
  Voice.getVoiceConnection(interaction.guild.id).destroy();
  interaction.reply(`Vocal quitté :smiling_face_with_tear:`)
}
if(interaction.commandName === 'skip') {
  var Songs = queue.get(interaction.guild.id);
  if(!Songs[0]) {
    await Voice.getVoiceConnection(interaction.guild.id).destroy();
    return interaction.reply(`Il y a rien a skip`)
  } else {
    await Songs.shift()
    await player.stop()
    await Voice.getVoiceConnection(interaction.guild.id).removeAllListeners()
    await play(interaction.guild.id)
  interaction.reply(`Skipped !`)
  }
}
if(interaction.commandName === 'queue') {
  var Songs = queue.get(interaction.guild.id);
if(!Songs) return interaction.reply(`Il y a rien a voir`)
const Queue = new Discord.MessageEmbed()
.setColor(`#00ffff`)
.setTitle(`Queue de ${interaction.guild.name}`)
await Songs.forEach((song, index) => Queue.addField(`${index + 1}:`, `[${song.title}](${song.url}) \nDe [${song.author.name}](${song.author.url})\n${song.duration}`))
await interaction.reply({ embeds: [Queue]})
}
if(interaction.commandName === 'loop') {
  var act = interaction.options.getBoolean('etat')
  if(act == undefined) return interaction.reply(`L'état de la boucle est ${await db.get(`guild_${interaction.guild.id}_Music_Looping`)}`)
  if(act == false) var De = 'Désactivation'
 await db.set(`guild_${interaction.guild.id}_Music_Looping`, act)
  interaction.reply(`${De || 'Activation'} de la boucle`)
}
if(interaction.commandName === 'volume') {
  var nmb = interaction.options.getNumber('nombre')
  if(!nmb) return interaction.reply(`Le volume du serveur est à ${await db.get(`guild_${interaction.guild.id}_Volume`) * 10}`)
 await db.set(`guild_${interaction.guild.id}_Volume`, nmb / 10)
  interaction.reply(`Le volume est maintenant de ${nmb}`)
}
if(interaction.commandName === 'search') {
  var Search = interaction.options.getString('recherche')
  var Type = interaction.options.getString('type')
  var Number = interaction.options.getNumber('nombre')
  if(Number != undefined) var result = Number
  else var result = 5
  if(Type == 'SoundCloud'){
    await SC.search(Search).then(async Songs => {
      var songs = Songs.slice( 0, result )
      if(!songs[0]) return interaction.reply(`Rien trouvé`)
      await songs.forEach(async (Song,index) => {
        await SC.getSongInfo(Song.url).then(async song => {
  const Search2 = new Discord.MessageEmbed()
  .setColor(Bot_Color)
  .setImage(song.thumbnail)
  .setTitle(`${songs.length || 1}/${result || 1} Résultats pour ${Search}`)
  await Search2.addField(`${index + 1} : ${song.title}`, `${song.author.name} (ID: ${song.id} ; Url: ${song.url}) ; ${song.duration} ; ${song.likes} Likes ; Date : ${song.age}`)
  await interaction.reply({ embeds: [Search2]})
        })
      })
})
  }
  else {
  var Video = await ytSearch({ search: Search })
  var videos = Video.videos.slice( 0, result )
  videos.forEach(async (video, index) => {
  const YTB = new Discord.MessageEmbed()
  .setColor(Bot_Color)
  .setImage(video.image)
  .setTitle(`${videos.length || 1}/${result || 1} Résultats pour ${Search}`)
  await YTB.addField(`${index + 1} : ${video.title}`, `${video.author.name} (${video.videoId}) ; ${video.timestamp} ; ${video.views} Vues ; Date : ${video.ago}`)
  await interaction.reply({ embeds: [YTB]})
})
  }
}
if(interaction.commandName === 'play') {
  var Type = interaction.options.getString('type')
  var Query = interaction.options.getString('recherche')
  if(!interaction.member.voice.channel) return interaction.reply(`Tu dois être dans un vocal`);
  const permissions = interaction.member.voice.channel.permissionsFor(interaction.member.user);
  if(!permissions.has('CONNECT')) return interaction.reply(`Tu n\'as pas les bonnes permissions`);
  if(!permissions.has('SPEAK')) return interaction.reply(`Tu n\'as pas les bonnes permissions`);
  var Songs = queue.get(interaction.guild.id);
              if (!Client.voice.adapters.get(interaction.guild.id)) {
              var connection = await Voice.joinVoiceChannel({
                channelId: interaction.member.voice.channel.id,
                guildId: interaction.guild.id,
                adapterCreator: interaction.guild.voiceAdapterCreator
            }).removeAllListeners()
          }

  if(Type === 'SoundCloud'){
    await interaction.reply(`Recherche de **${Query}** sur Soundcloud`)
      const song = await songFinder(Query)
            const New = new Discord.MessageEmbed()
            if(!song) return interaction.reply(`Rien trouvée`)
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
            if (!Songs) {
              var Song = [];
              queue.set(interaction.guild.id, Song);
              Song.push(SONG);
              New.setColor('#ff5d00')
              play(connection, interaction.guild)
            } else {
              queue.push(SONG);
              New.setColor('FUCHSIA')
            }
              New.setTimestamp()
		      .setThumbnail(song.thumbnail)
		      .setTitle(song.title)
		      .setAuthor({name: song.author.name})
		      .setURL(song.url)
		      .setFooter({ text: `Vidéo ID : ${song.id} ; Duration : ${song.duration}`})
              interaction.channel.send({ embeds : [New]})
            } else {
            await interaction.reply(`Recherche de **${Query}** sur Youtube`)
            const video = await videoFinder(Query);

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
                queue.set(interaction.guild.id, Songs);
                Songs.push(song);
                play(connection, interaction.guild);
                New.setColor('RED')
              } else {
                Songs.push(song);
                New.setColor(`#0xd677ff`)
              }
            New.setTimestamp()
            .setThumbnail(video.image)
            .setTitle(video.title)
            .setURL(video.url)
            .setAuthor({name: video.author.name})
            .setFooter({text: `Vidéo ID : ${video.videoId} ; Duration : ${video.timestamp}`});
            interaction.channel.send({ embeds : [New]})
          } else {
              interaction.reply(`Pas de vidéo trouvée`)
                   queue.delete(interaction.guild.id);
                   return;
                 }
                }
}
if(interaction.commandName === 'support') {
  var Type = interaction.options.getString('type')
  var Msg = interaction.options.getString('message')
  await Client.users.cache.get('776140752752869398').send(`${Type} de la part de <@${interaction.member.user.id}> sur ${interaction.guild.name} : \n\n${Msg}`)
  interaction.reply('Votre message a bien été envoyé, veuillez patientez')
}
});

Client.login(process.env.TOKEN)
