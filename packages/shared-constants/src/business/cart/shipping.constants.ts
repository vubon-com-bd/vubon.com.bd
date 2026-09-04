/**
 * Shipping Constants
 * শিপিং সম্পর্কিত কনস্ট্যান্টস
 */

import { TYPES } from '../../common';

export const SHIPPING = {
  // Shipping types (TYPES থেকে ম্যাপিং)
  TYPES: {
    STANDARD: 'standard',
    EXPRESS: 'express',
    SAME_DAY: 'same_day',
    NEXT_DAY: 'next_day',
    INTERNATIONAL: 'international',
    FREE: 'free',
    PICKUP: 'pickup',
    DROPSHIPPING: 'dropshipping',
  },

  // Shipping status
  STATUS: {
    PENDING: 'pending',
    PROCESSING: 'processing',
    SHIPPED: 'shipped',
    IN_TRANSIT: 'in_transit',
    OUT_FOR_DELIVERY: 'out_for_delivery',
    DELIVERED: 'delivered',
    FAILED: 'failed',
    RETURNED: 'returned',
    CANCELLED: 'cancelled',
  },

  // Shipping carriers (Bangladesh)
  CARRIERS: {
    SA_PARIBAN: 'sa_paribahan',
    REDX: 'redx',
    PATHAO: 'pathao',
    STEADFAST: 'steadfast',
    SUNDARBAN: 'sundarban',
    PAPERFLY: 'paperfly',
    ECOURIER: 'ecourier',
    DHL: 'dhl',
    FEDEX: 'fedex',
    UPS: 'ups',
  },

  // Shipping zones (Bangladesh)
  ZONES: {
    DHAKA: 'dhaka',
    CHITTAGONG: 'chittagong',
    RAJSHAHI: 'rajshahi',
    KHULNA: 'khulna',
    BARISAL: 'barisal',
    SYLHET: 'sylhet',
    RANGPUR: 'rangpur',
    MYMENSINGH: 'mymensingh',
    INTERNATIONAL: 'international',
  },

  // TYPES ব্যবহার করে Shipping Type ম্যাপিং
  SHIPPING_TYPES: {
    STANDARD: TYPES.DEFAULT || 'standard',
    EXPRESS: 'express',
    SAME_DAY: 'same_day',
    NEXT_DAY: 'next_day',
    INTERNATIONAL: 'international',
    FREE: 'free',
    PICKUP: 'pickup',
    DROPSHIPPING: 'dropshipping',
  },

  // Default values
  DEFAULTS: {
    MIN_WEIGHT: 0.1,
    MAX_WEIGHT: 50,
    FREE_SHIPPING_THRESHOLD: 1000,
    ESTIMATED_DAYS: {
      STANDARD: 3,
      EXPRESS: 2,
      SAME_DAY: 1,
      NEXT_DAY: 1,
      INTERNATIONAL: 7,
    },
  },
} as const;

export type ShippingType = (typeof SHIPPING.TYPES)[keyof typeof SHIPPING.TYPES];
export type ShippingStatus = (typeof SHIPPING.STATUS)[keyof typeof SHIPPING.STATUS];
export type ShippingCarrier = (typeof SHIPPING.CARRIERS)[keyof typeof SHIPPING.CARRIERS];
export type ShippingZone = (typeof SHIPPING.ZONES)[keyof typeof SHIPPING.ZONES];
export type ShippingTypeValue =
  (typeof SHIPPING.SHIPPING_TYPES)[keyof typeof SHIPPING.SHIPPING_TYPES];
