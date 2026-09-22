import { BaseDomainEvent } from '@vubon/shared-kernel/domain/base/base.event';
import { toTimestamp } from '@vubon/shared-types/common';

const AGG = 'ProductCollection';

export class CollectionCreatedEvent extends BaseDomainEvent<
  'product.collection.created',
  { collectionId: string; name: string }
> {
  constructor(aggregateId: string, collectionId: string, name: string, version: number) {
    super({
      id: crypto.randomUUID(),
      type: 'product.collection.created',
      aggregateId,
      aggregateType: AGG,
      payload: { collectionId, name },
      occurredAt: toTimestamp(Date.now()),
      version,
    });
  }
}

export class CollectionUpdatedEvent extends BaseDomainEvent<
  'product.collection.updated',
  { collectionId: string }
> {
  constructor(aggregateId: string, collectionId: string, version: number) {
    super({
      id: crypto.randomUUID(),
      type: 'product.collection.updated',
      aggregateId,
      aggregateType: AGG,
      payload: { collectionId },
      occurredAt: toTimestamp(Date.now()),
      version,
    });
  }
}

export class CollectionDeletedEvent extends BaseDomainEvent<
  'product.collection.deleted',
  { collectionId: string }
> {
  constructor(aggregateId: string, collectionId: string, version: number) {
    super({
      id: crypto.randomUUID(),
      type: 'product.collection.deleted',
      aggregateId,
      aggregateType: AGG,
      payload: { collectionId },
      occurredAt: toTimestamp(Date.now()),
      version,
    });
  }
}

export class ProductAddedToCollectionEvent extends BaseDomainEvent<
  'product.collection.product_added',
  { collectionId: string; productId: string }
> {
  constructor(aggregateId: string, collectionId: string, productId: string, version: number) {
    super({
      id: crypto.randomUUID(),
      type: 'product.collection.product_added',
      aggregateId,
      aggregateType: AGG,
      payload: { collectionId, productId },
      occurredAt: toTimestamp(Date.now()),
      version,
    });
  }
}

export class ProductRemovedFromCollectionEvent extends BaseDomainEvent<
  'product.collection.product_removed',
  { collectionId: string; productId: string }
> {
  constructor(aggregateId: string, collectionId: string, productId: string, version: number) {
    super({
      id: crypto.randomUUID(),
      type: 'product.collection.product_removed',
      aggregateId,
      aggregateType: AGG,
      payload: { collectionId, productId },
      occurredAt: toTimestamp(Date.now()),
      version,
    });
  }
}
