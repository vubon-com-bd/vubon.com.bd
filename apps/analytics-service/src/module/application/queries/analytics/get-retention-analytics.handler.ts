import { Injectable } from '@nestjs/common';
import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { BaseQueryHandler } from '@vubon/shared-kernel/application/queries';
import { GetRetentionAnalyticsQuery } from './get-retention-analytics.query.js';

@Injectable()
@QueryHandler(GetRetentionAnalyticsQuery)
export class GetRetentionAnalyticsHandler extends BaseQueryHandler<GetRetentionAnalyticsQuery, unknown>
  implements IQueryHandler<GetRetentionAnalyticsQuery> {
  readonly queryType = 'analytics.retention.get';
  async execute(query: GetRetentionAnalyticsQuery): Promise<unknown> {
    return {
      scope: 'retention',
      fromDate: query.fromDate,
      toDate: query.toDate,
      filters: query.filters,
      metrics: {},
    };
  }
}
