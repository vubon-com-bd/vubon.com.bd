import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { BaseQueryHandler } from '@vubon/shared-kernel/application/queries/base.query-handler';
import { GetMarketingOverviewQuery } from './get-marketing-overview.query';
import type { MarketingAnalyticsRepository } from '../../../domain/repositories/marketing-analytics.repository.interface';

export interface MarketingOverviewResult {
  readonly totalCampaigns: number;
  readonly totalLeads: number;
  readonly totalRevenue: number;
}

@QueryHandler(GetMarketingOverviewQuery)
export class GetMarketingOverviewHandler
  extends BaseQueryHandler<GetMarketingOverviewQuery, MarketingOverviewResult>
  implements IQueryHandler<GetMarketingOverviewQuery>
{
  readonly queryType = 'marketing.analytics.overview';

  constructor(private readonly repo: MarketingAnalyticsRepository) {
    super();
  }

  async execute(_query: GetMarketingOverviewQuery): Promise<MarketingOverviewResult> {
    void this.repo;
    return { totalCampaigns: 0, totalLeads: 0, totalRevenue: 0 };
  }
}
