let database = require("quick.db");

exports.run = async (client, message) => {
  if (!message.member.hasPermission(`ADMINISTRATOR`))
    return message.channel.send(
      `❌ Bu komutu kullanabilmek için gerekli yetkiye sahip değilsin.`
    );

  let log = message.mentions.channels.first();
  if (!log)
    return message.channel.send(
      `> <:alev:1160170860586483803>  **Bir Kanal Etiketlemen Gerekmekte \n > Örnek __${process.env.prefix}abonelog #kanal__**`
    );

  database.set(`abonelog.${message.guild.id}`, log.id);
  message.channel.send(
    `  <:alev:1160170860586483803>  **Abone kanalı başarıyla "${log}" olarak ayarlandı.**`
  );
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["abone-log"],
  perm: 0
};
exports.help = {
  name: "abonelog"
};

exports.play = {
  kullanım: "abonelog #kanal",
  açıklama: "Abone Logunu Ayarlarsınız",
  kategori: "Abone"
};
