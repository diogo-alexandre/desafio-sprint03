import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Coin } from './coin.entity';
import { Wallet } from './wallet.entity';

@Entity('transactions')
export class Transaction {
  @PrimaryGeneratedColumn('increment')
  public id!: number

  @Column({ type: 'double' })
  public value: number

  @ManyToOne(() => Coin, coin => coin.id)
  public coin!: Coin

  @ManyToOne(() => Wallet, wallet => wallet.address)
  public readonly sendTo: Wallet

  @ManyToOne(() => Wallet, wallet => wallet.address)
  public readonly receiveFrom: Wallet

  @Column({ type: 'double' })
  public currentCotation: number

  @Column()
  public readonly datetime: Date

  constructor (value: number, sendTo: Wallet, receiveFrom: Wallet, currentCotation: number) {
    this.value = value;
    this.sendTo = sendTo;
    this.receiveFrom = receiveFrom;
    this.currentCotation = currentCotation;

    this.datetime = new Date();
  }
}
