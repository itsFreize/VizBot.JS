const Discord = require('discord.js');
const client = new Discord.Client();
const git = require(`git-rev`);
const delayed = require(`delayed`);

const config = require("./config.json")

client.on('ready', () => {
  console.log('I am ready!');
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

  //Help Command
  if (command === "help"){
    message.channel.sendMessage("``` **VizBot.JS** \n Welcome user to the Vizbot.JS help system \n ---------- \n All commands are prefaced by a greater than symbol (>) and must be written in lower case E.G >help would bring up this help menu. \n \n >help :- Brings up this help menu \n >kick <@USER_NAME> :- Kicks the mentioned user from the Discord server \n >add<NUMBERS SEPERATED BY SPACES> :- Will add together given numbers \n >subtract<NUMBERS SEPERATED BY SPACES> :- will subtract given numbers \n >multiply<NUMBERS SEPERATED BY SPACES> :- will multiply given numbers \n >divide<NUMBERS SEPERATED BY SPACES> :- will divide given numbers \n >say<INPUT> :- Forces the bot to repeat user input \n >purge :- Clears the last 100 comments from the text channel \n >avatarurl :- Provides the user with a link to their Discord avatar \n >bottest :- used for testing the bot connectivity```");
  }

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
