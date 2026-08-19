/**
 * পার্সোনালাইজেশন সংক্রান্ত কনস্ট্যান্টসমূহ
 */

/**
 * পার্সোনালাইজেশন টাইপ
 */
export enum PersonalizationType {
  EXPLICIT = 'explicit',
  IMPLICIT = 'implicit',
  HYBRID = 'hybrid',
}

/**
 * ইউজার ইন্টারেস্ট ক্যাটাগরি
 */
export enum UserInterestCategory {
  VIEW = 'view',
  PURCHASE = 'purchase',
  CART = 'cart',
  WISHLIST = 'wishlist',
  SEARCH = 'search',
}

/**
 * পার্সোনালাইজেশন টাইপ লেবেলসমূহ (বাংলায়)
 */
export const PERSONALIZATION_TYPE_LABELS_BN: Record<PersonalizationType, string> = {
  [PersonalizationType.EXPLICIT]: 'স্পষ্ট',
  [PersonalizationType.IMPLICIT]: 'অন্তর্নিহিত',
  [PersonalizationType.HYBRID]: 'হাইব্রিড',
} as const;

/**
 * পার্সোনালাইজেশন টাইপ লেবেলসমূহ (ইংরেজিতে)
 */
export const PERSONALIZATION_TYPE_LABELS_EN: Record<PersonalizationType, string> = {
  [PersonalizationType.EXPLICIT]: 'Explicit',
  [PersonalizationType.IMPLICIT]: 'Implicit',
  [PersonalizationType.HYBRID]: 'Hybrid',
} as const;

/**
 * পার্সোনালাইজেশন টাইপ বিবরণ (বাংলায়)
 */
export const PERSONALIZATION_TYPE_DESCRIPTIONS_BN: Record<PersonalizationType, string> = {
  [PersonalizationType.EXPLICIT]: 'ব্যবহারকারীর সরাসরি পছন্দের ভিত্তিতে',
  [PersonalizationType.IMPLICIT]: 'ব্যবহারকারীর আচরণের ভিত্তিতে',
  [PersonalizationType.HYBRID]: 'স্পষ্ট ও অন্তর্নিহিত উভয়ের সমন্বয়',
} as const;

/**
 * পার্সোনালাইজেশন টাইপ বিবরণ (ইংরেজিতে)
 */
export const PERSONALIZATION_TYPE_DESCRIPTIONS_EN: Record<PersonalizationType, string> = {
  [PersonalizationType.EXPLICIT]: 'Based on user explicit preferences',
  [PersonalizationType.IMPLICIT]: 'Based on user behavior',
  [PersonalizationType.HYBRID]: 'Combination of explicit and implicit',
} as const;

/**
 * ইউজার ইন্টারেস্ট ক্যাটাগরি লেবেলসমূহ (বাংলায়)
 */
export const USER_INTEREST_CATEGORY_LABELS_BN: Record<UserInterestCategory, string> = {
  [UserInterestCategory.VIEW]: 'দেখা',
  [UserInterestCategory.PURCHASE]: 'ক্রয়',
  [UserInterestCategory.CART]: 'কার্ট',
  [UserInterestCategory.WISHLIST]: 'উইশলিস্ট',
  [UserInterestCategory.SEARCH]: 'সার্চ',
} as const;

/**
 * ইউজার ইন্টারেস্ট ক্যাটাগরি লেবেলসমূহ (ইংরেজিতে)
 */
export const USER_INTEREST_CATEGORY_LABELS_EN: Record<UserInterestCategory, string> = {
  [UserInterestCategory.VIEW]: 'View',
  [UserInterestCategory.PURCHASE]: 'Purchase',
  [UserInterestCategory.CART]: 'Cart',
  [UserInterestCategory.WISHLIST]: 'Wishlist',
  [UserInterestCategory.SEARCH]: 'Search',
} as const;

/**
 * ইউজার ইন্টারেস্ট ক্যাটাগরি ওয়েটেজ
 */
export const USER_INTEREST_CATEGORY_WEIGHTS: Record<UserInterestCategory, number> = {
  [UserInterestCategory.VIEW]: 0.3,
  [UserInterestCategory.PURCHASE]: 1.0,
  [UserInterestCategory.CART]: 0.7,
  [UserInterestCategory.WISHLIST]: 0.5,
  [UserInterestCategory.SEARCH]: 0.4,
} as const;

/**
 * ইন্টারেস্ট স্কোর থ্রেশহোল্ড
 */
export const INTEREST_SCORE_THRESHOLD = 0.6;

/**
 * ন্যূনতম ইন্টারেস্ট স্কোর
 */
export const MIN_INTEREST_SCORE = 0.0;

/**
 * সর্বোচ্চ ইন্টারেস্ট স্কোর
 */
export const MAX_INTEREST_SCORE = 1.0;

/**
 * ইন্টারেস্ট আপডেট ইন্টারভাল (ঘন্টায়)
 */
export const INTEREST_UPDATE_INTERVAL_HOURS = 1;

/**
 * ইন্টারেস্ট আপডেট ইন্টারভাল (মিলিসেকেন্ডে)
 */
export const INTEREST_UPDATE_INTERVAL_MS = 3600000;

