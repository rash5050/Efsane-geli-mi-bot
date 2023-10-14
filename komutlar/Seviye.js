"use strict"
const { MessageAttachment, MessageEmbed, Discord } = require('discord.js');
const Canvas = require('canvas');
const db = require('quick.db');

const applyText = (canvas, text) => {
    const ctx = canvas.getContext('2d');

    let fontSize = 28;

    do {
        ctx.font = `${(fontSize -= 4)}px Lemon`;
    } while (ctx.measureText(text).width > canvas.width - 300);

    return ctx.font;
};

Canvas.registerFont(__dirname + '../../assests/LemonMilkbold.otf', {
    family: 'Lemon'
});

exports.run = async(client, message, args) => {

    if (!db.fetch(`levelSystem_${message.guild.id}.status`)) return message.channel.send(new MessageEmbed().setDescription(`**Hata:** Sunucuda seviye sistemi kapalı.`).setColor(message.guild.me.displayColor));

    const user = message.mentions.users.first() || client.users.cache.get(args[0]) || message.author;

    const backgroundImage = await Canvas.loadImage('https://cdn.discordapp.com/attachments/772182628681383936/773704764273852448/Web_1920_1.png'),
        avatar = await Canvas.loadImage(user.displayAvatarURL({ format: 'png' })),
        forwardIcon = await Canvas.loadImage('https://cdn.discordapp.com/attachments/772182642425856010/772996169164390420/fast-forward.png'),
        vote = await Canvas.loadImage("https://cdn.discordapp.com/attachments/713878075624128622/777533367129604106/rozet2.png"),
        developer = await Canvas.loadImage("https://cdn.discordapp.com/attachments/713878075624128622/777533369633996800/rozet3.png"),
        support = await Canvas.loadImage("https://cdn.discordapp.com/attachments/713878075624128622/777533376320110672/rozet5.png"),
        special = await Canvas.loadImage("https://cdn.discordapp.com/attachments/713878075624128622/777533373031383040/rozet4.png"),
        owner = await Canvas.loadImage("https://cdn.discordapp.com/attachments/713878075624128622/777533363606126612/rozet1.png")

    let { enabled, backgroundURL, cardColor } = db.fetch(`rankCardCustomize_${user.id}`) || { enabled: false };
    if (!cardColor) cardColor = "white";
    let { level, xp } = db.fetch(`levelProfile_${message.guild.id}_${user.id}`) || { id: undefined, level: 0, xp: 0 };
    let { reqXp } = db.fetch(`levelSystem_${message.guild.id}`);
    if (!reqXp) reqXp = 50

    const canvas = Canvas.createCanvas(907, 270);
    const ctx = canvas.getContext('2d');

    if (backgroundURL) {
        const customizeBackground = await Canvas.loadImage(backgroundURL);

        ctx.drawImage(customizeBackground, 0, 0, 907, 175);
        ctx.globalAlpha = 0.50;
    };

    ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);

    ctx.globalAlpha = 1;


    ctx.drawImage(owner, 550, 3, 64, 64)
    ctx.drawImage(developer, 620, 3, 64, 64)
    ctx.drawImage(support, 690, 3, 64, 64)
    ctx.drawImage(special, 760, 3, 64, 64)
    ctx.drawImage(vote, 830, 3, 64, 64)
    
    ctx.font = applyText(canvas, `${user.tag}`);
    ctx.fillStyle = cardColor;
    ctx.fillText(user.tag, canvas.width / 4.28, canvas.height / 3.3);

    ctx.font = `20px Lemon`;
    ctx.fillStyle = cardColor;
    ctx.fillText(
        `Seviye ${level ? level : '0'}`,
        canvas.width / 3.95,
        canvas.height / 2.15
    );

    ctx.font = `20px Lemon`;
    ctx.fillStyle = cardColor;
    ctx.fillText(
        `Tecrübe ${xp ? xp : '0'}${'/'}${reqXp}`,
        canvas.width / 2.50,
        canvas.height / 2.15
    );

    let de = 2;
    ctx.beginPath();
    ctx.fillStyle = cardColor;
    ctx.arc(90, 217.75, 18.5, 1.5 * Math.PI, 0.5 * Math.PI, true);
    ctx.fill();
    ctx.fillRect(90, 199.15, 250 * de, 37.5);
    ctx.arc(90 + 250 * de, 217.75, 18.75, 1.5 * Math.PI, 0.5 * Math.PI, false);
    ctx.fill();
    ctx.beginPath();
    ctx.fillStyle = `#CDCCFF`;

    xp = 400 / (reqXp ? reqXp : 50) * xp;

    ctx.arc(90, 217.75, 18.75, 1.5 * Math.PI, 0.5 * Math.PI, true);
    ctx.fill();
    ctx.fillRect(90, 199.15, xp, 37.5);
    ctx.arc(90 + xp, 217.75, 18.75, 1.5 * Math.PI, 0.5 * Math.PI, false);
    ctx.fill();

    ctx.drawImage(forwardIcon, 74 + xp, 200.75, 32, 32);

    ctx.shadowBlur = 0;
    ctx.beginPath();
    ctx.arc(100, 90, 75, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.clip();

    ctx.drawImage(avatar, 40, 40, 100, 100);

     message.channel.send(`> :star: | <@${message.author.id}>  Seviye Bilgi Kartı`)

    await message.channel.send(
        new MessageAttachment(canvas.toBuffer(), 'seviye-kartı.gif'));

};

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ['rank'],
    permLevel: 0
};

exports.help = {
    name: 'seviye',
    description: 'Botun pingini gösterir',
    usage: 'ping'
};