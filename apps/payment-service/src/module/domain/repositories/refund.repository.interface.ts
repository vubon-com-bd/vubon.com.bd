/**
 * Refund Repository Interface
 * @module payment-service/domain/repositories
 */
import type { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import { RefundEntity } from '../entities/refund.entity.js';
import { RefundIdVO } from '../value-objects/primitives/refund-id.vo.js';
import { PaymentIdVO } from '../value-objects/primitives/payment-id.vo.js';
import { OrderIdVO } from '../value-objects/primitives/order-id.vo.js';
import { RefundStatusVO } from '../value-objects/primitives/refund-status.vo.js';

export const REFUND_REPOSITORY = Symbol('REFUND_REPOSITORY');

export interface RefundListFilter {
  readonly paymentId?: string;
  readonly orderId?: string;
  readonly status?: string;
  readonly fromDate?: string;
  readonly toDate?: string;
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

export interface RefundRepository extends BaseRepository<RefundEntity, string> {
  findByIdVO(id: RefundIdVO): Promise<RefundEntity | null>;
  findByPaymentId(paymentId: PaymentIdVO): Promise<readonly RefundEntity[]>;
  findByOrderId(orderId: OrderIdVO): Promise<readonly RefundEntity[]>;
  findByStatus(status: RefundStatusVO): Promise<readonly RefundEntity[]>;
  findPaginated(options: RefundListOptions): Promise<RefundPaginationResult>;
  sumSuccessfulByPaymentId(paymentId: PaymentIdVO): Promise<number>;
  countByPaymentId(paymentId: PaymentIdVO): Promise<number>;
  /** Pending refunds older than N minutes (for worker retry). */
  findStalePending(olderThanMinutes: number): Promise<readonly RefundEntity[]>;
}
