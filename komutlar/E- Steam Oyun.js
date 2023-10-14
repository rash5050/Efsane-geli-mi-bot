const Discord = require("discord.js");
var steam = require("steam-provider");
const ayarlar = require("../ayarlar.json");
let prefix = ayarlar.prefix;

var provider = new steam.SteamProvider();


exports.run = (client, message, args) => {
  let user = message.mentions.users.first() || message.author;
  let userinfo = {};
  userinfo.avatar = user.avatarURL();
  let game = args[0];
  let steampng =
    "https://cdn.discordapp.com/attachments/1160195239278039110/1162438909259681792/standard_1.gif";
  if (!game)
    return message.channel.send(
      new Discord.MessageEmbed()
        .setColor("BLACK")
        .setDescription(
          `<@${message.author.id}> | Lütfen Steamde Olan Bir Oyunun Adını Yazın. Örnek: \`${prefix}steamoyun [Oyun]\``
        )
    );
  provider.search(game).then(result => {
    provider.detail(result[0].id, "turkey", "tr").then(results => {
      console.log(results);
      const embed = new Discord.MessageEmbed()
        .setAuthor("Steam Store", steampng)
        .setColor("BLACK")
        .setTitle(result[0].name)
        .addField(`<a:black_tik:815280959397691422> Oyunun ID 'sı`, result[0].id)
        .setThumbnail(results.otherData.imageUrl)
        .addField("💱 Türleri", results.genres)
        .addField(
          "💲 Fiyati",
          `Normal Fiyat **${results.priceData.initialPrice}** TL
İndirimli Fiyat **${results.priceData.finalPrice}** TL`,
          true
        )
        .addField(
          "🔷 Platformlar",
          results.otherData.platforms,
          true
        )
        .addField("👍 Metacritic Puanı", results.otherData.metacriticScore, true)
        .addField("🔴 Etiketleri", results.otherData.features, true)
        .addField("🎵 Geliştiricileri", results.otherData.developer, true)
        .addField("🔒 Yayımcıları", results.otherData.publisher)
        .setColor("BLACK")
        .setFooter(
          `${message.author.username} tarafından istendi.`,
          userinfo.avatar
        );
      message.channel.send(embed).catch(e => {
        console.log(e);
        message.reply("Hata Olustu Yada `" + game + "` Adlı Oyun Bulunamadı");
      });
    });
  });
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["steam"],
  permLevel: 0
};

exports.help = {
  name: "steamoyun",
  description: "steamstore",
  usage: "steamoyun"
};
