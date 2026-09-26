import { Injectable } from '@nestjs/common';
import { BaseService } from '@vubon/shared-kernel/application/services/base.service';
import { MetricAggregationEntity } from '../../../domain/entities/metric-aggregation.entity';
import { MetricIdVO } from '../../../domain/value-objects/primitives/metric-id.vo';
import type { MetricAggregationRepository } from '../../../domain/repositories/metric-aggregation.repository.interface';
import type { MetricAggregationServiceInterface } from '../interfaces/metric-aggregation.service.interface';

@Injectable()
export class MetricAggregationService
  extends BaseService<MetricAggregationEntity, MetricIdVO>
  implements MetricAggregationServiceInterface
{
  readonly name = 'MetricAggregationService';

  constructor(private readonly repo: MetricAggregationRepository) {
    super();
  }

  async findByMetricId(metricId: string): Promise<readonly MetricAggregationEntity[]> {
    return this.repo.findByMetricId(MetricIdVO.create(metricId));
  }
}
