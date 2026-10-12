/**
 * Metric Service Interface
 * @module analytics-service/application/services/interfaces
 */
import type { BaseServiceInterface } from '@vubon/shared-kernel/application/services';
import type { MetricEntity } from '../../../domain/entities/metric.entity.js';
import type { MetricResponseData } from '../../dtos/responses/metric-response.dto.js';
import type { AggregateMetricDto } from '../../dtos/requests/metric/aggregate-metric.dto.js';
import type { MetricAggregationResponseData } from '../../dtos/responses/metric-aggregation-response.dto.js';

export interface IMetricService extends BaseServiceInterface<MetricEntity, string> {
  record(input: { name: string; value: number; unit: string; type: string; seriesKey: string }): Promise<MetricResponseData>;
  findById(id: string): Promise<MetricResponseData | null>;
  findBySeriesKey(seriesKey: string): Promise<MetricResponseData | null>;
  aggregate(input: AggregateMetricDto): Promise<MetricAggregationResponseData>;
}
