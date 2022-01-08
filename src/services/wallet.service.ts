import { Repository } from 'typeorm';

import { Wallet } from '../entities/wallet.entity';
import { IWalletDTO } from '../entities/DTO/wallet.dto';
import { IWalletService } from './interfaces/wallet-service.interface';
import { validate } from '../helpers/validate.helper';
import { Catch } from '../helpers/decorators/catch.decorator';
import { NotFound } from '../errors/http/not-found-error';
import { BadRequest } from '../errors/http/bad-request.error';

export class WalletService implements IWalletService {
  private readonly walletRepository: Repository<Wallet>

  constructor (walletRepository: Repository<Wallet>) {
    this.walletRepository = walletRepository;
  }

  @Catch()
  public async create ({ name, cpf, birthdate }: IWalletDTO): Promise<Wallet> {
    const wallet = new Wallet(name, cpf, birthdate);
    await validate(wallet);

    if (this.findByCPF(wallet.cpf) !== undefined) {
      throw new BadRequest(`Já existe uma wallet com cpf = ${cpf}`);
    }

    return await this.walletRepository.save(wallet);
  }

  @Catch()
  public async findByAdress (address: string): Promise<Wallet> {
    const wallet = await this.walletRepository.findOne({ address });

    if (wallet === undefined) {
      throw new NotFound(`Não foi possível encontrar wallet com adress = ${address}`);
    }

    return wallet;
  }

  @Catch()
  public async findByCPF (cpf: string): Promise<Wallet> {
    const wallet = await this.walletRepository.findOne({ cpf });

    if (wallet === undefined) {
      throw new NotFound(`Não foi possível encontrar wallet com cpf = ${cpf}`);
    }

    return wallet!;
  }
}
