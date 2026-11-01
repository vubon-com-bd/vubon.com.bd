/**
 * Route Domain Events
 * @module logistics-service/domain/events
 */
import { BaseDomainEvent } from '@vubon/shared-kernel/domain/base/base.event';
import type { DomainEventMetadata } from '@vubon/shared-kernel/domain/base/base.event';
import type { Timestamp } from '@vubon/shared-types/common';

import { LOGISTICS_AGGREGATE_TYPE, newEventId, now } from './event.helpers.js';

export const ROUTE_EVENT_TYPE = {
  CREATED: 'logistics.route.created',
  PLANNED: 'logistics.route.planned',
  OPTIMIZED: 'logistics.route.optimized',
  STARTED: 'logistics.route.started',
  STOP_COMPLETED: 'logistics.route.stop_completed',
  COMPLETED: 'logistics.route.completed',
  CANCELLED: 'logistics.route.cancelled',
  ARCHIVED: 'logistics.route.archived',
  STATUS_CHANGED: 'logistics.route.status_changed',
} as const;

export interface RouteCreatedPayload {
  readonly routeId: string;
  readonly name: string;
  readonly code: string;
  readonly type: string;
  readonly stopCount: number;
  readonly createdAt: string;
}
export interface RoutePlannedPayload {
  readonly routeId: string;
  readonly scheduledDate: string;
  readonly plannedAt: string;
}
export interface RouteOptimizedPayload {
  readonly routeId: string;
  readonly optimization: string;
  readonly previousDistanceKm?: number;
  readonly newDistanceKm?: number;
  readonly optimizedAt: string;
}
export interface RouteStartedPayload {
  readonly routeId: string;
  readonly startedAt: string;
  readonly driverId?: string;
  readonly vehicleId?: string;
}
export interface RouteStopCompletedPayload {
  readonly routeId: string;
  readonly stopId: string;
  readonly stopOrder: number;
  readonly completedAt: string;
}
export interface RouteCompletedPayload {
  readonly routeId: string;
  readonly completedAt: string;
  readonly totalStops: number;
  readonly completedStops: number;
}
export interface RouteCancelledPayload {
  readonly routeId: string;
  readonly reason?: string;
  readonly cancelledAt: string;
}
export interface RouteArchivedPayload {
  readonly routeId: string;
  readonly archivedAt: string;
}
export interface RouteStatusChangedPayload {
  readonly routeId: string;
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
    aggregateType: LOGISTICS_AGGREGATE_TYPE.ROUTE,
    payload: p.payload,
    occurredAt: p.occurredAt ?? now(),
    version: p.version ?? 1,
    metadata: p.metadata,
  };
}

export class RouteCreatedEvent extends BaseDomainEvent<
  typeof ROUTE_EVENT_TYPE.CREATED,
  RouteCreatedPayload
> {
  constructor(p: EventParams<RouteCreatedPayload>) {
    super(buildParams(ROUTE_EVENT_TYPE.CREATED, p));
  }
}
export class RoutePlannedEvent extends BaseDomainEvent<
  typeof ROUTE_EVENT_TYPE.PLANNED,
  RoutePlannedPayload
> {
  constructor(p: EventParams<RoutePlannedPayload>) {
    super(buildParams(ROUTE_EVENT_TYPE.PLANNED, p));
  }
}
export class RouteOptimizedEvent extends BaseDomainEvent<
  typeof ROUTE_EVENT_TYPE.OPTIMIZED,
  RouteOptimizedPayload
> {
  constructor(p: EventParams<RouteOptimizedPayload>) {
    super(buildParams(ROUTE_EVENT_TYPE.OPTIMIZED, p));
  }
}
export class RouteStartedEvent extends BaseDomainEvent<
  typeof ROUTE_EVENT_TYPE.STARTED,
  RouteStartedPayload
> {
  constructor(p: EventParams<RouteStartedPayload>) {
    super(buildParams(ROUTE_EVENT_TYPE.STARTED, p));
  }
}
export class RouteStopCompletedEvent extends BaseDomainEvent<
  typeof ROUTE_EVENT_TYPE.STOP_COMPLETED,
  RouteStopCompletedPayload
> {
  constructor(p: EventParams<RouteStopCompletedPayload>) {
    super(buildParams(ROUTE_EVENT_TYPE.STOP_COMPLETED, p));
  }
}
export class RouteCompletedEvent extends BaseDomainEvent<
  typeof ROUTE_EVENT_TYPE.COMPLETED,
  RouteCompletedPayload
> {
  constructor(p: EventParams<RouteCompletedPayload>) {
    super(buildParams(ROUTE_EVENT_TYPE.COMPLETED, p));
  }
}
export class RouteCancelledEvent extends BaseDomainEvent<
  typeof ROUTE_EVENT_TYPE.CANCELLED,
  RouteCancelledPayload
> {
  constructor(p: EventParams<RouteCancelledPayload>) {
    super(buildParams(ROUTE_EVENT_TYPE.CANCELLED, p));
  }
}
export class RouteArchivedEvent extends BaseDomainEvent<
  typeof ROUTE_EVENT_TYPE.ARCHIVED,
  RouteArchivedPayload
> {
  constructor(p: EventParams<RouteArchivedPayload>) {
    super(buildParams(ROUTE_EVENT_TYPE.ARCHIVED, p));
  }
}
export class RouteStatusChangedEvent extends BaseDomainEvent<
  typeof ROUTE_EVENT_TYPE.STATUS_CHANGED,
  RouteStatusChangedPayload
> {
  constructor(p: EventParams<RouteStatusChangedPayload>) {
    super(buildParams(ROUTE_EVENT_TYPE.STATUS_CHANGED, p));
  }
}
