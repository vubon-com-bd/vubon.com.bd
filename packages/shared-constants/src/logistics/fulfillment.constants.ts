/**
 * ফুলফিলমেন্ট সম্পর্কিত মৌলিক কনস্ট্যান্টসমূহ
 */

/**
 * ফুলফিলমেন্ট নম্বরের প্রিফিক্স
 */
export const FULFILLMENT_PREFIX = 'FUL-' as const;

/**
 * ফুলফিলমেন্ট নম্বরের ফরম্যাট
 */
export const FULFILLMENT_NUMBER_FORMAT = {
  PREFIX: FULFILLMENT_PREFIX,
  SEPARATOR: '-',
  DATE_FORMAT: 'YYYYMMDD',
  RANDOM_LENGTH: 6,
} as const;

/**
 * ফুলফিলমেন্টের সর্বোচ্চ আইটেম সংখ্যা
 */
export const MAX_FULFILLMENT_ITEMS = 100;

/**
 * ফুলফিলমেন্ট প্রক্রিয়াকরণের সময়সীমা (ঘন্টায়)
 */
export const FULFILLMENT_PROCESSING_HOURS = 24;

/**
 * পিকিং টাইমআউট (মিনিটে)
 */
export const PICKING_TIMEOUT_MINUTES = 30;

/**
 * প্যাকিং টাইমআউট (মিনিটে)
 */
export const PACKING_TIMEOUT_MINUTES = 20;

/**
 * ডিফল্ট প্যাকেজিং উপকরণ
 */
export const DEFAULT_PACKAGING_MATERIALS = {
  BOX: 'standard_box',
  BUBBLE_WRAP: 'bubble_wrap',
  TAPE: 'packing_tape',
  LABEL: 'shipping_label',
  FILLER: 'packing_peanuts',
} as const;

/**
 * ডিফল্ট প্যাকেজিং উপকরণ টাইপ
 */
export type DefaultPackagingMaterials = typeof DEFAULT_PACKAGING_MATERIALS;

/**
 * ফুলফিলমেন্ট প্রক্রিয়াকরণ ধাপ
 */
export const FULFILLMENT_STEPS = {
  ORDER_RECEIVED: 'order_received',
  PICKING: 'picking',
  PACKING: 'packing',
  LABELING: 'labeling',
  QUALITY_CHECK: 'quality_check',
  READY_TO_SHIP: 'ready_to_ship',
  SHIPPED: 'shipped',
} as const;

/**
 * ফুলফিলমেন্ট প্রক্রিয়াকরণ ধাপ টাইপ
 */
export type FulfillmentStep = (typeof FULFILLMENT_STEPS)[keyof typeof FULFILLMENT_STEPS];

/**
 * ফুলফিলমেন্ট কনফিগারেশন
 */
export const FULFILLMENT_CONFIG = {
  PREFIX: FULFILLMENT_PREFIX,
  NUMBER_FORMAT: FULFILLMENT_NUMBER_FORMAT,
  MAX_ITEMS: MAX_FULFILLMENT_ITEMS,
  PROCESSING_HOURS: FULFILLMENT_PROCESSING_HOURS,
  PICKING_TIMEOUT: PICKING_TIMEOUT_MINUTES,
  PACKING_TIMEOUT: PACKING_TIMEOUT_MINUTES,
  DEFAULT_PACKAGING: DEFAULT_PACKAGING_MATERIALS,
  STEPS: FULFILLMENT_STEPS,
} as const;

/**
 * ফুলফিলমেন্ট কনফিগারেশন টাইপ
 */
export type FulfillmentConfig = typeof FULFILLMENT_CONFIG;

/**
 * ফুলফিলমেন্ট নম্বর জেনারেট করুন
 */
export function generateFulfillmentNumber(): string {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const dateStr = `${year}${month}${day}`;
  const random = Math.random().toString(36).substring(2, 8).toUpperCase();
  return `${FULFILLMENT_PREFIX}${dateStr}${FULFILLMENT_NUMBER_FORMAT.SEPARATOR}${random}`;
}

/**
 * ফুলফিলমেন্ট নম্বর ভালিডেট করুন
 */
export function isValidFulfillmentNumber(number: string): boolean {
  return number.startsWith(FULFILLMENT_PREFIX) && number.length >= 15;
}
