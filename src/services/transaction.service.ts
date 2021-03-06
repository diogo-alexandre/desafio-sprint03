import { validate } from 'class-validator';
import { Repository } from 'typeorm';
import { Transaction } from '../entities/transaction.entity';
import { Catch } from '../helpers/decorators/catch.decorator';
import { ITransactionService } from './interfaces/transaction-service.interface';

export class TransactionService implements ITransactionService {
  private readonly transactionRepository: Repository<Transaction>

  constructor (transactionRepository: Repository<Transaction>) {
    this.transactionRepository = transactionRepository;
  }

  @Catch()
  public async create (entity: Transaction | Transaction[]): Promise<Transaction | Transaction[]> {
    const add = async ({ value, sendTo, receiveFrom, currentCotation, coin }: Transaction) => {
      const entity = new Transaction(value, sendTo, receiveFrom, currentCotation, coin);
      await validate(entity);

      return await this.transactionRepository.save(entity);
    };

    const results: Transaction[] = [];

    if (Array.isArray(entity)) {
      entity.forEach(async e => results.push(await add(e)));
      return results;
    } else {
      return await add(entity);
    }
  }
}
