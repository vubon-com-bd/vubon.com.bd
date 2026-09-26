import { BaseDomainEvent } from '@vubon/shared-kernel/domain/base/base.event';
import { toTimestamp } from '@vubon/shared-types/common';

const AGG = 'ProductPricing';

export class PriceChangedEvent extends BaseDomainEvent<
  'product.price.changed',
  { productId: string; oldPrice: number; newPrice: number }
> {
  constructor(aggregateId: string, productId: string, oldPrice: number, newPrice: number, version: number) {
    super({
      id: crypto.randomUUID(),
      type: 'product.price.changed',
      aggregateId,
      aggregateType: AGG,
      payload: { productId, oldPrice, newPrice },
      occurredAt: toTimestamp(Date.now()),
      version,
    });
  }
}

export class PricingRuleCreatedEvent extends BaseDomainEvent<
  'product.pricing_rule.created',
  { productId: string; ruleId: string; type: string }
> {
  constructor(aggregateId: string, productId: string, ruleId: string, type: string, version: number) {
    super({
      id: crypto.randomUUID(),
      type: 'product.pricing_rule.created',
      aggregateId,
      aggregateType: AGG,
      payload: { productId, ruleId, type },
      occurredAt: toTimestamp(Date.now()),
      version,
    });
  }
}

export class PricingRuleUpdatedEvent extends BaseDomainEvent<
  'product.pricing_rule.updated',
  { productId: string; ruleId: string }
> {
  constructor(aggregateId: string, productId: string, ruleId: string, version: number) {
    super({
      id: crypto.randomUUID(),
      type: 'product.pricing_rule.updated',
      aggregateId,
      aggregateType: AGG,
      payload: { productId, ruleId },
      occurredAt: toTimestamp(Date.now()),
      version,
    });
  }
}

export class PricingRuleDeletedEvent extends BaseDomainEvent<
  'product.pricing_rule.deleted',
  { productId: string; ruleId: string }
> {
  constructor(aggregateId: string, productId: string, ruleId: string, version: number) {
    super({
      id: crypto.randomUUID(),
      type: 'product.pricing_rule.deleted',
      aggregateId,
      aggregateType: AGG,
      payload: { productId, ruleId },
      occurredAt: toTimestamp(Date.now()),
      version,
    });
  }
}

export class PricingRuleAppliedEvent extends BaseDomainEvent<
  'product.pricing_rule.applied',
  { productId: string; ruleId: string; finalPrice: number }
> {
  constructor(aggregateId: string, productId: string, ruleId: string, finalPrice: number, version: number) {
    super({
      id: crypto.randomUUID(),
      type: 'product.pricing_rule.applied',
      aggregateId,
      aggregateType: AGG,
      payload: { productId, ruleId, finalPrice },
      occurredAt: toTimestamp(Date.now()),
      version,
    });
  }
}
