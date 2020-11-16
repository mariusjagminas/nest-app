import { IsEmail, IsNotEmpty } from 'class-validator';

export class SignUpDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;
}

export interface SignUpResponse {
  id: number;
  email: string;
}
