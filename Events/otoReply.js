const Discord = require('discord.js');
const ayar = require("../ayarlar.json");
module.exports = (message) => {

    if (message.content.toLowerCase() === "tag") {
        message.channel.send(`ㄓ`)
    };

    if (message.content.toLowerCase() == "sa" || message.content.toLowerCase() === "sea" || message.content.toLowerCase() === "selam") {
        message.reply("Aleyküm selam kardeşim, hoşgeldin.").then(x => x.delete({timeout: 8000}));
    };

};

module.exports.configuration = {
    name: "message"
  }