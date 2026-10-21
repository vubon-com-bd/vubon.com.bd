/**
 * RecurringPayment Repository Interface
 * @module payment-service/domain/repositories
 */
import type { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import type { RecurringPaymentEntity } from '@domain/entities/recurring-payment.entity';
import type { RecurringIdVO } from '@domain/primitives/recurring-id.vo';

export const RECURRING_PAYMENT_REPOSITORY = Symbol('RECURRING_PAYMENT_REPOSITORY');

export interface RecurringPaymentListFilter {
  readonly paymentId?: string;
  readonly status?: string;
  readonly interval?: string;
  readonly currency?: string;
  readonly fromDate?: string;
  readonly toDate?: string;
}

export interface RecurringPaymentListOptions {
  readonly page: number;
  readonly limit: number;
  readonly sortBy?: 'createdAt' | 'nextRunAt' | 'amount';
  readonly sortDir?: 'asc' | 'desc';
  readonly filter?: RecurringPaymentListFilter;
}

export interface RecurringPaymentPaginationResult {
  readonly items: readonly RecurringPaymentEntity[];
  readonly total: number;
  readonly page: number;
  readonly limit: number;
  readonly totalPages: number;
}

export interface RecurringPaymentRepository
  extends BaseRepository<RecurringPaymentEntity, string> {
  findByIdVO(id: RecurringIdVO): Promise<RecurringPaymentEntity | null>;
  findByPayment(paymentId: string): Promise<readonly RecurringPaymentEntity[]>;
  findActive(): Promise<readonly RecurringPaymentEntity[]>;
  findByStatus(status: string): Promise<readonly RecurringPaymentEntity[]>;
  findPaginated(
    options: RecurringPaymentListOptions,
  ): Promise<RecurringPaymentPaginationResult>;

  // Cron-support
  findDue(reference: Date): Promise<readonly RecurringPaymentEntity[]>;
  findStale(olderThanMinutes: number): Promise<readonly RecurringPaymentEntity[]>;

  softDelete(id: string, deletedBy?: string): Promise<void>;
}
