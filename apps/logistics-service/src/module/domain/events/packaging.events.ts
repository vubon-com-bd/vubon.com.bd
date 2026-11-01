/**
 * Packaging Domain Events
 * @module logistics-service/domain/events
 */
import { BaseDomainEvent } from '@vubon/shared-kernel/domain/base/base.event';
import type { DomainEventMetadata } from '@vubon/shared-kernel/domain/base/base.event';
import type { Timestamp } from '@vubon/shared-types/common';

import { LOGISTICS_AGGREGATE_TYPE, newEventId, now } from './event.helpers.js';

export const PACKAGING_EVENT_TYPE = {
  CREATED: 'logistics.packaging.created',
  ACTIVATED: 'logistics.packaging.activated',
  DEACTIVATED: 'logistics.packaging.deactivated',
  STOCK_ADDED: 'logistics.packaging.stock_added',
  STOCK_CONSUMED: 'logistics.packaging.stock_consumed',
  OUT_OF_STOCK: 'logistics.packaging.out_of_stock',
  DISCONTINUED: 'logistics.packaging.discontinued',
  STATUS_CHANGED: 'logistics.packaging.status_changed',
} as const;

export interface PackagingCreatedPayload {
  readonly packagingId: string;
  readonly code: string;
  readonly name: string;
  readonly type: string;
  readonly dimensions: string;
  readonly createdAt: string;
}
export interface PackagingActivatedPayload {
  readonly packagingId: string;
  readonly activatedAt: string;
}
export interface PackagingDeactivatedPayload {
  readonly packagingId: string;
  readonly reason?: string;
  readonly deactivatedAt: string;
}
export interface PackagingStockAddedPayload {
  readonly packagingId: string;
  readonly quantity: number;
  readonly newStock: number;
  readonly addedAt: string;
}
export interface PackagingStockConsumedPayload {
  readonly packagingId: string;
  readonly quantity: number;
  readonly newStock: number;
  readonly consumedAt: string;
}
export interface PackagingOutOfStockPayload {
  readonly packagingId: string;
  readonly markedAt: string;
}
export interface PackagingDiscontinuedPayload {
  readonly packagingId: string;
  readonly reason?: string;
  readonly discontinuedAt: string;
}
export interface PackagingStatusChangedPayload {
  readonly packagingId: string;
  readonly fromStatus: string;
  readonly toStatus: string;
  readonly reason?: string;
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
    aggregateType: LOGISTICS_AGGREGATE_TYPE.PACKAGING,
    payload: p.payload,
    occurredAt: p.occurredAt ?? now(),
    version: p.version ?? 1,
    metadata: p.metadata,
  };
}

export class PackagingCreatedEvent extends BaseDomainEvent<
  typeof PACKAGING_EVENT_TYPE.CREATED,
  PackagingCreatedPayload
> {
  constructor(p: EventParams<PackagingCreatedPayload>) {
    super(buildParams(PACKAGING_EVENT_TYPE.CREATED, p));
  }
}
export class PackagingActivatedEvent extends BaseDomainEvent<
  typeof PACKAGING_EVENT_TYPE.ACTIVATED,
  PackagingActivatedPayload
> {
  constructor(p: EventParams<PackagingActivatedPayload>) {
    super(buildParams(PACKAGING_EVENT_TYPE.ACTIVATED, p));
  }
}
export class PackagingDeactivatedEvent extends BaseDomainEvent<
  typeof PACKAGING_EVENT_TYPE.DEACTIVATED,
  PackagingDeactivatedPayload
> {
  constructor(p: EventParams<PackagingDeactivatedPayload>) {
    super(buildParams(PACKAGING_EVENT_TYPE.DEACTIVATED, p));
  }
}
export class PackagingStockAddedEvent extends BaseDomainEvent<
  typeof PACKAGING_EVENT_TYPE.STOCK_ADDED,
  PackagingStockAddedPayload
> {
  constructor(p: EventParams<PackagingStockAddedPayload>) {
    super(buildParams(PACKAGING_EVENT_TYPE.STOCK_ADDED, p));
  }
}
export class PackagingStockConsumedEvent extends BaseDomainEvent<
  typeof PACKAGING_EVENT_TYPE.STOCK_CONSUMED,
  PackagingStockConsumedPayload
> {
  constructor(p: EventParams<PackagingStockConsumedPayload>) {
    super(buildParams(PACKAGING_EVENT_TYPE.STOCK_CONSUMED, p));
  }
}
export class PackagingOutOfStockEvent extends BaseDomainEvent<
  typeof PACKAGING_EVENT_TYPE.OUT_OF_STOCK,
  PackagingOutOfStockPayload
> {
  constructor(p: EventParams<PackagingOutOfStockPayload>) {
    super(buildParams(PACKAGING_EVENT_TYPE.OUT_OF_STOCK, p));
  }
}
export class PackagingDiscontinuedEvent extends BaseDomainEvent<
  typeof PACKAGING_EVENT_TYPE.DISCONTINUED,
  PackagingDiscontinuedPayload
> {
  constructor(p: EventParams<PackagingDiscontinuedPayload>) {
    super(buildParams(PACKAGING_EVENT_TYPE.DISCONTINUED, p));
  }
}
export class PackagingStatusChangedEvent extends BaseDomainEvent<
  typeof PACKAGING_EVENT_TYPE.STATUS_CHANGED,
  PackagingStatusChangedPayload
> {
  constructor(p: EventParams<PackagingStatusChangedPayload>) {
    super(buildParams(PACKAGING_EVENT_TYPE.STATUS_CHANGED, p));
  }
}
