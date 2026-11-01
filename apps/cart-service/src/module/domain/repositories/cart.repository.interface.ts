/**
 * Cart Repository Interface
 * @module cart-service/domain/repositories
 */
import type { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import type { CartEntity } from '../entities/cart.entity.js';
import type { CartIdVO } from '../value-objects/primitives/cart-id.vo.js';
import type { IdempotencyKeyVO } from '../value-objects/primitives/idempotency-key.vo.js';

// ─── DI Token ──────────────────────────────
export const CART_REPOSITORY = Symbol('CART_REPOSITORY');

// ─── Filter ────────────────────────────────
export interface CartListFilter {
  readonly userId?: string;
  readonly sessionId?: string;
  readonly status?: string;
  readonly type?: string;
  readonly currency?: string;
  readonly minTotal?: number;
  readonly maxTotal?: number;
  readonly minItemCount?: number;
  readonly fromDate?: string;
  readonly toDate?: string;
  readonly search?: string;
}

// ─── List Options ──────────────────────────
export interface CartListOptions {
  readonly page: number;
  readonly limit: number;
  readonly sortBy?: 'createdAt' | 'updatedAt' | 'total' | 'itemCount';
  readonly sortDir?: 'asc' | 'desc';
  readonly filter?: CartListFilter;
}

// ─── Pagination Result ─────────────────────
export interface CartPaginationResult {
  readonly items: readonly CartEntity[];
  readonly total: number;
  readonly page: number;
  readonly limit: number;
  readonly totalPages: number;
}

// ─── Stats ─────────────────────────────────
export interface CartStats {
  readonly total: number;
  readonly totalValue: number;
  readonly averageValue: number;
  readonly averageItemCount: number;
  readonly byStatus: Readonly<Record<string, number>>;
  readonly byType: Readonly<Record<string, number>>;
}

// ─── Main Interface ────────────────────────
export interface CartRepository extends BaseRepository<CartEntity, string> {
  // Find by ID VO
  findByIdVO(id: CartIdVO): Promise<CartEntity | null>;

  // Custom queries
  findByUserId(userId: string): Promise<readonly CartEntity[]>;
  findActiveByUserId(userId: string): Promise<CartEntity | null>;
  findBySessionId(sessionId: string): Promise<readonly CartEntity[]>;
  findActiveBySessionId(sessionId: string): Promise<CartEntity | null>;
  findByStatus(status: string): Promise<readonly CartEntity[]>;
  findByIdempotencyKey(key: IdempotencyKeyVO): Promise<CartEntity | null>;

  // Pagination
  findPaginated(options: CartListOptions): Promise<CartPaginationResult>;

  // Stats
  getStats(filter?: CartListFilter): Promise<CartStats>;

  // Cron-support queries
  findStale(inactiveMinutes: number): Promise<readonly CartEntity[]>;
  findExpired(beforeDate: Date): Promise<readonly CartEntity[]>;
  findAbandonable(thresholdHours: number): Promise<readonly CartEntity[]>;
  findRetryable(maxRetries?: number): Promise<readonly CartEntity[]>;

  // Count
  countByUserId(userId: string): Promise<number>;
  countByStatus(status: string): Promise<number>;
  countActiveByUserId(userId: string): Promise<number>;

  // Soft delete
  softDelete(id: string, deletedBy?: string): Promise<void>;
  restore(id: string): Promise<void>;

  // Bulk
  bulkUpdateStatus(ids: readonly string[], status: string): Promise<number>;
}
