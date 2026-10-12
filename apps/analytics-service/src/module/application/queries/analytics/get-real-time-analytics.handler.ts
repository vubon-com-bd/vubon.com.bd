import { Injectable } from '@nestjs/common';
import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { BaseQueryHandler } from '@vubon/shared-kernel/application/queries';
import { GetRealTimeAnalyticsQuery } from './get-real-time-analytics.query.js';

@Injectable()
@QueryHandler(GetRealTimeAnalyticsQuery)
export class GetRealTimeAnalyticsHandler extends BaseQueryHandler<GetRealTimeAnalyticsQuery, unknown>
  implements IQueryHandler<GetRealTimeAnalyticsQuery> {
  readonly queryType = 'analytics.real-time.get';
  async execute(query: GetRealTimeAnalyticsQuery): Promise<unknown> {
    return {
      scope: 'real-time',
      fromDate: query.fromDate,
      toDate: query.toDate,
      filters: query.filters,
      metrics: {},
    };
  }
}
