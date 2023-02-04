const botResponse = require("../../botResponse/botResponse");

module.exports = {
  name: "src",
  description:
    "Replies with the link to the source code and a list of contributing authors for the project.",
  callback: (client, interaction) => {
    let response = botResponse({
      description: `Thank you for your interest in the Tymora bot!`,
      fields: [
        {
          name: "Source Code",
          value: "https://github.com/xhudaman/discord-dice-roller-bot",
        },
        {
          name: "Contributers",
          value: "xhudaman",
        },
      ],
    });

    if (
      process.env.NODE_ENV === "development" &&
      interaction.channel.id !== process.env.TEST_CHANNEL_ID
    ) {
      return;
    }

    interaction.reply({ embeds: [response] });
  },
};
