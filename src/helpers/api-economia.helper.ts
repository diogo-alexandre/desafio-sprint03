import axios from 'axios';
import { CoinCombinationError } from '../errors/coin-combination-error';
import coinCombinations from '../helpers/consts/coin-combinations.const';

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
    const combination = `${currentCoin.toUpperCase()}-${quoteTo.toUpperCase()}`;

    if (Object.keys(coinCombinations).filter(c => c === combination).length > 0) {
      const url = `https://economia.awesomeapi.com.br/json/last/${combination}`;
      const response: any = (await axios(url)).data;
      return response[`${currentCoin.toUpperCase()}${quoteTo.toUpperCase()}`];
    } else {
      throw new CoinCombinationError('Combinação de moedas invalidas.');
    }
  }
}
