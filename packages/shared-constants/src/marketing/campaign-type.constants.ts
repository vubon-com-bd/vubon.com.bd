import { TYPES as COMMON_TYPES } from '../common/types.constants';

export const CAMPAIGN_TYPE = {
  TYPES: {
    ...COMMON_TYPES,
    SEASONAL: 'seasonal',
    HOLIDAY: 'holiday',
    PRODUCT_LAUNCH: 'product_launch',
    BRAND_AWARENESS: 'brand_awareness',
    RETARGETING: 'retargeting',
    ACQUISITION: 'acquisition',
    RETENTION: 'retention',
    REFERRAL: 'referral',
    LOYALTY: 'loyalty',
    FLASH_SALE: 'flash_sale',
    CLEARANCE: 'clearance',
    SOCIAL_MEDIA: 'social_media',
    EMAIL: 'email',
    SMS: 'sms',
    INFLUENCER: 'influencer',
    CONTENT: 'content',
    EVENT: 'event',
    CUSTOM: 'custom',
  },
  CAMPAIGN_CATEGORIES: {
    PROMOTIONAL: 'promotional',
    BRANDING: 'branding',
    ENGAGEMENT: 'engagement',
    CONVERSION: 'conversion',
  },
} as const;
