import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TestModule } from './test/test.module';
import { getDbConfig } from './config/database';
@Module({
  imports: [
    TypeOrmModule.forRoot(getDbConfig()),
    TestModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
