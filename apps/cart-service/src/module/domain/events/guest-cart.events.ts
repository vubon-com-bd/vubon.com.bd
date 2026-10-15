/**
 * GuestCart Domain Events
 * @module cart-service/domain/events
 */
import { BaseDomainEvent } from '@vubon/shared-kernel/domain/base/base.event';
import type { DomainEventMetadata } from '@vubon/shared-kernel/domain/base/base.event';
import type { Timestamp } from '@vubon/shared-types/common';
import { CART_AGGREGATE_TYPE, newEventId, nowTimestamp } from './event.helpers.js';

export const GUEST_CART_EVENT_TYPE = {
  CREATED: 'cart.guest_cart.created',
  EXPIRED: 'cart.guest_cart.expired',
  MERGED: 'cart.guest_cart.merged',
  ABANDONED: 'cart.guest_cart.abandoned',
  STATUS_CHANGED: 'cart.guest_cart.status_changed',
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
    aggregateType: CART_AGGREGATE_TYPE.GUEST_CART,
    payload: p.payload,
    occurredAt: p.occurredAt ?? nowTimestamp(),
    version: p.version ?? 1,
    metadata: p.metadata,
  };
}

export class GuestCartCreatedEvent extends BaseDomainEvent<
  typeof GUEST_CART_EVENT_TYPE.CREATED,
  { guestCartId: string; token: string; createdAt: string; expiresAt: string }
> {
  constructor(
    p: EventParams<{
      guestCartId: string;
      token: string;
      createdAt: string;
      expiresAt: string;
    }>,
  ) {
    super(buildParams(GUEST_CART_EVENT_TYPE.CREATED, p));
  }
}

export class GuestCartExpiredEvent extends BaseDomainEvent<
  typeof GUEST_CART_EVENT_TYPE.EXPIRED,
  { guestCartId: string; expiredAt: string }
> {
  constructor(p: EventParams<{ guestCartId: string; expiredAt: string }>) {
    super(buildParams(GUEST_CART_EVENT_TYPE.EXPIRED, p));
  }
}

export class GuestCartMergedEvent extends BaseDomainEvent<
  typeof GUEST_CART_EVENT_TYPE.MERGED,
  { guestCartId: string; targetCartId: string; mergedAt: string }
> {
  constructor(
    p: EventParams<{ guestCartId: string; targetCartId: string; mergedAt: string }>,
  ) {
    super(buildParams(GUEST_CART_EVENT_TYPE.MERGED, p));
  }
}

export class GuestCartAbandonedEvent extends BaseDomainEvent<
  typeof GUEST_CART_EVENT_TYPE.ABANDONED,
  { guestCartId: string; abandonedAt: string }
> {
  constructor(p: EventParams<{ guestCartId: string; abandonedAt: string }>) {
    super(buildParams(GUEST_CART_EVENT_TYPE.ABANDONED, p));
  }
}

export class GuestCartStatusChangedEvent extends BaseDomainEvent<
  typeof GUEST_CART_EVENT_TYPE.STATUS_CHANGED,
  { guestCartId: string; fromStatus: string; toStatus: string }
> {
  constructor(
    p: EventParams<{ guestCartId: string; fromStatus: string; toStatus: string }>,
  ) {
    super(buildParams(GUEST_CART_EVENT_TYPE.STATUS_CHANGED, p));
  }
}
