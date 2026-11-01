export const ANALYTICS_SOURCE = {
  DIRECT: 'direct',
  ORGANIC: 'organic',
  PAID: 'paid',
  REFERRAL: 'referral',
  SOCIAL: 'social',
  EMAIL: 'email',
  SMS: 'sms',
  AFFILIATE: 'affiliate',
  DISPLAY: 'display',
  PUSH: 'push',
  INTERNAL: 'internal',
  UNKNOWN: 'unknown',
} as const;

export const ANALYTICS_SOURCE_PLATFORM = {
  GOOGLE: 'google',
  BING: 'bing',
  YAHOO: 'yahoo',
  FACEBOOK: 'facebook',
  INSTAGRAM: 'instagram',
  TWITTER: 'twitter',
  LINKEDIN: 'linkedin',
  TIKTOK: 'tiktok',
  YOUTUBE: 'youtube',
  WHATSAPP: 'whatsapp',
  TELEGRAM: 'telegram',
} as const;

export type AnalyticsSourceType = (typeof ANALYTICS_SOURCE)[keyof typeof ANALYTICS_SOURCE];
export type AnalyticsSourcePlatformType =
  (typeof ANALYTICS_SOURCE_PLATFORM)[keyof typeof ANALYTICS_SOURCE_PLATFORM];
