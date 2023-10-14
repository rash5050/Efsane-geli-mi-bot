"use strict"
const customizeList = ['resim', 'renk', "sıfırla"];
const db = require('quick.db');
const Discord = require('discord.js')
exports.run = async(client, message, args) => {
    const [selectCustomize] = args;

    if (!customizeList.includes(selectCustomize))
        return message.channel.send(new Discord.MessageEmbed().setDescription(`**Hata:** Bu geçerli bir özelleştirme ayarı değil.`).setColor(message.guild.me.displayColor));
    else {
        if (selectCustomize === 'resim') {

            const [, backgroundURL] = args;

            if (!backgroundURL) return message.channel.send(new Discord.MessageEmbed().setDescription(`**Hata:** Bir resim URL'si girmen gerekiyor.`).setColor(message.guild.me.displayColor));

            let data = db.fetch(`rankCardCustomize_${message.author.id}`);
            if (data) data.backgroundURL = backgroundURL;
            else data = { backgroundURL };

            message.channel.send(new Discord.MessageEmbed().setDescription(`Seviye kartındaki resmin ayarlandı.`).setColor(message.guild.me.displayColor));
            await db.set(`rankCardCustomize_${message.author.id}`, data);

        } else if (selectCustomize === 'renk') {

            const [, color] = args;

            if (!color) return message.channel.send(new Discord.MessageEmbed().setDescription(`**Hata:** Bir renk (ingilizce örn. white) veya renk kodu (örn. #56ffff) girmen gerekiyor`).setColor(message.guild.me.displayColor));

            let data = db.fetch(`rankCardCustomize_${message.author.id}`);
            if (data) data.cardColor = color;
            else data = { cardColor: color }

            message.channel.send(new Discord.MessageEmbed().setDescription(`Renk kodun başarıyla ayarlandı.`).setColor(message.guild.me.displayColor));
            await db.set(`rankCardCustomize_${message.author.id}`, data);
        }
    }
    
    if(args[0] === 'sıfırla'){
   db.delete(`rankCardCustomize_${message.author.id}`);
    
    message.channel.send(new Discord.MessageEmbed().setDescription(`Kartındaki resim ve renk başarıyla sıfırlandı`).setColor(message.guild.me.displayColor));
    
    
}
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['seviye-kart-özelleştir', 'seviyekartözelleştir'],
    permLevel: 0
};

exports.help = {
    name: 'seviyekart-özelleştir',
    description: 'Botun pingini gösterir',
    usage: 'ping'
};