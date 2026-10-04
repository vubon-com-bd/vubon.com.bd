/**
 * Refund domain events
 * @module payment-service/domain/events
 */
import { BaseDomainEvent } from '@vubon/shared-kernel/domain/base/base.event';
import type { DomainEventMetadata } from '@vubon/shared-kernel/domain/base/base.event';
import type { Timestamp } from '@vubon/shared-types/common';
import { REFUND_AGGREGATE_TYPE, newEventId, now } from './event.helpers.js';

export const REFUND_EVENT_TYPE = {
  REQUESTED: 'refund.requested',
  APPROVED: 'refund.approved',
  PROCESSING: 'refund.processing',
  SUCCEEDED: 'refund.succeeded',
  FAILED: 'refund.failed',
  CANCELLED: 'refund.cancelled',
} as const;

export interface RefundRequestedPayload {
  readonly refundId: string;
  readonly paymentId: string;
  readonly orderId?: string;
  readonly amount: number;
  readonly currency: string;
  readonly reason?: string;
  readonly requestedBy?: string;
}

export interface RefundApprovedPayload {
  readonly refundId: string;
  readonly paymentId: string;
  readonly approvedAt: string;
  readonly approvedBy?: string;
}

export interface RefundProcessingPayload {
  readonly refundId: string;
  readonly paymentId: string;
  readonly gatewayRefundId?: string;
}

export interface RefundSucceededPayload {
  readonly refundId: string;
  readonly paymentId: string;
  readonly processedAt: string;
  readonly amount: number;
  readonly currency: string;
  readonly gatewayRefundId?: string;
}

export interface RefundFailedPayload {
  readonly refundId: string;
  readonly paymentId: string;
  readonly failedAt: string;
  readonly reason: string;
  readonly code?: string;
}

export interface RefundCancelledPayload {
  readonly refundId: string;
  readonly paymentId: string;
  readonly cancelledAt: string;
  readonly reason?: string;
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
    aggregateType: REFUND_AGGREGATE_TYPE,
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
  RefundApprovedPayload
> {
  constructor(p: EventParams<RefundApprovedPayload>) {
    super(buildParams(REFUND_EVENT_TYPE.APPROVED, p));
  }
}

export class RefundProcessingEvent extends BaseDomainEvent<
  typeof REFUND_EVENT_TYPE.PROCESSING,
  RefundProcessingPayload
> {
  constructor(p: EventParams<RefundProcessingPayload>) {
    super(buildParams(REFUND_EVENT_TYPE.PROCESSING, p));
  }
}

export class RefundSucceededEvent extends BaseDomainEvent<
  typeof REFUND_EVENT_TYPE.SUCCEEDED,
  RefundSucceededPayload
> {
  constructor(p: EventParams<RefundSucceededPayload>) {
    super(buildParams(REFUND_EVENT_TYPE.SUCCEEDED, p));
  }
}

export class RefundFailedEvent extends BaseDomainEvent<
  typeof REFUND_EVENT_TYPE.FAILED,
  RefundFailedPayload
> {
  constructor(p: EventParams<RefundFailedPayload>) {
    super(buildParams(REFUND_EVENT_TYPE.FAILED, p));
  }
}

export class RefundCancelledEvent extends BaseDomainEvent<
  typeof REFUND_EVENT_TYPE.CANCELLED,
  RefundCancelledPayload
> {
  constructor(p: EventParams<RefundCancelledPayload>) {
    super(buildParams(REFUND_EVENT_TYPE.CANCELLED, p));
  }
}
