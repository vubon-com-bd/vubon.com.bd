import { z } from 'zod';
import { BaseSchema } from '../common/base.schema';
import { MoneySchema } from '../common/money.schema';
import { CampaignSchema } from './campaign.schema';
import { PromotionSchema } from './promotion.schema';
import { AffiliateSchema } from './affiliate.schema';
import { ReferralSchema } from './referral.schema';
import { LoyaltySchema } from './loyalty.schema';
import { LeadGenerationSchema } from './lead-generation.schema';
import { MARKETING } from '@vubon/shared-constants/src/marketing/marketing.constants';

const marketingStatusKeys = Object.keys(MARKETING.STATUS) as [string, ...string[]];

export const MarketingSchema = BaseSchema.extend({
  marketingId: z.string().uuid(),
  campaigns: z.array(CampaignSchema),
  promotions: z.array(PromotionSchema),
  affiliates: z.array(AffiliateSchema),
  referrals: z.array(ReferralSchema),
  loyalty: LoyaltySchema,
  leads: z.array(LeadGenerationSchema),
  status: z.enum(marketingStatusKeys),
  totalCampaigns: z.number().int().min(0).default(0),
  totalPromotions: z.number().int().min(0).default(0),
  totalAffiliates: z.number().int().min(0).default(0),
  totalReferrals: z.number().int().min(0).default(0),
  totalLeads: z.number().int().min(0).default(0),
  totalBudget: MoneySchema,
  spentBudget: MoneySchema,
  remainingBudget: MoneySchema,
  isActive: z.boolean().default(true),
  metadata: z.object({
    timezone: z.string(),
    currency: z.string().min(3).max(3),
    defaultCampaignType: z.string(),
    defaultPromotionType: z.string(),
    analyticsEnabled: z.boolean().default(true),
    trackingEnabled: z.boolean().default(true),
  }),
});

export const MarketingCreateSchema = MarketingSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  totalCampaigns: true,
  totalPromotions: true,
  totalAffiliates: true,
  totalReferrals: true,
  totalLeads: true,
  spentBudget: true,
  remainingBudget: true,
});

export const MarketingUpdateSchema = MarketingCreateSchema.partial();
