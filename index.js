const Discord = require("discord.js");
const clientAuthToken = process.env.DISCORD_CLIENT_AUTH_TOKEN;
const rollDice = require("./diceRoller.js");

const discordClient = new Discord.Client();

const commandPrefix = "!";

discordClient.on("message", (message) => {
  console.log(message);
  if (message.content.startsWith(commandPrefix) && !message.author.bot) {
    const args = message.content.slice(1).split(/ +/);
    const command = args[0].toLowerCase();

    if (command === "roll" || "r") {
      // Do the thing Zhu Li
    }
  }
  return;
});

discordClient.login(clientAuthToken);
