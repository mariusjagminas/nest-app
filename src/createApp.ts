import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express/interfaces/nest-express-application.interface';
import { AppModule } from './app.module';

export const createApp = async () => {
  return await NestFactory.create<NestExpressApplication>(AppModule);
}
