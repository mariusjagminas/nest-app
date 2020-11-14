import { Injectable } from '@nestjs/common';
import { SignUpDto } from './auth.interface';

@Injectable()
export class AuthService {

  signUp(dto: SignUpDto){
    console.log('Auth service:', dto)
  }
}
