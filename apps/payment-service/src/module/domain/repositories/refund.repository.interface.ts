/**
 * Refund Repository Interface
 * @module payment-service/domain/repositories
 */
import type { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import type { RefundEntity } from '@domain/entities/refund.entity';
import type { RefundIdVO } from '@domain/primitives/refund-id.vo';

export const REFUND_REPOSITORY = Symbol('REFUND_REPOSITORY');

export interface RefundListFilter {
  readonly paymentId?: string;
  readonly status?: string;
  readonly reason?: string;
  readonly currency?: string;
  readonly fromDate?: string;
  readonly toDate?: string;
  readonly minAmount?: number;
  readonly maxAmount?: number;
}

export interface RefundListOptions {
  readonly page: number;
  readonly limit: number;
  readonly sortBy?: 'createdAt' | 'amount' | 'status';
  readonly sortDir?: 'asc' | 'desc';
  readonly filter?: RefundListFilter;
}

export interface RefundPaginationResult {
  readonly items: readonly RefundEntity[];
  readonly total: number;
  readonly page: number;
  readonly limit: number;
  readonly totalPages: number;
}

export interface RefundStats {
  readonly total: number;
  readonly totalRefunded: number;
  readonly currency: string;
  readonly byStatus: Readonly<Record<string, number>>;
  readonly byReason: Readonly<Record<string, number>>;
}

export interface RefundRepository extends BaseRepository<RefundEntity, string> {
  findByIdVO(id: RefundIdVO): Promise<RefundEntity | null>;
  findByPayment(paymentId: string): Promise<readonly RefundEntity[]>;
  findByStatus(status: string): Promise<readonly RefundEntity[]>;
  findPaginated(options: RefundListOptions): Promise<RefundPaginationResult>;
  getStats(paymentId?: string): Promise<RefundStats>;

  // Cron-support
  findPending(olderThanMinutes: number): Promise<readonly RefundEntity[]>;
  findRetryable(): Promise<readonly RefundEntity[]>;
  findExpired(olderThanDays: number): Promise<readonly RefundEntity[]>;

  softDelete(id: string, deletedBy?: string): Promise<void>;
}
