import { Body, Controller, Post } from '@nestjs/common';
import { ApiBadRequestResponse, ApiForbiddenResponse } from '@nestjs/swagger';

import { UserSessionDto } from 'src/auth/auth.interface';
import { SignUpDto } from './user.interface';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Post('sign-up')
  @ApiForbiddenResponse({ description: 'Email is already registered' })
  @ApiBadRequestResponse({
    description: 'Email or password is missing in request',
  })
  async signUp(@Body() dto: SignUpDto): Promise<UserSessionDto> {
    return await this.userService.signUp(dto);
  }
}
