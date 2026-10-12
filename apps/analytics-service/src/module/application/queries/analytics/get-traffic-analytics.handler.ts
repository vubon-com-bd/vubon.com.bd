import { Injectable } from '@nestjs/common';
import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { BaseQueryHandler } from '@vubon/shared-kernel/application/queries';
import { GetTrafficAnalyticsQuery } from './get-traffic-analytics.query.js';

@Injectable()
@QueryHandler(GetTrafficAnalyticsQuery)
export class GetTrafficAnalyticsHandler extends BaseQueryHandler<GetTrafficAnalyticsQuery, unknown>
  implements IQueryHandler<GetTrafficAnalyticsQuery> {
  readonly queryType = 'analytics.traffic.get';
  async execute(query: GetTrafficAnalyticsQuery): Promise<unknown> {
    return {
      scope: 'traffic',
      fromDate: query.fromDate,
      toDate: query.toDate,
      filters: query.filters,
      metrics: {},
    };
  }
}
