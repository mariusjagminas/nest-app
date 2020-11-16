import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { getTestDatabaseConfig } from '../db/test-db';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';

describe('UsersService', () => {
  let service: UsersService;
  let app: INestApplication;

  beforeAll(async () => {
    const config = getTestDatabaseConfig();
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      imports: [
        TypeOrmModule.forRoot(config),
        TypeOrmModule.forFeature([User]),
      ],
      providers: [UsersService]
    }).compile();
    app = module.createNestApplication();
    await app.init();

    service = module.get<UsersService>(UsersService);
  });

  afterAll(async () => {
    await app.close();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
