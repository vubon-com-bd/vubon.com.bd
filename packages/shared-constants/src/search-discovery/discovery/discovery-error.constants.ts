/**
 * ডিসকভারি-সম্পর্কিত এরর মেসেজ ও কোড
 */

/**
 * ডিসকভারি এরর ক্যাটাগরি
 */
export enum DiscoveryErrorCategory {
  RECOMMENDATION = 'recommendation',
  PERSONALIZATION = 'personalization',
  TRENDING = 'trending',
  BUNDLE = 'bundle',
  CROSS_SELL = 'cross_sell',
  COMPLEMENTARY = 'complementary',
  SUBSTITUTE = 'substitute',
  UPSELL = 'upsell',
  SEASONAL = 'seasonal',
  EDITORIAL = 'editorial',
}

/**
 * ডিসকভারি এরর কোডসমূহ
 */
export enum DiscoveryErrorCode {
  // রেকমেন্ডেশন এরর
  REC_001 = 'REC_001',
  REC_002 = 'REC_002',
  REC_003 = 'REC_003',

  // পার্সোনালাইজেশন এরর
  PERS_001 = 'PERS_001',
  PERS_002 = 'PERS_002',
  PERS_003 = 'PERS_003',

  // ট্রেন্ডিং এরর
  TREND_001 = 'TREND_001',
  TREND_002 = 'TREND_002',

  // বান্ডল এরর
  BUNDLE_001 = 'BUNDLE_001',
  BUNDLE_002 = 'BUNDLE_002',

  // ক্রস-সেল এরর
  CROSS_001 = 'CROSS_001',

  // কমপ্লিমেন্টারি এরর
  COMP_001 = 'COMP_001',

  // সাবস্টিটিউট এরর
  SUB_001 = 'SUB_001',

  // আপসেল এরর
  UPSELL_001 = 'UPSELL_001',

  // সিজনাল এরর
  SEASON_001 = 'SEASON_001',

  // এডিটোরিয়াল এরর
  EDIT_001 = 'EDIT_001',
}

/**
 * ডিসকভারি এরর মেসেজসমূহ (বাংলায়)
 */
export const DISCOVERY_ERROR_MESSAGES_BN: Record<DiscoveryErrorCode, string> = {
  [DiscoveryErrorCode.REC_001]: 'রেকমেন্ডেশন পাওয়া যায়নি',
  [DiscoveryErrorCode.REC_002]: 'রেকমেন্ডেশন তৈরি করা যায়নি',
  [DiscoveryErrorCode.REC_003]: 'রেকমেন্ডেশন টাইমআউট হয়েছে',

  [DiscoveryErrorCode.PERS_001]: 'পার্সোনালাইজেশন সেটিংস আপডেট করা যায়নি',
  [DiscoveryErrorCode.PERS_002]: 'ইউজার প্রোফাইল পাওয়া যায়নি',
  [DiscoveryErrorCode.PERS_003]: 'ইন্টারেস্ট স্কোর আপডেট করা যায়নি',

  [DiscoveryErrorCode.TREND_001]: 'ট্রেন্ডিং ডেটা পাওয়া যায়নি',
  [DiscoveryErrorCode.TREND_002]: 'ট্রেন্ডিং গণনা ব্যর্থ হয়েছে',

  [DiscoveryErrorCode.BUNDLE_001]: 'বান্ডল তৈরি করা যায়নি',
  [DiscoveryErrorCode.BUNDLE_002]: 'বান্ডল ডিসকাউন্ট গণনা ব্যর্থ হয়েছে',

  [DiscoveryErrorCode.CROSS_001]: 'ক্রস-সেল আইটেম পাওয়া যায়নি',

  [DiscoveryErrorCode.COMP_001]: 'কমপ্লিমেন্টারি আইটেম পাওয়া যায়নি',

  [DiscoveryErrorCode.SUB_001]: 'সাবস্টিটিউট আইটেম পাওয়া যায়নি',

  [DiscoveryErrorCode.UPSELL_001]: 'আপসেল আইটেম পাওয়া যায়নি',

  [DiscoveryErrorCode.SEASON_001]: 'সিজনাল আইটেম পাওয়া যায়নি',

  [DiscoveryErrorCode.EDIT_001]: 'এডিটোরিয়াল কন্টেন্ট পাওয়া যায়নি',
} as const;

