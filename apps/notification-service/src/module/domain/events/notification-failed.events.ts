/* istanbul ignore file -- pure event declarations */
/**
 * Notification Failure Domain Events
 * @module notification-service/domain/events
 *
 * Failure-path events — sent, delivery, retry exhausted।
 */
import { BaseDomainEvent } from '@vubon/shared-kernel/domain/base/base.event';
import type { DomainEventMetadata } from '@vubon/shared-kernel/domain/base/base.event';
import type { Timestamp } from '@vubon/shared-types/common';
import { NOTIFICATION_AGGREGATE_TYPE, newEventId, nowTimestamp } from './event.helpers.js';

// ─── Event Type Constants ─────────────────
export const NOTIFICATION_FAILED_EVENT_TYPE = {
  FAILED: 'notification.failed',
  DELIVERY_FAILED: 'notification.delivery_failed',
  RETRY_EXHAUSTED: 'notification.retry_exhausted',
} as const;

// ─── Payloads ─────────────────────────────
export interface NotificationFailedPayload {
  readonly notificationId: string;
  readonly reason: string;
  readonly errorMessage: string;
  readonly failedAt: string;
  readonly retryable: boolean;
}

export interface NotificationDeliveryFailedPayload {
  readonly notificationId: string;
  readonly channel: string;
  readonly reason: string;
  readonly errorMessage: string;
  readonly providerCode?: string;
  readonly attemptNumber: number;
  readonly failedAt: string;
}

export interface NotificationRetryExhaustedPayload {
  readonly notificationId: string;
  readonly attemptsUsed: number;
  readonly maxAttempts: number;
  readonly lastErrorMessage: string;
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
    aggregateType: NOTIFICATION_AGGREGATE_TYPE.NOTIFICATION,
    payload: p.payload,
    occurredAt: p.occurredAt ?? nowTimestamp(),
    version: p.version ?? 1,
    metadata: p.metadata,
  };
}

// ─── Concrete Events ──────────────────────
export class NotificationFailedEvent extends BaseDomainEvent<
  typeof NOTIFICATION_FAILED_EVENT_TYPE.FAILED,
  NotificationFailedPayload
> {
  constructor(p: EventParams<NotificationFailedPayload>) {
    super(buildParams(NOTIFICATION_FAILED_EVENT_TYPE.FAILED, p));
  }
}

export class NotificationDeliveryFailedEvent extends BaseDomainEvent<
  typeof NOTIFICATION_FAILED_EVENT_TYPE.DELIVERY_FAILED,
  NotificationDeliveryFailedPayload
> {
  constructor(p: EventParams<NotificationDeliveryFailedPayload>) {
    super(buildParams(NOTIFICATION_FAILED_EVENT_TYPE.DELIVERY_FAILED, p));
  }
}

export class NotificationRetryExhaustedEvent extends BaseDomainEvent<
  typeof NOTIFICATION_FAILED_EVENT_TYPE.RETRY_EXHAUSTED,
  NotificationRetryExhaustedPayload
> {
  constructor(p: EventParams<NotificationRetryExhaustedPayload>) {
    super(buildParams(NOTIFICATION_FAILED_EVENT_TYPE.RETRY_EXHAUSTED, p));
  }
}
