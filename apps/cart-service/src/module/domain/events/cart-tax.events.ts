import { BaseDomainEvent, type DomainEventMetadata } from '@vubon/shared-kernel/domain/base/base.event';
import { toTimestamp } from '@vubon/shared-types/common';

const AGG = 'CartTax';

export class TaxCalculatedEvent extends BaseDomainEvent<'cart.tax.calculated', { cartId: string; amount: number }> {
  constructor(cartId: string, amount: number, version: number, metadata?: DomainEventMetadata) {
    super({ id: crypto.randomUUID(), type: 'cart.tax.calculated', aggregateId: cartId, aggregateType: AGG, payload: { cartId, amount }, occurredAt: toTimestamp(Date.now()), version, metadata });
  }
}

export class CartPriceChangedEvent extends BaseDomainEvent<'cart.price_changed', { cartId: string; oldTotal: number; newTotal: number }> {
  constructor(cartId: string, oldTotal: number, newTotal: number, version: number, metadata?: DomainEventMetadata) {
    super({ id: crypto.randomUUID(), type: 'cart.price_changed', aggregateId: cartId, aggregateType: AGG, payload: { cartId, oldTotal, newTotal }, occurredAt: toTimestamp(Date.now()), version, metadata });
  }
}
