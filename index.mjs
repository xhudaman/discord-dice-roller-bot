import Discord from "discord.js";
const clientAuthToken = process.env.DISCORD_CLIENT_AUTH_TOKEN;
import roll, {
  getTotalFromRolls
} from "./src/services/diceRoller/diceRollerService.mjs";
import getFavourabilityString from "./src/botResponse/favourabilityString.mjs";
import botResponse from "./src/botResponse/botResponse.mjs";

const discordClient = new Discord.Client();

const commandPrefix = "!";
const testChannelId = process.env.TEST_CHANNEL_ID;

discordClient.on("message", message => {
  if (!message.content.startsWith(commandPrefix) || message.author.bot) {
    return;
  }

  const args = message.content
    .slice(commandPrefix.length)
    .trim()
    .split(/(?<=roll|r|src|source) +/);

  const command = args.shift().toLowerCase();

  if (command === "roll" || command === "r") {
    // Zhu Li, do the thing!
    try {
      const diceRollString = args[0];
      const resultOfRolls = roll(diceRollString);
      const total = getTotalFromRolls(resultOfRolls);

      let response = botResponse({
        description: `<@${
          message.author.id
        }> tested their luck!  The results are ${getFavourabilityString(
          resultOfRolls
        )}!\n Their total was: \`${total}\``
      });

      if (
        process.env.NODE_ENV === "development" &&
        message.channel.id !== testChannelId
      ) {
        return;
      }

      message.channel.send(response);
    } catch (error) {
      let response = botResponse({ description: error.message });
      message.channel.send(response);
    }
  }

  if (command === "src" || command === "source") {
    let response = botResponse({
      description: `<@${message.author.id}> Thank you for your interest in the Tymora bot!`,
      fields: [
        {
          name: "Source Code",
          value: "https://github.com/xhudaman/discord-dice-roller-bot",
          inline: true
        },
        {
          name: "Contributers",
          value: "xhudaman",
          inline: true
        }
      ]
    });

    if (
      process.env.NODE_ENV === "development" &&
      message.channel.id !== testChannelId
    ) {
      return;
    }

    message.channel.send(response);
  }
});

discordClient.login(clientAuthToken);
