/**
 * Cart Shipping Constants (EXTENDS common/types)
 * @module shared-constants/business/cart/shipping.constants
 */

import { TYPES } from '../../common/types.constants';

export const CART_SHIPPING = {
  // Base types from common
  ...TYPES,

  // Shipping specific
  DEFAULT_SHIPPING_METHOD: 'standard',
  FREE_SHIPPING_THRESHOLD: 500,
  SHIPPING_CACHE_TTL: 3600,

  // Shipping method
  CART_SHIPPING_METHOD: {
    STANDARD: 'standard',
    EXPRESS: 'express',
    NEXT_DAY: 'next_day',
    SAME_DAY: 'same_day',
    OVERNIGHT: 'overnight',
    PICKUP: 'pickup',
    FREIGHT: 'freight',
    BULK: 'bulk',
    FREE: 'free',
  } as const,

  // Shipping status
  CART_SHIPPING_STATUS: {
    PENDING: 'pending',
    PROCESSING: 'processing',
    IN_TRANSIT: 'in_transit',
    OUT_FOR_DELIVERY: 'out_for_delivery',
    DELIVERED: 'delivered',
    FAILED: 'failed',
    CANCELLED: 'cancelled',
    RETURNED: 'returned',
  } as const,

  // Shipping type
  CART_SHIPPING_TYPE: {
    DOMESTIC: 'domestic',
    INTERNATIONAL: 'international',
    LOCAL: 'local',
    REGIONAL: 'regional',
    EXPRESS: 'express',
    ECONOMY: 'economy',
    PREMIUM: 'premium',
  } as const,

  // Shipping calculation
  CART_SHIPPING_CALCULATION: {
    WEIGHT: 'weight',
    VOLUME: 'volume',
    PRICE: 'price',
    FLAT_RATE: 'flat_rate',
    DYNAMIC: 'dynamic',
    FREE: 'free',
  } as const,

  // Shipping validation
  CART_SHIPPING_VALIDATION: {
    POSTAL_CODE_REQUIRED: true,
    PHONE_REQUIRED: true,
    EMAIL_REQUIRED: false,
    ADDRESS_REQUIRED: true,
    CITY_REQUIRED: true,
    STATE_REQUIRED: true,
    COUNTRY_REQUIRED: true,
  } as const,

  // Bangladesh shipping
  BD_SHIPPING: {
    DIVISIONS: ['ঢাকা', 'চট্টগ্রাম', 'রাজশাহী', 'খুলনা', 'বরিশাল', 'সিলেট', 'রংপুর', 'ময়মনসিংহ'],
    CITY_CORPORATIONS: [
      'Dhaka',
      'Chittagong',
      'Rajshahi',
      'Khulna',
      'Sylhet',
      'Barishal',
      'Rangpur',
      'Mymensingh',
    ],
    POSTAL_CODE_FORMAT: /^\d{4}$/,
    FREE_SHIPPING_THRESHOLD_BDT: 500,
    STANDARD_DELIVERY_DAYS: [3, 5],
    EXPRESS_DELIVERY_DAYS: [1, 2],
    SAME_DAY_AVAILABLE_CITIES: ['Dhaka', 'Chittagong'],
  } as const,
} as const;

export type CartShippingMethod =
  (typeof CART_SHIPPING.CART_SHIPPING_METHOD)[keyof typeof CART_SHIPPING.CART_SHIPPING_METHOD];
export type CartShippingStatus =
  (typeof CART_SHIPPING.CART_SHIPPING_STATUS)[keyof typeof CART_SHIPPING.CART_SHIPPING_STATUS];
export type CartShippingType =
  (typeof CART_SHIPPING.CART_SHIPPING_TYPE)[keyof typeof CART_SHIPPING.CART_SHIPPING_TYPE];
export type CartShippingCalculation =
  (typeof CART_SHIPPING.CART_SHIPPING_CALCULATION)[keyof typeof CART_SHIPPING.CART_SHIPPING_CALCULATION];
