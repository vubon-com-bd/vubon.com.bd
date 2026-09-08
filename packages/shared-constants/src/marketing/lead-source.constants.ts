import { TYPES as COMMON_TYPES } from '../common/types.constants';
import { CAMPAIGN_CHANNEL } from './campaign-channel.constants';

export const LEAD_SOURCE = {
  TYPES: {
    ...COMMON_TYPES,
    ...CAMPAIGN_CHANNEL.TYPES,
    WEBSITE: 'website',
    SOCIAL_MEDIA: 'social_media',
    EMAIL: 'email',
    REFERRAL: 'referral',
    ORGANIC: 'organic',
    PAID: 'paid',
    DIRECT: 'direct',
    EVENT: 'event',
    PARTNER: 'partner',
    OTHER: 'other',
  },
  CAMPAIGN_CHANNEL: { ...CAMPAIGN_CHANNEL },
} as const;
