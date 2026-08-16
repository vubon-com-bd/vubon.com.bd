/**
 * লয়্যালটির ধরন সম্পর্কিত কনস্ট্যান্টসমূহ
 * @module Content-Marketing/marketing
 */

/**
 * লয়্যালটির সব ধরন
 */
export const LOYALTY_TYPES = ['points-based', 'tier-based', 'hybrid'] as const;

/**
 * প্রতিটি টাইপের লেবেল (বাংলা এবং ইংরেজি)
 */
export const LOYALTY_TYPE_LABELS = {
  'points-based': {
    en: 'Points Based',
    bn: 'পয়েন্ট ভিত্তিক',
  },
  'tier-based': {
    en: 'Tier Based',
    bn: 'টিয়ার ভিত্তিক',
  },
  hybrid: {
    en: 'Hybrid',
    bn: 'হাইব্রিড',
  },
} as const satisfies Record<(typeof LOYALTY_TYPES)[number], { en: string; bn: string }>;

/**
 * লয়্যালটি টাইপ টাইপ
 */
export type LoyaltyType = (typeof LOYALTY_TYPES)[number];

/**
 * ভাষা টাইপ
 */
export type Language = 'en' | 'bn';

/**
 * নির্দিষ্ট টাইপের লেবেল পাওয়ার ফাংশন
 */
export function getLoyaltyTypeLabel(type: LoyaltyType, lang: Language = 'en'): string {
  return LOYALTY_TYPE_LABELS[type][lang];
}

/**
 * সব লয়্যালটি টাইপের তালিকা পাওয়ার ফাংশন
 */
export function getAllLoyaltyTypes(): readonly LoyaltyType[] {
  return LOYALTY_TYPES;
}

/**
 * লয়্যালটি টাইপ বৈধ কিনা চেক করার ফাংশন
 */
export function isValidLoyaltyType(type: string): type is LoyaltyType {
  return LOYALTY_TYPES.includes(type as LoyaltyType);
}

/**
 * টাইপ পয়েন্টস-বেসড কিনা চেক করার ফাংশন
 */
export function isPointsBasedLoyaltyType(type: LoyaltyType): boolean {
  return type === 'points-based';
}

/**
 * টাইপ টিয়ার-বেসড কিনা চেক করার ফাংশন
 */
export function isTierBasedLoyaltyType(type: LoyaltyType): boolean {
  return type === 'tier-based';
}

/**
 * টাইপ হাইব্রিড কিনা চেক করার ফাংশন
 */
export function isHybridLoyaltyType(type: LoyaltyType): boolean {
  return type === 'hybrid';
}

/**
 * টাইপ পয়েন্টস সমর্থিত কিনা চেক করার ফাংশন
 */
export function supportsPoints(type: LoyaltyType): boolean {
  return type === 'points-based' || type === 'hybrid';
}

/**
 * টাইপ টিয়ার সমর্থিত কিনা চেক করার ফাংশন
 */
export function supportsTiers(type: LoyaltyType): boolean {
  return type === 'tier-based' || type === 'hybrid';
}

/**
 * ডিফল্ট লয়্যালটি টাইপ পাওয়ার ফাংশন
 */
export function getDefaultLoyaltyType(): LoyaltyType {
  return 'points-based';
}

/**
 * টাইপের আইকন পাওয়ার ফাংশন
 */
export function getLoyaltyTypeIcon(type: LoyaltyType): string {
  const icons: Record<LoyaltyType, string> = {
    'points-based': '⭐',
    'tier-based': '🏆',
    hybrid: '🔄',
  };
  return icons[type];
}

/**
 * টাইপের বিবরণ পাওয়ার ফাংশন
 */
export function getLoyaltyTypeDescription(type: LoyaltyType, lang: Language = 'en'): string {
  const descriptions: Record<LoyaltyType, { en: string; bn: string }> = {
    'points-based': {
      en: 'Earn and redeem points for rewards',
      bn: 'পুরস্কারের জন্য পয়েন্ট অর্জন এবং রিডিম করুন',
    },
    'tier-based': {
      en: 'Different tiers with increasing benefits',
      bn: 'বিভিন্ন টিয়ার যা ক্রমবর্ধমান সুবিধা দেয়',
    },
    hybrid: {
      en: 'Combination of points and tier system',
      bn: 'পয়েন্ট এবং টিয়ার সিস্টেমের সমন্বয়',
    },
  };
  return descriptions[type][lang];
}

/**
 * টাইপের রঙ পাওয়ার ফাংশন
 */
export function getLoyaltyTypeColor(type: LoyaltyType): string {
  const colors: Record<LoyaltyType, string> = {
    'points-based': '#3B82F6',
    'tier-based': '#F59E0B',
    hybrid: '#8B5CF6',
  };
  return colors[type];
}
