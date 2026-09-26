import { BaseDomainEvent, type DomainEventMetadata } from '@vubon/shared-kernel/domain/base/base.event';
import { toTimestamp } from '@vubon/shared-types/common';

const AGG = 'SavedForLater';

export class ItemSavedForLaterEvent extends BaseDomainEvent<'cart.item.saved_for_later', { savedItemId: string; userId: string; productId: string }> {
  constructor(savedItemId: string, userId: string, productId: string, version: number, metadata?: DomainEventMetadata) {
    super({ id: crypto.randomUUID(), type: 'cart.item.saved_for_later', aggregateId: savedItemId, aggregateType: AGG, payload: { savedItemId, userId, productId }, occurredAt: toTimestamp(Date.now()), version, metadata });
  }
}

export class ItemMovedToCartEvent extends BaseDomainEvent<'cart.item.moved_to_cart', { savedItemId: string; userId: string; productId: string }> {
  constructor(savedItemId: string, userId: string, productId: string, version: number, metadata?: DomainEventMetadata) {
    super({ id: crypto.randomUUID(), type: 'cart.item.moved_to_cart', aggregateId: savedItemId, aggregateType: AGG, payload: { savedItemId, userId, productId }, occurredAt: toTimestamp(Date.now()), version, metadata });
  }
}

export class SavedItemRemovedEvent extends BaseDomainEvent<'cart.item.saved_removed', { savedItemId: string; userId: string }> {
  constructor(savedItemId: string, userId: string, version: number, metadata?: DomainEventMetadata) {
    super({ id: crypto.randomUUID(), type: 'cart.item.saved_removed', aggregateId: savedItemId, aggregateType: AGG, payload: { savedItemId, userId }, occurredAt: toTimestamp(Date.now()), version, metadata });
  }
}
