/**
 * Campaign Status Value Types
 * @module shared-types/marketing
 */

import type { CAMPAIGN_STATUS, CAMPAIGN_GOAL } from '@vubon/shared-constants/marketing';

export type CampaignStatusValue = (typeof CAMPAIGN_STATUS)[keyof typeof CAMPAIGN_STATUS];

export type CampaignGoalValue = (typeof CAMPAIGN_GOAL)[keyof typeof CAMPAIGN_GOAL];

export interface CampaignStatusMetadata {
  readonly value: CampaignStatusValue;
  readonly label: string;
  readonly isActive: boolean;
  readonly isFinal: boolean;
}
