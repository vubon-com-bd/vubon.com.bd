/**
 * Inventory domain events
 * @module product-service/domain/events
 */
import { BaseDomainEvent } from '@vubon/shared-kernel/domain/base/base.event';
import type { DomainEventMetadata } from '@vubon/shared-kernel/domain/base/base.event';
import type { Timestamp } from '@vubon/shared-types/common';
import { INVENTORY_AGGREGATE_TYPE, newEventId, now } from './event.helpers.js';

export const INVENTORY_EVENT_TYPE = {
  ADJUSTED: 'inventory.adjusted',
  STOCK_RESERVED: 'inventory.stock.reserved',
  STOCK_RELEASED: 'inventory.stock.released',
  STOCK_RESTOCKED: 'inventory.stock.restocked',
  LOW_STOCK_ALERT: 'inventory.low_stock',
  OUT_OF_STOCK_ALERT: 'inventory.out_of_stock',
  BACK_IN_STOCK: 'inventory.back_in_stock',
} as const;

export interface InventoryAdjustedPayload {
  readonly inventoryId: string;
  readonly productId: string;
  readonly variantId?: string;
  readonly oldQuantity: number;
  readonly newQuantity: number;
  readonly delta: number;
  readonly reason: string;
  readonly adjustedBy: string;
}

export interface StockReservedPayload {
  readonly inventoryId: string;
  readonly productId: string;
  readonly variantId?: string;
  readonly amount: number;
  readonly reservedTotal: number;
  readonly reference: string;
}

export interface StockReleasedPayload {
  readonly inventoryId: string;
  readonly productId: string;
  readonly variantId?: string;
  readonly amount: number;
  readonly reservedTotal: number;
  readonly reason: string;
}

export interface StockRestockedPayload {
  readonly inventoryId: string;
  readonly productId: string;
  readonly variantId?: string;
  readonly amount: number;
  readonly newQuantity: number;
  readonly restockedAt: string;
}

export interface LowStockAlertPayload {
  readonly inventoryId: string;
  readonly productId: string;
  readonly variantId?: string;
  readonly currentStock: number;
  readonly threshold: number;
}

export interface OutOfStockAlertPayload {
  readonly inventoryId: string;
  readonly productId: string;
  readonly variantId?: string;
  readonly lastQuantity: number;
}

type EventParams<TPayload> = {
  id?: string;
  aggregateId: string;
  payload: TPayload;
  occurredAt?: Timestamp;
  version?: number;
  metadata?: DomainEventMetadata;
};

export class InventoryAdjustedEvent extends BaseDomainEvent<
  typeof INVENTORY_EVENT_TYPE.ADJUSTED,
  InventoryAdjustedPayload
> {
  constructor(p: EventParams<InventoryAdjustedPayload>) {
    super({
      id: p.id ?? newEventId(),
      type: INVENTORY_EVENT_TYPE.ADJUSTED,
      aggregateId: p.aggregateId,
      aggregateType: INVENTORY_AGGREGATE_TYPE,
      payload: p.payload,
      occurredAt: p.occurredAt ?? now(),
      version: p.version ?? 1,
      metadata: p.metadata,
    });
  }
}

export class StockReservedEvent extends BaseDomainEvent<
  typeof INVENTORY_EVENT_TYPE.STOCK_RESERVED,
  StockReservedPayload
> {
  constructor(p: EventParams<StockReservedPayload>) {
    super({
      id: p.id ?? newEventId(),
      type: INVENTORY_EVENT_TYPE.STOCK_RESERVED,
      aggregateId: p.aggregateId,
      aggregateType: INVENTORY_AGGREGATE_TYPE,
      payload: p.payload,
      occurredAt: p.occurredAt ?? now(),
      version: p.version ?? 1,
      metadata: p.metadata,
    });
  }
}

export class StockReleasedEvent extends BaseDomainEvent<
  typeof INVENTORY_EVENT_TYPE.STOCK_RELEASED,
  StockReleasedPayload
> {
  constructor(p: EventParams<StockReleasedPayload>) {
    super({
      id: p.id ?? newEventId(),
      type: INVENTORY_EVENT_TYPE.STOCK_RELEASED,
      aggregateId: p.aggregateId,
      aggregateType: INVENTORY_AGGREGATE_TYPE,
      payload: p.payload,
      occurredAt: p.occurredAt ?? now(),
      version: p.version ?? 1,
      metadata: p.metadata,
    });
  }
}

export class StockRestockedEvent extends BaseDomainEvent<
  typeof INVENTORY_EVENT_TYPE.STOCK_RESTOCKED,
  StockRestockedPayload
> {
  constructor(p: EventParams<StockRestockedPayload>) {
    super({
      id: p.id ?? newEventId(),
      type: INVENTORY_EVENT_TYPE.STOCK_RESTOCKED,
      aggregateId: p.aggregateId,
      aggregateType: INVENTORY_AGGREGATE_TYPE,
      payload: p.payload,
      occurredAt: p.occurredAt ?? now(),
      version: p.version ?? 1,
      metadata: p.metadata,
    });
  }
}

export class LowStockAlertEvent extends BaseDomainEvent<
  typeof INVENTORY_EVENT_TYPE.LOW_STOCK_ALERT,
  LowStockAlertPayload
> {
  constructor(p: EventParams<LowStockAlertPayload>) {
    super({
      id: p.id ?? newEventId(),
      type: INVENTORY_EVENT_TYPE.LOW_STOCK_ALERT,
      aggregateId: p.aggregateId,
      aggregateType: INVENTORY_AGGREGATE_TYPE,
      payload: p.payload,
      occurredAt: p.occurredAt ?? now(),
      version: p.version ?? 1,
      metadata: p.metadata,
    });
  }
}

export class OutOfStockAlertEvent extends BaseDomainEvent<
  typeof INVENTORY_EVENT_TYPE.OUT_OF_STOCK_ALERT,
  OutOfStockAlertPayload
> {
  constructor(p: EventParams<OutOfStockAlertPayload>) {
    super({
      id: p.id ?? newEventId(),
      type: INVENTORY_EVENT_TYPE.OUT_OF_STOCK_ALERT,
      aggregateId: p.aggregateId,
      aggregateType: INVENTORY_AGGREGATE_TYPE,
      payload: p.payload,
      occurredAt: p.occurredAt ?? now(),
      version: p.version ?? 1,
      metadata: p.metadata,
    });
  }
}

export class InventoryBackInStockEvent extends BaseDomainEvent<
  typeof INVENTORY_EVENT_TYPE.BACK_IN_STOCK,
  StockRestockedPayload
> {
  constructor(p: EventParams<StockRestockedPayload>) {
    super({
      id: p.id ?? newEventId(),
      type: INVENTORY_EVENT_TYPE.BACK_IN_STOCK,
      aggregateId: p.aggregateId,
      aggregateType: INVENTORY_AGGREGATE_TYPE,
      payload: p.payload,
      occurredAt: p.occurredAt ?? now(),
      version: p.version ?? 1,
      metadata: p.metadata,
    });
  }
}
