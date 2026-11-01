/**
 * Order Repository Interface
 * @module order-service/domain/repositories
 */
import type { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import type { OrderEntity } from '../entities/order.entity.js';
import type { OrderIdVO } from '../value-objects/primitives/order-id.vo.js';

// ─── DI Token ──────────────────────────────
export const ORDER_REPOSITORY = Symbol('ORDER_REPOSITORY');

// ─── Filter ────────────────────────────────
export interface OrderListFilter {
  readonly customerId?: string;
  readonly vendorId?: string;
  readonly status?: string;
  readonly priority?: string;
  readonly channel?: string;
  readonly fromDate?: string;
  readonly toDate?: string;
  readonly minTotal?: number;
  readonly maxTotal?: number;
  readonly search?: string;
}

// ─── List Options ──────────────────────────
export interface OrderListOptions {
  readonly page: number;
  readonly limit: number;
  readonly sortBy?: 'createdAt' | 'updatedAt' | 'totalAmount' | 'status';
  readonly sortDir?: 'asc' | 'desc';
  readonly filter?: OrderListFilter;
}

// ─── Pagination Result ─────────────────────
export interface OrderPaginationResult {
  readonly items: readonly OrderEntity[];
  readonly total: number;
  readonly page: number;
  readonly limit: number;
  readonly totalPages: number;
}

// ─── Stats ─────────────────────────────────
export interface OrderStats {
  readonly total: number;
  readonly totalRevenue: number;
  readonly averageOrderValue: number;
  readonly currency: string;
  readonly byStatus: Readonly<Record<string, number>>;
}

// ─── Main Interface ────────────────────────
export interface OrderRepository extends BaseRepository<OrderEntity, string> {
  // Find by ID VO
  findByIdVO(id: OrderIdVO): Promise<OrderEntity | null>;

  // Custom queries
  findByOrderNumber(orderNumber: string): Promise<OrderEntity | null>;
  findByCustomer(customerId: string): Promise<readonly OrderEntity[]>;
  findByStatus(status: string): Promise<readonly OrderEntity[]>;

  // Pagination
  findPaginated(options: OrderListOptions): Promise<OrderPaginationResult>;

  // Stats
  getStats(
    customerId?: string,
    fromDate?: string,
    toDate?: string,
  ): Promise<OrderStats>;

  // Cron-support queries
  findStalePending(olderThanMinutes: number): Promise<readonly OrderEntity[]>;
  findExpiredUnconfirmed(olderThanHours: number): Promise<readonly OrderEntity[]>;
  findAwaitingFulfillment(): Promise<readonly OrderEntity[]>;

  // Soft delete
  softDelete(id: string, deletedBy?: string): Promise<void>;
}
