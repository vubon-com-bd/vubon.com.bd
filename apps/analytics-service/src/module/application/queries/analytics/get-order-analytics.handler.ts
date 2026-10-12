import { Injectable } from '@nestjs/common';
import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { BaseQueryHandler } from '@vubon/shared-kernel/application/queries';
import { GetOrderAnalyticsQuery } from './get-order-analytics.query.js';

@Injectable()
@QueryHandler(GetOrderAnalyticsQuery)
export class GetOrderAnalyticsHandler extends BaseQueryHandler<GetOrderAnalyticsQuery, unknown>
  implements IQueryHandler<GetOrderAnalyticsQuery> {
  readonly queryType = 'analytics.order.get';
  async execute(query: GetOrderAnalyticsQuery): Promise<unknown> {
    return {
      scope: 'order',
      fromDate: query.fromDate,
      toDate: query.toDate,
      filters: query.filters,
      metrics: {},
    };
  }
}
