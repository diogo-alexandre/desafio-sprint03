import { createConnection } from 'typeorm';

import ormconfig from '../../ormconfig';
import { Enviroment } from '../helpers/enums/enviroment.enum';

export class Database {
  public static async init (env: Enviroment = Enviroment.PRODUCTION): Promise<void> {
    const config = (env === Enviroment.PRODUCTION) ? ormconfig : ormconfig.development;
    await createConnection(config!);
  }
}
