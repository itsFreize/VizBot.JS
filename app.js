const Discord = require('discord.js');
const client = new Discord.Client();
const yt = require('ytdl-core');

const config = require("./config.json")
const help = require("./help.json")

client.on('ready', () => {
  console.log('I am ready!');
  client.user.setStatus("Setting up skynet")
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

  // if (command === "test"){
  //   message.channel.sendMessage("", {
  //     embed: {
  //       title : ">test_",
  //       description: ">_ This is working"
  //     }
  //   })
  // }

  if (command === "help_help"){
    var fs = require("fs");
    var contents = fs.readFileSync("help.json");
    var jsonContent = JSON.parse(contents);

    message.reply("", {
      embed: {
        title: "VizBot.JS Help Guide: Help command",
        description: "Detailed guide for our help command.",
        fields:[
          {
            name: "Usage:",
            value: " >help",
            inline: true
          },
          {
            name: "Description:",
            value: jsonContent.helphelp,
            inline: true
          }
        ],
        color: 0xff00D4,
        timestamp: new Date(),
        footer:
        {
          text: "<3 VizBot.JS",
          inline: true
        }
      }
      })
  }

  if (command === "kick_help"){
    var fs = require("fs");
    var contents = fs.readFileSync("help.json");
    var jsonContent = JSON.parse(contents);

    message.reply("", {
      embed: {
        title: "VizBot.JS Help Guide: Kick command",
        description: "Detailed guide for our kick command.",
        fields:[
          {
            name: "Usage:",
            value: " >kick",
            inline: true
          },
          {
            name: "Description:",
            value: jsonContent.helpkick,
            inline: true
          }
        ],
        color: 0xff00D4,
        timestamp: new Date(),
        footer:
        {
          text: "<3 VizBot.JS",
          inline: true
        }
      }
      })
  }

  if (command === "warn_help"){
    var fs = require("fs");
    var contents = fs.readFileSync("help.json");
    var jsonContent = JSON.parse(contents);

    message.reply("", {
      embed: {
        title: "VizBot.JS Help Guide: Warn command",
        description: "Detailed guide for our warn command.",
        fields:[
          {
            name: "Usage:",
            value: " >warn",
            inline: true
          },
          {
            name: "Description:",
            value: jsonContent.helpwarn,
            inline: true
          }
        ],
        color: 0xff00D4,
        timestamp: new Date(),
        footer:
        {
          text: "<3 VizBot.JS",
          inline: true
        }
      }
      })
  }

  if (command === "add_help"){
    var fs = require("fs");
    var contents = fs.readFileSync("help.json");
    var jsonContent = JSON.parse(contents);

    message.reply("", {
      embed: {
        title: "VizBot.JS Help Guide: Add command",
        description: "Detailed guide for our add command.",
        fields:[
          {
            name: "Usage:",
            value: " >add",
            inline: true
          },
          {
            name: "Description:",
            value: jsonContent.helpadd,
            inline: true
          }
        ],
        color: 0xff00D4,
        timestamp: new Date(),
        footer:
        {
          text: "<3 VizBot.JS",
          inline: true
        }
      }
      })
  }

  if (command === "subtract_help"){
    var fs = require("fs");
    var contents = fs.readFileSync("help.json");
    var jsonContent = JSON.parse(contents);

    message.reply("", {
      embed: {
        title: "VizBot.JS Help Guide: Subtract command",
        description: "Detailed guide for our subtract command.",
        fields:[
          {
            name: "Usage:",
            value: " >subtract",
            inline: true
          },
          {
            name: "Description:",
            value: jsonContent.helpsubtract,
            inline: true
          }
        ],
        color: 0xff00D4,
        timestamp: new Date(),
        footer:
        {
          text: "<3 VizBot.JS",
          inline: true
        }
      }
      })
  }

  if (command === "multiply_help"){
    var fs = require("fs");
    var contents = fs.readFileSync("help.json");
    var jsonContent = JSON.parse(contents);

    message.reply("", {
      embed: {
        title: "VizBot.JS Help Guide: Multiply command",
        description: "Detailed guide for our multiply command.",
        fields:[
          {
            name: "Usage:",
            value: " >multiply",
            inline: true
          },
          {
            name: "Description:",
            value: jsonContent.helpmultiply,
            inline: true
          }
        ],
        color: 0xff00D4,
        timestamp: new Date(),
        footer:
        {
          text: "<3 VizBot.JS",
          inline: true
        }
      }
      })
  }

  if (command === "divide_help"){
    var fs = require("fs");
    var contents = fs.readFileSync("help.json");
    var jsonContent = JSON.parse(contents);

    message.reply("", {
      embed: {
        title: "VizBot.JS Help Guide: Divide command",
        description: "Detailed guide for our divide command.",
        fields:[
          {
            name: "Usage:",
            value: " >divide",
            inline: true
          },
          {
            name: "Description:",
            value: jsonContent.helpdivide,
            inline: true
          }
        ],
        color: 0xff00D4,
        timestamp: new Date(),
        footer:
        {
          text: "<3 VizBot.JS",
          inline: true
        }
      }
      })
  }

  if (command === "say_help"){
    var fs = require("fs");
    var contents = fs.readFileSync("help.json");
    var jsonContent = JSON.parse(contents);

    message.reply("", {
      embed: {
        title: "VizBot.JS Help Guide: Say command",
        description: "Detailed guide for our say command.",
        fields:[
          {
            name: "Usage:",
            value: " >say",
            inline: true
          },
          {
            name: "Description:",
            value: jsonContent.helpsay,
            inline: true
          }
        ],
        color: 0xff00D4,
        timestamp: new Date(),
        footer:
        {
          text: "<3 VizBot.JS",
          inline: true
        }
      }
      })
  }

  if (command === "purge_help"){
    var fs = require("fs");
    var contents = fs.readFileSync("help.json");
    var jsonContent = JSON.parse(contents);

    message.reply("", {
      embed: {
        title: "VizBot.JS Help Guide: Purge command",
        description: "Detailed guide for our purge command.",
        fields:[
          {
            name: "Usage:",
            value: " >purge",
            inline: true
          },
          {
            name: "Description:",
            value: jsonContent.helppurge,
            inline: true
          }
        ],
        color: 0xff00D4,
        timestamp: new Date(),
        footer:
        {
          text: "<3 VizBot.JS",
          inline: true
        }
      }
      })
  }

  if (command === "avatarurl_help"){
    var fs = require("fs");
    var contents = fs.readFileSync("help.json");
    var jsonContent = JSON.parse(contents);

    message.reply("", {
      embed: {
        title: "VizBot.JS Help Guide: AvatarURL command",
        description: "Detailed guide for our avatarurl command.",
        fields:[
          {
            name: "Usage:",
            value: " >avatarurl",
            inline: true
          },
          {
            name: "Description:",
            value: jsonContent.helpavatar,
            inline: true
          }
        ],
        color: 0xff00D4,
        timestamp: new Date(),
        footer:
        {
          text: "<3 VizBot.JS",
          inline: true
        }
      }
      })
  }

  if (command === "dice_help"){
    var fs = require("fs");
    var contents = fs.readFileSync("help.json");
    var jsonContent = JSON.parse(contents);

    message.reply("", {
      embed: {
        title: "VizBot.JS Help Guide: Dice command",
        description: "Detailed guide for our dice command.",
        fields:[
          {
            name: "Usage:",
            value: " >dice",
            inline: true
          },
          {
            name: "Description:",
            value: jsonContent.helpdice,
            inline: true
          }
        ],
        color: 0xff00D4,
        timestamp: new Date(),
        footer:
        {
          text: "<3 VizBot.JS",
          inline: true
        }
      }
      })
  }

  if (command === "bottest_help"){
    var fs = require("fs");
    var contents = fs.readFileSync("help.json");
    var jsonContent = JSON.parse(contents);

    message.reply("", {
      embed: {
        title: "VizBot.JS Help Guide: BotTest command",
        description: "Detailed guide for our BotTest command.",
        fields:[
          {
            name: "Usage:",
            value: " >bottest",
            inline: true
          },
          {
            name: "Description:",
            value: jsonContent.helpbottest,
            inline: true
          }
        ],
        color: 0xff00D4,
        timestamp: new Date(),
        footer:
        {
          text: "<3 VizBot.JS",
          inline: true
        }
      }
      })
  }

  if(command === "about_help"){
    var fs = require("fs");
    var contents = fs.readFileSync("help.json");
    var jsonContent = JSON.parse(contents);

    message.reply("", {
      embed: {
        title: "VizBot.JS Help Guide: About command",
        description: "Detailed guide for our about command.",
        fields:[
          {
            name: "Usage:",
            value: " >about",
            inline: true
          },
          {
            name: "Description:",
            value: jsonContent.helpabout,
            inline: true
          }
        ],
        color: 0xff00D4,
        timestamp: new Date(),
        footer:
        {
          text: "<3 VizBot.JS",
          inline: true
        }
      }
      })
  }

  if(command === "aboutlong_help"){
    var fs = require("fs");
    var contents = fs.readFileSync("help.json");
    var jsonContent = JSON.parse(contents);

    message.reply("", {
      embed: {
        title: "VizBot.JS Help Guide: AboutLong command",
        description: "Detailed guide for our aboutlong command.",
        fields:[
          {
            name: "Usage:",
            value: " >aboutlong",
            inline: true
          },
          {
            name: "Description:",
            value: jsonContent.helpaboutlong,
            inline: true
          }
        ],
        color: 0xff00D4,
        timestamp: new Date(),
        footer:
        {
          text: "<3 VizBot.JS",
          inline: true
        }
      }
      })
  }

  if(command === "gen_help"){
    var fs = require("fs");
    var contents = fs.readFileSync("help.json");
    var jsonContent = JSON.parse(contents);

    message.reply("", {
      embed: {
        title: "VizBot.JS Help Guide: Gen command",
        description: "Detailed guide for our gen command.",
        fields:[
          {
            name: "Usage:",
            value: " >gen",
            inline: true
          },
          {
            name: "Description:",
            value: jsonContent.helpgen,
            inline: true
          }
        ],
        color: 0xff00D4,
        timestamp: new Date(),
        footer:
        {
          text: "<3 VizBot.JS",
          inline: true
        }
      }
      })
  }

  if(command === "verygrr_help"){
    var fs = require("fs");
    var contents = fs.readFileSync("help.json");
    var jsonContent = JSON.parse(contents);

    message.reply("", {
      embed: {
        title: "VizBot.JS Help Guide: VeryGRR command",
        description: "Detailed guide for our verygrr command.",
        fields:[
          {
            name: "Usage:",
            value: " >verygrr",
            inline: true
          },
          {
            name: "Description:",
            value: jsonContent.helpaustin,
            inline: true
          }
        ],
        color: 0xff00D4,
        timestamp: new Date(),
        footer:
        {
          text: "<3 VizBot.JS",
          inline: true
        }
      }
      })
  }

  if(command === "yeahbaby_help"){
    var fs = require("fs");
    var contents = fs.readFileSync("help.json");
    var jsonContent = JSON.parse(contents);

    message.reply("", {
      embed: {
        title: "VizBot.JS Help Guide: YeahBaby command",
        description: "Detailed guide for our yeahaby command.",
        fields:[
          {
            name: "Usage:",
            value: " >yeahbaby",
            inline: true
          },
          {
            name: "Description:",
            value: jsonContent.helpaustin,
            inline: true
          }
        ],
        color: 0xff00D4,
        timestamp: new Date(),
        footer:
        {
          text: "<3 VizBot.JS",
          inline: true
        }
      }
      })
  }

  if(command === "horny_help"){
    var fs = require("fs");
    var contents = fs.readFileSync("help.json");
    var jsonContent = JSON.parse(contents);

    message.reply("", {
      embed: {
        title: "VizBot.JS Help Guide: Horny command",
        description: "Detailed guide for our horny command.",
        fields:[
          {
            name: "Usage:",
            value: " >horny",
            inline: true
          },
          {
            name: "Description:",
            value: jsonContent.helpaustin,
            inline: true
          }
        ],
        color: 0xff00D4,
        timestamp: new Date(),
        footer:
        {
          text: "<3 VizBot.JS",
          inline: true
        }
      }
      })
  }

  if(command === "yomama_help"){
    var fs = require("fs");
    var contents = fs.readFileSync("help.json");
    var jsonContent = JSON.parse(contents);

    message.reply("", {
      embed: {
        title: "VizBot.JS Help Guide: YoMama command",
        description: "Detailed guide for our yomama command.",
        fields:[
          {
            name: "Usage:",
            value: " >yomama",
            inline: true
          },
          {
            name: "Description:",
            value: jsonContent.helpyomama,
            inline: true
          }
        ],
        color: 0xff00D4,
        timestamp: new Date(),
        footer:
        {
          text: "<3 VizBot.JS",
          inline: true
        }
      }
      })
  }

  if(command === "strat_help"){
    var fs = require("fs");
    var contents = fs.readFileSync("help.json");
    var jsonContent = JSON.parse(contents);

    message.reply("", {
      embed: {
        title: "VizBot.JS Help Guide: Strat command",
        description: "Detailed guide for our strat command.",
        fields:[
          {
            name: "Usage:",
            value: " >strat",
            inline: true
          },
          {
            name: "Description:",
            value: jsonContent.helpstrat,
            inline: true
          }
        ],
        color: 0xff00D4,
        timestamp: new Date(),
        footer:
        {
          text: "<3 VizBot.JS",
          inline: true
        }
      }
      })
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

  //Generator Command
  if(command === "gen"){
      var text ="";
      var possible ="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

      for( var i=0; i <10; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));

      message.reply(text);
  }

  //YOmama
  if(command === "yomama"){
      var Joke = new Array()

      Joke[0] = "Yo mama so fat she goes to KFC and licks other people’s fingers.";
      Joke[1] = "Yo mama so dumb when you stand next to her you hear the ocean!";
      Joke[2] = "Yo momma so stupid, when I told her that she lost her mind, she went looking for it.";
      Joke[3] = "Yo momma so fat Burger King hired her because she eats cows and shits hamburgers.";
      Joke[4] = "Yo mama so fat she left the house in high heels and when she came back she had on flip flops.";
      Joke[5] = "Yo mama so ugly, even hello kitty said goodbye.";
      Joke[6] = "Yo mama so fat she ate a whole Pizza… Hut.";
      Joke[7] = "Yo mama is so dumb she got awarded the Nobel prize for stupidity.";
      Joke[8] = "Yo momma so ugly she threw a boomerang and it refused to come back.";
      Joke[9] = "Yo mama so dumb she sold her car for gas money!";
      Joke[10] = "Yo Mamas so stupid she was yelling into the mailbox. We ask her what’s she doing and she said, she was sending a voice-mail."

      var J = Joke.length;
      var whichJoke=Math.round(Math.random()*(J-1));
      function showJoke(){
        message.reply(Joke[whichJoke]);
      }
      showJoke();
  }

  //StratRoullete
  if(command === "strat"){
    var fs = require("fs");
    var contents = fs.readFileSync("./strats.json");
    var jsonContent = JSON.parse(contents);
    var Strat = new Array()

    Strat[0] = jsonContent.strat1;
    Strat[1] = jsonContent.strat2;
    Strat[2] = jsonContent.strat3;
    Strat[3] = jsonContent.strat4;
    Strat[4] = jsonContent.strat5;
    Strat[5] = jsonContent.strat6;
    Strat[6] = jsonContent.strat7;
    Strat[7] = jsonContent.strat8;
    Strat[8] = jsonContent.strat9;
    Strat[9] = jsonContent.strat10;
    Strat[10] = jsonContent.strat11;
    Strat[11] = jsonContent.strat12;
    Strat[12] = jsonContent.strat13;
    Strat[13] = jsonContent.strat14;
    Strat[14] = jsonContent.strat15;
    Strat[15] = jsonContent.strat16;
    Strat[16] = jsonContent.strat17;
    Strat[17] = jsonContent.strat18;
    Strat[18] = jsonContent.strat19;
    Strat[19] = jsonContent.strat20;
    Strat[20] = jsonContent.strat21;
    Strat[21] = jsonContent.strat22;
    Strat[22] = jsonContent.strat23;
    Strat[23] = jsonContent.strat24;
    Strat[24] = jsonContent.strat25;

    var S = Strat.length;
    var whichStrat = Math.round(Math.random()*(S-1));
    function showStrat(){
      message.reply(Strat[whichStrat]);
    }
    showStrat();
  }

  //Austin Powers realted
  if (command === "yeahbaby"){
    //https://www.youtube.com/watch?v=ec_n2YTdA24
    const voiceChannel = message.member.voiceChannel;
    if (!voiceChannel){
      return message.reply("Please be in a voice channel first");
    }
    voiceChannel.join()
      .then(connection =>{
        let stream = yt("https://www.youtube.com/watch?v=ayLPWCLot74", {audioonly: true});
        const dispatcher = connection.playStream(stream);
        dispatcher.on('end',() => {
          voiceChannel.leave();
        })
      });
  }

  if (command === "horny"){
    //https://www.youtube.com/watch?v=ec_n2YTdA24
    const voiceChannel = message.member.voiceChannel;
    if (!voiceChannel){
      return message.reply("Please be in a voice channel first");
    }
    voiceChannel.join()
      .then(connection =>{
        let stream = yt("https://www.youtube.com/watch?v=ec_n2YTdA24", {audioonly: true});
        const dispatcher = connection.playStream(stream);
        dispatcher.on('end',() => {
          voiceChannel.leave();
        })
      });
  }

  if (command === "verygrr"){
    const voiceChannel = message.member.voiceChannel;
    if (!voiceChannel){
      return message.reply("Please be in a voice channel first");
    }
    voiceChannel.join()
      .then(connection =>{
        let stream = yt("https://www.youtube.com/watch?v=N-oGL6e744A", {audioonly: true});
        const dispatcher = connection.playStream(stream);
        dispatcher.on('end',() => {
          voiceChannel.leave();
        })
      });
  }

  //Super baisc ping command used to ensure the bot is online
  if (command === "bottest") {
    message.channel.sendMessage('Passed!');
  }
});

client.login(config.token);
