/**
 * Category Domain Events
 * @module product-service/domain/events
 */
import { BaseDomainEvent } from '@vubon/shared-kernel/domain/base/base.event';
import type { DomainEventMetadata } from '@vubon/shared-kernel/domain/base/base.event';
import type { Timestamp } from '@vubon/shared-types/common';
import { PRODUCT_AGGREGATE_TYPE, newEventId, now } from './event.helpers.js';

export const CATEGORY_EVENT_TYPE = {
  CREATED: 'product.category.created',
  UPDATED: 'product.category.updated',
  MOVED: 'product.category.moved',
  ACTIVATED: 'product.category.activated',
  DEACTIVATED: 'product.category.deactivated',
  DELETED: 'product.category.deleted',
} as const;

export interface CategoryCreatedPayload {
  readonly categoryId: string;
  readonly name: string;
  readonly slug: string;
  readonly parentId?: string;
  readonly depth: number;
  readonly createdAt: string;
}

export interface CategoryUpdatedPayload {
  readonly categoryId: string;
  readonly changedFields: readonly string[];
  readonly updatedAt: string;
}

export interface CategoryMovedPayload {
  readonly categoryId: string;
  readonly previousParentId?: string;
  readonly newParentId?: string;
  readonly newDepth: number;
  readonly movedAt: string;
}

export interface CategoryActivatedPayload {
  readonly categoryId: string;
  readonly activatedAt: string;
}

export interface CategoryDeactivatedPayload {
  readonly categoryId: string;
  readonly reason?: string;
  readonly deactivatedAt: string;
}

export interface CategoryDeletedPayload {
  readonly categoryId: string;
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
    aggregateType: PRODUCT_AGGREGATE_TYPE.CATEGORY,
    payload: p.payload,
    occurredAt: p.occurredAt ?? now(),
    version: p.version ?? 1,
    metadata: p.metadata,
  };
}

export class CategoryCreatedEvent extends BaseDomainEvent<
  typeof CATEGORY_EVENT_TYPE.CREATED,
  CategoryCreatedPayload
> {
  constructor(p: EventParams<CategoryCreatedPayload>) {
    super(buildParams(CATEGORY_EVENT_TYPE.CREATED, p));
  }
}

export class CategoryUpdatedEvent extends BaseDomainEvent<
  typeof CATEGORY_EVENT_TYPE.UPDATED,
  CategoryUpdatedPayload
> {
  constructor(p: EventParams<CategoryUpdatedPayload>) {
    super(buildParams(CATEGORY_EVENT_TYPE.UPDATED, p));
  }
}

export class CategoryMovedEvent extends BaseDomainEvent<
  typeof CATEGORY_EVENT_TYPE.MOVED,
  CategoryMovedPayload
> {
  constructor(p: EventParams<CategoryMovedPayload>) {
    super(buildParams(CATEGORY_EVENT_TYPE.MOVED, p));
  }
}

export class CategoryActivatedEvent extends BaseDomainEvent<
  typeof CATEGORY_EVENT_TYPE.ACTIVATED,
  CategoryActivatedPayload
> {
  constructor(p: EventParams<CategoryActivatedPayload>) {
    super(buildParams(CATEGORY_EVENT_TYPE.ACTIVATED, p));
  }
}

export class CategoryDeactivatedEvent extends BaseDomainEvent<
  typeof CATEGORY_EVENT_TYPE.DEACTIVATED,
  CategoryDeactivatedPayload
> {
  constructor(p: EventParams<CategoryDeactivatedPayload>) {
    super(buildParams(CATEGORY_EVENT_TYPE.DEACTIVATED, p));
  }
}

export class CategoryDeletedEvent extends BaseDomainEvent<
  typeof CATEGORY_EVENT_TYPE.DELETED,
  CategoryDeletedPayload
> {
  constructor(p: EventParams<CategoryDeletedPayload>) {
    super(buildParams(CATEGORY_EVENT_TYPE.DELETED, p));
  }
}
