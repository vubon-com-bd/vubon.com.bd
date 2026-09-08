import { TYPES as COMMON_TYPES } from '../../common/types.constants';
import { FLASH_SALE_STATUS } from './flash-sale-status.constants';

export const FLASH_SALE_SHARE = {
  TYPES: {
    ...COMMON_TYPES,
    SOCIAL: 'social',
    EMAIL: 'email',
    SMS: 'sms',
    QR_CODE: 'qr_code',
    LINK: 'link',
  },
  SOCIAL_MEDIA: {
    FACEBOOK: 'facebook',
    TWITTER: 'twitter',
    INSTAGRAM: 'instagram',
    LINKEDIN: 'linkedin',
    WHATSAPP: 'whatsapp',
    TELEGRAM: 'telegram',
    YOUTUBE: 'youtube',
    PINTEREST: 'pinterest',
    TIKTOK: 'tiktok',
    SNAPCHAT: 'snapchat',
  },
  FLASH_SALE_STATUS: { ...FLASH_SALE_STATUS },
  SHARE_BUTTON_TYPES: {
    FIXED: 'fixed',
    FLOATING: 'floating',
    INLINE: 'inline',
  },
  TRACKING_PARAMETERS: ['source', 'medium', 'campaign', 'content'],
} as const;
