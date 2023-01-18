export interface Film {
  Saga: string;
  Name: string;
  Added_Time_Utc: string;
  Description: string;
  Duration_Minutes: string;
  Genders: string[];
  Image_Url: string;
  Stars: number;
}

export interface ILastKey {
  Saga: String;
  Name: String;
}

export interface GetFilmsResponse {
  films: Film[];
  message: String;
  lastKey: ILastKey;
}
