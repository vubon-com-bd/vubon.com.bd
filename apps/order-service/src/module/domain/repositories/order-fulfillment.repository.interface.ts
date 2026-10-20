/**
 * Order Fulfillment Repository Interface
 * @module order-service/domain/repositories
 */
import type { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import type { OrderFulfillmentEntity } from '../entities/order-fulfillment.entity.js';
import type { FulfillmentIdVO } from '../value-objects/primitives/fulfillment-id.vo.js';

// ─── DI Token ──────────────────────────────
export const ORDER_FULFILLMENT_REPOSITORY = Symbol('ORDER_FULFILLMENT_REPOSITORY');

// ─── Filter ────────────────────────────────
export interface OrderFulfillmentListFilter {
  readonly orderId?: string;
  readonly vendorId?: string;
  readonly status?: string;
  readonly warehouseId?: string;
  readonly fromDate?: string;
  readonly toDate?: string;
}

// ─── Main Interface ────────────────────────
export interface OrderFulfillmentRepository
  extends BaseRepository<OrderFulfillmentEntity, string> {
  findByIdVO(id: FulfillmentIdVO): Promise<OrderFulfillmentEntity | null>;
  findByOrder(orderId: string): Promise<readonly OrderFulfillmentEntity[]>;
  findByVendor(vendorId: string): Promise<readonly OrderFulfillmentEntity[]>;
  findByStatus(status: string): Promise<readonly OrderFulfillmentEntity[]>;
  findAwaitingFulfillment(): Promise<readonly OrderFulfillmentEntity[]>;
  softDelete(id: string, deletedBy?: string): Promise<void>;
}
