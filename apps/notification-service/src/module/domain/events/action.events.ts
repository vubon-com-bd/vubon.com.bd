/* istanbul ignore file -- pure event declarations */
/**
 * Notification Action Domain Events
 * @module notification-service/domain/events
 *
 * User triggered an action on a notification (click, accept, dismiss, etc.)।
 */
import { BaseDomainEvent } from '@vubon/shared-kernel/domain/base/base.event';
import type { DomainEventMetadata } from '@vubon/shared-kernel/domain/base/base.event';
import type { Timestamp } from '@vubon/shared-types/common';
import { NOTIFICATION_AGGREGATE_TYPE, newEventId, nowTimestamp } from './event.helpers.js';

// ─── Event Type Constants ─────────────────
export const ACTION_EVENT_TYPE = {
  TRIGGERED: 'notification.action_triggered',
  CLICKED: 'notification.clicked',
  DISMISSED: 'notification.dismissed',
  UNSUBSCRIBED: 'notification.unsubscribed',
} as const;

// ─── Payloads ─────────────────────────────
export interface NotificationActionTriggeredPayload {
  readonly notificationId: string;
  readonly userId: string;
  readonly actionId: string;
  readonly actionType: string;
  readonly triggeredAt: string;
  readonly metadata?: Readonly<Record<string, unknown>>;
}

export interface NotificationClickedPayload {
  readonly notificationId: string;
  readonly userId: string;
  readonly url?: string;
  readonly clickedAt: string;
}

export interface NotificationDismissedPayload {
  readonly notificationId: string;
  readonly userId: string;
  readonly dismissedAt: string;
}

export interface NotificationUnsubscribedPayload {
  readonly notificationId: string;
  readonly userId: string;
  readonly category: string;
  readonly channel: string;
  readonly unsubscribedAt: string;
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
export class NotificationActionTriggeredEvent extends BaseDomainEvent<
  typeof ACTION_EVENT_TYPE.TRIGGERED,
  NotificationActionTriggeredPayload
> {
  constructor(p: EventParams<NotificationActionTriggeredPayload>) {
    super(buildParams(ACTION_EVENT_TYPE.TRIGGERED, p));
  }
}

export class NotificationClickedEvent extends BaseDomainEvent<
  typeof ACTION_EVENT_TYPE.CLICKED,
  NotificationClickedPayload
> {
  constructor(p: EventParams<NotificationClickedPayload>) {
    super(buildParams(ACTION_EVENT_TYPE.CLICKED, p));
  }
}

export class NotificationDismissedEvent extends BaseDomainEvent<
  typeof ACTION_EVENT_TYPE.DISMISSED,
  NotificationDismissedPayload
> {
  constructor(p: EventParams<NotificationDismissedPayload>) {
    super(buildParams(ACTION_EVENT_TYPE.DISMISSED, p));
  }
}

export class NotificationUnsubscribedEvent extends BaseDomainEvent<
  typeof ACTION_EVENT_TYPE.UNSUBSCRIBED,
  NotificationUnsubscribedPayload
> {
  constructor(p: EventParams<NotificationUnsubscribedPayload>) {
    super(buildParams(ACTION_EVENT_TYPE.UNSUBSCRIBED, p));
  }
}
