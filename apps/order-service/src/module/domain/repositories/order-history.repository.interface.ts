/**
 * Order History Repository Interface
 * @module order-service/domain/repositories
 *
 * Append-only audit log — no update methods.
 */
import type { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import type { OrderHistoryEntity } from '../entities/order-history.entity.js';
import type { HistoryIdVO } from '../value-objects/primitives/history-id.vo.js';

// ─── DI Token ──────────────────────────────
export const ORDER_HISTORY_REPOSITORY = Symbol('ORDER_HISTORY_REPOSITORY');

// ─── Filter ────────────────────────────────
export interface OrderHistoryListFilter {
  readonly orderId?: string;
  readonly type?: string;
  readonly performedBy?: string;
  readonly fromDate?: string;
  readonly toDate?: string;
}

// ─── Pagination ────────────────────────────
export interface OrderHistoryPaginationResult {
  readonly items: readonly OrderHistoryEntity[];
  readonly total: number;
  readonly page: number;
  readonly limit: number;
  readonly totalPages: number;
}

// ─── Main Interface ────────────────────────
export interface OrderHistoryRepository extends BaseRepository<OrderHistoryEntity, string> {
  findByIdVO(id: HistoryIdVO): Promise<OrderHistoryEntity | null>;
  findByOrder(orderId: string): Promise<readonly OrderHistoryEntity[]>;
  findByOrderAndType(orderId: string, type: string): Promise<readonly OrderHistoryEntity[]>;
  findRecentByOrder(
    orderId: string,
    limit: number,
  ): Promise<readonly OrderHistoryEntity[]>;
  countByOrder(orderId: string): Promise<number>;
  // ⚠️ No update methods — append-only
}
