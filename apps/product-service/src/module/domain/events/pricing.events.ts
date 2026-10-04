/**
 * Pricing domain events
 * @module product-service/domain/events
 */
import { BaseDomainEvent } from '@vubon/shared-kernel/domain/base/base.event';
import type { DomainEventMetadata } from '@vubon/shared-kernel/domain/base/base.event';
import type { Timestamp } from '@vubon/shared-types/common';
import { PRICING_AGGREGATE_TYPE, newEventId, now } from './event.helpers.js';

export const PRICING_EVENT_TYPE = {
  CREATED: 'pricing.created',
  UPDATED: 'pricing.updated',
  PRICE_CHANGED: 'pricing.price.changed',
  DISCOUNT_APPLIED: 'pricing.discount.applied',
  DISCOUNT_REMOVED: 'pricing.discount.removed',
} as const;

export interface PricingCreatedPayload {
  readonly pricingId: string;
  readonly productId: string;
  readonly variantId?: string;
  readonly basePrice: number;
  readonly sellingPrice: number;
  readonly currency: string;
}

export interface PricingUpdatedPayload {
  readonly pricingId: string;
  readonly productId: string;
  readonly variantId?: string;
  readonly changedFields: readonly string[];
}

export interface PriceChangedPayload {
  readonly pricingId: string;
  readonly productId: string;
  readonly variantId?: string;
  readonly oldPrice: number;
  readonly newPrice: number;
  readonly currency: string;
  readonly changedBy: string;
}

export interface DiscountAppliedPayload {
  readonly pricingId: string;
  readonly productId: string;
  readonly discountPercent: number;
  readonly oldPrice: number;
  readonly newPrice: number;
  readonly appliedBy: string;
}

export interface DiscountRemovedPayload {
  readonly pricingId: string;
  readonly productId: string;
  readonly restoredPrice: number;
  readonly removedBy: string;
}

type EventParams<TPayload> = {
  id?: string;
  aggregateId: string;
  payload: TPayload;
  occurredAt?: Timestamp;
  version?: number;
  metadata?: DomainEventMetadata;
};

export class PricingCreatedEvent extends BaseDomainEvent<
  typeof PRICING_EVENT_TYPE.CREATED,
  PricingCreatedPayload
> {
  constructor(p: EventParams<PricingCreatedPayload>) {
    super({
      id: p.id ?? newEventId(),
      type: PRICING_EVENT_TYPE.CREATED,
      aggregateId: p.aggregateId,
      aggregateType: PRICING_AGGREGATE_TYPE,
      payload: p.payload,
      occurredAt: p.occurredAt ?? now(),
      version: p.version ?? 1,
      metadata: p.metadata,
    });
  }
}

export class PricingUpdatedEvent extends BaseDomainEvent<
  typeof PRICING_EVENT_TYPE.UPDATED,
  PricingUpdatedPayload
> {
  constructor(p: EventParams<PricingUpdatedPayload>) {
    super({
      id: p.id ?? newEventId(),
      type: PRICING_EVENT_TYPE.UPDATED,
      aggregateId: p.aggregateId,
      aggregateType: PRICING_AGGREGATE_TYPE,
      payload: p.payload,
      occurredAt: p.occurredAt ?? now(),
      version: p.version ?? 1,
      metadata: p.metadata,
    });
  }
}

export class PriceChangedEvent extends BaseDomainEvent<
  typeof PRICING_EVENT_TYPE.PRICE_CHANGED,
  PriceChangedPayload
> {
  constructor(p: EventParams<PriceChangedPayload>) {
    super({
      id: p.id ?? newEventId(),
      type: PRICING_EVENT_TYPE.PRICE_CHANGED,
      aggregateId: p.aggregateId,
      aggregateType: PRICING_AGGREGATE_TYPE,
      payload: p.payload,
      occurredAt: p.occurredAt ?? now(),
      version: p.version ?? 1,
      metadata: p.metadata,
    });
  }
}

export class DiscountAppliedEvent extends BaseDomainEvent<
  typeof PRICING_EVENT_TYPE.DISCOUNT_APPLIED,
  DiscountAppliedPayload
> {
  constructor(p: EventParams<DiscountAppliedPayload>) {
    super({
      id: p.id ?? newEventId(),
      type: PRICING_EVENT_TYPE.DISCOUNT_APPLIED,
      aggregateId: p.aggregateId,
      aggregateType: PRICING_AGGREGATE_TYPE,
      payload: p.payload,
      occurredAt: p.occurredAt ?? now(),
      version: p.version ?? 1,
      metadata: p.metadata,
    });
  }
}

export class DiscountRemovedEvent extends BaseDomainEvent<
  typeof PRICING_EVENT_TYPE.DISCOUNT_REMOVED,
  DiscountRemovedPayload
> {
  constructor(p: EventParams<DiscountRemovedPayload>) {
    super({
      id: p.id ?? newEventId(),
      type: PRICING_EVENT_TYPE.DISCOUNT_REMOVED,
      aggregateId: p.aggregateId,
      aggregateType: PRICING_AGGREGATE_TYPE,
      payload: p.payload,
      occurredAt: p.occurredAt ?? now(),
      version: p.version ?? 1,
      metadata: p.metadata,
    });
  }
}
