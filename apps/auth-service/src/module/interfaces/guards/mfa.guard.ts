/**
 * MfaGuard — enforces that MFA has been verified for the current request
 * @module auth-service/interfaces/guards
 */
import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { MFA_REQUIRED_KEY } from '../decorators/mfa-required.decorator';
import type { AuthenticatedUser } from '../decorators/current-user.decorator';

@Injectable()
export class MfaGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const required = this.reflector.getAllAndOverride<boolean>(
      MFA_REQUIRED_KEY,
      [context.getHandler(), context.getClass()],
    );
    if (!required) return true;

    const request = context
      .switchToHttp()
      .getRequest<{ user?: AuthenticatedUser }>();
    const user = request.user;
    if (!user?.mfaVerified) {
      throw new ForbiddenException('MFA verification required');
    }
    return true;
  }
}
