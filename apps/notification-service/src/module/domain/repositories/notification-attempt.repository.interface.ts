import type { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import { NotificationAttemptEntity } from '../entities/notification-attempt.entity';

export interface NotificationAttemptRepository extends BaseRepository<NotificationAttemptEntity, string> {
  findByDeliveryId(deliveryId: string): Promise<readonly NotificationAttemptEntity[]>;
}
