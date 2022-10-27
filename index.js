const Discord = require('discord.js'); const Voice = require('@discordjs/voice'); const { SlashCommandBuilder } = require('@discordjs/builders');
const ytSearch = require('yt-search');
const weather = require('weather-js');
const { QuickDB } = require('quick.db');
require('better-sqlite3');
const db = new QuickDB();
const moment = require('moment');
const fs = require('fs');
const SoundCloud = require('soundcloud-scraper');
const ytdl = require('ytdl-core'); require('ffmpeg-static')
const request = require('request');
var SpotifyWebApi = require('spotify-web-api-node');
const URL = require('url')
const https = require('https')

const clientID = process.env.Client_ID;
const secretKey = process.env.Secret_Key;
const redirect_uri = 'http://localhost:3000/callback';
var spotifyApi = new SpotifyWebApi({
  clientId: clientID,
  clientSecret: secretKey,
  redirectUri: redirect_uri
});
const express = require('express');
const app = express();
const port = 3000;
app.get('/', (req, res) => {
  res.send('Hello World!')
});
app.get('/token', function(req, resp) {
  resp.header('Access-Control-Allow-Origin', '*');
  resp.header('Access-Control-Allow-Headers', 'X-Requested-With');

  var client_id = clientID;
  var client_secret = secretKey;

  // your application requests authorization
  var authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    headers: {
      Authorization:
        'Basic ' +
        new Buffer.from(client_id + ':' + client_secret).toString('base64')
    },
    form: {
      grant_type: 'client_credentials'
    },
    json: true
  };

  request.post(authOptions, async function(error, response, body) {
    if (!error && response.statusCode === 200) {
      var access_token = body.access_token;
      spotifyApi.setAccessToken(access_token)
      await db.set('Access_Token', access_token)
      resp.json({ token: body.access_token });
    }
  });
});
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});
const SC = new SoundCloud.Client();
const Client = new Discord.Client({
  intents: new Discord.IntentsBitField(32767),
  partials: [
    Discord.Partials.Message,
    Discord.Partials.Channel,
    Discord.Partials.GuildMember,
    Discord.Partials.GuildScheduledEvent,
    Discord.Partials.Reaction,
    Discord.Partials.User,
    Discord.Partials.ThreadMember,
  ],
  makeCache: Discord.Options.cacheWithLimits({
    interactionManager: 200,
    PresenceManager: 1,
  }),
  allowedMentions: {
    parse: ['users', 'roles', 'everyone'],
    repliedUser: true
  },
});

var z = 0
const emb = new Discord.EmbedBuilder()
const queue = new Map();
const player = Voice.createAudioPlayer().setMaxListeners(30)

const Bot_Color = `#42ff00`
const Ch_Err = '834751451090911292'
moment.locale('fr');

async function play(guild) {
  var channel = await Voice.getVoiceConnection(guild)
  var sub = await channel.subscribe(player)
  async function Audio(song) {
    if (song.type == 'sc') {
      SC.getSongInfo(song.url).then(async Song => {
        await Song.downloadProgressive().then(stream => Play(stream))
      })
    }
    else if (song.type == 'ytb') {
      var Stream = await ytdl(song.url, { filter: 'audioonly', quality: 'highestaudio' })
      await Play(Stream)
    } else {
      https.get(song.audio, (stream) => Play(stream))
    }
  }
  Audio(await queue.get(guild)[0])
  async function Play(Stream) 
    const { stream, type } = await Voice.demuxProbe(Stream);
    var STREAM = await Voice.createAudioResource(stream, { inputType: type })
    await player.play(await STREAM)
    player.on(Voice.AudioPlayerStatus.Idle, async () => {
      var Loop = await db.get(`guild_${guild}_Music_Looping`)
      if (Loop == false) {
        await queue.get(guild).shift()
        if (await queue.get(guild)[0] == (undefined || null)) {
          (await Voice.getVoiceConnection(guild)).disconnect()
          sub.unsubscribe()
          await queue.delete(guild);
          return;
        } else Audio(await queue.get(guild)[0])
      } else Audio(await queue.get(guild)[0])
    })
  }
}

function youtube_parser(url = String) {
  var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
  var match = url.match(regExp);
  return (match && match[7].length == 11) ? match[7] : url;
}

