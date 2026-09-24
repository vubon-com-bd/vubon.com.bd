import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';

@Injectable()
export class DashboardOwnerGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<{
      user?: { userId?: string; roles?: readonly string[] };
      params?: { dashboardId?: string };
      body?: { ownerId?: string };
      dashboard?: { ownerId?: string };
    }>();

    const user = request.user;
    if (!user) {
      throw new ForbiddenException('Authentication required');
    }

    const roles = user.roles ?? [];
    if (roles.includes('admin')) return true;

    const ownerId =
      request.dashboard?.ownerId ??
      request.body?.ownerId ??
      request.params?.dashboardId;

    if (ownerId && ownerId !== user.userId) {
      throw new ForbiddenException('You do not own this dashboard');
    }
    return true;
  }
}
