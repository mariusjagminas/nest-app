import { Module } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';

import { authJwtSecret } from './auth.constants';
import { AuthService } from './auth.service';

@Module({
  imports: [
    JwtModule.register({
      secret: authJwtSecret,
      signOptions: { expiresIn: '1d' },
    }),
  ],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
