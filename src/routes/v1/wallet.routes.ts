import { Router } from 'express';
import { getRepository } from 'typeorm';

import { Wallet } from '../../entities/wallet.entity';
import { WalletService } from '../../services/wallet.service';
import { WalletController } from '../../controllers/wallet.controller';
import { Coin } from '../../entities/coin.entity';
import { CoinService } from '../../services/coin.service';
import { TransactionService } from '../../services/transaction.service';
import { Transaction } from '../../entities/transaction.entity';

export class WalletRoutes {
  private static walletRoutes: WalletRoutes
  private static prefix: string = '/wallet'

  public readonly router: Router

  private constructor (router: Router) {
    this.router = router;
  }

  public static async init (r: Router): Promise<void> {
    if (this.walletRoutes === undefined) {
      this.walletRoutes = new WalletRoutes(r);
    }

    const router = this.walletRoutes.router;

    const coinRepository = getRepository(Coin);
    const walletRepository = getRepository(Wallet);
    const transactionRepository = getRepository(Transaction);

    const transactionService = new TransactionService(transactionRepository);
    const coinService = new CoinService(coinRepository);
    const walletService = new WalletService(walletRepository, coinService, transactionService);

    const walletController = new WalletController(walletService);

    router.post(this.prefix, (req, res, next) => walletController.create(req, res, next));
    router.get(this.prefix, (req, res, next) => walletController.index(req, res, next));
    router.get(`${this.prefix}/:address`, (req, res, next) => walletController.findOne(req, res, next));
    router.delete(`${this.prefix}/:address`, (req, res, next) => walletController.delete(req, res, next));
    router.put(`${this.prefix}/:address`, (req, res, next) => walletController.transaction(req, res, next));
  }
}
