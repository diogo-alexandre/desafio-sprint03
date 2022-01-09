export interface IWalletDTO {
  address?: string
  name: string
  cpf: string
  birthdate: Date
  createdAt?: Date
  updatedAt?: Date,
  amont?: string
}

export class WalletDTO implements IWalletDTO {
  public name: string
  public cpf: string
  public birthdate: Date

  constructor (name: string, cpf: string, birthdate: Date) {
    this.name = name;
    this.cpf = cpf;
    this.birthdate = birthdate;
  }
}
