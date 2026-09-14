/**
 * Marketing Core Schema
 * @module shared-schemas/marketing
 *
 * Marketing entity + aggregator।
 */

import { z } from 'zod';
import { CampaignSchema } from './campaign.schema';
import { PromotionSchema } from './promotion.schema';

export const MarketingStatsSchema = z.object({
  period: z.string().min(1).max(50),
  campaignCount: z.number().int().nonnegative(),
  activeCampaignCount: z.number().int().nonnegative(),
  promotionCount: z.number().int().nonnegative(),
  affiliateCount: z.number().int().nonnegative(),
  referralCount: z.number().int().nonnegative(),
  loyaltyMemberCount: z.number().int().nonnegative(),
  leadCount: z.number().int().nonnegative(),
  totalRevenue: z.number().nonnegative(),
  totalSpend: z.number().nonnegative(),
  roas: z.number().nonnegative(),
  roi: z.number(),
  currency: z.string().length(3),
});

export const MarketingOverviewSchema = z.object({
  campaigns: z.array(CampaignSchema).max(1000),
  promotions: z.array(PromotionSchema).max(1000),
  stats: MarketingStatsSchema,
  generatedAt: z.string().datetime(),
});

export const MarketingListFilterSchema = z.object({
  campaignStatus: z.string().max(50).optional(),
  promotionStatus: z.string().max(50).optional(),
  affiliateStatus: z.string().max(50).optional(),
  referralStatus: z.string().max(50).optional(),
  loyaltyStatus: z.string().max(50).optional(),
  leadStatus: z.string().max(50).optional(),
  fromDate: z.string().datetime().optional(),
  toDate: z.string().datetime().optional(),
  search: z.string().max(200).optional(),
});

export type MarketingStatsSchemaType = z.infer<typeof MarketingStatsSchema>;
export type MarketingOverviewSchemaType = z.infer<typeof MarketingOverviewSchema>;
export type MarketingListFilterSchemaType = z.infer<typeof MarketingListFilterSchema>;
