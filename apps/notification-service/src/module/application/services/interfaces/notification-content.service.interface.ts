import type { BaseServiceInterface } from '@vubon/shared-kernel/application/services/base.service.interface';
import type { NotificationContentEntity } from '../../../domain/entities/notification-content.entity';

export interface NotificationContentServiceInterface
  extends BaseServiceInterface<NotificationContentEntity, string> {
  findByNotificationId(notificationId: string): Promise<NotificationContentEntity | null>;
}
