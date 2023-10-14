const Discord = require("discord.js");

exports.run = async (client, message) => {
  let prefix = process.env.prefix;

  const embedgenel = new Discord.MessageEmbed()
    .setAuthor(`Windes | Çekiliş `)
    .setTitle(``)
    .setColor("#00ff00")
    .setThumbnail(client.user.avatarURL())
    .setDescription(
      `🎁 Botumuzu Eklemek İçin \`${prefix}davet\` yazabilirsiniz.`
    )
    .addField(
      `__Başlat__`,
      `🎉  \`${prefix}başlat\` Sunucudan Bir Çekiliş Başlatabilirsin.`,
      true
    )
   .addField(
      `__Yenile__`,
      `🎉  \`${prefix}reroll\` Çekilişi Yeniden Çeker.`,
      true
    )
    .addField(
      `__Sonlandır__`,
      `🎊 \`${prefix}sonlandır\` Çekilişi Bitir.`,
      true
    )
   
    .addField(
      `__Bilgilendirme__`,
      `🎊 \`${prefix}davet\` | Botu Sununuya Davet Edersiniz\n 🎊 \`${prefix}botbilgi\` | Botun İstatistiklerini Görürsünüz.`
    );
  return message.channel.send(embedgenel);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: "çekiliş",
  description: "Çekiliş Menüsü",
  usage: "çekiliş"
};
