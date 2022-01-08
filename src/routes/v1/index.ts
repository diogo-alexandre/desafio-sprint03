import { Router } from 'express';
import { WalletRoutes } from './wallet.routes';

export class v1 {
  public static init (): Router {
    const router = Router();

    WalletRoutes.init(router);

    return router;
  }
}
