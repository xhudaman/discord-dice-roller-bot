const botResponse = require("../../botResponse/botResponse");

module.exports = {
  name: "help",
  description: "Replies with the help message.",
  callback: (client, interaction) => {
    const embed = botResponse({
      description: `Here's a brief list of commands available for Tymora.`,
      fields: [
        {
          name: "/roll",
          value: `/roll 1d20 + 2
            This is the simplest use of the roll command and can be used with or without modifiers.`,
        },
        {
          name: "/roll with multiple dice",
          value: `/roll 1d20 + 1d6 or /roll 1d20 + 2 + 1d6
          As shown above, this can also be used with or without modifiers.`,
        },
        {
          name: "/src",
          value: `Displays the link to source code and contributers to the Tymora project.`,
        },
        {
          name: "/help",
          value: `Displays Tymora's command list`,
        },
      ],
    });
    interaction.reply({ embeds: [embed] });
  },
};
