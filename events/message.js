const Discord = require("discord.js");
const db = require("quick.db");
const ayarlar = require("../ayarlar.json");
let talkedRecently = new Set();

//let commands = process.env.message;

module.exports = message => {
  if (talkedRecently.has(message.author.id)) {
    return;
  }
  talkedRecently.add(message.author.id);
  setTimeout(() => {
    talkedRecently.delete(message.author.id);
  }, 2500);
  let client = message.client;
  if (message.author.bot) return;
  if (!message.content.startsWith(ayarlar.prefix)) return;
  let command = message.content.split(" ")[0].slice(ayarlar.prefix.length);
  let params = message.content.split(" ").slice(1);
  let perms = client.elevation(message);
  let cmd;
  
//!--Komut Bulunamadı Baş
  if (!client.commands.has(command)) {
    if (client.aliases.has(command)) {
      cmd = client.commands.get(client.aliases.get(command));
    } else {
      if (command == "") return;
      const embed = new Discord.MessageEmbed()
        .setDescription("")
        .setColor("#00ff00");
      return message.channel.send(embed);
    }
  }
  // Komut Bulunamadı Son-->
  
  if (client.commands.has(command)) {
    cmd = client.commands.get(command);
  } else if (client.aliases.has(command)) {
    cmd = client.commands.get(client.aliases.get(command));
  }
  if (cmd) {
    //Bakım
    const CodEmingHerDaim = require("quick.db");
    let meteyasin = CodEmingHerDaim.fetch("!methesu7washere");
    if (meteyasin) {
      if (message.author.id !== process.env.sahip) {
        return message.channel.send(
          new Discord.MessageEmbed()
            .setColor("#00ff00")
            .setDescription(
              `<:list:822876631194402850> **Bot Şuanda Bakımdadır  \`${meteyasin}\` Sebebi Dolayı Bakımdadır.**`
            )
        );
      }
    }

    if (cmd.conf.enabled === false) {
      if (
        (!process.env.sahip2.includes(message.author.id) &&
          !process.env.sahip2.includes(message.author.id),
        !process.env.sahip.includes(message.author.id) &&
          !process.env.sahip.includes(message.author.id))
      ) {
        const embed = new Discord.MessageEmbed()
          .setDescription(
            `:x: **${cmd.help.name}** isimli komut şuanda geçici olarak kullanıma kapalıdır!`
          )
          .setColor("BLACK");
        message.channel.send({ embed });
        return;
      }
    }

    if (cmd.conf.permLevel === 1) {
      if (!message.member.hasPermission("MANAGE_MESSAGES")) {
        const embed = new Discord.MessageEmbed()
          .setDescription(
            `Bu komutu kullanabilmek için \`Mesajları Yönet\` iznine sahip olmalısın!`
          )
          .setColor("BLACK");
        message.channel.send({ embed });
        return;
      }
    }
    if (cmd.conf.permLevel === 2) {
      if (!message.member.hasPermission("KICK_MEMBERS")) {
        const embed = new Discord.MessageEmbed()
          .setDescription(
            `Bu komutu kullanabilmek için \`Üyeleri At\` iznine sahip olmalısın!`
          )
          .setColor("BLACK");
        message.channel.send({ embed });
        return;
      }
    }
    if (cmd.conf.permLevel === 3) {
      if (!message.member.hasPermission("BAN_MEMBERS")) {
        const embed = new Discord.MessageEmbed()
          .setDescription(
            `Bu komutu kullanabilmek için \`Üyeleri Yasakla\` iznine sahip olmalısın!`
          )
          .setColor("BLACK");
        message.channel.send({ embed });
        return;
      }
    }
    if (cmd.conf.permLevel === 4) {
      if (!message.member.hasPermission("ADMINISTRATOR")) {
        const embed = new Discord.MessageEmbed()
          .setDescription(
            `Bu komutu kullanabilmek için \`Yönetici\` iznine sahip olmalısın!`
          )
          .setColor("BLACK");
        message.channel.send({ embed });
        return;
      }
    }
    if (cmd.conf.permLevel === 5) {
      if (!process.env.sahip2.includes(message.author.id)) {
        if (!process.env.sahip.includes(message.author.id));
        const embed = new Discord.MessageEmbed()
          .setDescription(`Bu komutu sadece \`Sahibim\` kullanabilir!`)
          .setColor("BLACK");
        message.channel.send({ embed });
        return;
      }
    }
    if (perms < cmd.conf.permLevel) return;
    cmd.run(client, message, params, perms);
  }
};
