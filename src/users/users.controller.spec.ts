import * as request from 'supertest'
import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { clearDatabase, getTestDatabaseConfig } from '../db/test-db';
import { User } from './user.entity';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { getRepository } from 'typeorm';

describe('UsersController', () => {
  let controller: UsersController;
  let app: INestApplication;

  beforeAll(async () => {
    const config = getTestDatabaseConfig();
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      imports: [
        TypeOrmModule.forRoot(config),
        TypeOrmModule.forFeature([User])
      ],
      providers: [UsersService]
    }).compile();
    app = module.createNestApplication();
    await app.init();

    controller = module.get<UsersController>(UsersController);
  });

  beforeEach(async () => {
    await clearDatabase();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create user', async () => {
    const result = await request(app.getHttpServer())
      .post('/users/sign-up')
      .set('Content-Type', 'application/json')
      .send({ email: 'testemail@gmail.com', password: 'test' })
      .expect(201);

    expect(result.body).toEqual({})

    const userRepository = getRepository(User);
    const user = await userRepository.findOne({ email: 'testemail@gmail.com' });

    expect(user).not.toBe(null);
    expect(user.password).not.toBe(null)
    expect(user.email).toBe('testemail@gmail.com')
  })
});
