const Discord = require("discord.js");
const db = require("quick.db");
const moment = require("moment");
require("moment-duration-format");
const ayarlar = require("../ayarlar.json");
let prefix = ayarlar.prefix;

exports.run = function(client, message, args) {
  var aylar = {
    "01": "Ocak",
    "02": "Şubat",
    "03": "Mart",
    "04": "Nisan",
    "05": "Mayıs",
    "06": "Haziran",
    "07": "Temmuz",
    "08": "Ağustos",
    "09": "Eylül",
    "10": "Ekim",
    "11": "Kasım",
    "12": "Aralık"
  };
  var duration = moment
    .duration(client.uptime)
    .format(" D [gün] H [saat] m [dakika] s [saniye]");

  let gold = db.fetch(`goldüye.${message.author.id}`);

  var Durum = message.author.presence.status;
  var Durm =
    Durum == "online"
      ? 0x00ae86
      : Durum == "offline"
      ? 0x808080
      : Durum == "idle"
      ? 0xffff00
      : Durum == "dnd"
      ? 0xff0000
      : 0x00ae86;
  var durm =
    Durum == "online"
      ? "Çevrimiçi "
      : Durum == "offline"
      ? "Çevrimdışı "
      : Durum == "idle"
      ? "Boşta "
      : Durum == "dnd"
      ? "Rahatsız Etmeyin "
      : "Bilinmiyor/bulunamadı.";

  var üye = message.mentions.users.first();
  if (üye) {
    const embed = new Discord.MessageEmbed()
      .setAuthor(üye.username, üye.displayAvatarURL)
      .setColor("#00ff00")
      .setThumbnail(üye.displayAvatarURL)
      .addField(
        "Profil",
        `**Ad 🌀 ** ${üye.username +
          "#" +
          üye.discriminator}\n**ID 🌀 ** ${
          üye.id
        }\n**Son Mesaj: ** ${
          üye.lastMessage
        }\n**Son Mesaj İD 🌀 ** ${
          üye.lastMessageID
        }\n**Oynadığı Oyun: ** ${
          üye.presence.game ? üye.presence.game.name : "Şu an oyun oynamıyor"
        }\n**Durum** ${durm}\n**Oluşturulduğu Tarih 🌀 ** ${`${moment(
          üye.createdAt
        ).format("DD")} ${aylar[moment(üye.createdAt).format("MM")]} ${moment(
          üye.createdAt
        ).format("YYYY HH:mm:ss")}`}\n**Bot mu?** ${
          üye.bot
            ? "✅"
            : "❌"
        }\n**Rolleri 🌀 ** ${message.guild.members
          .get(üye.id)
          .roles.filter(r => r.name !== "@everyone")
          .map(r => r)
          .join(" **|** ")}`
      )
      .setTimestamp()
      .setFooter(`${client.user.tag} | ${prefix}yardım`);
    message.channel.send(embed);
  } else {
    const embed = new Discord.MessageEmbed()
      .setAuthor(message.author.username, message.author.avatarURL)
      .setColor("#00ff00")
      .setThumbnail(message.author.avatarURL())
      .addField(
        "Profil",
        `**Ad 🌀 ** ${message.author.username +
          "#" +
          message.author.discriminator}\n**ID 🌀 ** ${
          message.author.id
        }\n**Son Mesaj 🌀 ** ${
          message.author.lastMessage
        }\n**Son Mesaj İD 🌀 ** ${
          message.author.lastMessageID
        }\n**Oynadığı Oyun 🌀 ** ${
          message.author.presence.game
            ? message.author.presence.game.name
            : "Şu an oyun oynamıyor"
        }\n**Durum** ${durm}\n**Oluşturulduğu Tarih 🌀 ** ${`${moment(
          message.author.createdAt
        ).format("DD")} ${
          aylar[moment(message.author.createdAt).format("MM")]
        } ${moment(message.author.createdAt).format(
          "YYYY HH:mm:ss"
        )}`}\n**Bot mu?** ${
          message.author.bot
            ? "✅"
            : "❌"
        }\n**Roller 🌀 ** ${message.guild.members.cache
          .get(message.author.id)
          .roles.cache.filter(r => r.name !== "@everyone")
          .map(r => r)
          .join(" **|** ")}`
      )
      .setTimestamp()
      .setFooter(`QualitySel  | Discord Profil`);
    message.channel.send(embed);
  }
};
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 0
};
exports.help = {
  name: "profil",
  description: "Profil.",
  usage: "profil"
};
