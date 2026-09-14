/**
 * Payment Core Types
 * @module shared-types/business/payment
 *
 * Payment entity + aggregator।
 */

import type { PaymentId, OrderId, UserId, Money } from '../../common/primitives';
import type { BaseEntity } from '../../common/base';
import type { PaymentStatusValue } from './payment-status.types';
import type { PaymentMethodValue } from './payment-method.types';
import type { PaymentGatewayValue } from './payment-gateway.types';
import type { TransactionPublic } from './transaction.types';

export type PaymentTypeValue =
  'one_time' | 'recurring' | 'installment' | 'subscription' | 'prepaid' | 'postpaid';

export interface Payment extends BaseEntity<PaymentId> {
  readonly orderId: OrderId;
  readonly userId: UserId;
  readonly type: PaymentTypeValue;
  readonly status: PaymentStatusValue;
  readonly method: PaymentMethodValue;
  readonly gateway?: PaymentGatewayValue;
  readonly amount: Money;
  readonly currency: string;
  readonly gatewayPaymentId?: string;
  readonly gatewayOrderId?: string;
  readonly gatewaySignature?: string;
  readonly authorizedAt?: string;
  readonly capturedAt?: string;
  readonly refundedAmount?: Money;
  readonly transactions: readonly TransactionPublic[];
  readonly metadata?: Readonly<Record<string, unknown>>;
  readonly failureReason?: string;
  readonly failureCode?: string;
}

export interface PaymentPublic {
  readonly id: PaymentId;
  readonly orderId: OrderId;
  readonly status: PaymentStatusValue;
  readonly method: PaymentMethodValue;
  readonly gateway?: PaymentGatewayValue;
  readonly amount: Money;
  readonly currency: string;
  readonly refundedAmount?: Money;
  readonly createdAt: string;
  readonly capturedAt?: string;
}

export interface PaymentSummary {
  readonly id: PaymentId;
  readonly orderId: OrderId;
  readonly status: PaymentStatusValue;
  readonly amount: Money;
  readonly currency: string;
}

export interface PaymentInitiateInput {
  readonly orderId: OrderId;
  readonly userId: UserId;
  readonly method: PaymentMethodValue;
  readonly gateway?: PaymentGatewayValue;
  readonly amount: Money;
  readonly currency: string;
  readonly returnUrl?: string;
  readonly metadata?: Readonly<Record<string, unknown>>;
}

export interface PaymentInitiateResult {
  readonly success: boolean;
  readonly paymentId?: PaymentId;
  readonly redirectUrl?: string;
  readonly gatewayPaymentId?: string;
  readonly error?: string;
  readonly errorCode?: string;
}

export interface PaymentCaptureInput {
  readonly paymentId: PaymentId;
  readonly amount?: Money;
  readonly idempotencyKey?: string;
}

export interface PaymentCaptureResult {
  readonly success: boolean;
  readonly paymentId: PaymentId;
  readonly capturedAmount?: Money;
  readonly transactionId?: string;
  readonly error?: string;
}

export interface PaymentRefundInput {
  readonly paymentId: PaymentId;
  readonly amount?: Money;
  readonly reason?: string;
  readonly idempotencyKey?: string;
}

export interface PaymentRefundResult {
  readonly success: boolean;
  readonly refundId?: string;
  readonly refundedAmount?: Money;
  readonly error?: string;
}

export interface PaymentVerificationInput {
  readonly paymentId: PaymentId;
  readonly gatewaySignature?: string;
  readonly gatewayData?: Readonly<Record<string, unknown>>;
}

export interface PaymentVerificationResult {
  readonly verified: boolean;
  readonly paymentId: PaymentId;
  readonly status: PaymentStatusValue;
  readonly error?: string;
}

export interface PaymentFilter {
  readonly orderId?: OrderId;
  readonly userId?: UserId;
  readonly status?: PaymentStatusValue;
  readonly method?: PaymentMethodValue;
  readonly gateway?: PaymentGatewayValue;
  readonly fromDate?: string;
  readonly toDate?: string;
}
