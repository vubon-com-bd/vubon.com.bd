/**
 * ডিসকাউন্টের ধরন সম্পর্কিত কনস্ট্যান্টসমূহ
 * @module Content-Marketing/marketing
 */

/**
 * ডিসকাউন্টের সব ধরন
 */
export const DISCOUNT_TYPES = ['percentage', 'fixed-amount', 'free'] as const;

/**
 * প্রতিটি ডিসকাউন্ট টাইপের লেবেল (বাংলা এবং ইংরেজি)
 */
export const DISCOUNT_TYPE_LABELS = {
  percentage: {
    en: 'Percentage Discount',
    bn: 'শতাংশ ডিসকাউন্ট',
  },
  'fixed-amount': {
    en: 'Fixed Amount Discount',
    bn: 'নির্দিষ্ট পরিমাণ ডিসকাউন্ট',
  },
  free: {
    en: 'Free Item',
    bn: 'ফ্রি আইটেম',
  },
} as const satisfies Record<(typeof DISCOUNT_TYPES)[number], { en: string; bn: string }>;

/**
 * ডিসকাউন্ট টাইপ টাইপ
 */
export type DiscountType = (typeof DISCOUNT_TYPES)[number];

/**
 * ভাষা টাইপ
 */
export type Language = 'en' | 'bn';

/**
 * নির্দিষ্ট ডিসকাউন্ট টাইপের লেবেল পাওয়ার ফাংশন
 */
export function getDiscountTypeLabel(type: DiscountType, lang: Language = 'en'): string {
  return DISCOUNT_TYPE_LABELS[type][lang];
}

/**
 * সব ডিসকাউন্ট টাইপের তালিকা পাওয়ার ফাংশন
 */
export function getAllDiscountTypes(): readonly DiscountType[] {
  return DISCOUNT_TYPES;
}

/**
 * ডিসকাউন্ট টাইপ বৈধ কিনা চেক করার ফাংশন
 */
export function isValidDiscountType(type: string): type is DiscountType {
  return DISCOUNT_TYPES.includes(type as DiscountType);
}

/**
 * টাইপ পার্সেন্টেজ ডিসকাউন্ট কিনা চেক করার ফাংশন
 */
export function isPercentageDiscountType(type: DiscountType): boolean {
  return type === 'percentage';
}

/**
 * টাইপ ফিক্সড অ্যামাউন্ট ডিসকাউন্ট কিনা চেক করার ফাংশন
 */
export function isFixedAmountDiscountType(type: DiscountType): boolean {
  return type === 'fixed-amount';
}

/**
 * টাইপ ফ্রি আইটেম কিনা চেক করার ফাংশন
 */
export function isFreeDiscountType(type: DiscountType): boolean {
  return type === 'free';
}

/**
 * টাইপ মানি বেইসড ডিসকাউন্ট কিনা চেক করার ফাংশন
 */
export function isMoneyBasedDiscount(type: DiscountType): boolean {
  return ['percentage', 'fixed-amount'].includes(type);
}

/**
 * ডিসকাউন্ট টাইপের জন্য সর্বোচ্চ মান পাওয়ার ফাংশন
 */
export function getDiscountTypeMaxValue(type: DiscountType): number {
  const maxValues: Record<DiscountType, number> = {
    percentage: 100,
    'fixed-amount': 1000000,
    free: 1,
  };
  return maxValues[type];
}

/**
 * ডিসকাউন্ট টাইপের জন্য ন্যূনতম মান পাওয়ার ফাংশন
 */
export function getDiscountTypeMinValue(type: DiscountType): number {
  const minValues: Record<DiscountType, number> = {
    percentage: 0,
    'fixed-amount': 0,
    free: 0,
  };
  return minValues[type];
}

/**
 * ডিসকাউন্ট টাইপের আইকন পাওয়ার ফাংশন
 */
export function getDiscountTypeIcon(type: DiscountType): string {
  const icons: Record<DiscountType, string> = {
    percentage: '%',
    'fixed-amount': '💰',
    free: '🎁',
  };
  return icons[type];
}

/**
 * ডিফল্ট ডিসকাউন্ট টাইপ পাওয়ার ফাংশন
 */
export function getDefaultDiscountType(): DiscountType {
  return 'percentage';
}
