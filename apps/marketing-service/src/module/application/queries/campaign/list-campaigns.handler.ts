import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { BaseQueryHandler } from '@vubon/shared-kernel/application/queries/base.query-handler';
import { ListCampaignsQuery } from './list-campaigns.query';
import type { CampaignRepository } from '../../../domain/repositories/campaign.repository.interface';
import type { CampaignResponseDTO } from '../../dtos/responses/campaign-response.dto';
import { CampaignMapper } from '../../mappers/campaign.mapper';

@QueryHandler(ListCampaignsQuery)
export class ListCampaignsHandler
  extends BaseQueryHandler<ListCampaignsQuery, readonly CampaignResponseDTO[]>
  implements IQueryHandler<ListCampaignsQuery>
{
  readonly queryType = 'marketing.campaign.list';

  constructor(
    private readonly repo: CampaignRepository,
    private readonly mapper: CampaignMapper,
  ) {
    super();
  }

  async execute(_query: ListCampaignsQuery): Promise<readonly CampaignResponseDTO[]> {
    const entities = await this.repo.findAll();
    return entities.map((e) => this.mapper.toDTO(e));
  }
}
