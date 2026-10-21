/**
 * Payment Domain Events
 * @module payment-service/domain/events
 */
import { BaseDomainEvent } from '@vubon/shared-kernel/domain/base/base.event';
import type { DomainEventMetadata } from '@vubon/shared-kernel/domain/base/base.event';
import type { Timestamp } from '@vubon/shared-types/common';
import { PAYMENT_AGGREGATE_TYPE, newEventId, now } from './event.helpers.js';

// ─── Event Types ───────────────────────────
export const PAYMENT_EVENT_TYPE = {
  CREATED: 'payment.payment.created',
  STATUS_CHANGED: 'payment.payment.status_changed',
  AUTHORIZED: 'payment.payment.authorized',
  CAPTURED: 'payment.payment.captured',
  PAID: 'payment.payment.paid',
  FAILED: 'payment.payment.failed',
  CANCELLED: 'payment.payment.cancelled',
  REFUNDED: 'payment.payment.refunded',
} as const;

// ─── Payload Interfaces ────────────────────
export interface PaymentCreatedPayload {
  readonly paymentId: string;
  readonly orderId: string;
  readonly userId: string;
  readonly amount: number;
  readonly currency: string;
  readonly method: string;
  readonly createdAt: string;
}

export interface PaymentStatusChangedPayload {
  readonly paymentId: string;
  readonly fromStatus: string;
  readonly toStatus: string;
  readonly changedBy?: string;
  readonly reason?: string;
}

export interface PaymentCapturedPayload {
  readonly paymentId: string;
  readonly capturedAmount: number;
  readonly currency: string;
  readonly gatewayReference?: string;
  readonly capturedAt: string;
}

export interface PaymentFailedPayload {
  readonly paymentId: string;
  readonly reason: string;
  readonly failureCode?: string;
  readonly failedAt: string;
}

export interface PaymentRefundedPayload {
  readonly paymentId: string;
  readonly refundId: string;
  readonly refundedAmount: number;
  readonly currency: string;
  readonly refundedAt: string;
}

// ─── Params type ───────────────────────────
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
    aggregateType: PAYMENT_AGGREGATE_TYPE.PAYMENT,
    payload: p.payload,
    occurredAt: p.occurredAt ?? now(),
    version: p.version ?? 1,
    metadata: p.metadata,
  };
}

// ─── Concrete Events ───────────────────────
export class PaymentCreatedEvent extends BaseDomainEvent<
  typeof PAYMENT_EVENT_TYPE.CREATED,
  PaymentCreatedPayload
> {
  constructor(p: EventParams<PaymentCreatedPayload>) {
    super(buildParams(PAYMENT_EVENT_TYPE.CREATED, p));
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

export class PaymentAuthorizedEvent extends BaseDomainEvent<
  typeof PAYMENT_EVENT_TYPE.AUTHORIZED,
  PaymentStatusChangedPayload
> {
  constructor(p: EventParams<PaymentStatusChangedPayload>) {
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
  PaymentStatusChangedPayload
> {
  constructor(p: EventParams<PaymentStatusChangedPayload>) {
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

export class PaymentCancelledEvent extends BaseDomainEvent<
  typeof PAYMENT_EVENT_TYPE.CANCELLED,
  PaymentStatusChangedPayload
> {
  constructor(p: EventParams<PaymentStatusChangedPayload>) {
    super(buildParams(PAYMENT_EVENT_TYPE.CANCELLED, p));
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
