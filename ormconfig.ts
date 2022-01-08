import { ConnectionOptions } from 'typeorm';
import path from 'path';

import 'dotenv/config';

interface IOrmConfig {
  development?: ConnectionOptions
}

const config: ConnectionOptions & IOrmConfig = {
  type: 'mysql',
  host: process.env.DB_HOST,
  port: process.env.DB_PORT as unknown as number,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_DATABASE,
  entities: [path.resolve(__dirname, 'src/entities/**/*.entity.{ts,js}')],
  migrations: [path.resolve(__dirname, 'src/database/migrations/*.{ts,js}')],
  cli: {
    migrationsDir: 'src/database/migrations',
    entitiesDir: 'src/entities'
  }
};

export = config
