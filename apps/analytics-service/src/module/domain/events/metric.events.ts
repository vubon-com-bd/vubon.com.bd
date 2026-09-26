import {
  BaseDomainEvent,
  type DomainEventMetadata,
} from '@vubon/shared-kernel/domain/base/base.event';
import { toTimestamp } from '@vubon/shared-types/common';

const AGG = 'Metric';

export class MetricRecordedEvent extends BaseDomainEvent<
  'analytics.metric.recorded',
  { metricId: string; name: string; value: number }
> {
  constructor(
    aggregateId: string,
    metricId: string,
    name: string,
    value: number,
    version: number,
    metadata?: DomainEventMetadata,
  ) {
    super({
      id: crypto.randomUUID(),
      type: 'analytics.metric.recorded',
      aggregateId,
      aggregateType: AGG,
      payload: { metricId, name, value },
      occurredAt: toTimestamp(Date.now()),
      version,
      metadata,
    });
  }
}

export class MetricAggregatedEvent extends BaseDomainEvent<
  'analytics.metric.aggregated',
  { metricId: string; value: number }
> {
  constructor(
    aggregateId: string,
    metricId: string,
    value: number,
    version: number,
    metadata?: DomainEventMetadata,
  ) {
    super({
      id: crypto.randomUUID(),
      type: 'analytics.metric.aggregated',
      aggregateId,
      aggregateType: AGG,
      payload: { metricId, value },
      occurredAt: toTimestamp(Date.now()),
      version,
      metadata,
    });
  }
}
