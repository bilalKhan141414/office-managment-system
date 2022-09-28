import { IsEmail, IsNotEmpty, IsString, Matches } from 'class-validator';

export class UserCredentialsDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message:
      'Password can only contain at least 1 upper case letter, at least 1 lower case letter and at least 1 number or special character',
  })
  password: string;
}
