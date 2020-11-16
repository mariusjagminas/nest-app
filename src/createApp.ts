import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express/interfaces/nest-express-application.interface';

import { AppModule } from './app.module';

export const createApp = async () => {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  return app.useGlobalPipes(new ValidationPipe());
};
