const {
  Client,
  Intents,
  Collection
} = require("discord.js")
const config = require("./util/config.json");

const client = new Client({
  restTmeOFFset: 0,
  allowedMentions: {
    parse: [],
    repliedUser: false,
  },
  partials: ["MASSAGE", "CHANNEL", "REACTION"],
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES
  ],
  presence: {
    activities: [{
      name: "Cool Bot",
      type: "PLAYING"
    }],
    status: "online"
  }
});

const fs = require('fs');
const { on } = require("events");
const commands = new Collection();
const files = fs.readdirSync(`./commands`).filter(file => file.endsWith('.js'))
for(const file of files){
  const command = require(`./commands/${file}`)
  commands.set(command.name, command)
}

client.login(process.env.token)
client.on("ready", () => {
  console.log(`${client.user.tag} ready`)
})

client.on("messageCreate", async (message) =>{
  if(!message.guild || message.author.bot || !message.content.startsWith(process.env.prefix)) return;
  let args = message.content.substring(process.env.prefix.length).split(' ');
  let cmd = args.shift().toLowerCase();
  const filter = m => m.author.id === message.author.id
  
  if(cmd && cmd.length > 0){
    if(commands.has(cmd)){
      commands.get(cmd).execute(message)
    }
    else{
      message.reply(":x: **Unknown Command**").catch(console.error);
    }
      

  }
})