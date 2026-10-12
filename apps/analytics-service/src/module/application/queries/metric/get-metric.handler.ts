import { MetricService } from '../../services/impl/metric.service.js';
import { Injectable } from '@nestjs/common';
import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { BaseQueryHandler } from '@vubon/shared-kernel/application/queries';
import { ApplicationNotFoundError } from '@vubon/shared-kernel/application/errors';
import { GetMetricQuery } from './get-metric.query.js';
import type { MetricResponseData } from '../../dtos/responses/metric-response.dto.js';

@Injectable()
@QueryHandler(GetMetricQuery)
export class GetMetricHandler extends BaseQueryHandler<GetMetricQuery, MetricResponseData>
  implements IQueryHandler<GetMetricQuery> {
  readonly queryType = 'analytics.metric.get';
  constructor(private readonly service: MetricService) { super(); }
  async execute(query: GetMetricQuery): Promise<MetricResponseData> {
    const result = await this.service.findById(query.metricId);
    if (!result) throw new ApplicationNotFoundError('Metric', query.metricId);
    return result;
  }
}
