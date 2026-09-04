/**
 * Coupon Type Constants
 * কুপন টাইপ সম্পর্কিত কনস্ট্যান্টস
 */

import { TYPES } from '../../common';
import { COUPON } from './coupon.constants';

export const COUPON_TYPES = {
  // Common types
  ...TYPES,

  // Coupon specific types
  DISCOUNT: COUPON.TYPES.DISCOUNT,
  FREE_SHIPPING: COUPON.TYPES.FREE_SHIPPING,
  BUY_GET: COUPON.TYPES.BUY_GET,
  GIFT: COUPON.TYPES.GIFT,
  VOUCHER: COUPON.TYPES.VOUCHER,

  // Additional coupon types
  WELCOME: 'welcome',
  REFERRAL: 'referral',
  BIRTHDAY: 'birthday',
  SEASONAL: 'seasonal',
  FLASH_SALE: 'flash_sale',
  BUNDLE: 'bundle',
} as const;

export type CouponTypeValue = (typeof COUPON_TYPES)[keyof typeof COUPON_TYPES];
