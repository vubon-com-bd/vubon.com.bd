/**
 * Analytics Access Guard
 * @module analytics-service/interfaces/guards
 *
 * Verifies authenticated user has an analytics permission।
 * Combines role + permission check using kernel's Reflector pattern.
 */
import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ERROR_CODE, HTTP_STATUS } from '@vubon/shared-constants/common';
import { PERMISSIONS_META_KEY } from '@vubon/shared-kernel/interfaces/decorators';

interface AuthenticatedUser {
  readonly userId?: string;
  readonly permissions?: readonly string[];
  readonly roles?: readonly string[];
}

@Injectable()
export class AnalyticsAccessGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const required = this.reflector.getAllAndOverride<readonly string[]>(
      PERMISSIONS_META_KEY,
      [context.getHandler(), context.getClass()]
    );

    if (!required || required.length === 0) return true;

    const request = context
      .switchToHttp()
      .getRequest<{ user?: AuthenticatedUser }>();
    const user = request.user;

    if (!user) {
      throw new ForbiddenException({
        statusCode: HTTP_STATUS.FORBIDDEN,
        code: ERROR_CODE.AUTH_FORBIDDEN,
        message: 'Authentication required',
      });
    }

    // Super admin override
    if (user.roles?.includes('super_admin')) return true;

    // Require ALL analytics permissions
    const missing = required.filter(
      (perm) => !user.permissions?.includes(perm)
    );

    if (missing.length > 0) {
      throw new ForbiddenException({
        statusCode: HTTP_STATUS.FORBIDDEN,
        code: ERROR_CODE.AUTH_FORBIDDEN,
        message: `Missing analytics permissions: ${missing.join(', ')}`,
        missing,
      });
    }

    return true;
  }
}
