/**
 * Order Cancel Repository Interface
 * @module order-service/domain/repositories
 */
import type { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import type { OrderCancelEntity } from '../entities/order-cancel.entity.js';
import type { CancelIdVO } from '../value-objects/primitives/cancel-id.vo.js';

// ─── DI Token ──────────────────────────────
export const ORDER_CANCEL_REPOSITORY = Symbol('ORDER_CANCEL_REPOSITORY');

// ─── Filter ────────────────────────────────
export interface OrderCancelListFilter {
  readonly orderId?: string;
  readonly status?: string;
  readonly reason?: string;
  readonly fromDate?: string;
  readonly toDate?: string;
}

// ─── Main Interface ────────────────────────
export interface OrderCancelRepository extends BaseRepository<OrderCancelEntity, string> {
  findByIdVO(id: CancelIdVO): Promise<OrderCancelEntity | null>;
  findByOrder(orderId: string): Promise<readonly OrderCancelEntity[]>;
  findByStatus(status: string): Promise<readonly OrderCancelEntity[]>;
  findPendingOlderThan(minutes: number): Promise<readonly OrderCancelEntity[]>;
  softDelete(id: string, deletedBy?: string): Promise<void>;
}
