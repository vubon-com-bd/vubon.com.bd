/**
 * ডেলিভারি সম্পর্কিত মৌলিক কনস্ট্যান্টসমূহ
 */

/**
 * ডেলিভারি নম্বরের প্রিফিক্স
 */
export const DELIVERY_PREFIX = 'DEL-' as const;

/**
 * ডেলিভারি নম্বরের ফরম্যাট
 */
export const DELIVERY_NUMBER_FORMAT = {
  PREFIX: DELIVERY_PREFIX,
  SEPARATOR: '-',
  DATE_FORMAT: 'YYYYMMDD',
  RANDOM_LENGTH: 6,
} as const;

/**
 * ডেলিভারির সর্বোচ্চ সময় সীমা (ঘন্টায়)
 */
export const MAX_DELIVERY_TIME_HOURS = 72;

/**
 * ডেলিভারি রি-অ্যাটেম্পটের সর্বোচ্চ সংখ্যা
 */
export const MAX_DELIVERY_ATTEMPTS = 3;

/**
 * ডেলিভারি কনফার্মেশনের টাইমআউট (মিনিটে)
 */
export const DELIVERY_CONFIRMATION_TIMEOUT_MINUTES = 30;

/**
 * ডেলিভারি এলাকা সম্পর্কিত কনস্ট্যান্ট
 */
export const DELIVERY_AREAS = {
  DHAKA: 'dhaka',
  CHITTAGONG: 'chittagong',
  SYLHET: 'sylhet',
  KHULNA: 'khulna',
  RAJSHAHI: 'rajshahi',
  BARISHAL: 'barishal',
  RANGPUR: 'rangpur',
  MYMENSINGH: 'mymensingh',
} as const;

/**
 * ডেলিভারি এলাকা টাইপ
 */
export type DeliveryArea = (typeof DELIVERY_AREAS)[keyof typeof DELIVERY_AREAS];

/**
 * ডেলিভারি এলাকার বিবরণ
 */
export const DELIVERY_AREA_DESCRIPTIONS: Record<DeliveryArea, string> = {
  [DELIVERY_AREAS.DHAKA]: 'ঢাকা - রাজধানী শহর',
  [DELIVERY_AREAS.CHITTAGONG]: 'চট্টগ্রাম - বন্দর নগরী',
  [DELIVERY_AREAS.SYLHET]: 'সিলেট - পাহাড়ি শহর',
  [DELIVERY_AREAS.KHULNA]: 'খুলনা - শিল্প নগরী',
  [DELIVERY_AREAS.RAJSHAHI]: 'রাজশাহী - শিক্ষা নগরী',
  [DELIVERY_AREAS.BARISHAL]: 'বরিশাল - নদী নগরী',
  [DELIVERY_AREAS.RANGPUR]: 'রংপুর - কৃষি নগরী',
  [DELIVERY_AREAS.MYMENSINGH]: 'ময়মনসিংহ - ঐতিহাসিক শহর',
};

/**
 * ডেলিভারি এলাকার ডেলিভারি সময় (ঘন্টায়)
 */
export const DELIVERY_AREA_TIME: Record<DeliveryArea, number> = {
  [DELIVERY_AREAS.DHAKA]: 24,
  [DELIVERY_AREAS.CHITTAGONG]: 36,
  [DELIVERY_AREAS.SYLHET]: 48,
  [DELIVERY_AREAS.KHULNA]: 48,
  [DELIVERY_AREAS.RAJSHAHI]: 48,
  [DELIVERY_AREAS.BARISHAL]: 60,
  [DELIVERY_AREAS.RANGPUR]: 60,
  [DELIVERY_AREAS.MYMENSINGH]: 48,
};

/**
 * ডেলিভারি এলাকার অতিরিক্ত চার্জ
 */
