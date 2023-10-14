const Discord = require("discord.js");
const hast = require("hastebin-gen");

module.exports.run = async (client, message, args) => {
  let v11 = args.slice(0).join(" ");
  if (!v11) {
    return message.channel.send("V11 Kodunu Yazar Mısın ?");
  }
  if (v11.length > 1024) {
    return message.channel.send(
      "Kodun 1024 Karakterden Fazla Bölerek Yazarmısın ?"
    );
  }
  let v12 = v11
    .split("get")
    .join("cache.get")
    .split("addRole")
    .join("roles.add")
    .split("removeRole")
    .join("roles.remove")
    .split("users.exists")
    .join("users.cache.some")
    .split("channels.exists")
    .join("channels.cache.some")
    .split("find")
    .join("cache.find")
    .split("RichEmbed")
    .join("MessageEmbed")
    .split("fetchUser")
    .join("users.fetch")
    .split("fetchMember")
    .join("users.members")
    .split("fetchMessage")
    .join("users.messages")
    .split("fetchPinnedMessages")
    .join("messages.fetchPinned")
    .split("sendMessage")
    .join("send")
    .split("sendEmbed")
    .join("send")
    .split("sendCode")
    .join("send")
    .split("sendFile")
    .join("send")
    .split("sendFiles")
    .join("send")
    .split("setRoles")
    .join("roles.set")
    .split("colorRole")
    .join("roles.color")
    .split("highestRole")
    .join("roles.highest")
    .split("hoistRole")
    .join("roles.hoist")
    .split("ban")
    .join("members.ban")
    .split("unban")
    .join("members.unban")
    .split("avatarURL")
    .join("avatarURL()")
    .split("displayAvatarURL")
    .join("displayAvatarURL()")
    .split("iconURL")
    .join("iconURL()")
    .split("splashURL")
    .join("splashURL()")
    .split("playFile")
    .join("play")
    .split("playStream")
    .join("play")
    .split("playArbitraryInput")
    .join("play")
    .split("playBroadcast")
    .join("play")
    .split("playOpusStream")
    .join("play")
    .split("playConvertedStream")
    .join("play")
    .split("dispatcher.end()")
    .join("dispatcher.destroy()")
    .split("createVoiceBroadcast")
    .join("voice.createBroadcast")
    .split("broadcast.dispatchers")
    .join("broadcast.subscribers")
    .split("forEach")
    .join("cache.forEach")
    .split("client.ping")
    .join("client.ws.ping");

  if (v11 == v12) {
    return message.channel.send("Bu Kod Zaten V12.");
  }

  const embed = new Discord.MessageEmbed()
     .setColor("#00ff00")
    .addField(
      `🕑 V11 Kod:`,
      `\`\`\`${v11}\`\`\` `
    )
    .addField(
      `🕑 V12 Kod:`,
      `  \`\`\`${v12}\`\`\` `
    );

  message.channel.send(embed);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["cevir", "convert"],
  permlevel: 0
};

exports.help = {
  name: "çevir"
};
