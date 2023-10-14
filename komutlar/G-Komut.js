const Discord = require("discord.js");
exports.run = async (client, message, args, level) => {
  const toplamkomut = new Discord.MessageEmbed()

    .setTitle(``)
    .setAuthor(`Rash  | Discord Bot Toplam Komut Sayısı`)
    .setDescription(
      `✅ **Rash-BOT  Toplam**  \`` +
        client.commands.size +
        `\` **Komut Vardır!**`
    )
    .setColor("#00ff00")
    .setTimestamp()
    .setFooter(`Rash`, client.user.avatarURL());

  return message.channel.send(toplamkomut);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: "komutlar",
  description: "Toplam Komut",
  usage: "toplamkomut"
};
