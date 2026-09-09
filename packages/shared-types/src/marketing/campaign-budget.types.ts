import { BaseEntity } from '../common/base.types';
import { Money } from '../common/money.types';
import { CAMPAIGN_BUDGET } from '@vubon/shared-constants/src/marketing/campaign-budget.constants';
import { Campaign } from './campaign.types';
import { CampaignChannel } from './campaign-channel.types';

export interface ChannelAllocation {
  channel: CampaignChannel;
  amount: Money;
  percentage: number;
  spent: Money;
}

export interface CampaignBudget extends BaseEntity {
  budgetId: string;
  campaignId: string;
  campaign: Campaign;
  type: keyof typeof CAMPAIGN_BUDGET.TYPES | string;
  distribution: keyof typeof CAMPAIGN_BUDGET.BUDGET_DISTRIBUTION | string;
  total: Money;
  daily: Money;
  weekly: Money;
  monthly: Money;
  spent: Money;
  remaining: Money;
  channelAllocations: ChannelAllocation[];
  isActive: boolean;
  metadata: Record<string, unknown>;
}
