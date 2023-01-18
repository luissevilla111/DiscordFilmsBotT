import {
  ActionRowBuilder,
  ModalActionRowComponentBuilder,
  ModalBuilder,
  SlashCommandBuilder,
  TextInputBuilder,
  TextInputStyle,
} from "discord.js";
import { SlashBuilder } from "../../../components/CommandBuilder";

//node_mules
import axios from "axios";
import { GetFilmsResponse, ILastKey } from "../../../interfaces/interfaces";
import { getStarScore } from "../../../helpers/helpersFx";

const API_ENDPOINT_ALL = process.env.SERVER_URL_ALL || "";

const blockCodeCharacte = "```";

export default new SlashBuilder({
  data: new SlashCommandBuilder()
    .setName("addfilm")
    .setDescription("create a new film to the list"),
  /*  .addStringOption((option) =>
      option
        .setName("sagakey")
        .setDescription("Saga of the Film")
        .setRequired(false)
    )
    .addStringOption((option) =>
      option
        .setName("namekey")
        .setDescription("Name of the Film")
        .setRequired(false)
    ), */
  async run(client, int) {
    try {
      const modal = new ModalBuilder()
        .setCustomId("myModal")
        .setTitle("My Modal");

      const favoriteColorInput = new TextInputBuilder()
        .setCustomId("favoriteColorInput")
        // The label is the prompt the user sees for this input
        .setLabel("What's your favorite color?")
        // Short means only a single line of text
        .setStyle(TextInputStyle.Short);

      const hobbiesInput = new TextInputBuilder()
        .setCustomId("hobbiesInput")
        .setLabel("What's some of your favorite hobbies?")
        // Paragraph means multiple lines of text.
        .setStyle(TextInputStyle.Paragraph);

      // An action row only holds one text input,
      // so you need one action row per text input.
      const firstActionRow =
        new ActionRowBuilder<ModalActionRowComponentBuilder>().addComponents(
          favoriteColorInput
        );
      const secondActionRow =
        new ActionRowBuilder<ModalActionRowComponentBuilder>().addComponents(
          hobbiesInput
        );

      // Add inputs to the modal
      modal.addComponents(firstActionRow, secondActionRow);

      // Show the modal to the user
      await int.showModal(modal);
    } catch (err) {
      console.log(err);
      // @ts-ignore
      await int.reply({ content: err.message });
    }
  },
});
