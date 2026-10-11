/**
 * Delivery attempt domain events
 * @module notification-service/domain/events
 */
import { BaseDomainEvent } from '@vubon/shared-kernel/domain/base/base.event';
import type { DomainEventMetadata } from '@vubon/shared-kernel/domain/base/base.event';
import type { Timestamp } from '@vubon/shared-types/common';
import { DELIVERY_AGGREGATE_TYPE, newEventId, now } from './event.helpers.js';

export const DELIVERY_EVENT_TYPE = {
  ATTEMPT_STARTED: 'delivery.attempt_started',
  ATTEMPT_SUCCEEDED: 'delivery.attempt_succeeded',
  ATTEMPT_FAILED: 'delivery.attempt_failed',
  RETRY_SCHEDULED: 'delivery.retry_scheduled',
  RETRY_EXHAUSTED: 'delivery.retry_exhausted',
} as const;

export interface DeliveryAttemptStartedPayload {
  readonly deliveryId: string;
  readonly notificationId: string;
  readonly channel: string;
  readonly provider: string;
  readonly attempt: number;
  readonly startedAt: string;
}

export interface DeliveryAttemptSucceededPayload {
  readonly deliveryId: string;
  readonly notificationId: string;
  readonly channel: string;
  readonly provider: string;
  readonly providerMessageId?: string;
  readonly completedAt: string;
  readonly durationMs: number;
}

export interface DeliveryAttemptFailedPayload {
  readonly deliveryId: string;
  readonly notificationId: string;
  readonly channel: string;
  readonly provider: string;
  readonly attempt: number;
  readonly failedAt: string;
  readonly reason: string;
  readonly failureCode?: string;
  readonly retryable: boolean;
}

export interface DeliveryRetryScheduledPayload {
  readonly deliveryId: string;
  readonly notificationId: string;
  readonly attempt: number;
  readonly nextAttemptAt: string;
  readonly delayMs: number;
}

export interface DeliveryRetryExhaustedPayload {
  readonly deliveryId: string;
  readonly notificationId: string;
  readonly attempts: number;
  readonly exhaustedAt: string;
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
    aggregateType: DELIVERY_AGGREGATE_TYPE,
    payload: p.payload,
    occurredAt: p.occurredAt ?? now(),
    version: p.version ?? 1,
    metadata: p.metadata,
  };
}

export class DeliveryAttemptStartedEvent extends BaseDomainEvent<
  typeof DELIVERY_EVENT_TYPE.ATTEMPT_STARTED,
  DeliveryAttemptStartedPayload
> {
  constructor(p: EventParams<DeliveryAttemptStartedPayload>) {
    super(buildParams(DELIVERY_EVENT_TYPE.ATTEMPT_STARTED, p));
  }
}

export class DeliveryAttemptSucceededEvent extends BaseDomainEvent<
  typeof DELIVERY_EVENT_TYPE.ATTEMPT_SUCCEEDED,
  DeliveryAttemptSucceededPayload
> {
  constructor(p: EventParams<DeliveryAttemptSucceededPayload>) {
    super(buildParams(DELIVERY_EVENT_TYPE.ATTEMPT_SUCCEEDED, p));
  }
}

export class DeliveryAttemptFailedEvent extends BaseDomainEvent<
  typeof DELIVERY_EVENT_TYPE.ATTEMPT_FAILED,
  DeliveryAttemptFailedPayload
> {
  constructor(p: EventParams<DeliveryAttemptFailedPayload>) {
    super(buildParams(DELIVERY_EVENT_TYPE.ATTEMPT_FAILED, p));
  }
}

export class DeliveryRetryScheduledEvent extends BaseDomainEvent<
  typeof DELIVERY_EVENT_TYPE.RETRY_SCHEDULED,
  DeliveryRetryScheduledPayload
> {
  constructor(p: EventParams<DeliveryRetryScheduledPayload>) {
    super(buildParams(DELIVERY_EVENT_TYPE.RETRY_SCHEDULED, p));
  }
}

export class DeliveryRetryExhaustedEvent extends BaseDomainEvent<
  typeof DELIVERY_EVENT_TYPE.RETRY_EXHAUSTED,
  DeliveryRetryExhaustedPayload
> {
  constructor(p: EventParams<DeliveryRetryExhaustedPayload>) {
    super(buildParams(DELIVERY_EVENT_TYPE.RETRY_EXHAUSTED, p));
  }
}
