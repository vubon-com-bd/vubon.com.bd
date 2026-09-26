import type { BaseServiceInterface } from '@vubon/shared-kernel/application/services/base.service.interface';
import type { CampaignBudgetEntity } from '../../../domain/entities/campaign-budget.entity';

export interface CampaignBudgetServiceInterface
  extends BaseServiceInterface<CampaignBudgetEntity, string> {
  getRemaining(campaignId: string): Promise<number>;
  checkExceeded(campaignId: string, spent: number): Promise<boolean>;
}
