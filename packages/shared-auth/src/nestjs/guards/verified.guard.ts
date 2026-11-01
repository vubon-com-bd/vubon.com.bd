import {
  Injectable,
  type CanActivate,
  type ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import type { AuthContext } from '@vubon/shared-types/auth';
import { VERIFIED_REQUIRED_KEY } from '../decorators/verified-required.decorator';

interface RequestWithUser {
  user?: AuthContext & { isEmailVerified?: boolean; isPhoneVerified?: boolean };
}

@Injectable()
export class VerifiedGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const required = this.reflector.getAllAndOverride<boolean>(VERIFIED_REQUIRED_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!required) return true;

    const req = context.switchToHttp().getRequest<RequestWithUser>();
    const u = req.user;
    if (!u || (!u.isEmailVerified && !u.isPhoneVerified)) {
      throw new ForbiddenException('Account must be verified');
    }
    return true;
  }
}
