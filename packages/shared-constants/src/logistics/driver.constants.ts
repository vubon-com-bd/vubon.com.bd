/**
 * ড্রাইভার সম্পর্কিত মৌলিক কনস্ট্যান্টসমূহ
 */

/**
 * ড্রাইভার আইডির প্রিফিক্স
 */
export const DRIVER_PREFIX = 'DRV-' as const;

/**
 * ড্রাইভার আইডির ফরম্যাট
 */
export const DRIVER_ID_FORMAT = {
  PREFIX: DRIVER_PREFIX,
  SEPARATOR: '-',
  RANDOM_LENGTH: 6,
} as const;

/**
 * ড্রাইভারের সর্বোচ্চ কাজের সময় (ঘন্টা/দিন)
 */
export const MAX_DRIVER_WORKING_HOURS_PER_DAY = 8;

/**
 * ড্রাইভারের বিরতির সময়সীমা (মিনিট)
 */
export const DRIVER_BREAK_DURATION_MINUTES = 30;

/**
 * ড্রাইভারের বিরতির ব্যবধান (ঘন্টা)
 */
export const DRIVER_BREAK_INTERVAL_HOURS = 4;

/**
 * ড্রাইভারের লাইসেন্সের মেয়াদ (বছর)
 */
export const DRIVER_LICENSE_VALIDITY_YEARS = 5;

/**
 * ড্রাইভারের রেটিং থ্রেশহোল্ড
 */
export const DRIVER_RATING_THRESHOLDS = {
  EXCELLENT: 4.5,
  GOOD: 3.5,
  AVERAGE: 2.5,
  POOR: 1.5,
  MINIMUM_ACCEPTABLE: 2.0,
} as const;

/**
 * ড্রাইভারের রেটিং থ্রেশহোল্ড টাইপ
 */
export type DriverRatingThresholds = typeof DRIVER_RATING_THRESHOLDS;

/**
 * ড্রাইভারের সর্বোচ্চ ডেলিভারি সংখ্যা (প্রতি শিফট)
 */
export const MAX_DRIVER_DELIVERIES_PER_SHIFT = 20;

/**
 * ড্রাইভারের সর্বোচ্চ দূরত্ব (কিমি/দিন)
 */
export const MAX_DRIVER_DISTANCE_PER_DAY_KM = 200;

/**
 * ড্রাইভারের প্রশিক্ষণ প্রয়োজনীয়তা
 */
export const DRIVER_TRAINING_REQUIREMENTS = {
  INITIAL_TRAINING_HOURS: 40,
  REFRESHER_TRAINING_HOURS: 8,
  CERTIFICATION_VALIDITY_DAYS: 365,
  MINIMUM_ATTENDANCE_PERCENT: 80,
} as const;

/**
 * ড্রাইভার কনফিগারেশন
 */
export const DRIVER_CONFIG = {
  PREFIX: DRIVER_PREFIX,
  ID_FORMAT: DRIVER_ID_FORMAT,
  MAX_WORKING_HOURS: MAX_DRIVER_WORKING_HOURS_PER_DAY,
  BREAK_DURATION: DRIVER_BREAK_DURATION_MINUTES,
  BREAK_INTERVAL: DRIVER_BREAK_INTERVAL_HOURS,
  LICENSE_VALIDITY: DRIVER_LICENSE_VALIDITY_YEARS,
  RATING_THRESHOLDS: DRIVER_RATING_THRESHOLDS,
  MAX_DELIVERIES: MAX_DRIVER_DELIVERIES_PER_SHIFT,
  MAX_DISTANCE: MAX_DRIVER_DISTANCE_PER_DAY_KM,
  TRAINING: DRIVER_TRAINING_REQUIREMENTS,
} as const;

/**
 * ড্রাইভার কনফিগারেশন টাইপ
 */
export type DriverConfig = typeof DRIVER_CONFIG;

/**
 * ড্রাইভার আইডি জেনারেট করুন
 */
export function generateDriverId(): string {
  const random = Math.random().toString(36).substring(2, 8).toUpperCase();
  return `${DRIVER_PREFIX}${random}`;
}

/**
 * ড্রাইভার আইডি ভালিডেট করুন
 */
export function isValidDriverId(id: string): boolean {
  return id.startsWith(DRIVER_PREFIX) && id.length >= 9;
}

/**
 * ড্রাইভারের রেটিং লেভেল নির্ণয় করুন
 */
export function getDriverRatingLevel(rating: number): string {
  const thresholds = DRIVER_RATING_THRESHOLDS;
  if (rating >= thresholds.EXCELLENT) return 'Excellent';
  if (rating >= thresholds.GOOD) return 'Good';
  if (rating >= thresholds.AVERAGE) return 'Average';
  if (rating >= thresholds.POOR) return 'Poor';
  return 'Very Poor';
}

/**
 * ড্রাইভারের রেটিং গ্রহণযোগ্য কিনা
 */
export function isDriverRatingAcceptable(rating: number): boolean {
  return rating >= DRIVER_RATING_THRESHOLDS.MINIMUM_ACCEPTABLE;
}

/**
 * ড্রাইভারের লাইসেন্সের মেয়াদ শেষ হওয়ার তারিখ গণনা করুন
 */
export function calculateLicenseExpiryDate(issueDate: Date): Date {
  const expiryDate = new Date(issueDate);
  expiryDate.setFullYear(expiryDate.getFullYear() + DRIVER_LICENSE_VALIDITY_YEARS);
  return expiryDate;
}

/**
 * ড্রাইভারের লাইসেন্স মেয়াদোত্তীর্ণ কিনা
 */
export function isDriverLicenseExpired(issueDate: Date): boolean {
  const expiryDate = calculateLicenseExpiryDate(issueDate);
  return new Date() > expiryDate;
}

/**
 * ড্রাইভারের বিরতির সময় হয়েছে কিনা
 */
export function isDriverBreakTimeDue(lastBreakTime: Date, currentTime: Date): boolean {
  const hoursSinceBreak = (currentTime.getTime() - lastBreakTime.getTime()) / (1000 * 60 * 60);
  return hoursSinceBreak >= DRIVER_BREAK_INTERVAL_HOURS;
}

/**
 * ড্রাইভারের কাজের সময়সীমা পেরিয়েছে কিনা
 */
export function isDriverShiftExceeded(shiftStartTime: Date, currentTime: Date): boolean {
  const hoursWorked = (currentTime.getTime() - shiftStartTime.getTime()) / (1000 * 60 * 60);
  return hoursWorked >= MAX_DRIVER_WORKING_HOURS_PER_DAY;
}
