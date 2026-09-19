/**
 * Analytics Campaign Schema
 * @module shared-schemas/platform/analytics
 *
 * Values আসে shared-constants/platform/analytics-campaign.constants থেকে।
 */

import { z } from 'zod';
import { ANALYTICS_CAMPAIGN_TYPE, ANALYTICS_CAMPAIGN } from '@vubon/shared-constants/platform';

export const AnalyticsCampaignTypeSchema = z.enum(
  Object.values(ANALYTICS_CAMPAIGN_TYPE) as [string, ...string[]]
);

export const AnalyticsCampaignSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1).max(ANALYTICS_CAMPAIGN.NAME_MAX_LENGTH),
  type: AnalyticsCampaignTypeSchema,
  utmSource: z.string().min(1).max(ANALYTICS_CAMPAIGN.UTM_SOURCE_MAX_LENGTH),
  utmMedium: z.string().min(1).max(ANALYTICS_CAMPAIGN.UTM_MEDIUM_MAX_LENGTH),
  utmCampaign: z.string().min(1).max(ANALYTICS_CAMPAIGN.UTM_CAMPAIGN_MAX_LENGTH),
  utmTerm: z.string().max(ANALYTICS_CAMPAIGN.UTM_TERM_MAX_LENGTH).optional(),
  utmContent: z.string().max(ANALYTICS_CAMPAIGN.UTM_CONTENT_MAX_LENGTH).optional(),
  utmId: z.string().max(100).optional(),
  startAt: z.string().datetime(),
  endAt: z.string().datetime().optional(),
  isActive: z.boolean(),
});

export const AnalyticsCampaignPublicSchema = AnalyticsCampaignSchema.pick({
  id: true,
  name: true,
  type: true,
  startAt: true,
  endAt: true,
});

export type AnalyticsCampaignTypeSchemaType = z.infer<typeof AnalyticsCampaignTypeSchema>;
export type AnalyticsCampaignSchemaType = z.infer<typeof AnalyticsCampaignSchema>;
export type AnalyticsCampaignPublicSchemaType = z.infer<typeof AnalyticsCampaignPublicSchema>;
