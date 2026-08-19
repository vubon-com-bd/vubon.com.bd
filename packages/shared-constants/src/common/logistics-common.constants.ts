/**
 * Logistics সিস্টেমের জন্য একেবারে মৌলিক, সব জায়গায় ব্যবহৃত কনস্ট্যান্ট
 */

/**
 * ডিফল্ট কারেন্সি
 */
export const LOGISTICS_DEFAULT_CURRENCY = 'BDT' as const;

/**
 * ডিফল্ট সময় অঞ্চল
 */
export const LOGISTICS_TIMEZONE = 'Asia/Dhaka' as const;

/**
 * ডিফল্ট ভাষা
 */
export const LOGISTICS_DEFAULT_LOCALE = 'bn' as const;

/**
 * ডিফল্ট জিও-কোডিং প্রোভাইডার
 */
export const LOGISTICS_GEOCODING_PROVIDER = 'google' as const;

/**
 * মাপের একক - ওজন
 */
export const LOGISTICS_WEIGHT_UNIT = 'kg' as const;

/**
 * মাপের একক - দূরত্ব
 */
export const LOGISTICS_DISTANCE_UNIT = 'km' as const;

/**
 * মাপের একক - আয়তন
 */
export const LOGISTICS_VOLUME_UNIT = 'cft' as const;

/**
 * মাপের একক - সময়
 */
export const LOGISTICS_TIME_UNIT = 'hours' as const;

/**
 * Logistics সিস্টেমের নাম
 */
export const LOGISTICS_SYSTEM_NAME = 'Vubon Logistics' as const;

/**
 * Logistics সিস্টেমের সংস্করণ
 */
export const LOGISTICS_SYSTEM_VERSION = '1.0.0' as const;

/**
 * Logistics সিস্টেমের কোম্পানি
 */
export const LOGISTICS_COMPANY_NAME = 'Vubon' as const;

/**
 * Logistics সিস্টেমের ওয়েবসাইট
 */
export const LOGISTICS_WEBSITE_URL = 'https://vubon.com' as const;

/**
 * Logistics সিস্টেমের ইমেইল
 */
export const LOGISTICS_SUPPORT_EMAIL = 'support@vubon.com' as const;

/**
 * Logistics সিস্টেমের ফোন
 */
export const LOGISTICS_SUPPORT_PHONE = '+8801234567890' as const;

/**
 * Logistics ডিফল্ট কনফিগারেশন
 */
export const LOGISTICS_COMMON_CONFIG = {
  DEFAULT_CURRENCY: LOGISTICS_DEFAULT_CURRENCY,
  TIMEZONE: LOGISTICS_TIMEZONE,
  DEFAULT_LOCALE: LOGISTICS_DEFAULT_LOCALE,
  GEOCODING_PROVIDER: LOGISTICS_GEOCODING_PROVIDER,
  WEIGHT_UNIT: LOGISTICS_WEIGHT_UNIT,
  DISTANCE_UNIT: LOGISTICS_DISTANCE_UNIT,
  VOLUME_UNIT: LOGISTICS_VOLUME_UNIT,
  TIME_UNIT: LOGISTICS_TIME_UNIT,
  SYSTEM_NAME: LOGISTICS_SYSTEM_NAME,
  SYSTEM_VERSION: LOGISTICS_SYSTEM_VERSION,
  COMPANY_NAME: LOGISTICS_COMPANY_NAME,
  WEBSITE_URL: LOGISTICS_WEBSITE_URL,
  SUPPORT_EMAIL: LOGISTICS_SUPPORT_EMAIL,
  SUPPORT_PHONE: LOGISTICS_SUPPORT_PHONE,
} as const;

/**
 * Logistics কমন কনফিগারেশন টাইপ
 */
export type LogisticsCommonConfig = typeof LOGISTICS_COMMON_CONFIG;

/**
 * ট্র্যাকিং-সংক্রান্ত সকল সাধারণ কনস্ট্যান্ট
 */

/**
 * ট্র্যাকিং নম্বরের প্রিফিক্স
 */
export const TRACKING_NUMBER_PREFIX = 'TRK' as const;

