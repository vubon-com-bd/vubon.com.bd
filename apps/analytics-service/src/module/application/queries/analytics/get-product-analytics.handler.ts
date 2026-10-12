import { Injectable } from '@nestjs/common';
import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { BaseQueryHandler } from '@vubon/shared-kernel/application/queries';
import { GetProductAnalyticsQuery } from './get-product-analytics.query.js';

@Injectable()
@QueryHandler(GetProductAnalyticsQuery)
export class GetProductAnalyticsHandler extends BaseQueryHandler<GetProductAnalyticsQuery, unknown>
  implements IQueryHandler<GetProductAnalyticsQuery> {
  readonly queryType = 'analytics.product.get';
  async execute(query: GetProductAnalyticsQuery): Promise<unknown> {
    return {
      scope: 'product',
      fromDate: query.fromDate,
      toDate: query.toDate,
      filters: query.filters,
      metrics: {},
    };
  }
}
