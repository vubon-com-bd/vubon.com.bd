import { Injectable } from '@nestjs/common';
import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { BaseQueryHandler } from '@vubon/shared-kernel/application/queries';
import { GetVendorAnalyticsQuery } from './get-vendor-analytics.query.js';

@Injectable()
@QueryHandler(GetVendorAnalyticsQuery)
export class GetVendorAnalyticsHandler extends BaseQueryHandler<GetVendorAnalyticsQuery, unknown>
  implements IQueryHandler<GetVendorAnalyticsQuery> {
  readonly queryType = 'analytics.vendor.get';
  async execute(query: GetVendorAnalyticsQuery): Promise<unknown> {
    return {
      scope: 'vendor',
      fromDate: query.fromDate,
      toDate: query.toDate,
      filters: query.filters,
      metrics: {},
    };
  }
}
