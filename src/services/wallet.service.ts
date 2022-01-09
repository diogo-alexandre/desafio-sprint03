import { Repository } from 'typeorm';

import { Wallet } from '../entities/wallet.entity';
import { IWalletDTO } from '../entities/DTO/wallet.dto';
import { ITransferType, IWalletService } from './interfaces/wallet-service.interface';
import { validate } from '../helpers/validate.helper';
import { Catch } from '../helpers/decorators/catch.decorator';
import { NotFoundError } from '../errors/http/not-found-error';
import { BadRequestError } from '../errors/http/bad-request.error';
import { clearObject } from '../helpers/clear-object.helper';
import { Transaction } from '../entities/transaction.entity';
import { IFindTransaction, ITransaction, TransactionDTO } from '../entities/DTO/transaction.dto';
import { Coin } from '../entities/coin.entity';
import { ApiEconomia } from '../helpers/api-economia.helper';
import { ICoinService } from './interfaces/coin-service.interface';
import { ITransactionService } from './interfaces/transaction-service.interface';
import { InsufficientFunds } from '../errors/insufficient-founds.error';

export class WalletService implements IWalletService {
  constructor (
    private readonly walletRepository: Repository<Wallet>,
    private readonly coinService: ICoinService,
    private readonly transactionService: ITransactionService
  ) { }

  @Catch()
  public async create ({ name, cpf, birthdate }: IWalletDTO): Promise<Wallet> {
    const wallet = new Wallet(name, cpf, birthdate);
    await validate(wallet);

    const [walletExist] = await this.find({ cpf: wallet.cpf });

    if (walletExist !== undefined) {
      throw new BadRequestError(`Já existe uma wallet com cpf = ${cpf}`);
    }

    const entity = await this.walletRepository.save(wallet);
    delete entity.deletedAt;

    return entity;
  }

  @Catch()
  public async findByAdress (address: string, returnId: boolean = false): Promise<Wallet> {
    const [wallet] = await this.find({ address }, returnId);

    if (wallet === undefined) {
      throw new NotFoundError(`Não foi possível encontrar wallet com adress = ${address}`);
    }

    return wallet;
  }

  @Catch()
  public async find ({ amont, ...args }: Partial<IWalletDTO>, returnId: boolean = false): Promise<Wallet[]> {
    const wallet = clearObject<Wallet>({ ...args });

    const wallets = await this.walletRepository.find({
      where: {
        ...wallet,
        deletedAt: null
      }
    });

    wallets.forEach(wallet => {
      delete wallet.deletedAt;

      if (amont) {
        wallet.coins = wallet.coins.filter(c => c.amont === Number(amont));
      }

      wallet.coins.forEach(coin => {
        if (!returnId) delete coin.id;

        coin.transactions.forEach(transaction => {
          if (!returnId) delete transaction.id;
        });
      });
    });

    return wallets;
  }

  @Catch()
  public async delete (address: string): Promise<Wallet> {
    const wallet = await this.findByAdress(address);
    wallet.deletedAt = new Date();

    return await this.walletRepository.save(wallet);
  }

  @Catch()
  public async saveTransaction (walletAdress: string, transactions: ITransaction[]): Promise<void> {
    const wallet = await this.findByAdress(walletAdress, true);
    const coins = wallet.coins;

    for (let i = 0; i < transactions.length; i++) {
      const { quoteTo, currentCoin, value } = transactions[i];
      const dto = new TransactionDTO(quoteTo, currentCoin, value);

      await validate(dto);

      const response = await ApiEconomia.get(dto.currentCoin, dto.quoteTo);
      let coin = coins.find(c => c.coin === dto.currentCoin);

      if (!coin && dto.value > 0) {
        coin = new Coin(dto.currentCoin, response.name.split('/')[0], 0);
        coin.wallet = wallet;

        coin = await this.coinService.create(coin);

        coins.push(coin);
      }

      if (dto.value < 0 && coin!.amont <= dto.value * -1) {
        throw new InsufficientFunds(dto.currentCoin);
      }

      const transaction = new Transaction(
        dto.value,
        wallet.address!,
        wallet.address!,
        Number(response.bid),
        coin
      );

      await this.transactionService.create(transaction);

      coin!.amont += dto.value;

      await this.coinService.update(coin!);
    }
  }

  @Catch()
  public async transfer (dto: ITransferType): Promise<void> {
    const transactionDTO = new TransactionDTO(
      dto.transaction.quoteTo,
      dto.transaction.currentCoin,
      dto.transaction.value
    );

    await validate(transactionDTO);

    const response = await ApiEconomia.get(transactionDTO.currentCoin, transactionDTO.quoteTo);

    const [from] = await this.find({ address: dto.from }, true);
    let [to] = await this.find({ address: dto.to }, true);

    const fromCoin = from.coins.find(c => c.coin === transactionDTO.quoteTo);

    if (!fromCoin || fromCoin.amont < transactionDTO.value) {
      throw new InsufficientFunds(transactionDTO.quoteTo);
    }

    let toCoin = to.coins.find(c => c.coin === transactionDTO.quoteTo);

    if (toCoin === undefined) {
      const coin = new Coin(
        transactionDTO.quoteTo,
        response.name.split('/')[1],
        transactionDTO.value,
        to
      );

      toCoin = await this.coinService.create(coin);
      to = (await this.find({ address: to.address }, true))[0];
    }

    fromCoin.amont -= transactionDTO.value;
    toCoin.amont += transactionDTO.value;

    await this.walletRepository.save([from, to]);

    const t1 = new Transaction(
      transactionDTO.value * -1,
      from.address!,
      to.address!,
      Number(response.bid),
      fromCoin
    );

    const t2 = new Transaction(
      transactionDTO.value,
      from.address!,
      to.address!,
      Number(response.bid),
      toCoin
    );

    await this.transactionService.create(t1);
    await this.transactionService.create(t2);
  }

  @Catch()
  public async findTransactions (args: IFindTransaction): Promise<any> {
    const [wallet] = await this.find({
      address: args.address
    });

    let coins = wallet.coins;

    if (args.coin) {
      coins = coins.filter(c => c.coin === args.coin);
    }

    if (args.finalDate) {
      coins.forEach(c => {
        c.transactions = c.transactions.filter(t => t.datetime < args.finalDate!);
      });
    }

    if (args.inititalDate) {
      coins.forEach(c => {
        c.transactions = c.transactions.filter(t => t.datetime > args.inititalDate!);
      });
    }

    return coins.map(c => {
      return {
        coin: c.coin,
        transactions: c.transactions
      };
    });
  }
}
