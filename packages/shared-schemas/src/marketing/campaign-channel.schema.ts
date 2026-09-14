/**
 * Campaign Channel Schema
 * @module shared-schemas/marketing
 */

import { z } from 'zod';

export const CampaignChannelValueSchema = z.enum([
  'email',
  'sms',
  'push',
  'social',
  'display',
  'search',
  'affiliate',
  'influencer',
  'content',
  'event',
  'multi_channel',
]);

export const CampaignChannelSchema = z.object({
  channel: CampaignChannelValueSchema,
  enabled: z.boolean(),
  budget: z.number().nonnegative().optional(),
  spend: z.number().nonnegative().optional(),
  impressions: z.number().int().nonnegative().optional(),
  clicks: z.number().int().nonnegative().optional(),
  conversions: z.number().int().nonnegative().optional(),
});

export type CampaignChannelValueSchemaType = z.infer<typeof CampaignChannelValueSchema>;
export type CampaignChannelSchemaType = z.infer<typeof CampaignChannelSchema>;
