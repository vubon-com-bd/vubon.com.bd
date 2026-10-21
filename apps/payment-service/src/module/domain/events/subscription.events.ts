/**
 * Subscription Domain Events
 * @module payment-service/domain/events
 */
import { BaseDomainEvent } from '@vubon/shared-kernel/domain/base/base.event';
import type { DomainEventMetadata } from '@vubon/shared-kernel/domain/base/base.event';
import type { Timestamp } from '@vubon/shared-types/common';
import { PAYMENT_AGGREGATE_TYPE, newEventId, now } from './event.helpers.js';

export const SUBSCRIPTION_EVENT_TYPE = {
  CREATED: 'payment.subscription.created',
  TRIAL_STARTED: 'payment.subscription.trial_started',
  ACTIVATED: 'payment.subscription.activated',
  RENEWED: 'payment.subscription.renewed',
  PAST_DUE: 'payment.subscription.past_due',
  PAUSED: 'payment.subscription.paused',
  RESUMED: 'payment.subscription.resumed',
  CANCELLED: 'payment.subscription.cancelled',
  EXPIRED: 'payment.subscription.expired',
} as const;

export interface SubscriptionCreatedPayload {
  readonly subscriptionId: string;
  readonly userId: string;
  readonly plan: string;
  readonly price: number;
  readonly currency: string;
  readonly createdAt: string;
}

export interface SubscriptionRenewedPayload {
  readonly subscriptionId: string;
  readonly periodStart: string;
  readonly periodEnd: string;
  readonly renewedAt: string;
}

export interface SubscriptionStatusChangedPayload {
  readonly subscriptionId: string;
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
    aggregateType: PAYMENT_AGGREGATE_TYPE.SUBSCRIPTION,
    payload: p.payload,
    occurredAt: p.occurredAt ?? now(),
    version: p.version ?? 1,
    metadata: p.metadata,
  };
}

export class SubscriptionCreatedEvent extends BaseDomainEvent<
  typeof SUBSCRIPTION_EVENT_TYPE.CREATED,
  SubscriptionCreatedPayload
> {
  constructor(p: EventParams<SubscriptionCreatedPayload>) {
    super(buildParams(SUBSCRIPTION_EVENT_TYPE.CREATED, p));
  }
}

export class SubscriptionTrialStartedEvent extends BaseDomainEvent<
  typeof SUBSCRIPTION_EVENT_TYPE.TRIAL_STARTED,
  SubscriptionStatusChangedPayload
> {
  constructor(p: EventParams<SubscriptionStatusChangedPayload>) {
    super(buildParams(SUBSCRIPTION_EVENT_TYPE.TRIAL_STARTED, p));
  }
}

export class SubscriptionActivatedEvent extends BaseDomainEvent<
  typeof SUBSCRIPTION_EVENT_TYPE.ACTIVATED,
  SubscriptionStatusChangedPayload
> {
  constructor(p: EventParams<SubscriptionStatusChangedPayload>) {
    super(buildParams(SUBSCRIPTION_EVENT_TYPE.ACTIVATED, p));
  }
}

export class SubscriptionRenewedEvent extends BaseDomainEvent<
  typeof SUBSCRIPTION_EVENT_TYPE.RENEWED,
  SubscriptionRenewedPayload
> {
  constructor(p: EventParams<SubscriptionRenewedPayload>) {
    super(buildParams(SUBSCRIPTION_EVENT_TYPE.RENEWED, p));
  }
}

export class SubscriptionPastDueEvent extends BaseDomainEvent<
  typeof SUBSCRIPTION_EVENT_TYPE.PAST_DUE,
  SubscriptionStatusChangedPayload
> {
  constructor(p: EventParams<SubscriptionStatusChangedPayload>) {
    super(buildParams(SUBSCRIPTION_EVENT_TYPE.PAST_DUE, p));
  }
}

export class SubscriptionPausedEvent extends BaseDomainEvent<
  typeof SUBSCRIPTION_EVENT_TYPE.PAUSED,
  SubscriptionStatusChangedPayload
> {
  constructor(p: EventParams<SubscriptionStatusChangedPayload>) {
    super(buildParams(SUBSCRIPTION_EVENT_TYPE.PAUSED, p));
  }
}

export class SubscriptionResumedEvent extends BaseDomainEvent<
  typeof SUBSCRIPTION_EVENT_TYPE.RESUMED,
  SubscriptionStatusChangedPayload
> {
  constructor(p: EventParams<SubscriptionStatusChangedPayload>) {
    super(buildParams(SUBSCRIPTION_EVENT_TYPE.RESUMED, p));
  }
}

export class SubscriptionCancelledEvent extends BaseDomainEvent<
  typeof SUBSCRIPTION_EVENT_TYPE.CANCELLED,
  SubscriptionStatusChangedPayload
> {
  constructor(p: EventParams<SubscriptionStatusChangedPayload>) {
    super(buildParams(SUBSCRIPTION_EVENT_TYPE.CANCELLED, p));
  }
}

export class SubscriptionExpiredEvent extends BaseDomainEvent<
  typeof SUBSCRIPTION_EVENT_TYPE.EXPIRED,
  SubscriptionStatusChangedPayload
> {
  constructor(p: EventParams<SubscriptionStatusChangedPayload>) {
    super(buildParams(SUBSCRIPTION_EVENT_TYPE.EXPIRED, p));
  }
}
