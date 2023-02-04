const { ApplicationCommandOptionType } = require("discord.js");
const botResponse = require("../../botResponse/botResponse");
const getFavourabilityString = require("../../botResponse/favourabilityString");
const {
  roll,
  getTotalFromRolls,
} = require("../../services/diceRoller/diceRollerService");

module.exports = {
  name: "roll",
  description: "Roll some dice and test your luck!",
  options: [
    {
      name: "dice-string",
      description:
        "Quantity of, and size of dice plus any modifiers. i.e. 1d20 + 2",
      type: ApplicationCommandOptionType.String,
      required: true,
    },
  ],
  callback: (client, interaction) => {
    try {
      const diceRollString = interaction.options.get("dice-string").value;
      const resultOfRolls = roll(diceRollString);
      const total = getTotalFromRolls(resultOfRolls);

      let response = botResponse({
        description: `<@${
          interaction.user.id
        }> tested their luck!  The results are ${getFavourabilityString(
          resultOfRolls
        )}!\n Their total was: \`${total}\``,
      });

      if (
        process.env.NODE_ENV === "development" &&
        interaction.channel.id !== process.env.TEST_CHANNEL_ID
      ) {
        return;
      }

      interaction.reply({ embeds: [response] });
    } catch (error) {
      let response = botResponse({ description: error.message });
      interaction.reply({ embeds: [response] });
    }
  },
};
