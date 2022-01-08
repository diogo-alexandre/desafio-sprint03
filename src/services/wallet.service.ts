import { Repository } from 'typeorm';

import { Wallet } from '../entities/wallet.entity';
import { IWalletDTO } from '../entities/DTO/wallet.dto';
import { IWalletService } from './interfaces/wallet-service.interface';
import { validate } from '../helpers/validate.helper';
import { Catch } from '../helpers/decorators/catch.decorator';
import { NotFoundError } from '../errors/http/not-found-error';
import { BadRequestError } from '../errors/http/bad-request.error';
import { clearObject } from '../helpers/clear-object.helper';

export class WalletService implements IWalletService {
  private readonly walletRepository: Repository<Wallet>

  constructor (walletRepository: Repository<Wallet>) {
    this.walletRepository = walletRepository;
  }

  @Catch()
  public async create ({ name, cpf, birthdate }: IWalletDTO): Promise<Wallet> {
    const wallet = new Wallet(name, cpf, birthdate);
    await validate(wallet);

    const [walletExist] = await this.find({ cpf: wallet.cpf });

    if (walletExist !== undefined) {
      throw new BadRequestError(`Já existe uma wallet com cpf = ${cpf}`);
    }

    return await this.walletRepository.save(wallet);
  }

  @Catch()
  public async findByAdress (address: string): Promise<Wallet> {
    const [wallet] = await this.find({ address });

    if (wallet === undefined) {
      throw new NotFoundError(`Não foi possível encontrar wallet com adress = ${address}`);
    }

    return wallet;
  }

  @Catch()
  public async find (args: Partial<IWalletDTO>): Promise<Wallet[]> {
    const wallet = clearObject<Wallet>({ ...args });

    const wallets = await this.walletRepository.find({
      where: {
        ...wallet
      }
    });

    wallets.forEach(wallet => {
      wallet.coins.forEach(coin => {
        delete coin.id;
      });
    });

    return wallets;
  }
}
