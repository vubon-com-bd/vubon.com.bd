/**
 * Flash Sale Share Constants (EXTENDS common/types)
 * @module shared-constants/business/flash-sales/flash-sale-share.constants
 */

import { TYPES } from '../../common/types.constants';

export const FLASH_SALE_SHARE = {
  // Base types from common
  ...TYPES,

  // Share specific
  SHARE_CACHE_TTL: 3600,
  MAX_SHARES_PER_USER: 50,

  // Share platform
  FLASH_SALE_SHARE_PLATFORM: {
    FACEBOOK: 'facebook',
    TWITTER: 'twitter',
    INSTAGRAM: 'instagram',
    LINKEDIN: 'linkedin',
    WHATSAPP: 'whatsapp',
    TELEGRAM: 'telegram',
    EMAIL: 'email',
    SMS: 'sms',
    COPY_LINK: 'copy_link',
  } as const,

  // Share type
  FLASH_SALE_SHARE_TYPE: {
    PRODUCT: 'product',
    BUNDLE: 'bundle',
    SALE: 'sale',
    VOUCHER: 'voucher',
    COUPON: 'coupon',
    REFERRAL: 'referral',
  } as const,

  // Share status
  FLASH_SALE_SHARE_STATUS: {
    PENDING: 'pending',
    COMPLETED: 'completed',
    FAILED: 'failed',
    CANCELLED: 'cancelled',
  } as const,

  // Share analytics
  FLASH_SALE_SHARE_ANALYTICS: {
    TRACK_CLICKS: true,
    TRACK_CONVERSIONS: true,
    TRACK_REVENUE: true,
    TRACK_REFERRALS: true,
  } as const,
} as const;

export type FlashSaleSharePlatform =
  (typeof FLASH_SALE_SHARE.FLASH_SALE_SHARE_PLATFORM)[keyof typeof FLASH_SALE_SHARE.FLASH_SALE_SHARE_PLATFORM];
export type FlashSaleShareType =
  (typeof FLASH_SALE_SHARE.FLASH_SALE_SHARE_TYPE)[keyof typeof FLASH_SALE_SHARE.FLASH_SALE_SHARE_TYPE];
export type FlashSaleShareStatus =
  (typeof FLASH_SALE_SHARE.FLASH_SALE_SHARE_STATUS)[keyof typeof FLASH_SALE_SHARE.FLASH_SALE_SHARE_STATUS];
