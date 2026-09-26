import type { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import { FulfillmentEntity } from '../entities/fulfillment.entity';
import { FulfillmentIdVO } from '../value-objects/primitives/fulfillment-id.vo';
import { OrderIdVO } from '../value-objects/primitives/order-id.vo';

export interface FulfillmentRepository
  extends BaseRepository<FulfillmentEntity, FulfillmentIdVO> {
  findByOrder(orderId: OrderIdVO): Promise<readonly FulfillmentEntity[]>;
  findByStatus(status: string): Promise<readonly FulfillmentEntity[]>;
  findPending(): Promise<readonly FulfillmentEntity[]>;
}
