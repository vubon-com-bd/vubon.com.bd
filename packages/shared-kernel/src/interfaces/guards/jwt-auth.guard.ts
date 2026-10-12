/**
 * JWT Auth Guard
 * @module shared-kernel/interfaces/guards
 *
 * Respects @Public() decorator (via Reflector).
 * Actual user resolution is done by upstream middleware/strategy that sets
 * `request.user`. If `request.user` is missing on a non-public route → 401.
 */
import { Injectable, UnauthorizedException } from '@nestjs/common';
import type { CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { HTTP_STATUS } from '@vubon/shared-constants/common';
import { IS_PUBLIC_KEY } from '../decorators/public.decorator.js';

export interface AuthenticatedUser {
  readonly userId: string;
  readonly sessionId?: string;
  readonly roles?: readonly string[];
  readonly permissions?: readonly string[];
}

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private readonly reflector?: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    // 1. @Public() opt-out
    if (this.reflector) {
      const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
        context.getHandler(),
        context.getClass(),
      ]);
      if (isPublic) return true;
    }

    // 2. require authenticated user
    const request = context.switchToHttp().getRequest<{
      user?: AuthenticatedUser;
    }>();

    if (!request.user) {
      throw new UnauthorizedException({
        statusCode: HTTP_STATUS.UNAUTHORIZED,
        message: 'Authentication required',
      });
    }
    return true;
  }
}
