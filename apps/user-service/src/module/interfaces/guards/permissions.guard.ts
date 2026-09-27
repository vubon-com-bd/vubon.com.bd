/**
 * PermissionsGuard (user-service local version)
 */
import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { HTTP_STATUS, PERMISSION } from '@vubon/shared-constants/common';
import type { AuthenticatedUser } from '@vubon/shared-kernel/interfaces';

const PERMISSIONS_KEY = 'permissions';

@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const required = this.reflector.getAllAndOverride<readonly string[]>(
      PERMISSIONS_KEY,
      [context.getHandler(), context.getClass()]
    );

    if (!required || required.length === 0) return true;

    const request = context.switchToHttp().getRequest<{
      user?: AuthenticatedUser;
    }>();
    const user = request.user;

    if (!user) {
      throw new ForbiddenException({
        statusCode: HTTP_STATUS.FORBIDDEN,
        message: 'User not authenticated',
      });
    }

    if (user.permissions?.includes(PERMISSION.ADMIN_MANAGE)) return true;

    const missing = required.filter((p) => !user.permissions?.includes(p));
    if (missing.length > 0) {
      throw new ForbiddenException({
        statusCode: HTTP_STATUS.FORBIDDEN,
        message: `Missing permissions: ${missing.join(', ')}`,
      });
    }
    return true;
  }
}
