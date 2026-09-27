/**
 * RolesGuard (user-service local version)
 * @module user-service/interfaces/guards
 *
 * NOTE: This is a LOCAL re-implementation of the kernel's RolesGuard.
 * Reason: kernel's RolesGuard was compiled with a separate @nestjs/core
 * instance (pnpm peer-dep hash mismatch), so injecting Reflector fails.
 * This local version uses the SAME @nestjs/core as this app.
 */
import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { HTTP_STATUS, ROLE } from '@vubon/shared-constants/common';
import type { AuthenticatedUser } from '@vubon/shared-kernel/interfaces';

const ROLES_KEY = 'roles';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<readonly string[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()]
    );

    if (!requiredRoles || requiredRoles.length === 0) return true;

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

    if (user.roles?.includes(ROLE.SUPER_ADMIN)) return true;

    const hasRole = requiredRoles.some((role) => user.roles?.includes(role));
    if (!hasRole) {
      throw new ForbiddenException({
        statusCode: HTTP_STATUS.FORBIDDEN,
        message: `Requires one of: ${requiredRoles.join(', ')}`,
      });
    }
    return true;
  }
}
