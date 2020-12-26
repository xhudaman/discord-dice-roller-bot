import { MessageEmbed } from "discord.js";
import messageConfig from "./config.mjs";

const botResponse = ({ description, title, color }) => {
  const response = new MessageEmbed();
  response.setTitle(messageConfig.title || title);
  response.setColor(messageConfig.color || color);
  response.setDescription(description);

  return response;
};

export default botResponse;
