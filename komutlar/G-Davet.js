const Discord = require("discord.js");
const ayarlar = require("../ayarlar.json");
let prefix = ayarlar.prefix;

exports.run = async (client, message) => {


  const fynxcode = new Discord.MessageEmbed()
    .setColor("#00ff00")
    .setAuthor(`Rash Davet Menü`)
    .setDescription(
      `**💼 Sunucunun Davet Linki [TIKLA](https://discord.gg/9K3fkAkBS4)**\n`
    )
    .addField(
      `__Bilgilendirme__`,
      `🔰  \`${prefix}davet\` | Botu Sununuya Davet Edersiniz\n 🔰 \`${prefix}botbilgi\` | Botun İstatistiklerini Görürsünüz.`
    )
    .setImage('https://cdn.discordapp.com/attachments/1160195239278039110/1162438909259681792/standard_1.gif')
    .setThumbnail(client.user.avatarURL());

  return message.channel.send(fynxcode);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["davet"],
  permLevel: 0
};

exports.help = {
  name: "davet",
  description: "Davet Menüsü",
  usage: ""
};
