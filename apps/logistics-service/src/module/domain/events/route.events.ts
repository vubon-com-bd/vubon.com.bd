/**
 * Route domain events
 * @module logistics-service/domain/events
 */
import { BaseDomainEvent } from '@vubon/shared-kernel/domain/base/base.event';
import type { DomainEventMetadata } from '@vubon/shared-kernel/domain/base/base.event';
import type { Timestamp } from '@vubon/shared-types/common';
import { ROUTE_AGGREGATE_TYPE, newEventId, now } from './event.helpers.js';

export const ROUTE_EVENT_TYPE = {
  CREATED: 'route.created',
  STOPS_REORDERED: 'route.stops_reordered',
  STOP_ADDED: 'route.stop_added',
  STOP_REMOVED: 'route.stop_removed',
  STOP_COMPLETED: 'route.stop_completed',
  OPTIMIZATION_STARTED: 'route.optimization_started',
  OPTIMIZATION_COMPLETED: 'route.optimization_completed',
  PLANNED: 'route.planned',
  STARTED: 'route.started',
  COMPLETED: 'route.completed',
  CANCELLED: 'route.cancelled',
  ARCHIVED: 'route.archived',
} as const;

export interface RouteCreatedPayload {
  readonly routeId: string;
  readonly code: string;
  readonly name: string;
  readonly type: string;
  readonly scheduledDate: string;
  readonly totalStops: number;
}

export interface RouteStatusChangedPayload {
  readonly routeId: string;
  readonly fromStatus: string;
  readonly toStatus: string;
  readonly reason?: string;
}

export interface RouteStopsReorderedPayload {
  readonly routeId: string;
  readonly stopCount: number;
  readonly reorderedAt: string;
}

export interface RouteStopAddedPayload {
  readonly routeId: string;
  readonly stopId: string;
  readonly order: number;
  readonly shipmentCount: number;
}

export interface RouteStopRemovedPayload {
  readonly routeId: string;
  readonly stopId: string;
}

export interface RouteStopCompletedPayload {
  readonly routeId: string;
  readonly stopId: string;
  readonly completedAt: string;
}

export interface RouteOptimizationCompletedPayload {
  readonly routeId: string;
  readonly optimization: string;
  readonly totalDistanceKm?: number;
  readonly totalDurationMinutes?: number;
  readonly optimizedAt: string;
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
    aggregateType: ROUTE_AGGREGATE_TYPE,
    payload: p.payload,
    occurredAt: p.occurredAt ?? now(),
    version: p.version ?? 1,
    metadata: p.metadata,
  };
}

export class RouteCreatedEvent extends BaseDomainEvent<typeof ROUTE_EVENT_TYPE.CREATED, RouteCreatedPayload> {
  constructor(p: EventParams<RouteCreatedPayload>) { super(buildParams(ROUTE_EVENT_TYPE.CREATED, p)); }
}
export class RouteStatusChangedEvent extends BaseDomainEvent<typeof ROUTE_EVENT_TYPE.PLANNED, RouteStatusChangedPayload> {
  constructor(p: EventParams<RouteStatusChangedPayload>) { super(buildParams(ROUTE_EVENT_TYPE.PLANNED, p)); }
}
export class RouteStartedEvent extends BaseDomainEvent<typeof ROUTE_EVENT_TYPE.STARTED, RouteStatusChangedPayload> {
  constructor(p: EventParams<RouteStatusChangedPayload>) { super(buildParams(ROUTE_EVENT_TYPE.STARTED, p)); }
}
export class RouteCompletedEvent extends BaseDomainEvent<typeof ROUTE_EVENT_TYPE.COMPLETED, RouteStatusChangedPayload> {
  constructor(p: EventParams<RouteStatusChangedPayload>) { super(buildParams(ROUTE_EVENT_TYPE.COMPLETED, p)); }
}
export class RouteCancelledEvent extends BaseDomainEvent<typeof ROUTE_EVENT_TYPE.CANCELLED, RouteStatusChangedPayload> {
  constructor(p: EventParams<RouteStatusChangedPayload>) { super(buildParams(ROUTE_EVENT_TYPE.CANCELLED, p)); }
}
export class RouteArchivedEvent extends BaseDomainEvent<typeof ROUTE_EVENT_TYPE.ARCHIVED, RouteStatusChangedPayload> {
  constructor(p: EventParams<RouteStatusChangedPayload>) { super(buildParams(ROUTE_EVENT_TYPE.ARCHIVED, p)); }
}
export class RouteStopsReorderedEvent extends BaseDomainEvent<typeof ROUTE_EVENT_TYPE.STOPS_REORDERED, RouteStopsReorderedPayload> {
  constructor(p: EventParams<RouteStopsReorderedPayload>) { super(buildParams(ROUTE_EVENT_TYPE.STOPS_REORDERED, p)); }
}
export class RouteStopAddedEvent extends BaseDomainEvent<typeof ROUTE_EVENT_TYPE.STOP_ADDED, RouteStopAddedPayload> {
  constructor(p: EventParams<RouteStopAddedPayload>) { super(buildParams(ROUTE_EVENT_TYPE.STOP_ADDED, p)); }
}
export class RouteStopRemovedEvent extends BaseDomainEvent<typeof ROUTE_EVENT_TYPE.STOP_REMOVED, RouteStopRemovedPayload> {
  constructor(p: EventParams<RouteStopRemovedPayload>) { super(buildParams(ROUTE_EVENT_TYPE.STOP_REMOVED, p)); }
}
export class RouteStopCompletedEvent extends BaseDomainEvent<typeof ROUTE_EVENT_TYPE.STOP_COMPLETED, RouteStopCompletedPayload> {
  constructor(p: EventParams<RouteStopCompletedPayload>) { super(buildParams(ROUTE_EVENT_TYPE.STOP_COMPLETED, p)); }
}
export class RouteOptimizationStartedEvent extends BaseDomainEvent<typeof ROUTE_EVENT_TYPE.OPTIMIZATION_STARTED, RouteStatusChangedPayload> {
  constructor(p: EventParams<RouteStatusChangedPayload>) { super(buildParams(ROUTE_EVENT_TYPE.OPTIMIZATION_STARTED, p)); }
}
export class RouteOptimizationCompletedEvent extends BaseDomainEvent<typeof ROUTE_EVENT_TYPE.OPTIMIZATION_COMPLETED, RouteOptimizationCompletedPayload> {
  constructor(p: EventParams<RouteOptimizationCompletedPayload>) { super(buildParams(ROUTE_EVENT_TYPE.OPTIMIZATION_COMPLETED, p)); }
}
