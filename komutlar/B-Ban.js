const Discord = require("discord.js");
const db = require("quick.db");
const ayarlar = require("../ayarlar.json");
let prefix = ayarlar.prefix;

exports.run = async (client, message, args) => {
  let CEKişi = message.mentions.users.first();
  let CESebep = args.slice(1).join(" ") || "Belirtilmemiş";
  let CELog = db.fetch("ce-banlog." + message.guild.id);
  let CEYetkili = db.fetch("ce-banyetkili." + message.guild.id);

  if (!CEYetkili) return message.channel.send("Sistem ayarlanmamış!");
  if (!CELog) return message.channel.send("Sistem ayarlanmamış!");

  if (!message.member.roles.cache.has(CEYetkili))
    return message.channel.send(`> <@${message.author.id}> Ban Yetkin Olmadan Ban Sistemdeki Hiç Birşeyi Ayarlamassın.`);
  if (!CEKişi)
    return message.channel.send(
      new Discord.MessageEmbed()
        .setColor("#00ff00")
        .setDescription(`🔮 Banlanacak Kişiyi Etiketle \n > 🔮 Doğru Kullanım \`${prefix}ban @Kişi <Sebep>\``)
    );
  if (
    !message.guild.members.cache
      .get(client.user.id)
      .hasPermission("BAN_MEMBERS")
  )
    return message.channel.send(" Ban yetkim yok. ^^");
  await message.guild.members.ban(CEKişi.id, { reason: CESebep });
  await message.guild.channels.cache
    .get(CELog)
    .send(
      "<@" +
        CEKişi.id +
        "> kişisi <@" +
        message.author.id +
        "> kişisi tarafından ``" +
        CESebep +
        "`` sebebi ile banlandı!"
    );
  return message.channel.send(
    "<@" +
      CEKişi.id +
      "> kişisi <@" +
      message.author.id +
      "> kişisi tarafından ``" +
      CESebep +
      "`` sebebi ile banlandı!"
  );
};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: "ban",
  description: "",
  usage: ""
};
