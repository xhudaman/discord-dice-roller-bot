const { EmbedBuilder } = require("discord.js");
const messageConfig = require("./config");

const botResponse = ({
  description,
  title = messageConfig.title,
  color = messageConfig.color,
  fields,
}) => {
  const response = new EmbedBuilder()
    .setTitle(title)
    .setColor(color)
    .setDescription(description);

  if (fields) {
    response.addFields(fields);
  }

  return response;
};

module.exports = botResponse;
