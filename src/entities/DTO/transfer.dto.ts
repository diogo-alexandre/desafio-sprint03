import { IsNotEmpty, IsNumber, IsString, Validate } from 'class-validator';

export interface ITransferDTO {
  receiverAddress: string,
  quoteTo: string
  currentCoin: string,
  value: string
}

export class Transfer {
  @IsString()
  @IsNotEmpty()
  public receiverAddress: string

  @IsString()
  @IsNotEmpty()
  public quoteTo: string

  @IsString()
  @IsNotEmpty()
  public currentCoin: string

  @IsNumber()
  @IsNotEmpty()
  @Validate((value: number) => value < 0, { message: 'propriedade "value" não pode ser negativo' })
  public value: number

  constructor (receiverAddress: string, quoteTo: string, currentCoin: string, value: number) {
    this.receiverAddress = receiverAddress;
    this.quoteTo = quoteTo;
    this.currentCoin = currentCoin;
    this.value = value;
  }
}
