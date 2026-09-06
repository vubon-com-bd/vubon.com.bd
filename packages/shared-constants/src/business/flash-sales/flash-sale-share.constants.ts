/**
 * Flash Sale Share Constants
 * ফ্ল্যাশ সেল শেয়ার সম্পর্কিত কনস্ট্যান্টস
 */

export const FLASH_SALE_SHARE = {
  // Share platforms
  PLATFORMS: {
    FACEBOOK: 'facebook',
    TWITTER: 'twitter',
    LINKEDIN: 'linkedin',
    WHATSAPP: 'whatsapp',
    TELEGRAM: 'telegram',
    EMAIL: 'email',
    COPY_LINK: 'copy_link',
    OTHER: 'other',
  },

  // Share status
  STATUS: {
    ACTIVE: 'active',
    INACTIVE: 'inactive',
    EXPIRED: 'expired',
    CANCELLED: 'cancelled',
  },

  // Default values
  DEFAULTS: {
    MAX_SHARES: 100,
    SHARE_EXPIRY: 7, // days
    CLICK_THRESHOLD: 10,
  },
} as const;

export type FlashSaleSharePlatform =
  (typeof FLASH_SALE_SHARE.PLATFORMS)[keyof typeof FLASH_SALE_SHARE.PLATFORMS];
export type FlashSaleShareStatus =
  (typeof FLASH_SALE_SHARE.STATUS)[keyof typeof FLASH_SALE_SHARE.STATUS];
