const Discord = require("discord.js");
const ayarlar = require("../ayarlar.json");

exports.run = async (client, message) => {
  let prefix = ayarlar.prefix;
  let parsher = message.guild;
  parsher
    .fetchBans()
    .then(parsher =>
    message.channel.send(` Sunucunuzda ${parsher.size} banlanmış üye bulunmaktadır.`)
  )
    .catch(console.error);
};

exports.conf = {
  enabled: true,
  runIn: ["bansay"],
  aliases: ["bansay"],
  permLevel: 0
};

exports.help = {
  name: "bansay",
  description: "Sunucudan banlanan kişilerin sayısını gösterir",
  usage: "bansay"
};