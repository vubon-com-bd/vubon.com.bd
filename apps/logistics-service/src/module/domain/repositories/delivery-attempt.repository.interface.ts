import type { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import { DeliveryAttemptEntity } from '../entities/delivery-attempt.entity';
import { DeliveryIdVO } from '../value-objects/primitives/delivery-id.vo';

export interface DeliveryAttemptRepository
  extends BaseRepository<DeliveryAttemptEntity, string> {
  findByDelivery(deliveryId: DeliveryIdVO): Promise<readonly DeliveryAttemptEntity[]>;
  countByDelivery(deliveryId: DeliveryIdVO): Promise<number>;
}
