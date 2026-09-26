import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { BaseQueryHandler } from '@vubon/shared-kernel/application/queries/base.query-handler';
import { AggregateMetricQuery } from './aggregate-metric.query';
import type { MetricServiceInterface } from '../../services/interfaces/metric.service.interface';
import type { MetricAggregationResponseDTO } from '../../dtos/responses';

@QueryHandler(AggregateMetricQuery)
export class AggregateMetricHandler
  extends BaseQueryHandler<AggregateMetricQuery, readonly MetricAggregationResponseDTO[]>
  implements IQueryHandler<AggregateMetricQuery>
{
  readonly queryType = 'analytics.metric.aggregate';

  constructor(private readonly metricService: MetricServiceInterface) {
    super();
  }

  async execute(
    query: AggregateMetricQuery,
  ): Promise<readonly MetricAggregationResponseDTO[]> {
    return this.metricService.aggregate({
      metricNames: [...query.metricNames],
      aggregation: query.aggregation,
      interval: query.interval,
      groupBy: query.groupBy ? [...query.groupBy] : undefined,
      fromDate: query.fromDate,
      toDate: query.toDate,
      limit: 1000,
    });
  }
}
