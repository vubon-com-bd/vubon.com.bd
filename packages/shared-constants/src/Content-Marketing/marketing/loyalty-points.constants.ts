/**
 * লয়্যালটি পয়েন্ট সম্পর্কিত কনস্ট্যান্টসমূহ
 * @module Content-Marketing/marketing
 */

/**
 * পয়েন্ট অর্জনের নিয়মসমূহ
 */
export const POINTS_EARNING_RULES = ['purchase', 'review', 'referral', 'birthday'] as const;

/**
 * পয়েন্ট এক্সপায়ারি দিন
 */
export const POINTS_EXPIRY_DAYS = 365;

/**
 * ন্যূনতম পয়েন্ট রিডিম
 */
export const MIN_POINTS_REDEEM = 100;

/**
 * পয়েন্ট অর্জনের নিয়ম টাইপ
 */
export type PointsEarningRule = (typeof POINTS_EARNING_RULES)[number];

/**
 * প্রতিটি নিয়মের লেবেল (বাংলা এবং ইংরেজি)
 */
export const POINTS_EARNING_RULE_LABELS = {
  purchase: {
    en: 'Purchase',
    bn: 'ক্রয়',
  },
  review: {
    en: 'Product Review',
    bn: 'পণ্য রিভিউ',
  },
  referral: {
    en: 'Referral',
    bn: 'রেফারেল',
  },
  birthday: {
    en: 'Birthday',
    bn: 'জন্মদিন',
  },
} as const satisfies Record<PointsEarningRule, { en: string; bn: string }>;

/**
 * প্রতিটি নিয়মের পয়েন্ট মান
 */
export const POINTS_EARNING_VALUES = {
  purchase: 10,
  review: 5,
  referral: 20,
  birthday: 50,
} as const satisfies Record<PointsEarningRule, number>;

/**
 * প্রতিটি নিয়মের সর্বোচ্চ পয়েন্ট (প্রতি দিন/সপ্তাহ/মাস)
 */
export const POINTS_EARNING_MAX = {
  purchase: 1000,
  review: 50,
  referral: 100,
  birthday: 50,
} as const satisfies Record<PointsEarningRule, number>;

/**
 * ভাষা টাইপ
 */
export type Language = 'en' | 'bn';

/**
 * নির্দিষ্ট নিয়মের লেবেল পাওয়ার ফাংশন
 */
export function getPointsEarningRuleLabel(rule: PointsEarningRule, lang: Language = 'en'): string {
  return POINTS_EARNING_RULE_LABELS[rule][lang];
}

/**
 * সব পয়েন্ট অর্জনের নিয়মের তালিকা পাওয়ার ফাংশন
 */
export function getAllPointsEarningRules(): readonly PointsEarningRule[] {
  return POINTS_EARNING_RULES;
}

/**
 * পয়েন্ট অর্জনের নিয়ম বৈধ কিনা চেক করার ফাংশন
 */
export function isValidPointsEarningRule(rule: string): rule is PointsEarningRule {
  return POINTS_EARNING_RULES.includes(rule as PointsEarningRule);
}

/**
 * নির্দিষ্ট নিয়মের পয়েন্ট মান পাওয়ার ফাংশন
 */
export function getPointsEarningValue(rule: PointsEarningRule): number {
  return POINTS_EARNING_VALUES[rule];
}

/**
 * নির্দিষ্ট নিয়মের সর্বোচ্চ পয়েন্ট পাওয়ার ফাংশন
 */
export function getPointsEarningMax(rule: PointsEarningRule): number {
  return POINTS_EARNING_MAX[rule];
}

/**
 * পয়েন্ট এক্সপায়ারি তারিখ গণনা করার ফাংশন
 */
export function calculatePointsExpiryDate(): Date {
  const date = new Date();
  date.setDate(date.getDate() + POINTS_EXPIRY_DAYS);
  return date;
}

/**
 * পয়েন্ট এক্সপায়ার্ড কিনা চেক করার ফাংশন
 */
export function isPointsExpired(expiryDate: Date): boolean {
  return new Date() > expiryDate;
}

/**
 * পয়েন্ট রিডিমযোগ্য কিনা চেক করার ফাংশন
 */
export function isPointsRedeemable(points: number): boolean {
  return points >= MIN_POINTS_REDEEM;
}

/**
 * রিডিমযোগ্য পয়েন্ট গণনা করার ফাংশন
 */
export function getRedeemablePoints(points: number): number {
  if (points < MIN_POINTS_REDEEM) {
    return 0;
  }
  return Math.floor(points / MIN_POINTS_REDEEM) * MIN_POINTS_REDEEM;
}

/**
 * পয়েন্টের মান গণনা করার ফাংশন
 */
export function calculatePointsValue(points: number, redemptionRate: number = 0.01): number {
  return points * redemptionRate;
}

/**
 * পয়েন্ট থেকে ডিসকাউন্ট গণনা করার ফাংশন
 */
export function calculateDiscountFromPoints(points: number, redemptionRate: number = 0.01): number {
  return points * redemptionRate;
}

/**
 * ডিসকাউন্ট থেকে পয়েন্ট গণনা করার ফাংশন
 */
export function calculatePointsFromDiscount(
  discount: number,
  redemptionRate: number = 0.01
): number {
  return Math.ceil(discount / redemptionRate);
}

/**
 * পয়েন্ট অর্জনের নিয়মের আইকন পাওয়ার ফাংশন
 */
export function getPointsEarningRuleIcon(rule: PointsEarningRule): string {
  const icons: Record<PointsEarningRule, string> = {
    purchase: '🛒',
    review: '⭐',
    referral: '🤝',
    birthday: '🎂',
  };
  return icons[rule];
}

/**
 * পয়েন্ট অর্জনের নিয়মের বিবরণ পাওয়ার ফাংশন
 */
export function getPointsEarningRuleDescription(
  rule: PointsEarningRule,
  lang: Language = 'en'
): string {
  const descriptions: Record<PointsEarningRule, { en: string; bn: string }> = {
    purchase: {
      en: 'Earn points from purchases',
      bn: 'ক্রয় থেকে পয়েন্ট অর্জন করুন',
    },
    review: {
      en: 'Earn points from product reviews',
      bn: 'পণ্য রিভিউ থেকে পয়েন্ট অর্জন করুন',
    },
    referral: {
      en: 'Earn points from referring friends',
      bn: 'বন্ধুদের রেফারেল থেকে পয়েন্ট অর্জন করুন',
    },
    birthday: {
      en: 'Earn points on your birthday',
      bn: 'আপনার জন্মদিনে পয়েন্ট অর্জন করুন',
    },
  };
  return descriptions[rule][lang];
}
