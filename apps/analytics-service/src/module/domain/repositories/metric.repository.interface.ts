/**
 * Metric Repository Interface
 * @module analytics-service/domain/repositories
 */
import type { BaseRepository } from '@vubon/shared-kernel/domain/base';
import type { MetricEntity } from '../entities/metric.entity.js';
import type { MetricIdVO } from '../value-objects/primitives/metric-id.vo.js';
import type { MetricNameVO } from '../value-objects/primitives/metric-name.vo.js';
import type { TimeRangeVO } from '../value-objects/composites/time-range.vo.js';

export interface MetricRepository extends BaseRepository<MetricEntity, string> {
  findByMetricId(id: MetricIdVO): Promise<MetricEntity | null>;
  findByName(name: MetricNameVO): Promise<readonly MetricEntity[]>;
  findBySeriesKey(seriesKey: string): Promise<MetricEntity | null>;
  findActiveInRange(range: TimeRangeVO): Promise<readonly MetricEntity[]>;
  bulkUpsert(metrics: readonly MetricEntity[]): Promise<number>;
  deleteOlderThan(cutoff: string): Promise<number>;
}
