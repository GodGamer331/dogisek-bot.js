const Discord = require("discord.js");
const bot = new Discord.Client({disableEveryone: true});
const fs = require("fs");
bot.on("ready", async () => {
  console.log(`${bot.user.username} is online!`);
  
  bot.user.setActivity("To my creator JustNela#666", {type: "LISTENING"});
});






bot.on("message", async message => {

  if (message.author.bot) return;
  if (message.channel.type === "dm") return;

  let prefix = ">";
  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];
  let args = messageArray.slice(1);
  let a = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  let b = args.join(" ").slice(22)
  let logs = message.guild.channels.find(`name`, `logs`);
  //let mods = message.guild.roles.find("name", "Moderator");
  let premium = message.guild.roles.find("name", "★†Premium†★");
  
  if(!premium) return message.channel.send("Nemáš Prémium u Dogisek Bot!!")
  if (cmd === `${prefix}help`){
    if(message.member.roles.has(premium.id)) {
      module.exports.run = async (bot, message, args) => {

      const sayMessage = args.join(" ");
      message.delete().catch();
      message.channel.send(sayMessage);
    }
    }
    
    module.exports.help = {
      name: "say"
    }
  }
});

bot.login(process.env.token);
