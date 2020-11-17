import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';

import { authJwtSecret } from './auth.constants';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { AuthStrategy } from './auth.guard';
import { User } from '../users/user.entity';

@Module({
  imports: [
    JwtModule.register({
      secret: authJwtSecret,
      signOptions: { expiresIn: '1d' },
    }),
    TypeOrmModule.forFeature([User]),
  ],
  providers: [AuthService, AuthStrategy],
  exports: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