/**
 * ডিফল্ট পার্সোনালাইজেশন টাইপ
 */
export const DEFAULT_PERSONALIZATION_TYPE = PersonalizationType.HYBRID;

/**
 * পার্সোনালাইজেশন টাইপের ভ্যালু সমূহ
 */
export const PERSONALIZATION_TYPE_VALUES = Object.values(
  PersonalizationType
) as readonly PersonalizationType[];

/**
 * ইউজার ইন্টারেস্ট ক্যাটাগরির ভ্যালু সমূহ
 */
export const USER_INTEREST_CATEGORY_VALUES = Object.values(
  UserInterestCategory
) as readonly UserInterestCategory[];

/**
 * পার্সোনালাইজেশন কনফিগারেশন টাইপ
 */
export type PersonalizationConfig = {
  type: PersonalizationType;
  labelBn: string;
  labelEn: string;
  descriptionBn: string;
  descriptionEn: string;
  scoreThreshold: number;
  updateIntervalHours: number;
  enabled: boolean;
};

/**
 * পার্সোনালাইজেশন কনফিগারেশনসমূহ
 */
export const PERSONALIZATION_CONFIGS: Record<PersonalizationType, PersonalizationConfig> = {
  [PersonalizationType.EXPLICIT]: {
    type: PersonalizationType.EXPLICIT,
    labelBn: PERSONALIZATION_TYPE_LABELS_BN[PersonalizationType.EXPLICIT],
    labelEn: PERSONALIZATION_TYPE_LABELS_EN[PersonalizationType.EXPLICIT],
    descriptionBn: PERSONALIZATION_TYPE_DESCRIPTIONS_BN[PersonalizationType.EXPLICIT],
    descriptionEn: PERSONALIZATION_TYPE_DESCRIPTIONS_EN[PersonalizationType.EXPLICIT],
    scoreThreshold: INTEREST_SCORE_THRESHOLD,
    updateIntervalHours: INTEREST_UPDATE_INTERVAL_HOURS,
    enabled: true,
  },
  [PersonalizationType.IMPLICIT]: {
    type: PersonalizationType.IMPLICIT,
    labelBn: PERSONALIZATION_TYPE_LABELS_BN[PersonalizationType.IMPLICIT],
    labelEn: PERSONALIZATION_TYPE_LABELS_EN[PersonalizationType.IMPLICIT],
    descriptionBn: PERSONALIZATION_TYPE_DESCRIPTIONS_BN[PersonalizationType.IMPLICIT],
    descriptionEn: PERSONALIZATION_TYPE_DESCRIPTIONS_EN[PersonalizationType.IMPLICIT],
    scoreThreshold: INTEREST_SCORE_THRESHOLD,
    updateIntervalHours: INTEREST_UPDATE_INTERVAL_HOURS,
    enabled: true,
  },
  [PersonalizationType.HYBRID]: {
    type: PersonalizationType.HYBRID,
    labelBn: PERSONALIZATION_TYPE_LABELS_BN[PersonalizationType.HYBRID],
    labelEn: PERSONALIZATION_TYPE_LABELS_EN[PersonalizationType.HYBRID],
    descriptionBn: PERSONALIZATION_TYPE_DESCRIPTIONS_BN[PersonalizationType.HYBRID],
    descriptionEn: PERSONALIZATION_TYPE_DESCRIPTIONS_EN[PersonalizationType.HYBRID],
    scoreThreshold: INTEREST_SCORE_THRESHOLD,
    updateIntervalHours: INTEREST_UPDATE_INTERVAL_HOURS,
    enabled: true,
  },
} as const;

/**
 * ইউজার ইন্টারেস্ট ডেটা টাইপ
 */
export type UserInterest = {
  category: UserInterestCategory;
  itemId: string;
  score: number;
  timestamp: Date;
  metadata?: Record<string, unknown>;
};

/**
 * ইউজার প্রোফাইল টাইপ
 */
export type UserProfile = {
  userId: string;
  interests: UserInterest[];
  preferences: Record<string, unknown>;
  updatedAt: Date;
};

/**
 * পার্সোনালাইজেশন এরর মেসেজসমূহ
 */
export const PERSONALIZATION_ERROR_MESSAGES = {
  INVALID_TYPE: 'পার্সোনালাইজেশন টাইপ সঠিক নয়',
  INVALID_CATEGORY: 'ইন্টারেস্ট ক্যাটাগরি সঠিক নয়',
  INVALID_SCORE: `ইন্টারেস্ট স্কোর ${MIN_INTEREST_SCORE} থেকে ${MAX_INTEREST_SCORE} এর মধ্যে হতে হবে`,
  SCORE_TOO_LOW: `ইন্টারেস্ট স্কোর ${MIN_INTEREST_SCORE} এর চেয়ে কম হতে পারে না`,
  SCORE_TOO_HIGH: `ইন্টারেস্ট স্কোর ${MAX_INTEREST_SCORE} এর চেয়ে বেশি হতে পারে না`,
  THRESHOLD_EXCEEDED: 'ইন্টারেস্ট থ্রেশহোল্ড অতিক্রম করা হয়েছে',
  PROFILE_NOT_FOUND: 'ইউজার প্রোফাইল পাওয়া যায়নি',
} as const;
