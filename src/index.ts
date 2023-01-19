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
import { addFilm } from "./helpers/api";
import { Film, FilmRequest } from "./interfaces/interfaces";

// Collections
const commands = new Collection();
const slashs = new Collection();

// Handler
handler(client);
client.on(Events.InteractionCreate, async (interaction) => {
  //console.log(interaction.isModalSubmit());

  if (!interaction.isModalSubmit()) return;

  try {
    if (interaction.customId === "addFilmModal") {
      const saga = interaction.fields.getTextInputValue("saga");
      const name = interaction.fields.getTextInputValue("name");
      const description = interaction.fields.getTextInputValue("description");
      const imageUrl = interaction.fields.getTextInputValue("imageUrl");
      const stars = +interaction.fields.getTextInputValue("stars").toString();
      //console.log({ saga, name, description, imageUrl, stars });
      const filmObj: FilmRequest = {
        saga,
        name,
        description,
        imageUrl,
        stars,
        durationMinutes: "0",
        genders: [],
      };

      await addFilm(filmObj);
      await interaction.reply({
        content: `The film **${name}** has beed addded to the list`,
      });
    }
  } catch (err) {
    console.log(err);
    await interaction.reply({
      content: "Something went Wrong",
    });
  }

  // console.log(interaction);
});

/*client.on("e", async (modal) => {
  console.log("Submit");
});*/

// Client Login
client.login(config.token);

export { commands, slashs };
