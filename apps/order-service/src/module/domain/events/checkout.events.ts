/**
 * Checkout Domain Events
 * @module order-service/domain/events
 */
import { BaseDomainEvent } from '@vubon/shared-kernel/domain/base/base.event';
import type { DomainEventMetadata } from '@vubon/shared-kernel/domain/base/base.event';
import type { Timestamp } from '@vubon/shared-types/common';
import { ORDER_AGGREGATE_TYPE, newEventId, now } from './event.helpers.js';

export const CHECKOUT_EVENT_TYPE = {
  STARTED: 'order.checkout.started',
  STEP_CHANGED: 'order.checkout.step_changed',
  COMPLETED: 'order.checkout.completed',
  ABANDONED: 'order.checkout.abandoned',
  EXPIRED: 'order.checkout.expired',
} as const;

export interface CheckoutStartedPayload {
  readonly checkoutId: string;
  readonly customerId: string;
  readonly startedAt: string;
}

export interface CheckoutStepChangedPayload {
  readonly checkoutId: string;
  readonly fromStep: string;
  readonly toStep: string;
}

export interface CheckoutCompletedPayload {
  readonly checkoutId: string;
  readonly orderId: string;
  readonly completedAt: string;
}

export interface CheckoutAbandonedPayload {
  readonly checkoutId: string;
  readonly reason?: string;
  readonly abandonedAt: string;
}

export interface CheckoutExpiredPayload {
  readonly checkoutId: string;
  readonly expiredAt: string;
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
    aggregateType: ORDER_AGGREGATE_TYPE.CHECKOUT,
    payload: p.payload,
    occurredAt: p.occurredAt ?? now(),
    version: p.version ?? 1,
    metadata: p.metadata,
  };
}

export class CheckoutStartedEvent extends BaseDomainEvent<
  typeof CHECKOUT_EVENT_TYPE.STARTED,
  CheckoutStartedPayload
> {
  constructor(p: EventParams<CheckoutStartedPayload>) {
    super(buildParams(CHECKOUT_EVENT_TYPE.STARTED, p));
  }
}

export class CheckoutStepChangedEvent extends BaseDomainEvent<
  typeof CHECKOUT_EVENT_TYPE.STEP_CHANGED,
  CheckoutStepChangedPayload
> {
  constructor(p: EventParams<CheckoutStepChangedPayload>) {
    super(buildParams(CHECKOUT_EVENT_TYPE.STEP_CHANGED, p));
  }
}

export class CheckoutCompletedEvent extends BaseDomainEvent<
  typeof CHECKOUT_EVENT_TYPE.COMPLETED,
  CheckoutCompletedPayload
> {
  constructor(p: EventParams<CheckoutCompletedPayload>) {
    super(buildParams(CHECKOUT_EVENT_TYPE.COMPLETED, p));
  }
}

export class CheckoutAbandonedEvent extends BaseDomainEvent<
  typeof CHECKOUT_EVENT_TYPE.ABANDONED,
  CheckoutAbandonedPayload
> {
  constructor(p: EventParams<CheckoutAbandonedPayload>) {
    super(buildParams(CHECKOUT_EVENT_TYPE.ABANDONED, p));
  }
}

export class CheckoutExpiredEvent extends BaseDomainEvent<
  typeof CHECKOUT_EVENT_TYPE.EXPIRED,
  CheckoutExpiredPayload
> {
  constructor(p: EventParams<CheckoutExpiredPayload>) {
    super(buildParams(CHECKOUT_EVENT_TYPE.EXPIRED, p));
  }
}
