import { MessageEmbed } from "discord.js";
import messageConfig from "./config.mjs";

const botResponse = ({
  description,
  title = messageConfig.title,
  color = messageConfig.color,
  fields
}) => {
  const response = new MessageEmbed();
  response.setTitle(title);
  response.setColor(color);
  response.setDescription(description);

  if (fields) {
    response.addFields(fields);
  }

  return response;
};

export default botResponse;
