/* istanbul ignore file -- pure event declarations */
/**
 * Notification Read-Status Domain Events
 * @module notification-service/domain/events
 *
 * User reading notification → read status events।
 */
import { BaseDomainEvent } from '@vubon/shared-kernel/domain/base/base.event';
import type { DomainEventMetadata } from '@vubon/shared-kernel/domain/base/base.event';
import type { Timestamp } from '@vubon/shared-types/common';
import { NOTIFICATION_AGGREGATE_TYPE, newEventId, nowTimestamp } from './event.helpers.js';

// ─── Event Type Constants ─────────────────
export const READ_EVENT_TYPE = {
  MARKED_READ: 'notification.marked_read',
  MARKED_UNREAD: 'notification.marked_unread',
  ARCHIVED: 'notification.archived',
  STARRED: 'notification.starred',
  UNSTARRED: 'notification.unstarred',
  SNOOZED: 'notification.snoozed',
} as const;

// ─── Payloads ─────────────────────────────
export interface NotificationMarkedReadPayload {
  readonly notificationId: string;
  readonly userId: string;
  readonly readAt: string;
}

export interface NotificationMarkedUnreadPayload {
  readonly notificationId: string;
  readonly userId: string;
  readonly changedAt: string;
}

export interface NotificationArchivedPayload {
  readonly notificationId: string;
  readonly userId: string;
  readonly archivedAt: string;
}

export interface NotificationStarredPayload {
  readonly notificationId: string;
  readonly userId: string;
  readonly starredAt: string;
}

export interface NotificationUnstarredPayload {
  readonly notificationId: string;
  readonly userId: string;
  readonly unstarredAt: string;
}

export interface NotificationSnoozedPayload {
  readonly notificationId: string;
  readonly userId: string;
  readonly snoozedUntil: string;
  readonly snoozedAt: string;
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
export class NotificationMarkedReadEvent extends BaseDomainEvent<
  typeof READ_EVENT_TYPE.MARKED_READ,
  NotificationMarkedReadPayload
> {
  constructor(p: EventParams<NotificationMarkedReadPayload>) {
    super(buildParams(READ_EVENT_TYPE.MARKED_READ, p));
  }
}

export class NotificationMarkedUnreadEvent extends BaseDomainEvent<
  typeof READ_EVENT_TYPE.MARKED_UNREAD,
  NotificationMarkedUnreadPayload
> {
  constructor(p: EventParams<NotificationMarkedUnreadPayload>) {
    super(buildParams(READ_EVENT_TYPE.MARKED_UNREAD, p));
  }
}

export class NotificationArchivedEvent extends BaseDomainEvent<
  typeof READ_EVENT_TYPE.ARCHIVED,
  NotificationArchivedPayload
> {
  constructor(p: EventParams<NotificationArchivedPayload>) {
    super(buildParams(READ_EVENT_TYPE.ARCHIVED, p));
  }
}

export class NotificationStarredEvent extends BaseDomainEvent<
  typeof READ_EVENT_TYPE.STARRED,
  NotificationStarredPayload
> {
  constructor(p: EventParams<NotificationStarredPayload>) {
    super(buildParams(READ_EVENT_TYPE.STARRED, p));
  }
}

export class NotificationUnstarredEvent extends BaseDomainEvent<
  typeof READ_EVENT_TYPE.UNSTARRED,
  NotificationUnstarredPayload
> {
  constructor(p: EventParams<NotificationUnstarredPayload>) {
    super(buildParams(READ_EVENT_TYPE.UNSTARRED, p));
  }
}

export class NotificationSnoozedEvent extends BaseDomainEvent<
  typeof READ_EVENT_TYPE.SNOOZED,
  NotificationSnoozedPayload
> {
  constructor(p: EventParams<NotificationSnoozedPayload>) {
    super(buildParams(READ_EVENT_TYPE.SNOOZED, p));
  }
}
