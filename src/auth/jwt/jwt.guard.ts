import { ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { IS_PUBLIC_KEY } from 'src/decorators/auth-public.decorator';
import { BlacklistService } from '../../cache/blacklist.service';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from 'src/types/jwt.types';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(
    private reflector: Reflector,
    private blacklist: BlacklistService,
    private jwtService: JwtService,
  ) {
    super();
  }

  canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) {
      return true;
    }
    return super.canActivate(context);
  }
  handleRequest<TUser = any>(
    err: any,
    user: any,
    info: any,
    context: ExecutionContext,
    status?: any,
  ): TUser {
    if (info?.name === 'TokenExpiredError') {
      const request = context.switchToHttp().getRequest();
      const token = request.headers.authorization.split(' ')[1];
      const decodedR: JwtPayload = this.jwtService.decode(token) as JwtPayload;
      this.blacklist.remove(decodedR.sub);
      console.log(decodedR);
    }
    return super.handleRequest(err, user, info, context, status);
  }
}
