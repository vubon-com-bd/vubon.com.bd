/**
 * Order Fulfillment Repository Interface
 * @module order-service/domain/repositories
 */
import type { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import { OrderFulfillmentEntity } from '../entities/order-fulfillment.entity.js';
import { FulfillmentIdVO } from '../value-objects/primitives/fulfillment-id.vo.js';
import { FulfillmentStatusVO } from '../value-objects/primitives/fulfillment-status.vo.js';
import { OrderIdVO } from '../value-objects/primitives/order-id.vo.js';
import { VendorIdVO } from '../value-objects/primitives/vendor-id.vo.js';

export const ORDER_FULFILLMENT_REPOSITORY = Symbol('ORDER_FULFILLMENT_REPOSITORY');

export interface OrderFulfillmentRepository
  extends BaseRepository<OrderFulfillmentEntity, string> {
  findByIdVO(id: FulfillmentIdVO): Promise<OrderFulfillmentEntity | null>;
  findByOrderId(orderId: OrderIdVO): Promise<readonly OrderFulfillmentEntity[]>;
  findByVendorId(vendorId: VendorIdVO): Promise<readonly OrderFulfillmentEntity[]>;
  findByStatus(
    status: FulfillmentStatusVO,
  ): Promise<readonly OrderFulfillmentEntity[]>;
  findByTrackingNumber(
    trackingNumber: string,
  ): Promise<OrderFulfillmentEntity | null>;
  findActiveByOrder(orderId: OrderIdVO): Promise<OrderFulfillmentEntity | null>;
  countByOrder(orderId: OrderIdVO): Promise<number>;
}
