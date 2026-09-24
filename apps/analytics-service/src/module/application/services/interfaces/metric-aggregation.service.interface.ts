import type { BaseServiceInterface } from '@vubon/shared-kernel/application/services/base.service.interface';
import type { MetricAggregationEntity } from '../../../domain/entities/metric-aggregation.entity';
import type { MetricIdVO } from '../../../domain/value-objects/primitives/metric-id.vo';

export interface MetricAggregationServiceInterface
  extends BaseServiceInterface<MetricAggregationEntity, MetricIdVO> {
  findByMetricId(metricId: string): Promise<readonly MetricAggregationEntity[]>;
}
