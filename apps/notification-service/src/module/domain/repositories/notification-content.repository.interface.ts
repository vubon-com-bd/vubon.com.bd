import type { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import { NotificationContentEntity } from '../entities/notification-content.entity';
import { NotificationIdVO } from '../value-objects/primitives/notification-id.vo';

export interface NotificationContentRepository extends BaseRepository<NotificationContentEntity, string> {
  findByNotificationId(notificationId: NotificationIdVO): Promise<NotificationContentEntity | null>;
}
