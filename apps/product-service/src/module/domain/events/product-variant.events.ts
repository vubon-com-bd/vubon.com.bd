/**
 * Product Variant Domain Events
 * @module product-service/domain/events
 */
import { BaseDomainEvent } from '@vubon/shared-kernel/domain/base/base.event';
import type { DomainEventMetadata } from '@vubon/shared-kernel/domain/base/base.event';
import type { Timestamp } from '@vubon/shared-types/common';
import { PRODUCT_AGGREGATE_TYPE, newEventId, now } from './event.helpers.js';

export const VARIANT_EVENT_TYPE = {
  ADDED: 'product.variant.added',
  UPDATED: 'product.variant.updated',
  REMOVED: 'product.variant.removed',
  STOCK_CHANGED: 'product.variant.stock_changed',
} as const;

export interface VariantAddedPayload {
  readonly variantId: string;
  readonly productId: string;
  readonly sku: string;
  readonly name: string;
  readonly addedAt: string;
}

export interface VariantUpdatedPayload {
  readonly variantId: string;
  readonly productId: string;
  readonly changedFields: readonly string[];
  readonly updatedAt: string;
}

export interface VariantRemovedPayload {
  readonly variantId: string;
  readonly productId: string;
  readonly removedAt: string;
}

export interface VariantStockChangedPayload {
  readonly variantId: string;
  readonly productId: string;
  readonly previousStock: number;
  readonly newStock: number;
  readonly reason: string;
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
    aggregateType: PRODUCT_AGGREGATE_TYPE.VARIANT,
    payload: p.payload,
    occurredAt: p.occurredAt ?? now(),
    version: p.version ?? 1,
    metadata: p.metadata,
  };
}

export class VariantAddedEvent extends BaseDomainEvent<
  typeof VARIANT_EVENT_TYPE.ADDED,
  VariantAddedPayload
> {
  constructor(p: EventParams<VariantAddedPayload>) {
    super(buildParams(VARIANT_EVENT_TYPE.ADDED, p));
  }
}

export class VariantUpdatedEvent extends BaseDomainEvent<
  typeof VARIANT_EVENT_TYPE.UPDATED,
  VariantUpdatedPayload
> {
  constructor(p: EventParams<VariantUpdatedPayload>) {
    super(buildParams(VARIANT_EVENT_TYPE.UPDATED, p));
  }
}

export class VariantRemovedEvent extends BaseDomainEvent<
  typeof VARIANT_EVENT_TYPE.REMOVED,
  VariantRemovedPayload
> {
  constructor(p: EventParams<VariantRemovedPayload>) {
    super(buildParams(VARIANT_EVENT_TYPE.REMOVED, p));
  }
}

export class VariantStockChangedEvent extends BaseDomainEvent<
  typeof VARIANT_EVENT_TYPE.STOCK_CHANGED,
  VariantStockChangedPayload
> {
  constructor(p: EventParams<VariantStockChangedPayload>) {
    super(buildParams(VARIANT_EVENT_TYPE.STOCK_CHANGED, p));
  }
}
