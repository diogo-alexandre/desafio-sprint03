import { IsNotEmpty, Length, Matches } from 'class-validator';
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

import { IsCPF } from '../helpers/decorators/validators/iscpf.decorator';
import { PastYears } from '../helpers/decorators/validators/pastyears.decorator';

@Entity('wallets')
export class Wallet {
  @PrimaryGeneratedColumn('uuid')
  public readonly adress?: string

  @Column({ length: 255 })
  @Length(7)
  @IsNotEmpty()
  public name: string

  @Column({ unique: true, type: 'char', length: '14' })
  @IsCPF()
  @Matches(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/)
  @IsNotEmpty()
  public cpf: string

  @Column({ type: 'date' })
  @PastYears(18)
  @IsNotEmpty()
  public birthdate: Date

  @CreateDateColumn()
  public readonly createdAt?: Date

  @UpdateDateColumn()
  public readonly updatedAt?: Date

  constructor (name: string, cpf: string, birthdate: Date) {
    this.name = name;
    this.cpf = cpf;
    this.birthdate = birthdate;
  }
}
