import type { BaseServiceInterface } from '@vubon/shared-kernel/application/services/base.service.interface';
import type { NotificationActionEntity } from '../../../domain/entities/notification-action.entity';

export interface NotificationActionServiceInterface
  extends BaseServiceInterface<NotificationActionEntity, string> {
  findByNotificationId(notificationId: string): Promise<readonly NotificationActionEntity[]>;
}
