import { Client, Collection, Events, GatewayIntentBits } from "discord.js";
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});
import config from "./config/config";
import handler from "./handler/main";

// Collections
const commands = new Collection();
const slashs = new Collection();

// Handler
handler(client);
client.on(Events.InteractionCreate, async (interaction) => {
  //console.log(interaction.isModalSubmit());

  if (!interaction.isModalSubmit()) return;
  if (interaction.customId === "myModal") {
    await interaction.reply({
      content: "Your submission was received successfully!",
    });

    const favoriteColor =
      interaction.fields.getTextInputValue("favoriteColorInput");
    const hobbies = interaction.fields.getTextInputValue("hobbiesInput");
    console.log({ favoriteColor, hobbies });
  }
  // console.log(interaction);
});

/*client.on("e", async (modal) => {
  console.log("Submit");
});*/

// Client Login
client.login(config.token);

export { commands, slashs };
