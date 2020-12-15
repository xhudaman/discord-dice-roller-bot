import Discord from "discord.js";
const clientAuthToken = process.env.DISCORD_CLIENT_AUTH_TOKEN;
import roll from "./src/services/diceRoller/diceRollerService.mjs";

const discordClient = new Discord.Client();

const commandPrefix = "!";

discordClient.on("message", message => {
  if (!message.content.startsWith(commandPrefix) && message.author.bot) {
    return;
  }

  const args = message.content
    .slice(commandPrefix.length)
    .trim()
    .split(/(?<=roll|r) +/);

  console.log({ message: message.content, args });
  const command = args.shift().toLowerCase();

  console.log({ args, command });
  if (command === "roll" || "r") {
    // Do the thing Zhu Li
    let diceRollString = args[0];
    console.log({ diceRollString });
    let resultOfRoll = roll(diceRollString);
    console.log({ resultOfRoll });
    message.channel.send(
      `@${message.author.username} rolled ${JSON.stringify(resultOfRoll)}`
    );
  }
});

discordClient.login(clientAuthToken);
