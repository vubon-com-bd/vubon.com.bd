/**
 * Saved-for-later domain events
 * @module cart-service/domain/events
 */
import { BaseDomainEvent } from '@vubon/shared-kernel/domain/base/base.event';
import type { DomainEventMetadata } from '@vubon/shared-kernel/domain/base/base.event';
import type { Timestamp } from '@vubon/shared-types/common';
import { SAVED_AGGREGATE_TYPE, newEventId, now } from './event.helpers.js';

export const SAVED_EVENT_TYPE = {
  SAVED: 'saved.item.saved',
  MOVED_TO_CART: 'saved.item.moved.to.cart',
  REMOVED: 'saved.item.removed',
} as const;

export interface ItemSavedPayload {
  readonly savedItemId: string;
  readonly userId: string;
  readonly productId: string;
  readonly variantId?: string;
  readonly quantity: number;
}

export interface ItemMovedToCartPayload {
  readonly savedItemId: string;
  readonly cartId: string;
  readonly productId: string;
  readonly quantity: number;
}

export interface SavedItemRemovedPayload {
  readonly savedItemId: string;
  readonly userId: string;
  readonly productId: string;
}

type EventParams<TPayload> = {
  id?: string;
  aggregateId: string;
  payload: TPayload;
  occurredAt?: Timestamp;
  version?: number;
  metadata?: DomainEventMetadata;
};

export class ItemSavedForLaterEvent extends BaseDomainEvent<
  typeof SAVED_EVENT_TYPE.SAVED,
  ItemSavedPayload
> {
  constructor(p: EventParams<ItemSavedPayload>) {
    super({
      id: p.id ?? newEventId(),
      type: SAVED_EVENT_TYPE.SAVED,
      aggregateId: p.aggregateId,
      aggregateType: SAVED_AGGREGATE_TYPE,
      payload: p.payload,
      occurredAt: p.occurredAt ?? now(),
      version: p.version ?? 1,
      metadata: p.metadata,
    });
  }
}

export class ItemMovedToCartEvent extends BaseDomainEvent<
  typeof SAVED_EVENT_TYPE.MOVED_TO_CART,
  ItemMovedToCartPayload
> {
  constructor(p: EventParams<ItemMovedToCartPayload>) {
    super({
      id: p.id ?? newEventId(),
      type: SAVED_EVENT_TYPE.MOVED_TO_CART,
      aggregateId: p.aggregateId,
      aggregateType: SAVED_AGGREGATE_TYPE,
      payload: p.payload,
      occurredAt: p.occurredAt ?? now(),
      version: p.version ?? 1,
      metadata: p.metadata,
    });
  }
}

export class SavedItemRemovedEvent extends BaseDomainEvent<
  typeof SAVED_EVENT_TYPE.REMOVED,
  SavedItemRemovedPayload
> {
  constructor(p: EventParams<SavedItemRemovedPayload>) {
    super({
      id: p.id ?? newEventId(),
      type: SAVED_EVENT_TYPE.REMOVED,
      aggregateId: p.aggregateId,
      aggregateType: SAVED_AGGREGATE_TYPE,
      payload: p.payload,
      occurredAt: p.occurredAt ?? now(),
      version: p.version ?? 1,
      metadata: p.metadata,
    });
  }
}
