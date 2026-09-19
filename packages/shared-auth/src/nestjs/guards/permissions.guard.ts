import {
  Injectable,
  type CanActivate,
  type ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import type { AuthContext } from '@vubon/shared-types/auth';
import { hasPermission } from '../../common/permission/permission.checker';
import { PERMISSIONS_KEY, PERMISSIONS_MODE_KEY } from '../decorators/permissions.decorator';

interface RequestWithUser {
  user?: AuthContext;
}

@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const required = this.reflector.getAllAndOverride<readonly string[]>(PERMISSIONS_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!required || required.length === 0) return true;

    const mode =
      this.reflector.getAllAndOverride<'any' | 'all'>(PERMISSIONS_MODE_KEY, [
        context.getHandler(),
        context.getClass(),
      ]) ?? 'all';

    const req = context.switchToHttp().getRequest<RequestWithUser>();
    const user = req.user;
    if (!user) throw new ForbiddenException('No authenticated user');

    if (!hasPermission(user.permissions, required, mode)) {
      throw new ForbiddenException('Insufficient permission');
    }
    return true;
  }
}
