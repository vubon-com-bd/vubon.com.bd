/**
 * Metric Aggregation Repository Interface
 * @module analytics-service/domain/repositories
 */
import type { BaseRepository } from '@vubon/shared-kernel/domain/base';
import type { MetricAggregationEntity } from '../entities/metric-aggregation.entity.js';
import type { MetricNameVO } from '../value-objects/primitives/metric-name.vo.js';
import type { TimeRangeVO } from '../value-objects/composites/time-range.vo.js';

export interface AggregationQuery {
  readonly metric: MetricNameVO;
  readonly range: TimeRangeVO;
  readonly dimensionKeys?: readonly string[];
}

export interface MetricAggregationRepository extends BaseRepository<MetricAggregationEntity, string> {
  findByAggregationKey(key: string): Promise<MetricAggregationEntity | null>;
  findByQuery(query: AggregationQuery): Promise<readonly MetricAggregationEntity[]>;
  countByQuery(query: AggregationQuery): Promise<number>;
  bulkUpsert(aggregations: readonly MetricAggregationEntity[]): Promise<number>;
  deleteOlderThan(cutoff: string): Promise<number>;
}
