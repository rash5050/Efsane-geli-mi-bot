const Discord = require("discord.js");
const db = require("quick.db");
const ayarlar = require("../ayarlar.json");
let prefix = ayarlar.prefix;

exports.run = (client, message, args) => {
  const embed = new Discord.MessageEmbed()
    .setAuthor("Rash Creative | OtoRol", client.user.avatarURL())
    .setColor("#00ff00")
    .addField(
      "__OTOROL Ayarlamak__",
      "__**Oto-Rol-Ayarla**__ 💡 **Otorolü Ayarlar.**\n Örnek: `sn!oto-rol-ayarla @rolünüz #logkanalı` \n \n __**sn!otorol-msg**__ <:sag:822547800481988628>  **Otorol Mesajını Ayarlar.** \n Örnek: `sn!otorol-msg -server-, Sunucumuza Hoşgeldin, -uye-! -rol- Adlı Rolün Başarı İle Verildi Seninle Beraber, **-uyesayisi-** Kişiyiz`"
    )

    .addField(
      "__**Kullanabileceğiniz Değişkenler**__",
      `
**-uye-** 💡 \`Üyeyi Etiketler.\`
**-rol-** 💡 \`Rolün İsmini Ekler.\`
**-server-** 💡 \`Server İsmini Yazar.\`
**-uyesayisi-** 💡> \`Üye Sayısını Atar.\`
**-botsayisi-** 💡 \`Bot Sayısını Atar.\`
**-kanalsayisi-** 💡 \`Kanal Sayısını Atar.\`
**-bolge-** 💡 \`Sunucu Bölgesinin İsmini Atar.\`
**-kalanuye-** 💡 \`Hedefe Kaç Kişi Kalmış Gösterir.\`
**-hedefuye-** 💡 \`Hedef Rakamı Gösterir.\`
`
    )
  message.channel.send(embed);
};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: "otorol",
  description: "sayaç",
  usage: "sayaç"
};
