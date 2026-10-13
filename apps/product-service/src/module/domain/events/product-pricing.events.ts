/**
 * Product Pricing Domain Events
 * @module product-service/domain/events
 */
import { BaseDomainEvent } from '@vubon/shared-kernel/domain/base/base.event';
import type { DomainEventMetadata } from '@vubon/shared-kernel/domain/base/base.event';
import type { Timestamp } from '@vubon/shared-types/common';
import { PRODUCT_AGGREGATE_TYPE, newEventId, now } from './event.helpers.js';

export const PRICING_EVENT_TYPE = {
  CHANGED: 'product.pricing.changed',
  DISCOUNT_APPLIED: 'product.pricing.discount_applied',
  DISCOUNT_REMOVED: 'product.pricing.discount_removed',
  RULE_ADDED: 'product.pricing.rule_added',
  RULE_REMOVED: 'product.pricing.rule_removed',
} as const;

export interface PricingChangedPayload {
  readonly productId: string;
  readonly variantId?: string;
  readonly previousPrice: number;
  readonly newPrice: number;
  readonly currency: string;
  readonly changedBy?: string;
}

export interface DiscountAppliedPayload {
  readonly productId: string;
  readonly variantId?: string;
  readonly discountPercent: number;
  readonly discountAmount: number;
  readonly effectiveFrom: string;
  readonly effectiveTo?: string;
}

export interface DiscountRemovedPayload {
  readonly productId: string;
  readonly variantId?: string;
  readonly previousDiscountPercent: number;
  readonly removedAt: string;
}

export interface PricingRuleAddedPayload {
  readonly ruleId: string;
  readonly name: string;
  readonly priority: number;
  readonly addedAt: string;
}

export interface PricingRuleRemovedPayload {
  readonly ruleId: string;
  readonly name: string;
  readonly removedAt: string;
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
    aggregateType: PRODUCT_AGGREGATE_TYPE.PRICING,
    payload: p.payload,
    occurredAt: p.occurredAt ?? now(),
    version: p.version ?? 1,
    metadata: p.metadata,
  };
}

export class PricingChangedEvent extends BaseDomainEvent<
  typeof PRICING_EVENT_TYPE.CHANGED,
  PricingChangedPayload
> {
  constructor(p: EventParams<PricingChangedPayload>) {
    super(buildParams(PRICING_EVENT_TYPE.CHANGED, p));
  }
}

export class DiscountAppliedEvent extends BaseDomainEvent<
  typeof PRICING_EVENT_TYPE.DISCOUNT_APPLIED,
  DiscountAppliedPayload
> {
  constructor(p: EventParams<DiscountAppliedPayload>) {
    super(buildParams(PRICING_EVENT_TYPE.DISCOUNT_APPLIED, p));
  }
}

export class DiscountRemovedEvent extends BaseDomainEvent<
  typeof PRICING_EVENT_TYPE.DISCOUNT_REMOVED,
  DiscountRemovedPayload
> {
  constructor(p: EventParams<DiscountRemovedPayload>) {
    super(buildParams(PRICING_EVENT_TYPE.DISCOUNT_REMOVED, p));
  }
}

export class PricingRuleAddedEvent extends BaseDomainEvent<
  typeof PRICING_EVENT_TYPE.RULE_ADDED,
  PricingRuleAddedPayload
> {
  constructor(p: EventParams<PricingRuleAddedPayload>) {
    super(buildParams(PRICING_EVENT_TYPE.RULE_ADDED, p));
  }
}

export class PricingRuleRemovedEvent extends BaseDomainEvent<
  typeof PRICING_EVENT_TYPE.RULE_REMOVED,
  PricingRuleRemovedPayload
> {
  constructor(p: EventParams<PricingRuleRemovedPayload>) {
    super(buildParams(PRICING_EVENT_TYPE.RULE_REMOVED, p));
  }
}
