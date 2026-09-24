import type { BaseServiceInterface } from '@vubon/shared-kernel/application/services/base.service.interface';
import type { NotificationRecipientEntity } from '../../../domain/entities/notification-recipient.entity';

export interface NotificationRecipientServiceInterface
  extends BaseServiceInterface<NotificationRecipientEntity, string> {
  findByNotificationId(notificationId: string): Promise<NotificationRecipientEntity | null>;
  findByUser(userId: string): Promise<readonly NotificationRecipientEntity[]>;
}
