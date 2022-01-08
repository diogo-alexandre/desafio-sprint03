import { IWalletDTO } from '../../entities/DTO/wallet.dto';
import { Wallet } from '../../entities/wallet.entity';

export interface IWalletService {
  findByAdress(adress: string): Promise<Wallet>
  create(wallet: IWalletDTO): Promise<Wallet>
}
