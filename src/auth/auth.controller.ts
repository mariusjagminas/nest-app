import { Controller, Post, UseGuards, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport/dist/auth.guard';

import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(AuthGuard('user'))
  @Post('login')
  async logIn(@Request() req) {
    return this.authService.getToken(req.user.id);
  }
}
