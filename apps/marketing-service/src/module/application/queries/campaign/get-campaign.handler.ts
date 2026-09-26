import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { BaseQueryHandler } from '@vubon/shared-kernel/application/queries/base.query-handler';
import { GetCampaignQuery } from './get-campaign.query';
import type { CampaignServiceInterface } from '../../services/interfaces/campaign.service.interface';
import type { CampaignResponseDTO } from '../../dtos/responses/campaign-response.dto';

@QueryHandler(GetCampaignQuery)
export class GetCampaignHandler
  extends BaseQueryHandler<GetCampaignQuery, CampaignResponseDTO | null>
  implements IQueryHandler<GetCampaignQuery>
{
  readonly queryType = 'marketing.campaign.get';

  constructor(private readonly campaignService: CampaignServiceInterface) {
    super();
  }

  async execute(query: GetCampaignQuery): Promise<CampaignResponseDTO | null> {
    return this.campaignService.findById(query.campaignId);
  }
}