export const DELIVERY_AREA_EXTRA_CHARGE: Record<DeliveryArea, number> = {
  [DELIVERY_AREAS.DHAKA]: 0,
  [DELIVERY_AREAS.CHITTAGONG]: 20,
  [DELIVERY_AREAS.SYLHET]: 30,
  [DELIVERY_AREAS.KHULNA]: 30,
  [DELIVERY_AREAS.RAJSHAHI]: 30,
  [DELIVERY_AREAS.BARISHAL]: 40,
  [DELIVERY_AREAS.RANGPUR]: 40,
  [DELIVERY_AREAS.MYMENSINGH]: 30,
};

/**
 * ডেলিভারি স্ট্যাটাস
 */
export const DELIVERY_STATUS = {
  SCHEDULED: 'scheduled',
  IN_PROGRESS: 'in_progress',
  OUT_FOR_DELIVERY: 'out_for_delivery',
  DELIVERED: 'delivered',
  FAILED: 'failed',
  RETURNED: 'returned',
  CANCELLED: 'cancelled',
  RESCHEDULED: 'rescheduled',
} as const;

/**
 * ডেলিভারি স্ট্যাটাস টাইপ
 */
export type DeliveryStatus = (typeof DELIVERY_STATUS)[keyof typeof DELIVERY_STATUS];

/**
 * ডেলিভারি স্ট্যাটাসের বিবরণ
 */
export const DELIVERY_STATUS_DESCRIPTIONS: Record<DeliveryStatus, string> = {
  [DELIVERY_STATUS.SCHEDULED]: 'শিডিউল করা হয়েছে',
  [DELIVERY_STATUS.IN_PROGRESS]: 'ডেলিভারি প্রক্রিয়াধীন',
  [DELIVERY_STATUS.OUT_FOR_DELIVERY]: 'ডেলিভারির জন্য বেরিয়েছে',
  [DELIVERY_STATUS.DELIVERED]: 'ডেলিভারি সম্পন্ন হয়েছে',
  [DELIVERY_STATUS.FAILED]: 'ডেলিভারি ব্যর্থ হয়েছে',
  [DELIVERY_STATUS.RETURNED]: 'ফেরত পাঠানো হয়েছে',
  [DELIVERY_STATUS.CANCELLED]: 'বাতিল করা হয়েছে',
  [DELIVERY_STATUS.RESCHEDULED]: 'পুনঃশিডিউল করা হয়েছে',
};

/**
 * ডেলিভারি উইন্ডো
 */
export const DELIVERY_WINDOWS = {
  MORNING: 'morning',
  AFTERNOON: 'afternoon',
  EVENING: 'evening',
  NIGHT: 'night',
} as const;

/**
 * ডেলিভারি উইন্ডো টাইপ
 */
export type DeliveryWindow = (typeof DELIVERY_WINDOWS)[keyof typeof DELIVERY_WINDOWS];

/**
 * ডেলিভারি উইন্ডোর সময়
 */
export const DELIVERY_WINDOW_TIMES: Record<DeliveryWindow, { start: string; end: string }> = {
  [DELIVERY_WINDOWS.MORNING]: { start: '06:00', end: '12:00' },
  [DELIVERY_WINDOWS.AFTERNOON]: { start: '12:00', end: '17:00' },
  [DELIVERY_WINDOWS.EVENING]: { start: '17:00', end: '21:00' },
  [DELIVERY_WINDOWS.NIGHT]: { start: '21:00', end: '23:59' },
};

/**
 * ডেলিভারি মোড
 */
export const DELIVERY_MODES = {
  STANDARD: 'standard',
  EXPRESS: 'express',
  SAME_DAY: 'same_day',
  SCHEDULED: 'scheduled',
} as const;

/**
 * ডেলিভারি মোড টাইপ
 */
export type DeliveryMode = (typeof DELIVERY_MODES)[keyof typeof DELIVERY_MODES];

/**
 * টার্মিনাল ডেলিভারি স্ট্যাটাসসমূহ
 */
export const TERMINAL_DELIVERY_STATUSES: readonly DeliveryStatus[] = [
  DELIVERY_STATUS.DELIVERED,
  DELIVERY_STATUS.FAILED,
  DELIVERY_STATUS.RETURNED,
  DELIVERY_STATUS.CANCELLED,
] as const;

