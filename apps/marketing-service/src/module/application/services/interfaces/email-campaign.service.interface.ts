import type { BaseServiceInterface } from '@vubon/shared-kernel/application/services/base.service.interface';
import type { EmailCampaignEntity } from '../../../domain/entities/email-campaign.entity';

export interface EmailCampaignServiceInterface
  extends BaseServiceInterface<EmailCampaignEntity, string> {
  findByStatus(status: string): Promise<readonly EmailCampaignEntity[]>;
}
