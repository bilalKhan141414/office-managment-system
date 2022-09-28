import { Injectable } from '@nestjs/common';
import { UserCredentialsDto } from 'src/dtos/user-credentials.dto';
import { DataSource, Repository } from 'typeorm';
import { UserEntity } from './user.entity';

@Injectable()
export class UserRepository extends Repository<UserEntity> {
  constructor(private datasoure: DataSource) {
    super(UserEntity, datasoure.createEntityManager());
  }

  async CreateUser(userCredentials: UserCredentialsDto): Promise<void> {
    const user = this.create(userCredentials);
    await this.save(user);
  }
}
