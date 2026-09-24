import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';

export const ANALYTICS_ACCESS_KEY = 'analyticsAccess';

@Injectable()
export class AnalyticsAccessGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context
      .switchToHttp()
      .getRequest<{
        user?: {
          roles?: readonly string[];
          permissions?: readonly string[];
        };
      }>();

    const user = request.user;
    if (!user) {
      throw new ForbiddenException('Authentication required');
    }

    const roles = user.roles ?? [];
    const permissions = user.permissions ?? [];

    const hasAccess =
      permissions.includes('analytics.read') ||
      roles.some((r) => ['admin', 'analyst', 'owner'].includes(r));

    if (!hasAccess) {
      throw new ForbiddenException('Analytics access denied');
    }
    return true;
  }
}
