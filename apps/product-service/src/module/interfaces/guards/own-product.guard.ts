import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';

@Injectable()
export class OwnProductGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context
      .switchToHttp()
      .getRequest<{ user?: { userId?: string }; params: { id?: string } }>();

    const currentUserId = request.user?.userId;
    const targetId = request.params.id;

    if (!currentUserId || !targetId) {
      throw new ForbiddenException('Cannot determine product ownership');
    }
    return true;
  }
}
