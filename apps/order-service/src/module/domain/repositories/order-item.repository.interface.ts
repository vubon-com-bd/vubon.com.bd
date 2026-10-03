/**
 * Order Item Repository Interface
 * @module order-service/domain/repositories
 */
import type { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import { OrderItemEntity } from '../entities/order-item.entity.js';
import { OrderItemIdVO } from '../value-objects/primitives/order-item-id.vo.js';
import { OrderIdVO } from '../value-objects/primitives/order-id.vo.js';
import { OrderItemStatusVO } from '../value-objects/primitives/order-item-status.vo.js';
import { ProductIdVO } from '../value-objects/primitives/product-id.vo.js';
import { VendorIdVO } from '../value-objects/primitives/vendor-id.vo.js';

export const ORDER_ITEM_REPOSITORY = Symbol('ORDER_ITEM_REPOSITORY');

export interface OrderItemRepository extends BaseRepository<OrderItemEntity, string> {
  findByIdVO(id: OrderItemIdVO): Promise<OrderItemEntity | null>;
  findByOrderId(orderId: OrderIdVO): Promise<readonly OrderItemEntity[]>;
  findByProductId(productId: ProductIdVO): Promise<readonly OrderItemEntity[]>;
  findByVendorId(vendorId: VendorIdVO): Promise<readonly OrderItemEntity[]>;
  findByStatus(status: OrderItemStatusVO): Promise<readonly OrderItemEntity[]>;
  findByOrderAndProduct(
    orderId: OrderIdVO,
    productId: ProductIdVO,
  ): Promise<OrderItemEntity | null>;
  countByOrder(orderId: OrderIdVO): Promise<number>;
  deleteByOrder(orderId: OrderIdVO): Promise<void>;
}
