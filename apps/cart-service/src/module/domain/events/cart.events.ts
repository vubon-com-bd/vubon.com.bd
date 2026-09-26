import { BaseDomainEvent, type DomainEventMetadata } from '@vubon/shared-kernel/domain/base/base.event';
import { toTimestamp } from '@vubon/shared-types/common';

const AGG = 'Cart';

export class CartCreatedEvent extends BaseDomainEvent<'cart.created', { cartId: string; userId: string | null; type: string }> {
  constructor(cartId: string, userId: string | null, type: string, version: number, metadata?: DomainEventMetadata) {
    super({ id: crypto.randomUUID(), type: 'cart.created', aggregateId: cartId, aggregateType: AGG, payload: { cartId, userId, type }, occurredAt: toTimestamp(Date.now()), version, metadata });
  }
}

export class CartUpdatedEvent extends BaseDomainEvent<'cart.updated', { cartId: string; itemCount: number }> {
  constructor(cartId: string, itemCount: number, version: number, metadata?: DomainEventMetadata) {
    super({ id: crypto.randomUUID(), type: 'cart.updated', aggregateId: cartId, aggregateType: AGG, payload: { cartId, itemCount }, occurredAt: toTimestamp(Date.now()), version, metadata });
  }
}

export class CartClearedEvent extends BaseDomainEvent<'cart.cleared', { cartId: string }> {
  constructor(cartId: string, version: number, metadata?: DomainEventMetadata) {
    super({ id: crypto.randomUUID(), type: 'cart.cleared', aggregateId: cartId, aggregateType: AGG, payload: { cartId }, occurredAt: toTimestamp(Date.now()), version, metadata });
  }
}

export class CartDeletedEvent extends BaseDomainEvent<'cart.deleted', { cartId: string }> {
  constructor(cartId: string, version: number, metadata?: DomainEventMetadata) {
    super({ id: crypto.randomUUID(), type: 'cart.deleted', aggregateId: cartId, aggregateType: AGG, payload: { cartId }, occurredAt: toTimestamp(Date.now()), version, metadata });
  }
}
