/**
 * Flash Sale Type Constants (EXTENDS common/types)
 * @module shared-constants/business/flash-sales/flash-sale-type.constants
 */

import { TYPES } from '../../common/types.constants';

export const FLASH_SALE_TYPES = {
  // Base types from common
  ...TYPES,

  // Flash sale types
  DAILY_DEAL: 'daily_deal',
  WEEKLY_DEAL: 'weekly_deal',
  MONTHLY_DEAL: 'monthly_deal',
  SEASONAL_DEAL: 'seasonal_deal',
  HOLIDAY_DEAL: 'holiday_deal',
  SPECIAL_DEAL: 'special_deal',
  URGENT_DEAL: 'urgent_deal',
  LIMITED_DEAL: 'limited_deal',
  EXCLUSIVE_DEAL: 'exclusive_deal',
  MEMBER_DEAL: 'member_deal',
  VIP_DEAL: 'vip_deal',
  NEW_USER_DEAL: 'new_user_deal',
  REFERRAL_DEAL: 'referral_deal',
  BIRTHDAY_DEAL: 'birthday_deal',
  ANNIVERSARY_DEAL: 'anniversary_deal',
  CLEARANCE_DEAL: 'clearance_deal',
  OVERSTOCK_DEAL: 'overstock_deal',
  BUNDLE_DEAL: 'bundle_deal',
  BOGO_DEAL: 'bogo_deal',
  FLASH_DEAL: 'flash_deal',
} as const;

// Rename type to avoid conflict with flash-sale.constants
export type FlashSaleTypeValue = (typeof FLASH_SALE_TYPES)[keyof typeof FLASH_SALE_TYPES];

// Define a type for flash sale type keys (excluding base types from TYPES)
export type FlashSaleTypeKey =
  | 'DAILY_DEAL'
  | 'WEEKLY_DEAL'
  | 'MONTHLY_DEAL'
  | 'SEASONAL_DEAL'
  | 'HOLIDAY_DEAL'
  | 'SPECIAL_DEAL'
  | 'URGENT_DEAL'
  | 'LIMITED_DEAL'
  | 'EXCLUSIVE_DEAL'
  | 'MEMBER_DEAL'
  | 'VIP_DEAL'
  | 'NEW_USER_DEAL'
  | 'REFERRAL_DEAL'
  | 'BIRTHDAY_DEAL'
  | 'ANNIVERSARY_DEAL'
  | 'CLEARANCE_DEAL'
  | 'OVERSTOCK_DEAL'
  | 'BUNDLE_DEAL'
  | 'BOGO_DEAL'
  | 'FLASH_DEAL';

export const FLASH_SALE_TYPE_LABELS: Record<FlashSaleTypeKey, string> = {
  DAILY_DEAL: 'Daily Deal',
  WEEKLY_DEAL: 'Weekly Deal',
  MONTHLY_DEAL: 'Monthly Deal',
  SEASONAL_DEAL: 'Seasonal Deal',
  HOLIDAY_DEAL: 'Holiday Deal',
  SPECIAL_DEAL: 'Special Deal',
  URGENT_DEAL: 'Urgent Deal',
  LIMITED_DEAL: 'Limited Deal',
  EXCLUSIVE_DEAL: 'Exclusive Deal',
  MEMBER_DEAL: 'Member Deal',
  VIP_DEAL: 'VIP Deal',
  NEW_USER_DEAL: 'New User Deal',
  REFERRAL_DEAL: 'Referral Deal',
  BIRTHDAY_DEAL: 'Birthday Deal',
  ANNIVERSARY_DEAL: 'Anniversary Deal',
  CLEARANCE_DEAL: 'Clearance Deal',
  OVERSTOCK_DEAL: 'Overstock Deal',
  BUNDLE_DEAL: 'Bundle Deal',
  BOGO_DEAL: 'BOGO Deal',
  FLASH_DEAL: 'Flash Deal',
};

export const FLASH_SALE_TYPE_GROUPS = {
  TIME_BASED: [
    FLASH_SALE_TYPES.DAILY_DEAL,
    FLASH_SALE_TYPES.WEEKLY_DEAL,
    FLASH_SALE_TYPES.MONTHLY_DEAL,
    FLASH_SALE_TYPES.SEASONAL_DEAL,
  ] as const,

  AUDIENCE_BASED: [
    FLASH_SALE_TYPES.MEMBER_DEAL,
    FLASH_SALE_TYPES.VIP_DEAL,
    FLASH_SALE_TYPES.NEW_USER_DEAL,
    FLASH_SALE_TYPES.REFERRAL_DEAL,
    FLASH_SALE_TYPES.BIRTHDAY_DEAL,
    FLASH_SALE_TYPES.ANNIVERSARY_DEAL,
  ] as const,

  STOCK_BASED: [
    FLASH_SALE_TYPES.CLEARANCE_DEAL,
    FLASH_SALE_TYPES.OVERSTOCK_DEAL,
    FLASH_SALE_TYPES.LIMITED_DEAL,
  ] as const,

  PROMOTIONAL: [
    FLASH_SALE_TYPES.HOLIDAY_DEAL,
    FLASH_SALE_TYPES.SPECIAL_DEAL,
    FLASH_SALE_TYPES.URGENT_DEAL,
    FLASH_SALE_TYPES.EXCLUSIVE_DEAL,
    FLASH_SALE_TYPES.FLASH_DEAL,
  ] as const,

  COMBINATION: [FLASH_SALE_TYPES.BUNDLE_DEAL, FLASH_SALE_TYPES.BOGO_DEAL] as const,
} as const;
