/**
 * Checkout domain events
 * @module order-service/domain/events
 */
import { BaseDomainEvent } from '@vubon/shared-kernel/domain/base/base.event';
import type { DomainEventMetadata } from '@vubon/shared-kernel/domain/base/base.event';
import type { Timestamp } from '@vubon/shared-types/common';
import { CHECKOUT_AGGREGATE_TYPE, newEventId, now } from './event.helpers.js';

export const CHECKOUT_EVENT_TYPE = {
  STARTED: 'checkout.started',
  ADDRESS_SELECTED: 'checkout.address_selected',
  SHIPPING_SELECTED: 'checkout.shipping_selected',
  PAYMENT_SELECTED: 'checkout.payment_selected',
  STEP_CHANGED: 'checkout.step_changed',
  COMPLETED: 'checkout.completed',
  ABANDONED: 'checkout.abandoned',
  EXPIRED: 'checkout.expired',
  FAILED: 'checkout.failed',
} as const;

export interface CheckoutStartedPayload {
  readonly checkoutId: string;
  readonly customerId: string;
  readonly cartId?: string;
  readonly type: string;
  readonly currency: string;
}

export interface CheckoutAddressSelectedPayload {
  readonly checkoutId: string;
  readonly shippingAddressId?: string;
  readonly billingAddressId?: string;
}

export interface CheckoutShippingSelectedPayload {
  readonly checkoutId: string;
  readonly shippingMethodId: string;
  readonly shippingCost: number;
  readonly currency: string;
}

export interface CheckoutPaymentSelectedPayload {
  readonly checkoutId: string;
  readonly paymentMethod: string;
  readonly paymentGateway?: string;
}

export interface CheckoutStepChangedPayload {
  readonly checkoutId: string;
  readonly fromStep: string;
  readonly toStep: string;
}

export interface CheckoutCompletedPayload {
  readonly checkoutId: string;
  readonly orderId: string;
  readonly customerId: string;
  readonly total: number;
  readonly currency: string;
  readonly completedAt: string;
}

export interface CheckoutAbandonedPayload {
  readonly checkoutId: string;
  readonly abandonedAt: string;
  readonly lastStep: string;
  readonly itemCount: number;
}

export interface CheckoutExpiredPayload {
  readonly checkoutId: string;
  readonly expiredAt: string;
  readonly lastStep: string;
}

export interface CheckoutFailedPayload {
  readonly checkoutId: string;
  readonly failedAt: string;
  readonly reason: string;
  readonly lastStep: string;
}

type EventParams<TPayload> = {
  id?: string;
  aggregateId: string;
  payload: TPayload;
  occurredAt?: Timestamp;
  version?: number;
  metadata?: DomainEventMetadata;
};

export class CheckoutStartedEvent extends BaseDomainEvent<
  typeof CHECKOUT_EVENT_TYPE.STARTED,
  CheckoutStartedPayload
> {
  constructor(p: EventParams<CheckoutStartedPayload>) {
    super({
      id: p.id ?? newEventId(),
      type: CHECKOUT_EVENT_TYPE.STARTED,
      aggregateId: p.aggregateId,
      aggregateType: CHECKOUT_AGGREGATE_TYPE,
      payload: p.payload,
      occurredAt: p.occurredAt ?? now(),
      version: p.version ?? 1,
      metadata: p.metadata,
    });
  }
}

export class CheckoutAddressSelectedEvent extends BaseDomainEvent<
  typeof CHECKOUT_EVENT_TYPE.ADDRESS_SELECTED,
  CheckoutAddressSelectedPayload
> {
  constructor(p: EventParams<CheckoutAddressSelectedPayload>) {
    super({
      id: p.id ?? newEventId(),
      type: CHECKOUT_EVENT_TYPE.ADDRESS_SELECTED,
      aggregateId: p.aggregateId,
      aggregateType: CHECKOUT_AGGREGATE_TYPE,
      payload: p.payload,
      occurredAt: p.occurredAt ?? now(),
      version: p.version ?? 1,
      metadata: p.metadata,
    });
  }
}

export class CheckoutShippingSelectedEvent extends BaseDomainEvent<
  typeof CHECKOUT_EVENT_TYPE.SHIPPING_SELECTED,
  CheckoutShippingSelectedPayload
