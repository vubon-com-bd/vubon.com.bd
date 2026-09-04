/**
 * Deal Discount Type Constants
 * ডিল ডিসকাউন্ট টাইপ সম্পর্কিত কনস্ট্যান্টস
 */

import { TYPES } from '../../common';
import { DEAL } from './deal.constants';

export const DEAL_DISCOUNT_TYPES = {
  // Common types
  ...TYPES,

  // Deal discount specific types
  PERCENTAGE: DEAL.DISCOUNT_TYPES.PERCENTAGE,
  FIXED: DEAL.DISCOUNT_TYPES.FIXED,
  BUNDLE: DEAL.DISCOUNT_TYPES.BUNDLE,
  BUY_X_GET_Y: DEAL.DISCOUNT_TYPES.BUY_X_GET_Y,

  // Additional discount types
  VOLUME: 'volume',
  SEASONAL: 'seasonal',
  MEMBERSHIP: 'membership',
  EARLY_BIRD: 'early_bird',
  LAST_CHANCE: 'last_chance',
} as const;

export type DealDiscountTypeValue = (typeof DEAL_DISCOUNT_TYPES)[keyof typeof DEAL_DISCOUNT_TYPES];
