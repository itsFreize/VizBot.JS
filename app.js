const Discord = require('discord.js');
const client = new Discord.Client();
const config = require("./config.json")
const help = require("./help.json")

client.on('ready', () => {
  console.log('I am ready!');
  client.user.setGame("Setting up skynet")
});

client.on("guildMemberAdd", member => {
  let guild = member.guild;
  guild.defaultChannel.sendMessage(`Welcome ${member.user} to our server!`);
});

client.on("guildCreate", guild =>{
  console.log(`New guild added : ${guild.name}, owned by ${guild.owner.user.username}`);
});

//King is a damned nerd so thats why ARK is a NERD! game on our server
client.on("presenceUpdate", (oldMember, newMember) => {
  let guild = newMember.guild;
  let playRole = guild.roles.find("name", "NERD!");
  if(!playRole) return;

  if(newMember.user.presence.game && newMember.user.presence.game.name === "ARK") {
    newMember.addRole(playRole);
  } else if(!newMember.user.presence.game && newMember.roles.has(playRole.id)) {
    newMember.removeRole(playRole);
  }
});

client.on('message', message => {
  if(message.author.bot) return;
  if(!message.content.startsWith(config.prefix)) return;

  let command = message.content.split(" ")[0];
  command = command.slice(config.prefix.length);

  let args = message.content.split(" ").splice(1);

  //Kick Command (Probably used to kick king from discord)
  if (command === "kick"){
    let modRole = message.guild.roles.find("name", "Super Admin");
    if(!message.member.roles.has(modRole.id)){
      return message.reply(`I'm sorry but you just dont have the power!`);
    }
    if(message.mentions.users.size === 0) {
      return message.reply("Please mention a user to kick");
    }
    let kickMember = message.guild.member(message.mentions.users.first());
    if (!kickMember) {
      return message.reply("That user does not seem valid");
    }
    if (!message.guild.member(client.user).hasPermission("KICK_MEMBERS")){
      return message.reply("I'm sorry captain, I just dont have the power")
    }
    kickMember.kick().then(member =>{
      message.reply(`${member.user.username} was succesfully removed from the server ... Good Riddance!`)
    }).catch(e => {
        console.error(e);
    });
  }

  //Warning command
  if (command === "warn"){
    let modRole = message.guild.roles.find("name", "Super Admin");
    if(!message.member.roles.has(modRole.id)){
      return message.reply("Sory you dont have the power to do this!");
    }
    if(message.mentions.users.size === 0){
      return message.reply("Please mention a user (@USER_NAME) to warn");
    }
    let warnMember = message.guild.member(message.mentions.users.first());
    if(!warnMember){
      return message.reply("That user does not seem valid");
    }
    if(!message.guild.member(client.user).hasPermission("KICK_MEMBERS")){
      return message.reply("I'm sorry captain, I just dont have the power")
    }
      message.channel.sendMessage(`${warnMember} you have been warned`);
    }

  //Help Commands
  if (command === "help"){
    var fs = require("fs");
    var contents = fs.readFileSync("help.json");
    var jsonContent = JSON.parse(contents);

    message.reply(jsonContent.text);
  }

  if (command === "help_help"){
    var fs = require("fs");
    var contents = fs.readFileSync("help.json");
    var jsonContent = JSON.parse(contents);

    message.reply(jsonContent.helphelp);
  }

  if (command === "kick_help"){
    var fs = require("fs");
    var contents = fs.readFileSync("help.json");
    var jsonContent = JSON.parse(contents);

    message.reply(jsonContent.helpkick);
  }

  if (command === "warn_help"){
    var fs = require("fs");
    var contents = fs.readFileSync("help.json");
    var jsonContent = JSON.parse(contents);

    message.reply(jsonContent.helpwarn);
  }

  if (command === "add_help"){
    var fs = require("fs");
    var contents = fs.readFileSync("help.json");
    var jsonContent = JSON.parse(contents);

    message.reply(jsonContent.helpadd);
  }

  if (command === "subtract_help"){
    var fs = require("fs");
    var contents = fs.readFileSync("help.json");
    var jsonContent = JSON.parse(contents);

    message.reply(jsonContent.helpsubtract);
  }

  if (command === "multiply_help"){
    var fs = require("fs");
    var contents = fs.readFileSync("help.json");
    var jsonContent = JSON.parse(contents);

    message.reply(jsonContent.helpmultiply);
  }

  if (command === "divide_help"){
    var fs = require("fs");
    var contents = fs.readFileSync("help.json");
    var jsonContent = JSON.parse(contents);

    message.reply(jsonContent.helpdivide);
  }

  if (command === "say_help"){
    var fs = require("fs");
    var contents = fs.readFileSync("help.json");
    var jsonContent = JSON.parse(contents);

    message.reply(jsonContent.helpsay);
  }

  if (command === "purge_help"){
    var fs = require("fs");
    var contents = fs.readFileSync("help.json");
    var jsonContent = JSON.parse(contents);

    message.reply(jsonContent.helppurge);
  }

  if (command === "avatarurl_help"){
    var fs = require("fs");
    var contents = fs.readFileSync("help.json");
    var jsonContent = JSON.parse(contents);

    message.reply(jsonContent.helpavatar);
  }

  if (command === "dice_help"){
    var fs = require("fs");
    var contents = fs.readFileSync("help.json");
    var jsonContent = JSON.parse(contents);

    message.reply(jsonContent.helpdice);
  }

  if (command === "bottest_help"){
    var fs = require("fs");
    var contents = fs.readFileSync("help.json");
    var jsonContent = JSON.parse(contents);

    message.reply(jsonContent.helpbottest);
  }

  if(command === "about_help"){
    var fs = require("fs");
    var contents = fs.readFileSync("help.json");
    var jsonContent = JSON.parse(contents);

    message.reply(jsonContent.helpabout);
  }

  if(command === "aboutlong_help"){
    var fs = require("fs");
    var contents = fs.readFileSync("help.json");
    var jsonContent = JSON.parse(contents);

    message.reply(jsonContent.helpaboutlong);
  }

  //Avatar Command
  if (command === "avatarurl"){
    message.reply(message.author.avatarURL);
  }

  //Purge command
  if (command === "purge") {
    let modRole = message.guild.roles.find("name", "Super Admin");
    if(!message.member.roles.has(modRole.id)){
      return message.reply(`I'm sorry but you just dont have the power!`);
    }
    message.channel.bulkDelete(100);
  }

  //Dice command
  if(command ==="dice"){
    var droll = require(`droll`);
    var result = droll.roll(`2d6`);
    message.reply(`Your dice results are: ${result}`);
  }

  //About command
  if (command === "about"){
    var git = require("git-rev-sync");
    message.reply("\nShort commit number: "+ git.short());
  }

  if(command === "aboutlong"){
    var git = require("git-rev-sync");
    message.reply("\nLong commit number: "+ git.long());
  }

  //Addition Command
  if (command === "add"){
    let numArray = args.map(n => parseInt(n));
    let total = numArray.reduce( (p, c) => p+c);

    message.channel.sendMessage(total);
  }

  //subtraction command
  if (command === "subtract"){
    let numArray = args.map(n => parseInt(n));
    let total = numArray.reduce( (p, c) => p-c);

    message.channel.sendMessage(total);
  }

  //Multiplication command
  if (command === "multiply"){
    let numArray = args.map(n => parseInt(n));
    let total = numArray.reduce( (p, c) => p*c);

    message.channel.sendMessage(total);
  }

  //Divide command
  if (command === "divide"){
    let numArray = args.map(n => parseInt(n));
    let total = numArray.reduce( (p, c) => p/c);

    message.channel.sendMessage(total);
  }

  //basic Say command
  if(command === "say"){
    message.channel.sendMessage(args.join(" "))
  }

  //Super baisc ping command used to ensure the bot is online
  if (command === "bottest") {
    message.channel.sendMessage('Passed!');
  }
});

client.login(config.token);
