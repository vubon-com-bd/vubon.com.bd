/**
 * SplitPayment Repository Interface
 * @module payment-service/domain/repositories
 */
import type { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import type { SplitPaymentEntity } from '@domain/entities/split-payment.entity';
import type { SplitIdVO } from '@domain/primitives/split-id.vo';

export const SPLIT_PAYMENT_REPOSITORY = Symbol('SPLIT_PAYMENT_REPOSITORY');

export interface SplitPaymentListFilter {
  readonly paymentId?: string;
  readonly type?: string;
  readonly receiverId?: string;
  readonly currency?: string;
  readonly fromDate?: string;
  readonly toDate?: string;
}

export interface SplitPaymentListOptions {
  readonly page: number;
  readonly limit: number;
  readonly sortBy?: 'createdAt' | 'totalAmount';
  readonly sortDir?: 'asc' | 'desc';
  readonly filter?: SplitPaymentListFilter;
}

export interface SplitPaymentPaginationResult {
  readonly items: readonly SplitPaymentEntity[];
  readonly total: number;
  readonly page: number;
  readonly limit: number;
  readonly totalPages: number;
}

export interface SplitPaymentRepository
  extends BaseRepository<SplitPaymentEntity, string> {
  findByIdVO(id: SplitIdVO): Promise<SplitPaymentEntity | null>;
  findByPayment(paymentId: string): Promise<readonly SplitPaymentEntity[]>;
  findPending(): Promise<readonly SplitPaymentEntity[]>;
  findFailed(): Promise<readonly SplitPaymentEntity[]>;
  findPaginated(
    options: SplitPaymentListOptions,
  ): Promise<SplitPaymentPaginationResult>;
  softDelete(id: string, deletedBy?: string): Promise<void>;
}
