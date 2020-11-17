import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';

import { User } from 'src/users/user.entity';
import { Repository } from 'typeorm';
import { UserSessionDto } from './auth.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  getToken(id: number): UserSessionDto | null {
    const payload = { id };

    return {
      accessToken: this.jwtService.sign(payload),
    };
  }

  async validateLogin(email: string, password: string): Promise<User | null> {
    const user = await this.userRepository.findOne({ where: { email: email } });
    if (user) {
      const isValidPassword = await bcrypt.compare(password, user.password);
      return isValidPassword ? user : null;
    }
    return null;
  }
}
