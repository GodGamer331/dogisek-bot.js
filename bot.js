const Discord = require("discord.js");
const bot = new Discord.Client({disableEveryone: true});
const fs = require("fs");

//let warns = JSON.parse(fs.readFileSync("./warnings.json", "utf8"));

bot.on("ready", async () => {
  console.log(`${bot.user.username} is online!`);
  
  bot.user.setActivity("Všechny prémium! [>]", {type: "WATCHING"});
});


//fuck




bot.on("message", async message => {

  if (message.author.bot) return;
  if (message.channel.type === "dm") return;

  let prefix = ">";
  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];
  let args = messageArray.slice(1);
  let a = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  let b = args.join(" ").slice(22);
  let logs = message.guild.channels.find(`name`, `logs`);
  let mods = message.guild.roles.find("name", "Moderator");
  let premium = message.guild.roles.find("name", "★†Premium†★");
  
  
  if(!premium) return message.channel.send("Nemáš Prémium u Dogisek Bot!!")
  if (cmd === `${prefix}say`){
    if(!args[0]) return message.channel.send("Použití: ``>say BlahBlahBlah lol``")
    const saytxt = args.join(" ");
    message.channel.send(saytxt)
    return;
  };
  
  if(!premium) return message.channel.send("Nejsi Premium na tomto serveru!")
  if(cmd === `${prefix}help`){
    var embed = new Discord.RichEmbed()
    .setTitle("Zdásemi že potřebuješ pomoc" + message.author)
    .addField(">say", "Bot řekne co chceš!")
    .addField(">warn", "Varuje Hráče.")
    .setThumbnail(message.author.avatarURL);
    message.channel.send(embed)
    return;
  };
  
  let wUser = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
  let reason = args.join(" ").slice(22);
  if(!mods) return message.channel.send("Nejsi moderátor!")
  if(!reason) return message.channel.send("Nedal jsi Duvod! Použití: ``>warn @jmeno důvod``")
  if(!wUser) return message.channel.send("Nedal jsi jmeno! Použití: ``>warn @jmeno důvod``");
  if(cmd === `${prefix}warn`){
    var embed = new Discord.RichEmbed()
    .setTitle("Varování")
    .addField("Varován:", wUser)
    .addField("Moderátor:", message.author.username)
    .addField("Důvod:", reason)
    .setColor("RED")
    .setThumbnail(message.author.avatarURL);
    
    let warnchannel = message.guild.channels.find(`name`, "logs")
    if(!warnchannel) return message.channel.send("Nemůžu najít kanál ``logs``")
    
    warnchannel.send(embed)
    return;
  };
});

bot.login(process.env.token);
