import type { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import { CampaignBudgetEntity } from '../entities/campaign-budget.entity';
import { CampaignIdVO } from '../value-objects/primitives/campaign-id.vo';

export interface CampaignBudgetRepository
  extends BaseRepository<CampaignBudgetEntity, string> {
  findByCampaignId(campaignId: CampaignIdVO): Promise<CampaignBudgetEntity | null>;
}
