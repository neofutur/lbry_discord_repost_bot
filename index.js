// Load up the discord.js library
const Discord = require("discord.js");

/*
 DISCORD.JS VERSION 12 CODE
*/


// This is your client. Some people call it `bot`, some people call it `self`, 
// some might call it `cootchie`. Either way, when you see `client.something`, or `bot.something`,
// this is what we're refering to. Your client.
const client = new Discord.Client();

// Here we load the config.json file that contains our token and our prefix values. 
const config = require("./config.json");
// config.token contains the bot's token
// config.prefix contains the message prefix.

// the heatmap screenshot here is generated with a puppeteer headless chromium
const  intervalmilliseconds = config.posteveryXmins * 60000; 
const channelid=config.channelid;
const yourLBRYchannelClaimId=config.yourLBRYchannelClaimId;
const yourLBRYchannelURL=config.yourLBRYchannelURL;

console.log(channelid);
console.log(yourLBRYchannelClaimId);
console.log(yourLBRYchannelURL);

client.on("ready", () => {
  // This event will run if the bot starts, and logs in, successfully.
  console.log(`Bot has started, with ${client.users.cache.size} users, in ${client.channels.cache.size} channels of ${client.guilds.cache.size} guilds.`);
  // Example of changing the bot's playing game to something useful. `client.user` is what the
  // docs refer to as the "ClientUser".
  client.user.setActivity(`Serving ${client.guilds.cache.size} servers`);

  // this is the code to autopost the heatmap every X minutes on a dedicated channel 
setInterval(() => {
   // we have to add a timestamp to the URL so that discord does not cache the image
   const d = Math.floor(Date.now() / 1000);
  const hm = "http://neoxena.ww7.be/heatmap_5m.png" + "?t=" + d;
   const datenow = new Date();
   const dateutc = datenow.toUTCString();
  // building the embed that will be posted
  const HMEmbed = new Discord.MessageEmbed()
	          .setColor('#0099ff')
	          .addField('recent news reposted on lbry://'+ yourLBRYchannelURL +' @neonews', dateutc, true)
//	          .setImage( hm)
	          .setTimestamp()
	          .setFooter('Source : https://'+ yourLBRYchannelURL +' ', 'https://bitcoinwisdom.io/apple-touch-icon-180x180.png');
   // 60000 milliseconds in 1 minute

  client.channels.cache.get(config.channelid).send(HMEmbed);
        }, intervalmilliseconds); // Runs this every X milliseconds.
});

client.on("guildCreate", guild => {
  // This event triggers when the bot joins a guild.
  console.log(`New guild joined: ${guild.name} (id: ${guild.id}). This guild has ${guild.memberCount} members!`);
  client.user.setActivity(`Serving ${client.guilds.cache.size} servers`);
});

client.on("guildDelete", guild => {
  // this event triggers when the bot is removed from a guild.
  console.log(`I have been removed from: ${guild.name} (id: ${guild.id})`);
  client.user.setActivity(`Serving ${client.guilds.cache.size} servers`);
});

client.on("message", async message => {
  // This event will run on every single message received, from any channel or DM.
  
  // It's good practice to ignore other bots. This also makes your bot ignore itself
  // and not get into a spam loop (we call that "botception").
  if(message.author.bot) return;
  
  // Also good practice to ignore any message that does not start with our prefix, 
  // which is set in the configuration file.
  if(!message.content.startsWith(config.prefix)) return;
  
  // Here we separate our "command" name, and our "arguments" for the command. 
  // e.g. if we have the message "+say Is this the real life?" , we'll get the following:
  // command = say
  // args = ["Is", "this", "the", "real", "life?"]
  const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();
 
  // this is the main command, ln for LBRY news
  if(command === "ln") {

   // we have to add a timestamp to the URL so that discord does not cache the image
   const d = Math.floor(Date.now() / 1000);
   const datenow = new Date();
   const dateutc = datenow.toUTCString();


   // building the embed that will be posted
   const HMEmbed = new Discord.MessageEmbed()
	.setColor('#0099ff')
	.addField('recent news reposted on lbry://'+ yourLBRYchannelURL +' @neonews', dateutc, true)
//	.setImage( hm)
	.setTimestamp()
	.setFooter('Source : https://'+ yourLBRYchannelURL +' ', 'https://bitcoinwisdom.io/apple-touch-icon-180x180.png');
   message.channel.send(HMEmbed);
  }
 
  // Let's go with a few common example commands! Feel free to delete or change those.
  if(command === "ping") {
    // Calculates ping between sending a message and editing it, giving a nice round-trip latency.
    // The second ping is an average latency between the bot and the websocket server (one-way, not round-trip)
    const m = await message.channel.send("Ping?");
    m.edit(`Pong! Latency is ${m.createdTimestamp - message.createdTimestamp}ms. API Latency is ${Math.round(client.ws.ping)}ms`);
  }
  
});

client.login(config.token);

