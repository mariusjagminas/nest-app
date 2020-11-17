import { Request } from 'express';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport/dist/passport/passport.strategy';
import { Strategy, VerifiedCallback } from 'passport-custom';

import { AuthService } from './auth.service';

@Injectable()
export class AuthStrategy extends PassportStrategy(Strategy, 'user') {
  constructor(private authService: AuthService) {
    super((req: Request, callback: VerifiedCallback) =>
      this.validate(req, callback),
    );
  }

  async validate(req: Request, callback: VerifiedCallback): Promise<void> {
    const { email, password } = req.body;
    const user = await this.authService.validateLogin(email, password);

    if (user) {
      callback(null, user);
    }
    callback(null, false);
  }
}
