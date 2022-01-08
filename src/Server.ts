import { App } from './App';
import { log } from './helpers/log.helper';

export class Server {
  public static async init (): Promise<void> {
    const { express: app } = await App.init();
    const port = process.env.PORT || 3000;

    app.listen(port, () => log(`Serviço rodando na porta ${port}.`));
  }
}

Server.init();
