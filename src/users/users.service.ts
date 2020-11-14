import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';
import { User } from './user.entity';
import { SignUpDto } from './user.inteface';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User> 
  ){}

  signUp(dto: SignUpDto){
    console.log('Auth service:', dto)
    this.userRepository.save(dto)
  }
}
