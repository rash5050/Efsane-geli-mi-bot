const Discord = require(`discord.js`);

exports.run = async (client, message) => {
  let user = message.mentions.users.first() || message.author;

  let userinfo = {};
  userinfo.avatar = user.avatarURL();

  if (user) {
    const embed = new Discord.MessageEmbed()
      .setAuthor(`${user.tag} Adlı Kullanıcının Avatarı`)
      .setColor("#00ff00")
      .setFooter(
        `${message.author.username} tarafından istendi.`,
        userinfo.avatar
      )
      .setImage(user.displayAvatarURL({ dynamic: true }));
    message.channel.send(embed);
  } else {
    const embed = new Discord.MessageEmbed()
      .setAuthor(
        `${message.author.tag} Adlı Kullanıcının Avatarı »`,
        message.author.avatarURL
      )
      .setColor("#00ff00")
      .setFooter(
        `${message.author.username} tarafından istendi.`,
        userinfo.avatar
      )
      .setImage(message.author.avatarURL({ dynamic: true }));
    message.channel.send(embed);
  }
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["avatar", "avatarım"],
  permLevel: 0
};

exports.help = {
  name: "avatar"
};
