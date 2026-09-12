import { z } from 'zod';
import { BaseSchema } from '../common/base.schema';
import { MoneySchema } from '../common/money.schema';
import { CAMPAIGN_BUDGET } from '@vubon/shared-constants/src/marketing/campaign-budget.constants';
import { CampaignChannelSchema } from './campaign-channel.schema';

const campaignBudgetTypeKeys = Object.keys(CAMPAIGN_BUDGET.TYPES) as [string, ...string[]];
const campaignBudgetDistributionKeys = Object.keys(CAMPAIGN_BUDGET.BUDGET_DISTRIBUTION) as [
  string,
  ...string[],
];

export const CampaignBudgetSchema = BaseSchema.extend({
  budgetId: z.string().uuid(),
  campaignId: z.string().uuid(),
  type: z.enum(campaignBudgetTypeKeys),
  distribution: z.enum(campaignBudgetDistributionKeys),
  total: MoneySchema,
  daily: MoneySchema,
  weekly: MoneySchema,
  monthly: MoneySchema,
  spent: MoneySchema,
  remaining: MoneySchema,
  channelAllocations: z.array(
    z.object({
      channel: CampaignChannelSchema,
      amount: MoneySchema,
      percentage: z.number().min(0).max(100),
      spent: MoneySchema,
    })
  ),
  isActive: z.boolean().default(true),
  metadata: z.record(z.unknown()).optional(),
});
