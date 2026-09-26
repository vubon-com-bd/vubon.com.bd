import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { BaseGuard } from '@vubon/shared-kernel/interfaces';
import { ADMIN_ONLY_KEY } from '../decorators/admin-only.decorator';

interface RequestUser {
  readonly userId?: string;
  readonly roles?: readonly string[];
  readonly permissions?: readonly string[];
}

@Injectable()
export class AdminOnlyGuard extends BaseGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {
    super();
  }

  canActivate(context: ExecutionContext): boolean {
    const required = this.reflector.getAllAndOverride<boolean>(ADMIN_ONLY_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!required) return true;

    const request = context.switchToHttp().getRequest<{ user?: RequestUser }>();
    const user = request.user;

    if (!user) {
      throw new ForbiddenException('Authentication required');
    }

    const isAdmin =
      user.roles?.includes('admin') === true ||
      user.roles?.includes('super_admin') === true;

    if (!isAdmin) {
      throw new ForbiddenException('Admin access required');
    }

    return true;
  }
}
