/**
 * Campaign Budget Types
 * @module shared-types/marketing
 */

export interface CampaignBudget {
  readonly total: number;
  readonly spent: number;
  readonly remaining: number;
  readonly currency: string;
  readonly dailyLimit?: number;
  readonly dailySpent?: number;
  readonly currencyDaily?: string;
  readonly cpc?: number;
  readonly cpm?: number;
  readonly cpa?: number;
  readonly isPaused: boolean;
}

export interface CampaignBudgetUpdate {
  readonly total?: number;
  readonly dailyLimit?: number;
  readonly cpc?: number;
  readonly cpm?: number;
  readonly cpa?: number;
}
