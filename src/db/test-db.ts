import { ConnectionOptions } from "typeorm";

export const getTestDatabaseConfig = () => ({
  name: 'default',
  host: 'db-test',
  port: 5432,
  username: process.env.DB_TEST_USER,
  password: process.env.DB_TEST_PASSWORD,
  database: process.env.DB_TEST_DB,
  type: 'postgres',
  entities: ['src/**/**.entity.ts'],
  migrations: ['dist/src/migrations/*.js'],
  cli: {
    migrationsDir: './src/migrations/',
  },
  synchronize: true,
} as ConnectionOptions)

