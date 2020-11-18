import { Controller, Post, UseGuards, Request, Body } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport/dist/auth.guard';
import { ApiUnauthorizedResponse } from '@nestjs/swagger';
import { SignUpDto } from '../users/user.interface';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(AuthGuard('user'))
  @Post('login')
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  async logIn(@Request() req, @Body() _body: SignUpDto) {
    return this.authService.getToken(req.user.id);
  }
}
