/**
 * Metric Aggregation Service Interface
 * @module analytics-service/application/services/interfaces
 */
import type { BaseServiceInterface } from '@vubon/shared-kernel/application/services';
import type { MetricAggregationEntity } from '../../../domain/entities/metric-aggregation.entity.js';

export interface IMetricAggregationService extends BaseServiceInterface<MetricAggregationEntity, string> {
  findByKey(key: string): Promise<MetricAggregationEntity | null>;
  save(entity: MetricAggregationEntity): Promise<MetricAggregationEntity>;
  bulkSave(entities: readonly MetricAggregationEntity[]): Promise<number>;
}
