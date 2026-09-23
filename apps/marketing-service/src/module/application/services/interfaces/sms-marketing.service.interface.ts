import type { BaseServiceInterface } from '@vubon/shared-kernel/application/services/base.service.interface';
import type { SmsMarketingEntity } from '../../../domain/entities/sms-marketing.entity';
import type { CreateSmsCampaignRequestDTO } from '../../dtos/requests/sms-marketing/create-sms-campaign.dto';
import type { SmsCampaignResponseDTO } from '../../dtos/responses/sms-campaign-response.dto';

export interface SmsMarketingServiceInterface
  extends BaseServiceInterface<SmsMarketingEntity, string> {
  create(input: CreateSmsCampaignRequestDTO): Promise<SmsCampaignResponseDTO>;
  send(campaignId: string, recipientIds?: readonly string[]): Promise<SmsCampaignResponseDTO>;
}
