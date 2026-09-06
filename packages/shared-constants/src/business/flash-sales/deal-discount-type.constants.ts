/**
 * Deal Discount Type Constants (EXTENDS common/types)
 * @module shared-constants/business/flash-sales/deal-discount-type.constants
 */

import { TYPES } from '../../common/types.constants';

export const DEAL_DISCOUNT_TYPE = {
  // Base types from common
  ...TYPES,

  // Discount types
  PERCENTAGE: 'percentage',
  FIXED_AMOUNT: 'fixed_amount',
  BUY_X_GET_Y: 'buy_x_get_y',
  BUNDLE: 'bundle',
  VOLUME: 'volume',
  TIERED: 'tiered',
  SEASONAL: 'seasonal',
  FLASH: 'flash',
  CLEARANCE: 'clearance',
  OVERSTOCK: 'overstock',
  BOGO: 'bogo',
  FREE_SHIPPING: 'free_shipping',
  FREE_GIFT: 'free_gift',
  CASHBACK: 'cashback',
  STORE_CREDIT: 'store_credit',
  LOYALTY_POINTS: 'loyalty_points',
  EARLY_BIRD: 'early_bird',
  LATE_BIRD: 'late_bird',
  VIP: 'vip',
  MEMBER: 'member',
  NEW_USER: 'new_user',
  REFERRAL: 'referral',
  BIRTHDAY: 'birthday',
  ANNIVERSARY: 'anniversary',
} as const;

export type DealDiscountType = (typeof DEAL_DISCOUNT_TYPE)[keyof typeof DEAL_DISCOUNT_TYPE];

// Define a type for discount type keys (excluding base types from TYPES)
export type DealDiscountTypeKey =
  | 'PERCENTAGE'
  | 'FIXED_AMOUNT'
  | 'BUY_X_GET_Y'
  | 'BUNDLE'
  | 'VOLUME'
  | 'TIERED'
  | 'SEASONAL'
  | 'FLASH'
  | 'CLEARANCE'
  | 'OVERSTOCK'
  | 'BOGO'
  | 'FREE_SHIPPING'
  | 'FREE_GIFT'
  | 'CASHBACK'
  | 'STORE_CREDIT'
  | 'LOYALTY_POINTS'
  | 'EARLY_BIRD'
  | 'LATE_BIRD'
  | 'VIP'
  | 'MEMBER'
  | 'NEW_USER'
  | 'REFERRAL'
  | 'BIRTHDAY'
  | 'ANNIVERSARY';

export const DEAL_DISCOUNT_TYPE_LABELS: Record<DealDiscountTypeKey, string> = {
  PERCENTAGE: 'Percentage',
  FIXED_AMOUNT: 'Fixed Amount',
  BUY_X_GET_Y: 'Buy X Get Y',
  BUNDLE: 'Bundle',
  VOLUME: 'Volume',
  TIERED: 'Tiered',
  SEASONAL: 'Seasonal',
  FLASH: 'Flash',
  CLEARANCE: 'Clearance',
  OVERSTOCK: 'Overstock',
  BOGO: 'BOGO',
  FREE_SHIPPING: 'Free Shipping',
  FREE_GIFT: 'Free Gift',
  CASHBACK: 'Cashback',
  STORE_CREDIT: 'Store Credit',
  LOYALTY_POINTS: 'Loyalty Points',
  EARLY_BIRD: 'Early Bird',
  LATE_BIRD: 'Late Bird',
  VIP: 'VIP',
  MEMBER: 'Member',
  NEW_USER: 'New User',
  REFERRAL: 'Referral',
  BIRTHDAY: 'Birthday',
  ANNIVERSARY: 'Anniversary',
};

export const DEAL_DISCOUNT_TYPE_GROUPS = {
  PERCENTAGE_BASED: [DEAL_DISCOUNT_TYPE.PERCENTAGE, DEAL_DISCOUNT_TYPE.TIERED] as const,

  AMOUNT_BASED: [
    DEAL_DISCOUNT_TYPE.FIXED_AMOUNT,
    DEAL_DISCOUNT_TYPE.CASHBACK,
    DEAL_DISCOUNT_TYPE.STORE_CREDIT,
    DEAL_DISCOUNT_TYPE.LOYALTY_POINTS,
  ] as const,

  PRODUCT_BASED: [
    DEAL_DISCOUNT_TYPE.BUY_X_GET_Y,
    DEAL_DISCOUNT_TYPE.BUNDLE,
    DEAL_DISCOUNT_TYPE.BOGO,
    DEAL_DISCOUNT_TYPE.FREE_GIFT,
  ] as const,

  CONDITION_BASED: [
    DEAL_DISCOUNT_TYPE.VOLUME,
    DEAL_DISCOUNT_TYPE.SEASONAL,
    DEAL_DISCOUNT_TYPE.FLASH,
    DEAL_DISCOUNT_TYPE.CLEARANCE,
    DEAL_DISCOUNT_TYPE.OVERSTOCK,
  ] as const,

  USER_BASED: [
    DEAL_DISCOUNT_TYPE.VIP,
    DEAL_DISCOUNT_TYPE.MEMBER,
    DEAL_DISCOUNT_TYPE.NEW_USER,
    DEAL_DISCOUNT_TYPE.REFERRAL,
    DEAL_DISCOUNT_TYPE.BIRTHDAY,
    DEAL_DISCOUNT_TYPE.ANNIVERSARY,
  ] as const,

  SHIPPING_BASED: [DEAL_DISCOUNT_TYPE.FREE_SHIPPING] as const,

  TIME_BASED: [DEAL_DISCOUNT_TYPE.EARLY_BIRD, DEAL_DISCOUNT_TYPE.LATE_BIRD] as const,
} as const;
