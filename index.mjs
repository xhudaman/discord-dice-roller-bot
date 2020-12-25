import Discord, { MessageEmbed } from "discord.js";
const clientAuthToken = process.env.DISCORD_CLIENT_AUTH_TOKEN;
import roll, {
  getTotalFromRolls
} from "./src/services/diceRoller/diceRollerService.mjs";

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

      console.log({ resultOfRolls: JSON.stringify(resultOfRolls), total });

      let responseEmbed = new MessageEmbed();
      responseEmbed.setTitle("Tymora's Game of Dice");
      responseEmbed.setColor("#fd2870");
      responseEmbed.setDescription(
        `<@${
          message.author.id
        }> tested their luck!  The results are ${favourCheck(
          resultOfRolls
        )}!\n Their total was: \`${total}\`` /*+
        JSON.stringify(resultOfRolls)*/
      );

      message.channel.send(responseEmbed);
    } catch (error) {
      let responseEmbed = new MessageEmbed();
      responseEmbed.setTitle("Tymora's Game of Dice");
      responseEmbed.setColor("#fd2870");
      responseEmbed.setDescription(error.message);
      message.channel.send(responseEmbed);
    }
    // message.channel.send(
    //   `@${message.author.username} rolled ${JSON.stringify(resultOfRoll)}`
    // );
  }
});

discordClient.login(clientAuthToken);
