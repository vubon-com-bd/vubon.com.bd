/**
 * Campaign Type Schema
 * @module shared-schemas/marketing
 *
 * Values আসে shared-constants/marketing/campaign.constants থেকে।
 */

import { z } from 'zod';
import { CAMPAIGN_TYPE } from '@vubon/shared-constants/marketing';

export const CampaignTypeSchema = z.enum(Object.values(CAMPAIGN_TYPE) as [string, ...string[]]);

export type CampaignTypeSchemaType = z.infer<typeof CampaignTypeSchema>;
