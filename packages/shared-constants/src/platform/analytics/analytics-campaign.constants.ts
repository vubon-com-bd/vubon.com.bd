export const ANALYTICS_CAMPAIGN_TYPE = {
  EMAIL: 'email',
  SMS: 'sms',
  SOCIAL: 'social',
  PAID: 'paid',
  ORGANIC: 'organic',
  AFFILIATE: 'affiliate',
  INFLUENCER: 'influencer',
  PUSH: 'push',
  DISPLAY: 'display',
  RETARGETING: 'retargeting',
} as const;

export const ANALYTICS_CAMPAIGN = {
  NAME_MAX_LENGTH: 150,
  UTM_SOURCE_MAX_LENGTH: 100,
  UTM_MEDIUM_MAX_LENGTH: 100,
  UTM_CAMPAIGN_MAX_LENGTH: 150,
  UTM_TERM_MAX_LENGTH: 100,
  UTM_CONTENT_MAX_LENGTH: 100,
  MAX_ACTIVE_CAMPAIGNS: 100,
  RETENTION_DAYS: 730,
} as const;

export const ANALYTICS_UTM_PARAM = {
  SOURCE: 'utm_source',
  MEDIUM: 'utm_medium',
  CAMPAIGN: 'utm_campaign',
  TERM: 'utm_term',
  CONTENT: 'utm_content',
  ID: 'utm_id',
} as const;

export type AnalyticsCampaignTypeType =
  (typeof ANALYTICS_CAMPAIGN_TYPE)[keyof typeof ANALYTICS_CAMPAIGN_TYPE];
