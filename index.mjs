import Discord from "discord.js";
const clientAuthToken = process.env.DISCORD_CLIENT_AUTH_TOKEN;
import roll, {
  getTotalFromRolls
} from "./src/services/diceRoller/diceRollerService.mjs";
import getFavourabilityString from "./src/botResponse/favourabilityString.mjs";
import botResponse from "./src/botResponse/botResponse.mjs";

const discordClient = new Discord.Client();

const commandPrefix = "!";

discordClient.on("message", message => {
  if (!message.content.startsWith(commandPrefix) || message.author.bot) {
    return;
  }

  const args = message.content
    .slice(commandPrefix.length)
    .trim()
    .split(/(?<=roll|r) +/);

  const command = args.shift().toLowerCase();

  if (command === "roll" || command === "r") {
    // Zhu Li, do the thing!
    try {
      const diceRollString = args[0];
      const resultOfRolls = roll(diceRollString);
      const total = getTotalFromRolls(resultOfRolls);

      let response = botResponse({
        description: `**dev** <@${
          message.author.id
        }> tested their luck!  The results are ${getFavourabilityString(
          resultOfRolls
        )}!\n Their total was: \`${total}\``
      });

      message.channel.send(response);
    } catch (error) {
      let response = botResponse({ description: error.message });
      message.channel.send(response);
    }
  }
});

discordClient.login(clientAuthToken);
