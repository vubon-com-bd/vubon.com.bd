import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { BaseQueryHandler } from '@vubon/shared-kernel/application/queries/base.query-handler';
import { GetMetricQuery } from './get-metric.query';
import type { MetricRepository } from '../../../domain/repositories/metric.repository.interface';
import { MetricIdVO } from '../../../domain/value-objects/primitives/metric-id.vo';
import { MetricNotFoundError } from '../../../domain/errors/metric.errors';
import {
  type MetricResponseDTO,
  toMetricResponse,
} from '../../dtos/responses';

@QueryHandler(GetMetricQuery)
export class GetMetricHandler
  extends BaseQueryHandler<GetMetricQuery, MetricResponseDTO>
  implements IQueryHandler<GetMetricQuery>
{
  readonly queryType = 'analytics.metric.get';

  constructor(private readonly metricRepo: MetricRepository) {
    super();
  }

  async execute(query: GetMetricQuery): Promise<MetricResponseDTO> {
    const entity = await this.metricRepo.findById(MetricIdVO.create(query.metricId));
    if (!entity) throw new MetricNotFoundError(query.metricId);
    return toMetricResponse(entity);
  }
}
