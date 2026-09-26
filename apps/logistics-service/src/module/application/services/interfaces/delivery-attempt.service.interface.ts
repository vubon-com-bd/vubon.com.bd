import type { BaseServiceInterface } from '@vubon/shared-kernel/application/services/base.service.interface';
import type { DeliveryAttemptEntity } from '../../../domain/entities/delivery-attempt.entity';

export interface DeliveryAttemptServiceInterface
  extends BaseServiceInterface<DeliveryAttemptEntity, string> {
  listByDelivery(deliveryId: string): Promise<readonly DeliveryAttemptEntity[]>;
  countByDelivery(deliveryId: string): Promise<number>;
}
