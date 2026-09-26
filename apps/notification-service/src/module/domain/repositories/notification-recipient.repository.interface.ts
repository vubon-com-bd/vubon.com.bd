import type { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import { NotificationRecipientEntity } from '../entities/notification-recipient.entity';
import { NotificationIdVO } from '../value-objects/primitives/notification-id.vo';
import { UserIdVO } from '../value-objects/primitives/user-id.vo';

export interface NotificationRecipientRepository extends BaseRepository<NotificationRecipientEntity, string> {
  findByNotificationId(notificationId: NotificationIdVO): Promise<NotificationRecipientEntity | null>;
  findByUser(userId: UserIdVO): Promise<readonly NotificationRecipientEntity[]>;
}
