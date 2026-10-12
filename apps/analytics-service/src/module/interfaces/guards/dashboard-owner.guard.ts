/**
 * Dashboard Owner Guard
 * @module analytics-service/interfaces/guards
 *
 * Ensures the authenticated user owns the target dashboard (or is admin)।
 */
import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { ERROR_CODE, HTTP_STATUS, ROLE } from '@vubon/shared-constants/common';

interface AuthenticatedUser {
  readonly userId?: string;
  readonly roles?: readonly string[];
}

interface RequestWithDashboardLookup {
  readonly user?: AuthenticatedUser;
  readonly params: Record<string, string>;
  readonly dashboardOwnerId?: string; // set by upstream middleware/handler
}

const ADMIN_ROLES: readonly string[] = [ROLE.SUPER_ADMIN, ROLE.ADMIN];

@Injectable()
export class DashboardOwnerGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context
      .switchToHttp()
      .getRequest<RequestWithDashboardLookup>();
    const user = request.user;

    if (!user?.userId) {
      throw new ForbiddenException({
        statusCode: HTTP_STATUS.FORBIDDEN,
        code: ERROR_CODE.AUTH_FORBIDDEN,
        message: 'Authentication required',
      });
    }

    // Admin override
    if (ADMIN_ROLES.some((role) => user.roles?.includes(role))) {
      return true;
    }

    // If lookup not populated, allow (owner check downstream)
    if (!request.dashboardOwnerId) return true;

    if (request.dashboardOwnerId !== user.userId) {
      throw new ForbiddenException({
        statusCode: HTTP_STATUS.FORBIDDEN,
        code: ERROR_CODE.AUTH_FORBIDDEN,
        message: 'Not the dashboard owner',
      });
    }

    return true;
  }
}
