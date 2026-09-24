import type { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import { NotificationActionEntity } from '../entities/notification-action.entity';
import { NotificationIdVO } from '../value-objects/primitives/notification-id.vo';

export interface NotificationActionRepository extends BaseRepository<NotificationActionEntity, string> {
  findByNotificationId(notificationId: NotificationIdVO): Promise<readonly NotificationActionEntity[]>;
}
