/**
 * Delivery Constants
 * ডেলিভারি সম্পর্কিত কনস্ট্যান্টস
 */

import { STATUS } from '../../common';

export const DELIVERY = {
  // Delivery status
  STATUS: {
    PENDING: STATUS.PENDING,
    PROCESSING: 'processing',
    PICKED: 'picked',
    IN_TRANSIT: 'in_transit',
    OUT_FOR_DELIVERY: 'out_for_delivery',
    ATTEMPTED: 'attempted',
    DELIVERED: 'delivered',
    FAILED: 'failed',
    RETURNED: 'returned',
    CANCELLED: 'cancelled',
    RESCHEDULED: 'rescheduled',
  },

  // Delivery types
  TYPES: {
    STANDARD: 'standard',
    EXPRESS: 'express',
    SAME_DAY: 'same_day',
    NEXT_DAY: 'next_day',
    SCHEDULED: 'scheduled',
    PICKUP: 'pickup',
    DROPSHIPPING: 'dropshipping',
  },

  // Delivery zones (Bangladesh)
  ZONES: {
    DHAKA: 'dhaka',
    CHITTAGONG: 'chittagong',
    RAJSHAHI: 'rajshahi',
    KHULNA: 'khulna',
    BARISAL: 'barisal',
    SYLHET: 'sylhet',
    RANGPUR: 'rangpur',
    MYMENSINGH: 'mymensingh',
  },

  // Delivery times (in hours)
  TIMES: {
    STANDARD: 72,
    EXPRESS: 48,
    SAME_DAY: 12,
    NEXT_DAY: 24,
    SCHEDULED: 24,
    PICKUP: 0,
    DROPSHIPPING: 96,
  },

  // Default values
  DEFAULTS: {
    MAX_WEIGHT: 50,
    MAX_DIMENSIONS: {
      LENGTH: 100,
      WIDTH: 100,
      HEIGHT: 100,
    },
    FREE_DELIVERY_THRESHOLD: 1000,
    DELIVERY_CHARGE: 60,
    ATTEMPT_LIMIT: 3,
    STORAGE_DAYS: 3,
  },
} as const;

export type DeliveryStatus = (typeof DELIVERY.STATUS)[keyof typeof DELIVERY.STATUS];
export type DeliveryType = (typeof DELIVERY.TYPES)[keyof typeof DELIVERY.TYPES];
export type DeliveryZone = (typeof DELIVERY.ZONES)[keyof typeof DELIVERY.ZONES];

export const DELIVERY_STATUS = DELIVERY.STATUS;
export const DELIVERY_TYPES = DELIVERY.TYPES;
export const DELIVERY_ZONES = DELIVERY.ZONES;
