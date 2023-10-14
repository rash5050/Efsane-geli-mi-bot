const Discord = require("discord.js");
const db = require("quick.db");
const client = new Discord.Client();

const ayarlar = require("../ayarlar.json");
let prefix = ayarlar.prefix;

exports.run = async (client, message, args) => {
  if (message.channel.type !== "text") return;
  const limit = args[0] ? args[0] : 0;
  if (!limit) {
    var embed = new Discord.MessageEmbed()
      .setDescription(`Doğru kullanım: \`${prefix}yavaşmod [0/10]\``)
      .setColor(`#ee7621`)
      .setTimestamp();
    message.channel.send({ embed });
    return;
  }
  if (limit > 10) {
    return message.channel.send(
      new Discord.MessageEmbed()
      .setColor("#00ff00")
        .setDescription(
          "⭕️  Süre limiti maksimum **10** saniye olabilir."
        )
    );
  }
  message.channel.send(
    new Discord.MessageEmbed()
    .setColor("#00ff00")
      .setDescription(
        `<✅ Yazma süre limiti **${limit}** saniye olarak ayarlanmıştır.`
      )
  );
  var request = require("request");
  request({
    url: `https://discordapp.com/api/v7/channels/${message.channel.id}`,
    method: "PATCH",
    json: {
      rate_limit_per_user: limit
    },
    headers: {
      Authorization: `Bot ${client.token}`
    }
  });
};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["slow-mode", "yavas-mod", "yavasmod", "yavaşmod"],
  permLevel: 1
};

exports.help = {
  name: "slowmode",
  description: "Sohbete yazma sınır (süre) ekler.",
  usage: "slowmode [1/10]"
};
