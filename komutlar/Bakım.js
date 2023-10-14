const Discord = require('discord.js');
const CodEmingHerDaim = require('quick.db');
const ayarlar = require("../ayarlar.json");
let prefix = ayarlar.prefix;

exports.run = async(client, message, args) => {
  
let sahipID = ayarlar.sahip

let CodEming = args.slice(0).join(' ') || ' Belirtilmemiş.'

if(message.author.id !== sahipID) return message.channel.send(' Sadece **sahibim** bakım modu ayarlayabilir.')

let meteyasin = CodEmingHerDaim.fetch("8182bakımaç81")

if(meteyasin) {
CodEmingHerDaim.delete("8182bakımaç81")
return message.channel.send(' Bakım sistemi kapatıldı! ')
}

if(!meteyasin) {
CodEmingHerDaim.set("8182bakımaç81", CodEming)
return message.channel.send(" Tamamdır! Bakım sistemi aktif edildi! Bakım sebebi: **"+CodEming+"**")
}
}

exports.conf = {
enabled: true, 
guildOnly: false,
aliases: [], 
permLevel: 0 
}

exports.help = {
name: 'bakım',
description: ' ',
usage: ''
}