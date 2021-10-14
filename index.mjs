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
const commands = ["roll", "r", "src", "source", "h", "helpdice", "commands"];

discordClient.on("message", message => {
  if (!message.content.startsWith(commandPrefix) || message.author.bot) {
    return;
  }

  const commandsRegex = new RegExp(`(?<=${commands.join("|")}) +`);

  const args = message.content
    .slice(commandPrefix.length)
    .trim()
    .split(commandsRegex);

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

  if (command === "helpdice" || command === "h" || command === "commands") {
    let response = botResponse({
      description: `<@${message.author.id}> Here's a brief list of commands available for Tymora.`,
      fields: [
        {
          name: "!roll / !r",
          value: `!roll 1d20 + 2 / !r 1d20 + 2
            This is the simplest use of the roll command and can be used with or without modifiers.`
        },
        {
          name: "!roll / !r with multiple dice",
          value: `!roll 1d20 + 1d6 / !r 1d20 + 2 + 1d6
          As shown above, this can also be used with or without modifiers.`
        },
        {
          name: "!source / !src",
          value: `Displays the link to source code and contributers to the Tymora project.`
        },
        {
          name: "!helpdice / !h / !commands",
          value: `Displays the Tymora command list`
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
