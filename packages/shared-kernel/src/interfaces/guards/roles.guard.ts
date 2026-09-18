/**
 * Roles Guard
 * @module shared-kernel/interfaces/guards
 *
 * Values আসে shared-constants/common থেকে।
 */
import { ForbiddenException, Injectable } from '@nestjs/common';
import type { CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { HTTP_STATUS, ROLE } from '@vubon/shared-constants/common';
import type { AuthenticatedUser } from './jwt-auth.guard';

export const ROLES_KEY = 'roles';

export const RequireRoles = (...roles: readonly string[]): MethodDecorator & ClassDecorator =>
  ((target: unknown, _key?: string | symbol, descriptor?: PropertyDescriptor) => {
    if (descriptor && descriptor.value) {
      Reflect.defineMetadata(ROLES_KEY, roles, descriptor.value);
    } else {
      Reflect.defineMetadata(ROLES_KEY, roles, target as object);
    }
    return descriptor ?? target;
  }) as MethodDecorator & ClassDecorator;

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<readonly string[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

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
