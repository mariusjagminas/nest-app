import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { AuthService } from '../auth/auth.service';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { SignUpDto } from './user.inteface';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private authService: AuthService,
  ) {}

  async signUp(dto: SignUpDto) {
    try {
      const { id } = await this.userRepository.save(dto);

      return this.authService.getToken(id);
    } catch (err) {
      if (err.code === '23505') {
        throw new ForbiddenException('This email is already registered');
      }
    }
  }
}
