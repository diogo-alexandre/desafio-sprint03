import express, { Express } from 'express';
import { Database } from './database';

export class App {
  private static app: App
  public readonly express: Express

  private constructor () {
    this.express = express();
  }

  public static async init (): Promise<App> {
    if (this.app === undefined) {
      await Database.init();
      this.app = new App();
    }

    return this.app;
  }

  public middlewares (): void {
    this.express.use(express.urlencoded({ extended: true }));
    this.express.use(express.json());
  }
}
