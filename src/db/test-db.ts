import { ConnectionOptions, getConnection, getManager } from 'typeorm';

export const getTestDatabaseConfig = () =>
  ({
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
  } as ConnectionOptions);

export const clearDatabase = async () => {
  await getManager().transaction(async (tm) => {
    for (const entity of getConnection().entityMetadatas) {
      if (entity.tableType !== 'regular') continue;
      await tm.query(`ALTER TABLE "${entity.tableName}" DISABLE TRIGGER ALL;`);
      await tm
        .createQueryBuilder()
        .delete()
        .from(entity.target)
        .where('1 = 1')
        .execute();
      await tm.query(`ALTER TABLE "${entity.tableName}" ENABLE TRIGGER ALL;`);
    }
  });
};
