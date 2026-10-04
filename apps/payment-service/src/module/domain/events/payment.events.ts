/**
 * Payment domain events
 * @module payment-service/domain/events
 */
import { BaseDomainEvent } from '@vubon/shared-kernel/domain/base/base.event';
import type { DomainEventMetadata } from '@vubon/shared-kernel/domain/base/base.event';
import type { Timestamp } from '@vubon/shared-types/common';
import { PAYMENT_AGGREGATE_TYPE, newEventId, now } from './event.helpers.js';

export const PAYMENT_EVENT_TYPE = {
  INITIATED: 'payment.initiated',
  PROCESSING: 'payment.processing',
  AUTHORIZED: 'payment.authorized',
  CAPTURED: 'payment.captured',
  PAID: 'payment.paid',
  FAILED: 'payment.failed',
  DECLINED: 'payment.declined',
  CANCELLED: 'payment.cancelled',
  EXPIRED: 'payment.expired',
  REFUNDED: 'payment.refunded',
  PARTIALLY_REFUNDED: 'payment.partially_refunded',
  CHARGEBACK: 'payment.chargeback',
  STATUS_CHANGED: 'payment.status_changed',
  RETRY_ATTEMPTED: 'payment.retry_attempted',
} as const;

export interface PaymentInitiatedPayload {
  readonly paymentId: string;
  readonly orderId: string;
  readonly userId: string;
  readonly amount: number;
  readonly currency: string;
  readonly method: string;
  readonly gateway?: string;
  readonly type: string;
  readonly idempotencyKey?: string;
}

export interface PaymentProcessingPayload {
  readonly paymentId: string;
  readonly gatewayPaymentId?: string;
  readonly startedAt: string;
}

export interface PaymentAuthorizedPayload {
  readonly paymentId: string;
  readonly gatewayPaymentId?: string;
  readonly authorizedAt: string;
  readonly amount: number;
  readonly currency: string;
}

export interface PaymentCapturedPayload {
  readonly paymentId: string;
  readonly gatewayPaymentId?: string;
  readonly capturedAt: string;
  readonly amount: number;
  readonly currency: string;
}

export interface PaymentPaidPayload {
  readonly paymentId: string;
  readonly orderId: string;
  readonly paidAt: string;
  readonly amount: number;
  readonly currency: string;
}

export interface PaymentFailedPayload {
  readonly paymentId: string;
  readonly failedAt: string;
  readonly reason: string;
  readonly code?: string;
}

export interface PaymentDeclinedPayload {
  readonly paymentId: string;
  readonly declinedAt: string;
  readonly reason: string;
  readonly code?: string;
}

export interface PaymentCancelledPayload {
  readonly paymentId: string;
  readonly cancelledAt: string;
  readonly reason?: string;
  readonly cancelledBy?: string;
}

export interface PaymentExpiredPayload {
  readonly paymentId: string;
  readonly expiredAt: string;
}

export interface PaymentRefundedPayload {
  readonly paymentId: string;
  readonly refundId?: string;
  readonly refundedAt: string;
  readonly amount: number;
  readonly currency: string;
  readonly fullyRefunded: boolean;
}

export interface PaymentChargebackPayload {
  readonly paymentId: string;
  readonly chargebackAt: string;
  readonly amount: number;
  readonly currency: string;
  readonly reason?: string;
}

export interface PaymentStatusChangedPayload {
  readonly paymentId: string;
  readonly fromStatus: string;
  readonly toStatus: string;
  readonly changedBy?: string;
}

export interface PaymentRetryAttemptedPayload {
  readonly paymentId: string;
  readonly attempt: number;
  readonly attemptedAt: string;
}

type EventParams<TPayload> = {
  id?: string;
  aggregateId: string;
  payload: TPayload;
  occurredAt?: Timestamp;
  version?: number;
  metadata?: DomainEventMetadata;
};

function buildParams<TType extends string, TPayload>(
  type: TType,
  p: EventParams<TPayload>,
) {
  return {
    id: p.id ?? newEventId(),
    type,
    aggregateId: p.aggregateId,
    aggregateType: PAYMENT_AGGREGATE_TYPE,
    payload: p.payload,
    occurredAt: p.occurredAt ?? now(),
    version: p.version ?? 1,
    metadata: p.metadata,
  };
}

export class PaymentInitiatedEvent extends BaseDomainEvent<
  typeof PAYMENT_EVENT_TYPE.INITIATED,
  PaymentInitiatedPayload
