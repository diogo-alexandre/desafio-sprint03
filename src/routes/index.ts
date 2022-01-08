import { Router } from 'express';
import { v1 } from './v1';

export class Routes {
  public static init (): Router {
    const router = Router();

    router.use('/v1', v1.init());

    return router;
  }
}
