import { ConnectionOptions } from 'typeorm';

export const getDbConfig = () =>
  ({
    host: process.env.DB_HOST,
    type: 'postgres',
    port: parseInt(process.env.DB_PORT || '5432'),
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    entities: ['dist/**/*.entity{.ts,.js}'],
    migrations: ['dist/src/migrations/*.js'],
    cli: {
      migrationsDir: './src/migrations',
    },
    synchronize: false,
  } as ConnectionOptions);
