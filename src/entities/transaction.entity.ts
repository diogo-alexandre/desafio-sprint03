import axios from 'axios';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Coin } from './coin.entity';
import { ITransactionDTO } from './DTO/transaction.dto';

@Entity('transactions')
export class Transaction implements ITransactionDTO {
  @PrimaryGeneratedColumn('increment')
  public id?: number

  @Column({ type: 'double' })
  public value: number

  @ManyToOne(() => Coin, coin => coin.id)
  public coin?: Coin

  @Column({ type: 'uuid' })
  public readonly sendTo: string

  @Column({ type: 'uuid' })
  public readonly receiveFrom: string

  @Column({ type: 'double' })
  public currentCotation?: number

  @Column()
  public readonly datetime: Date

  constructor (value: number, sendTo: string, receiveFrom: string, currentCotation?: number, coin?: Coin) {
    this.value = value;
    this.sendTo = sendTo;
    this.receiveFrom = receiveFrom;
    this.currentCotation = currentCotation;
    this.coin = coin;

    this.datetime = new Date();
  }

  public static async getCotation (code: string, codein: string): Promise<number> {
    return await axios.get(`https://economia.awesomeapi.com.br/json/last/${code}-${codein}`);
  }
}
