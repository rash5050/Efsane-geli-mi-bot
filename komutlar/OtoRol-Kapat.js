const Discord = require("discord.js");
const db = require("quick.db");
exports.run = (client, message, args) => {
  if (!message.member.hasPermission("ADMINISTRATOR"))
    return message.channel.send(
      `Bu komutu kullanabilmek için "\`Yönetici\`" yetkisine sahip olmalısın.`
    );
  const rol = db.fetch(`otoRL_${message.guild.id}`);
  if (!rol)
    return message.reply(`Sanırım bu özellik zaten kapalıymış :slight_smile:`);

  message.reply(
    `Bu özellik **başarıyla kapatıldı.** 
    )}`
  );

  db.delete(`otoRL_${message.guild.id}`);
  db.delete(`otoRK_${message.guild.id}`);
  db.delete(`otoRM_${message.guild.id}`);
};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["otorol-kapat", "otorolkapat"],
  permLevel: 0
};

exports.help = {
  name: "oto-rol-kapat",
  description: "taslak",
  usage: "Otorol-ayarla"
};
