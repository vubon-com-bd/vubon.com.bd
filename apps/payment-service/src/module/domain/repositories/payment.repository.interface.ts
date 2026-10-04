/**
 * Payment Repository Interface
 * @module payment-service/domain/repositories
 */
import type { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import { PaymentEntity } from '../entities/payment.entity.js';
import { PaymentIdVO } from '../value-objects/primitives/payment-id.vo.js';
import { OrderIdVO } from '../value-objects/primitives/order-id.vo.js';
import { UserIdVO } from '../value-objects/primitives/user-id.vo.js';
import { PaymentStatusVO } from '../value-objects/primitives/payment-status.vo.js';
import { PaymentGatewayVO } from '../value-objects/primitives/payment-gateway.vo.js';
import { PaymentMethodVO } from '../value-objects/primitives/payment-method.vo.js';
import { IdempotencyKeyVO } from '../value-objects/primitives/idempotency-key.vo.js';

export const PAYMENT_REPOSITORY = Symbol('PAYMENT_REPOSITORY');

export interface PaymentListFilter {
  readonly orderId?: string;
  readonly userId?: string;
  readonly status?: string;
  readonly method?: string;
  readonly gateway?: string;
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
  readonly totalPayments: number;
  readonly totalCaptured: number;
  readonly totalRefunded: number;
  readonly averageAmount: number;
  readonly currency: string;
  readonly byStatus: Readonly<Record<string, number>>;
  readonly byGateway: Readonly<Record<string, number>>;
}

export interface PaymentRepository extends BaseRepository<PaymentEntity, string> {
  findByIdVO(id: PaymentIdVO): Promise<PaymentEntity | null>;
  findByOrderId(orderId: OrderIdVO): Promise<readonly PaymentEntity[]>;
  findByUserId(userId: UserIdVO): Promise<readonly PaymentEntity[]>;
  findByStatus(status: PaymentStatusVO): Promise<readonly PaymentEntity[]>;
  findByGateway(gateway: PaymentGatewayVO): Promise<readonly PaymentEntity[]>;
  findByIdempotencyKey(key: IdempotencyKeyVO): Promise<PaymentEntity | null>;
  findLatestByOrderId(orderId: OrderIdVO): Promise<PaymentEntity | null>;
  findPaginated(options: PaymentListOptions): Promise<PaymentPaginationResult>;
  existsByIdempotencyKey(key: IdempotencyKeyVO): Promise<boolean>;
  countByUser(userId: UserIdVO): Promise<number>;
  getStats(
    userId?: string,
    gateway?: string,
    fromDate?: string,
    toDate?: string,
  ): Promise<PaymentStats>;
  /** Payments stuck in authorized state past the capture window. */
  findExpiredAuthorizations(olderThanHours: number): Promise<readonly PaymentEntity[]>;
  /** Payments left in pending/processing older than N minutes (stale). */
  findStalePending(olderThanMinutes: number): Promise<readonly PaymentEntity[]>;
  /** Payments that can be retried (failed/declined within retry limit). */
  findRetryable(): Promise<readonly PaymentEntity[]>;
  softDelete(id: string, deletedBy?: string): Promise<void>;
}
