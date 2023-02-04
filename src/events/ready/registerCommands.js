const areCommandsDifferent = require("../../lib/areCommandsDifferent");
const getApplicationCommands = require("../../lib/getApplicationCommands");
const getLocalCommands = require("../../lib/getLocalCommands");

const registerCommands = async (client) => {
  try {
    const localCommands = getLocalCommands();
    const applicationCommands = await getApplicationCommands(
      client,
      process.env.GUILD_ID
    );

    for (const localCommand of localCommands) {
      const { name, description, options } = localCommand;

      const existingCommand = await applicationCommands.cache.find(
        (command) => command.name === name
      );

      if (existingCommand) {
        if (localCommand.deleted) {
          await applicationCommands.delete(existingCommand.id);
          console.log(`Deleted command "${name}".`);
          continue;
        }

        if (areCommandsDifferent(existingCommand, localCommand)) {
          await applicationCommands.edit(existingCommand.id, {
            description,
            options,
          });

          console.log(`Edited command "${name}".`);
        }
      } else {
        if (localCommand.deleted) {
          console.log(
            `Skipping registering command "${name}" as it's set to delete.`
          );
          continue;
        }

        await applicationCommands.create({
          name,
          description,
          options,
        });

        console.log(`Successfully registered command "${name}."`);
      }
    }
  } catch (error) {
    console.error(error);
  }
};

module.exports = registerCommands;
