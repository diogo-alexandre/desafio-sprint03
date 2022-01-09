import { TransactionDTO } from '../../entities/DTO/transaction.dto';
import { IWalletDTO } from '../../entities/DTO/wallet.dto';
import { Wallet } from '../../entities/wallet.entity';

export interface IWalletService {
  find (wallet: Partial<IWalletDTO>, returnId?: boolean): Promise<Wallet[]>
  findByAdress (address: string): Promise<Wallet>
  create (wallet: IWalletDTO): Promise<Wallet>
  delete (address: string): Promise<Wallet>
  saveTransaction (walletAdress: string, transactions: Partial<TransactionDTO>[]): Promise<void>
}
