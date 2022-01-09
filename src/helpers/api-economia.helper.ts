import axios from 'axios';

type ApiEconomiaData = {
  code: string,
  codein: string,
  name: string,
  high: string,
  low: string,
  varBid: string,
  pctChange: string,
  bid: string,
  ask: string,
  timestamp: string,
  'create_date': string
}

export class ApiEconomia {
  public static async get (currentCoin: string, quoteTo : string): Promise<ApiEconomiaData> {
    const url = `https://economia.awesomeapi.com.br/json/last/${currentCoin}-${quoteTo}`;
    try {
      const response: any = (await axios(url)).data;
      return response[`${currentCoin.toUpperCase()}${quoteTo.toUpperCase()}`];
    } catch (err) {
      console.log(url);
      throw err;
    }
  }
}
