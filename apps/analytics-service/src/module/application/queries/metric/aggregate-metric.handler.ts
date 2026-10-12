import { MetricService } from '../../services/impl/metric.service.js';
import { Injectable } from '@nestjs/common';
import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { BaseQueryHandler } from '@vubon/shared-kernel/application/queries';
import { AggregateMetricQuery } from './aggregate-metric.query.js';
import type { MetricAggregationResponseData } from '../../dtos/responses/metric-aggregation-response.dto.js';

@Injectable()
@QueryHandler(AggregateMetricQuery)
export class AggregateMetricHandler extends BaseQueryHandler<AggregateMetricQuery, MetricAggregationResponseData>
  implements IQueryHandler<AggregateMetricQuery> {
  readonly queryType = 'analytics.metric.aggregate';
  constructor(private readonly service: MetricService) { super(); }
  async execute(query: AggregateMetricQuery): Promise<MetricAggregationResponseData> {
    return this.service.aggregate(query.payload);
  }
}
