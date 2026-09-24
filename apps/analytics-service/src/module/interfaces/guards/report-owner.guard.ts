import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';

@Injectable()
export class ReportOwnerGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<{
      user?: { userId?: string; roles?: readonly string[] };
      params?: { reportId?: string };
      body?: { ownerId?: string };
      report?: { ownerId?: string };
    }>();

    const user = request.user;
    if (!user) {
      throw new ForbiddenException('Authentication required');
    }

    const roles = user.roles ?? [];
    if (roles.includes('admin')) return true;

    const ownerId =
      request.report?.ownerId ??
      request.body?.ownerId ??
      request.params?.reportId;

    if (ownerId && ownerId !== user.userId) {
      throw new ForbiddenException('You do not own this report');
    }
    return true;
  }
}
