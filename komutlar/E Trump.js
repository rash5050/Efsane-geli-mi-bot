const Discord = require("discord.js");
const { get } = require("superagent");
module.exports.run = async (bot, message, args) => {
  try {
    if (!args[0]) {
      message.channel.send(
        new Discord.MessageEmbed()
          .setColor("BLACK")
          .setDescription(
            `⛔️ **Yanlış Kullanım** \n Doğru Kullanım: \`s!trumptweet [Yazı]\``
          )
      );
      return;
    }
    let url = `https://nekobot.xyz/api/imagegen?type=trumptweet&text=${args.join(
      " "
    )}`;
    let prefix = process.env.prefix;
       let user = message.mentions.users.first() || message.author;

  let userinfo = {};
  userinfo.avatar = user.avatarURL();
    get(url).then(res => {
      message.channel.send(`<@${message.author.id}>`)
      const embed = new Discord.MessageEmbed()
        .setColor("BLACK")
        .setImage(res.body.message)
      .setFooter(
      `${message.author.username} tarafından istendi.`,
      userinfo.avatar
    )

      setTimeout(() => {
        message.channel.send(embed);
      }, 100);
    });
  } catch (err) {
    console.log(err);
  }
};
module.exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["trumptweet"],
  permLevel: 0
};

module.exports.help = {
  name: "trumptweet",
  category: "Kullanıcı",
  description: "Anime Karakterlerinin Posterine Yazı Koyar",
  usage: "trump <yazı>"
};
