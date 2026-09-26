import { CampaignBudgetVO } from '../value-objects/primitives/campaign-budget.vo';

export class CampaignBudgetService {
  calculateRemaining(budget: CampaignBudgetVO, spent: number): number {
    return budget.amount - spent;
  }

  isExceeded(budget: CampaignBudgetVO, spent: number): boolean {
    return spent > budget.amount;
  }
}
