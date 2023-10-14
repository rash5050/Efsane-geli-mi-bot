const Discord = require("discord.js");
const db = require("quick.db");
 
exports.run = async (client, message, args) => {
  let cinsiyet = args.slice(0).join(" ");
  if (!cinsiyet)
    return message.channel.send(
      ":exclamation: | Lütfen Cinsiyetini yaz. Unutma Sadece erkek,kız veya yok yazabilirsin (**Baş Harflerini BÜYÜK YAZMA**)"
    );
  message.channel.send(":white_check_mark: | **Cinsiyetin Başarıyla ``" + cinsiyet + "`` olarak ayarlandı!**");
  db.set(`pcinsiyet_${message.author.id}`, cinsiyet);
};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0,
  kategori:"Profil"
};
 
exports.help = {
  name: "cinsiyet-ayarla",
  description: "",
  usage: "",
  kategori: "Profil"
};