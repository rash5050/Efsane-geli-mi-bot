const Discord = require("discord.js");
const db = require("quick.db");
 
exports.run = async (client, message, args) => {
  let soyisim = args.slice(0).join(" ");
  if (!soyisim) return message.channel.send(":exclamation: | **Lütfen Soyismini yaz.**");
  message.channel.send(":white_check_mark: | **Soy İsmin ``" + soyisim + "`` olarak ayarlandı!**");
  db.set(`psoyisim_${message.author.id}`, soyisim);
};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0,
  kategori: "Profil"
};
 
exports.help = {
  name: "soyisim-ayarla",
  description: "",
  usage: "",
  kategori: "Profil"
};