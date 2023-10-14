const Discord = require("discord.js");

exports.run = async (client, message, args) => {
  if (!message.guild)
    return message.author.send(
      "Bu Komutu Sadece Sunucularda Kulanabilirsiniz!"
    );
  let güvenlik = ["Zayıf","Orta","Yüsek"]

  const say = new Discord.MessageEmbed()
    .setColor("#00ff00")
    .setImage(
      "https://cdn.discordapp.com/attachments/1160195239278039110/1162438909259681792/standard_1.gif"
    )
    .setTitle(message.guild.name)
    .addField(
      " 👱‍♀️ 👱  **__Toplam Üye Sayısı__**",
      `\`\`\`${message.guild.memberCount}\`\`\``
    )
    .addField(
      `🌐 **__Toplam Kanal Sayısı__**`,
      `  \`\`\`${message.guild.channels.cache.size}\`\`\``
    )
    .addField(
      "💠 **__Çevrimiçi üye sayısı__**",
      `» ${
        message.guild.members.cache.filter(
          m => m.user.presence.status !== "offline"
        ).size
      }`
    )
    .addField(
      "💠 **__Çevrimdışı üye sayısı__**",
      `» ${
        message.guild.members.cache.filter(
          m => m.user.presence.status == "offline"
        ).size
      }`
    )
    .addField(
      "⚜️ **__Bot Sayısı__**",
      `» ${message.guild.members.cache.filter(m => m.user.bot).size}`
    )
    .addField(
      `😃 **__Emoji Sayısı__**`,
      `» **${message.guild.emojis.cache.size}**`
    )
    .addField(
      `👾 **__Rol Sayısı__**`,
      `» **${message.guild.roles.cache.size}**`
    )
    .addField(`👾 **__Boost Seviyesi__**`,`**${message.guild.premiumTier}/3**`)
    .addField(
      `👾 **__Boost Sayısı__**`,
      `» **${message.guild.premiumSubscriptionCount}**`
    )

  message.channel.send(say);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["say"],
  permLevel: 0
};

exports.help = {
  name: "gelişmiş-say",
  description: "Say"
};
