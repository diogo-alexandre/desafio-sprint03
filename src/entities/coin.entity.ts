import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { Wallet } from './wallet.entity';
import { Transaction } from './transaction.entity';
import { ICoinDTO } from './DTO/coin.dto';

@Entity('coins')
export class Coin implements ICoinDTO {
  @PrimaryGeneratedColumn('increment')
  public id?: string

  @ManyToOne(() => Wallet, wallet => wallet.coins)
  public wallet?: Wallet

  @Column({ length: 3, type: 'char' })
  public coin: string

  @Column()
  public fullname: string

  @Column({ type: 'double' })
  public amont: number

  @OneToMany(() => Transaction, transaction => transaction.coin, { eager: true, cascade: true })
  public transactions!: Transaction[]

  constructor (coin: string, fullname: string, amont: number, wallet?: Wallet) {
    this.coin = coin;
    this.fullname = fullname;
    this.amont = amont;
    this.wallet = wallet;
  }
}
