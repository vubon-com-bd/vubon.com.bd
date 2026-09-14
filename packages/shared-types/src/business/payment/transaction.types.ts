/**
 * Transaction Types
 * @module shared-types/business/payment
 *
 * Values আসে shared-constants/business/payment/transaction.constants থেকে।
 */

import type { TRANSACTION_TYPE, TRANSACTION_STATUS } from '@vubon/shared-constants/business';
import type { TransactionId, PaymentId, OrderId, Money, UserId } from '../../common/primitives';
import type { BaseEntity } from '../../common/base';
import type { PaymentGatewayValue } from './payment-gateway.types';

export type TransactionTypeValue = (typeof TRANSACTION_TYPE)[keyof typeof TRANSACTION_TYPE];

export type TransactionStatusValue = (typeof TRANSACTION_STATUS)[keyof typeof TRANSACTION_STATUS];

export interface Transaction extends BaseEntity<TransactionId> {
  readonly paymentId: PaymentId;
  readonly orderId?: OrderId;
  readonly userId?: UserId;
  readonly type: TransactionTypeValue;
  readonly status: TransactionStatusValue;
  readonly amount: Money;
  readonly currency: string;
  readonly gateway?: PaymentGatewayValue;
  readonly gatewayTransactionId?: string;
  readonly reference?: string;
  readonly idempotencyKey?: string;
  readonly errorCode?: string;
  readonly errorMessage?: string;
  readonly metadata?: Readonly<Record<string, unknown>>;
  readonly processedAt?: string;
}

export interface TransactionPublic {
  readonly id: TransactionId;
  readonly type: TransactionTypeValue;
  readonly status: TransactionStatusValue;
  readonly amount: Money;
  readonly currency: string;
  readonly reference?: string;
  readonly createdAt: string;
}

export interface TransactionSummary {
  readonly paymentId: PaymentId;
  readonly totalAmount: Money;
  readonly currency: string;
  readonly transactionCount: number;
  readonly lastTransactionAt: string;
}

export interface TransactionFilter {
  readonly paymentId?: PaymentId;
  readonly orderId?: OrderId;
  readonly userId?: UserId;
  readonly type?: TransactionTypeValue;
  readonly status?: TransactionStatusValue;
  readonly gateway?: PaymentGatewayValue;
  readonly fromDate?: string;
  readonly toDate?: string;
}
