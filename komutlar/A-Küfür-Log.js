exports.run = (client, message) => {
  let db = require("quick.db");
  let Discord = require("discord.js");
  let küfür = db.fetch(`küfür.${message.guild.id}.durum`);
  const member3 = new Discord.MessageEmbed()
    .setColor("#00ff00")
    .setDescription(` **HATA**  - Bu sunucuda yetkili değilsin.`);
  if (!message.member.permissions.has("MANAGE_MESSAGES"))
    return message.channel.send(member3);
  const member = new Discord.MessageEmbed()
    .setColor("#00ff00")
    .setDescription(` **HATA**  - Bir kanal etiketle.`);
  if (küfür) {
    let kanal = message.mentions.channels.first();
    if (!kanal) return message.channel.send(member);
    db.set(`küfür.${message.guild.id}.kanal`, kanal.id);
    message.channel
      .send(
        new Discord.MessageEmbed()
          .setColor("#00ff00")
          .setDescription(
            ` **Başarılı Bir Şekilde Küfür Log Kanalı Ayarlandı.** `
          )
      )
      .then(l => {
        l.delete({ timeout: 5000 });
      });
  } else {
    message.channel
      .send(
        new Discord.MessageEmbed()
          .setColor("#00ff00")
          .setDescription(` **Küfür Engel Koruması Açık Değil.**`)
      )
      .then(l => {
        l.delete({ timeout: 5000 });
      });
  }
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["küfür-log"],
  permLevel: 0
};

exports.help = {
  name: "küfürlog",
  description: "rash",
  usage: "rash"
};
