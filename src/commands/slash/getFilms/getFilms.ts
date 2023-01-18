import { SlashCommandBuilder } from "discord.js";
import { SlashBuilder } from "../../../components/CommandBuilder";

//node_mules
import axios from "axios";
import { GetFilmsResponse, ILastKey } from "../../../interfaces/interfaces";
import { getStarScore } from "../../../helpers/helpersFx";

const API_ENDPOINT_ALL = process.env.SERVER_URL_ALL || "";

const blockCodeCharacte = "```";

const getFilms = async (params: null | ILastKey) => {
  const replyMessages: string[] = [];
  try {
    let uri = `${API_ENDPOINT_ALL}`;

    if (params) {
      console.log(params);
      uri += `?Saga=${params.Saga}&Name=${params.Name}`;
    }
    const response = await axios.get<GetFilmsResponse>(uri);
    //console.log(response);
    const { data } = response;

    if (!data) {
      replyMessages.push("Upps it seems no data was found");
      return replyMessages;
    }
    const { films, lastKey } = data;

    if (!films || films.length < 1) {
      replyMessages.push("There has not been found any film");
      return replyMessages;
    }

    /* const shortFilmObj = films.map((film) => {
      return {
        Name: film.Name,
        Saga: film.Saga,
        duration: film.Duration_Minutes,
      };
    });
     const table = stringTable.create(shortFilmObj);
    
    console.log(table);
    return table; */

    let listFilmsString = blockCodeCharacte + "\n";
    let infoMessage = "";
    let messageToGetMoreFilms = "";

    films.forEach((film, index) => {
      listFilmsString += `-> ${film.Name} Score: ${getStarScore(
        film.Stars
      )} \n`;
    });

    listFilmsString += blockCodeCharacte;
    if (lastKey) {
      infoMessage = "If You want to get more Films please use this command\n";
      messageToGetMoreFilms += `**hi**`;
    }

    replyMessages.push(listFilmsString);
    replyMessages.push(infoMessage);
    replyMessages.push(messageToGetMoreFilms);

    return replyMessages;
  } catch (err) {
    console.log(err);
    replyMessages.push("Something Went Wrong");
    return replyMessages;
  }
};

export default new SlashBuilder({
  data: new SlashCommandBuilder()
    .setName("getfilms")
    .setDescription("get the films list"),
  async run(client, int) {
    try {
      /*await int.reply({ content: "Pong!" });
      await int.followUp({
        content: `Latency: ${client.ws.ping}ms\nBot Latency: ${
          Date.now() - int.createdTimestamp
        }ms`,
      });*/
      const response = await getFilms(null);

      console.log(response);
      await int.reply({ content: "Films!" });

      for (let index = 0; index < response.length; index++) {
        const msg = response[index];
        if (!msg) {
          continue;
        }
        await int.followUp({ content: msg });
      }

      //await int.reply({ content: "Pong!" });

      //await int.channel?.send("we are improving");
    } catch (err) {
      console.log(err);
      // @ts-ignore
      await int.reply({ content: err.message });
    }
  },
});
