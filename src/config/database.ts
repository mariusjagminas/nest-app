import { ConnectionOptions } from 'typeorm';
import { User } from 'src/users/user.entity';

export const getDbConfig = () => ({
  host: process.env.DB_HOST,
  type: 'postgres',
  port: parseInt(process.env.DB_PORT || '5432'),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: [User],
  synchronize: true
}) as ConnectionOptions;
