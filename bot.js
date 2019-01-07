const Discord = require("discord.js");
const bot = new Discord.Client({disableEveryone: true});
const fs = require("fs");

let warns = JSON.parse(fs.readFileSync("./warnings.json", "utf8"));

bot.on("ready", async () => {
  console.log(`${bot.user.username} is online!`);
  
  bot.user.setActivity("Všechny prémium! [>]", {type: "WATCHING"});
});


//fuck

module.exports.run = async (bot, message, args) => {

if(!warns.warns) {
message.channel.send(new Discord.RichEmbed()
.setDescription("There are no warnings")
);
return;
};
if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("You can't do that.");
let wUser = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0])
if(!wUser) return message.reply("Couldn't find them yo");
let warnlevel = warns[wUser.id].warns;

message.channel.send(new Discord.RichEmbed()
.setDescription("Warning Information")
.setColor("#c40000")
.addField("Member", `${wUser.id}`)
.addField("Moderator", message.author.username)
.addField("Amount of Warns", warnlevel));

}

module.exports.help = {
name: "warnlevel"
}

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
  let mods = message.guild.roles.find("name", "Moderator");
  let premium = message.guild.roles.find("name", "★†Premium†★");
  
  
  if(!premium) return message.channel.send("Nemáš Prémium u Dogisek Bot!!")
  if (cmd === `${prefix}say`){
    if(!args[0]) return message.channel.send("Použití: ``>say BlahBlahBlah lol``")
    const saytxt = args.join(" ");
    message.channel.send(saytxt)
  };
  
  if(!premium) return message.channel.send("Nejsi Premium na tomto serveru!")
  if(cmd === `${prefix}help`){
    var embed = new Discord.RichEmbed()
    .setTitle("Zdásemi že potřebuješ pomoc" + message.author)
    .addField(">say", "Bot řekne co chceš!")
    .addField(">warn", "Varuje Hráče.")
    .setThumbnail(message.author.avatarURL);
    message.channel.send(embed)
  
  };
  
    
  
});

bot.login(process.env.token);
