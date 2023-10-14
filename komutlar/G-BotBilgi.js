const Discord = require("discord.js");

exports.run = async (client, message) => {
const ayarlar = require("../ayarlar.json");
let prefix = ayarlar.prefix;

  const botbilgi = new Discord.MessageEmbed()
    .setAuthor(`Rash | Discord Bot Bilgi Tablosu`)
    .setTitle(``)
    .setColor("#00ff00")
    .setImage('https://cdn.discordapp.com/attachments/1160195239278039110/1162438909259681792/standard_1.gif')
    .setThumbnail(client.user.avatarURL())
    .setDescription(
      `📯 Rash-BOT Botumuzu Eklemek İçin \`${prefix}davet\` yazabilirsiniz.`
    )
    .addField(
      "__**Bot Verileri**__",
      `📗 **Toplam Sunucu** **|**  \`${
        client.guilds.cache.size
      }\` \n 📗 **Toplam Kullanıcı** **|** \`${client.guilds.cache
        .reduce((a, b) => a + b.memberCount, 0)
        .toLocaleString()}\` \n 📗 **Toplam Kanal** **|** \`${
        client.channels.cache.size
      }\``
    )
    .addField(
      "__**Yetkili Bilgi**__",
      "👑 **Bot Sahipleri**  <@910946568457310338> <@1107289775318245476>\n\n"
    )
    .addField(
      "__**Sürümler**__",
      `🥽 **Discord.js Sürümü** **|**  \`v${Discord.version}\` \n 🦺  **Node.js Sürümü** **|**  \`${process.version}\``
    )
    .addField(
      "__**Gecikmeler**__",
      `🩱 \`${client.ws.ping}\` **MS**`,
      true
    )
    .addField(
      `__Bilgilendirme__`,
      `🎓  \`${prefix}davet\` | Botu Sununuya Davet Edersiniz\n 🎓 \`${prefix}botbilgi\` | Botun İstatistiklerini Görürsünüz.`
    ); 
  
  return message.channel.send(botbilgi);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: "botbilgi",
  description: "",
  usage: ""
};
