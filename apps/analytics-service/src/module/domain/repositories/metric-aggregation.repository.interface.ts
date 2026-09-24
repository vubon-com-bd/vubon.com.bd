import type { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import { MetricAggregationEntity } from '../entities/metric-aggregation.entity';
import { MetricIdVO } from '../value-objects/primitives/metric-id.vo';

export interface MetricAggregationRepository
  extends BaseRepository<MetricAggregationEntity, MetricIdVO> {
  findByMetricId(metricId: MetricIdVO): Promise<readonly MetricAggregationEntity[]>;
}
