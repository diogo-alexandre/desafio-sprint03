import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { Wallet } from './wallet.entity';
import { Transaction } from './transaction.entity';

@Entity('coins')
export class Coin {
  @PrimaryGeneratedColumn('increment')
  public id?: string

  @ManyToOne(() => Wallet, wallet => wallet.coins)
  public readonly wallet!: Wallet

  @Column({ length: 3, type: 'char', unique: true })
  public coin: string

  @Column()
  public fullname: string

  @Column({ type: 'double' })
  public amont: number

  @OneToMany(() => Transaction, transaction => transaction.coin, { eager: true })
  public readonly transactions!: Transaction[]

  constructor (coin: string, fullname: string, amont: number) {
    this.coin = coin;
    this.fullname = fullname;
    this.amont = amont;
  }
}
