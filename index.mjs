import Discord from "discord.js";
const clientAuthToken = process.env.DISCORD_CLIENT_AUTH_TOKEN;
import roll, {
  getTotalFromRolls
} from "./src/services/diceRoller/diceRollerService.mjs";
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

      let favourCheck = rolls => {
        let averages = [];

        rolls.forEach(currentRoll => {
          Object.keys(currentRoll).forEach(key => {
            if (key === "modifiers") {
              return;
            }
            let diceSize = parseInt(key.match(/(?<=d)\d{1,3}/));
            let totalOfRoll = currentRoll[key].reduce(
              (accumulator, currentValue) => accumulator + currentValue,
              0
            );

            if (totalOfRoll < (diceSize / 2 + 1) * currentRoll[key].length) {
              averages.push(false);
            } else {
              averages.push(true);
            }
          });
        });

        let tally = averages
          .map(average => (average ? 1 : -1))
          .reduce((accumulator, currentValue) => accumulator + currentValue, 0);

        if (tally <= -1) {
          return "not very favourable";
        } else if (tally >= 1) {
          return "quite favourable";
        } else {
          return "relatively neutral";
        }
      };

      let response = botResponse({
        description: `<@${
          message.author.id
        }> tested their luck!  The results are ${favourCheck(
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