/**
 * ডিসকভারি এরর মেসেজসমূহ (ইংরেজিতে)
 */
export const DISCOVERY_ERROR_MESSAGES_EN: Record<DiscoveryErrorCode, string> = {
  [DiscoveryErrorCode.REC_001]: 'Recommendations not found',
  [DiscoveryErrorCode.REC_002]: 'Unable to generate recommendations',
  [DiscoveryErrorCode.REC_003]: 'Recommendation timeout occurred',

  [DiscoveryErrorCode.PERS_001]: 'Unable to update personalization settings',
  [DiscoveryErrorCode.PERS_002]: 'User profile not found',
  [DiscoveryErrorCode.PERS_003]: 'Unable to update interest score',

  [DiscoveryErrorCode.TREND_001]: 'Trending data not found',
  [DiscoveryErrorCode.TREND_002]: 'Trending calculation failed',

  [DiscoveryErrorCode.BUNDLE_001]: 'Unable to create bundle',
  [DiscoveryErrorCode.BUNDLE_002]: 'Bundle discount calculation failed',

  [DiscoveryErrorCode.CROSS_001]: 'Cross-sell items not found',

  [DiscoveryErrorCode.COMP_001]: 'Complementary items not found',

  [DiscoveryErrorCode.SUB_001]: 'Substitute items not found',

  [DiscoveryErrorCode.UPSELL_001]: 'Upsell items not found',

  [DiscoveryErrorCode.SEASON_001]: 'Seasonal items not found',

  [DiscoveryErrorCode.EDIT_001]: 'Editorial content not found',
} as const;

/**
 * ডিসকভারি এরর HTTP স্ট্যাটাস কোড ম্যাপিং
 */
export const DISCOVERY_ERROR_HTTP_STATUS: Record<DiscoveryErrorCode, number> = {
  [DiscoveryErrorCode.REC_001]: 404,
  [DiscoveryErrorCode.REC_002]: 500,
  [DiscoveryErrorCode.REC_003]: 504,

  [DiscoveryErrorCode.PERS_001]: 500,
  [DiscoveryErrorCode.PERS_002]: 404,
  [DiscoveryErrorCode.PERS_003]: 500,

  [DiscoveryErrorCode.TREND_001]: 404,
  [DiscoveryErrorCode.TREND_002]: 500,

  [DiscoveryErrorCode.BUNDLE_001]: 500,
  [DiscoveryErrorCode.BUNDLE_002]: 500,

  [DiscoveryErrorCode.CROSS_001]: 404,

  [DiscoveryErrorCode.COMP_001]: 404,

  [DiscoveryErrorCode.SUB_001]: 404,

  [DiscoveryErrorCode.UPSELL_001]: 404,

  [DiscoveryErrorCode.SEASON_001]: 404,

  [DiscoveryErrorCode.EDIT_001]: 404,
} as const;

/**
 * ডিসকভারি এরর ক্যাটাগরি ম্যাপিং
 */
