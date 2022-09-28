import {
  Body,
  Controller,
  Get,
  Request,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { BlacklistService } from 'src/cache/blacklist.service';
import { Public } from 'src/decorators/auth-public.decorator';
import { UserCredentials } from 'src/dtos/auth/user-credentials.dto';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local/local.guard';
import { RESPONSE_MESSAGES } from '../constants/message.constants';

@Controller('auth')
export class AuthController {
  private responseConstants = RESPONSE_MESSAGES.AUTH;
  constructor(
    private authService: AuthService,
    private config: ConfigService,
    private blackList: BlacklistService,
  ) {}

  @Public()
  @Post('/signup')
  async SignUp(
    @Body() userCreds: UserCredentials,
  ): Promise<{ message: string }> {
    await this.authService.DoSignup(userCreds);
    return {
      message: this.responseConstants.SIGNUP,
    };
  }

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('/login')
  Login(@Request() req) {
    return {
      message: this.responseConstants.LOGIN,
      ...this.authService.DoLogin(req.user),
    };
  }

  @Get('/logout')
  async Logout(@Request() req) {
    console.log('req.user', req.user);
    await this.blackList.add(req.user.userId);
    const list = await this.blackList.list;
    return {
      message: this.responseConstants.LOGOUT,
      list,
    };
  }

  @Get('/profile')
  async Profile(@Request() req) {
    const list = await this.blackList.list;
    console.log(list);
    return { list };
  }
}
