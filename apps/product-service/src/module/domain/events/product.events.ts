/**
 * Product domain events
 * @module product-service/domain/events
 */
import { BaseDomainEvent } from '@vubon/shared-kernel/domain/base/base.event';
import type { DomainEventMetadata } from '@vubon/shared-kernel/domain/base/base.event';
import type { Timestamp } from '@vubon/shared-types/common';
import { PRODUCT_AGGREGATE_TYPE, newEventId, now } from './event.helpers.js';

export const PRODUCT_EVENT_TYPE = {
  CREATED: 'product.created',
  UPDATED: 'product.updated',
  PUBLISHED: 'product.published',
  UNPUBLISHED: 'product.unpublished',
  ARCHIVED: 'product.archived',
  DELETED: 'product.deleted',
  STATUS_CHANGED: 'product.status.changed',
  PRICE_CHANGED: 'product.price.changed',
  FEATURED: 'product.featured',
  UNFEATURED: 'product.unfeatured',
} as const;

// ─── Payloads ────────────────────────────────────────────

export interface ProductCreatedPayload {
  readonly productId: string;
  readonly name: string;
  readonly slug: string;
  readonly sku: string;
  readonly type: string;
  readonly categoryId: string;
  readonly brandId?: string;
  readonly vendorId?: string;
  readonly price: number;
  readonly currency: string;
}

export interface ProductUpdatedPayload {
  readonly productId: string;
  readonly changedFields: readonly string[];
}

export interface ProductPublishedPayload {
  readonly productId: string;
  readonly publishedAt: string;
  readonly publishedBy: string;
}

export interface ProductUnpublishedPayload {
  readonly productId: string;
  readonly unpublishedAt: string;
  readonly reason?: string;
}

export interface ProductArchivedPayload {
  readonly productId: string;
  readonly archivedAt: string;
  readonly archivedBy: string;
}

export interface ProductDeletedPayload {
  readonly productId: string;
  readonly deletedAt: string;
  readonly deletedBy: string;
}

export interface ProductStatusChangedPayload {
  readonly productId: string;
  readonly fromStatus: string;
  readonly toStatus: string;
  readonly changedBy: string;
}

export interface ProductPriceChangedPayload {
  readonly productId: string;
  readonly oldPrice: number;
  readonly newPrice: number;
  readonly currency: string;
  readonly changedBy: string;
}

export interface ProductFeaturedPayload {
  readonly productId: string;
  readonly isFeatured: boolean;
  readonly changedBy: string;
}

// ─── Event classes ───────────────────────────────────────

type EventParams<TPayload> = {
  id?: string;
  aggregateId: string;
  payload: TPayload;
  occurredAt?: Timestamp;
  version?: number;
  metadata?: DomainEventMetadata;
};

export class ProductCreatedEvent extends BaseDomainEvent<
  typeof PRODUCT_EVENT_TYPE.CREATED,
  ProductCreatedPayload
> {
  constructor(p: EventParams<ProductCreatedPayload>) {
    super({
      id: p.id ?? newEventId(),
      type: PRODUCT_EVENT_TYPE.CREATED,
      aggregateId: p.aggregateId,
      aggregateType: PRODUCT_AGGREGATE_TYPE,
      payload: p.payload,
      occurredAt: p.occurredAt ?? now(),
      version: p.version ?? 1,
      metadata: p.metadata,
    });
  }
}

export class ProductUpdatedEvent extends BaseDomainEvent<
  typeof PRODUCT_EVENT_TYPE.UPDATED,
  ProductUpdatedPayload
> {
  constructor(p: EventParams<ProductUpdatedPayload>) {
    super({
      id: p.id ?? newEventId(),
      type: PRODUCT_EVENT_TYPE.UPDATED,
      aggregateId: p.aggregateId,
      aggregateType: PRODUCT_AGGREGATE_TYPE,
      payload: p.payload,
      occurredAt: p.occurredAt ?? now(),
      version: p.version ?? 1,
      metadata: p.metadata,
    });
  }
}

export class ProductPublishedEvent extends BaseDomainEvent<
  typeof PRODUCT_EVENT_TYPE.PUBLISHED,
  ProductPublishedPayload
> {
  constructor(p: EventParams<ProductPublishedPayload>) {
    super({
      id: p.id ?? newEventId(),
      type: PRODUCT_EVENT_TYPE.PUBLISHED,
      aggregateId: p.aggregateId,
      aggregateType: PRODUCT_AGGREGATE_TYPE,
      payload: p.payload,
      occurredAt: p.occurredAt ?? now(),
      version: p.version ?? 1,
      metadata: p.metadata,
    });
  }
}

