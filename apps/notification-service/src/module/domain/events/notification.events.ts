/**
 * Notification domain events
 * @module notification-service/domain/events
 */
import { BaseDomainEvent } from '@vubon/shared-kernel/domain/base/base.event';
import type { DomainEventMetadata } from '@vubon/shared-kernel/domain/base/base.event';
import type { Timestamp } from '@vubon/shared-types/common';
import { NOTIFICATION_AGGREGATE_TYPE, newEventId, now } from './event.helpers.js';

export const NOTIFICATION_EVENT_TYPE = {
  CREATED: 'notification.created',
  QUEUED: 'notification.queued',
  SCHEDULED: 'notification.scheduled',
  SENDING: 'notification.sending',
  SENT: 'notification.sent',
  DELIVERED: 'notification.delivered',
  READ: 'notification.read',
  FAILED: 'notification.failed',
  CANCELLED: 'notification.cancelled',
  EXPIRED: 'notification.expired',
  ARCHIVED: 'notification.archived',
  STATUS_CHANGED: 'notification.status_changed',
  RETRY_ATTEMPTED: 'notification.retry_attempted',
} as const;

export interface NotificationCreatedPayload {
  readonly notificationId: string;
  readonly userId: string;
  readonly type: string;
  readonly category: string;
  readonly channel: string;
  readonly priority: string;
  readonly title: string;
  readonly hasData: boolean;
  readonly actionCount: number;
  readonly referenceType?: string;
  readonly referenceId?: string;
}

export interface NotificationQueuedPayload {
  readonly notificationId: string;
  readonly userId: string;
  readonly channel: string;
  readonly queuePosition?: number;
}

export interface NotificationScheduledPayload {
  readonly notificationId: string;
  readonly userId: string;
  readonly channel: string;
  readonly scheduledAt: string;
  readonly scheduleId?: string;
}

export interface NotificationSendingPayload {
  readonly notificationId: string;
  readonly channel: string;
  readonly provider: string;
  readonly attempt: number;
  readonly startedAt: string;
}

export interface NotificationSentPayload {
  readonly notificationId: string;
  readonly userId: string;
  readonly channel: string;
  readonly provider: string;
  readonly providerMessageId?: string;
  readonly sentAt: string;
}

export interface NotificationDeliveredPayload {
  readonly notificationId: string;
  readonly userId: string;
  readonly channel: string;
  readonly deliveredAt: string;
}

export interface NotificationReadPayload {
  readonly notificationId: string;
  readonly userId: string;
  readonly readAt: string;
}

export interface NotificationFailedPayload {
  readonly notificationId: string;
  readonly userId: string;
  readonly channel: string;
  readonly failedAt: string;
  readonly reason: string;
  readonly failureCode?: string;
  readonly attempt: number;
}

export interface NotificationCancelledPayload {
  readonly notificationId: string;
  readonly cancelledAt: string;
  readonly cancelledBy?: string;
  readonly reason?: string;
}

export interface NotificationExpiredPayload {
  readonly notificationId: string;
  readonly expiredAt: string;
}

export interface NotificationArchivedPayload {
  readonly notificationId: string;
  readonly archivedAt: string;
  readonly archivedBy?: string;
}

export interface NotificationStatusChangedPayload {
  readonly notificationId: string;
  readonly fromStatus: string;
  readonly toStatus: string;
  readonly changedBy?: string;
}

export interface NotificationRetryAttemptedPayload {
  readonly notificationId: string;
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
    aggregateType: NOTIFICATION_AGGREGATE_TYPE,
    payload: p.payload,
    occurredAt: p.occurredAt ?? now(),
    version: p.version ?? 1,
    metadata: p.metadata,
  };
}

export class NotificationCreatedEvent extends BaseDomainEvent<
  typeof NOTIFICATION_EVENT_TYPE.CREATED,
  NotificationCreatedPayload
> {
  constructor(p: EventParams<NotificationCreatedPayload>) {
    super(buildParams(NOTIFICATION_EVENT_TYPE.CREATED, p));
  }
}

export class NotificationQueuedEvent extends BaseDomainEvent<
  typeof NOTIFICATION_EVENT_TYPE.QUEUED,
  NotificationQueuedPayload
> {
  constructor(p: EventParams<NotificationQueuedPayload>) {
    super(buildParams(NOTIFICATION_EVENT_TYPE.QUEUED, p));
  }
}

export class NotificationScheduledEvent extends BaseDomainEvent<
  typeof NOTIFICATION_EVENT_TYPE.SCHEDULED,
  NotificationScheduledPayload
> {
  constructor(p: EventParams<NotificationScheduledPayload>) {
    super(buildParams(NOTIFICATION_EVENT_TYPE.SCHEDULED, p));
  }
}

export class NotificationSendingEvent extends BaseDomainEvent<
  typeof NOTIFICATION_EVENT_TYPE.SENDING,
  NotificationSendingPayload
> {
  constructor(p: EventParams<NotificationSendingPayload>) {
    super(buildParams(NOTIFICATION_EVENT_TYPE.SENDING, p));
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

export class NotificationReadEvent extends BaseDomainEvent<
  typeof NOTIFICATION_EVENT_TYPE.READ,
  NotificationReadPayload
> {
  constructor(p: EventParams<NotificationReadPayload>) {
    super(buildParams(NOTIFICATION_EVENT_TYPE.READ, p));
  }
}

export class NotificationFailedEvent extends BaseDomainEvent<
  typeof NOTIFICATION_EVENT_TYPE.FAILED,
  NotificationFailedPayload
> {
  constructor(p: EventParams<NotificationFailedPayload>) {
    super(buildParams(NOTIFICATION_EVENT_TYPE.FAILED, p));
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

export class NotificationExpiredEvent extends BaseDomainEvent<
  typeof NOTIFICATION_EVENT_TYPE.EXPIRED,
  NotificationExpiredPayload
> {
  constructor(p: EventParams<NotificationExpiredPayload>) {
    super(buildParams(NOTIFICATION_EVENT_TYPE.EXPIRED, p));
  }
}

export class NotificationArchivedEvent extends BaseDomainEvent<
  typeof NOTIFICATION_EVENT_TYPE.ARCHIVED,
  NotificationArchivedPayload
> {
  constructor(p: EventParams<NotificationArchivedPayload>) {
    super(buildParams(NOTIFICATION_EVENT_TYPE.ARCHIVED, p));
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

export class NotificationRetryAttemptedEvent extends BaseDomainEvent<
  typeof NOTIFICATION_EVENT_TYPE.RETRY_ATTEMPTED,
  NotificationRetryAttemptedPayload
> {
  constructor(p: EventParams<NotificationRetryAttemptedPayload>) {
    super(buildParams(NOTIFICATION_EVENT_TYPE.RETRY_ATTEMPTED, p));
  }
}
