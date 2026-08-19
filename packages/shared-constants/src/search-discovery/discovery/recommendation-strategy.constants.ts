/**
 * রেকমেন্ডেশন স্ট্র্যাটেজি সংক্রান্ত কনস্ট্যান্টসমূহ
 */

/**
 * স্ট্র্যাটেজি টাইপ
 */
export enum StrategyType {
  COLLABORATIVE_FILTERING = 'collaborative_filtering',
  CONTENT_BASED = 'content_based',
  HYBRID = 'hybrid',
  POPULARITY = 'popularity',
  TRENDING = 'trending',
}

/**
 * স্ট্র্যাটেজি লেবেলসমূহ (বাংলায়)
 */
export const STRATEGY_TYPE_LABELS_BN: Record<StrategyType, string> = {
  [StrategyType.COLLABORATIVE_FILTERING]: 'সহযোগী ফিল্টারিং',
  [StrategyType.CONTENT_BASED]: 'কন্টেন্ট ভিত্তিক',
  [StrategyType.HYBRID]: 'হাইব্রিড',
  [StrategyType.POPULARITY]: 'জনপ্রিয়তা',
  [StrategyType.TRENDING]: 'ট্রেন্ডিং',
} as const;

/**
 * স্ট্র্যাটেজি লেবেলসমূহ (ইংরেজিতে)
 */
export const STRATEGY_TYPE_LABELS_EN: Record<StrategyType, string> = {
  [StrategyType.COLLABORATIVE_FILTERING]: 'Collaborative Filtering',
  [StrategyType.CONTENT_BASED]: 'Content Based',
  [StrategyType.HYBRID]: 'Hybrid',
  [StrategyType.POPULARITY]: 'Popularity',
  [StrategyType.TRENDING]: 'Trending',
} as const;

/**
 * স্ট্র্যাটেজি বিবরণ (বাংলায়)
 */
export const STRATEGY_TYPE_DESCRIPTIONS_BN: Record<StrategyType, string> = {
  [StrategyType.COLLABORATIVE_FILTERING]: 'অন্যান্য ব্যবহারকারীদের আচরণের ভিত্তিতে রেকমেন্ডেশন',
  [StrategyType.CONTENT_BASED]: 'আইটেমের বৈশিষ্ট্যের ভিত্তিতে রেকমেন্ডেশন',
  [StrategyType.HYBRID]: 'একাধিক স্ট্র্যাটেজির সমন্বয়',
  [StrategyType.POPULARITY]: 'সর্বোচ্চ জনপ্রিয় আইটেমের ভিত্তিতে রেকমেন্ডেশন',
  [StrategyType.TRENDING]: 'বর্তমান ট্রেন্ডের ভিত্তিতে রেকমেন্ডেশন',
} as const;

/**
 * স্ট্র্যাটেজি বিবরণ (ইংরেজিতে)
 */
export const STRATEGY_TYPE_DESCRIPTIONS_EN: Record<StrategyType, string> = {
  [StrategyType.COLLABORATIVE_FILTERING]: 'Recommendations based on other users behavior',
  [StrategyType.CONTENT_BASED]: 'Recommendations based on item features',
  [StrategyType.HYBRID]: 'Combination of multiple strategies',
  [StrategyType.POPULARITY]: 'Recommendations based on most popular items',
  [StrategyType.TRENDING]: 'Recommendations based on current trends',
} as const;

/**
 * স্ট্র্যাটেজি ওয়েটেজ (weight)
 */
export const STRATEGY_WEIGHTS: Record<StrategyType, number> = {
  [StrategyType.COLLABORATIVE_FILTERING]: 1.0,
  [StrategyType.CONTENT_BASED]: 1.0,
  [StrategyType.HYBRID]: 1.5,
  [StrategyType.POPULARITY]: 0.8,
  [StrategyType.TRENDING]: 1.2,
} as const;

/**
 * ডিফল্ট স্ট্র্যাটেজি
 */
export const DEFAULT_STRATEGY_TYPE = StrategyType.HYBRID;

/**
 * স্ট্র্যাটেজি টাইপের ভ্যালু সমূহ
 */
export const STRATEGY_TYPE_VALUES = Object.values(StrategyType) as readonly StrategyType[];

/**
 * স্ট্র্যাটেজি কনফিগারেশন টাইপ
 */
export type StrategyConfig = {
  type: StrategyType;
  labelBn: string;
  labelEn: string;
  descriptionBn: string;
  descriptionEn: string;
  weight: number;
  enabled: boolean;
};

/**
 * স্ট্র্যাটেজি কনফিগারেশনসমূহ
 */
