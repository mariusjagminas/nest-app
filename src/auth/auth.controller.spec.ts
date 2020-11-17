import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import * as bcrypt from 'bcrypt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/user.entity';
import { clearDatabase, getTestDatabaseConfig } from '../../test/test-db';
import { AuthController } from './auth.controller';
import { AuthModule } from './auth.module';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Factory, getFactory } from '../../test/factories';
import { SignUpDto } from 'src/users/user.inteface';

describe('AuthController', () => {
  let controller: AuthController;
  let app: INestApplication;
  let factory: Factory;

  beforeAll(async () => {
    const config = getTestDatabaseConfig();
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      imports: [
        TypeOrmModule.forRoot(config),
        TypeOrmModule.forFeature([User]),
        AuthModule,
      ],
    }).compile();
    app = module.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();

    factory = await getFactory();
    controller = module.get<AuthController>(AuthController);
  });

  afterAll(async () => {
    await app.close();
  });

  beforeEach(async () => {
    await clearDatabase();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  const mockedRequest: SignUpDto = {
    email: 'test-email11@gmail.com',
    password: 'test-password-11',
  };

  it('should return jw token if user has account', async () => {
    const encryptedPassword = await bcrypt.hash(mockedRequest.password, 10);
    await factory.create<User>('User', {
      email: mockedRequest.email,
      password: encryptedPassword,
    });

    const result = await request(app.getHttpServer())
      .post('/auth/login')
      .set('Content-Type', 'application/json')
      .send(mockedRequest)
      .expect(201);

    expect(result.body.accessToken).not.toBe(null);
  });

  it('should return 401 if password is not valid', async () => {
    const encryptedPassword = await bcrypt.hash('wrong-password', 10);
    await factory.create<User>('User', {
      email: mockedRequest.email,
      password: encryptedPassword,
    });

    const result = await request(app.getHttpServer())
      .post('/auth/login')
      .set('Content-Type', 'application/json')
      .send(mockedRequest)
      .expect(401);

    expect(result.body).toEqual({ message: 'Unauthorized', statusCode: 401 });
  });

  it('should return 401 if email is not valid', async () => {
    const encryptedPassword = await bcrypt.hash(mockedRequest.password, 10);
    await factory.create<User>('User', {
      email: 'wrong@email.com',
      password: encryptedPassword,
    });

    const result = await request(app.getHttpServer())
      .post('/auth/login')
      .set('Content-Type', 'application/json')
      .send(mockedRequest)
      .expect(401);

    expect(result.body).toEqual({ message: 'Unauthorized', statusCode: 401 });
  });
});
