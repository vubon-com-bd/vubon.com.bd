/**
 * ট্র্যাকিং ইভেন্ট সম্পর্কিত মৌলিক কনস্ট্যান্টসমূহ
 */

/**
 * ইভেন্টের সর্বোচ্চ সংখ্যা
 */
export const MAX_TRACKING_EVENTS = 100;

/**
 * ইভেন্ট লগের রিটেনশন পিরিয়ড (দিন)
 */
export const TRACKING_EVENT_RETENTION_DAYS = 30;

/**
 * ইভেন্ট সিরিয়াল নম্বরের প্রিফিক্স
 */
export const TRACKING_EVENT_SERIAL_PREFIX = 'EVT-';

/**
 * ইভেন্টের ডিফল্ট সময় অঞ্চল
 */
export const TRACKING_EVENT_DEFAULT_TIMEZONE = 'Asia/Dhaka';

/**
 * ট্র্যাকিং ইভেন্ট কনফিগারেশন
 */
export const TRACKING_EVENT_CONFIG = {
  MAX_EVENTS: MAX_TRACKING_EVENTS,
  RETENTION_DAYS: TRACKING_EVENT_RETENTION_DAYS,
  SERIAL_PREFIX: TRACKING_EVENT_SERIAL_PREFIX,
  DEFAULT_TIMEZONE: TRACKING_EVENT_DEFAULT_TIMEZONE,
} as const;

/**
 * ট্র্যাকিং ইভেন্ট কনফিগারেশন টাইপ
 */
export type TrackingEventConfig = typeof TRACKING_EVENT_CONFIG;

/**
 * ট্র্যাকিং ইভেন্ট সিরিয়াল নম্বর জেনারেট করুন
 */
export function generateTrackingEventSerial(): string {
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `${TRACKING_EVENT_SERIAL_PREFIX}${timestamp}${random}`;
}

/**
 * ট্র্যাকিং ইভেন্ট সিরিয়াল নম্বর ভালিডেট করুন
 */
export function isValidTrackingEventSerial(serial: string): boolean {
  return serial.startsWith(TRACKING_EVENT_SERIAL_PREFIX) && serial.length >= 10;
}
