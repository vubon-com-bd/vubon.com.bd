/**
 * শিপিং কনস্ট্যান্ট
 * শিপিং সম্পর্কিত সব কনফিগারেশন এবং কনস্ট্যান্ট
 */

/**
 * শিপিং মেথড
 */
export const SHIPPING_METHODS = {
  STANDARD: 'standard',
  EXPRESS: 'express',
  NEXT_DAY: 'next_day',
  PICKUP: 'pickup',
} as const;

export type ShippingMethod = (typeof SHIPPING_METHODS)[keyof typeof SHIPPING_METHODS];

/**
 * শিপিং স্ট্যাটাস
 */
export const SHIPPING_STATUS = {
  PENDING: 'pending',
  PROCESSING: 'processing',
  SHIPPED: 'shipped',
  DELIVERED: 'delivered',
} as const;

export type ShippingStatus = (typeof SHIPPING_STATUS)[keyof typeof SHIPPING_STATUS];

/**
 * ফ্রি শিপিংয়ের জন্য ন্যূনতম অর্ডার
 */
export const FREE_SHIPPING_THRESHOLD = 1000;

/**
 * ওজনভিত্তিক চার্জ (প্রতি কেজি)
 */
export const SHIPPING_COST_BY_WEIGHT = {
  BASE_RATE: 50,
  PER_KG_RATE: 20,
  MAX_WEIGHT: 50,
} as const;

export type ShippingCostByWeight = typeof SHIPPING_COST_BY_WEIGHT;

/**
 * দূরত্বভিত্তিক চার্জ (প্রতি কিমি)
 */
export const SHIPPING_COST_BY_DISTANCE = {
  BASE_RATE: 30,
  PER_KM_RATE: 5,
  MAX_DISTANCE: 500,
} as const;

export type ShippingCostByDistance = typeof SHIPPING_COST_BY_DISTANCE;

/**
 * প্রতি প্যাকেজে সর্বোচ্চ ওজন (কেজি)
 */
export const MAX_WEIGHT_PER_PACKAGE = 30;

/**
 * শিপিং জোন
 */
export const SHIPPING_ZONES = {
  LOCAL: 'local',
  NATIONAL: 'national',
  INTERNATIONAL: 'international',
} as const;

export type ShippingZone = (typeof SHIPPING_ZONES)[keyof typeof SHIPPING_ZONES];

/**
 * ডেলিভারি সময় (দিনে)
 */
export const ESTIMATED_DELIVERY_DAYS = {
  LOCAL: '2-5',
  NATIONAL: '5-7',
  INTERNATIONAL: '7-14',
} as const;

export type EstimatedDeliveryDays = typeof ESTIMATED_DELIVERY_DAYS;
