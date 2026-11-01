import {
  Injectable,
  type CanActivate,
  type ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import type { AuthContext } from '@vubon/shared-types/auth';
import { MFA_REQUIRED_KEY } from '../decorators/mfa-required.decorator';

interface RequestWithUser {
  user?: AuthContext & { mfaVerified?: boolean };
}

@Injectable()
export class MfaGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const required = this.reflector.getAllAndOverride<readonly string[]>(MFA_REQUIRED_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!required) return true;

    const req = context.switchToHttp().getRequest<RequestWithUser>();
    if (!req.user?.mfaVerified) {
      throw new UnauthorizedException('MFA verification required');
    }
    return true;
  }
}
