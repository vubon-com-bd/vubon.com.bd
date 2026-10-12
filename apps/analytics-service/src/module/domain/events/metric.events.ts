/**
 * Metric Domain Events
 * @module analytics-service/domain/events
 */
import { BaseDomainEvent } from '@vubon/shared-kernel/domain/base';
import type { Timestamp } from '@vubon/shared-types/common';

export class MetricRecordedEvent extends BaseDomainEvent<'analytics.metric.recorded', {
  readonly metricId: string;
  readonly metricName: string;
  readonly value: number;
}> {
  constructor(
    metricId: string,
    metricName: string,
    value: number,
    occurredAt: string
  ) {
    super({
      id: `metric-recorded-${metricId}-${Date.now()}`,
      type: 'analytics.metric.recorded',
      aggregateId: metricId,
      aggregateType: 'Metric',
      payload: { metricId, metricName, value },
      occurredAt: occurredAt as unknown as Timestamp,
      version: 1,
    });
  }
}

export class MetricAggregatedEvent extends BaseDomainEvent<'analytics.metric.aggregated', {
  readonly metricId: string;
  readonly metricName: string;
  readonly total: number;
  readonly sampleCount: number;
}> {
  constructor(
    metricId: string,
    metricName: string,
    total: number,
    sampleCount: number,
    occurredAt: string
  ) {
    super({
      id: `metric-aggregated-${metricId}-${Date.now()}`,
      type: 'analytics.metric.aggregated',
      aggregateId: metricId,
      aggregateType: 'Metric',
      payload: { metricId, metricName, total, sampleCount },
      occurredAt: occurredAt as unknown as Timestamp,
      version: 2,
    });
  }
}
