import { Injectable } from '@nestjs/common';
import { BaseService } from '@vubon/shared-kernel/application/services/base.service';
import type { CampaignAudienceServiceInterface } from '../interfaces/campaign-audience.service.interface';
import type { CampaignAudienceRepository } from '../../../domain/repositories/campaign-audience.repository.interface';
import { CampaignAudienceEntity } from '../../../domain/entities/campaign-audience.entity';
import { CampaignIdVO } from '../../../domain/value-objects/primitives/campaign-id.vo';

@Injectable()
export class CampaignAudienceService
  extends BaseService<CampaignAudienceEntity, string>
  implements CampaignAudienceServiceInterface
{
  readonly name = 'CampaignAudienceService';

  constructor(private readonly repo: CampaignAudienceRepository) {
    super();
  }

  async findByCampaign(campaignId: string): Promise<CampaignAudienceEntity | null> {
    return this.repo.findByCampaignId(CampaignIdVO.create(campaignId));
  }
}
