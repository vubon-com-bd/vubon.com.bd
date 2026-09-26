import type { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import { CampaignEntity } from '../entities/campaign.entity';
import { CampaignIdVO } from '../value-objects/primitives/campaign-id.vo';
import { CampaignStatusVO } from '../value-objects/primitives/campaign-status.vo';
import { UserIdVO } from '../value-objects/primitives/user-id.vo';

export interface CampaignRepository
  extends BaseRepository<CampaignEntity, CampaignIdVO> {
  findByStatus(status: CampaignStatusVO): Promise<readonly CampaignEntity[]>;
  findByCreator(userId: UserIdVO): Promise<readonly CampaignEntity[]>;
}
