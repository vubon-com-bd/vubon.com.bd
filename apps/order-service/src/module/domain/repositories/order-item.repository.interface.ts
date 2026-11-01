/**
 * Order Item Repository Interface
 * @module order-service/domain/repositories
 */
import type { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import type { OrderItemEntity } from '../entities/order-item.entity.js';
import type { OrderItemIdVO } from '../value-objects/primitives/order-item-id.vo.js';

// ─── DI Token ──────────────────────────────
export const ORDER_ITEM_REPOSITORY = Symbol('ORDER_ITEM_REPOSITORY');

// ─── Filter ────────────────────────────────
export interface OrderItemListFilter {
  readonly orderId?: string;
  readonly productId?: string;
  readonly vendorId?: string;
  readonly status?: string;
}

// ─── Main Interface ────────────────────────
export interface OrderItemRepository extends BaseRepository<OrderItemEntity, string> {
  findByIdVO(id: OrderItemIdVO): Promise<OrderItemEntity | null>;
  findByOrder(orderId: string): Promise<readonly OrderItemEntity[]>;
  findByProduct(productId: string): Promise<readonly OrderItemEntity[]>;
  findByVendor(vendorId: string): Promise<readonly OrderItemEntity[]>;
  findByStatus(status: string): Promise<readonly OrderItemEntity[]>;
  findByOrderAndStatus(orderId: string, status: string): Promise<readonly OrderItemEntity[]>;
  softDelete(id: string, deletedBy?: string): Promise<void>;
}
