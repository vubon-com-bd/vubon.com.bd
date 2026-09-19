/**
 * Permissions Guard
 * @module shared-kernel/interfaces/guards
 *
 * Values আসে shared-constants/common থেকে।
 */
import { ForbiddenException, Injectable } from '@nestjs/common';
import type { CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { HTTP_STATUS, PERMISSION } from '@vubon/shared-constants/common';
import type { AuthenticatedUser } from './jwt-auth.guard';

export const PERMISSIONS_KEY = 'permissions';

export const RequirePermissions = (
  ...permissions: readonly string[]
): MethodDecorator & ClassDecorator =>
  ((target: unknown, _key?: string | symbol, descriptor?: PropertyDescriptor) => {
    if (descriptor && descriptor.value) {
      Reflect.defineMetadata(PERMISSIONS_KEY, permissions, descriptor.value);
    } else {
      Reflect.defineMetadata(PERMISSIONS_KEY, permissions, target as object);
    }
    return descriptor ?? target;
  }) as MethodDecorator & ClassDecorator;

@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const required = this.reflector.getAllAndOverride<readonly string[]>(PERMISSIONS_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

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
