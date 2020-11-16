import factory from 'factory-girl';
import { User } from '../src/users/user.entity';
import { Connection, getConnection } from 'typeorm';
import { CustomTypeORMAdapter } from './type-orm-adapter';

export type Factory = typeof factory;
export let factoryCached: Factory = null;

export const getFactory = async () => {
  if (factoryCached === null) {
    const connection: Connection = getConnection('default');
    factory.setAdapter(new CustomTypeORMAdapter(connection));

    factory.define('User', User, {
      id: factory.sequence('User.id', (n) => n),
      password: factory.sequence('User.password', (n) => `password-${n}`),
      email: factory.sequence('User.email', (n) => `email-${n}@email.com`),
    });

    factoryCached = factory;
  }

  return factoryCached;
};
