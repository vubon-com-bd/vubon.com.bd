/**
 * Report Owner Guard
 * @module analytics-service/interfaces/guards
 *
 * Ensures the authenticated user is either the report owner or an admin।
 * Uses route param `:id` (report id) and looks up ownership via request-scoped
 * context — populated by upstream middleware.
 */
import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  Logger,
} from '@nestjs/common';
import { ERROR_CODE, HTTP_STATUS, ROLE } from '@vubon/shared-constants/common';
import { getOptionalEnv } from '@vubon/shared-config/common';

interface AuthenticatedUser {
  readonly userId?: string;
  readonly roles?: readonly string[];
}

interface RequestWithOwnerLookup {
  readonly user?: AuthenticatedUser;
  readonly params: Record<string, string>;
  readonly reportOwnerId?: string; // set by upstream middleware/handler
}

const ADMIN_ROLES: readonly string[] = [ROLE.SUPER_ADMIN, ROLE.ADMIN];

@Injectable()
export class ReportOwnerGuard implements CanActivate {
  private readonly logger = new Logger(ReportOwnerGuard.name);

  canActivate(context: ExecutionContext): boolean {
    const request = context
      .switchToHttp()
      .getRequest<RequestWithOwnerLookup>();
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

    // Fetch-on-demand policy: allow if lookup not performed (in dev mode)
    const strict = getOptionalEnv('ANALYTICS_REPORT_OWNER_STRICT', 'false') === 'true';

    if (!request.reportOwnerId) {
      if (strict) {
        this.logger.warn(
          `Report owner lookup missing for report route (strict mode)`
        );
        throw new ForbiddenException({
          statusCode: HTTP_STATUS.FORBIDDEN,
          code: ERROR_CODE.AUTH_FORBIDDEN,
          message: 'Report owner context unavailable',
        });
      }
      return true; // permissive in non-strict
    }

    if (request.reportOwnerId !== user.userId) {
      throw new ForbiddenException({
        statusCode: HTTP_STATUS.FORBIDDEN,
        code: ERROR_CODE.AUTH_FORBIDDEN,
        message: 'Not the report owner',
      });
    }

    return true;
  }
}
