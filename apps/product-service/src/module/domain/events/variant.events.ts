/**
 * Variant domain events
 * @module product-service/domain/events
 */
import { BaseDomainEvent } from '@vubon/shared-kernel/domain/base/base.event';
import type { DomainEventMetadata } from '@vubon/shared-kernel/domain/base/base.event';
import type { Timestamp } from '@vubon/shared-types/common';
import { VARIANT_AGGREGATE_TYPE, newEventId, now } from './event.helpers.js';

export const VARIANT_EVENT_TYPE = {
  ADDED: 'variant.added',
  UPDATED: 'variant.updated',
  REMOVED: 'variant.removed',
  STOCK_CHANGED: 'variant.stock.changed',
  SKU_CHANGED: 'variant.sku.changed',
  OUT_OF_STOCK: 'variant.out_of_stock',
  BACK_IN_STOCK: 'variant.back_in_stock',
} as const;

export interface VariantAddedPayload {
  readonly variantId: string;
  readonly productId: string;
  readonly name: string;
  readonly sku: string;
  readonly price: number;
  readonly stock: number;
  readonly options: readonly { readonly name: string; readonly value: string }[];
}

export interface VariantUpdatedPayload {
  readonly variantId: string;
  readonly productId: string;
  readonly changedFields: readonly string[];
}

export interface VariantRemovedPayload {
  readonly variantId: string;
  readonly productId: string;
  readonly removedBy: string;
}

export interface VariantStockChangedPayload {
  readonly variantId: string;
  readonly productId: string;
  readonly oldStock: number;
  readonly newStock: number;
  readonly delta: number;
  readonly reason: string;
}

export interface VariantSkuChangedPayload {
  readonly variantId: string;
  readonly productId: string;
  readonly oldSku: string;
  readonly newSku: string;
}

export interface VariantStockStatusPayload {
  readonly variantId: string;
  readonly productId: string;
  readonly stock: number;
}

type EventParams<TPayload> = {
  id?: string;
  aggregateId: string;
  payload: TPayload;
  occurredAt?: Timestamp;
  version?: number;
  metadata?: DomainEventMetadata;
};

export class VariantAddedEvent extends BaseDomainEvent<
  typeof VARIANT_EVENT_TYPE.ADDED,
  VariantAddedPayload
> {
  constructor(p: EventParams<VariantAddedPayload>) {
    super({
      id: p.id ?? newEventId(),
      type: VARIANT_EVENT_TYPE.ADDED,
      aggregateId: p.aggregateId,
      aggregateType: VARIANT_AGGREGATE_TYPE,
      payload: p.payload,
      occurredAt: p.occurredAt ?? now(),
      version: p.version ?? 1,
      metadata: p.metadata,
    });
  }
}

export class VariantUpdatedEvent extends BaseDomainEvent<
  typeof VARIANT_EVENT_TYPE.UPDATED,
  VariantUpdatedPayload
> {
  constructor(p: EventParams<VariantUpdatedPayload>) {
    super({
      id: p.id ?? newEventId(),
      type: VARIANT_EVENT_TYPE.UPDATED,
      aggregateId: p.aggregateId,
      aggregateType: VARIANT_AGGREGATE_TYPE,
      payload: p.payload,
      occurredAt: p.occurredAt ?? now(),
      version: p.version ?? 1,
      metadata: p.metadata,
    });
  }
}

export class VariantRemovedEvent extends BaseDomainEvent<
  typeof VARIANT_EVENT_TYPE.REMOVED,
  VariantRemovedPayload
> {
  constructor(p: EventParams<VariantRemovedPayload>) {
    super({
      id: p.id ?? newEventId(),
      type: VARIANT_EVENT_TYPE.REMOVED,
      aggregateId: p.aggregateId,
      aggregateType: VARIANT_AGGREGATE_TYPE,
      payload: p.payload,
      occurredAt: p.occurredAt ?? now(),
      version: p.version ?? 1,
      metadata: p.metadata,
    });
  }
}

export class VariantStockChangedEvent extends BaseDomainEvent<
  typeof VARIANT_EVENT_TYPE.STOCK_CHANGED,
  VariantStockChangedPayload
> {
  constructor(p: EventParams<VariantStockChangedPayload>) {
    super({
      id: p.id ?? newEventId(),
      type: VARIANT_EVENT_TYPE.STOCK_CHANGED,
      aggregateId: p.aggregateId,
      aggregateType: VARIANT_AGGREGATE_TYPE,
      payload: p.payload,
      occurredAt: p.occurredAt ?? now(),
      version: p.version ?? 1,
      metadata: p.metadata,
    });
  }
}

export class VariantSkuChangedEvent extends BaseDomainEvent<
  typeof VARIANT_EVENT_TYPE.SKU_CHANGED,
  VariantSkuChangedPayload
> {
  constructor(p: EventParams<VariantSkuChangedPayload>) {
    super({
      id: p.id ?? newEventId(),
      type: VARIANT_EVENT_TYPE.SKU_CHANGED,
      aggregateId: p.aggregateId,
      aggregateType: VARIANT_AGGREGATE_TYPE,
      payload: p.payload,
      occurredAt: p.occurredAt ?? now(),
      version: p.version ?? 1,
      metadata: p.metadata,
    });
  }
}

export class VariantOutOfStockEvent extends BaseDomainEvent<
  typeof VARIANT_EVENT_TYPE.OUT_OF_STOCK,
  VariantStockStatusPayload
> {
  constructor(p: EventParams<VariantStockStatusPayload>) {
    super({
      id: p.id ?? newEventId(),
      type: VARIANT_EVENT_TYPE.OUT_OF_STOCK,
      aggregateId: p.aggregateId,
      aggregateType: VARIANT_AGGREGATE_TYPE,
      payload: p.payload,
      occurredAt: p.occurredAt ?? now(),
      version: p.version ?? 1,
      metadata: p.metadata,
    });
  }
}

export class VariantBackInStockEvent extends BaseDomainEvent<
  typeof VARIANT_EVENT_TYPE.BACK_IN_STOCK,
  VariantStockStatusPayload
> {
  constructor(p: EventParams<VariantStockStatusPayload>) {
    super({
      id: p.id ?? newEventId(),
      type: VARIANT_EVENT_TYPE.BACK_IN_STOCK,
      aggregateId: p.aggregateId,
      aggregateType: VARIANT_AGGREGATE_TYPE,
      payload: p.payload,
      occurredAt: p.occurredAt ?? now(),
      version: p.version ?? 1,
      metadata: p.metadata,
    });
  }
}
