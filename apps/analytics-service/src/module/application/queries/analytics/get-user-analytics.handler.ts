import { Injectable } from '@nestjs/common';
import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { BaseQueryHandler } from '@vubon/shared-kernel/application/queries';
import { GetUserAnalyticsQuery } from './get-user-analytics.query.js';

@Injectable()
@QueryHandler(GetUserAnalyticsQuery)
export class GetUserAnalyticsHandler extends BaseQueryHandler<GetUserAnalyticsQuery, unknown>
  implements IQueryHandler<GetUserAnalyticsQuery> {
  readonly queryType = 'analytics.user.get';
  async execute(query: GetUserAnalyticsQuery): Promise<unknown> {
    return {
      scope: 'user',
      fromDate: query.fromDate,
      toDate: query.toDate,
      filters: query.filters,
      metrics: {},
    };
  }
}
