//INCLUDES

const Discord = require('discord.js');
const botconfig = require('./botconfig.json');
const bot = new Discord.Client({disableEveryone: true});
const fs = require("fs");
bot.commands = new Discord.Collection();

fs.readdir("./commands/", (err, files) => {

  if (err) console.log(err);

  let jsfile = files.filter(f => f.split(".").pop() === "js")
  if(jsfile.length <= 0){
    console.log("Couldn't find commands.");
    return;
  }

  jsfile.forEach((f, i) =>{
    let props = require(`./commands/${f}`);
    console.log(`${f} command loaded!`);
    bot.commands.set(props.help.name, props);
  });

});

  //LOG ON START
bot.on("ready", async () => {
  console.log("Justice Bot has turned on!")
  bot.user.setActivity("SAY !botinfo", {type: "WATCHING"});


});
  //ALL SETTINGS FOR COMMANDS
bot.on("message", async message => {
  if (message.author.bot) return;
  if (message.channel.type === "bot-commands") return;

  let prefix = "!";
  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];
  let args = messageArray.slice(1);

  let commandfile = bot.commands.get(cmd.slice(prefix.length));
  if(commandfile) commandfile.run(bot,message,args);
});

//bot.login('NDUzMjIzODk2MzQzMzc5OTY4.DfbxMQ.TapyCevQ1c65rUhijCatzHnUeBg');
client.login('process.env.BOT_TOKEN');
