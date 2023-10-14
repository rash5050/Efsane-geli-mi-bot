const ms = require('ms');

exports.run = async (client, message, args) => {

    if(!message.member.hasPermission('MANAGE_MESSAGES')){
        return message.channel.send(':x: Bu Komutu Kullanmak İçin "Mesajları Yönet" Yetkisine Sahip Olman Gerekiyor.');
    }

    let giveawayChannel = message.mentions.channels.first();
    if(!giveawayChannel){
        return message.channel.send(':x: Lütfen Bir Kanal Etiketle!').then(m => m.delete({timeout: 5000, reason:"It had to be done"}));
                message.delete({timeout: 6000, reason:"It had to be done"});
    }

    let giveawayDuration = args[1];
    if(!giveawayDuration || isNaN(ms(giveawayDuration))){
        return message.channel.send(':x: Geçerli bir süre belirtmeniz gerekiyor!').then(m => m.delete({timeout: 5000, reason:"It had to be done"}));
                message.delete({timeout: 6000, reason:"It had to be done"});
    }

    let giveawayNumberWinners = args[2];
    if(isNaN(giveawayNumberWinners) || (parseInt(giveawayNumberWinners) <= 0)){
        return message.channel.send(':x: Geçerli bir kazanan sayısı belirtmeniz gerekiyor!').then(m => m.delete({timeout: 5000, reason:"It had to be done"}));
                message.delete({timeout: 6000, reason:"It had to be done"});
    }

    let giveawayPrize = args.slice(3).join(' ');
    if(!giveawayPrize){
        return message.channel.send(':x: Geçerli bir ödül belirtmelisiniz!').then(m => m.delete({timeout: 5000, reason:"It had to be done"}));
                message.delete({timeout: 6000, reason:"It had to be done"});
    }

    client.giveawaysManager.start(giveawayChannel, {
        time: ms(giveawayDuration),
        prize: giveawayPrize,
        winnerCount: giveawayNumberWinners,
        hostedBy: process.env.hostedBy ? message.author : null,
        messages: {
            giveaway: (process.env.everyoneMention ? "@everyone\n\n" : "")+"🎉🎉 **ÇEKİLİŞ** 🎉🎉",
            giveawayEnded: (process.env.everyoneMention ? "@everyone\n\n" : "")+"🎉🎉 **ÇEKİLİŞ SONA ERDİ** 🎉🎉",
            timeRemaining: "Kalan süre: **{duration}**!",
            inviteToParticipate: "Katılmak için 🎉 tepkisine tıklayın!",
            winMessage: "Tebrikler, {winners}! **{prize}** Ödülünü Kazandın!",
            embedFooter: "Çekiliş",
            noWinner: "Giveaway iptal edildi, geçerli katılım yok.",
            hostedBy: "Çekilişi Yapan: {user}",
            winners: "Kazanan",
            endedAt: "Sona Erdi",
            units: {
                seconds: "saniye",
                minutes: "dakika",
                hours: "saat",
                days: "gün",
                pluralS: false
            }
        }
    });

    message.channel.send(`Çekiliş ${giveawayChannel} Kanalında Başlatıldı!`).then(m => m.delete({timeout: 5000, reason:"It had to be done"}));
                message.delete({timeout: 6000, reason:"It had to be done"});

};

exports.conf = {
  aliases: ['start'],
  permLevel: 0,
};
exports.help = {
  name: 'başlat',
   description: 'Çekilişi Başlatır.',
  usage: 'başlat #kanal <Süre> <Kazanacak Kişi Sayısı> <Ödül Adı>'
};