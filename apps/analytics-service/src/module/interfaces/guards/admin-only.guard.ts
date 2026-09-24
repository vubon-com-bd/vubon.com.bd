import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';

@Injectable()
export class AdminOnlyGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context
      .switchToHttp()
      .getRequest<{ user?: { roles?: readonly string[] } }>();

    const user = request.user;
    if (!user) {
      throw new ForbiddenException('Authentication required');
    }

    const roles = user.roles ?? [];
    if (!roles.includes('admin')) {
      throw new ForbiddenException('Admin access required');
    }
    return true;
  }
}
