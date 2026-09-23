import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { BaseQueryHandler } from '@vubon/shared-kernel/application/queries/base.query-handler';
import { GetCampaignPerformanceQuery } from './get-campaign-performance.query';
import type { CampaignPerformanceServiceInterface } from '../../services/interfaces/campaign-performance.service.interface';

@QueryHandler(GetCampaignPerformanceQuery)
export class GetCampaignPerformanceHandler
  extends BaseQueryHandler<GetCampaignPerformanceQuery, number>
  implements IQueryHandler<GetCampaignPerformanceQuery>
{
  readonly queryType = 'marketing.campaign.get-performance';

  constructor(private readonly service: CampaignPerformanceServiceInterface) {
    super();
  }

  async execute(query: GetCampaignPerformanceQuery): Promise<number> {
    return this.service.calculateRoi(query.campaignId);
  }
}
