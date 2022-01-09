import { IFindTransaction, ITransaction } from '../../entities/DTO/transaction.dto';
import { IWalletDTO } from '../../entities/DTO/wallet.dto';
import { Wallet } from '../../entities/wallet.entity';

export interface ITransferType {
  from: string,
  to: string,
  transaction: ITransaction
}

export interface IWalletService {
  find (wallet: Partial<IWalletDTO>, returnId?: boolean): Promise<Wallet[]>
  findByAdress (address: string): Promise<Wallet>
  create (wallet: IWalletDTO): Promise<Wallet>
  delete (address: string): Promise<Wallet>
  saveTransaction (walletAdress: string, transactions: ITransaction[]): Promise<void>
  transfer ({ from, to, transaction }: ITransferType): Promise<void>
  findTransactions (args: IFindTransaction): Promise<any>
}
