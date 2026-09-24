import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { BaseQueryHandler } from '@vubon/shared-kernel/application/queries/base.query-handler';
import { GetEngagementAnalyticsQuery } from './get-engagement-analytics.query';

export interface EngagementAnalyticsView {
  readonly sent: number;
  readonly opened: number;
  readonly clicked: number;
  readonly openRate: number;
  readonly clickRate: number;
}

@QueryHandler(GetEngagementAnalyticsQuery)
export class GetEngagementAnalyticsHandler
  extends BaseQueryHandler<GetEngagementAnalyticsQuery, EngagementAnalyticsView>
  implements IQueryHandler<GetEngagementAnalyticsQuery>
{
  readonly queryType = 'analytics.engagement';

  async execute(_query: GetEngagementAnalyticsQuery): Promise<EngagementAnalyticsView> {
    return { sent: 0, opened: 0, clicked: 0, openRate: 0, clickRate: 0 };
  }
}
