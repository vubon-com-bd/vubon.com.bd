/**
 * Order Return Repository Interface
 * @module order-service/domain/repositories
 */
import type { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import type { OrderReturnEntity } from '../entities/order-return.entity.js';
import type { ReturnIdVO } from '../value-objects/primitives/return-id.vo.js';

// ─── DI Token ──────────────────────────────
export const ORDER_RETURN_REPOSITORY = Symbol('ORDER_RETURN_REPOSITORY');

// ─── Filter ────────────────────────────────
export interface OrderReturnListFilter {
  readonly orderId?: string;
  readonly customerId?: string;
  readonly status?: string;
  readonly reason?: string;
  readonly fromDate?: string;
  readonly toDate?: string;
}

// ─── Main Interface ────────────────────────
export interface OrderReturnRepository extends BaseRepository<OrderReturnEntity, string> {
  findByIdVO(id: ReturnIdVO): Promise<OrderReturnEntity | null>;
  findByOrder(orderId: string): Promise<readonly OrderReturnEntity[]>;
  findByCustomer(customerId: string): Promise<readonly OrderReturnEntity[]>;
  findByStatus(status: string): Promise<readonly OrderReturnEntity[]>;
  findPickupScheduledBefore(cutoffAt: string): Promise<readonly OrderReturnEntity[]>;
  findAwaitingInspection(): Promise<readonly OrderReturnEntity[]>;
  softDelete(id: string, deletedBy?: string): Promise<void>;
}
