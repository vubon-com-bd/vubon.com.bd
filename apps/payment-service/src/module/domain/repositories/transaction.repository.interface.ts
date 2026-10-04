/**
 * Transaction Repository Interface
 * @module payment-service/domain/repositories
 */
import type { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import { TransactionEntity } from '../entities/transaction.entity.js';
import { TransactionIdVO } from '../value-objects/primitives/transaction-id.vo.js';
import { PaymentIdVO } from '../value-objects/primitives/payment-id.vo.js';
import { OrderIdVO } from '../value-objects/primitives/order-id.vo.js';
import { UserIdVO } from '../value-objects/primitives/user-id.vo.js';
import { TransactionTypeVO } from '../value-objects/primitives/transaction-type.vo.js';
import { TransactionStatusVO } from '../value-objects/primitives/transaction-status.vo.js';

export const TRANSACTION_REPOSITORY = Symbol('TRANSACTION_REPOSITORY');

export interface TransactionListFilter {
  readonly paymentId?: string;
  readonly orderId?: string;
  readonly userId?: string;
  readonly type?: string;
  readonly status?: string;
  readonly gateway?: string;
  readonly fromDate?: string;
  readonly toDate?: string;
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

export interface TransactionRepository extends BaseRepository<TransactionEntity, string> {
  findByIdVO(id: TransactionIdVO): Promise<TransactionEntity | null>;
  findByPaymentId(paymentId: PaymentIdVO): Promise<readonly TransactionEntity[]>;
  findByOrderId(orderId: OrderIdVO): Promise<readonly TransactionEntity[]>;
  findByUserId(userId: UserIdVO): Promise<readonly TransactionEntity[]>;
  findByType(type: TransactionTypeVO): Promise<readonly TransactionEntity[]>;
  findByStatus(status: TransactionStatusVO): Promise<readonly TransactionEntity[]>;
  findByIdempotencyKey(idempotencyKey: string): Promise<TransactionEntity | null>;
  findPaginated(options: TransactionListOptions): Promise<TransactionPaginationResult>;
  sumByPaymentIdAndType(paymentId: PaymentIdVO, type: TransactionTypeVO): Promise<number>;
  countByPaymentId(paymentId: PaymentIdVO): Promise<number>;
}
