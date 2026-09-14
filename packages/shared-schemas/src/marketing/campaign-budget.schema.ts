/**
 * Campaign Budget Schema
 * @module shared-schemas/marketing
 *
 * Values আসে shared-constants/marketing/campaign.constants থেকে।
 */

import { z } from 'zod';
import { CAMPAIGN } from '@vubon/shared-constants/marketing';

export const CampaignBudgetSchema = z.object({
  total: z.number().min(CAMPAIGN.MIN_BUDGET).max(CAMPAIGN.MAX_BUDGET),
  spent: z.number().nonnegative(),
  remaining: z.number(),
  currency: z.string().length(3),
  dailyLimit: z.number().nonnegative().optional(),
  dailySpent: z.number().nonnegative().optional(),
  cpc: z.number().nonnegative().optional(),
  cpm: z.number().nonnegative().optional(),
  cpa: z.number().nonnegative().optional(),
  isPaused: z.boolean(),
});

export const CampaignBudgetUpdateSchema = z.object({
  total: z.number().min(0).max(CAMPAIGN.MAX_BUDGET).optional(),
  dailyLimit: z.number().nonnegative().optional(),
  cpc: z.number().nonnegative().optional(),
  cpm: z.number().nonnegative().optional(),
  cpa: z.number().nonnegative().optional(),
});

export type CampaignBudgetSchemaType = z.infer<typeof CampaignBudgetSchema>;
export type CampaignBudgetUpdateSchemaType = z.infer<typeof CampaignBudgetUpdateSchema>;
