const { MessageEmbed } = require("discord.js");
const qdb = require("quick.db");
const db = new qdb.table("ayarlar");
const kdb = new qdb.table("kullanici");

module.exports.execute = async (client, message, args, ayar, emoji) => {
  
  
  
   ////// KAYIT SAYISI ///////
db.add(`kızUye.${message.author.id}`, 1)
let kız = db.fetch(`kızUye.${message.author.id}`);
db.add(`toplam.${message.author.id}`, 1)
let toplam = db.fetch(`toplam.${message.author.id}`)
////// KAYIT SAYISI ///////  
  
  if(kız === null) kız = "0"
if(kız === undefined) kız = "0"
if(toplam === null) toplam = "0"
if(toplam === undefined) toplam = "0"
  
 
  
  let embed = new MessageEmbed().setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true})).setFooter("ㄓ T Λ U R U S ❤️ AGNES").setColor(client.randomColor()).setTimestamp();
  if((!ayar.erkekRolleri && !ayar.kizRolleri) || !ayar.teyitciRolleri) return message.channel.send("**Roller ayarlanmamış!**").then(x => x.delete({timeout: 5000}));
  if(!ayar.teyitciRolleri.some(rol => message.member.roles.cache.has(rol)) && !message.member.roles.cache.has(ayar.sahipRolu)) return message.channel.send(embed.setDescription(`Kayıt komutunu kullanabilmek için herhangi bir yetkiye sahip değilsin.`)).then(x => x.delete({timeout: 5000}));
  let uye = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
  if(!uye) return message.channel.send(embed.setDescription("Geçerli bir üye belirtmelisin!")).then(x => x.delete({timeout: 5000}));
  if (message.member.roles.highest.position <= uye.roles.highest.position) return message.channel.send(embed.setDescription(`Belirttiğin kişi senden üstün veya onunla aynı yetkidesin!`)).then(x => x.delete({timeout: 5000}));
  args = args.filter(a => a !== "" && a !== " ").splice(1);
  let yazilacakIsim;
  if (db.get(`ayar.isim-yas`)) {
    let isim = args.filter(arg => isNaN(arg)).map(arg => arg.charAt(0).replace('i', "İ").toUpperCase()+arg.slice(1)).join(" ");
    let yaş = args.filter(arg => !isNaN(arg))[0] || undefined;
    if(!isim || !yaş) return message.channel.send(embed.setDescription("Geçerli bir isim ve yaş belirtmelisin!")).then(x => x.delete({timeout: 5000}));
    yazilacakIsim = `${uye.user.username.includes(ayar.tag) ? ayar.tag : (ayar.ikinciTag ? ayar.ikinciTag : (ayar.tag || ""))} ${isim} | ${yaş}`;
  } else {
    let isim = args.join(' ');
    if(!isim) return message.channel.send(embed.setDescription("Geçerli bir isim belirtmelisin!")).then(x => x.delete({timeout: 5000}));
    yazilacakIsim = `${uye.user.username.includes(ayar.tag) ? ayar.tag : (ayar.ikinciTag ? ayar.ikinciTag : (ayar.tag || ""))} ${isim}`;
  };
      if (ayar.teyitsizRolleri && ayar.teyitsizRolleri.some(rol => uye.roles.cache.has(rol))) kdb.add(`teyit.${message.author.id}.kiz`, 1);
      await uye.roles.set(ayar.kizRolleri || []).catch();
     
    uye.setNickname(`${yazilacakIsim}`).catch();
    if(ayar.tag && uye.user.username.includes(ayar.tag)) uye.roles.add(ayar.ekipRolu).catch();
      message.channel.send(embed.setAuthor(message.guild.name, message.guild.iconURL({ dynamic: true })).setFooter("ㄓ T Λ U R U S ❤️ AGNES").setImage("https://cdn.discordapp.com/attachments/736988931186229258/776842903271112704/asdasd.gif").setDescription(`**__Kayıt İşlemi Başarılı__**\n\nKayıt Edilen Kişi: ${uye}\nKayıt Yapan Yetkili: ${message.author}\nKayıt İşleminde Verilen Rol: <@&${ayar.kizRolleri}> \nKayıt İşleminde Alınan Rol: <@&${ayar.teyitsizRolleri}>\nKayıt Sayısı: \`${toplam}\` `).setFooter(`ㄓ T Λ U R U S ❤️ AGNES`).setColor("RANDOM").setTimestamp())

};
module.exports.configuration = {
  name: "kız",
  aliases: ["kız", "k", "woman", "girl"],
  usage: "kız [üye] [isim] [yaş]",
  description: "Belirtilen üyeyi kız olarak kaydeder."
};