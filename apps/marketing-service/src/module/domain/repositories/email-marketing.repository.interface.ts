import type { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import { EmailMarketingEntity } from '../entities/email-marketing.entity';
import { EmailMarketingIdVO } from '../value-objects/primitives/email-marketing-id.vo';
import { EmailCampaignStatusVO } from '../value-objects/primitives/email-campaign-status.vo';

export interface EmailMarketingRepository
  extends BaseRepository<EmailMarketingEntity, EmailMarketingIdVO> {
  findByStatus(status: EmailCampaignStatusVO): Promise<readonly EmailMarketingEntity[]>;
}
