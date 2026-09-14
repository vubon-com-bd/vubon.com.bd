/**
 * Campaign Channel Types
 * @module shared-types/marketing
 */

export type CampaignChannelValue =
  | 'email'
  | 'sms'
  | 'push'
  | 'social'
  | 'display'
  | 'search'
  | 'affiliate'
  | 'influencer'
  | 'content'
  | 'event'
  | 'multi_channel';

export interface CampaignChannel {
  readonly channel: CampaignChannelValue;
  readonly enabled: boolean;
  readonly budget?: number;
  readonly spend?: number;
  readonly impressions?: number;
  readonly clicks?: number;
  readonly conversions?: number;
}