/**
 * ট্র্যাকিং নম্বরের দৈর্ঘ্য
 */
export const TRACKING_NUMBER_LENGTH = 12;

/**
 * ট্র্যাকিং নম্বরের ফরম্যাট
 */
export const TRACKING_NUMBER_FORMAT = {
  PREFIX: TRACKING_NUMBER_PREFIX,
  SEPARATOR: '-',
  LENGTH: TRACKING_NUMBER_LENGTH,
  PATTERN: /^TRK-\d{9}$/,
} as const;

/**
 * ট্র্যাকিং আপডেটের ইন্টারভাল (সেকেন্ড)
 */
export const TRACKING_UPDATE_INTERVAL_SECONDS = 300;

/**
 * ট্র্যাকিং ডেটা রিটেনশন পিরিয়ড (দিন)
 */
export const TRACKING_DATA_RETENTION_DAYS = 90;

/**
 * ট্র্যাকিং সর্বোচ্চ ইভেন্ট সংখ্যা
 */
export const TRACKING_MAX_EVENTS = 50;

/**
 * ট্র্যাকিং কনফিগারেশন
 */
export const TRACKING_CONFIG = {
  PREFIX: TRACKING_NUMBER_PREFIX,
  LENGTH: TRACKING_NUMBER_LENGTH,
  FORMAT: TRACKING_NUMBER_FORMAT,
  UPDATE_INTERVAL: TRACKING_UPDATE_INTERVAL_SECONDS,
  RETENTION_DAYS: TRACKING_DATA_RETENTION_DAYS,
  MAX_EVENTS: TRACKING_MAX_EVENTS,
} as const;

/**
 * ট্র্যাকিং কনফিগারেশন টাইপ
 */
export type TrackingConfig = typeof TRACKING_CONFIG;

/**
 * শিপিং ও ডেলিভারি-সংক্রান্ত সাধারণ কনস্ট্যান্ট
 */

/**
 * ডিফল্ট শিপিং পদ্ধতি
 */
export const DEFAULT_SHIPPING_METHOD = 'standard' as const;

/**
 * সর্বোচ্চ শিপিং ওজন (কেজি)
 */
export const MAX_SHIPMENT_WEIGHT_KG = 50;

/**
 * ডেলিভারি প্রচেষ্টার সর্বোচ্চ সংখ্যা
 */
export const MAX_DELIVERY_ATTEMPTS = 3;

/**
 * ডেলিভারি সময়সীমা (ঘন্টা)
 */
export const DEFAULT_DELIVERY_TIME_LIMIT_HOURS = 48;

/**
 * ডেলিভারি উইন্ডো সময় (মিনিট)
 */
export const DEFAULT_DELIVERY_WINDOW_MINUTES = 30;

/**
 * রি-অর্ডার পয়েন্ট
 */
export const DEFAULT_REORDER_POINT = 10;

/**
 * সেফটি স্টক লেভেল
 */
export const DEFAULT_SAFETY_STOCK_LEVEL = 5;

/**
 * শিপমেন্ট টাইমআউট (ঘন্টা)
 */
export const DEFAULT_SHIPMENT_TIMEOUT_HOURS = 72;

/**
 * ডেলিভারি কনফার্মেশন টাইমআউট (মিনিট)
 */
export const DEFAULT_DELIVERY_CONFIRMATION_TIMEOUT_MINUTES = 30;

/**
 * শিপিং ডেলিভারি কনফিগারেশন
 */
export const SHIPPING_DELIVERY_CONFIG = {
  DEFAULT_SHIPPING_METHOD,
  MAX_SHIPMENT_WEIGHT: MAX_SHIPMENT_WEIGHT_KG,
  MAX_DELIVERY_ATTEMPTS,
  DEFAULT_DELIVERY_TIME_LIMIT: DEFAULT_DELIVERY_TIME_LIMIT_HOURS,
  DEFAULT_DELIVERY_WINDOW: DEFAULT_DELIVERY_WINDOW_MINUTES,
  DEFAULT_REORDER_POINT,
  DEFAULT_SAFETY_STOCK: DEFAULT_SAFETY_STOCK_LEVEL,
  DEFAULT_SHIPMENT_TIMEOUT: DEFAULT_SHIPMENT_TIMEOUT_HOURS,
  DEFAULT_DELIVERY_CONFIRMATION_TIMEOUT: DEFAULT_DELIVERY_CONFIRMATION_TIMEOUT_MINUTES,
} as const;

