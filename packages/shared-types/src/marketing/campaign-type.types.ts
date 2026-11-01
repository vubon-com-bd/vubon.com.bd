/**
 * Campaign Type Value Types
 * @module shared-types/marketing
 *
 * Values আসে shared-constants/marketing/campaign.constants থেকে।
 */

import type { CAMPAIGN_TYPE } from '@vubon/shared-constants/marketing';

export type CampaignTypeValue = (typeof CAMPAIGN_TYPE)[keyof typeof CAMPAIGN_TYPE];

export interface CampaignTypeMetadata {
  readonly value: CampaignTypeValue;
  readonly label: string;
  readonly isDigital: boolean;
  readonly isPaid: boolean;
}
