export const CAMPAIGN_TYPE = {
  EMAIL: 'email',
  SMS: 'sms',
  PUSH: 'push',
  SOCIAL: 'social',
  DISPLAY: 'display',
  SEARCH: 'search',
  AFFILIATE: 'affiliate',
  INFLUENCER: 'influencer',
  CONTENT: 'content',
  EVENT: 'event',
  MULTI_CHANNEL: 'multi_channel',
} as const;

export const CAMPAIGN_STATUS = {
  DRAFT: 'draft',
  SCHEDULED: 'scheduled',
  ACTIVE: 'active',
  PAUSED: 'paused',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled',
  EXPIRED: 'expired',
  ARCHIVED: 'archived',
} as const;

export const CAMPAIGN_GOAL = {
  AWARENESS: 'awareness',
  CONSIDERATION: 'consideration',
  CONVERSION: 'conversion',
  RETENTION: 'retention',
  REACTIVATION: 'reactivation',
  ENGAGEMENT: 'engagement',
  TRAFFIC: 'traffic',
  LEADS: 'leads',
  SALES: 'sales',
} as const;

export const CAMPAIGN = {
  TYPE: CAMPAIGN_TYPE,
  STATUS: CAMPAIGN_STATUS,
  GOAL: CAMPAIGN_GOAL,
  NAME_MAX_LENGTH: 150,
  DESCRIPTION_MAX_LENGTH: 2000,
  MAX_AUDIENCES: 50,
  MAX_CHANNELS: 10,
  MIN_BUDGET: 0,
  MAX_BUDGET: 100000000,
  DEFAULT_DURATION_DAYS: 30,
  MAX_DURATION_DAYS: 730,
  RETENTION_DAYS: 730,
} as const;

export type CampaignTypeType = (typeof CAMPAIGN_TYPE)[keyof typeof CAMPAIGN_TYPE];
export type CampaignStatusType = (typeof CAMPAIGN_STATUS)[keyof typeof CAMPAIGN_STATUS];
export type CampaignGoalType = (typeof CAMPAIGN_GOAL)[keyof typeof CAMPAIGN_GOAL];
