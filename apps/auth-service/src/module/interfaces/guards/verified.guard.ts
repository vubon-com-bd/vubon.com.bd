/**
 * VerifiedGuard — enforces email/phone verification
 * @module auth-service/interfaces/guards
 */
import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import {
  VERIFIED_REQUIRED_KEY,
  type VerificationChannel,
} from '../decorators/verified-required.decorator';
import type { AuthenticatedUser } from '../decorators/current-user.decorator';

interface RequestWithVerifiedUser {
  user?: AuthenticatedUser & {
    emailVerified?: boolean;
    phoneVerified?: boolean;
  };
}

@Injectable()
export class VerifiedGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const channel = this.reflector.getAllAndOverride<VerificationChannel>(
      VERIFIED_REQUIRED_KEY,
      [context.getHandler(), context.getClass()],
    );
    if (!channel) return true;

    const request = context
      .switchToHttp()
      .getRequest<RequestWithVerifiedUser>();
    const user = request.user;
    if (!user) throw new ForbiddenException('Authentication required');

    if (channel === 'email' && !user.emailVerified) {
      throw new ForbiddenException('Email verification required');
    }
    if (channel === 'phone' && !user.phoneVerified) {
      throw new ForbiddenException('Phone verification required');
    }
    if (channel === 'any' && !user.emailVerified && !user.phoneVerified) {
      throw new ForbiddenException('Email or phone verification required');
    }
    return true;
  }
}
