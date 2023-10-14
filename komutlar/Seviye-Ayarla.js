"use strict"
const settingsList = ["ekle", "sil", "liste", "xp", "durum", "log", "engel"];
const { MessageEmbed } = require("discord.js");
const Discord = require('discord.js')
const db = require("quick.db");

exports.run = async(client, message, args) => {

    if (!message.member.hasPermission('ADMINISTRATOR')) {
        return message.channel.send(new Discord.MessageEmbed().setDescription(`**Hata:** Bu komutu kullanabilmek için **Yönetici** iznine sahip olmalısın!`).setColor(message.guild.me.displayColor));
    }

    const [settingsSelect] = args;

    if (!settingsList.includes(settingsSelect)) return message.channel.send(new Discord.MessageEmbed().setDescription(`**Hata:** Bu geçerli bir ayar değil.`).setColor(message.guild.me.displayColor));
    else if (!db.fetch(`levelSystem_${message.guild.id}.status`) && settingsSelect !== "durum") return message.channel.send(new Discord.MessageEmbed().setDescription(`**Hata:** Seviye sistemi kapalı.`).setColor(message.guild.me.displayColor));
    else {

        const levelSystem = db.fetch(`levelSystem_${message.guild.id}`);

        const levelRoles = message.mentions.roles.first();

        if (settingsSelect === "ekle") {
            const [, , level] = args;

            if (!levelRoles || !level || !parseInt(level)) return message.channel.send(new Discord.MessageEmbed().setDescription(`**Hata:** Bir ayar girmeniz gerekiyor.`).setColor(message.guild.me.displayColor));
            if (!message.guild.roles.cache.has(levelRoles.id)) return message.channel.send(new Discord.MessageEmbed().setDescription(`**Hata:** Belirttiğin rol sunucuda mevcut değil.`).setColor(message.guild.me.displayColor));
            if (levelSystem.ranks && levelSystem.ranks.find(x => x.roleId === levelRoles.id && x.level === level)) return message.channel.send(new Discord.MessageEmbed().setDescription(`**Hata:** Bu seviye rolü zaten oluşturulmuş.`).setColor(message.guild.me.displayColor));


            message.channel.send(new Discord.MessageEmbed().setDescription(`Başarıyla eklendi.`).setColor(message.guild.me.displayColor));
            await db.push(`levelSystem_${message.guild.id}.ranks`, { roleId: levelRoles.id, level });

        } else if (settingsSelect === "sil") {

            const [, , level] = args;

            if (!levelRoles || !level || !parseInt(level)) return message.channel.send(new Discord.MessageEmbed().setDescription(`**Hata:** Bir ayar belirtmeniz gerekiyor.`).setColor(message.guild.me.displayColor));
            if (!levelSystem.ranks && !levelSystem.ranks.find(x => x.roleId === levelRoles.id && x.level === level)) return message.channel.send(new Discord.MessageEmbed().setDescription(`**Hata:** Böyle bir seviye rolü bulunmuyor.`).setColor(message.guild.me.displayColor));

            const filtered = levelSystem.ranks.filter(x => x.roleId !== levelRoles.id && x.level !== level);

            message.channel.send(new Discord.MessageEmbed().setDescription(`Başarılı.`).setColor(message.guild.me.displayColor));
            db.set(`levelSystem_${message.guild.id}.ranks`, filtered);

        } else if (settingsSelect === "liste") {

            const ranks = levelSystem.ranks.sort((x, y) => y.level - x.level).map(rank => `${message.guild.roles.cache.find(x => x.id === rank.roleId) ? message.guild.roles.cache.find(x => x.id === rank.roleId).name : "silinmiş rol"} , ${rank.level}`);
            const rankListing = new MessageEmbed()
                .setTitle(message.guild.name + " Seviye Rolleri Listesi")
                .setDescription(ranks)
                .setColor(message.guild.me.displayColor)
                .setThumbnail(message.guild.iconURL())
            message.channel.send(rankListing);
        } else if (settingsSelect === "durum") {

            const [, statusSelect] = args;

            if (!["aç", "kapa", "kapat"].includes(statusSelect)) return message.channel.send(new Discord.MessageEmbed().setDescription(`**Hata:** Seviye sistemini açmak veya kapatmak istediğinizi belirtmeniz gerekiyor.`).setColor(message.guild.me.displayColor));
            else {
                if (statusSelect === "aç") db.set(`levelSystem_${message.guild.id}.status`, true);
                else if (statusSelect === "kapa" || statusSelect === "kapat") db.set(`levelSystem_${message.guild.id}.status`, false);

                message.channel.send(new Discord.MessageEmbed().setDescription(`Seviye durumu başarıyla ayarlandı.`).setColor(message.guild.me.displayColor));

            }
        } else if (settingsSelect === "log") {

            const [, logCategorySelect] = args;

            if (!["kanal", "mesaj"].includes(logCategorySelect)) return message.channel.send(new Discord.MessageEmbed().setDescription(`**Hata:** Böyle bir log kategorisi bulunmuyor.`).setColor(message.guild.me.displayColor));
            else {
                if (logCategorySelect === "kanal") {

                    const levelLogChannel = message.mentions.channels.first();
                    if (!levelLogChannel || !client.channels.cache.get(levelLogChannel.id)) return message.channel.send(new Discord.MessageEmbed().setDescription(`**Hata:** Böyle bir kanal bulunmuyor.`).setColor(message.guild.me.displayColor));
                    else {

                        await db.set(`levelSystem_${message.guild.id}.logChannel`, levelLogChannel.id);
                        message.channel.send(new Discord.MessageEmbed().setDescription(`Kanal başarıyla ayarlandı.`).setColor(message.guild.me.displayColor));

                    }

                } else if (logCategorySelect === "mesaj") {

                    const [, , logMessageSelect] = args;
                    const value = args.splice(3).join(" ");

                    if (!["rol", "seviye"].includes(logMessageSelect)) return message.channel.send(new Discord.MessageEmbed().setDescription(`**Hata:** Böyle bir log kategorisi bulunmuyor.`).setColor(message.guild.me.displayColor));
                    else {
                        if (logMessageSelect === "seviye") {

                            if (!value) return message.channel.send(new Discord.MessageEmbed().setDescription(`**Hata:** Ayarlanacak mesajı yazmanız gerekiyor.`).setColor(message.guild.me.displayColor));
                            else {

                                await db.set(`levelSystem_${message.guild.id}.logUpMessage`, value);
                                message.channel.send(new Discord.MessageEmbed().setDescription(`Başarıyla seviye atlama mesajı ayarlandı, \n\nayarlanan seviye mesajı : **${value}**`).setColor(message.guild.me.displayColor));

                            }

                        } else if (logMessageSelect === "rol") {
                            if (!value) return message.channel.send(new Discord.MessageEmbed().setDescription(`**Hata:** Ayarlanacak mesajı yazmanız gerekiyor.`).setColor(message.guild.me.displayColor));
                            else {

                                await db.set(`levelSystem_${message.guild.id}.logRewardMessage`, value);
                                message.channel.send(new Discord.MessageEmbed().setDescription(`Başarıyla seviye hediye mesajı ayarlandı, \n\nayarlanan seviye mesajı : **${value}**`).setColor(message.guild.me.displayColor));

                            }
                        }
                    }
                }
            }
        } else if (settingsSelect === "engel") {
            const [, categorySelect] = args;

            if (!["kanal", "rol"].includes(categorySelect)) return message.channel.send(new Discord.MessageEmbed().setDescription(`**Hata:** Böyle bir engel kategorisi bulunmuyor.`).setColor(message.guild.me.displayColor));
            else {

                if (categorySelect === "kanal") {

                    const value = message.mentions.channels.first();

                    if (args[2] === "sil") {

                        const { blockChannels } = db.fetch(`levelSystem_${message.guild.id}`);
                        if (!blockChannels || !blockChannels.find(x => x === value.id)) return message.channel.send(new Discord.MessageEmbed().setDescription(`**Hata:** Böyle bir kanal engellenmemiş.`).setColor(message.guild.me.displayColor));

                        blockChannels.pop(value.id)
                        db.set(`levelSystem_${message.guild.id}.blockChannels`, blockChannels);
                        message.channel.send(new Discord.MessageEmbed().setDescription(`Başarıyla silindi.`).setColor(message.guild.me.displayColor));

                    } else {

                        const { blockChannels } = db.fetch(`levelSystem_${message.guild.id}`);

                        if (blockChannels && db.fetch(`levelSystem_${message.guild.id}.blockChannels`).find(x => x === value.id)) return message.channel.send(new Discord.MessageEmbed().setDescription(`**Hata:** Bu engel zaten ayarlanmış.`).setColor(message.guild.me.displayColor));
                        if (!message.guild.channels.cache.has(value.id)) return message.channel.send(new Discord.MessageEmbed().setDescription(`**Hata:** Böyle bir kanal mevcut değil.`).setColor(message.guild.me.displayColor));

                        await db.push(`levelSystem_${message.guild.id}.blockChannels`, value.id);
                        message.channel.send(new Discord.MessageEmbed().setDescription(`Başarıyla eklendi`).setColor(message.guild.me.displayColor));

                    }
                } else if (categorySelect === "rol") {

                    const value = message.mentions.roles.first();

                    if (args[2] === "sil" || args[2] === 'kaldır') {

                        const { blockRoles } = db.fetch(`levelSystem_${message.guild.id}`);

                        if (!blockRoles.find(x => x === value.id)) return message.channel.send(new Discord.MessageEmbed().setDescription(`**Hata:** Bu rol zaten engellenmemiş.`).setColor(message.guild.me.displayColor));

                        blockRoles.pop(value.id)
                        db.set(`levelSystem_${message.guild.id}.blockRoles`, blockRoles);
                        message.channel.send(new Discord.MessageEmbed().setDescription(`Başarıyla silindi.`).setColor(message.guild.me.displayColor));

                    } else {

                        const { blockRoles } = db.fetch(`levelSystem_${message.guild.id}`);

                        if (blockRoles && blockRoles.find(x => x === value.id)) return message.channel.send(new Discord.MessageEmbed().setDescription(`**Hata:** Bu engel zaten oluşturulmuş.`).setColor(message.guild.me.displayColor));
                        if (!message.guild.roles.cache.has(value.id)) return message.channel.send(new Discord.MessageEmbed().setDescription(`**Hata:** Böyle bir rol bulunmuyor.`).setColor(message.guild.me.displayColor));

                        await db.push(`levelSystem_${message.guild.id}.blockRoles`, value.id);
                        message.channel.send(new Discord.MessageEmbed().setDescription(`Başarıyla eklendi.`).setColor(message.guild.me.displayColor));

                    }
                }
            }
        } else if (settingsSelect === "xp") {
            const [, value] = args;
            if (value === "+") {

                const [, , plusxp] = args;

                if (!plusxp || !parseInt(plusxp)) return message.reply("ayarlamak istediğin xp değerini gir");

                console.log(plusxp);
                await db.add(`levelSystem_${message.guild.id}.reqXp`, Number(plusxp));
        db.set(`plusxp_${message.guild.id}`, plusxp)
                message.channel.send(new Discord.MessageEmbed().setDescription(`xp değeri başarıyla **${plusxp}** arttı.`).setColor(message.guild.me.displayColor));

            } else {

                if (!value || !parseInt(value)) return message.reply("ayarlamak istediğin xp değerini gir");

                await db.set(`levelSystem_${message.guild.id}.reqXp`, Number(value));
                message.channel.send(new Discord.MessageEmbed().setDescription(`xp değeri başarıyla **${value}** olarak ayarlandı.`).setColor(message.guild.me.displayColor));
            }
        }
    };
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["seviyeayarla", "rankayarla", "rank-ayarla", "seviyeayar", "seviye-ayar", "rank-ayar", "rankayar"],
    permLevel: 0
};

exports.help = {
    name: 'seviye-ayarla',
    description: 'Botun pingini gösterir',
    usage: 'ping'
};