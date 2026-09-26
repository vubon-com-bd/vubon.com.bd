import type { BaseServiceInterface } from '@vubon/shared-kernel/application/services/base.service.interface';
import type { NotificationAttemptEntity } from '../../../domain/entities/notification-attempt.entity';

export interface NotificationAttemptServiceInterface
  extends BaseServiceInterface<NotificationAttemptEntity, string> {
  findByDeliveryId(deliveryId: string): Promise<readonly NotificationAttemptEntity[]>;
}
