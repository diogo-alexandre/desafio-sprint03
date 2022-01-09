import { Transaction } from '../../entities/transaction.entity';

export interface ITransactionService {
  create (entity: Transaction | Transaction[]): Promise<Transaction | Transaction[]>
}
