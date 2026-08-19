/**
 * ট্র্যাকিং সম্পর্কিত মৌলিক কনস্ট্যান্টসমূহ
 */

/**
 * ট্র্যাকিং নম্বরের ফরম্যাট
 */
export const TRACKING_NUMBER_FORMAT = {
  PREFIX: 'TRK-',
  SEPARATOR: '-',
  DATE_FORMAT: 'YYYYMMDD',
  RANDOM_LENGTH: 8,
  PATTERN: /^TRK-\d{8}-[A-Z0-9]{8}$/,
} as const;

/**
 * ট্র্যাকিং নম্বরের দৈর্ঘ্য
 */
export const TRACKING_NUMBER_LENGTH = 20;

/**
 * ট্র্যাকিং নম্বরের প্রিফিক্স
 */
export const TRACKING_PREFIX = 'TRK-' as const;

/**
 * ট্র্যাকিং আপডেটের ইন্টারভাল (সেকেন্ড)
 */
export const TRACKING_UPDATE_INTERVAL_SECONDS = 30;

/**
 * ট্র্যাকিং ডেটা রিটেনশন পিরিয়ড (দিন)
 */
export const TRACKING_DATA_RETENTION_DAYS = 90;

/**
 * ট্র্যাকিং পেজের ডিফল্ট পেজিনেশন
 */
export const TRACKING_PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_LIMIT: 20,
  MAX_LIMIT: 100,
  SORT_BY: 'createdAt',
  SORT_ORDER: 'desc',
} as const;

/**
 * ট্র্যাকিং কনফিগারেশন
 */
export const TRACKING_CONFIG = {
  NUMBER_FORMAT: TRACKING_NUMBER_FORMAT,
  NUMBER_LENGTH: TRACKING_NUMBER_LENGTH,
  PREFIX: TRACKING_PREFIX,
  UPDATE_INTERVAL: TRACKING_UPDATE_INTERVAL_SECONDS,
  RETENTION_DAYS: TRACKING_DATA_RETENTION_DAYS,
  PAGINATION: TRACKING_PAGINATION,
} as const;

/**
 * ট্র্যাকিং কনফিগারেশন টাইপ
 */
export type TrackingConfig = typeof TRACKING_CONFIG;

/**
 * ট্র্যাকিং নম্বর জেনারেট করুন
 */
export function generateTrackingNumber(): string {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const dateStr = `${year}${month}${day}`;

  const random = Math.random().toString(36).substring(2, 10).toUpperCase();

  return `${TRACKING_PREFIX}${dateStr}${TRACKING_NUMBER_FORMAT.SEPARATOR}${random}`;
}

/**
 * ট্র্যাকিং নম্বর ভালিডেট করুন
 */
export function isValidTrackingNumber(number: string): boolean {
  return TRACKING_NUMBER_FORMAT.PATTERN.test(number);
}

/**
 * ট্র্যাকিং নম্বর থেকে তারিখ বের করুন
 */
export function extractTrackingDate(number: string): Date | null {
  const match = number.match(/TRK-(\d{8})-/);
  if (!match) return null;

  const dateStr = match[1];
  const year = parseInt(dateStr.substring(0, 4));
  const month = parseInt(dateStr.substring(4, 6)) - 1;
  const day = parseInt(dateStr.substring(6, 8));

  return new Date(year, month, day);
}
