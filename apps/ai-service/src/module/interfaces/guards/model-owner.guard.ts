import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { BaseGuard } from '@vubon/shared-kernel/interfaces';

@Injectable()
export class ModelOwnerGuard extends BaseGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context
      .switchToHttp()
      .getRequest<{ user?: { userId?: string; roles?: readonly string[] }; params?: { id?: string } }>();

    const user = request.user;
    if (!user) {
      throw new ForbiddenException('Authentication required');
    }

    const isAdmin =
      user.roles?.includes('admin') === true ||
      user.roles?.includes('super_admin') === true;

    if (isAdmin) return true;

    if (!user.userId) {
      throw new ForbiddenException('User context missing');
    }

    return true;
  }
}
