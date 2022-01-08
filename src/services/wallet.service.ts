import { Repository } from 'typeorm';

import { Wallet } from '../entities/wallet.entity';
import { WalletDAO } from '../entities/DAO/wallet.dao';
import { IWalletService } from './interfaces/wallet-service.interface';
import { validate } from '../helpers/validate.helper';
import { Catch } from '../helpers/decorators/catch.decorator';

export class WalletService implements IWalletService {
  private readonly walletRepository: Repository<Wallet>

  constructor (walletRepository: Repository<Wallet>) {
    this.walletRepository = walletRepository;
  }

  @Catch()
  public async create ({ name, cpf, birthdate }: WalletDAO): Promise<Wallet> {
    const wallet = new Wallet(name, cpf, birthdate);
    await validate(wallet);

    return await this.walletRepository.save(wallet);
  }
}
