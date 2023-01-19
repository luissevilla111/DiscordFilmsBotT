import axios from "axios";
import { Film, FilmRequest } from "../interfaces/interfaces";
const API_ENDPOINT_ALL = process.env.SERVER_URL_ALL || "";
export const addFilm = async (film: FilmRequest) => {
  try {
    console.log(film);
    //const film =
    const response = await axios.post(API_ENDPOINT_ALL, film);

    console.log(response);
  } catch (err) {
    console.log("err");
    return "The Film couldn't be created";
  }
};