/**
 * সফল ডেলিভারি স্ট্যাটাসসমূহ
 */
export const SUCCESS_DELIVERY_STATUSES: readonly DeliveryStatus[] = [
  DELIVERY_STATUS.DELIVERED,
] as const;

/**
 * ব্যর্থ ডেলিভারি স্ট্যাটাসসমূহ
 */
export const FAILED_DELIVERY_STATUSES: readonly DeliveryStatus[] = [
  DELIVERY_STATUS.FAILED,
  DELIVERY_STATUS.RETURNED,
  DELIVERY_STATUS.CANCELLED,
] as const;

/**
 * ডেলিভারি কনফিগারেশন
 */
export const DELIVERY_CONFIG = {
  PREFIX: DELIVERY_PREFIX,
  NUMBER_FORMAT: DELIVERY_NUMBER_FORMAT,
  MAX_TIME_HOURS: MAX_DELIVERY_TIME_HOURS,
  MAX_ATTEMPTS: MAX_DELIVERY_ATTEMPTS,
  CONFIRMATION_TIMEOUT_MINUTES: DELIVERY_CONFIRMATION_TIMEOUT_MINUTES,
  AREAS: DELIVERY_AREAS,
  AREA_DESCRIPTIONS: DELIVERY_AREA_DESCRIPTIONS,
  AREA_TIME: DELIVERY_AREA_TIME,
  AREA_EXTRA_CHARGE: DELIVERY_AREA_EXTRA_CHARGE,
  STATUS: DELIVERY_STATUS,
  STATUS_DESCRIPTIONS: DELIVERY_STATUS_DESCRIPTIONS,
  WINDOWS: DELIVERY_WINDOWS,
  WINDOW_TIMES: DELIVERY_WINDOW_TIMES,
  MODES: DELIVERY_MODES,
  TERMINAL_STATUSES: TERMINAL_DELIVERY_STATUSES,
  SUCCESS_STATUSES: SUCCESS_DELIVERY_STATUSES,
  FAILED_STATUSES: FAILED_DELIVERY_STATUSES,
} as const;

/**
 * ডেলিভারি কনফিগারেশন টাইপ
 */
export type DeliveryConfig = typeof DELIVERY_CONFIG;

/**
 * ডেলিভারি এলাকার ডেলিভারি সময় পাওয়া
 */
export function getDeliveryAreaTime(area: DeliveryArea): number {
  return DELIVERY_AREA_TIME[area];
}

/**
 * ডেলিভারি এলাকার অতিরিক্ত চার্জ পাওয়া
 */
export function getDeliveryAreaExtraCharge(area: DeliveryArea): number {
  return DELIVERY_AREA_EXTRA_CHARGE[area];
}

/**
 * ডেলিভারি এলাকার বিবরণ পাওয়া
 */
export function getDeliveryAreaDescription(area: DeliveryArea): string {
  return DELIVERY_AREA_DESCRIPTIONS[area];
}

/**
 * চেক করে যে এলাকাটি সমর্থিত কিনা
 */
export function isSupportedDeliveryArea(area: string): area is DeliveryArea {
  return Object.values(DELIVERY_AREAS).includes(area as DeliveryArea);
}

/**
 * ডেলিভারি স্ট্যাটাস টার্মিনাল কিনা
 */
export function isDeliveryStatusTerminal(status: DeliveryStatus): boolean {
  return (TERMINAL_DELIVERY_STATUSES as readonly DeliveryStatus[]).includes(status);
}

/**
 * ডেলিভারি স্ট্যাটাস সফল কিনা
 */
export function isDeliveryStatusSuccess(status: DeliveryStatus): boolean {
  return (SUCCESS_DELIVERY_STATUSES as readonly DeliveryStatus[]).includes(status);
}

/**
 * ডেলিভারি স্ট্যাটাস ব্যর্থ কিনা
 */
export function isDeliveryStatusFailed(status: DeliveryStatus): boolean {
  return (FAILED_DELIVERY_STATUSES as readonly DeliveryStatus[]).includes(status);
}
