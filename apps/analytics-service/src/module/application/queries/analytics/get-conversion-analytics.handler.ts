import { Injectable } from '@nestjs/common';
import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { BaseQueryHandler } from '@vubon/shared-kernel/application/queries';
import { GetConversionAnalyticsQuery } from './get-conversion-analytics.query.js';

@Injectable()
@QueryHandler(GetConversionAnalyticsQuery)
export class GetConversionAnalyticsHandler extends BaseQueryHandler<GetConversionAnalyticsQuery, unknown>
  implements IQueryHandler<GetConversionAnalyticsQuery> {
  readonly queryType = 'analytics.conversion.get';
  async execute(query: GetConversionAnalyticsQuery): Promise<unknown> {
    return {
      scope: 'conversion',
      fromDate: query.fromDate,
      toDate: query.toDate,
      filters: query.filters,
      metrics: {},
    };
  }
}
