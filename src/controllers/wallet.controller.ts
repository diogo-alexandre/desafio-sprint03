import moment from 'moment';
import { NextFunction, Request, Response } from 'express';
import { HttpErrorHandler } from '../helpers/decorators/http-error-handle';

import { HttpParams } from '../helpers/types/http-params.type';
import { IWalletService } from '../services/interfaces/wallet-service.interface';
import { IWalletDTO } from '../entities/DTO/wallet.dto';

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
      birthdate: wallet.getBirthdate()
    });
  }

  @HttpErrorHandler()
  public async index (req: Request, res: Response, next: NextFunction): Promise<void> {
    const { name, cpf, birthdate, createdAt, updatedAt }: Partial<IWalletDTO> = req.query;

    const wallets = await this.walletService.find({
      name,
      cpf,
      birthdate: (birthdate) ? moment(birthdate, 'DD/MM/YYYY').toDate() : undefined,
      createdAt: (createdAt) ? new Date(createdAt) : undefined,
      updatedAt: (updatedAt) ? new Date(updatedAt) : undefined
    });

    res.status(200).json({
      wallets: wallets.map(wallet => ({
        ...wallet,
        birthdate: wallet.getBirthdate()
      }))
    });
  }

  @HttpErrorHandler()
  public async findOne (req: Request, res: Response, next: NextFunction): Promise<void> {
    const { adress } = req.params;

    const wallet = await this.walletService.findByAdress(adress);

    res.status(200).json({
      ...wallet,
      birthdate: wallet.getBirthdate()
    });
  }
}
