const Discord = require("discord.js");
const ayarlar = require("../ayarlar.json");

exports.run = (client, message, params) => {
  let user = message.mentions.users.first() || message.author;

  let userinfo = {};
  userinfo.avatar = user.avatarURL();
  if (!message.guild) {
    const ozelmesajuyari = new Discord.MessageEmbed()
      .setColor("BLACK")
      .setAuthor(message.author.username, message.author.avatarURL())
      .addField("**Eğlence Komutları Özel Mesajlarda Kullanılamaz!**");
    return message.author.send(ozelmesajuyari);
  }
  if (message.channel.type !== "dm") {
    const sunucubilgi = new Discord.MessageEmbed()
      .setDescription(`${message.author.username} **Polis Geliyor** 👮🏽‍♂️`)
      .setColor("BLACK")
      .setFooter(
        `${message.author.username} tarafından istendi.`,
        userinfo.avatar
      )
      .setImage(
        `https://i.pinimg.com/originals/5a/28/de/5a28def9428afff43e86e21ffe382dc9.jpg`
      );
    return message.channel.send(sunucubilgi);
  }
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: "ara155",
  description: "Polisi Arar (ciddiye almayın)",
  usage: "ara155"
};
