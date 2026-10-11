/**
 * NotificationStatusGuard — enforces @NotificationStatus(...) metadata
 * @module notification-service/interfaces/guards
 */
import {
  ExecutionContext,
  ForbiddenException,
  Inject,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { BaseGuard } from '@vubon/shared-kernel/interfaces/guards';
import { HTTP_STATUS } from '@vubon/shared-constants/common';
import {
  NOTIFICATION_REPOSITORY,
  type NotificationRepository,
} from '../../domain/repositories/notification.repository.interface.js';
import { NOTIFICATION_STATUS_METADATA_KEY } from '../decorators/notification-status.decorator.js';

@Injectable()
export class NotificationStatusGuard extends BaseGuard {
  constructor(
    @Inject(NOTIFICATION_REPOSITORY)
    private readonly notificationRepo: NotificationRepository,
    private readonly reflector: Reflector,
  ) {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const allowed = this.reflector.getAllAndOverride<readonly string[]>(
      NOTIFICATION_STATUS_METADATA_KEY,
      [context.getHandler(), context.getClass()],
    );
    if (!allowed || allowed.length === 0) return true;

    const req = context.switchToHttp().getRequest<{
      params?: Record<string, string>;
    }>();
    const notificationId = req.params?.notificationId ?? req.params?.id;
    if (!notificationId) return true;

    const notification = await this.notificationRepo.findById(notificationId);
    if (!notification) {
      throw new ForbiddenException({
        statusCode: HTTP_STATUS.FORBIDDEN,
        message: 'Notification not found',
      });
    }

    if (!allowed.includes(notification.status.value)) {
      throw new ForbiddenException({
        statusCode: HTTP_STATUS.FORBIDDEN,
        message: `Notification status "${notification.status.value}" not allowed. Expected: ${allowed.join(', ')}`,
      });
    }

    return true;
  }
}
