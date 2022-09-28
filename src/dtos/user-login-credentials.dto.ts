import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class UserLoginCredentialsDto {
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;
}
