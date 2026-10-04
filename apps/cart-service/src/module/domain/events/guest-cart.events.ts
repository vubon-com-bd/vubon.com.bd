/**
 * Guest cart domain events
 * @module cart-service/domain/events
 */
import { BaseDomainEvent } from '@vubon/shared-kernel/domain/base/base.event';
import type { DomainEventMetadata } from '@vubon/shared-kernel/domain/base/base.event';
import type { Timestamp } from '@vubon/shared-types/common';
import { GUEST_CART_AGGREGATE_TYPE, newEventId, now } from './event.helpers.js';

export const GUEST_CART_EVENT_TYPE = {
  CREATED: 'guest.cart.created',
  MERGED: 'guest.cart.merged',
  EXPIRED: 'guest.cart.expired',
} as const;

export interface GuestCartCreatedPayload {
  readonly guestCartId: string;
  readonly token: string;
  readonly expiresAt: string;
}

export interface GuestCartMergedPayload {
  readonly guestCartId: string;
  readonly targetCartId: string;
  readonly userId: string;
  readonly itemsMerged: number;
}

export interface GuestCartExpiredPayload {
  readonly guestCartId: string;
  readonly token: string;
  readonly itemCount: number;
}

type EventParams<TPayload> = {
  id?: string;
  aggregateId: string;
  payload: TPayload;
  occurredAt?: Timestamp;
  version?: number;
  metadata?: DomainEventMetadata;
};

export class GuestCartCreatedEvent extends BaseDomainEvent<
  typeof GUEST_CART_EVENT_TYPE.CREATED,
  GuestCartCreatedPayload
> {
  constructor(p: EventParams<GuestCartCreatedPayload>) {
    super({
      id: p.id ?? newEventId(),
      type: GUEST_CART_EVENT_TYPE.CREATED,
      aggregateId: p.aggregateId,
      aggregateType: GUEST_CART_AGGREGATE_TYPE,
      payload: p.payload,
      occurredAt: p.occurredAt ?? now(),
      version: p.version ?? 1,
      metadata: p.metadata,
    });
  }
}

export class GuestCartMergedEvent extends BaseDomainEvent<
  typeof GUEST_CART_EVENT_TYPE.MERGED,
  GuestCartMergedPayload
> {
  constructor(p: EventParams<GuestCartMergedPayload>) {
    super({
      id: p.id ?? newEventId(),
      type: GUEST_CART_EVENT_TYPE.MERGED,
      aggregateId: p.aggregateId,
      aggregateType: GUEST_CART_AGGREGATE_TYPE,
      payload: p.payload,
      occurredAt: p.occurredAt ?? now(),
      version: p.version ?? 1,
      metadata: p.metadata,
    });
  }
}

export class GuestCartExpiredEvent extends BaseDomainEvent<
  typeof GUEST_CART_EVENT_TYPE.EXPIRED,
  GuestCartExpiredPayload
> {
  constructor(p: EventParams<GuestCartExpiredPayload>) {
    super({
      id: p.id ?? newEventId(),
      type: GUEST_CART_EVENT_TYPE.EXPIRED,
      aggregateId: p.aggregateId,
      aggregateType: GUEST_CART_AGGREGATE_TYPE,
      payload: p.payload,
      occurredAt: p.occurredAt ?? now(),
      version: p.version ?? 1,
      metadata: p.metadata,
    });
  }
}
