const Discord = require("discord.js");
const db = require("quick.db");
const ayarlar = require("../ayarlar.json");
let prefix = ayarlar.prefix;

exports.run = async (client, message, args) => {
  let CERol = message.mentions.roles.first();
  let CEYetkili =
    db.fetch("ce-banyetkili." + message.guild.id) || "Var olmayan";
  if (
    !message.guild.members.cache
      .get(message.author.id)
      .hasPermission("BAN_MEMBERS")
  )
    return message.channel.send(
      `> <@${message.author.id}> Ban Yetkin Olmadan Ban Sistemdeki Hiç Birşeyi Ayarlamassın.`
    );
  if (!CERol) return message.channel.send( new Discord.MessageEmbed()
        .setColor("#00ff00")
        .setDescription(
          `> <‼️ Daha Ban Yetkili Rölünü Ayarlamadın \n ‼️ Doğru Ayarlamak İçin \`${prefix}ban-yetkili @Rol\``
        ));
  await db.set("ce-banyetkili." + message.guild.id, CERol.id);
  return message.channel.send(
    "Daha önceden " +
      CEYetkili +
      " olarak belirlenen rolü <@&" +
      CERol.id +
      "> rolü ile değiştirdim!"
  );
};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: "ban-yetkili",
  description: "",
  usage: ""
};
