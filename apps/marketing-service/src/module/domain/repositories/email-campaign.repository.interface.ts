import type { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import { EmailCampaignEntity } from '../entities/email-campaign.entity';
import { EmailMarketingIdVO } from '../value-objects/primitives/email-marketing-id.vo';
import { EmailCampaignStatusVO } from '../value-objects/primitives/email-campaign-status.vo';

export interface EmailCampaignRepository
  extends BaseRepository<EmailCampaignEntity, EmailMarketingIdVO> {
  findByStatus(status: EmailCampaignStatusVO): Promise<readonly EmailCampaignEntity[]>;
}
