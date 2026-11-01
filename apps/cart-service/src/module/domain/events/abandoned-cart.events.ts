/**
 * AbandonedCart Domain Events
 * @module cart-service/domain/events
 */
import { BaseDomainEvent } from '@vubon/shared-kernel/domain/base/base.event';
import type { DomainEventMetadata } from '@vubon/shared-kernel/domain/base/base.event';
import type { Timestamp } from '@vubon/shared-types/common';
import { CART_AGGREGATE_TYPE, newEventId, nowTimestamp } from './event.helpers.js';

export const ABANDONED_CART_EVENT_TYPE = {
  DETECTED: 'cart.abandoned_cart.detected',
  REMINDER_SENT: 'cart.abandoned_cart.reminder_sent',
  RECOVERED: 'cart.abandoned_cart.recovered',
  LOST: 'cart.abandoned_cart.lost',
  UNSUBSCRIBED: 'cart.abandoned_cart.unsubscribed',
  STATUS_CHANGED: 'cart.abandoned_cart.status_changed',
} as const;

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
    aggregateType: CART_AGGREGATE_TYPE.ABANDONED_CART,
    payload: p.payload,
    occurredAt: p.occurredAt ?? nowTimestamp(),
    version: p.version ?? 1,
    metadata: p.metadata,
  };
}

export class AbandonedCartDetectedEvent extends BaseDomainEvent<
  typeof ABANDONED_CART_EVENT_TYPE.DETECTED,
  { abandonedCartId: string; cartId: string; itemCount: number; cartValue: number }
> {
  constructor(
    p: EventParams<{
      abandonedCartId: string;
      cartId: string;
      itemCount: number;
      cartValue: number;
    }>,
  ) {
    super(buildParams(ABANDONED_CART_EVENT_TYPE.DETECTED, p));
  }
}

export class AbandonedCartReminderSentEvent extends BaseDomainEvent<
  typeof ABANDONED_CART_EVENT_TYPE.REMINDER_SENT,
  { abandonedCartId: string; channel: string; sentAt: string; remindersSent: number }
> {
  constructor(
    p: EventParams<{
      abandonedCartId: string;
      channel: string;
      sentAt: string;
      remindersSent: number;
    }>,
  ) {
    super(buildParams(ABANDONED_CART_EVENT_TYPE.REMINDER_SENT, p));
  }
}

export class AbandonedCartRecoveredEvent extends BaseDomainEvent<
  typeof ABANDONED_CART_EVENT_TYPE.RECOVERED,
  { abandonedCartId: string; orderId: string; recoveredAt: string; recoveredValue: number }
> {
  constructor(
    p: EventParams<{
      abandonedCartId: string;
      orderId: string;
      recoveredAt: string;
      recoveredValue: number;
    }>,
  ) {
    super(buildParams(ABANDONED_CART_EVENT_TYPE.RECOVERED, p));
  }
}

export class AbandonedCartLostEvent extends BaseDomainEvent<
  typeof ABANDONED_CART_EVENT_TYPE.LOST,
  { abandonedCartId: string; lostAt: string; reason?: string }
> {
  constructor(
    p: EventParams<{ abandonedCartId: string; lostAt: string; reason?: string }>,
  ) {
    super(buildParams(ABANDONED_CART_EVENT_TYPE.LOST, p));
  }
}

export class AbandonedCartUnsubscribedEvent extends BaseDomainEvent<
  typeof ABANDONED_CART_EVENT_TYPE.UNSUBSCRIBED,
  { abandonedCartId: string; unsubscribedAt: string }
> {
  constructor(p: EventParams<{ abandonedCartId: string; unsubscribedAt: string }>) {
    super(buildParams(ABANDONED_CART_EVENT_TYPE.UNSUBSCRIBED, p));
  }
}

export class AbandonedCartStatusChangedEvent extends BaseDomainEvent<
  typeof ABANDONED_CART_EVENT_TYPE.STATUS_CHANGED,
  { abandonedCartId: string; fromStatus: string; toStatus: string }
> {
  constructor(
    p: EventParams<{ abandonedCartId: string; fromStatus: string; toStatus: string }>,
  ) {
    super(buildParams(ABANDONED_CART_EVENT_TYPE.STATUS_CHANGED, p));
  }
}
