import type { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import { NotificationDeliveryEntity } from '../entities/notification-delivery.entity';
import { NotificationIdVO } from '../value-objects/primitives/notification-id.vo';
import { ProviderMessageIdVO } from '../value-objects/primitives/provider-message-id.vo';

export interface NotificationDeliveryRepository extends BaseRepository<NotificationDeliveryEntity, string> {
  findByNotificationId(notificationId: NotificationIdVO): Promise<NotificationDeliveryEntity | null>;
  findByProviderMessageId(messageId: ProviderMessageIdVO): Promise<NotificationDeliveryEntity | null>;
  findFailed(limit?: number): Promise<readonly NotificationDeliveryEntity[]>;
  findRetryable(): Promise<readonly NotificationDeliveryEntity[]>;
}