export class ProductUnpublishedEvent extends BaseDomainEvent<
  typeof PRODUCT_EVENT_TYPE.UNPUBLISHED,
  ProductUnpublishedPayload
> {
  constructor(p: EventParams<ProductUnpublishedPayload>) {
    super({
      id: p.id ?? newEventId(),
      type: PRODUCT_EVENT_TYPE.UNPUBLISHED,
      aggregateId: p.aggregateId,
      aggregateType: PRODUCT_AGGREGATE_TYPE,
      payload: p.payload,
      occurredAt: p.occurredAt ?? now(),
      version: p.version ?? 1,
      metadata: p.metadata,
    });
  }
}

export class ProductArchivedEvent extends BaseDomainEvent<
  typeof PRODUCT_EVENT_TYPE.ARCHIVED,
  ProductArchivedPayload
> {
  constructor(p: EventParams<ProductArchivedPayload>) {
    super({
      id: p.id ?? newEventId(),
      type: PRODUCT_EVENT_TYPE.ARCHIVED,
      aggregateId: p.aggregateId,
      aggregateType: PRODUCT_AGGREGATE_TYPE,
      payload: p.payload,
      occurredAt: p.occurredAt ?? now(),
      version: p.version ?? 1,
      metadata: p.metadata,
    });
  }
}

export class ProductDeletedEvent extends BaseDomainEvent<
  typeof PRODUCT_EVENT_TYPE.DELETED,
  ProductDeletedPayload
> {
  constructor(p: EventParams<ProductDeletedPayload>) {
    super({
      id: p.id ?? newEventId(),
      type: PRODUCT_EVENT_TYPE.DELETED,
      aggregateId: p.aggregateId,
      aggregateType: PRODUCT_AGGREGATE_TYPE,
      payload: p.payload,
      occurredAt: p.occurredAt ?? now(),
      version: p.version ?? 1,
      metadata: p.metadata,
    });
  }
}

export class ProductStatusChangedEvent extends BaseDomainEvent<
  typeof PRODUCT_EVENT_TYPE.STATUS_CHANGED,
  ProductStatusChangedPayload
> {
  constructor(p: EventParams<ProductStatusChangedPayload>) {
    super({
      id: p.id ?? newEventId(),
      type: PRODUCT_EVENT_TYPE.STATUS_CHANGED,
      aggregateId: p.aggregateId,
      aggregateType: PRODUCT_AGGREGATE_TYPE,
      payload: p.payload,
      occurredAt: p.occurredAt ?? now(),
      version: p.version ?? 1,
      metadata: p.metadata,
    });
  }
}

export class ProductPriceChangedEvent extends BaseDomainEvent<
  typeof PRODUCT_EVENT_TYPE.PRICE_CHANGED,
  ProductPriceChangedPayload
> {
  constructor(p: EventParams<ProductPriceChangedPayload>) {
    super({
      id: p.id ?? newEventId(),
      type: PRODUCT_EVENT_TYPE.PRICE_CHANGED,
      aggregateId: p.aggregateId,
      aggregateType: PRODUCT_AGGREGATE_TYPE,
      payload: p.payload,
      occurredAt: p.occurredAt ?? now(),
      version: p.version ?? 1,
      metadata: p.metadata,
    });
  }
}

export class ProductFeaturedEvent extends BaseDomainEvent<
  typeof PRODUCT_EVENT_TYPE.FEATURED,
  ProductFeaturedPayload
> {
  constructor(p: EventParams<ProductFeaturedPayload>) {
    super({
      id: p.id ?? newEventId(),
      type: PRODUCT_EVENT_TYPE.FEATURED,
      aggregateId: p.aggregateId,
      aggregateType: PRODUCT_AGGREGATE_TYPE,
      payload: p.payload,
      occurredAt: p.occurredAt ?? now(),
      version: p.version ?? 1,
      metadata: p.metadata,
    });
  }
}

export class ProductUnfeaturedEvent extends BaseDomainEvent<
  typeof PRODUCT_EVENT_TYPE.UNFEATURED,
  ProductFeaturedPayload
> {
  constructor(p: EventParams<ProductFeaturedPayload>) {
    super({
      id: p.id ?? newEventId(),
      type: PRODUCT_EVENT_TYPE.UNFEATURED,
      aggregateId: p.aggregateId,
      aggregateType: PRODUCT_AGGREGATE_TYPE,
      payload: p.payload,
      occurredAt: p.occurredAt ?? now(),
      version: p.version ?? 1,
      metadata: p.metadata,
    });
  }
}
