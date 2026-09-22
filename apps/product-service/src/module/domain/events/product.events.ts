import { BaseDomainEvent } from '@vubon/shared-kernel/domain/base/base.event';
import { toTimestamp } from '@vubon/shared-types/common';

const AGG = 'Product';

export class ProductCreatedEvent extends BaseDomainEvent<
  'product.created',
  { productId: string; vendorId: string; slug: string }
> {
  constructor(aggregateId: string, productId: string, vendorId: string, slug: string, version: number) {
    super({
      id: crypto.randomUUID(),
      type: 'product.created',
      aggregateId,
      aggregateType: AGG,
      payload: { productId, vendorId, slug },
      occurredAt: toTimestamp(Date.now()),
      version,
    });
  }
}

export class ProductUpdatedEvent extends BaseDomainEvent<
  'product.updated',
  { productId: string; fields: readonly string[] }
> {
  constructor(aggregateId: string, productId: string, fields: readonly string[], version: number) {
    super({
      id: crypto.randomUUID(),
      type: 'product.updated',
      aggregateId,
      aggregateType: AGG,
      payload: { productId, fields },
      occurredAt: toTimestamp(Date.now()),
      version,
    });
  }
}

export class ProductDeletedEvent extends BaseDomainEvent<
  'product.deleted',
  { productId: string }
> {
  constructor(aggregateId: string, productId: string, version: number) {
    super({
      id: crypto.randomUUID(),
      type: 'product.deleted',
      aggregateId,
      aggregateType: AGG,
      payload: { productId },
      occurredAt: toTimestamp(Date.now()),
      version,
    });
  }
}

export class ProductPublishedEvent extends BaseDomainEvent<
  'product.published',
  { productId: string; slug: string }
> {
  constructor(aggregateId: string, productId: string, slug: string, version: number) {
    super({
      id: crypto.randomUUID(),
      type: 'product.published',
      aggregateId,
      aggregateType: AGG,
      payload: { productId, slug },
      occurredAt: toTimestamp(Date.now()),
      version,
    });
  }
}

export class ProductArchivedEvent extends BaseDomainEvent<
  'product.archived',
  { productId: string }
> {
  constructor(aggregateId: string, productId: string, version: number) {
    super({
      id: crypto.randomUUID(),
      type: 'product.archived',
      aggregateId,
      aggregateType: AGG,
      payload: { productId },
      occurredAt: toTimestamp(Date.now()),
      version,
    });
  }
}

export class ProductDuplicatedEvent extends BaseDomainEvent<
  'product.duplicated',
  { sourceId: string; newId: string }
> {
  constructor(aggregateId: string, sourceId: string, newId: string, version: number) {
    super({
      id: crypto.randomUUID(),
      type: 'product.duplicated',
      aggregateId,
      aggregateType: AGG,
      payload: { sourceId, newId },
      occurredAt: toTimestamp(Date.now()),
      version,
    });
  }
}
