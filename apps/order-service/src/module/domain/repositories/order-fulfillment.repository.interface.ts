import type { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import { OrderFulfillmentEntity } from '../entities/order-fulfillment.entity';
import { FulfillmentIdVO } from '../value-objects/primitives/fulfillment-id.vo';
import { OrderIdVO } from '../value-objects/primitives/order-id.vo';
import { VendorIdVO } from '../value-objects/primitives/vendor-id.vo';

export interface OrderFulfillmentRepository
  extends BaseRepository<OrderFulfillmentEntity, FulfillmentIdVO> {
  findByOrder(orderId: OrderIdVO): Promise<OrderFulfillmentEntity | null>;
  findByVendor(vendorId: VendorIdVO): Promise<readonly OrderFulfillmentEntity[]>;
}
