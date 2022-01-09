import { ITransactionDTO } from '../../entities/DTO/transaction.dto';
import { Transaction } from '../../entities/transaction.entity';

export interface ITransactionService {
  create (transaction: ITransactionDTO): Promise<Transaction>
}
