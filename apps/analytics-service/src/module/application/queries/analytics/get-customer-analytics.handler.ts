import { Injectable } from '@nestjs/common';
import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { BaseQueryHandler } from '@vubon/shared-kernel/application/queries';
import { GetCustomerAnalyticsQuery } from './get-customer-analytics.query.js';

@Injectable()
@QueryHandler(GetCustomerAnalyticsQuery)
export class GetCustomerAnalyticsHandler extends BaseQueryHandler<GetCustomerAnalyticsQuery, unknown>
  implements IQueryHandler<GetCustomerAnalyticsQuery> {
  readonly queryType = 'analytics.customer.get';
  async execute(query: GetCustomerAnalyticsQuery): Promise<unknown> {
    return {
      scope: 'customer',
      fromDate: query.fromDate,
      toDate: query.toDate,
      filters: query.filters,
      metrics: {},
    };
  }
}
