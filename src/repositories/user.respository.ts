import { DataSource, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { UserEntity } from '../entities/user.entity';
import { UserCredentials } from 'src/dtos/auth/user-credentials.dto';

@Injectable()
export class UserRepository extends Repository<UserEntity> {
  constructor(private dataSource: DataSource) {
    super(UserEntity, dataSource.createEntityManager());
  }

  async CreateUser(userCreds: UserCredentials): Promise<void> {
    const user = this.create(userCreds);
    await this.save(user);
  }

  async FindUserByEmail(email: string): Promise<UserEntity> {
    return this.findOneBy({ email });
  }
}
