/**
 * Cart domain events
 * @module cart-service/domain/events
 */
import { BaseDomainEvent } from '@vubon/shared-kernel/domain/base/base.event';
import type { DomainEventMetadata } from '@vubon/shared-kernel/domain/base/base.event';
import type { Timestamp } from '@vubon/shared-types/common';
import { CART_AGGREGATE_TYPE, newEventId, now } from './event.helpers.js';

export const CART_EVENT_TYPE = {
  CREATED: 'cart.created',
  UPDATED: 'cart.updated',
  CLEARED: 'cart.cleared',
  DELETED: 'cart.deleted',
  ABANDONED: 'cart.abandoned',
  RECOVERED: 'cart.recovered',
  EXPIRED: 'cart.expired',
  STATUS_CHANGED: 'cart.status.changed',
  PRICE_CHANGED: 'cart.price.changed',
} as const;

export interface CartCreatedPayload {
  readonly cartId: string;
  readonly type: string;
  readonly userId?: string;
  readonly sessionId?: string;
  readonly currency: string;
}

export interface CartUpdatedPayload {
  readonly cartId: string;
  readonly changedFields: readonly string[];
}

export interface CartClearedPayload {
  readonly cartId: string;
  readonly itemsRemoved: number;
  readonly clearedBy?: string;
}

export interface CartDeletedPayload {
  readonly cartId: string;
  readonly deletedBy?: string;
  readonly reason?: string;
}

export interface CartAbandonedPayload {
  readonly cartId: string;
  readonly abandonedAt: string;
  readonly itemCount: number;
  readonly cartValue: number;
  readonly currency: string;
  readonly userId?: string;
}

export interface CartRecoveredPayload {
  readonly cartId: string;
  readonly recoveredAt: string;
  readonly recoveredBy?: string;
  readonly channel?: string;
}

export interface CartExpiredPayload {
  readonly cartId: string;
  readonly expiredAt: string;
  readonly lastActivityAt: string;
}

export interface CartStatusChangedPayload {
  readonly cartId: string;
  readonly fromStatus: string;
  readonly toStatus: string;
  readonly changedBy?: string;
}

export interface CartPriceChangedPayload {
  readonly cartId: string;
  readonly oldTotal: number;
  readonly newTotal: number;
  readonly currency: string;
}

type EventParams<TPayload> = {
  id?: string;
  aggregateId: string;
  payload: TPayload;
  occurredAt?: Timestamp;
  version?: number;
  metadata?: DomainEventMetadata;
};

export class CartCreatedEvent extends BaseDomainEvent<
  typeof CART_EVENT_TYPE.CREATED,
  CartCreatedPayload
> {
  constructor(p: EventParams<CartCreatedPayload>) {
    super({
      id: p.id ?? newEventId(),
      type: CART_EVENT_TYPE.CREATED,
      aggregateId: p.aggregateId,
      aggregateType: CART_AGGREGATE_TYPE,
      payload: p.payload,
      occurredAt: p.occurredAt ?? now(),
      version: p.version ?? 1,
      metadata: p.metadata,
    });
  }
}

export class CartUpdatedEvent extends BaseDomainEvent<
  typeof CART_EVENT_TYPE.UPDATED,
  CartUpdatedPayload
> {
  constructor(p: EventParams<CartUpdatedPayload>) {
    super({
      id: p.id ?? newEventId(),
      type: CART_EVENT_TYPE.UPDATED,
      aggregateId: p.aggregateId,
      aggregateType: CART_AGGREGATE_TYPE,
      payload: p.payload,
      occurredAt: p.occurredAt ?? now(),
      version: p.version ?? 1,
      metadata: p.metadata,
    });
  }
}

export class CartClearedEvent extends BaseDomainEvent<
  typeof CART_EVENT_TYPE.CLEARED,
  CartClearedPayload
