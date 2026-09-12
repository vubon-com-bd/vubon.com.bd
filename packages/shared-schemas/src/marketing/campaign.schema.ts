import { z } from 'zod';
import { BaseSchema } from '../common/base.schema';
import { ProductSchema } from '../business/product/product.schema';
import { CampaignTypeSchema } from './campaign-type.schema';
import { CampaignChannelSchema } from './campaign-channel.schema';
import { CampaignBudgetSchema } from './campaign-budget.schema';
import { PromotionSchema } from './promotion.schema';
import { CAMPAIGN_STATUS } from '@vubon/shared-constants/src/marketing/campaign-status.constants';
import { CAMPAIGN } from '@vubon/shared-constants/src/marketing/campaign.constants';

const campaignStatusKeys = Object.keys(CAMPAIGN_STATUS) as [string, ...string[]];
const campaignGoalKeys = Object.keys(CAMPAIGN.CAMPAIGN_GOALS) as [string, ...string[]];

export const CampaignSchema = BaseSchema.extend({
  campaignId: z.string().uuid(),
  name: z.string().min(1).max(100),
  slug: z
    .string()
    .min(1)
    .max(100)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  description: z.string().optional(),
  status: z.enum(campaignStatusKeys),
  type: CampaignTypeSchema,
  goal: z.enum(campaignGoalKeys),
  channels: z.array(CampaignChannelSchema),
  budget: CampaignBudgetSchema,
  promotions: z.array(PromotionSchema),
  products: z.array(ProductSchema),
  productCount: z.number().int().min(0).default(0),
  startDate: z.date(),
  endDate: z.date(),
  isActive: z.boolean().default(true),
  isPublished: z.boolean().default(false),
  isFeatured: z.boolean().default(false),
  publishedAt: z.date().optional(),
  metadata: z.object({
    seoTitle: z.string().max(60).optional(),
    seoDescription: z.string().max(160).optional(),
    seoKeywords: z.array(z.string()).optional(),
    bannerImage: z.string().url().optional(),
    bannerVideo: z.string().url().optional(),
    targetAudience: z.array(z.string()),
    targetLocations: z.array(z.string()),
    targetDevices: z.array(z.string()),
  }),
});

export const CampaignCreateSchema = CampaignSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  productCount: true,
});

export const CampaignUpdateSchema = CampaignCreateSchema.partial();
