const { MessageEmbed } = require("discord.js");
const qdb = require("quick.db");
const db = new qdb.table("ayarlar");
const jdb = new qdb.table("cezalar");
const kdb = new qdb.table("kullanici");
const ms = require('ms');
const moment = require("moment");


module.exports.execute = async (client, message, args, ayar, emoji) => {
  
  
  
      let time = args[1]
   let yaziSure = time.replace("h", "Saat").replace("m", "Dakika").replace("d", "Gün").replace("s", "Saniye");
    let atilanAy = moment(Date.now()).format("MM");
    let atilanSaat = moment(Date.now()).format("HH:mm:ss");
    let atilanGün = moment(Date.now()).format("DD");
    let bitişAy = moment(Date.now()+ms(time)).format("MM");
    let bitişSaat = moment(Date.now()+ms(time)).format("HH:mm:ss");
    let bitişGün = moment(Date.now()+ms(time)).format("DD");

    let muteAtılma = `${atilanGün} ${atilanAy.replace("01", "Ocak").replace("02", "Şubat").replace("03", "Mart").replace("04", "Nisan").replace("05", "Mayıs").replace("06", "Haziran").replace("07", "Temmuz").replace("08", "Ağustos").replace("09", "Eylül").replace("10", "Ekim").replace("11", "Kasım").replace("12", "Aralık")} ${atilanSaat}`;
    let muteBitiş = `${bitişGün} ${bitişAy.replace("01", "Ocak").replace("02", "Şubat").replace("03", "Mart").replace("04", "Nisan").replace("05", "Mayıs").replace("06", "Haziran").replace("07", "Temmuz").replace("08", "Ağustos").replace("09", "Eylül").replace("10", "Ekim").replace("11", "Kasım").replace("12", "Aralık")} ${bitişSaat}`;

  
  
  
  let embed = new MessageEmbed().setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true})).setFooter("ㄓ T Λ U R U S ❤️ AGNES").setColor(client.randomColor()).setTimestamp();
  if(!ayar.muteRolu || !ayar.muteciRolleri) return message.channel.send("**Roller ayarlanmamış!**").then(x => x.delete({timeout: 5000}));
  if(!ayar.muteciRolleri.some(rol => message.member.roles.cache.has(rol)) && !message.member.roles.cache.has(ayar.sahipRolu)) return message.channel.send(embed.setDescription(`Temp Mute komutunu kullanabilmek için herhangi bir yetkiye sahip değilsin.`)).then(x => x.delete({timeout: 5000}));
  let uye = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
  if(!uye) return message.channel.send(embed.setDescription("Geçerli bir üye belirtmelisin!")).then(x => x.delete({timeout: 5000}));
  if (message.member.roles.highest.position <= uye.roles.highest.position) return message.channel.send(embed.setDescription(`Belirttiğin kişi senden üstün veya onunla aynı yetkidesin!`)).then(x => x.delete({timeout: 5000}));
  let muteler = jdb.get(`tempmute`) || [];
  let sure = args[1];
  let reason = args.splice(2).join(" ");
  if(!sure || !ms(sure) || !reason) return message.channel.send(embed.setDescription("Geçerli bir süre (1s/1m/1h/1d) ve sebep belirtmelisin!")).then(x => x.delete({timeout: 5000}));
  await uye.roles.add(ayar.muteRolu).catch();
  if (!muteler.some(j => j.id == uye.id)) {
    jdb.push(`tempmute`, {id: uye.id, kalkmaZamani: Date.now()+ms(sure)})
    kdb.add(`kullanici.${message.author.id}.mute`, 1);
    kdb.push(`kullanici.${uye.id}.sicil`, {
      Yetkili: message.author.id,
      Tip: "MUTE",
      Sebep: reason,
      Zaman: Date.now()
    });
  };
   message.channel.send(embed.setImage("ttps://cdn.discordapp.com/attachments/713057260108120154/744521929016344636/giphy_1.gif").setDescription(`${uye} adlı üye **${reason}** sebebi ile **${yaziSure}** boyunca metin kanallarında susturuldu.`));
    if (message.guild.channels.cache.has(ayar.muteLogKanali)) message.guild.channels.cache.get(ayar.muteLogKanali).send(embed.setImage("https://cdn.discordapp.com/attachments/713057260108120154/744521929016344636/giphy_1.gif").setDescription(`${uye} adlı üye **${reason}** sebebi ile **${yaziSure}** boyunca ${message.author} tarafından metin kanallarında susturuldu. \n\n• Ceza Alan: ${uye} (\`${uye.id}\`) \n• Yetkili: ${message.author} (\`${message.author.id}\`) \n• Başlangıç Tarihi: \`${muteAtılma}\` \n• Bitiş Tarihi: \`${muteBitiş}\` \n• Sebep: \`${reason}\``));
};
module.exports.configuration = {
  name: "tempmute",
  aliases: ['tempsusturmak', 'sürelimute', 'geçici-mute'],
  usage: "tempmute [üye] [süre] [sebep]",
  description: "Belirtilen üyeyi süreli muteler."
};