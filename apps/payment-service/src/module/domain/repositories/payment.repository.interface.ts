/**
 * Payment Repository Interface
 * @module payment-service/domain/repositories
 */
import type { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import type { PaymentEntity } from '@domain/entities/payment.entity';
import type { PaymentIdVO } from '@domain/primitives/payment-id.vo';

export const PAYMENT_REPOSITORY = Symbol('PAYMENT_REPOSITORY');

export interface PaymentListFilter {
  readonly orderId?: string;
  readonly userId?: string;
  readonly status?: string;
  readonly method?: string;
  readonly provider?: string;
  readonly currency?: string;
  readonly fromDate?: string;
  readonly toDate?: string;
  readonly minAmount?: number;
  readonly maxAmount?: number;
  readonly search?: string;
}

export interface PaymentListOptions {
  readonly page: number;
  readonly limit: number;
  readonly sortBy?: 'createdAt' | 'updatedAt' | 'amount' | 'status';
  readonly sortDir?: 'asc' | 'desc';
  readonly filter?: PaymentListFilter;
}

export interface PaymentPaginationResult {
  readonly items: readonly PaymentEntity[];
  readonly total: number;
  readonly page: number;
  readonly limit: number;
  readonly totalPages: number;
}

export interface PaymentStats {
  readonly total: number;
  readonly totalAmount: number;
  readonly currency: string;
  readonly byStatus: Readonly<Record<string, number>>;
  readonly byMethod: Readonly<Record<string, number>>;
}

export interface PaymentRepository extends BaseRepository<PaymentEntity, string> {
  findByIdVO(id: PaymentIdVO): Promise<PaymentEntity | null>;
  findByOrder(orderId: string): Promise<readonly PaymentEntity[]>;
  findByUser(userId: string): Promise<readonly PaymentEntity[]>;
  findByStatus(status: string): Promise<readonly PaymentEntity[]>;
  findByGatewayReference(reference: string): Promise<PaymentEntity | null>;
  findPaginated(options: PaymentListOptions): Promise<PaymentPaginationResult>;
  getStats(
    userId?: string,
    fromDate?: string,
    toDate?: string,
  ): Promise<PaymentStats>;

  // Cron-support
  findStalePending(olderThanMinutes: number): Promise<readonly PaymentEntity[]>;
  findExpiredAuthorizations(olderThanHours: number): Promise<readonly PaymentEntity[]>;
  findRetryable(): Promise<readonly PaymentEntity[]>;

  softDelete(id: string, deletedBy?: string): Promise<void>;
}
