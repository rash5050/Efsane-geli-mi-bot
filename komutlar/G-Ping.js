const Discord = require("discord.js");
const db = require("quick.db");

exports.run = async (app, message, client) => {
  const plasmic = new Discord.MessageEmbed()
    .setColor("#00ff00")
    .setDescription("⚙️ **Ping Hesaplanıyor...**");

  let plasmicc = Date.now();
  let plasmiccode = await message.channel.send(plasmic);
  let plasmiccodee = Date.now() - plasmicc;
  let plasmicAPI = app.ws.ping.toFixed(2);
  setInterval(() => {
    const yrnexembed = new Discord.MessageEmbed()
      .setDescription(
        `\n 💬  Mesaj Gecikme Süresi ; **${plasmiccodee}Ms** \n\n 👁‍🗨 Bot Gecikme Süresi ; **${plasmicAPI}Ms**`
      )
      .setColor("#00ff00");
    plasmiccode.edit(yrnexembed);
  }, 5000);
};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["ping"],
  permLevel: 0
};

exports.help = {
  name: "ping",
  description: "Ping komutu işte yaw",
  usage: "ping"
};
