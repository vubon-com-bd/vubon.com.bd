/**
 * JWT Auth Guard
 * @module shared-kernel/interfaces/guards
 *
 * Respects @Public() decorator (via Reflector).
 * Also respects DISABLE_AUTH=true env (for local testing).
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
    // 0. DISABLE_AUTH bypass (dev/test only — BLOCKED in production)
    if (
      process.env['NODE_ENV'] !== 'production' &&
      process.env['DISABLE_AUTH'] === 'true'
    ) {
      const request = context.switchToHttp().getRequest<{ user?: AuthenticatedUser }>();
      if (!request.user) {
        request.user = {
          userId: '00000000-0000-4000-8000-000000000001',
          roles: ['admin', 'super_admin'],
          permissions: ['*'],
        };
      }
      return true;
    }

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
