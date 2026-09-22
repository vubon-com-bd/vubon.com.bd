import { BaseDomainEvent, type DomainEventMetadata } from '@vubon/shared-kernel/domain/base/base.event';
import { toTimestamp } from '@vubon/shared-types/common';

const AGG = 'CartItem';

export class ItemAddedEvent extends BaseDomainEvent<'cart.item.added', { cartId: string; itemId: string; productId: string; quantity: number }> {
  constructor(cartId: string, itemId: string, productId: string, quantity: number, version: number, metadata?: DomainEventMetadata) {
    super({ id: crypto.randomUUID(), type: 'cart.item.added', aggregateId: cartId, aggregateType: AGG, payload: { cartId, itemId, productId, quantity }, occurredAt: toTimestamp(Date.now()), version, metadata });
  }
}

export class ItemUpdatedEvent extends BaseDomainEvent<'cart.item.updated', { cartId: string; itemId: string; quantity: number }> {
  constructor(cartId: string, itemId: string, quantity: number, version: number, metadata?: DomainEventMetadata) {
    super({ id: crypto.randomUUID(), type: 'cart.item.updated', aggregateId: cartId, aggregateType: AGG, payload: { cartId, itemId, quantity }, occurredAt: toTimestamp(Date.now()), version, metadata });
  }
}

export class ItemRemovedEvent extends BaseDomainEvent<'cart.item.removed', { cartId: string; itemId: string }> {
  constructor(cartId: string, itemId: string, version: number, metadata?: DomainEventMetadata) {
    super({ id: crypto.randomUUID(), type: 'cart.item.removed', aggregateId: cartId, aggregateType: AGG, payload: { cartId, itemId }, occurredAt: toTimestamp(Date.now()), version, metadata });
  }
}

export class ItemQuantityChangedEvent extends BaseDomainEvent<'cart.item.quantity_changed', { cartId: string; itemId: string; quantity: number }> {
  constructor(cartId: string, itemId: string, quantity: number, version: number, metadata?: DomainEventMetadata) {
    super({ id: crypto.randomUUID(), type: 'cart.item.quantity_changed', aggregateId: cartId, aggregateType: AGG, payload: { cartId, itemId, quantity }, occurredAt: toTimestamp(Date.now()), version, metadata });
  }
}

export class ItemSelectedEvent extends BaseDomainEvent<'cart.item.selected', { cartId: string; itemId: string; selected: boolean }> {
  constructor(cartId: string, itemId: string, selected: boolean, version: number, metadata?: DomainEventMetadata) {
    super({ id: crypto.randomUUID(), type: 'cart.item.selected', aggregateId: cartId, aggregateType: AGG, payload: { cartId, itemId, selected }, occurredAt: toTimestamp(Date.now()), version, metadata });
  }
}
