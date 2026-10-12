import { Injectable } from '@nestjs/common';
import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { BaseQueryHandler } from '@vubon/shared-kernel/application/queries';
import { GetFinancialAnalyticsQuery } from './get-financial-analytics.query.js';

@Injectable()
@QueryHandler(GetFinancialAnalyticsQuery)
export class GetFinancialAnalyticsHandler extends BaseQueryHandler<GetFinancialAnalyticsQuery, unknown>
  implements IQueryHandler<GetFinancialAnalyticsQuery> {
  readonly queryType = 'analytics.financial.get';
  async execute(query: GetFinancialAnalyticsQuery): Promise<unknown> {
    return {
      scope: 'financial',
      fromDate: query.fromDate,
      toDate: query.toDate,
      filters: query.filters,
      metrics: {},
    };
  }
}
