/**
 * Brand Domain Events
 * @module product-service/domain/events
 */
import { BaseDomainEvent } from '@vubon/shared-kernel/domain/base/base.event';
import type { DomainEventMetadata } from '@vubon/shared-kernel/domain/base/base.event';
import type { Timestamp } from '@vubon/shared-types/common';
import { PRODUCT_AGGREGATE_TYPE, newEventId, now } from './event.helpers.js';

export const BRAND_EVENT_TYPE = {
  CREATED: 'product.brand.created',
  UPDATED: 'product.brand.updated',
  ACTIVATED: 'product.brand.activated',
  DEACTIVATED: 'product.brand.deactivated',
  LOGO_UPDATED: 'product.brand.logo_updated',
  DELETED: 'product.brand.deleted',
} as const;

export interface BrandCreatedPayload {
  readonly brandId: string;
  readonly name: string;
  readonly slug: string;
  readonly createdAt: string;
}

export interface BrandUpdatedPayload {
  readonly brandId: string;
  readonly changedFields: readonly string[];
  readonly updatedAt: string;
}

export interface BrandActivatedPayload {
  readonly brandId: string;
  readonly activatedAt: string;
}

export interface BrandDeactivatedPayload {
  readonly brandId: string;
  readonly reason?: string;
  readonly deactivatedAt: string;
}

export interface BrandLogoUpdatedPayload {
  readonly brandId: string;
  readonly previousLogoUrl?: string;
  readonly newLogoUrl: string;
  readonly updatedAt: string;
}

export interface BrandDeletedPayload {
  readonly brandId: string;
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
    aggregateType: PRODUCT_AGGREGATE_TYPE.BRAND,
    payload: p.payload,
    occurredAt: p.occurredAt ?? now(),
    version: p.version ?? 1,
    metadata: p.metadata,
  };
}

export class BrandCreatedEvent extends BaseDomainEvent<
  typeof BRAND_EVENT_TYPE.CREATED,
  BrandCreatedPayload
> {
  constructor(p: EventParams<BrandCreatedPayload>) {
    super(buildParams(BRAND_EVENT_TYPE.CREATED, p));
  }
}

export class BrandUpdatedEvent extends BaseDomainEvent<
  typeof BRAND_EVENT_TYPE.UPDATED,
  BrandUpdatedPayload
> {
  constructor(p: EventParams<BrandUpdatedPayload>) {
    super(buildParams(BRAND_EVENT_TYPE.UPDATED, p));
  }
}

export class BrandActivatedEvent extends BaseDomainEvent<
  typeof BRAND_EVENT_TYPE.ACTIVATED,
  BrandActivatedPayload
> {
  constructor(p: EventParams<BrandActivatedPayload>) {
    super(buildParams(BRAND_EVENT_TYPE.ACTIVATED, p));
  }
}

export class BrandDeactivatedEvent extends BaseDomainEvent<
  typeof BRAND_EVENT_TYPE.DEACTIVATED,
  BrandDeactivatedPayload
> {
  constructor(p: EventParams<BrandDeactivatedPayload>) {
    super(buildParams(BRAND_EVENT_TYPE.DEACTIVATED, p));
  }
}

export class BrandLogoUpdatedEvent extends BaseDomainEvent<
  typeof BRAND_EVENT_TYPE.LOGO_UPDATED,
  BrandLogoUpdatedPayload
> {
  constructor(p: EventParams<BrandLogoUpdatedPayload>) {
    super(buildParams(BRAND_EVENT_TYPE.LOGO_UPDATED, p));
  }
}

export class BrandDeletedEvent extends BaseDomainEvent<
  typeof BRAND_EVENT_TYPE.DELETED,
  BrandDeletedPayload
> {
  constructor(p: EventParams<BrandDeletedPayload>) {
    super(buildParams(BRAND_EVENT_TYPE.DELETED, p));
  }
}