const songFinder = async (search) => {
  return new Promise((resolve, reject) => {
    var ARGS = search.replace('sc ', '').replace('soundlcoud', '').replace('  ', ' ').replace('  ', ' ')
    if (search.includes(`soundcloud.com`)) {
      if (ARGS.includes(`?in=`)) var Args = ARGS.substring(0, ARGS.indexOf(`?in=`)).replace(' ', '')
      else var Args = ARGS.replace(' ', '')
      SC.getSongInfo(Args).then((data, err) => {
        if (err) {
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
  return new Promise(async (resolve, reject) => {
    var Search = await youtube_parser(search)
    if (Search.length === 11) ytSearch.search({ videoId: Search }, async function(err, video) {
      if (err) ytSearch.search(Search, async function(err, videos) {
        const video = videos.videos[0]
        if (err) reject(err)
        else {
          if (await db.get(`Thumbnail_${video.videoId}`) == undefined) await request(`https://img.youtube.com/vi/${video.videoId}/maxresdefault.jpg`, async (err, res) => {
            if (res.statusCode == 200) db.set(`Thumbnail_${video.videoId}`, `https://img.youtube.com/vi/${video.videoId}/maxresdefault.jpg`)
            else db.set(`Thumbnail_${video.videoId}`, `https://img.youtube.com/vi/${video.videoId}/hqdefault.jpg`)
          })
          resolve(video)
        }
      })
      else resolve(video)
    })
    else ytSearch({ query: `${Search}` }, async function(err, videos) {
      const video = videos.videos[0]
      if (err) reject(err)
      else {
        if (await db.get(`Thumbnail_${video.videoId}`) == undefined) await request(`https://img.youtube.com/vi/${video.videoId}/maxresdefault.jpg`, async (err, res) => {
          if (res.statusCode == 200) db.set(`Thumbnail_${video.videoId}`, `https://img.youtube.com/vi/${video.videoId}/maxresdefault.jpg`)
          else db.set(`Thumbnail_${video.videoId}`, `https://img.youtube.com/vi/${video.videoId}/hqdefault.jpg`)
        })
        resolve(video)
      }
    })
  })
}

const SpotSongFinder = async (search) => {
  return new Promise(async (resolve, reject) => {
    if (`${search}`.startsWith('http')) {
      var url = await URL.parse(search).path.replace('/', '').split('/')
      if (url[0] == 'track') var Res = await (await spotifyApi.getTrack(`${url[1]}`)).body
      else if (url[0] == 'album') var Res = await (await spotifyApi.getAlbumTracks(`${url[1]}`)).body.items[0]
      var RES = (await spotifyApi.searchTracks(`${Res.name}`)).body.tracks.items[0]
    } else var RES = await (await spotifyApi.searchTracks(`${search}`)).body.tracks.items[0]
    if (RES == undefined) reject('fail search');
    await request(`https://178-79-138-81.ip.linodeusercontent.com/api/v3/spotify/tracks/${RES.id}`, async function(err, res) {
      if (await res.statusCode !== 200) reject('fail res');
      else {
        const track = JSON.parse(res.body).track
        resolve({
          title: track.title,
          id: track.source.id,
          thumbnail: track.image.large,
          url: RES.external_urls.spotify,
          artist: RES.artists,
          duration: track.duration,
          audio: track.audio.link
        })
      }
    })
  })
}

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

async function Unban(member, guild, ms, user, now) {
  var G = Client.guilds.cache.get(guild)
  await sleep(ms)
  await G.bans.remove(member)
  Client.users.cache.get(user).send(`<@${member.user.id}> que vous avez banni sur ${G.name} le ${now} a été débanni`)

}

async function sep_seconds(totalSeconds) {
  var date = new Date(0);
  date.setSeconds(parseInt(totalSeconds).toFixed()); // specify value for SECONDS here
  var timeString = date.toISOString().substring(11, 19);
  var json = timeString.split(':')
  return {
    Hours: json[0],
    Minutes: json[1],
    Seconds: json[2],
    timestamp: timeString
  }
}

function SpotifyToken() {
  request('https://Dragon-Bot.xitef156.repl.co/token', async function(err, res, body) {
    if (!err && res.statusCode === 200) {
      var access_token = JSON.parse(body).token;
      spotifyApi.setAccessToken(access_token)
      await db.set('Access_Token', access_token)
      await sleep(3500 * 1000)
      SpotifyToken()
    } else SpotifyToken()
  })
}

const Weather = new SlashCommandBuilder()
  .setName('weather')
  .setDescription("Indique la météo d'une ville")
  .addStringOption(city => city
    .setName('ville')
    .setDescription('Marque le nom de ta ville')
    .setRequired(true))
  .addStringOption(country => (country
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
    .addChoices({ name: '+ (Addition)', value: '+' }, { name: '- (Soustraction)', value: '-' }, { name: '* (Multiplication)', value: '*' }, { name: '/ (division)', value: '/' }, { name: 'mod (modulo)', value: 'mod' }, { name: 'pow (puissance)', value: 'pow' }, { name: 'root (Racine)', value: 'root' }))
  .addNumberOption(num2 => num2
    .setName('num2')
    .setDescription('Choisis le deuxième numbre')
    .setRequired(true))

const Link = new SlashCommandBuilder()
  .setName('link')
  .setDescription('Vous envoie le lien du bot')

const List = new SlashCommandBuilder()
  .setName('list')
  .setDescription('Donne la liste')
  .addStringOption(list => list
    .setName('type')
    .setDescription('Choisis le type de liste')
    .setRequired(true)
    .addChoices({ name: 'Role', value: 'role' }, { name: 'Membre', value: 'member' }))

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
  .addUserOption(user => user
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
    .addChoices({ name: 'Youtube', value: 'Youtube' }, { name: 'SoundCloud', value: 'SoundCloud' }, { name: 'Spotify', value: 'Spotify' }))
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
    .addChoices({ name: 'Youtube', value: 'Youtube' }, { name: 'SoundCloud', value: 'SoundCloud' }, { name: 'Spotify', value: 'Spotify' })
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
    .addChoices({ name: 'Idée', value: 'Idée' }, { name: 'Problème', value: 'Problème' })
    .setRequired(true))
  .addStringOption(msg => msg
    .setName('message')
    .setDescription('Message à transmettre')
    .setRequired(true))

Client.on(`ready`, async () => {
  SpotifyToken()
  var dir = './Guilds_Bot';
  if (!fs.existsSync(dir)) fs.mkdirSync(dir);
  console.log(`Coucou ${process.version}`)
  console.log(`\x1b[32m\x1b[1mJe suis dans ${Client.guilds.cache.size} serveurs`)
  try {
    await Client.application.commands.create(Weather)
    await Client.application.commands.create(Maths)
    await Client.application.commands.create(Link)
    await Client.application.commands.create(List)
    await Client.application.commands.create(Say)
    await Client.application.commands.create(TempBan)
    await Client.application.commands.create(Clear)
    await Client.application.commands.create(Join)
    await Client.application.commands.create(Leave)
    await Client.application.commands.create(Skip)
    await Client.application.commands.create(Queue)
    await Client.application.commands.create(Loop)
    await Client.application.commands.create(Search)
    await Client.application.commands.create(Play)
    await Client.application.commands.create(Support)
  } catch (e) {
    console.log('Erreur')
    console.log(e)
  } finally {
    await z++
    await console.log('Commandes installés')
  }
  setInterval(() => {
    var date = moment().format('Do MMMM YYYY');
    Client.user.setActivity(`v2.0 ${date}`)
  }, 30000);
  process.on('uncaughtException', error => {
    if (error.message.includes('DiscordAPIError: Unknown interaction')) return;
    Client.channels.cache.get(Ch_Err).send(`**${moment().format('H:mm:ss')}** Erreur : ${error}`)
    console.log(error)
  });
});

Client.on('interactionCreate', async (interaction) => {
  if (interaction.type !== Discord.InteractionType.ApplicationCommand) return;
  if (interaction.channel.type == 'DM' || interaction.commandName === ('set' || 'role')) return;
  await interaction.deferReply();
  if (z == 0) return;
  else {
    async function Embed(content) {
      await emb.setTitle(content)
      await emb.setColor(Bot_Color)
      await interaction.editReply({ embeds: [emb] })
    }
    if (interaction.member == null && interaction.commandName !== ('link' || 'weather' || 'maths' || 'say' || 'support')) return Embed("Pas de commandes en DM (sauf /link ; /weather ; /maths ; /say et /support), invite moi sur un serveur d'abord")
    if (interaction.commandName === 'weather') {
      const city = interaction.options.getString('ville')
      const country = interaction.options.getString('pays')
      weather.find({ search: `${city}, ${country}`, degreeType: `C` }, async function(error, result) {
        if (error) return Embed(error)
        if (error) return Client.channels.cache.get(Ch_Err).send(`Erreur de la commande *weather* : **${error}**`)
        if (!city) return Embed(`Vous n'avez pas entré le nom du lieu dont vous souhaitez connaître la météo.`)
        if (result === undefined || result.length === 0) return Embed(`Vous n'avez pas spécifié de lieu valide`)
        let current = result[0].current
        let location = result[0].location
        const embed = new Discord.EmbedBuilder()
          .setTitle(`Affichage des informations météo pour ${current.observationpoint}`)
          .setDescription(current.skytext)
          .setThumbnail(current.imageUrl)
          .setColor(Bot_Color)
          .setTimestamp()
          .addFields({ name: `Temperature : `, value: current.temperature + `°C`, inline: true }, { name: `Vitesse du vent : `, value: current.winddisplay, inline: true }, { name: `Humidité : `, value: `${current.humidity}%`, inline: true }, { name: `Timezone : `, value: `UTC${location.timezone}`, inline: true })
        if (interaction.replied == true) return await interaction.channel.send({ embeds: [embed] })
        else return await interaction.editReply({ embeds: [embed] })
      })
    }
    if (interaction.commandName === 'maths') {
      let op = interaction.options.getString('signe')
      let no1 = interaction.options.getNumber('num1')
      let no2 = interaction.options.getNumber('num2')
      let parseNo1 = parseInt(no1)
      let parseNo2 = parseInt(no2)
      let xD = `Vous devez entrer l'opération et les opérandes à côté de la commande comme : `
      let ans
      if (!op) return Embed(`${xD}\`,maths 1 + 2\``)
      if (!args[0] || !args[2]) return Embed(`${xD}\`,maths 1 ${args[1]} 2\``)
      if (op === `+`) ans = parseNo1 + parseNo2
      else if (op === `-`) ans = parseNo1 - parseNo2
      else if (op === `*`) ans = parseNo1 * parseNo2
      else if (op === `/`) ans = parseNo1 / parseNo2
      else if (op === `mod`) ans = parseNo1 % parseNo2
      else if (op === `pow`) ans = Math.pow(parseNo1, parseNo2)
      else if (op === `root`) ans = Math.pow(parseNo1, 1 / parseNo2)
      setTimeout(function() {
        Embed(`Réponse : ` + ans)
      }, 25)
    }
    if (interaction.commandName === 'link') {
      var Perm = Discord.PermissionFlagsBits
      Embed(
        `${Client.generateInvite({ scopes: ['bot'], permissions: [Perm.Administrator, Perm.ViewAuditLog, Perm.BanMembers, Perm.SendMessages, Perm.ManageMessages, Perm.ManageRoles, Perm.MentionEveryone] })}`
      )
    }
    if (interaction.commandName === 'list') {
      const Embed = new Discord.EmbedBuilder()
      Embed.setColor(Bot_Color)
      if (interaction.options.getString('type') === `role`) {
        const Role_g = interaction.guild.roles.cache.map(role => `**${role.toString()}** ; **${role.name}** en **${role.position}** position`);
        await Embed.setTitle(`Les ${interaction.guild.roles.cache.size} du serveur`)
        await Embed.setDescription(Role_g.join(' ; '))
        interaction.member.send({ embeds: [Embed] })
      }
      if (interaction.options.getString('type') === `member`) {
        const Role_m = interaction.guild.members.cache.map(member => `**${member.toString()}** ; **${member.user.username}** ; **${member.user.tag}**`);
        await Embed.setTitle(`Les ${interaction.guild.members.cache.size} membres du serveur`)
        await Embed.setDescription(Role_m.join(' ; '))
        interaction.member.send({ embeds: [Embed] })
      }
    }
    if (interaction.commandName === 'say') Client.channels.cache.get(interaction.options.getChannel('salon').id || interaction.channelId).send(interaction.options.getString('msg'))
    if (interaction.commandName === 'tempban') {
      if (interaction.member.permissions.toArray().includes(`ADMINISTRATOR`) || interaction.member.id === '776140752752869398') {
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
        var finish = now.add({ milliseconds: ms })
        if (member == undefined) Embed(`Membre non ou mal mentionné`);
        else {
          if (member.bannable && interaction.member.user.id != member.user.id) {
            member.ban({ reason: `${reason || 'Aucune raison'}\n\n(Par Dragon Bot et ${interaction.member.user.tag})` })
            Unban(member, interaction.guild.id, ms, interaction.member.user.id, NOW)
            Embed(`<@${member.user.id}> a été banni avec succès ; Il sera débanni le ${finish.format('lll')}`);
          }
          else Embed(`Impossible de ban ce membre`);
        }
      } else Embed("Tu n'es pas administrateur")
    }
    if (interaction.commandName === 'clear') {
      var amount = parseInt(interaction.options.getNumber('nombre')); // Amount of interactions which should be deleted
      var Reset = 0
      var Author = interaction.member.user.id
      if (interaction.member.user.id === '776140752752869398') var Reset = 1
      if (Author === interaction.guild.ownerId) var Reset = 1
      if (interaction.member.permissions.toArray().includes('ADMINISTRATOR')) var Reset = 1
      if (Reset === 0) return Embed(`Tu n\'es pas le chef du serveur`);
      if (!amount) return Embed('Vous n\'avez pas donné une quantité de interactions qui devraient être supprimés !') // Checks if the `amount` parameter is given
      if (isNaN(amount)) return Embed('Le paramètre de quantité n\'est pas un nombre !') // Checks if the `amount` parameter is a number. If not, the command throws an error
      if (amount > 100) return Embed('Vous ne pouvez pas supprimer plus de 100 interactions à la fois !') // Checks if the `amount` integer is bigger than 100
      if (1 > amount) return Embed('Vous devez supprimer au moins 1 interaction !') // Checks if the `amount` integer is smaller than 1
      interaction.channel.interactions.fetch({ limit: amount }).then(interactions => {
        try {
          interaction.channel.bulkDelete(interactions)
        }
        catch (e) {
          interaction.channel.send(`Impossible, erreur : ${e}`)
        }
      })
    }
    if (interaction.commandName === 'join') {
      if (!interaction.member.voice.channel.id) return Embed(`Je ne suis n\'es pas en vocal`)
      if (!Client.voice.adapters.get(interaction.guild.id)) {
        await Voice.joinVoiceChannel({
          channelId: interaction.member.voice.channel.id,
          guildId: interaction.guild.id,
          adapterCreator: interaction.guild.voiceAdapterCreator
        })
        Embed(`Salon ${interaction.member.voice.channel.name} rejoin avec succès`)
      }
    }
    if (interaction.commandName === 'leave') {
      if (!interaction.member.voice.channel) return Embed(`Tu dois être dans un vocal`);
      await queue.delete(interaction.guild.id);
      await player.stop()
      Embed(`Vocal quitté :smiling_face_with_tear:`)
    }
    if (interaction.commandName === 'skip') {
      var Songs = await queue.get(interaction.guild.id);
      if (!Songs[0]) return Embed(`Il y a rien a skip`)
      else {
        await Songs.shift()
        await player.stop()
        Embed(`Skipped !`)
      }
    }
    if (interaction.commandName === 'queue') {
      var Songs = queue.get(interaction.guild.id);
      if (!Songs) return Embed(`Il y a rien a voir`)
      const Queue = new Discord.EmbedBuilder()
      if (await db.get(`guild_${interaction.guild.id}_Music_Looping`)) {
        var loop = ' Boucle activé'
        Queue.setColor('#00FF55')
      }
      else Queue.setColor(`#00ffff`)
      Queue.setTitle(`Queue de ${interaction.guild.name} (Temps: ${(await sep_seconds(player.state.playbackDuration / 1000)).timestamp.replace(/00:/g, '')})${loop || ``}`)
      await Songs.forEach((song, index) => {
        if (song.type == 'stf') Queue.addFields({ name: `${index + 1}:`, value: `[${song.title}](${song.url}) \nDe ${song.author.name.map((o, index) => `[${song.author.name[index]}](${song.author.url[index]})`)}\n${song.duration}` })
        else Queue.addFields({ name: `${index + 1}:`, value: `[${song.title}](${song.url}) \nDe [${song.author.name}](${song.author.url})\n${song.duration}` })
      })
      if (interaction.replied == true) return await interaction.channel.send({ embeds: [Queue] })
      else return await interaction.editReply({ embeds: [Queue] })
    }
    if (interaction.commandName === 'loop') {
      var act = interaction.options.getBoolean('etat')
      if (act == undefined) return Embed(`L'état de la boucle est ${await db.get(`guild_${interaction.guild.id}_Music_Looping`)}`)
      if (act == false) var De = 'Désactivation'
      await db.set(`guild_${interaction.guild.id}_Music_Looping`, act)
      await Embed(`${De || 'Activation'} de la boucle`)
    }
    if (interaction.commandName === 'search') {
      var Search = interaction.options.getString('recherche')
      var Type = interaction.options.getString('type')
      var Number = interaction.options.getNumber('nombre')
      if (Number != undefined) var result = Number
      else var result = 5
      if (Search.startsWith('http')) return Embed('Tu ne peux pas rechercher par lien, seulement par mots')
      if (Type == 'SoundCloud') {
        await SC.search(Search).then(async Songs => {
          var songs = Songs.slice(0, result)
          if (!songs[0]) return Embed(`Rien trouvé`)
          await songs.forEach(async (Song, index) => {
            await SC.getSongInfo(Song.url).then(async song => {
              Embed(`Résultats pour ${Search}`)
              const Search2 = new Discord.EmbedBuilder()
                .setColor(Bot_Color)
                .setImage(song.thumbnail)
                .setTitle(`${songs.length || 1}/${result || 1} `)
              await Search2.addFields({ name: `${index + 1} : ${song.title}`, value: `${song.author.name} (ID: ${song.id} ; Url: ${song.url}) ; ${(await sep_seconds(song.duration)).timestamp} ; ${song.likes} Likes ; Date : ${song.age}` })
              if (interaction.replied == true) await interaction.channel.send({ embeds: [Search2] })
              else await interaction.editReply({ embeds: [Search2] })
            })
          })
        })
      }
      else if (Type == 'Spotify') {
        var songs = await spotifyApi.searchTracks(Search).then(res => { return res.body.tracks.items })
        var Songs = await songs.slice(0, result)
        Songs.forEach(async (song, index) => {
          var date = song.album.release_date.split('-')
          var Dur = song.duration_ms / 1000
          var test = await (await sep_seconds(Dur)).timestamp.replace(/00:/g, '')
          const STF = new Discord.EmbedBuilder()
            .setColor(Bot_Color)
            .setImage(song.album.images[0].url)
            .setTitle(`${Songs.length || 1}/${result || 1} `)
          await STF.addFields({ name: `${index + 1} : ${song.name}`, value: `${song.artists.map(auth => `[${auth.name}](${auth.external_urls.spotify})`)} (${song.id}) ; Duration: ${test} ; Popularité : ${song.popularity} ; Date de l'album : ${date[2]}/${date[1]}/${date[0]}` })
          await interaction.channel.send({ embeds: [STF] })
        })
      } else {
        var Video = await ytSearch({ search: Search })
        var videos = Video.videos.slice(0, result)
        videos.forEach(async (video, index) => {
          const YTB = new Discord.EmbedBuilder()
            .setColor(Bot_Color)
            .setImage(await db.get(`Thumbnail_${video.videoId}`) || video.image)
            .setTitle(`${videos.length || 1}/${result || 1} `)
          await YTB.addFields({ name: `${index + 1} : ${video.title}`, value: `${video.author.name} (${video.videoId}) ; ${video.timestamp} ; ${video.views} Vues ; Date : ${video.ago}` })
          if (index !== 0) await interaction.channel.send({ embeds: [YTB] })
          else await interaction.editReply({ embeds: [YTB] })
        })
      }
    }
    if (interaction.commandName === 'play') {
      var Type = interaction.options.getString('type')
      var Query = interaction.options.getString('recherche')
      if (!interaction.member.voice.channel) return Embed(`Tu dois être dans un vocal`);
      const permissions = interaction.member.voice.channel.permissionsFor(interaction.member.user);
      if (!permissions.has('CONNECT') || !permissions.has('SPEAK')) return Embed(`Tu n\'as pas les bonnes permissions`);
      var Songs = queue.get(interaction.guild.id)
      if (!Client.voice.adapters.get(interaction.guild.id)) {
        await Voice.joinVoiceChannel({
          channelId: interaction.member.voice.channel.id,
          guildId: interaction.guild.id,
          adapterCreator: interaction.guild.voiceAdapterCreator
        }).removeAllListeners()
      }
      if (Type === 'SoundCloud') {
        await Embed(`Recherche de **${Query}** sur SoundCloud`)
        const song = await songFinder(Query)
        const New = new Discord.EmbedBuilder()
        if (!song) return await Embed(`Rien trouvé`)
        var Dur = song.duration / 1000
        var test = await (await sep_seconds(Dur)).timestamp.replace(/00:/g, '')
        var SONG = {
          type: 'sc',
          title: song.title,
          url: song.url,
          author: {
            name: song.author.name,
            url: song.author.url
          },
          url: song.url,
          duration: test,
        };
        if (!Songs) {
          var Song = [];
          queue.set(interaction.guild.id, Song);
          Song.push(SONG);
          New.setColor('#ff5d00')
          play(interaction.guild.id, interaction)
        } else {
          queue.get(interaction.guild.id).push(SONG);
          New.setColor(Discord.Colors.Fuchsia)
        }
        New.setTimestamp()
          .setThumbnail(song.thumbnail)
          .setTitle(song.title)
          .setAuthor({ name: song.author.name })
          .setURL(song.url)
          .setFooter({ text: `Musique ID : ${song.id} ; Duration : ${test}` })
        await interaction.channel.send({ embeds: [New] })
      } else if (Type === 'Spotify') {
        await Embed(`Recherche de **${Query}** sur Spotify`)
        const Music = await SpotSongFinder(Query);

        if (Music !== undefined) {
          const New = new Discord.EmbedBuilder()
          var song = {
            type: 'stf',
            id: Music.id,
            title: Music.title,
            url: Music.url,
            author: {
              name: (Music.artist.map(auth => auth.name) || Music.artist.name),
              url: (Music.artist.map(auth => auth.external_urls.spotify) || Music.artist.external_urls.spotify)
            },
            duration: Music.duration,
            audio: Music.audio
          };
          if (!Songs) {
            var Songs = [];
            await Songs.push(song);
            await queue.set(interaction.guild.id, Songs);
            await New.setColor(Discord.Colors.DarkGreen)
            play(interaction.guild.id, interaction);
          } else {
            Songs.push(song);
            New.setColor(`#FF3371`)
          }
          New.setTimestamp()
            .setThumbnail(Music.thumbnail)
            .setTitle(Music.title)
            .setURL(Music.url)
            .setAuthor({ name: Music.artist.map(auth => `${auth.name}`).join(' & ') })
            .setFooter({ text: `Music ID : ${Music.id} ; Duration : ${Music.duration}` });
          if (interaction.replied == true) await interaction.channel.send({ embeds: [New] })
          else await interaction.channel.send({ embeds: [New] })
        } else {
          await Embed(`Pas de musique trouvée`)
          queue.delete(interaction.guild.id);
          return;
        }
      } else {

        await Embed(`Recherche de **${Query}** sur Youtube`)
        const video = await videoFinder(Query);

        if (video) {
          const New = new Discord.EmbedBuilder()
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
            play(interaction.guild.id, interaction);
            New.setColor(Discord.Colors.Red)
          } else {
            Songs.push(song);
            New.setColor(`#0xd677ff`)
          }
          New.setTimestamp()
            .setThumbnail(await db.get(`Thumbnail_${video.videoId}`) || video.image)
            .setTitle(video.title)
            .setURL(video.url)
            .setAuthor({ name: video.author.name })
            .setFooter({ text: `Vidéo ID : ${video.videoId} ; Duration : ${video.timestamp}` });
          if (interaction.replied == true) await interaction.channel.send({ embeds: [New] })
          else await interaction.channel.send({ embeds: [New] })
        } else {
          await Embed('play', `Pas de vidéo trouvée`)
          queue.delete(interaction.guild.id);
          return;
        }
      }
    }
    if (interaction.commandName === 'support') {
      var Type = interaction.options.getString('type')
      var Msg = interaction.options.getString('message')
      await Client.users.cache.get('776140752752869398').send(`${Type} de la part de <@${interaction.member.user.id}> sur ${interaction.guild.name} : \n\n${Msg}`)
      await Embed('Votre message a bien été envoyé, veuillez patientez')
    }
  }
});

Client.login(process.env.Token)
