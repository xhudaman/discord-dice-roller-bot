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

  const command = args.shift().toLowerCase();

  if (command === "roll" || "r") {
    // Zhu Li, do the thing!
    let diceRollString = args[0];
    let resultOfRoll = roll(diceRollString);
    message.channel.send(
      `@${message.author.username} rolled ${JSON.stringify(resultOfRoll)}`
    );
  }
});

discordClient.login(clientAuthToken);
