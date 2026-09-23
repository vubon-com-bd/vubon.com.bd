import {
  BaseDomainEvent,
  type DomainEventMetadata,
} from '@vubon/shared-kernel/domain/base/base.event';
import { toTimestamp } from '@vubon/shared-types/common';

const AGGREGATE = 'Route';

export class RouteCreatedEvent extends BaseDomainEvent<
  'logistics.route.created',
  { routeId: string; name: string }
> {
  constructor(aggregateId: string, routeId: string, name: string, version: number, metadata?: DomainEventMetadata) {
    super({
      id: crypto.randomUUID(),
      type: 'logistics.route.created',
      aggregateId,
      aggregateType: AGGREGATE,
      payload: { routeId, name },
      occurredAt: toTimestamp(Date.now()),
      version,
      metadata,
    });
  }
}

export class RouteOptimizedEvent extends BaseDomainEvent<
  'logistics.route.optimized',
  { routeId: string; distanceKm: number }
> {
  constructor(aggregateId: string, routeId: string, distanceKm: number, version: number, metadata?: DomainEventMetadata) {
    super({
      id: crypto.randomUUID(),
      type: 'logistics.route.optimized',
      aggregateId,
      aggregateType: AGGREGATE,
      payload: { routeId, distanceKm },
      occurredAt: toTimestamp(Date.now()),
      version,
      metadata,
    });
  }
}
