/**
 * Product Collection Domain Events
 * @module product-service/domain/events
 */
import { BaseDomainEvent } from '@vubon/shared-kernel/domain/base/base.event';
import type { DomainEventMetadata } from '@vubon/shared-kernel/domain/base/base.event';
import type { Timestamp } from '@vubon/shared-types/common';
import { PRODUCT_AGGREGATE_TYPE, newEventId, now } from './event.helpers.js';

export const COLLECTION_EVENT_TYPE = {
  CREATED: 'product.collection.created',
  UPDATED: 'product.collection.updated',
  PRODUCT_ADDED: 'product.collection.product_added',
  PRODUCT_REMOVED: 'product.collection.product_removed',
  ACTIVATED: 'product.collection.activated',
  DEACTIVATED: 'product.collection.deactivated',
  DELETED: 'product.collection.deleted',
} as const;

export interface CollectionCreatedPayload {
  readonly collectionId: string;
  readonly name: string;
  readonly slug: string;
  readonly type: string;
  readonly createdAt: string;
}

export interface CollectionUpdatedPayload {
  readonly collectionId: string;
  readonly changedFields: readonly string[];
  readonly updatedAt: string;
}

export interface CollectionProductAddedPayload {
  readonly collectionId: string;
  readonly productId: string;
  readonly totalProducts: number;
  readonly addedAt: string;
}

export interface CollectionProductRemovedPayload {
  readonly collectionId: string;
  readonly productId: string;
  readonly totalProducts: number;
  readonly removedAt: string;
}

export interface CollectionActivatedPayload {
  readonly collectionId: string;
  readonly activatedAt: string;
}

export interface CollectionDeactivatedPayload {
  readonly collectionId: string;
  readonly reason?: string;
  readonly deactivatedAt: string;
}

export interface CollectionDeletedPayload {
  readonly collectionId: string;
  readonly deletedAt: string;
  readonly deletedBy?: string;
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
    aggregateType: PRODUCT_AGGREGATE_TYPE.COLLECTION,
    payload: p.payload,
    occurredAt: p.occurredAt ?? now(),
    version: p.version ?? 1,
    metadata: p.metadata,
  };
}

export class CollectionCreatedEvent extends BaseDomainEvent<
  typeof COLLECTION_EVENT_TYPE.CREATED,
  CollectionCreatedPayload
> {
  constructor(p: EventParams<CollectionCreatedPayload>) {
    super(buildParams(COLLECTION_EVENT_TYPE.CREATED, p));
  }
}

export class CollectionUpdatedEvent extends BaseDomainEvent<
  typeof COLLECTION_EVENT_TYPE.UPDATED,
  CollectionUpdatedPayload
> {
  constructor(p: EventParams<CollectionUpdatedPayload>) {
    super(buildParams(COLLECTION_EVENT_TYPE.UPDATED, p));
  }
}

export class CollectionProductAddedEvent extends BaseDomainEvent<
  typeof COLLECTION_EVENT_TYPE.PRODUCT_ADDED,
  CollectionProductAddedPayload
> {
  constructor(p: EventParams<CollectionProductAddedPayload>) {
    super(buildParams(COLLECTION_EVENT_TYPE.PRODUCT_ADDED, p));
  }
}

export class CollectionProductRemovedEvent extends BaseDomainEvent<
  typeof COLLECTION_EVENT_TYPE.PRODUCT_REMOVED,
  CollectionProductRemovedPayload
> {
  constructor(p: EventParams<CollectionProductRemovedPayload>) {
    super(buildParams(COLLECTION_EVENT_TYPE.PRODUCT_REMOVED, p));
  }
}

export class CollectionActivatedEvent extends BaseDomainEvent<
  typeof COLLECTION_EVENT_TYPE.ACTIVATED,
  CollectionActivatedPayload
> {
  constructor(p: EventParams<CollectionActivatedPayload>) {
    super(buildParams(COLLECTION_EVENT_TYPE.ACTIVATED, p));
  }
}

export class CollectionDeactivatedEvent extends BaseDomainEvent<
  typeof COLLECTION_EVENT_TYPE.DEACTIVATED,
  CollectionDeactivatedPayload
> {
  constructor(p: EventParams<CollectionDeactivatedPayload>) {
    super(buildParams(COLLECTION_EVENT_TYPE.DEACTIVATED, p));
  }
}

export class CollectionDeletedEvent extends BaseDomainEvent<
  typeof COLLECTION_EVENT_TYPE.DELETED,
  CollectionDeletedPayload
> {
  constructor(p: EventParams<CollectionDeletedPayload>) {
    super(buildParams(COLLECTION_EVENT_TYPE.DELETED, p));
  }
}
