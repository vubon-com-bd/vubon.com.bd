import { Injectable } from '@nestjs/common';
import { BaseService } from '@vubon/shared-kernel/application/services/base.service';
import type { EmailCampaignServiceInterface } from '../interfaces/email-campaign.service.interface';
import type { EmailCampaignRepository } from '../../../domain/repositories/email-campaign.repository.interface';
import { EmailCampaignEntity } from '../../../domain/entities/email-campaign.entity';
import { EmailCampaignStatusVO } from '../../../domain/value-objects/primitives/email-campaign-status.vo';

@Injectable()
export class EmailCampaignService
  extends BaseService<EmailCampaignEntity, string>
  implements EmailCampaignServiceInterface
{
  readonly name = 'EmailCampaignService';

  constructor(private readonly repo: EmailCampaignRepository) {
    super();
  }

  async findByStatus(status: string): Promise<readonly EmailCampaignEntity[]> {
    return this.repo.findByStatus(EmailCampaignStatusVO.create(status));
  }
}
