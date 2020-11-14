import { Body, Controller, Post } from '@nestjs/common';
import { SignUpDto } from './auth.interface';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService){}

  @Post('sign-up')
  signUp(@Body() dto: SignUpDto) {
   return this.authService.signUp(dto)
  }
}
