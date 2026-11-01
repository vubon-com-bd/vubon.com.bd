/**
 * Refund Domain Events
 * @module payment-service/domain/events
 */
import { BaseDomainEvent } from '@vubon/shared-kernel/domain/base/base.event';
import type { DomainEventMetadata } from '@vubon/shared-kernel/domain/base/base.event';
import type { Timestamp } from '@vubon/shared-types/common';
import { PAYMENT_AGGREGATE_TYPE, newEventId, now } from './event.helpers.js';

export const REFUND_EVENT_TYPE = {
  REQUESTED: 'payment.refund.requested',
  APPROVED: 'payment.refund.approved',
  REJECTED: 'payment.refund.rejected',
  COMPLETED: 'payment.refund.completed',
  FAILED: 'payment.refund.failed',
  STATUS_CHANGED: 'payment.refund.status_changed',
} as const;

export interface RefundRequestedPayload {
  readonly refundId: string;
  readonly paymentId: string;
  readonly amount: number;
  readonly currency: string;
  readonly reason: string;
  readonly requestedAt: string;
}

export interface RefundStatusChangedPayload {
  readonly refundId: string;
  readonly paymentId: string;
  readonly fromStatus: string;
  readonly toStatus: string;
  readonly reason?: string;
}

export interface RefundCompletedPayload {
  readonly refundId: string;
  readonly paymentId: string;
  readonly refundedAmount: number;
  readonly currency: string;
  readonly completedAt: string;
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
    aggregateType: PAYMENT_AGGREGATE_TYPE.REFUND,
    payload: p.payload,
    occurredAt: p.occurredAt ?? now(),
    version: p.version ?? 1,
    metadata: p.metadata,
  };
}

export class RefundRequestedEvent extends BaseDomainEvent<
  typeof REFUND_EVENT_TYPE.REQUESTED,
  RefundRequestedPayload
> {
  constructor(p: EventParams<RefundRequestedPayload>) {
    super(buildParams(REFUND_EVENT_TYPE.REQUESTED, p));
  }
}

export class RefundApprovedEvent extends BaseDomainEvent<
  typeof REFUND_EVENT_TYPE.APPROVED,
  RefundStatusChangedPayload
> {
  constructor(p: EventParams<RefundStatusChangedPayload>) {
    super(buildParams(REFUND_EVENT_TYPE.APPROVED, p));
  }
}

export class RefundRejectedEvent extends BaseDomainEvent<
  typeof REFUND_EVENT_TYPE.REJECTED,
  RefundStatusChangedPayload
> {
  constructor(p: EventParams<RefundStatusChangedPayload>) {
    super(buildParams(REFUND_EVENT_TYPE.REJECTED, p));
  }
}

export class RefundCompletedEvent extends BaseDomainEvent<
  typeof REFUND_EVENT_TYPE.COMPLETED,
  RefundCompletedPayload
> {
  constructor(p: EventParams<RefundCompletedPayload>) {
    super(buildParams(REFUND_EVENT_TYPE.COMPLETED, p));
  }
}

export class RefundFailedEvent extends BaseDomainEvent<
  typeof REFUND_EVENT_TYPE.FAILED,
  RefundStatusChangedPayload
> {
  constructor(p: EventParams<RefundStatusChangedPayload>) {
    super(buildParams(REFUND_EVENT_TYPE.FAILED, p));
  }
}

export class RefundStatusChangedEvent extends BaseDomainEvent<
  typeof REFUND_EVENT_TYPE.STATUS_CHANGED,
  RefundStatusChangedPayload
> {
  constructor(p: EventParams<RefundStatusChangedPayload>) {
    super(buildParams(REFUND_EVENT_TYPE.STATUS_CHANGED, p));
  }
}
