/**
 * Product Domain Events
 * @module product-service/domain/events
 */
import { BaseDomainEvent } from '@vubon/shared-kernel/domain/base/base.event';
import type { DomainEventMetadata } from '@vubon/shared-kernel/domain/base/base.event';
import type { Timestamp } from '@vubon/shared-types/common';
import { PRODUCT_AGGREGATE_TYPE, newEventId, now } from './event.helpers.js';

// ─── Event Type Constants ──────────────────
export const PRODUCT_EVENT_TYPE = {
  CREATED: 'product.product.created',
  UPDATED: 'product.product.updated',
  STATUS_CHANGED: 'product.product.status_changed',
  PUBLISHED: 'product.product.published',
  UNPUBLISHED: 'product.product.unpublished',
  DELETED: 'product.product.deleted',
  STOCK_CHANGED: 'product.product.stock_changed',
} as const;

// ─── Payload Interfaces ────────────────────
export interface ProductCreatedPayload {
  readonly productId: string;
  readonly name: string;
  readonly sku: string;
  readonly categoryId: string;
  readonly vendorId?: string;
  readonly createdAt: string;
}

export interface ProductUpdatedPayload {
  readonly productId: string;
  readonly changedFields: readonly string[];
  readonly updatedAt: string;
}

export interface ProductStatusChangedPayload {
  readonly productId: string;
  readonly fromStatus: string;
  readonly toStatus: string;
  readonly changedBy?: string;
}

export interface ProductPublishedPayload {
  readonly productId: string;
  readonly publishedAt: string;
  readonly publishedBy?: string;
}

export interface ProductUnpublishedPayload {
  readonly productId: string;
  readonly reason?: string;
  readonly unpublishedAt: string;
}

export interface ProductDeletedPayload {
  readonly productId: string;
  readonly deletedAt: string;
  readonly deletedBy?: string;
}

export interface ProductStockChangedPayload {
  readonly productId: string;
  readonly previousStock: number;
  readonly newStock: number;
  readonly reason: string;
}

// ─── Event Params Builder ──────────────────
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
    aggregateType: PRODUCT_AGGREGATE_TYPE.PRODUCT,
    payload: p.payload,
    occurredAt: p.occurredAt ?? now(),
    version: p.version ?? 1,
    metadata: p.metadata,
  };
}

// ─── Concrete Events ───────────────────────
export class ProductCreatedEvent extends BaseDomainEvent<
  typeof PRODUCT_EVENT_TYPE.CREATED,
  ProductCreatedPayload
> {
  constructor(p: EventParams<ProductCreatedPayload>) {
    super(buildParams(PRODUCT_EVENT_TYPE.CREATED, p));
  }
}

export class ProductUpdatedEvent extends BaseDomainEvent<
  typeof PRODUCT_EVENT_TYPE.UPDATED,
  ProductUpdatedPayload
> {
  constructor(p: EventParams<ProductUpdatedPayload>) {
    super(buildParams(PRODUCT_EVENT_TYPE.UPDATED, p));
  }
}

export class ProductStatusChangedEvent extends BaseDomainEvent<
  typeof PRODUCT_EVENT_TYPE.STATUS_CHANGED,
  ProductStatusChangedPayload
> {
  constructor(p: EventParams<ProductStatusChangedPayload>) {
    super(buildParams(PRODUCT_EVENT_TYPE.STATUS_CHANGED, p));
  }
}

export class ProductPublishedEvent extends BaseDomainEvent<
  typeof PRODUCT_EVENT_TYPE.PUBLISHED,
  ProductPublishedPayload
> {
  constructor(p: EventParams<ProductPublishedPayload>) {
    super(buildParams(PRODUCT_EVENT_TYPE.PUBLISHED, p));
  }
}

export class ProductUnpublishedEvent extends BaseDomainEvent<
  typeof PRODUCT_EVENT_TYPE.UNPUBLISHED,
  ProductUnpublishedPayload
> {
  constructor(p: EventParams<ProductUnpublishedPayload>) {
    super(buildParams(PRODUCT_EVENT_TYPE.UNPUBLISHED, p));
  }
}

export class ProductDeletedEvent extends BaseDomainEvent<
  typeof PRODUCT_EVENT_TYPE.DELETED,
  ProductDeletedPayload
> {
  constructor(p: EventParams<ProductDeletedPayload>) {
    super(buildParams(PRODUCT_EVENT_TYPE.DELETED, p));
  }
}

export class ProductStockChangedEvent extends BaseDomainEvent<
  typeof PRODUCT_EVENT_TYPE.STOCK_CHANGED,
  ProductStockChangedPayload
> {
  constructor(p: EventParams<ProductStockChangedPayload>) {
    super(buildParams(PRODUCT_EVENT_TYPE.STOCK_CHANGED, p));
  }
}
