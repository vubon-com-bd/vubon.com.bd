/**
 * AdminOnlyGuard — restricts to admin/super_admin roles
 * @module notification-service/interfaces/guards
 */
import { ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { BaseGuard } from '@vubon/shared-kernel/interfaces/guards';
import { HTTP_STATUS, ROLE } from '@vubon/shared-constants/common';

@Injectable()
export class AdminOnlyGuard extends BaseGuard {
  canActivate(context: ExecutionContext): boolean {
    const req = context.switchToHttp().getRequest<{
      user?: { userId?: string; roles?: readonly string[] };
    }>();

    const user = req.user;
    if (!user?.userId) {
      throw new ForbiddenException({
        statusCode: HTTP_STATUS.FORBIDDEN,
        message: 'Authentication required',
      });
    }

    const isAdmin =
      user.roles?.includes(ROLE.ADMIN) ||
      user.roles?.includes(ROLE.SUPER_ADMIN);
    if (!isAdmin) {
      throw new ForbiddenException({
        statusCode: HTTP_STATUS.FORBIDDEN,
        message: 'Admin access required',
      });
    }

    return true;
  }
}