export const DISCOVERY_ERROR_CATEGORY: Record<DiscoveryErrorCode, DiscoveryErrorCategory> = {
  [DiscoveryErrorCode.REC_001]: DiscoveryErrorCategory.RECOMMENDATION,
  [DiscoveryErrorCode.REC_002]: DiscoveryErrorCategory.RECOMMENDATION,
  [DiscoveryErrorCode.REC_003]: DiscoveryErrorCategory.RECOMMENDATION,

  [DiscoveryErrorCode.PERS_001]: DiscoveryErrorCategory.PERSONALIZATION,
  [DiscoveryErrorCode.PERS_002]: DiscoveryErrorCategory.PERSONALIZATION,
  [DiscoveryErrorCode.PERS_003]: DiscoveryErrorCategory.PERSONALIZATION,

  [DiscoveryErrorCode.TREND_001]: DiscoveryErrorCategory.TRENDING,
  [DiscoveryErrorCode.TREND_002]: DiscoveryErrorCategory.TRENDING,

  [DiscoveryErrorCode.BUNDLE_001]: DiscoveryErrorCategory.BUNDLE,
  [DiscoveryErrorCode.BUNDLE_002]: DiscoveryErrorCategory.BUNDLE,

  [DiscoveryErrorCode.CROSS_001]: DiscoveryErrorCategory.CROSS_SELL,

  [DiscoveryErrorCode.COMP_001]: DiscoveryErrorCategory.COMPLEMENTARY,

  [DiscoveryErrorCode.SUB_001]: DiscoveryErrorCategory.SUBSTITUTE,

  [DiscoveryErrorCode.UPSELL_001]: DiscoveryErrorCategory.UPSELL,

  [DiscoveryErrorCode.SEASON_001]: DiscoveryErrorCategory.SEASONAL,

  [DiscoveryErrorCode.EDIT_001]: DiscoveryErrorCategory.EDITORIAL,
} as const;

/**
 * ডিসকভারি এরর ক্যাটাগরি লেবেলসমূহ (বাংলায়)
 */
export const DISCOVERY_ERROR_CATEGORY_LABELS_BN: Record<DiscoveryErrorCategory, string> = {
  [DiscoveryErrorCategory.RECOMMENDATION]: 'রেকমেন্ডেশন',
  [DiscoveryErrorCategory.PERSONALIZATION]: 'পার্সোনালাইজেশন',
  [DiscoveryErrorCategory.TRENDING]: 'ট্রেন্ডিং',
  [DiscoveryErrorCategory.BUNDLE]: 'বান্ডল',
  [DiscoveryErrorCategory.CROSS_SELL]: 'ক্রস-সেল',
  [DiscoveryErrorCategory.COMPLEMENTARY]: 'কমপ্লিমেন্টারি',
  [DiscoveryErrorCategory.SUBSTITUTE]: 'সাবস্টিটিউট',
  [DiscoveryErrorCategory.UPSELL]: 'আপসেল',
  [DiscoveryErrorCategory.SEASONAL]: 'সিজনাল',
  [DiscoveryErrorCategory.EDITORIAL]: 'এডিটোরিয়াল',
} as const;

/**
 * ডিসকভারি এরর ক্যাটাগরি লেবেলসমূহ (ইংরেজিতে)
 */
export const DISCOVERY_ERROR_CATEGORY_LABELS_EN: Record<DiscoveryErrorCategory, string> = {
  [DiscoveryErrorCategory.RECOMMENDATION]: 'Recommendation',
  [DiscoveryErrorCategory.PERSONALIZATION]: 'Personalization',
  [DiscoveryErrorCategory.TRENDING]: 'Trending',
  [DiscoveryErrorCategory.BUNDLE]: 'Bundle',
  [DiscoveryErrorCategory.CROSS_SELL]: 'Cross-Sell',
  [DiscoveryErrorCategory.COMPLEMENTARY]: 'Complementary',
  [DiscoveryErrorCategory.SUBSTITUTE]: 'Substitute',
  [DiscoveryErrorCategory.UPSELL]: 'Upsell',
  [DiscoveryErrorCategory.SEASONAL]: 'Seasonal',
  [DiscoveryErrorCategory.EDITORIAL]: 'Editorial',
} as const;

/**
 * ডিসকভারি এরর রেট্রাই কনফিগারেশন
 */
