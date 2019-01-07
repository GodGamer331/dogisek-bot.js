const Discord = require("discord.js");
const bot = new Discord.Client({disableEveryone: true});
const fs = require("fs");

bot.on("ready", async () => {
  console.log(`${bot.user.username} is online!`);
  
  bot.user.setActivity("Všechny prémium! [>]", {type: "WATCHING"});
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
  let mods = message.guild.roles.find("name", "Moderator");
  let premium = message.guild.roles.find("name", "★†Premium†★");
  
  
  if(!premium) return message.channel.send("Nemáš Prémium u Dogisek Bot!!")
  if (cmd === `${prefix}say`){
    if(!args[0]) return message.channel.send("Použití: ``>say BlahBlahBlah lol``")
    const saytxt = args.join(" ");
    message.channel.send(saytxt)
  }
  
  if(!premium) return message.channel.send("Nejsi Premium na tomto serveru!")
  if(cmd === `${prefix}help`){
    var embed = new Discord.RichEmbed()
    .setTitle("Zdásemi že potřebuješ pomoc" + message.author)
    .addField(">say", "Bot řekne co chceš!")
    .setThumbnail(message.author.avatarURL);
    message.channel.send(embed)
  
  };
  let wUser = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
  let reason = args.join(" ").slice(22)
  if(!warns[wUser.id]) warns(wUser.id) = {
    warns = 0
  };
  warns[wUser.id].warns++;
  
  warns = JSON.parse(fs.readFileSync("./warns.json", "utf8"));

  
  fs.writeFile("./warns.json", JSON.stringify(warns), (err) => {
    if (err) console.log(err);
  
  if(!mods) return message.channel.send("Nejsi Moderátor!")
  if(wUser.hasPermission("MANAGE_MESSAGES")) return message.reply("Tento Uživatel je moderátor. a nemohu jej varovat.");
  if(!wUser) return message.reply("Tento člověk nejspíše není na tomto serveru!");
  if(cmd === `${prefix}warn`){
    var warnembed = new Discord.RichEmbed()
    .setTitle("Varování")
    .addField("Varování pro:", wUser)
    .addField("Moderátor:", message.author.username)
    .addField("Důvod:", reason)
    .addField("Varování z:", warns[wUser.id].warns + "/3")
    .setColor("RED")
    .setTimestamp();
    
    let channelw = message.guild.channels.find(`name`, "logs");
    channelw.send(warnembed)
  };
  
    
  
});

bot.login(process.env.token);
