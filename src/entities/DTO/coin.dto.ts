import { Transaction } from '../transaction.entity';
import { Wallet } from '../wallet.entity';

export interface ICoinDTO {
  id?: string
  wallet?: Wallet
  coin: string
  fullname: string
  amont: number
  transactions?: Transaction[]
}
