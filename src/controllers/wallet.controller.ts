import { NextFunction, Request, Response } from 'express';
import moment from 'moment';
import { HttpErrorHandler } from '../helpers/decorators/http-error-handle';

import { HttpParams } from '../helpers/types/http-params.type';
import { IWalletService } from '../services/interfaces/wallet-service.interface';

export class WalletController {
  private readonly walletService: IWalletService

  constructor (walletService: IWalletService) {
    this.walletService = walletService;
  }

  @HttpErrorHandler()
  public async create (req: Request, res: Response, next: NextFunction): Promise<void> {
    const { name, cpf, birthdate }: HttpParams = req.body;

    const wallet = await this.walletService.create({
      name,
      cpf,
      birthdate: moment(birthdate, 'DD/MM/YYYY').toDate()
    });

    res.status(201).json({
      ...wallet,
      birthdate: moment(wallet.birthdate).format('DD/MM/YYYY')
    });
  }
}
