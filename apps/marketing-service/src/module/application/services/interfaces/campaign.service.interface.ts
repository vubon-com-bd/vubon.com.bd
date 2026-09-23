import type { BaseServiceInterface } from '@vubon/shared-kernel/application/services/base.service.interface';
import type { CampaignEntity } from '../../../domain/entities/campaign.entity';
import type { CreateCampaignRequestDTO } from '../../dtos/requests/campaign/create-campaign.dto';
import type { LaunchCampaignRequestDTO } from '../../dtos/requests/campaign/launch-campaign.dto';
import type { CampaignResponseDTO } from '../../dtos/responses/campaign-response.dto';

export interface CampaignServiceInterface
  extends BaseServiceInterface<CampaignEntity, string> {
  create(input: CreateCampaignRequestDTO): Promise<CampaignResponseDTO>;
  launch(input: LaunchCampaignRequestDTO): Promise<CampaignResponseDTO>;
  pause(campaignId: string, reason?: string): Promise<CampaignResponseDTO>;
  complete(campaignId: string): Promise<CampaignResponseDTO>;
  findById(campaignId: string): Promise<CampaignResponseDTO | null>;
}
