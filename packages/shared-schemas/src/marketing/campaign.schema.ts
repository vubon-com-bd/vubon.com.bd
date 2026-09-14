/**
 * Campaign Core Schema
 * @module shared-schemas/marketing
 *
 * Campaign entity + aggregator।
 */

import { z } from 'zod';
import { BaseEntitySchema } from '../common/base/base-entity.schema';
import { UuidSchema } from '../common/primitives/uuid.schema';
import { CAMPAIGN } from '@vubon/shared-constants/marketing';
import { CampaignTypeSchema } from './campaign-type.schema';
import { CampaignStatusSchema, CampaignGoalSchema } from './campaign-status.schema';
import { CampaignChannelSchema } from './campaign-channel.schema';
import { CampaignBudgetSchema } from './campaign-budget.schema';

export const CampaignMetricsSchema = z.object({
  impressions: z.number().int().nonnegative(),
  reach: z.number().int().nonnegative(),
  clicks: z.number().int().nonnegative(),
  ctr: z.number().min(0).max(1),
  conversions: z.number().int().nonnegative(),
  conversionRate: z.number().min(0).max(1),
  cpc: z.number().nonnegative(),
  cpa: z.number().nonnegative(),
  roas: z.number().nonnegative(),
  revenue: z.number().nonnegative(),
  spend: z.number().nonnegative(),
  currency: z.string().length(3),
});

export const CampaignSchema = BaseEntitySchema.extend({
  name: z.string().min(1).max(CAMPAIGN.NAME_MAX_LENGTH),
  slug: z.string().min(1).max(150),
  description: z.string().max(CAMPAIGN.DESCRIPTION_MAX_LENGTH).optional(),
  type: CampaignTypeSchema,
  status: CampaignStatusSchema,
  goal: CampaignGoalSchema,
  channels: z.array(CampaignChannelSchema).min(1).max(CAMPAIGN.MAX_CHANNELS),
  budget: CampaignBudgetSchema,
  audiences: z.array(z.string().max(100)).max(CAMPAIGN.MAX_AUDIENCES),
  segments: z.array(z.string().max(100)).max(50).optional(),
  contentId: z.string().max(100).optional(),
  landingUrl: z.string().url().optional(),
  bannerUrl: z.string().url().optional(),
  startAt: z.string().datetime(),
  endAt: z.string().datetime().optional(),
  metrics: CampaignMetricsSchema.optional(),
  createdBy: UuidSchema,
  approvedBy: UuidSchema.optional(),
  approvedAt: z.string().datetime().optional(),
  tags: z.array(z.string().max(50)).max(20).optional(),
});

export const CampaignPublicSchema = CampaignSchema.pick({
  id: true,
  name: true,
  type: true,
  status: true,
  goal: true,
  startAt: true,
  endAt: true,
  bannerUrl: true,
  metrics: true,
});

export const CampaignSummarySchema = CampaignSchema.pick({
  id: true,
  name: true,
  type: true,
  status: true,
  startAt: true,
  endAt: true,
});

export const CampaignCreateInputSchema = z
  .object({
    name: z.string().trim().min(1).max(CAMPAIGN.NAME_MAX_LENGTH),
    slug: z.string().trim().min(1).max(150),
    description: z.string().max(CAMPAIGN.DESCRIPTION_MAX_LENGTH).optional(),
    type: CampaignTypeSchema,
    goal: CampaignGoalSchema,
    channels: z.array(CampaignChannelSchema).min(1).max(CAMPAIGN.MAX_CHANNELS),
    budget: CampaignBudgetSchema.partial().required({
      total: true,
      currency: true,
    }),
    startAt: z.string().datetime(),
    endAt: z.string().datetime().optional(),
    landingUrl: z.string().url().optional(),
    bannerUrl: z.string().url().optional(),
  })
  .strict()
  .refine((data) => !data.endAt || new Date(data.endAt) > new Date(data.startAt), {
    message: 'End date must be after start date',
    path: ['endAt'],
  });

export const CampaignListFilterSchema = z.object({
  type: CampaignTypeSchema.optional(),
  status: CampaignStatusSchema.optional(),
  goal: CampaignGoalSchema.optional(),
  fromDate: z.string().datetime().optional(),
  toDate: z.string().datetime().optional(),
  search: z.string().max(200).optional(),
});

export type CampaignMetricsSchemaType = z.infer<typeof CampaignMetricsSchema>;
export type CampaignSchemaType = z.infer<typeof CampaignSchema>;
export type CampaignPublicSchemaType = z.infer<typeof CampaignPublicSchema>;
export type CampaignSummarySchemaType = z.infer<typeof CampaignSummarySchema>;
export type CampaignCreateInputSchemaType = z.infer<typeof CampaignCreateInputSchema>;
export type CampaignListFilterSchemaType = z.infer<typeof CampaignListFilterSchema>;
