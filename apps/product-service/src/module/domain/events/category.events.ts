/**
 * Category domain events
 * @module product-service/domain/events
 */
import { BaseDomainEvent } from '@vubon/shared-kernel/domain/base/base.event';
import type { DomainEventMetadata } from '@vubon/shared-kernel/domain/base/base.event';
import type { Timestamp } from '@vubon/shared-types/common';
import { CATEGORY_AGGREGATE_TYPE, newEventId, now } from './event.helpers.js';

export const CATEGORY_EVENT_TYPE = {
  CREATED: 'category.created',
  UPDATED: 'category.updated',
  MOVED: 'category.moved',
  DELETED: 'category.deleted',
  PRODUCT_ATTACHED: 'category.product.attached',
  PRODUCT_DETACHED: 'category.product.detached',
} as const;

export interface CategoryCreatedPayload {
  readonly categoryId: string;
  readonly name: string;
  readonly slug: string;
  readonly parentId?: string;
  readonly depth: number;
}

export interface CategoryUpdatedPayload {
  readonly categoryId: string;
  readonly changedFields: readonly string[];
}

export interface CategoryMovedPayload {
  readonly categoryId: string;
  readonly oldParentId?: string;
  readonly newParentId?: string;
  readonly oldDepth: number;
  readonly newDepth: number;
}

export interface CategoryDeletedPayload {
  readonly categoryId: string;
  readonly deletedBy: string;
}

export interface CategoryProductPayload {
  readonly categoryId: string;
  readonly productId: string;
  readonly changedBy: string;
}

type EventParams<TPayload> = {
  id?: string;
  aggregateId: string;
  payload: TPayload;
  occurredAt?: Timestamp;
  version?: number;
  metadata?: DomainEventMetadata;
};

export class CategoryCreatedEvent extends BaseDomainEvent<
  typeof CATEGORY_EVENT_TYPE.CREATED,
  CategoryCreatedPayload
> {
  constructor(p: EventParams<CategoryCreatedPayload>) {
    super({
      id: p.id ?? newEventId(),
      type: CATEGORY_EVENT_TYPE.CREATED,
      aggregateId: p.aggregateId,
      aggregateType: CATEGORY_AGGREGATE_TYPE,
      payload: p.payload,
      occurredAt: p.occurredAt ?? now(),
      version: p.version ?? 1,
      metadata: p.metadata,
    });
  }
}

export class CategoryUpdatedEvent extends BaseDomainEvent<
  typeof CATEGORY_EVENT_TYPE.UPDATED,
  CategoryUpdatedPayload
> {
  constructor(p: EventParams<CategoryUpdatedPayload>) {
    super({
      id: p.id ?? newEventId(),
      type: CATEGORY_EVENT_TYPE.UPDATED,
      aggregateId: p.aggregateId,
      aggregateType: CATEGORY_AGGREGATE_TYPE,
      payload: p.payload,
      occurredAt: p.occurredAt ?? now(),
      version: p.version ?? 1,
      metadata: p.metadata,
    });
  }
}

export class CategoryMovedEvent extends BaseDomainEvent<
  typeof CATEGORY_EVENT_TYPE.MOVED,
  CategoryMovedPayload
> {
  constructor(p: EventParams<CategoryMovedPayload>) {
    super({
      id: p.id ?? newEventId(),
      type: CATEGORY_EVENT_TYPE.MOVED,
      aggregateId: p.aggregateId,
      aggregateType: CATEGORY_AGGREGATE_TYPE,
      payload: p.payload,
      occurredAt: p.occurredAt ?? now(),
      version: p.version ?? 1,
      metadata: p.metadata,
    });
  }
}

export class CategoryDeletedEvent extends BaseDomainEvent<
  typeof CATEGORY_EVENT_TYPE.DELETED,
  CategoryDeletedPayload
> {
  constructor(p: EventParams<CategoryDeletedPayload>) {
    super({
      id: p.id ?? newEventId(),
      type: CATEGORY_EVENT_TYPE.DELETED,
      aggregateId: p.aggregateId,
      aggregateType: CATEGORY_AGGREGATE_TYPE,
      payload: p.payload,
      occurredAt: p.occurredAt ?? now(),
      version: p.version ?? 1,
      metadata: p.metadata,
    });
  }
}

export class CategoryProductAttachedEvent extends BaseDomainEvent<
  typeof CATEGORY_EVENT_TYPE.PRODUCT_ATTACHED,
  CategoryProductPayload
> {
  constructor(p: EventParams<CategoryProductPayload>) {
    super({
      id: p.id ?? newEventId(),
      type: CATEGORY_EVENT_TYPE.PRODUCT_ATTACHED,
      aggregateId: p.aggregateId,
      aggregateType: CATEGORY_AGGREGATE_TYPE,
      payload: p.payload,
      occurredAt: p.occurredAt ?? now(),
      version: p.version ?? 1,
      metadata: p.metadata,
    });
  }
}

export class CategoryProductDetachedEvent extends BaseDomainEvent<
  typeof CATEGORY_EVENT_TYPE.PRODUCT_DETACHED,
  CategoryProductPayload
> {
  constructor(p: EventParams<CategoryProductPayload>) {
    super({
      id: p.id ?? newEventId(),
      type: CATEGORY_EVENT_TYPE.PRODUCT_DETACHED,
      aggregateId: p.aggregateId,
      aggregateType: CATEGORY_AGGREGATE_TYPE,
      payload: p.payload,
      occurredAt: p.occurredAt ?? now(),
      version: p.version ?? 1,
      metadata: p.metadata,
    });
  }
}
