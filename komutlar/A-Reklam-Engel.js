exports.run = (client, message) => {
  let db = require("quick.db");
  let Discord = require("discord.js");

  let reklam = db.fetch(`reklam.${message.guild.id}.durum`);
  const member3 = new Discord.MessageEmbed()
    .setColor(0x36393f)
    .setDescription(` **HATA**  - Bu sunucuda yetkili değilsin.`);
  if (!message.member.permissions.has("MANAGE_MESSAGES"))
    return message.channel.send(member3);
  if (reklam) {
    db.delete(`reklam.${message.guild.id}`);
    message.channel
      .send(
        new Discord.MessageEmbed()
          .setColor("#00ff00")
          .setDescription(
            `**Başarılı Bir Şekilde Reklam Engel Koruması Kapandı.**`
          )
      )
      .then(l => {
        l.delete({ timeout: 5000 });
      });
  } else {
    db.set(`reklam.${message.guild.id}.durum`, true);
    message.channel
      .send(
        new Discord.MessageEmbed()
          .setColor("#00ff00")
          .setDescription(
            ` **Başarılı Bir Şekilde Reklam Engel Koruması Açıldı.**`
          )
      )
      .then(l => {
        l.delete({ timeout: 5000 });
      });
  }
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["reklam-engel"],
  permLevel: 0
};

exports.help = {
  name: "reklamengel",
  description: "rash",
  usage: "rash"
};
