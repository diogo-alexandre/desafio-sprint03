export interface IWalletDTO {
  name: string
  cpf: string
  birthdate: Date
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
