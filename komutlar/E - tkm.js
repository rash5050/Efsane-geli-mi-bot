const Discord = require("discord.js");
const ayarlar = require("../ayarlar.json");
let prefix = ayarlar.prefix;

const rps = ["makas", "taş", "kağıt"],
  rpsF = (userAns, botAns) => {
    let choice = userAns,
      botChoice = botAns;
    if (choice === "taş") {
      if (botChoice === "makas") {
        return "won";
      } else if (botChoice === "kağıt") {
        return "Kaybetin";
      }

      return "draw";
    } else if (choice === "kağıt") {
      if (botChoice === "taş") {
        return "lost";
      } else if (botChoice === "makas") {
        return "Kazandın";
      }

      return "draw";
    } else if (choice === "makas") {
      if (botChoice === "taş") {
        return "lost";
      } else if (botChoice === "kağıt") {
        return "Kazandın";
      }

      return "draw";
    }
  };

exports.run = async (client, msg, args) => {
  if (!args[0]) {
    return msg.channel.send(
      new Discord.MessageEmbed()
        .setColor("BLACK")
        .setDescription(
          `Lütfen seçimini yap taş, kağıt yada makas | ${prefix}tkm <taş,kağıt,makas>`
        )
    );
  }
  let choice = args[0].toLowerCase();
  choice = choice === "t" ? "taş" : choice;
  choice = choice === "k" ? "kağıt" : choice;
  choice = choice === "m" ? "makas" : choice;
  if (!rps.includes(choice)) {
    return msg.channel.send(
      new Discord.MessageEmbed()
        .setColor("BLACK")
        .setDescription(
          `Lütfen seçimini yap taş, kağıt yada makas | ${prefix}tkm <t,k,m>`
        )
    );
  }
  let rand = Math.floor(Math.random() * 3);
  let botChoice = rps[rand];
  let result = rpsF(choice, botChoice);
  let answer = "";

  if (result === "won") {
    answer =
      "Başarılı, sen **__Kazandın__** \n Senin Seçtiği: `" +
      choice +
      "` | Bot's Seçtiği: `" +
      botChoice +
      "`";
  } else if (result === "lost") {
    answer =
      "Bidakine **__Kaybetin Dostum__**\n Senin Seçtiğin: `" +
      choice +
      "` | Bot's Seçtiği: `" +
      botChoice +
      "`";
  } else if (result === "draw") {
    answer =
      "It's a **__Berabere__** \n Senin Seçimin: `" +
      choice +
      "` | Bot's Seçimi: `" +
      botChoice +
      "`";
  }

  msg.channel.send(answer);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: "tkm",
  description: "Taş kağıt makas oyununu oynar.",
  usage: "tkm"
};
