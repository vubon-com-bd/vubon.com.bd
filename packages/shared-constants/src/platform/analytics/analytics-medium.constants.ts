export const ANALYTICS_MEDIUM = {
  CPC: 'cpc',
  CPM: 'cpm',
  CPA: 'cpa',
  ORGANIC: 'organic',
  REFERRAL: 'referral',
  EMAIL: 'email',
  SOCIAL: 'social',
  NONE: 'none',
  AFFILIATE: 'affiliate',
  DISPLAY: 'display',
  VIDEO: 'video',
  PUSH: 'push',
  SMS: 'sms',
} as const;

export type AnalyticsMediumType = (typeof ANALYTICS_MEDIUM)[keyof typeof ANALYTICS_MEDIUM];
