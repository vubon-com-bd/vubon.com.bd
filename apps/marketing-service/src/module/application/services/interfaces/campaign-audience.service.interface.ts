import type { BaseServiceInterface } from '@vubon/shared-kernel/application/services/base.service.interface';
import type { CampaignAudienceEntity } from '../../../domain/entities/campaign-audience.entity';

export interface CampaignAudienceServiceInterface
  extends BaseServiceInterface<CampaignAudienceEntity, string> {
  findByCampaign(campaignId: string): Promise<CampaignAudienceEntity | null>;
}
