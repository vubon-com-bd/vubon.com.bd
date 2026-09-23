import { Injectable } from '@nestjs/common';
import { BaseService } from '@vubon/shared-kernel/application/services/base.service';
import type { SmsCampaignServiceInterface } from '../interfaces/sms-campaign.service.interface';
import type { SmsCampaignRepository } from '../../../domain/repositories/sms-campaign.repository.interface';
import { SmsCampaignEntity } from '../../../domain/entities/sms-campaign.entity';
import { SmsCampaignStatusVO } from '../../../domain/value-objects/primitives/sms-campaign-status.vo';

@Injectable()
export class SmsCampaignService
  extends BaseService<SmsCampaignEntity, string>
  implements SmsCampaignServiceInterface
{
  readonly name = 'SmsCampaignService';

  constructor(private readonly repo: SmsCampaignRepository) {
    super();
  }

  async findByStatus(status: string): Promise<readonly SmsCampaignEntity[]> {
    return this.repo.findByStatus(SmsCampaignStatusVO.create(status));
  }
}
