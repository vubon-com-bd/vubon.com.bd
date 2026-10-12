/**
 * Packaging domain events
 * @module logistics-service/domain/events
 */
import { BaseDomainEvent } from '@vubon/shared-kernel/domain/base/base.event';
import type { DomainEventMetadata } from '@vubon/shared-kernel/domain/base/base.event';
import type { Timestamp } from '@vubon/shared-types/common';
import { PACKAGING_AGGREGATE_TYPE, newEventId, now } from './event.helpers.js';

export const PACKAGING_EVENT_TYPE = {
  CREATED: 'packaging.created',
  ACTIVATED: 'packaging.activated',
  DEACTIVATED: 'packaging.deactivated',
  OUT_OF_STOCK: 'packaging.out_of_stock',
  RESTOCKED: 'packaging.restocked',
  DISCONTINUED: 'packaging.discontinued',
  STOCK_ADJUSTED: 'packaging.stock_adjusted',
  MADE_DEFAULT: 'packaging.made_default',
} as const;

export interface PackagingCreatedPayload {
  readonly packagingId: string;
  readonly code: string;
  readonly name: string;
  readonly type: string;
  readonly material: string;
}

export interface PackagingStatusChangedPayload {
  readonly packagingId: string;
  readonly fromStatus: string;
  readonly toStatus: string;
  readonly reason?: string;
}

export interface PackagingStockAdjustedPayload {
  readonly packagingId: string;
  readonly previousStock: number;
  readonly newStock: number;
  readonly delta: number;
  readonly adjustedAt: string;
  readonly reason?: string;
}

export interface PackagingDefaultChangedPayload {
  readonly packagingId: string;
  readonly isDefault: boolean;
  readonly changedAt: string;
}

type EventParams<TPayload> = {
  id?: string;
  aggregateId: string;
  payload: TPayload;
  occurredAt?: Timestamp;
  version?: number;
  metadata?: DomainEventMetadata;
};

function buildParams<TType extends string, TPayload>(type: TType, p: EventParams<TPayload>) {
  return {
    id: p.id ?? newEventId(),
    type,
    aggregateId: p.aggregateId,
    aggregateType: PACKAGING_AGGREGATE_TYPE,
    payload: p.payload,
    occurredAt: p.occurredAt ?? now(),
    version: p.version ?? 1,
    metadata: p.metadata,
  };
}

export class PackagingCreatedEvent extends BaseDomainEvent<typeof PACKAGING_EVENT_TYPE.CREATED, PackagingCreatedPayload> {
  constructor(p: EventParams<PackagingCreatedPayload>) { super(buildParams(PACKAGING_EVENT_TYPE.CREATED, p)); }
}
export class PackagingActivatedEvent extends BaseDomainEvent<typeof PACKAGING_EVENT_TYPE.ACTIVATED, PackagingStatusChangedPayload> {
  constructor(p: EventParams<PackagingStatusChangedPayload>) { super(buildParams(PACKAGING_EVENT_TYPE.ACTIVATED, p)); }
}
export class PackagingDeactivatedEvent extends BaseDomainEvent<typeof PACKAGING_EVENT_TYPE.DEACTIVATED, PackagingStatusChangedPayload> {
  constructor(p: EventParams<PackagingStatusChangedPayload>) { super(buildParams(PACKAGING_EVENT_TYPE.DEACTIVATED, p)); }
}
export class PackagingOutOfStockEvent extends BaseDomainEvent<typeof PACKAGING_EVENT_TYPE.OUT_OF_STOCK, PackagingStatusChangedPayload> {
  constructor(p: EventParams<PackagingStatusChangedPayload>) { super(buildParams(PACKAGING_EVENT_TYPE.OUT_OF_STOCK, p)); }
}
export class PackagingRestockedEvent extends BaseDomainEvent<typeof PACKAGING_EVENT_TYPE.RESTOCKED, PackagingStockAdjustedPayload> {
  constructor(p: EventParams<PackagingStockAdjustedPayload>) { super(buildParams(PACKAGING_EVENT_TYPE.RESTOCKED, p)); }
}
export class PackagingDiscontinuedEvent extends BaseDomainEvent<typeof PACKAGING_EVENT_TYPE.DISCONTINUED, PackagingStatusChangedPayload> {
  constructor(p: EventParams<PackagingStatusChangedPayload>) { super(buildParams(PACKAGING_EVENT_TYPE.DISCONTINUED, p)); }
}
export class PackagingStockAdjustedEvent extends BaseDomainEvent<typeof PACKAGING_EVENT_TYPE.STOCK_ADJUSTED, PackagingStockAdjustedPayload> {
  constructor(p: EventParams<PackagingStockAdjustedPayload>) { super(buildParams(PACKAGING_EVENT_TYPE.STOCK_ADJUSTED, p)); }
}
export class PackagingMadeDefaultEvent extends BaseDomainEvent<typeof PACKAGING_EVENT_TYPE.MADE_DEFAULT, PackagingDefaultChangedPayload> {
  constructor(p: EventParams<PackagingDefaultChangedPayload>) { super(buildParams(PACKAGING_EVENT_TYPE.MADE_DEFAULT, p)); }
}
