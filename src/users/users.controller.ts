import { Body, Controller, Post } from '@nestjs/common';
import { SignUpDto } from './user.inteface';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Post('sign-up')
  async signUp(@Body() dto: SignUpDto): Promise<{}> {
    return await this.userService.signUp(dto);
  }
}
