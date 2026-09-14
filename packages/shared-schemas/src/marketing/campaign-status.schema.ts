/**
 * Campaign Status Schema
 * @module shared-schemas/marketing
 *
 * Values আসে shared-constants/marketing/campaign.constants থেকে।
 */

import { z } from 'zod';
import { CAMPAIGN_STATUS, CAMPAIGN_GOAL } from '@vubon/shared-constants/marketing';

export const CampaignStatusSchema = z.enum(Object.values(CAMPAIGN_STATUS) as [string, ...string[]]);

export const CampaignGoalSchema = z.enum(Object.values(CAMPAIGN_GOAL) as [string, ...string[]]);

export type CampaignStatusSchemaType = z.infer<typeof CampaignStatusSchema>;
export type CampaignGoalSchemaType = z.infer<typeof CampaignGoalSchema>;
