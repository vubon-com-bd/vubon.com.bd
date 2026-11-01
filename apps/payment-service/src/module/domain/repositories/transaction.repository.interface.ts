/**
 * Transaction Repository Interface
 * @module payment-service/domain/repositories
 */
import type { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import type { TransactionEntity } from '@domain/entities/transaction.entity';
import type { TransactionIdVO } from '@domain/primitives/transaction-id.vo';

export const TRANSACTION_REPOSITORY = Symbol('TRANSACTION_REPOSITORY');

export interface TransactionListFilter {
  readonly paymentId?: string;
  readonly type?: string;
  readonly status?: string;
  readonly currency?: string;
  readonly fromDate?: string;
  readonly toDate?: string;
  readonly minAmount?: number;
  readonly maxAmount?: number;
}

export interface TransactionListOptions {
  readonly page: number;
  readonly limit: number;
  readonly sortBy?: 'createdAt' | 'amount' | 'status';
  readonly sortDir?: 'asc' | 'desc';
  readonly filter?: TransactionListFilter;
}

export interface TransactionPaginationResult {
  readonly items: readonly TransactionEntity[];
  readonly total: number;
  readonly page: number;
  readonly limit: number;
  readonly totalPages: number;
}

export interface TransactionStats {
  readonly total: number;
  readonly totalAmount: number;
  readonly currency: string;
  readonly byType: Readonly<Record<string, number>>;
  readonly byStatus: Readonly<Record<string, number>>;
}

export interface TransactionRepository
  extends BaseRepository<TransactionEntity, string> {
  findByIdVO(id: TransactionIdVO): Promise<TransactionEntity | null>;
  findByPayment(paymentId: string): Promise<readonly TransactionEntity[]>;
  findByGatewayReference(reference: string): Promise<TransactionEntity | null>;
  findByStatus(status: string): Promise<readonly TransactionEntity[]>;
  findPaginated(
    options: TransactionListOptions,
  ): Promise<TransactionPaginationResult>;
  getStats(paymentId?: string): Promise<TransactionStats>;

  // Cron-support
  findPendingStale(olderThanMinutes: number): Promise<readonly TransactionEntity[]>;
  findSettleable(): Promise<readonly TransactionEntity[]>;

  softDelete(id: string, deletedBy?: string): Promise<void>;
}
