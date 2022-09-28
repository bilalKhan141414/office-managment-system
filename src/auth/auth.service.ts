import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserCredentials } from 'src/dtos/auth/user-credentials.dto';
import { UserService } from 'src/user/user.service';
import { BlacklistService } from 'src/cache/blacklist.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private blackList: BlacklistService,
  ) {}

  async DoSignup(userCreds: UserCredentials): Promise<void> {
    await this.userService.CreateUser(userCreds);
  }
  async RemoveFromBlackList(userId) {
    const isUserBlackListed = await this.blackList.verify(userId);
    if (isUserBlackListed) {
      await this.blackList.remove(userId);
    }
  }
  async DoLogin(user: { username: string; userId: string }) {
    const payload = { username: user.username, sub: user.userId };
    await this.RemoveFromBlackList(user.userId);
    const access_token = this.jwtService.sign(payload);
    return {
      access_token,
    };
  }
}
