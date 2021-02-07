const { MessageEmbed } = require('discord.js');
const qdb = require("quick.db");
const rdb = new qdb.table("teyitler");
const kdb = new qdb.table("kullanici");
const ayar = require("../ayarlar.json");
const moment = require("moment");
module.exports.execute = async (client, message, args) => {

    let embed = new MessageEmbed().setTitle(message.member.displayName, message.author.avatarURL({dynamic: true})).setTimestamp().setColor("RANDOM").setFooter("ㄓ T Λ U R U S ❤️ AGNES");
    let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;

    let data = rdb.get(`reg.${member.id}`);

  

    message.channel.send(embed.setDescription(`
    __**Kullanıcı Bilgisi;**__
    
    \`Kullanıcı Adı:\` **${member.user.tag}**
    \`ID:\` **${member.id}**
    \`Oluşturulma Tarihi:\` **${moment(member.user.createdAt).format("DD/MM/YY HH:mm:ss")}**

    __**Sunucu İçi Bilgisi;**__

    \`Rolleri:\` ${member.roles.cache.size > 8 ? `Çok fazla rolün mevcut (${member.roles.cache.size})` : member.roles.cache.filter(x => x.name !== "@everyone").map(roles => roles).join(",")}
    \`Takma İsim:\` **${member.displayName.replace("`", "")}**
    \`Katılma Tarihi:\` **${moment(member.joinedAt).format("DD/MM/YY HH:mm:ss")}**


    `));
    
};

module.exports.configuration = {
    name: "info",
    aliases: ["bilgi", "i", "kullanici"],
    usage: "info / info @üye",
    description: "Belirtilen üyenin bilgilerine bakarsınız."
};
