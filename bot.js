const Discord = require("discord.js");
const bot = new Discord.Client({disableEveryone: true});
const fs = require("fs");
const ms = rrquire("ms");
let warns = JSON.parse(fs.readFileSync("./warns.json", "utf8"));

bot.on("ready", async () => {
  console.log(`${bot.user.username} is online!`);
  
  bot.user.setActivity("Všechny prémium! [>]", {type: "WATCHING"});
});



module.exports.run = async (bot, message, args) => {

  //!warn @daeshan <reason>
  if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("Nemohu  to udělat!!");
  let wUser = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0])
  if(!wUser) return message.reply("Couldn't find them yo");
  if(wUser.hasPermission("MANAGE_MESSAGES")) return message.reply("On/a Je moderátor!");
  let reason = args.join(" ").slice(22);

  if(!warns[wUser.id]) warns[wUser.id] = {
    warns: 0
  };

  warns[wUser.id].warns++;

  fs.writeFile("./warns.json", JSON.stringify(warns), (err) => {
    if (err) console.log(err)
  });

  let warnEmbed = new Discord.RichEmbed()
  .setDescription("Varování")
  .setAuthor(message.author.username)
  .setColor("#fc6400")
  .addField("Varovaný hráč:", `<@${wUser.id}>`)
  .addField("Varován v:", message.channel)
  .addField("Varování :z", warns[wUser.id].warns + "/3")
  .addField("Důvod:", reason);

  let warnchannel = message.guild.channels.find(`name`, `logs`);
  if(!warnchannel) return message.reply("Nemohu najít tento kanál");

  warnchannel.send(warnEmbed);

  if(warns[wUser.id].warns == 2){
    let muterole = message.guild.roles.find(`name`, "muted");
    if(!muterole) return message.reply("You should create that role dude.");
};
    let mutetime = "10s";
    await(wUser.addRole(muterole.id));
    message.channel.send(`<@${wUser.id}> has been temporarily muted`);

    setTimeout(function(){
      wUser.removeRole(muterole.id)
      message.reply(`<@${wUser.id}> has been unmuted.`)
    }, ms(mutetime))
  };
  if(warns[wUser.id].warns == 3){
    message.guild.member(wUser).ban(reason);
    message.reply(`<@${wUser.id}> has been banned.`)
  };

};
    
module.exports.help = {
  name: "warn"
  }
};

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
