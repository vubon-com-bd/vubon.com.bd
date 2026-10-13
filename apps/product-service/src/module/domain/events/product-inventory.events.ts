/**
 * Product Inventory Domain Events
 * @module product-service/domain/events
 */
import { BaseDomainEvent } from '@vubon/shared-kernel/domain/base/base.event';
import type { DomainEventMetadata } from '@vubon/shared-kernel/domain/base/base.event';
import type { Timestamp } from '@vubon/shared-types/common';
import { PRODUCT_AGGREGATE_TYPE, newEventId, now } from './event.helpers.js';

export const INVENTORY_EVENT_TYPE = {
  ADJUSTED: 'product.inventory.adjusted',
  RESERVED: 'product.inventory.reserved',
  RELEASED: 'product.inventory.released',
  RESTOCKED: 'product.inventory.restocked',
  LOW_STOCK_ALERT: 'product.inventory.low_stock_alert',
  OUT_OF_STOCK: 'product.inventory.out_of_stock',
} as const;

export interface InventoryAdjustedPayload {
  readonly inventoryId: string;
  readonly productId: string;
  readonly previousQuantity: number;
  readonly newQuantity: number;
  readonly delta: number;
  readonly reason: string;
  readonly adjustedBy: string;
}

export interface InventoryReservedPayload {
  readonly inventoryId: string;
  readonly productId: string;
  readonly reservedQuantity: number;
  readonly referenceId: string;
}

export interface InventoryReleasedPayload {
  readonly inventoryId: string;
  readonly productId: string;
  readonly releasedQuantity: number;
  readonly referenceId: string;
}

export interface InventoryRestockedPayload {
  readonly inventoryId: string;
  readonly productId: string;
  readonly restockedQuantity: number;
  readonly restockedAt: string;
}

export interface InventoryLowStockAlertPayload {
  readonly inventoryId: string;
  readonly productId: string;
  readonly currentStock: number;
  readonly threshold: number;
}

export interface InventoryOutOfStockPayload {
  readonly inventoryId: string;
  readonly productId: string;
  readonly previousStock: number;
}

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
    aggregateType: PRODUCT_AGGREGATE_TYPE.INVENTORY,
    payload: p.payload,
    occurredAt: p.occurredAt ?? now(),
    version: p.version ?? 1,
    metadata: p.metadata,
  };
}

export class InventoryAdjustedEvent extends BaseDomainEvent<
  typeof INVENTORY_EVENT_TYPE.ADJUSTED,
  InventoryAdjustedPayload
> {
  constructor(p: EventParams<InventoryAdjustedPayload>) {
    super(buildParams(INVENTORY_EVENT_TYPE.ADJUSTED, p));
  }
}

export class InventoryReservedEvent extends BaseDomainEvent<
  typeof INVENTORY_EVENT_TYPE.RESERVED,
  InventoryReservedPayload
> {
  constructor(p: EventParams<InventoryReservedPayload>) {
    super(buildParams(INVENTORY_EVENT_TYPE.RESERVED, p));
  }
}

export class InventoryReleasedEvent extends BaseDomainEvent<
  typeof INVENTORY_EVENT_TYPE.RELEASED,
  InventoryReleasedPayload
> {
  constructor(p: EventParams<InventoryReleasedPayload>) {
    super(buildParams(INVENTORY_EVENT_TYPE.RELEASED, p));
  }
}

export class InventoryRestockedEvent extends BaseDomainEvent<
  typeof INVENTORY_EVENT_TYPE.RESTOCKED,
  InventoryRestockedPayload
> {
  constructor(p: EventParams<InventoryRestockedPayload>) {
    super(buildParams(INVENTORY_EVENT_TYPE.RESTOCKED, p));
  }
}

export class InventoryLowStockAlertEvent extends BaseDomainEvent<
  typeof INVENTORY_EVENT_TYPE.LOW_STOCK_ALERT,
  InventoryLowStockAlertPayload
> {
  constructor(p: EventParams<InventoryLowStockAlertPayload>) {
    super(buildParams(INVENTORY_EVENT_TYPE.LOW_STOCK_ALERT, p));
  }
}

export class InventoryOutOfStockEvent extends BaseDomainEvent<
  typeof INVENTORY_EVENT_TYPE.OUT_OF_STOCK,
  InventoryOutOfStockPayload
> {
  constructor(p: EventParams<InventoryOutOfStockPayload>) {
    super(buildParams(INVENTORY_EVENT_TYPE.OUT_OF_STOCK, p));
  }
}