> {
  constructor(p: EventParams<PaymentInitiatedPayload>) {
    super(buildParams(PAYMENT_EVENT_TYPE.INITIATED, p));
  }
}

export class PaymentProcessingEvent extends BaseDomainEvent<
  typeof PAYMENT_EVENT_TYPE.PROCESSING,
  PaymentProcessingPayload
> {
  constructor(p: EventParams<PaymentProcessingPayload>) {
    super(buildParams(PAYMENT_EVENT_TYPE.PROCESSING, p));
  }
}

export class PaymentAuthorizedEvent extends BaseDomainEvent<
  typeof PAYMENT_EVENT_TYPE.AUTHORIZED,
  PaymentAuthorizedPayload
> {
  constructor(p: EventParams<PaymentAuthorizedPayload>) {
    super(buildParams(PAYMENT_EVENT_TYPE.AUTHORIZED, p));
  }
}

export class PaymentCapturedEvent extends BaseDomainEvent<
  typeof PAYMENT_EVENT_TYPE.CAPTURED,
  PaymentCapturedPayload
> {
  constructor(p: EventParams<PaymentCapturedPayload>) {
    super(buildParams(PAYMENT_EVENT_TYPE.CAPTURED, p));
  }
}

export class PaymentPaidEvent extends BaseDomainEvent<
  typeof PAYMENT_EVENT_TYPE.PAID,
  PaymentPaidPayload
> {
  constructor(p: EventParams<PaymentPaidPayload>) {
    super(buildParams(PAYMENT_EVENT_TYPE.PAID, p));
  }
}

export class PaymentFailedEvent extends BaseDomainEvent<
  typeof PAYMENT_EVENT_TYPE.FAILED,
  PaymentFailedPayload
> {
  constructor(p: EventParams<PaymentFailedPayload>) {
    super(buildParams(PAYMENT_EVENT_TYPE.FAILED, p));
  }
}

export class PaymentDeclinedEvent extends BaseDomainEvent<
  typeof PAYMENT_EVENT_TYPE.DECLINED,
  PaymentDeclinedPayload
> {
  constructor(p: EventParams<PaymentDeclinedPayload>) {
    super(buildParams(PAYMENT_EVENT_TYPE.DECLINED, p));
  }
}

export class PaymentCancelledEvent extends BaseDomainEvent<
  typeof PAYMENT_EVENT_TYPE.CANCELLED,
  PaymentCancelledPayload
> {
  constructor(p: EventParams<PaymentCancelledPayload>) {
    super(buildParams(PAYMENT_EVENT_TYPE.CANCELLED, p));
  }
}

export class PaymentExpiredEvent extends BaseDomainEvent<
  typeof PAYMENT_EVENT_TYPE.EXPIRED,
  PaymentExpiredPayload
> {
  constructor(p: EventParams<PaymentExpiredPayload>) {
    super(buildParams(PAYMENT_EVENT_TYPE.EXPIRED, p));
  }
}

export class PaymentRefundedEvent extends BaseDomainEvent<
  typeof PAYMENT_EVENT_TYPE.REFUNDED,
  PaymentRefundedPayload
> {
  constructor(p: EventParams<PaymentRefundedPayload>) {
    super(buildParams(PAYMENT_EVENT_TYPE.REFUNDED, p));
  }
}

export class PaymentChargebackEvent extends BaseDomainEvent<
  typeof PAYMENT_EVENT_TYPE.CHARGEBACK,
  PaymentChargebackPayload
> {
  constructor(p: EventParams<PaymentChargebackPayload>) {
    super(buildParams(PAYMENT_EVENT_TYPE.CHARGEBACK, p));
  }
}

export class PaymentStatusChangedEvent extends BaseDomainEvent<
  typeof PAYMENT_EVENT_TYPE.STATUS_CHANGED,
  PaymentStatusChangedPayload
> {
  constructor(p: EventParams<PaymentStatusChangedPayload>) {
    super(buildParams(PAYMENT_EVENT_TYPE.STATUS_CHANGED, p));
  }
}

export class PaymentRetryAttemptedEvent extends BaseDomainEvent<
  typeof PAYMENT_EVENT_TYPE.RETRY_ATTEMPTED,
  PaymentRetryAttemptedPayload
> {
  constructor(p: EventParams<PaymentRetryAttemptedPayload>) {
    super(buildParams(PAYMENT_EVENT_TYPE.RETRY_ATTEMPTED, p));
  }
}
