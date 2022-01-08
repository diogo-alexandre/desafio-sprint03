import { IWalletDTO } from '../../entities/DTO/wallet.dto';
import { Wallet } from '../../entities/wallet.entity';

export interface IWalletService {
  find (wallet: Partial<IWalletDTO>): Promise<Wallet[]>
  findByAdress (address: string): Promise<Wallet>
  create (wallet: IWalletDTO): Promise<Wallet>
  delete (address: string): Promise<Wallet>
}
