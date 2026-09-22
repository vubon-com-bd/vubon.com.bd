import { BaseDomainEvent } from '@vubon/shared-kernel/domain/base/base.event';
import { toTimestamp } from '@vubon/shared-types/common';

const AGG = 'ProductVariant';

export class VariantAddedEvent extends BaseDomainEvent<
  'product.variant.added',
  { productId: string; variantId: string; sku: string }
> {
  constructor(aggregateId: string, productId: string, variantId: string, sku: string, version: number) {
    super({
      id: crypto.randomUUID(),
      type: 'product.variant.added',
      aggregateId,
      aggregateType: AGG,
      payload: { productId, variantId, sku },
      occurredAt: toTimestamp(Date.now()),
      version,
    });
  }
}

export class VariantUpdatedEvent extends BaseDomainEvent<
  'product.variant.updated',
  { productId: string; variantId: string; fields: readonly string[] }
> {
  constructor(aggregateId: string, productId: string, variantId: string, fields: readonly string[], version: number) {
    super({
      id: crypto.randomUUID(),
      type: 'product.variant.updated',
      aggregateId,
      aggregateType: AGG,
      payload: { productId, variantId, fields },
      occurredAt: toTimestamp(Date.now()),
      version,
    });
  }
}

export class VariantRemovedEvent extends BaseDomainEvent<
  'product.variant.removed',
  { productId: string; variantId: string }
> {
  constructor(aggregateId: string, productId: string, variantId: string, version: number) {
    super({
      id: crypto.randomUUID(),
      type: 'product.variant.removed',
      aggregateId,
      aggregateType: AGG,
      payload: { productId, variantId },
      occurredAt: toTimestamp(Date.now()),
      version,
    });
  }
}

export class DefaultVariantSetEvent extends BaseDomainEvent<
  'product.variant.default_set',
  { productId: string; variantId: string }
> {
  constructor(aggregateId: string, productId: string, variantId: string, version: number) {
    super({
      id: crypto.randomUUID(),
      type: 'product.variant.default_set',
      aggregateId,
      aggregateType: AGG,
      payload: { productId, variantId },
      occurredAt: toTimestamp(Date.now()),
      version,
    });
  }
}
