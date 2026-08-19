/**
 * ডিসপ্যাচ সম্পর্কিত মৌলিক কনস্ট্যান্টসমূহ
 */

/**
 * ডিসপ্যাচ নম্বরের প্রিফিক্স
 */
export const DISPATCH_PREFIX = 'DSP-' as const;

/**
 * ডিসপ্যাচ নম্বরের ফরম্যাট
 */
export const DISPATCH_NUMBER_FORMAT = {
  PREFIX: DISPATCH_PREFIX,
  SEPARATOR: '-',
  DATE_FORMAT: 'YYYYMMDD',
  RANDOM_LENGTH: 6,
} as const;

/**
 * ডিসপ্যাচের সর্বোচ্চ আইটেম সংখ্যা
 */
export const MAX_DISPATCH_ITEMS = 200;

/**
 * ডিসপ্যাচের সময়সীমা (ঘন্টায়)
 */
export const DISPATCH_TIME_LIMIT_HOURS = 48;

/**
 * ডিসপ্যাচ রি-অ্যাটেম্পটের সর্বোচ্চ সংখ্যা
 */
export const MAX_DISPATCH_ATTEMPTS = 3;

/**
 * ডিসপ্যাচ রুট অপটিমাইজেশন সম্পর্কিত কনস্ট্যান্ট
 */
export const DISPATCH_ROUTE_OPTIMIZATION = {
  ENABLED: true,
  MAX_STOPS: 20,
  MAX_DISTANCE_KM: 100,
  MAX_DURATION_HOURS: 8,
  ALGORITHM: 'nearest_neighbor',
  REOPTIMIZE_INTERVAL_MINUTES: 30,
} as const;

/**
 * ডিসপ্যাচ রুট অপটিমাইজেশন টাইপ
 */
export type DispatchRouteOptimization = typeof DISPATCH_ROUTE_OPTIMIZATION;

/**
 * ডিসপ্যাচ কনফিগারেশন
 */
export const DISPATCH_CONFIG = {
  PREFIX: DISPATCH_PREFIX,
  NUMBER_FORMAT: DISPATCH_NUMBER_FORMAT,
  MAX_ITEMS: MAX_DISPATCH_ITEMS,
  TIME_LIMIT_HOURS: DISPATCH_TIME_LIMIT_HOURS,
  MAX_ATTEMPTS: MAX_DISPATCH_ATTEMPTS,
  ROUTE_OPTIMIZATION: DISPATCH_ROUTE_OPTIMIZATION,
} as const;

/**
 * ডিসপ্যাচ কনফিগারেশন টাইপ
 */
export type DispatchConfig = typeof DISPATCH_CONFIG;

/**
 * ডিসপ্যাচ নম্বর জেনারেট করুন
 */
export function generateDispatchNumber(): string {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const dateStr = `${year}${month}${day}`;
  const random = Math.random().toString(36).substring(2, 8).toUpperCase();
  return `${DISPATCH_PREFIX}${dateStr}${DISPATCH_NUMBER_FORMAT.SEPARATOR}${random}`;
}

/**
 * ডিসপ্যাচ নম্বর ভালিডেট করুন
 */
export function isValidDispatchNumber(number: string): boolean {
  return number.startsWith(DISPATCH_PREFIX) && number.length >= 15;
}

/**
 * ডিসপ্যাচ রুট অপটিমাইজেশন সেটিংস আপডেট করুন
 */
export function updateDispatchRouteOptimization(
  settings: Partial<DispatchRouteOptimization>
): DispatchRouteOptimization {
  return {
    ...DISPATCH_ROUTE_OPTIMIZATION,
    ...settings,
  };
}
