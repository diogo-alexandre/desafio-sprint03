import { WalletDAO } from '../../entities/DAO/wallet.dao';
import { Wallet } from '../../entities/wallet.entity';

export interface IWalletService {
  create(wallet: WalletDAO): Promise<Wallet>
}
