import type { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import { DeliveryEntity } from '../entities/delivery.entity';
import { DeliveryIdVO } from '../value-objects/primitives/delivery-id.vo';
import { OrderIdVO } from '../value-objects/primitives/order-id.vo';

export interface DeliveryRepository
  extends BaseRepository<DeliveryEntity, DeliveryIdVO> {
  findByOrder(orderId: OrderIdVO): Promise<DeliveryEntity | null>;
  findByStatus(status: string): Promise<readonly DeliveryEntity[]>;
}
