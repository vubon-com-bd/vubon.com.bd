import type { BaseServiceInterface } from '@vubon/shared-kernel/application/services/base.service.interface';
import type { EmailMarketingEntity } from '../../../domain/entities/email-marketing.entity';
import type { CreateEmailCampaignRequestDTO } from '../../dtos/requests/email-marketing/create-email-campaign.dto';
import type { EmailCampaignResponseDTO } from '../../dtos/responses/email-campaign-response.dto';

export interface EmailMarketingServiceInterface
  extends BaseServiceInterface<EmailMarketingEntity, string> {
  create(input: CreateEmailCampaignRequestDTO): Promise<EmailCampaignResponseDTO>;
  send(campaignId: string, recipientIds?: readonly string[]): Promise<EmailCampaignResponseDTO>;
  schedule(campaignId: string, scheduledAt: string): Promise<EmailCampaignResponseDTO>;
}
