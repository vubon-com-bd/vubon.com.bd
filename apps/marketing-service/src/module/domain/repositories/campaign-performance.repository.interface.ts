import type { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import { CampaignPerformanceEntity } from '../entities/campaign-performance.entity';
import { CampaignIdVO } from '../value-objects/primitives/campaign-id.vo';

export interface CampaignPerformanceRepository
  extends BaseRepository<CampaignPerformanceEntity, string> {
  findByCampaignId(campaignId: CampaignIdVO): Promise<readonly CampaignPerformanceEntity[]>;
}
