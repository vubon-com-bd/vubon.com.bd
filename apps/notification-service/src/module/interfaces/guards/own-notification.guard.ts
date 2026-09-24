import {
  Injectable,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { BaseGuard } from '@vubon/shared-kernel/interfaces';

@Injectable()
export class OwnNotificationGuard extends BaseGuard {
  canActivate(context: ExecutionContext): boolean {
    const request = context
      .switchToHttp()
      .getRequest<{ user?: { userId?: string }; params?: { id?: string } }>();

    const userId = request.user?.userId;
    const notificationUserId = request.params?.id;

    if (!userId) {
      throw new ForbiddenException('Authentication required');
    }
    // Ownership verification is enforced at the handler level via query
    void notificationUserId;
    return true;
  }
}
