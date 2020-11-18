import * as request from 'supertest';
import { getRepository } from 'typeorm';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';

import { clearDatabase, getTestDatabaseConfig } from '../../test/test-db';
import { User } from './user.entity';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { SignUpDto } from './user.interface';
import { Factory, getFactory } from '../../test/factories';
import { AuthModule } from '../auth/auth.module';

describe('UsersController', () => {
  let controller: UsersController;
  let app: INestApplication;
  let factory: Factory;

  beforeAll(async () => {
    const config = getTestDatabaseConfig();
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      imports: [
        TypeOrmModule.forRoot(config),
        TypeOrmModule.forFeature([User]),
        AuthModule,
      ],
      providers: [UsersService],
    }).compile();
    app = module.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();

    factory = await getFactory();

    controller = module.get<UsersController>(UsersController);
  });

  afterAll(async () => {
    await app.close();
  });

  beforeEach(async () => {
    await clearDatabase();
  });

  const mockedRequest: SignUpDto = {
    email: 'test-email@gmail.com',
    password: 'test-pasword',
  };

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create user', async () => {
    const result = await request(app.getHttpServer())
      .post('/users/sign-up')
      .set('Content-Type', 'application/json')
      .send(mockedRequest)
      .expect(201);

    expect(result.body.accessToken).not.toBe(null);

    const userRepository = getRepository(User);
    const user = await userRepository.findOne({ email: mockedRequest.email });

    expect(user).not.toBe(null);
    expect(user.password).not.toBe(null);
    expect(user.email).toBe(mockedRequest.email);
  });

  it('should fail create user with existing email in db', async () => {
    await factory.create<User>('User', { email: mockedRequest.email });
    const result = await request(app.getHttpServer())
      .post('/users/sign-up')
      .set('Content-Type', 'application/json')
      .send(mockedRequest)
      .expect(403);

    expect(result.body).toEqual({
      error: 'Forbidden',
      message: 'This email is already registered',
      statusCode: 403,
    });
  });

  it('should return 400 error if email is missing in request', async () => {
    await request(app.getHttpServer())
      .post('/users/sign-up')
      .set('Content-Type', 'application/json')
      .send({ password: 'new-password' })
      .expect(400);
  });

  it('should return 400 error if password is missing in request', async () => {
    await request(app.getHttpServer())
      .post('/users/sign-up')
      .set('Content-Type', 'application/json')
      .send({ email: 'new@test.com' })
      .expect(400);
  });
});
