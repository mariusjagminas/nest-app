import { Injectable } from '@nestjs/common';
import { SignUpDto } from './auth.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/users/user.entity';
@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User> 
  ){}

  signUp(dto: SignUpDto){
    console.log('Auth service:', dto)
    this.userRepository.save(dto)
  }
}
