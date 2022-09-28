import { Injectable } from '@nestjs/common';
import { UserCredentials } from 'src/dtos/auth/user-credentials.dto';
import { UserRepository } from 'src/repositories/user.respository';
import { encrptPassword, ValidatePasswordHash } from 'src/utils/bcrypt.util';

@Injectable()
export class UserService {
  constructor(private userRepo: UserRepository) {}

  CreateUser(userCreds: UserCredentials) {
    const password = encrptPassword(userCreds.password);
    return this.userRepo.CreateUser({ ...userCreds, password });
  }

  async ValidateUser(email: string, password: string) {
    const user = await this.userRepo.FindUserByEmail(email);
    return user && ValidatePasswordHash(password, user.password) ? user : null;
  }
}
