import { z } from 'zod';
import { StatusSchema } from '../common/status.schema';
import { CAMPAIGN_STATUS } from '@vubon/shared-constants/src/marketing/campaign-status.constants';

const campaignStatusKeys = Object.keys(CAMPAIGN_STATUS) as [string, ...string[]];

export const CampaignStatusSchema = StatusSchema.extend({
  status: z.enum(campaignStatusKeys),
  category: z.literal('campaign'),
  isDraft: z.boolean().default(false),
  isPendingReview: z.boolean().default(false),
  isApproved: z.boolean().default(false),
  isRejected: z.boolean().default(false),
  isScheduled: z.boolean().default(false),
  isLive: z.boolean().default(false),
  isPaused: z.boolean().default(false),
  isEnded: z.boolean().default(false),
  isCancelled: z.boolean().default(false),
  isArchived: z.boolean().default(false),
});

export const CampaignStatusEnumSchema = z.enum(campaignStatusKeys);
