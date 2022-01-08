import { Router } from 'express';
import { getRepository } from 'typeorm';

import { Wallet } from '../../entities/wallet.entity';
import { WalletService } from '../../services/wallet.service';
import { WalletController } from '../../controllers/wallet.controller';

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

    const walletRepository = getRepository(Wallet);
    const walletService = new WalletService(walletRepository);
    const walletController = new WalletController(walletService);

    router.post(this.prefix, (req, res, next) => walletController.create(req, res, next));
    router.get(this.prefix, (req, res, next) => walletController.index(req, res, next));
    router.get(`${this.prefix}/:address`, (req, res, next) => walletController.findOne(req, res, next));
    router.delete(`${this.prefix}/:address`, (req, res, next) => walletController.delete(req, res, next));
  }
}
