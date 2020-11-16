import { Body, Controller, Post } from '@nestjs/common';
import { SignUpDto, SignUpResponse } from './user.inteface';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Post('sign-up')
  async signUp(@Body() dto: SignUpDto): Promise<SignUpResponse> {
    return await this.userService.signUp(dto);
  }
}
