/**
 * Metric Event Store Interface
 * @module analytics-service/domain/event-store
 */
import type { BaseEventStore } from '@vubon/shared-kernel/domain/base';
import type { MetricEntity } from '../entities/metric.entity.js';
import type { TimeRangeVO } from '../value-objects/composites/time-range.vo.js';

export interface MetricEventStore extends BaseEventStore {
  /** Rebuild MetricEntity from event stream */
  reconstitute(aggregateId: string): Promise<MetricEntity | null>;

  /** Load all metric events in time range */
  loadRange(range: TimeRangeVO): Promise<readonly MetricEntity[]>;

  /** Get latest metric snapshot */
  loadLatestSnapshot(seriesKey: string): Promise<MetricEntity | null>;

  /** Purge old events */
  purge(cutoff: string): Promise<number>;
}
