import * as request from 'supertest'
import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { clearDatabase, getTestDatabaseConfig } from '../db/test-db';
import { User } from './user.entity';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { getRepository } from 'typeorm';
import { SignUpDto } from './user.inteface';

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
    await clearDatabase();
  });

  afterAll(async () => {
    await app.close();
  });


  const mockedRequest: SignUpDto = {
    email: 'test-emailgmail.com',
    password: 'test-pasword'
  }

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create user', async () => {
    const result = await request(app.getHttpServer())
      .post('/users/sign-up')
      .set('Content-Type', 'application/json')
      .send(mockedRequest)
      .expect(201);

    expect(result.body).toEqual({})

    const userRepository = getRepository(User);
    const user = await userRepository.findOne({ email: mockedRequest.email });

    expect(user).not.toBe(null);
    expect(user.password).not.toBe(null)
    expect(user.email).toBe(mockedRequest.email)
  })

  it('should fail create user with existing email in db', async () => {
    const result = await request(app.getHttpServer())
      .post('/users/sign-up')
      .set('Content-Type', 'application/json')
      .send(mockedRequest)
      .expect(403);

    expect(result.body).toEqual({
      error: "Forbidden",
      message: "This email is already registered",
      statusCode: 403,
    })
  })

  it('should return 400 error if email is missing in request', async () => {
    const result = await request(app.getHttpServer())
      .post('/users/sign-up')
      .set('Content-Type', 'application/json')
      .send({ password: 'new-password' })
      .expect(400);

    // expect(result).toEqual({})
  })
});
