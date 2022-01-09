import moment from 'moment';
import { NextFunction, Request, Response } from 'express';
import { HttpErrorHandler } from '../helpers/decorators/http-error-handle';

import { HttpParams } from '../helpers/types/http-params.type';
import { IWalletService } from '../services/interfaces/wallet-service.interface';
import { IWalletDTO } from '../entities/DTO/wallet.dto';
import { ITransaction, TransactionDTO } from '../entities/DTO/transaction.dto';
import { ITransferDTO } from '../entities/DTO/transfer.dto';

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
    const { address } = req.params;
    const wallet = await this.walletService.findByAdress(address);

    res.status(200).json({
      ...wallet,
      birthdate: wallet.getBirthdate()
    });
  }

  @HttpErrorHandler()
  public async transaction (req: Request, res: Response, next: NextFunction): Promise<void> {
    const { address } = req.params;
    const body: Partial<ITransaction>[] = req.body;

    await this.walletService.saveTransaction(address, [
      ...body.map(t => {
        return new TransactionDTO(t.quoteTo!, t.currentCoin!, t.value!);
      })
    ]);

    res.status(204).end();
  }

  @HttpErrorHandler()
  public async delete (req: Request, res: Response, next: NextFunction): Promise<void> {
    const { address } = req.params;
    await this.walletService.delete(address);

    res.status(201).end();
  }

  @HttpErrorHandler()
  public async transfer (req: Request, res: Response, next: NextFunction): Promise<void> {
    const { address } = req.params;
    const { receiverAddress, quoteTo, currentCoin, value }: ITransferDTO = req.body;

    await this.walletService.transfer({
      from: address,
      to: receiverAddress,
      transaction: {
        quoteTo,
        currentCoin,
        value: Number(value)
      }
    });

    res.status(201).end();
  }

  @HttpErrorHandler()
  public async findTransactions (req: Request, res: Response, next: NextFunction): Promise<void> {
    const { address } = req.params;
    const { coin, initialDate, finalDate }: { [key: string]: string } = req.query as any;

    const transactions = await this.walletService.findTransactions({
      address,
      coin,
      inititalDate: (initialDate) ? moment(initialDate, 'DD/MM/YYYY').toDate() : undefined,
      finalDate: (finalDate) ? moment(finalDate, 'DD/MM/YYYY').toDate() : undefined
    });

    res.status(200).json(transactions);
  }
}
