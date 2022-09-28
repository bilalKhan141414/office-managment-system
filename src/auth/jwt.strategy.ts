import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { BlacklistService } from 'src/cache/blacklist.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private config: ConfigService,
    private blacklist: BlacklistService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: config.get<string>('JWT_SECRET'),
    });
  }

  async validate(payload: any) {
    const isUserBlackListed = await this.blacklist.verify(payload.sub);
    console.log('payload::validate', isUserBlackListed, payload);
    if (isUserBlackListed) {
      throw new UnauthorizedException();
    }
    return { userId: payload.sub, username: payload.name };
  }

  async fail(status: number) {
    console.log('status::', status);
  }
}