export const DISCOVERY_ERROR_RETRY_CONFIG = {
  MAX_RETRIES: 3,
  RETRY_DELAY_MS: 1000,
  RETRY_BACKOFF_MULTIPLIER: 2,
  RETRYABLE_ERROR_CODES: [
    DiscoveryErrorCode.REC_003,
    DiscoveryErrorCode.TREND_002,
    DiscoveryErrorCode.BUNDLE_001,
    DiscoveryErrorCode.BUNDLE_002,
  ],
} as const;

/**
 * ডিসকভারি এরর কনফিগারেশন টাইপ
 */
export type DiscoveryErrorConfig = {
  code: DiscoveryErrorCode;
  messageBn: string;
  messageEn: string;
  httpStatus: number;
  category: DiscoveryErrorCategory;
  retryable: boolean;
};

/**
 * ডিসকভারি এরর কনফিগারেশনসমূহ
 */
export const DISCOVERY_ERROR_CONFIGS: Record<DiscoveryErrorCode, DiscoveryErrorConfig> = {
  [DiscoveryErrorCode.REC_001]: {
    code: DiscoveryErrorCode.REC_001,
    messageBn: DISCOVERY_ERROR_MESSAGES_BN[DiscoveryErrorCode.REC_001],
    messageEn: DISCOVERY_ERROR_MESSAGES_EN[DiscoveryErrorCode.REC_001],
    httpStatus: DISCOVERY_ERROR_HTTP_STATUS[DiscoveryErrorCode.REC_001],
    category: DISCOVERY_ERROR_CATEGORY[DiscoveryErrorCode.REC_001],
    retryable: false,
  },
  [DiscoveryErrorCode.REC_002]: {
    code: DiscoveryErrorCode.REC_002,
    messageBn: DISCOVERY_ERROR_MESSAGES_BN[DiscoveryErrorCode.REC_002],
    messageEn: DISCOVERY_ERROR_MESSAGES_EN[DiscoveryErrorCode.REC_002],
    httpStatus: DISCOVERY_ERROR_HTTP_STATUS[DiscoveryErrorCode.REC_002],
    category: DISCOVERY_ERROR_CATEGORY[DiscoveryErrorCode.REC_002],
    retryable: true,
  },
  [DiscoveryErrorCode.REC_003]: {
    code: DiscoveryErrorCode.REC_003,
    messageBn: DISCOVERY_ERROR_MESSAGES_BN[DiscoveryErrorCode.REC_003],
    messageEn: DISCOVERY_ERROR_MESSAGES_EN[DiscoveryErrorCode.REC_003],
    httpStatus: DISCOVERY_ERROR_HTTP_STATUS[DiscoveryErrorCode.REC_003],
    category: DISCOVERY_ERROR_CATEGORY[DiscoveryErrorCode.REC_003],
    retryable: true,
  },
  [DiscoveryErrorCode.PERS_001]: {
    code: DiscoveryErrorCode.PERS_001,
    messageBn: DISCOVERY_ERROR_MESSAGES_BN[DiscoveryErrorCode.PERS_001],
    messageEn: DISCOVERY_ERROR_MESSAGES_EN[DiscoveryErrorCode.PERS_001],
    httpStatus: DISCOVERY_ERROR_HTTP_STATUS[DiscoveryErrorCode.PERS_001],
    category: DISCOVERY_ERROR_CATEGORY[DiscoveryErrorCode.PERS_001],
    retryable: false,
  },
  [DiscoveryErrorCode.PERS_002]: {
    code: DiscoveryErrorCode.PERS_002,
    messageBn: DISCOVERY_ERROR_MESSAGES_BN[DiscoveryErrorCode.PERS_002],
    messageEn: DISCOVERY_ERROR_MESSAGES_EN[DiscoveryErrorCode.PERS_002],
    httpStatus: DISCOVERY_ERROR_HTTP_STATUS[DiscoveryErrorCode.PERS_002],
    category: DISCOVERY_ERROR_CATEGORY[DiscoveryErrorCode.PERS_002],
    retryable: false,
  },
  [DiscoveryErrorCode.PERS_003]: {
    code: DiscoveryErrorCode.PERS_003,
    messageBn: DISCOVERY_ERROR_MESSAGES_BN[DiscoveryErrorCode.PERS_003],
    messageEn: DISCOVERY_ERROR_MESSAGES_EN[DiscoveryErrorCode.PERS_003],
    httpStatus: DISCOVERY_ERROR_HTTP_STATUS[DiscoveryErrorCode.PERS_003],
    category: DISCOVERY_ERROR_CATEGORY[DiscoveryErrorCode.PERS_003],
    retryable: true,
  },
  [DiscoveryErrorCode.TREND_001]: {
    code: DiscoveryErrorCode.TREND_001,
    messageBn: DISCOVERY_ERROR_MESSAGES_BN[DiscoveryErrorCode.TREND_001],
    messageEn: DISCOVERY_ERROR_MESSAGES_EN[DiscoveryErrorCode.TREND_001],
    httpStatus: DISCOVERY_ERROR_HTTP_STATUS[DiscoveryErrorCode.TREND_001],
    category: DISCOVERY_ERROR_CATEGORY[DiscoveryErrorCode.TREND_001],
    retryable: false,
  },
  [DiscoveryErrorCode.TREND_002]: {
    code: DiscoveryErrorCode.TREND_002,
    messageBn: DISCOVERY_ERROR_MESSAGES_BN[DiscoveryErrorCode.TREND_002],
    messageEn: DISCOVERY_ERROR_MESSAGES_EN[DiscoveryErrorCode.TREND_002],
    httpStatus: DISCOVERY_ERROR_HTTP_STATUS[DiscoveryErrorCode.TREND_002],
    category: DISCOVERY_ERROR_CATEGORY[DiscoveryErrorCode.TREND_002],
    retryable: true,
  },
  [DiscoveryErrorCode.BUNDLE_001]: {
    code: DiscoveryErrorCode.BUNDLE_001,
    messageBn: DISCOVERY_ERROR_MESSAGES_BN[DiscoveryErrorCode.BUNDLE_001],
    messageEn: DISCOVERY_ERROR_MESSAGES_EN[DiscoveryErrorCode.BUNDLE_001],
    httpStatus: DISCOVERY_ERROR_HTTP_STATUS[DiscoveryErrorCode.BUNDLE_001],
    category: DISCOVERY_ERROR_CATEGORY[DiscoveryErrorCode.BUNDLE_001],
    retryable: true,
  },
  [DiscoveryErrorCode.BUNDLE_002]: {
    code: DiscoveryErrorCode.BUNDLE_002,
    messageBn: DISCOVERY_ERROR_MESSAGES_BN[DiscoveryErrorCode.BUNDLE_002],
    messageEn: DISCOVERY_ERROR_MESSAGES_EN[DiscoveryErrorCode.BUNDLE_002],
    httpStatus: DISCOVERY_ERROR_HTTP_STATUS[DiscoveryErrorCode.BUNDLE_002],
    category: DISCOVERY_ERROR_CATEGORY[DiscoveryErrorCode.BUNDLE_002],
    retryable: false,
  },
  [DiscoveryErrorCode.CROSS_001]: {
    code: DiscoveryErrorCode.CROSS_001,
    messageBn: DISCOVERY_ERROR_MESSAGES_BN[DiscoveryErrorCode.CROSS_001],
    messageEn: DISCOVERY_ERROR_MESSAGES_EN[DiscoveryErrorCode.CROSS_001],
    httpStatus: DISCOVERY_ERROR_HTTP_STATUS[DiscoveryErrorCode.CROSS_001],
    category: DISCOVERY_ERROR_CATEGORY[DiscoveryErrorCode.CROSS_001],
    retryable: false,
  },
  [DiscoveryErrorCode.COMP_001]: {
    code: DiscoveryErrorCode.COMP_001,
    messageBn: DISCOVERY_ERROR_MESSAGES_BN[DiscoveryErrorCode.COMP_001],
    messageEn: DISCOVERY_ERROR_MESSAGES_EN[DiscoveryErrorCode.COMP_001],
    httpStatus: DISCOVERY_ERROR_HTTP_STATUS[DiscoveryErrorCode.COMP_001],
    category: DISCOVERY_ERROR_CATEGORY[DiscoveryErrorCode.COMP_001],
    retryable: false,
  },
  [DiscoveryErrorCode.SUB_001]: {
    code: DiscoveryErrorCode.SUB_001,
    messageBn: DISCOVERY_ERROR_MESSAGES_BN[DiscoveryErrorCode.SUB_001],
    messageEn: DISCOVERY_ERROR_MESSAGES_EN[DiscoveryErrorCode.SUB_001],
    httpStatus: DISCOVERY_ERROR_HTTP_STATUS[DiscoveryErrorCode.SUB_001],
    category: DISCOVERY_ERROR_CATEGORY[DiscoveryErrorCode.SUB_001],
    retryable: false,
  },
  [DiscoveryErrorCode.UPSELL_001]: {
    code: DiscoveryErrorCode.UPSELL_001,
    messageBn: DISCOVERY_ERROR_MESSAGES_BN[DiscoveryErrorCode.UPSELL_001],
    messageEn: DISCOVERY_ERROR_MESSAGES_EN[DiscoveryErrorCode.UPSELL_001],
    httpStatus: DISCOVERY_ERROR_HTTP_STATUS[DiscoveryErrorCode.UPSELL_001],
    category: DISCOVERY_ERROR_CATEGORY[DiscoveryErrorCode.UPSELL_001],
    retryable: false,
  },
  [DiscoveryErrorCode.SEASON_001]: {
    code: DiscoveryErrorCode.SEASON_001,
    messageBn: DISCOVERY_ERROR_MESSAGES_BN[DiscoveryErrorCode.SEASON_001],
    messageEn: DISCOVERY_ERROR_MESSAGES_EN[DiscoveryErrorCode.SEASON_001],
    httpStatus: DISCOVERY_ERROR_HTTP_STATUS[DiscoveryErrorCode.SEASON_001],
    category: DISCOVERY_ERROR_CATEGORY[DiscoveryErrorCode.SEASON_001],
    retryable: false,
  },
  [DiscoveryErrorCode.EDIT_001]: {
    code: DiscoveryErrorCode.EDIT_001,
    messageBn: DISCOVERY_ERROR_MESSAGES_BN[DiscoveryErrorCode.EDIT_001],
    messageEn: DISCOVERY_ERROR_MESSAGES_EN[DiscoveryErrorCode.EDIT_001],
    httpStatus: DISCOVERY_ERROR_HTTP_STATUS[DiscoveryErrorCode.EDIT_001],
    category: DISCOVERY_ERROR_CATEGORY[DiscoveryErrorCode.EDIT_001],
    retryable: false,
  },
} as const;

/**
 * ডিসকভারি এরর রেসপন্স টাইপ
 */
export type DiscoveryErrorResponse = {
  code: DiscoveryErrorCode;
  message: string;
  status: number;
  category: DiscoveryErrorCategory;
  timestamp: Date;
  path?: string;
  details?: Record<string, unknown>;
};

/**
 * ডিসকভারি এরর অতিরিক্ত মেসেজসমূহ
 */
export const DISCOVERY_ERROR_EXTRA_MESSAGES = {
  INVALID_ERROR_CODE: 'অবৈধ ডিসকভারি এরর কোড',
  INVALID_CATEGORY: 'অবৈধ ডিসকভারি এরর ক্যাটাগরি',
  UNKNOWN_ERROR: 'অজানা ডিসকভারি এরর',
  ERROR_NOT_FOUND: 'ডিসকভারি এরর পাওয়া যায়নি',
} as const;
