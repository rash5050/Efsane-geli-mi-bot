"use strict"
const { MessageEmbed, Discord } = require("discord.js");
const db = require("quick.db");

exports.run = async (client, message, args) => {
    
	if (!db.fetch(`levelSystem_${message.guild.id}.status`)) return message.channel.send(new Discord.MessageEmbed().setDescription(`**Hata:** Seviye sistemi kapalı.`).setColor(message.guild.me.displayColor));

    const page = args[0] || "1";
    console.log(page);
    const paginationLimit = 10;

    let content = message.guild.members.cache.filter(x => !x.user.bot && db.fetch(`levelProfile_${message.guild.id}_${x.user.id}`)).array()
    .sort((x,y) => (db.fetch(`levelProfile_${message.guild.id}_${y.user.id}`).level || 0) - (db.fetch(`levelProfile_${message.guild.id}_${x.user.id}`).level || 0))
    .splice((page - 1) * paginationLimit, (page - 1) * paginationLimit + 10)
    .map((x, index) => {
      return `${index + (page - 1) * paginationLimit + 1} - **${x.user.username}** ${db.fetch(`levelProfile_${message.guild.id}_${x.user.id}`).level || 0}`
    });
    
    const leaderBoardEmbed = new MessageEmbed()
    .setTitle(`${message.guild.name} Seviye Sıralaması`)
    .setDescription(content)
    .setColor(message.guild.me.displayColor)
    .setThumbnail(message.guild.iconURL())


    await message.channel.send(leaderBoardEmbed);
    
};

exports.conf = {
    enabled: true, 
    guildOnly: false, 
    aliases: ["top", "rank-liste", "rank-listesi", "seviyeliste", "seviye-liste", "ranklistesi","rankliste", "seviye-listesi","seviyelistesi"],
    permLevel: 0 
  };
  
  exports.help = {
    name: 'sıralama', 
    description: 'Botun pingini gösterir',
    usage: 'ping'
  };