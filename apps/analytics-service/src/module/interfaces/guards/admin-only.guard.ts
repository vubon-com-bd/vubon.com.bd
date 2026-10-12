/**
 * Admin Only Guard
 * @module analytics-service/interfaces/guards
 *
 * Restricts access to admin-tier roles only।
 */
import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { ERROR_CODE, HTTP_STATUS, ROLE } from '@vubon/shared-constants/common';

const ADMIN_ROLES: readonly string[] = [
  ROLE.SUPER_ADMIN,
  ROLE.ADMIN,
];

interface AuthenticatedUser {
  readonly userId?: string;
  readonly roles?: readonly string[];
}

@Injectable()
export class AdminOnlyGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
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

    const hasAdminRole = ADMIN_ROLES.some((role) =>
      user.roles?.includes(role)
    );

    if (!hasAdminRole) {
      throw new ForbiddenException({
        statusCode: HTTP_STATUS.FORBIDDEN,
        code: ERROR_CODE.AUTH_FORBIDDEN,
        message: `Requires one of: ${ADMIN_ROLES.join(', ')}`,
      });
    }

    return true;
  }
}