/**
 * শিপিং ডেলিভারি কনফিগারেশন টাইপ
 */
export type ShippingDeliveryConfig = typeof SHIPPING_DELIVERY_CONFIG;

/**
 * Logistics কমন কনফিগারেশন (সম্পূর্ণ)
 */
export const LOGISTICS_COMMON = {
  ...LOGISTICS_COMMON_CONFIG,
  TRACKING: TRACKING_CONFIG,
  SHIPPING_DELIVERY: SHIPPING_DELIVERY_CONFIG,
} as const;

/**
 * Logistics কমন টাইপ
 */
export type LogisticsCommon = typeof LOGISTICS_COMMON;

/**
 * ট্র্যাকিং নম্বর জেনারেট করুন
 */
export function generateTrackingNumber(): string {
  const random = Math.random().toString().substring(2, 11);
  const padded = random.padStart(9, '0');
  return `${TRACKING_NUMBER_PREFIX}${TRACKING_NUMBER_FORMAT.SEPARATOR}${padded}`;
}

/**
 * ট্র্যাকিং নম্বর ভালিডেট করুন
 */
export function isValidTrackingNumber(number: string): boolean {
  return TRACKING_NUMBER_FORMAT.PATTERN.test(number);
}

/**
 * ওজন কেজি থেকে অন্য ইউনিটে রূপান্তর করুন
 */
export function convertWeight(value: number, fromUnit: string, toUnit: string): number {
  const conversions: Record<string, number> = {
    kg: 1,
    g: 1000,
    lb: 2.20462,
    oz: 35.274,
  };

  const fromRate = conversions[fromUnit];
  const toRate = conversions[toUnit];

  if (!fromRate || !toRate) {
    throw new Error(`Invalid weight unit: ${fromUnit} or ${toUnit}`);
  }

  return (value / fromRate) * toRate;
}

/**
 * দূরত্ব কিমি থেকে অন্য ইউনিটে রূপান্তর করুন
 */
export function convertDistance(value: number, fromUnit: string, toUnit: string): number {
  const conversions: Record<string, number> = {
    km: 1,
    m: 1000,
    mile: 0.621371,
    yard: 1093.61,
    ft: 3280.84,
  };

  const fromRate = conversions[fromUnit];
  const toRate = conversions[toUnit];

  if (!fromRate || !toRate) {
    throw new Error(`Invalid distance unit: ${fromUnit} or ${toUnit}`);
  }

  return (value / fromRate) * toRate;
}

/**
 * Logistics সিস্টেমের বর্তমান সময় পাওয়া
 */
export function getLogisticsCurrentTime(): Date {
  return new Date();
}

/**
 * Logistics সিস্টেমের সময় অঞ্চলে সময় পাওয়া
 */
export function getLogisticsTimeInTimezone(date: Date = new Date()): Date {
  // Asia/Dhaka timezone offset (UTC+6)
  const offset = 6 * 60 * 60 * 1000;
  return new Date(date.getTime() + offset);
}

/**
 * Logistics সিস্টেমের জন্য ডেট ফরম্যাট করুন
 */
export function formatLogisticsDate(date: Date): string {
  return date.toLocaleDateString('bn-BD', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: LOGISTICS_TIMEZONE,
  });
}

/**
 * Logistics সিস্টেমের জন্য সময় ফরম্যাট করুন
 */
export function formatLogisticsTime(date: Date): string {
  return date.toLocaleTimeString('bn-BD', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
    timeZone: LOGISTICS_TIMEZONE,
  });
}

/**
 * Logistics সিস্টেমের জন্য ডেটটাইম ফরম্যাট করুন
 */
export function formatLogisticsDateTime(date: Date): string {
  return `${formatLogisticsDate(date)} ${formatLogisticsTime(date)}`;
}
