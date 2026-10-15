/**
 * SavedForLater Domain Events
 * @module cart-service/domain/events
 */
import { BaseDomainEvent } from '@vubon/shared-kernel/domain/base/base.event';
import type { DomainEventMetadata } from '@vubon/shared-kernel/domain/base/base.event';
import type { Timestamp } from '@vubon/shared-types/common';
import { CART_AGGREGATE_TYPE, newEventId, nowTimestamp } from './event.helpers.js';

export const SAVED_FOR_LATER_EVENT_TYPE = {
  SAVED: 'cart.saved_for_later.saved',
  MOVED_TO_CART: 'cart.saved_for_later.moved_to_cart',
  REMOVED: 'cart.saved_for_later.removed',
  STATUS_CHANGED: 'cart.saved_for_later.status_changed',
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
    aggregateType: CART_AGGREGATE_TYPE.SAVED_FOR_LATER,
    payload: p.payload,
    occurredAt: p.occurredAt ?? nowTimestamp(),
    version: p.version ?? 1,
    metadata: p.metadata,
  };
}

export class SavedForLaterItemSavedEvent extends BaseDomainEvent<
  typeof SAVED_FOR_LATER_EVENT_TYPE.SAVED,
  { savedItemId: string; cartId: string; productId: string; savedAt: string }
> {
  constructor(
    p: EventParams<{ savedItemId: string; cartId: string; productId: string; savedAt: string }>,
  ) {
    super(buildParams(SAVED_FOR_LATER_EVENT_TYPE.SAVED, p));
  }
}

export class SavedForLaterItemMovedEvent extends BaseDomainEvent<
  typeof SAVED_FOR_LATER_EVENT_TYPE.MOVED_TO_CART,
  { savedItemId: string; cartId: string; itemId: string }
> {
  constructor(p: EventParams<{ savedItemId: string; cartId: string; itemId: string }>) {
    super(buildParams(SAVED_FOR_LATER_EVENT_TYPE.MOVED_TO_CART, p));
  }
}

export class SavedForLaterItemRemovedEvent extends BaseDomainEvent<
  typeof SAVED_FOR_LATER_EVENT_TYPE.REMOVED,
  { savedItemId: string; reason?: string }
> {
  constructor(p: EventParams<{ savedItemId: string; reason?: string }>) {
    super(buildParams(SAVED_FOR_LATER_EVENT_TYPE.REMOVED, p));
  }
}

export class SavedForLaterStatusChangedEvent extends BaseDomainEvent<
  typeof SAVED_FOR_LATER_EVENT_TYPE.STATUS_CHANGED,
  { savedItemId: string; fromStatus: string; toStatus: string }
> {
  constructor(
    p: EventParams<{ savedItemId: string; fromStatus: string; toStatus: string }>,
  ) {
    super(buildParams(SAVED_FOR_LATER_EVENT_TYPE.STATUS_CHANGED, p));
  }
}
