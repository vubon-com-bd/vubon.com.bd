import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';

@Injectable()
export class OwnProfileGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context
      .switchToHttp()
      .getRequest<{ user?: { userId?: string }; params: { id?: string } }>();

    const currentUserId = request.user?.userId;
    const targetUserId = request.params.id;

    if (!currentUserId || !targetUserId) {
      throw new ForbiddenException('Cannot determine user');
    }
    if (currentUserId !== targetUserId) {
      throw new ForbiddenException('You can only access your own profile');
    }
    return true;
  }
}
