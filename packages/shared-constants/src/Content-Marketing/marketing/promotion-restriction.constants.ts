/**
 * প্রমোশনের সীমাবদ্ধতা সম্পর্কিত কনস্ট্যান্টসমূহ
 * @module Content-Marketing/marketing
 */

/**
 * সীমাবদ্ধতার সব ধরন
 */
export const RESTRICTION_TYPES = [
  'min-purchase',
  'max-discount',
  'user-limit',
  'total-limit',
  'time-limit',
] as const;

/**
 * প্রতিটি রেস্ট্রিকশনের লেবেল (বাংলা এবং ইংরেজি)
 */
export const RESTRICTION_LABELS = {
  'min-purchase': {
    en: 'Minimum Purchase Amount',
    bn: 'সর্বনিম্ন ক্রয় পরিমাণ',
  },
  'max-discount': {
    en: 'Maximum Discount Amount',
    bn: 'সর্বোচ্চ ডিসকাউন্ট পরিমাণ',
  },
  'user-limit': {
    en: 'Per User Limit',
    bn: 'প্রতি ব্যবহারকারী সীমা',
  },
  'total-limit': {
    en: 'Total Usage Limit',
    bn: 'মোট ব্যবহার সীমা',
  },
  'time-limit': {
    en: 'Time Restriction',
    bn: 'সময় সীমাবদ্ধতা',
  },
} as const satisfies Record<(typeof RESTRICTION_TYPES)[number], { en: string; bn: string }>;

/**
 * রেস্ট্রিকশন টাইপ টাইপ
 */
export type RestrictionType = (typeof RESTRICTION_TYPES)[number];

/**
 * ভাষা টাইপ
 */
export type Language = 'en' | 'bn';

/**
 * রেস্ট্রিকশন ইন্টারফেস
 */
export interface RestrictionInterface {
  type: RestrictionType;
  value: number;
  description?: string;
}

/**
 * নির্দিষ্ট রেস্ট্রিকশনের লেবেল পাওয়ার ফাংশন
 */
export function getRestrictionLabel(type: RestrictionType, lang: Language = 'en'): string {
  return RESTRICTION_LABELS[type][lang];
}

/**
 * সব রেস্ট্রিকশন টাইপের তালিকা পাওয়ার ফাংশন
 */
export function getAllRestrictionTypes(): readonly RestrictionType[] {
  return RESTRICTION_TYPES;
}

/**
 * রেস্ট্রিকশন টাইপ বৈধ কিনা চেক করার ফাংশন
 */
export function isValidRestrictionType(type: string): type is RestrictionType {
  return RESTRICTION_TYPES.includes(type as RestrictionType);
}

/**
 * রেস্ট্রিকশন পার্চেজ বেইসড কিনা চেক করার ফাংশন
 */
export function isPurchaseBasedRestriction(type: RestrictionType): boolean {
  return ['min-purchase', 'max-discount'].includes(type);
}

/**
 * রেস্ট্রিকশন লিমিট বেইসড কিনা চেক করার ফাংশন
 */
export function isLimitBasedRestriction(type: RestrictionType): boolean {
  return ['user-limit', 'total-limit'].includes(type);
}

/**
 * রেস্ট্রিকশন টাইম বেইসড কিনা চেক করার ফাংশন
 */
export function isTimeBasedRestriction(type: RestrictionType): boolean {
  return type === 'time-limit';
}

/**
 * রেস্ট্রিকশনের ডিফল্ট মান পাওয়ার ফাংশন
 */
export function getRestrictionDefaultValue(type: RestrictionType): number {
  const defaults: Record<RestrictionType, number> = {
    'min-purchase': 0,
    'max-discount': 0,
    'user-limit': 1,
    'total-limit': 1,
    'time-limit': 24,
  };
  return defaults[type];
}

/**
 * রেস্ট্রিকশনের ন্যূনতম মান পাওয়ার ফাংশন
 */
export function getRestrictionMinValue(type: RestrictionType): number {
  const minValues: Record<RestrictionType, number> = {
    'min-purchase': 0,
    'max-discount': 0,
    'user-limit': 1,
    'total-limit': 1,
    'time-limit': 1,
  };
  return minValues[type];
}

/**
 * রেস্ট্রিকশনের সর্বোচ্চ মান পাওয়ার ফাংশন
 */
export function getRestrictionMaxValue(type: RestrictionType): number {
  const maxValues: Record<RestrictionType, number> = {
    'min-purchase': 1000000,
    'max-discount': 1000000,
    'user-limit': 1000,
    'total-limit': 10000,
    'time-limit': 8760,
  };
  return maxValues[type];
}

/**
 * রেস্ট্রিকশনের ইউনিট পাওয়ার ফাংশন
 */
export function getRestrictionUnit(type: RestrictionType): string {
  const units: Record<RestrictionType, string> = {
    'min-purchase': 'BDT',
    'max-discount': 'BDT',
    'user-limit': 'times',
    'total-limit': 'times',
    'time-limit': 'hours',
  };
  return units[type];
}

/**
 * রেস্ট্রিকশনের আইকন পাওয়ার ফাংশন
 */
export function getRestrictionIcon(type: RestrictionType): string {
  const icons: Record<RestrictionType, string> = {
    'min-purchase': '🛒',
    'max-discount': '💰',
    'user-limit': '👤',
    'total-limit': '📊',
    'time-limit': '⏰',
  };
  return icons[type];
}

/**
 * রেস্ট্রিকশনের বিবরণ পাওয়ার ফাংশন
 */
export function getRestrictionDescription(type: RestrictionType, lang: Language = 'en'): string {
  const descriptions: Record<RestrictionType, { en: string; bn: string }> = {
    'min-purchase': {
      en: 'Minimum purchase amount required to apply promotion',
      bn: 'প্রমোশন প্রয়োগের জন্য প্রয়োজনীয় সর্বনিম্ন ক্রয় পরিমাণ',
    },
    'max-discount': {
      en: 'Maximum discount amount that can be applied',
      bn: 'সর্বোচ্চ ডিসকাউন্ট পরিমাণ যা প্রয়োগ করা যাবে',
    },
    'user-limit': {
      en: 'Maximum number of times a user can use this promotion',
      bn: 'একজন ব্যবহারকারী এই প্রমোশন ব্যবহার করতে পারে সর্বোচ্চ কতবার',
    },
    'total-limit': {
      en: 'Maximum total usage limit of this promotion',
      bn: 'এই প্রমোশনের সর্বোচ্চ মোট ব্যবহার সীমা',
    },
    'time-limit': {
      en: 'Time restriction for promotion usage',
      bn: 'প্রমোশন ব্যবহারের সময় সীমাবদ্ধতা',
    },
  };
  return descriptions[type][lang];
}
