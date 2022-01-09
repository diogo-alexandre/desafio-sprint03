import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Coin } from '../coin.entity';
import { Wallet } from '../wallet.entity';

export interface ITransaction {
  quoteTo: string
  currentCoin: string
  value: number
}

export interface IFindTransaction {
  address: string
  coin: string
  inititalDate?: Date
  finalDate?: Date
}

export interface ITransactionDTO {
  id?: number
  value: number
  coin?: Coin
  sendTo: string | Wallet
  receiveFrom: string | Wallet
  currentCotation?: number
  datetime?: Date
}

export class TransactionDTO {
  @IsNotEmpty({ message: 'Propriedade "quoteTo" é obrigatória.' })
  @IsString()
  public quoteTo!: string;

  @IsNotEmpty({ message: 'Propriedade "currentCoin" é obrigatória.' })
  @IsString()
  public currentCoin!: string;

  @IsNotEmpty({ message: 'Propriedade "value" é obrigatória.' })
  @IsNumber()
  public value!: number;

  constructor (quoteTo: string, currentCoin: string, value: string | number) {
    this.quoteTo = quoteTo;
    this.currentCoin = currentCoin;
    this.value = Number(value);
  }
}
