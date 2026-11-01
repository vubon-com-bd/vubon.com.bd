/**
 * Recurring Payment Domain Events
 * @module payment-service/domain/events
 */
import { BaseDomainEvent } from '@vubon/shared-kernel/domain/base/base.event';
import type { DomainEventMetadata } from '@vubon/shared-kernel/domain/base/base.event';
import type { Timestamp } from '@vubon/shared-types/common';
import { PAYMENT_AGGREGATE_TYPE, newEventId, now } from './event.helpers.js';

export const RECURRING_EVENT_TYPE = {
  SCHEDULED: 'payment.recurring.scheduled',
  ACTIVATED: 'payment.recurring.activated',
  PAUSED: 'payment.recurring.paused',
  RESUMED: 'payment.recurring.resumed',
  RUN: 'payment.recurring.run',
  COMPLETED: 'payment.recurring.completed',
  CANCELLED: 'payment.recurring.cancelled',
  FAILED: 'payment.recurring.failed',
} as const;

export interface RecurringScheduledPayload {
  readonly recurringId: string;
  readonly paymentId: string;
  readonly amount: number;
  readonly currency: string;
  readonly interval: string;
  readonly intervalCount: number;
  readonly startAt: string;
}

export interface RecurringRunPayload {
  readonly recurringId: string;
  readonly paymentId: string;
  readonly runAt: string;
  readonly attemptCount: number;
  readonly transactionId?: string;
}

export interface RecurringStatusChangedPayload {
  readonly recurringId: string;
  readonly paymentId: string;
  readonly fromStatus: string;
  readonly toStatus: string;
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
    aggregateType: PAYMENT_AGGREGATE_TYPE.RECURRING,
    payload: p.payload,
    occurredAt: p.occurredAt ?? now(),
    version: p.version ?? 1,
    metadata: p.metadata,
  };
}

export class RecurringScheduledEvent extends BaseDomainEvent<
  typeof RECURRING_EVENT_TYPE.SCHEDULED,
  RecurringScheduledPayload
> {
  constructor(p: EventParams<RecurringScheduledPayload>) {
    super(buildParams(RECURRING_EVENT_TYPE.SCHEDULED, p));
  }
}

export class RecurringActivatedEvent extends BaseDomainEvent<
  typeof RECURRING_EVENT_TYPE.ACTIVATED,
  RecurringStatusChangedPayload
> {
  constructor(p: EventParams<RecurringStatusChangedPayload>) {
    super(buildParams(RECURRING_EVENT_TYPE.ACTIVATED, p));
  }
}

export class RecurringPausedEvent extends BaseDomainEvent<
  typeof RECURRING_EVENT_TYPE.PAUSED,
  RecurringStatusChangedPayload
> {
  constructor(p: EventParams<RecurringStatusChangedPayload>) {
    super(buildParams(RECURRING_EVENT_TYPE.PAUSED, p));
  }
}

export class RecurringResumedEvent extends BaseDomainEvent<
  typeof RECURRING_EVENT_TYPE.RESUMED,
  RecurringStatusChangedPayload
> {
  constructor(p: EventParams<RecurringStatusChangedPayload>) {
    super(buildParams(RECURRING_EVENT_TYPE.RESUMED, p));
  }
}

export class RecurringRunEvent extends BaseDomainEvent<
  typeof RECURRING_EVENT_TYPE.RUN,
  RecurringRunPayload
> {
  constructor(p: EventParams<RecurringRunPayload>) {
    super(buildParams(RECURRING_EVENT_TYPE.RUN, p));
  }
}

export class RecurringCompletedEvent extends BaseDomainEvent<
  typeof RECURRING_EVENT_TYPE.COMPLETED,
  RecurringStatusChangedPayload
> {
  constructor(p: EventParams<RecurringStatusChangedPayload>) {
    super(buildParams(RECURRING_EVENT_TYPE.COMPLETED, p));
  }
}

export class RecurringCancelledEvent extends BaseDomainEvent<
  typeof RECURRING_EVENT_TYPE.CANCELLED,
  RecurringStatusChangedPayload
> {
  constructor(p: EventParams<RecurringStatusChangedPayload>) {
    super(buildParams(RECURRING_EVENT_TYPE.CANCELLED, p));
  }
}

export class RecurringFailedEvent extends BaseDomainEvent<
  typeof RECURRING_EVENT_TYPE.FAILED,
  RecurringStatusChangedPayload
> {
  constructor(p: EventParams<RecurringStatusChangedPayload>) {
    super(buildParams(RECURRING_EVENT_TYPE.FAILED, p));
  }
}
