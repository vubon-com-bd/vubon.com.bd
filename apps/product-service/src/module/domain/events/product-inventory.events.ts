import { BaseDomainEvent } from '@vubon/shared-kernel/domain/base/base.event';
import { toTimestamp } from '@vubon/shared-types/common';

const AGG = 'ProductInventory';

export class InventoryUpdatedEvent extends BaseDomainEvent<
  'product.inventory.updated',
  { productId: string; quantity: number }
> {
  constructor(aggregateId: string, productId: string, quantity: number, version: number) {
    super({
      id: crypto.randomUUID(),
      type: 'product.inventory.updated',
      aggregateId,
      aggregateType: AGG,
      payload: { productId, quantity },
      occurredAt: toTimestamp(Date.now()),
      version,
    });
  }
}

export class InventoryLowEvent extends BaseDomainEvent<
  'product.inventory.low',
  { productId: string; remaining: number; threshold: number }
> {
  constructor(aggregateId: string, productId: string, remaining: number, threshold: number, version: number) {
    super({
      id: crypto.randomUUID(),
      type: 'product.inventory.low',
      aggregateId,
      aggregateType: AGG,
      payload: { productId, remaining, threshold },
      occurredAt: toTimestamp(Date.now()),
      version,
    });
  }
}

export class OutOfStockEvent extends BaseDomainEvent<
  'product.inventory.out_of_stock',
  { productId: string }
> {
  constructor(aggregateId: string, productId: string, version: number) {
    super({
      id: crypto.randomUUID(),
      type: 'product.inventory.out_of_stock',
      aggregateId,
      aggregateType: AGG,
      payload: { productId },
      occurredAt: toTimestamp(Date.now()),
      version,
    });
  }
}

export class InventoryReservedEvent extends BaseDomainEvent<
  'product.inventory.reserved',
  { productId: string; quantity: number; orderId: string }
> {
  constructor(aggregateId: string, productId: string, quantity: number, orderId: string, version: number) {
    super({
      id: crypto.randomUUID(),
      type: 'product.inventory.reserved',
      aggregateId,
      aggregateType: AGG,
      payload: { productId, quantity, orderId },
      occurredAt: toTimestamp(Date.now()),
      version,
    });
  }
}

export class InventoryReleasedEvent extends BaseDomainEvent<
  'product.inventory.released',
  { productId: string; quantity: number; orderId: string }
> {
  constructor(aggregateId: string, productId: string, quantity: number, orderId: string, version: number) {
    super({
      id: crypto.randomUUID(),
      type: 'product.inventory.released',
      aggregateId,
      aggregateType: AGG,
      payload: { productId, quantity, orderId },
      occurredAt: toTimestamp(Date.now()),
      version,
    });
  }
}
