import type { BaseServiceInterface } from '@vubon/shared-kernel/application/services/base.service.interface';
import type { MetricEntity } from '../../../domain/entities/metric.entity';
import type { MetricIdVO } from '../../../domain/value-objects/primitives/metric-id.vo';
import type { QueryMetricDTO, AggregateMetricDTO } from '../../dtos/requests/metric';
import type { MetricResponseDTO, MetricAggregationResponseDTO } from '../../dtos/responses';

export interface MetricServiceInterface
  extends BaseServiceInterface<MetricEntity, MetricIdVO> {
  queryMetrics(input: QueryMetricDTO): Promise<readonly MetricResponseDTO[]>;
  aggregate(input: AggregateMetricDTO): Promise<readonly MetricAggregationResponseDTO[]>;
}
