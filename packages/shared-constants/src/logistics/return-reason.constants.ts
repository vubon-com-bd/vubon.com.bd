/**
 * রিটার্নের কারণ সম্পর্কিত মৌলিক কনস্ট্যান্টসমূহ
 */

/**
 * রিটার্ন কারণের সর্বোচ্চ সংখ্যা
 */
export const MAX_RETURN_REASONS = 20;

/**
 * রিটার্ন কারণের ক্যাটাগরি সম্পর্কিত কনস্ট্যান্ট
 */
export const RETURN_REASON_CATEGORIES = {
  PRODUCT: 'product',
  DELIVERY: 'delivery',
  CUSTOMER: 'customer',
  LOGISTICS: 'logistics',
  OTHER: 'other',
} as const;

/**
 * রিটার্ন কারণের ক্যাটাগরি টাইপ
 */
export type ReturnReasonCategory =
  (typeof RETURN_REASON_CATEGORIES)[keyof typeof RETURN_REASON_CATEGORIES];

/**
 * ডিফল্ট রিটার্ন কারণ
 */
export const DEFAULT_RETURN_REASON = {
  ID: 'default',
  NAME: 'অন্যান্য কারণ',
  CATEGORY: RETURN_REASON_CATEGORIES.OTHER,
  PRIORITY: 5,
} as const;

/**
 * রিটার্ন কারণের প্রায়োরিটি
 */
export const RETURN_REASON_PRIORITIES = {
  LOW: 1,
  MEDIUM: 2,
  HIGH: 3,
  URGENT: 4,
  CRITICAL: 5,
} as const;

/**
 * রিটার্ন কারণের প্রায়োরিটি টাইপ
 */
export type ReturnReasonPriority =
  (typeof RETURN_REASON_PRIORITIES)[keyof typeof RETURN_REASON_PRIORITIES];

/**
 * রিটার্ন কারণ কনফিগারেশন
 */
export const RETURN_REASON_CONFIG = {
  MAX_REASONS: MAX_RETURN_REASONS,
  CATEGORIES: RETURN_REASON_CATEGORIES,
  DEFAULT: DEFAULT_RETURN_REASON,
  PRIORITIES: RETURN_REASON_PRIORITIES,
} as const;

/**
 * রিটার্ন কারণ কনফিগারেশন টাইপ
 */
export type ReturnReasonConfig = typeof RETURN_REASON_CONFIG;

/**
 * রিটার্ন কারণের প্রায়োরিটি ভালিডেট করুন
 */
export function isValidReturnReasonPriority(priority: number): boolean {
  return priority >= RETURN_REASON_PRIORITIES.LOW && priority <= RETURN_REASON_PRIORITIES.CRITICAL;
}

/**
 * রিটার্ন কারণের ক্যাটাগরি ভালিডেট করুন
 */
export function isValidReturnReasonCategory(category: string): category is ReturnReasonCategory {
  return Object.values(RETURN_REASON_CATEGORIES).includes(category as ReturnReasonCategory);
}

/**
 * রিটার্ন কারণের প্রায়োরিটি লেবেল পাওয়া
 */
export function getReturnReasonPriorityLabel(priority: number): string {
  const labels: Record<number, string> = {
    [RETURN_REASON_PRIORITIES.LOW]: 'নিম্ন',
    [RETURN_REASON_PRIORITIES.MEDIUM]: 'মাঝারি',
    [RETURN_REASON_PRIORITIES.HIGH]: 'উচ্চ',
    [RETURN_REASON_PRIORITIES.URGENT]: 'জরুরি',
    [RETURN_REASON_PRIORITIES.CRITICAL]: 'অত্যন্ত জরুরি',
  };
  return labels[priority] || 'অজানা';
}

/**
 * রিটার্ন কারণের ক্যাটাগরি লেবেল পাওয়া
 */
export function getReturnReasonCategoryLabel(category: ReturnReasonCategory): string {
  const labels: Record<ReturnReasonCategory, string> = {
    [RETURN_REASON_CATEGORIES.PRODUCT]: 'পণ্য',
    [RETURN_REASON_CATEGORIES.DELIVERY]: 'ডেলিভারি',
    [RETURN_REASON_CATEGORIES.CUSTOMER]: 'গ্রাহক',
    [RETURN_REASON_CATEGORIES.LOGISTICS]: 'লজিস্টিকস',
    [RETURN_REASON_CATEGORIES.OTHER]: 'অন্যান্য',
  };
  return labels[category];
}