> {
  constructor(p: EventParams<CheckoutShippingSelectedPayload>) {
    super({
      id: p.id ?? newEventId(),
      type: CHECKOUT_EVENT_TYPE.SHIPPING_SELECTED,
      aggregateId: p.aggregateId,
      aggregateType: CHECKOUT_AGGREGATE_TYPE,
      payload: p.payload,
      occurredAt: p.occurredAt ?? now(),
      version: p.version ?? 1,
      metadata: p.metadata,
    });
  }
}

export class CheckoutPaymentSelectedEvent extends BaseDomainEvent<
  typeof CHECKOUT_EVENT_TYPE.PAYMENT_SELECTED,
  CheckoutPaymentSelectedPayload
> {
  constructor(p: EventParams<CheckoutPaymentSelectedPayload>) {
    super({
      id: p.id ?? newEventId(),
      type: CHECKOUT_EVENT_TYPE.PAYMENT_SELECTED,
      aggregateId: p.aggregateId,
      aggregateType: CHECKOUT_AGGREGATE_TYPE,
      payload: p.payload,
      occurredAt: p.occurredAt ?? now(),
      version: p.version ?? 1,
      metadata: p.metadata,
    });
  }
}

export class CheckoutStepChangedEvent extends BaseDomainEvent<
  typeof CHECKOUT_EVENT_TYPE.STEP_CHANGED,
  CheckoutStepChangedPayload
> {
  constructor(p: EventParams<CheckoutStepChangedPayload>) {
    super({
      id: p.id ?? newEventId(),
      type: CHECKOUT_EVENT_TYPE.STEP_CHANGED,
      aggregateId: p.aggregateId,
      aggregateType: CHECKOUT_AGGREGATE_TYPE,
      payload: p.payload,
      occurredAt: p.occurredAt ?? now(),
      version: p.version ?? 1,
      metadata: p.metadata,
    });
  }
}

export class CheckoutCompletedEvent extends BaseDomainEvent<
  typeof CHECKOUT_EVENT_TYPE.COMPLETED,
  CheckoutCompletedPayload
> {
  constructor(p: EventParams<CheckoutCompletedPayload>) {
    super({
      id: p.id ?? newEventId(),
      type: CHECKOUT_EVENT_TYPE.COMPLETED,
      aggregateId: p.aggregateId,
      aggregateType: CHECKOUT_AGGREGATE_TYPE,
      payload: p.payload,
      occurredAt: p.occurredAt ?? now(),
      version: p.version ?? 1,
      metadata: p.metadata,
    });
  }
}

export class CheckoutAbandonedEvent extends BaseDomainEvent<
  typeof CHECKOUT_EVENT_TYPE.ABANDONED,
  CheckoutAbandonedPayload
> {
  constructor(p: EventParams<CheckoutAbandonedPayload>) {
    super({
      id: p.id ?? newEventId(),
      type: CHECKOUT_EVENT_TYPE.ABANDONED,
      aggregateId: p.aggregateId,
      aggregateType: CHECKOUT_AGGREGATE_TYPE,
      payload: p.payload,
      occurredAt: p.occurredAt ?? now(),
      version: p.version ?? 1,
      metadata: p.metadata,
    });
  }
}

export class CheckoutExpiredEvent extends BaseDomainEvent<
  typeof CHECKOUT_EVENT_TYPE.EXPIRED,
  CheckoutExpiredPayload
> {
  constructor(p: EventParams<CheckoutExpiredPayload>) {
    super({
      id: p.id ?? newEventId(),
      type: CHECKOUT_EVENT_TYPE.EXPIRED,
      aggregateId: p.aggregateId,
      aggregateType: CHECKOUT_AGGREGATE_TYPE,
      payload: p.payload,
      occurredAt: p.occurredAt ?? now(),
      version: p.version ?? 1,
      metadata: p.metadata,
    });
  }
}

export class CheckoutFailedEvent extends BaseDomainEvent<
  typeof CHECKOUT_EVENT_TYPE.FAILED,
  CheckoutFailedPayload
> {
  constructor(p: EventParams<CheckoutFailedPayload>) {
    super({
      id: p.id ?? newEventId(),
      type: CHECKOUT_EVENT_TYPE.FAILED,
      aggregateId: p.aggregateId,
      aggregateType: CHECKOUT_AGGREGATE_TYPE,
      payload: p.payload,
      occurredAt: p.occurredAt ?? now(),
      version: p.version ?? 1,
      metadata: p.metadata,
    });
  }
}
