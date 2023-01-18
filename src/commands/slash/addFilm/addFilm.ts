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
        .setCustomId("addFilmModal")
        .setTitle("Add Film");

      const sagaInput = new TextInputBuilder()
        .setCustomId("saga")
        // The label is the prompt the user sees for this input
        .setLabel("Saga")
        // Short means only a single line of text
        .setStyle(TextInputStyle.Short);

      const nameInput = new TextInputBuilder()
        .setCustomId("name")
        .setLabel("Name")
        // Paragraph means multiple lines of text.
        .setStyle(TextInputStyle.Short);

      const descriptionInput = new TextInputBuilder()
        .setCustomId("description")
        .setLabel("Description")
        // Paragraph means multiple lines of text.
        .setStyle(TextInputStyle.Paragraph);

      const imageUrlInput = new TextInputBuilder()
        .setCustomId("imageUrl")
        .setLabel("Image URL")
        // Paragraph means multiple lines of text.
        .setStyle(TextInputStyle.Short);

      const starsInput = new TextInputBuilder()
        .setCustomId("stars")
        .setLabel("Stars")
        // Paragraph means multiple lines of text.
        .setStyle(TextInputStyle.Short);

      // An action row only holds one text input,
      // so you need one action row per text input.
      const sagaActionRow =
        new ActionRowBuilder<ModalActionRowComponentBuilder>().addComponents(
          sagaInput
        );
      const nameActionRow =
        new ActionRowBuilder<ModalActionRowComponentBuilder>().addComponents(
          nameInput
        );

      const descriptionActionRow =
        new ActionRowBuilder<ModalActionRowComponentBuilder>().addComponents(
          descriptionInput
        );
      const imageUrlActionRow =
        new ActionRowBuilder<ModalActionRowComponentBuilder>().addComponents(
          imageUrlInput
        );
      const starsActionRow =
        new ActionRowBuilder<ModalActionRowComponentBuilder>().addComponents(
          starsInput
        );

      // Add inputs to the modal
      modal.addComponents(
        sagaActionRow,
        nameActionRow,
        descriptionActionRow,
        imageUrlActionRow,
        starsActionRow
      );

      // Show the modal to the user
      await int.showModal(modal);
    } catch (err) {
      console.log(err);
      // @ts-ignore
      await int.reply({ content: err.message });
    }
  },
});
