import Discord from "discord.js";
const clientAuthToken = process.env.DISCORD_CLIENT_AUTH_TOKEN;
import rollDice from "./diceRoller.mjs";

const discordClient = new Discord.Client();

const commandPrefix = "!";

discordClient.on("message", message => {
  if (!message.content.startsWith(commandPrefix) && message.author.bot) {
    return;
  }
  //console.log(message);
  const args = message.content
    .slice(commandPrefix.length)
    .trim()
    .split(/ +/);
  const command = args.shift().toLowerCase();

  console.log({ args, command });
  if (command === "roll" || "r") {
    // Do the thing Zhu Li
    let diceRollArgs = args[0];
    console.log({ diceRollArgs });
    let resultOfRoll = rollDice(diceRollArgs);
    console.log({ resultOfRoll });
    message.channel.send(
      `@${message.author.username} rolled ${JSON.stringify(resultOfRoll)}`
    );
  }
});

discordClient.login(clientAuthToken);