> {
  constructor(p: EventParams<CartClearedPayload>) {
    super({
      id: p.id ?? newEventId(),
      type: CART_EVENT_TYPE.CLEARED,
      aggregateId: p.aggregateId,
      aggregateType: CART_AGGREGATE_TYPE,
      payload: p.payload,
      occurredAt: p.occurredAt ?? now(),
      version: p.version ?? 1,
      metadata: p.metadata,
    });
  }
}

export class CartDeletedEvent extends BaseDomainEvent<
  typeof CART_EVENT_TYPE.DELETED,
  CartDeletedPayload
> {
  constructor(p: EventParams<CartDeletedPayload>) {
    super({
      id: p.id ?? newEventId(),
      type: CART_EVENT_TYPE.DELETED,
      aggregateId: p.aggregateId,
      aggregateType: CART_AGGREGATE_TYPE,
      payload: p.payload,
      occurredAt: p.occurredAt ?? now(),
      version: p.version ?? 1,
      metadata: p.metadata,
    });
  }
}

export class CartAbandonedEvent extends BaseDomainEvent<
  typeof CART_EVENT_TYPE.ABANDONED,
  CartAbandonedPayload
> {
  constructor(p: EventParams<CartAbandonedPayload>) {
    super({
      id: p.id ?? newEventId(),
      type: CART_EVENT_TYPE.ABANDONED,
      aggregateId: p.aggregateId,
      aggregateType: CART_AGGREGATE_TYPE,
      payload: p.payload,
      occurredAt: p.occurredAt ?? now(),
      version: p.version ?? 1,
      metadata: p.metadata,
    });
  }
}

export class CartRecoveredEvent extends BaseDomainEvent<
  typeof CART_EVENT_TYPE.RECOVERED,
  CartRecoveredPayload
> {
  constructor(p: EventParams<CartRecoveredPayload>) {
    super({
      id: p.id ?? newEventId(),
      type: CART_EVENT_TYPE.RECOVERED,
      aggregateId: p.aggregateId,
      aggregateType: CART_AGGREGATE_TYPE,
      payload: p.payload,
      occurredAt: p.occurredAt ?? now(),
      version: p.version ?? 1,
      metadata: p.metadata,
    });
  }
}

export class CartExpiredEvent extends BaseDomainEvent<
  typeof CART_EVENT_TYPE.EXPIRED,
  CartExpiredPayload
> {
  constructor(p: EventParams<CartExpiredPayload>) {
    super({
      id: p.id ?? newEventId(),
      type: CART_EVENT_TYPE.EXPIRED,
      aggregateId: p.aggregateId,
      aggregateType: CART_AGGREGATE_TYPE,
      payload: p.payload,
      occurredAt: p.occurredAt ?? now(),
      version: p.version ?? 1,
      metadata: p.metadata,
    });
  }
}

export class CartStatusChangedEvent extends BaseDomainEvent<
  typeof CART_EVENT_TYPE.STATUS_CHANGED,
  CartStatusChangedPayload
> {
  constructor(p: EventParams<CartStatusChangedPayload>) {
    super({
      id: p.id ?? newEventId(),
      type: CART_EVENT_TYPE.STATUS_CHANGED,
      aggregateId: p.aggregateId,
      aggregateType: CART_AGGREGATE_TYPE,
      payload: p.payload,
      occurredAt: p.occurredAt ?? now(),
      version: p.version ?? 1,
      metadata: p.metadata,
    });
  }
}

export class CartPriceChangedEvent extends BaseDomainEvent<
  typeof CART_EVENT_TYPE.PRICE_CHANGED,
  CartPriceChangedPayload
> {
  constructor(p: EventParams<CartPriceChangedPayload>) {
    super({
      id: p.id ?? newEventId(),
      type: CART_EVENT_TYPE.PRICE_CHANGED,
      aggregateId: p.aggregateId,
      aggregateType: CART_AGGREGATE_TYPE,
      payload: p.payload,
      occurredAt: p.occurredAt ?? now(),
      version: p.version ?? 1,
      metadata: p.metadata,
    });
  }
}
