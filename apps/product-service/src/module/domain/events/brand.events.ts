/**
 * Brand domain events
 * @module product-service/domain/events
 */
import { BaseDomainEvent } from '@vubon/shared-kernel/domain/base/base.event';
import type { DomainEventMetadata } from '@vubon/shared-kernel/domain/base/base.event';
import type { Timestamp } from '@vubon/shared-types/common';
import { BRAND_AGGREGATE_TYPE, newEventId, now } from './event.helpers.js';

export const BRAND_EVENT_TYPE = {
  CREATED: 'brand.created',
  UPDATED: 'brand.updated',
  ACTIVATED: 'brand.activated',
  DEACTIVATED: 'brand.deactivated',
  DELETED: 'brand.deleted',
} as const;

export interface BrandCreatedPayload {
  readonly brandId: string;
  readonly name: string;
  readonly slug: string;
}

export interface BrandUpdatedPayload {
  readonly brandId: string;
  readonly changedFields: readonly string[];
}

export interface BrandStatusPayload {
  readonly brandId: string;
  readonly status: string;
  readonly changedBy: string;
}

export interface BrandDeletedPayload {
  readonly brandId: string;
  readonly deletedBy: string;
}

type EventParams<TPayload> = {
  id?: string;
  aggregateId: string;
  payload: TPayload;
  occurredAt?: Timestamp;
  version?: number;
  metadata?: DomainEventMetadata;
};

export class BrandCreatedEvent extends BaseDomainEvent<
  typeof BRAND_EVENT_TYPE.CREATED,
  BrandCreatedPayload
> {
  constructor(p: EventParams<BrandCreatedPayload>) {
    super({
      id: p.id ?? newEventId(),
      type: BRAND_EVENT_TYPE.CREATED,
      aggregateId: p.aggregateId,
      aggregateType: BRAND_AGGREGATE_TYPE,
      payload: p.payload,
      occurredAt: p.occurredAt ?? now(),
      version: p.version ?? 1,
      metadata: p.metadata,
    });
  }
}

export class BrandUpdatedEvent extends BaseDomainEvent<
  typeof BRAND_EVENT_TYPE.UPDATED,
  BrandUpdatedPayload
> {
  constructor(p: EventParams<BrandUpdatedPayload>) {
    super({
      id: p.id ?? newEventId(),
      type: BRAND_EVENT_TYPE.UPDATED,
      aggregateId: p.aggregateId,
      aggregateType: BRAND_AGGREGATE_TYPE,
      payload: p.payload,
      occurredAt: p.occurredAt ?? now(),
      version: p.version ?? 1,
      metadata: p.metadata,
    });
  }
}

export class BrandActivatedEvent extends BaseDomainEvent<
  typeof BRAND_EVENT_TYPE.ACTIVATED,
  BrandStatusPayload
> {
  constructor(p: EventParams<BrandStatusPayload>) {
    super({
      id: p.id ?? newEventId(),
      type: BRAND_EVENT_TYPE.ACTIVATED,
      aggregateId: p.aggregateId,
      aggregateType: BRAND_AGGREGATE_TYPE,
      payload: p.payload,
      occurredAt: p.occurredAt ?? now(),
      version: p.version ?? 1,
      metadata: p.metadata,
    });
  }
}

export class BrandDeactivatedEvent extends BaseDomainEvent<
  typeof BRAND_EVENT_TYPE.DEACTIVATED,
  BrandStatusPayload
> {
  constructor(p: EventParams<BrandStatusPayload>) {
    super({
      id: p.id ?? newEventId(),
      type: BRAND_EVENT_TYPE.DEACTIVATED,
      aggregateId: p.aggregateId,
      aggregateType: BRAND_AGGREGATE_TYPE,
      payload: p.payload,
      occurredAt: p.occurredAt ?? now(),
      version: p.version ?? 1,
      metadata: p.metadata,
    });
  }
}

export class BrandDeletedEvent extends BaseDomainEvent<
  typeof BRAND_EVENT_TYPE.DELETED,
  BrandDeletedPayload
> {
  constructor(p: EventParams<BrandDeletedPayload>) {
    super({
      id: p.id ?? newEventId(),
      type: BRAND_EVENT_TYPE.DELETED,
      aggregateId: p.aggregateId,
      aggregateType: BRAND_AGGREGATE_TYPE,
      payload: p.payload,
      occurredAt: p.occurredAt ?? now(),
      version: p.version ?? 1,
      metadata: p.metadata,
    });
  }
}
