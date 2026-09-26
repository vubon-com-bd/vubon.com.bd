import type { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import { NotificationEntity } from '../entities/notification.entity';
import { NotificationIdVO } from '../value-objects/primitives/notification-id.vo';
import { UserIdVO } from '../value-objects/primitives/user-id.vo';

export interface NotificationRepository extends BaseRepository<NotificationEntity, NotificationIdVO> {
  findByUser(userId: UserIdVO, limit?: number): Promise<readonly NotificationEntity[]>;
  findUnread(userId: UserIdVO): Promise<readonly NotificationEntity[]>;
  countUnread(userId: UserIdVO): Promise<number>;
  markAllRead(userId: UserIdVO): Promise<void>;
}
