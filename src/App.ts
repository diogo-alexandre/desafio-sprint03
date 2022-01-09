import express, { Express, NextFunction, Request, Response } from 'express';

import { Routes } from './routes';
import { Database } from './database';
import { HttpError } from './errors/http/http.error';

export class App {
  private static app: App
  public readonly express: Express

  private constructor () {
    this.express = express();
    this.middlewares();
    this.routes();
    this.erroHandler();
  }

  public static async init (): Promise<App> {
    if (this.app === undefined) {
      await Database.init();
      this.app = new App();
    }

    return this.app;
  }

  private middlewares (): void {
    this.express.use(express.urlencoded({ extended: true }));
    this.express.use(express.json());
  }

  private routes (): void {
    this.express.use('/api', Routes.init());
  }

  private erroHandler (): void {
    this.express.use((err: HttpError, req: Request, res: Response, next: NextFunction): void => {
      console.log(err);
      res.status(err.statusCode || 500).json({
        statusCode: err.statusCode || 500,
        moment: err.moment,
        message: err.message || 'Erro interno desconhecido.',
        value: err.value
      });
    });
  }
}
