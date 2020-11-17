import { IsNotEmpty } from 'class-validator';

export class UserSessionDto {
  @IsNotEmpty()
  accessToken: string;
}
