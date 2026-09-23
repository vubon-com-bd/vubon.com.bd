import type { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import { CampaignAudienceEntity } from '../entities/campaign-audience.entity';
import { CampaignIdVO } from '../value-objects/primitives/campaign-id.vo';

export interface CampaignAudienceRepository
  extends BaseRepository<CampaignAudienceEntity, string> {
  findByCampaignId(campaignId: CampaignIdVO): Promise<CampaignAudienceEntity | null>;
}
