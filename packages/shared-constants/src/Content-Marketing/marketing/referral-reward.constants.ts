/**
 * রেফারেল রিওয়ার্ড সম্পর্কিত কনস্ট্যান্টসমূহ
 * @module Content-Marketing/marketing
 */

/**
 * রিওয়ার্ডের সব ধরন
 */
export const REWARD_TYPES = ['discount', 'points', 'cash', 'gift'] as const;

/**
 * প্রতিটি রিওয়ার্ড টাইপের লেবেল (বাংলা এবং ইংরেজি)
 */
export const REWARD_TYPE_LABELS = {
  discount: {
    en: 'Discount',
    bn: 'ডিসকাউন্ট',
  },
  points: {
    en: 'Points',
    bn: 'পয়েন্ট',
  },
  cash: {
    en: 'Cash',
    bn: 'নগদ',
  },
  gift: {
    en: 'Gift',
    bn: 'উপহার',
  },
} as const satisfies Record<(typeof REWARD_TYPES)[number], { en: string; bn: string }>;

/**
 * রিওয়ার্ড টাইপ টাইপ
 */
export type RewardType = (typeof REWARD_TYPES)[number];

/**
 * ভাষা টাইপ
 */
export type Language = 'en' | 'bn';

/**
 * নির্দিষ্ট রিওয়ার্ড টাইপের লেবেল পাওয়ার ফাংশন
 */
export function getRewardTypeLabel(type: RewardType, lang: Language = 'en'): string {
  return REWARD_TYPE_LABELS[type][lang];
}

/**
 * সব রিওয়ার্ড টাইপের তালিকা পাওয়ার ফাংশন
 */
export function getAllRewardTypes(): readonly RewardType[] {
  return REWARD_TYPES;
}

/**
 * রিওয়ার্ড টাইপ বৈধ কিনা চেক করার ফাংশন
 */
export function isValidRewardType(type: string): type is RewardType {
  return REWARD_TYPES.includes(type as RewardType);
}

/**
 * টাইপ ডিসকাউন্ট কিনা চেক করার ফাংশন
 */
export function isDiscountRewardType(type: RewardType): boolean {
  return type === 'discount';
}

/**
 * টাইপ পয়েন্টস কিনা চেক করার ফাংশন
 */
export function isPointsRewardType(type: RewardType): boolean {
  return type === 'points';
}

/**
 * টাইপ ক্যাশ কিনা চেক করার ফাংশন
 */
export function isCashRewardType(type: RewardType): boolean {
  return type === 'cash';
}

/**
 * টাইপ গিফট কিনা চেক করার ফাংশন
 */
export function isGiftRewardType(type: RewardType): boolean {
  return type === 'gift';
}

/**
 * টাইপ মানি বেইসড (ক্যাশ বা ডিসকাউন্ট) কিনা চেক করার ফাংশন
 */
export function isMoneyBasedRewardType(type: RewardType): boolean {
  return type === 'cash' || type === 'discount';
}

/**
 * টাইপ নন-মানি বেইসড (পয়েন্টস বা গিফট) কিনা চেক করার ফাংশন
 */
export function isNonMoneyBasedRewardType(type: RewardType): boolean {
  return type === 'points' || type === 'gift';
}

/**
 * ডিফল্ট রিওয়ার্ড টাইপ পাওয়ার ফাংশন
 */
export function getDefaultRewardType(): RewardType {
  return 'discount';
}

/**
 * রিওয়ার্ড টাইপের আইকন পাওয়ার ফাংশন
 */
export function getRewardTypeIcon(type: RewardType): string {
  const icons: Record<RewardType, string> = {
    discount: '🏷️',
    points: '⭐',
    cash: '💰',
    gift: '🎁',
  };
  return icons[type];
}

/**
 * রিওয়ার্ড টাইপের রঙ পাওয়ার ফাংশন
 */
export function getRewardTypeColor(type: RewardType): string {
  const colors: Record<RewardType, string> = {
    discount: '#3B82F6',
    points: '#F59E0B',
    cash: '#10B981',
    gift: '#EC4899',
  };
  return colors[type];
}

/**
 * রিওয়ার্ড টাইপের বিবরণ পাওয়ার ফাংশন
 */
export function getRewardTypeDescription(type: RewardType, lang: Language = 'en'): string {
  const descriptions: Record<RewardType, { en: string; bn: string }> = {
    discount: {
      en: 'Percentage or fixed amount discount',
      bn: 'শতাংশ বা নির্দিষ্ট পরিমাণ ডিসকাউন্ট',
    },
    points: {
      en: 'Loyalty points that can be redeemed',
      bn: 'লয়ালটি পয়েন্ট যা রিডিম করা যায়',
    },
    cash: {
      en: 'Cash reward',
      bn: 'নগদ রিওয়ার্ড',
    },
    gift: {
      en: 'Free gift item',
      bn: 'ফ্রি গিফট আইটেম',
    },
  };
  return descriptions[type][lang];
}

/**
 * রিওয়ার্ড টাইপের ডিফল্ট মান পাওয়ার ফাংশন
 */
export function getRewardTypeDefaultValue(type: RewardType): number {
  const defaults: Record<RewardType, number> = {
    discount: 10,
    points: 100,
    cash: 50,
    gift: 0,
  };
  return defaults[type];
}

/**
 * রিওয়ার্ড টাইপের সর্বোচ্চ মান পাওয়ার ফাংশন
 */
export function getRewardTypeMaxValue(type: RewardType): number {
  const maxValues: Record<RewardType, number> = {
    discount: 100,
    points: 10000,
    cash: 1000,
    gift: 0,
  };
  return maxValues[type];
}

/**
 * রিওয়ার্ড টাইপের ন্যূনতম মান পাওয়ার ফাংশন
 */
export function getRewardTypeMinValue(type: RewardType): number {
  const minValues: Record<RewardType, number> = {
    discount: 0,
    points: 0,
    cash: 0,
    gift: 0,
  };
  return minValues[type];
}
