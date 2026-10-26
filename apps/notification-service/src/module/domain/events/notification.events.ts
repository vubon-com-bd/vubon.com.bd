/* istanbul ignore file -- pure event declarations */
/**
 * Notification Domain Events
 * @module notification-service/domain/events
 *
 * Root aggregate lifecycle events।
 */
import { BaseDomainEvent } from '@vubon/shared-kernel/domain/base/base.event';
import type { DomainEventMetadata } from '@vubon/shared-kernel/domain/base/base.event';
import type { Timestamp } from '@vubon/shared-types/common';
import { NOTIFICATION_AGGREGATE_TYPE, newEventId, nowTimestamp } from './event.helpers.js';

// ─── Event Type Constants ─────────────────
export const NOTIFICATION_EVENT_TYPE = {
  CREATED: 'notification.created',
  SENT: 'notification.sent',
  DELIVERED: 'notification.delivered',
  CANCELLED: 'notification.cancelled',
  STATUS_CHANGED: 'notification.status_changed',
  EXPIRED: 'notification.expired',
} as const;

// ─── Payloads ─────────────────────────────
export interface NotificationCreatedPayload {
  readonly notificationId: string;
  readonly userId: string;
  readonly type: string;
  readonly category: string;
  readonly channel: string;
  readonly priority: string;
  readonly createdAt: string;
}

export interface NotificationSentPayload {
  readonly notificationId: string;
  readonly channel: string;
  readonly providerName?: string;
  readonly providerMessageId?: string;
  readonly sentAt: string;
}

export interface NotificationDeliveredPayload {
  readonly notificationId: string;
  readonly deliveredAt: string;
  readonly providerMessageId?: string;
}

export interface NotificationCancelledPayload {
  readonly notificationId: string;
  readonly reason?: string;
  readonly cancelledBy?: string;
  readonly cancelledAt: string;
}

export interface NotificationStatusChangedPayload {
  readonly notificationId: string;
  readonly fromStatus: string;
  readonly toStatus: string;
  readonly changedBy?: string;
  readonly reason?: string;
}

export interface NotificationExpiredPayload {
  readonly notificationId: string;
  readonly expiredAt: string;
}

// ─── Generic Event Params ────────────────
type EventParams<TPayload> = {
  id?: string;
  aggregateId: string;
  payload: TPayload;
  occurredAt?: Timestamp;
  version?: number;
  metadata?: DomainEventMetadata;
};

// ─── DRY builder ─────────────────────────
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
export class NotificationCreatedEvent extends BaseDomainEvent<
  typeof NOTIFICATION_EVENT_TYPE.CREATED,
  NotificationCreatedPayload
> {
  constructor(p: EventParams<NotificationCreatedPayload>) {
    super(buildParams(NOTIFICATION_EVENT_TYPE.CREATED, p));
  }
}

export class NotificationSentEvent extends BaseDomainEvent<
  typeof NOTIFICATION_EVENT_TYPE.SENT,
  NotificationSentPayload
> {
  constructor(p: EventParams<NotificationSentPayload>) {
    super(buildParams(NOTIFICATION_EVENT_TYPE.SENT, p));
  }
}

export class NotificationDeliveredEvent extends BaseDomainEvent<
  typeof NOTIFICATION_EVENT_TYPE.DELIVERED,
  NotificationDeliveredPayload
> {
  constructor(p: EventParams<NotificationDeliveredPayload>) {
    super(buildParams(NOTIFICATION_EVENT_TYPE.DELIVERED, p));
  }
}

export class NotificationCancelledEvent extends BaseDomainEvent<
  typeof NOTIFICATION_EVENT_TYPE.CANCELLED,
  NotificationCancelledPayload
> {
  constructor(p: EventParams<NotificationCancelledPayload>) {
    super(buildParams(NOTIFICATION_EVENT_TYPE.CANCELLED, p));
  }
}

export class NotificationStatusChangedEvent extends BaseDomainEvent<
  typeof NOTIFICATION_EVENT_TYPE.STATUS_CHANGED,
  NotificationStatusChangedPayload
> {
  constructor(p: EventParams<NotificationStatusChangedPayload>) {
    super(buildParams(NOTIFICATION_EVENT_TYPE.STATUS_CHANGED, p));
  }
}

export class NotificationExpiredEvent extends BaseDomainEvent<
  typeof NOTIFICATION_EVENT_TYPE.EXPIRED,
  NotificationExpiredPayload
> {
  constructor(p: EventParams<NotificationExpiredPayload>) {
    super(buildParams(NOTIFICATION_EVENT_TYPE.EXPIRED, p));
  }
}