export const STRATEGY_CONFIGS: Record<StrategyType, StrategyConfig> = {
  [StrategyType.COLLABORATIVE_FILTERING]: {
    type: StrategyType.COLLABORATIVE_FILTERING,
    labelBn: STRATEGY_TYPE_LABELS_BN[StrategyType.COLLABORATIVE_FILTERING],
    labelEn: STRATEGY_TYPE_LABELS_EN[StrategyType.COLLABORATIVE_FILTERING],
    descriptionBn: STRATEGY_TYPE_DESCRIPTIONS_BN[StrategyType.COLLABORATIVE_FILTERING],
    descriptionEn: STRATEGY_TYPE_DESCRIPTIONS_EN[StrategyType.COLLABORATIVE_FILTERING],
    weight: STRATEGY_WEIGHTS[StrategyType.COLLABORATIVE_FILTERING],
    enabled: true,
  },
  [StrategyType.CONTENT_BASED]: {
    type: StrategyType.CONTENT_BASED,
    labelBn: STRATEGY_TYPE_LABELS_BN[StrategyType.CONTENT_BASED],
    labelEn: STRATEGY_TYPE_LABELS_EN[StrategyType.CONTENT_BASED],
    descriptionBn: STRATEGY_TYPE_DESCRIPTIONS_BN[StrategyType.CONTENT_BASED],
    descriptionEn: STRATEGY_TYPE_DESCRIPTIONS_EN[StrategyType.CONTENT_BASED],
    weight: STRATEGY_WEIGHTS[StrategyType.CONTENT_BASED],
    enabled: true,
  },
  [StrategyType.HYBRID]: {
    type: StrategyType.HYBRID,
    labelBn: STRATEGY_TYPE_LABELS_BN[StrategyType.HYBRID],
    labelEn: STRATEGY_TYPE_LABELS_EN[StrategyType.HYBRID],
    descriptionBn: STRATEGY_TYPE_DESCRIPTIONS_BN[StrategyType.HYBRID],
    descriptionEn: STRATEGY_TYPE_DESCRIPTIONS_EN[StrategyType.HYBRID],
    weight: STRATEGY_WEIGHTS[StrategyType.HYBRID],
    enabled: true,
  },
  [StrategyType.POPULARITY]: {
    type: StrategyType.POPULARITY,
    labelBn: STRATEGY_TYPE_LABELS_BN[StrategyType.POPULARITY],
    labelEn: STRATEGY_TYPE_LABELS_EN[StrategyType.POPULARITY],
    descriptionBn: STRATEGY_TYPE_DESCRIPTIONS_BN[StrategyType.POPULARITY],
    descriptionEn: STRATEGY_TYPE_DESCRIPTIONS_EN[StrategyType.POPULARITY],
    weight: STRATEGY_WEIGHTS[StrategyType.POPULARITY],
    enabled: true,
  },
  [StrategyType.TRENDING]: {
    type: StrategyType.TRENDING,
    labelBn: STRATEGY_TYPE_LABELS_BN[StrategyType.TRENDING],
    labelEn: STRATEGY_TYPE_LABELS_EN[StrategyType.TRENDING],
    descriptionBn: STRATEGY_TYPE_DESCRIPTIONS_BN[StrategyType.TRENDING],
    descriptionEn: STRATEGY_TYPE_DESCRIPTIONS_EN[StrategyType.TRENDING],
    weight: STRATEGY_WEIGHTS[StrategyType.TRENDING],
    enabled: true,
  },
} as const;

/**
 * স্ট্র্যাটেজি প্যারামিটার টাইপ
 */
export type StrategyParams = {
  strategy: StrategyType;
  weight?: number;
  params?: Record<string, unknown>;
};

/**
 * স্ট্র্যাটেজি কম্বাইন্ড রেসপন্স টাইপ
 */
export type StrategyCombinedResponse = {
  strategies: StrategyParams[];
  totalWeight: number;
  items: unknown[];
};

/**
 * স্ট্র্যাটেজি এরর মেসেজসমূহ
 */
export const STRATEGY_ERROR_MESSAGES = {
  INVALID_STRATEGY: 'স্ট্র্যাটেজি টাইপ সঠিক নয়',
  INVALID_WEIGHT: 'স্ট্র্যাটেজি ওয়েটেজ ০ এর চেয়ে বেশি হতে হবে',
  NO_STRATEGIES: 'কোনো স্ট্র্যাটেজি পাওয়া যায়নি',
  STRATEGY_DISABLED: 'স্ট্র্যাটেজি বন্ধ রয়েছে',
} as const;
