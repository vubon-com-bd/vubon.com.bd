/**
 * Abandoned cart domain events
 * @module cart-service/domain/events
 */
import { BaseDomainEvent } from '@vubon/shared-kernel/domain/base/base.event';
import type { DomainEventMetadata } from '@vubon/shared-kernel/domain/base/base.event';
import type { Timestamp } from '@vubon/shared-types/common';
import { ABANDONED_CART_AGGREGATE_TYPE, newEventId, now } from './event.helpers.js';

export const ABANDONED_CART_EVENT_TYPE = {
  DETECTED: 'abandoned.cart.detected',
  REMINDER_SENT: 'abandoned.cart.reminder.sent',
  RECOVERED: 'abandoned.cart.recovered',
  LOST: 'abandoned.cart.lost',
  UNSUBSCRIBED: 'abandoned.cart.unsubscribed',
} as const;

export interface AbandonedCartDetectedPayload {
  readonly abandonedCartId: string;
  readonly cartId: string;
  readonly userId?: string;
  readonly itemCount: number;
  readonly cartValue: number;
  readonly currency: string;
}

export interface ReminderSentPayload {
  readonly abandonedCartId: string;
  readonly cartId: string;
  readonly reminderType: string;
  readonly channel: string;
  readonly reminderNumber: number;
}

export interface AbandonedCartRecoveredPayload {
  readonly abandonedCartId: string;
  readonly cartId: string;
  readonly orderId: string;
  readonly recoveredValue: number;
  readonly currency: string;
}

export interface AbandonedCartLostPayload {
  readonly abandonedCartId: string;
  readonly cartId: string;
  readonly reason: string;
}

export interface AbandonedCartUnsubscribedPayload {
  readonly abandonedCartId: string;
  readonly cartId: string;
  readonly userId?: string;
  readonly email?: string;
}

type EventParams<TPayload> = {
  id?: string;
  aggregateId: string;
  payload: TPayload;
  occurredAt?: Timestamp;
  version?: number;
  metadata?: DomainEventMetadata;
};

export class AbandonedCartDetectedEvent extends BaseDomainEvent<
  typeof ABANDONED_CART_EVENT_TYPE.DETECTED,
  AbandonedCartDetectedPayload
> {
  constructor(p: EventParams<AbandonedCartDetectedPayload>) {
    super({
      id: p.id ?? newEventId(),
      type: ABANDONED_CART_EVENT_TYPE.DETECTED,
      aggregateId: p.aggregateId,
      aggregateType: ABANDONED_CART_AGGREGATE_TYPE,
      payload: p.payload,
      occurredAt: p.occurredAt ?? now(),
      version: p.version ?? 1,
      metadata: p.metadata,
    });
  }
}

export class ReminderSentEvent extends BaseDomainEvent<
  typeof ABANDONED_CART_EVENT_TYPE.REMINDER_SENT,
  ReminderSentPayload
> {
  constructor(p: EventParams<ReminderSentPayload>) {
    super({
      id: p.id ?? newEventId(),
      type: ABANDONED_CART_EVENT_TYPE.REMINDER_SENT,
      aggregateId: p.aggregateId,
      aggregateType: ABANDONED_CART_AGGREGATE_TYPE,
      payload: p.payload,
      occurredAt: p.occurredAt ?? now(),
      version: p.version ?? 1,
      metadata: p.metadata,
    });
  }
}

export class AbandonedCartRecoveredEvent extends BaseDomainEvent<
  typeof ABANDONED_CART_EVENT_TYPE.RECOVERED,
  AbandonedCartRecoveredPayload
> {
  constructor(p: EventParams<AbandonedCartRecoveredPayload>) {
    super({
      id: p.id ?? newEventId(),
      type: ABANDONED_CART_EVENT_TYPE.RECOVERED,
      aggregateId: p.aggregateId,
      aggregateType: ABANDONED_CART_AGGREGATE_TYPE,
      payload: p.payload,
      occurredAt: p.occurredAt ?? now(),
      version: p.version ?? 1,
      metadata: p.metadata,
    });
  }
}

export class AbandonedCartLostEvent extends BaseDomainEvent<
  typeof ABANDONED_CART_EVENT_TYPE.LOST,
  AbandonedCartLostPayload
> {
  constructor(p: EventParams<AbandonedCartLostPayload>) {
    super({
      id: p.id ?? newEventId(),
      type: ABANDONED_CART_EVENT_TYPE.LOST,
      aggregateId: p.aggregateId,
      aggregateType: ABANDONED_CART_AGGREGATE_TYPE,
      payload: p.payload,
      occurredAt: p.occurredAt ?? now(),
      version: p.version ?? 1,
      metadata: p.metadata,
    });
  }
}

export class AbandonedCartUnsubscribedEvent extends BaseDomainEvent<
  typeof ABANDONED_CART_EVENT_TYPE.UNSUBSCRIBED,
  AbandonedCartUnsubscribedPayload
> {
  constructor(p: EventParams<AbandonedCartUnsubscribedPayload>) {
    super({
      id: p.id ?? newEventId(),
      type: ABANDONED_CART_EVENT_TYPE.UNSUBSCRIBED,
      aggregateId: p.aggregateId,
      aggregateType: ABANDONED_CART_AGGREGATE_TYPE,
      payload: p.payload,
      occurredAt: p.occurredAt ?? now(),
      version: p.version ?? 1,
      metadata: p.metadata,
    });
  }
}
