import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { UserSessionDto } from './auth.interface';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  getToken(id: number): UserSessionDto | null {
    const payload = { id };
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }
}
