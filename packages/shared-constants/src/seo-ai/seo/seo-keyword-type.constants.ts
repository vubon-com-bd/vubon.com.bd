/**
 * SEO কীওয়ার্ড টাইপ এনাম
 */
export const SEO_KEYWORD_TYPE = {
  SHORT_TAIL: 'short-tail',
  LONG_TAIL: 'long-tail',
  LSI: 'lsi',
  BRANDED: 'branded',
  NON_BRANDED: 'non-branded',
  PRODUCT: 'product',
  CATEGORY: 'category',
  LOCATION_BASED: 'location-based',
  SEASONAL: 'seasonal',
  TRENDING: 'trending',
} as const;

/**
 * SEO_KEYWORD_TYPE থেকে টাইপ
 */
export type SEOKeywordType = (typeof SEO_KEYWORD_TYPE)[keyof typeof SEO_KEYWORD_TYPE];

/**
 * SEO কীওয়ার্ড টাইপ লেবেল
 */
export const SEO_KEYWORD_TYPE_LABELS: Record<SEOKeywordType, string> = {
  [SEO_KEYWORD_TYPE.SHORT_TAIL]: 'Short Tail',
  [SEO_KEYWORD_TYPE.LONG_TAIL]: 'Long Tail',
  [SEO_KEYWORD_TYPE.LSI]: 'LSI',
  [SEO_KEYWORD_TYPE.BRANDED]: 'Branded',
  [SEO_KEYWORD_TYPE.NON_BRANDED]: 'Non-Branded',
  [SEO_KEYWORD_TYPE.PRODUCT]: 'Product',
  [SEO_KEYWORD_TYPE.CATEGORY]: 'Category',
  [SEO_KEYWORD_TYPE.LOCATION_BASED]: 'Location Based',
  [SEO_KEYWORD_TYPE.SEASONAL]: 'Seasonal',
  [SEO_KEYWORD_TYPE.TRENDING]: 'Trending',
} as const;

/**
 * SEO কীওয়ার্ড টাইপ বিবরণ
 */
export const SEO_KEYWORD_TYPE_DESCRIPTIONS: Record<SEOKeywordType, string> = {
  [SEO_KEYWORD_TYPE.SHORT_TAIL]: 'Short, broad keywords with 1-2 words and high search volume',
  [SEO_KEYWORD_TYPE.LONG_TAIL]: 'Longer, specific keywords with 3+ words and lower competition',
  [SEO_KEYWORD_TYPE.LSI]: 'Latent Semantic Indexing keywords related to main topic',
  [SEO_KEYWORD_TYPE.BRANDED]: 'Keywords that include brand name or variations',
  [SEO_KEYWORD_TYPE.NON_BRANDED]: 'Keywords without brand name, focusing on products or services',
  [SEO_KEYWORD_TYPE.PRODUCT]: 'Keywords specific to individual products or items',
  [SEO_KEYWORD_TYPE.CATEGORY]: 'Keywords for product categories or content categories',
  [SEO_KEYWORD_TYPE.LOCATION_BASED]: 'Keywords that include location or geographic modifiers',
  [SEO_KEYWORD_TYPE.SEASONAL]: 'Keywords relevant to specific seasons or holidays',
  [SEO_KEYWORD_TYPE.TRENDING]: 'Keywords that are currently trending or gaining popularity',
} as const;

/**
 * SEO কীওয়ার্ড টাইপ আইকন
 */
export const SEO_KEYWORD_TYPE_ICONS: Record<SEOKeywordType, string> = {
  [SEO_KEYWORD_TYPE.SHORT_TAIL]: '📊',
  [SEO_KEYWORD_TYPE.LONG_TAIL]: '📝',
  [SEO_KEYWORD_TYPE.LSI]: '🔗',
  [SEO_KEYWORD_TYPE.BRANDED]: '🏷️',
  [SEO_KEYWORD_TYPE.NON_BRANDED]: '📌',
  [SEO_KEYWORD_TYPE.PRODUCT]: '🛒',
  [SEO_KEYWORD_TYPE.CATEGORY]: '📂',
  [SEO_KEYWORD_TYPE.LOCATION_BASED]: '📍',
  [SEO_KEYWORD_TYPE.SEASONAL]: '🌸',
  [SEO_KEYWORD_TYPE.TRENDING]: '📈',
} as const;

/**
 * SEO কীওয়ার্ড টাইপ ডিফিকাল্টি (১ = সহজ, ৫ = কঠিন)
 */
export const SEO_KEYWORD_TYPE_DIFFICULTY: Record<SEOKeywordType, number> = {
  [SEO_KEYWORD_TYPE.SHORT_TAIL]: 5,
  [SEO_KEYWORD_TYPE.LONG_TAIL]: 2,
  [SEO_KEYWORD_TYPE.LSI]: 3,
  [SEO_KEYWORD_TYPE.BRANDED]: 2,
  [SEO_KEYWORD_TYPE.NON_BRANDED]: 4,
  [SEO_KEYWORD_TYPE.PRODUCT]: 3,
  [SEO_KEYWORD_TYPE.CATEGORY]: 2,
  [SEO_KEYWORD_TYPE.LOCATION_BASED]: 3,
  [SEO_KEYWORD_TYPE.SEASONAL]: 4,
  [SEO_KEYWORD_TYPE.TRENDING]: 5,
} as const;

/**
 * SEO কীওয়ার্ড টাইপ ভলিউম (১ = কম, ৫ = বেশি)
 */
export const SEO_KEYWORD_TYPE_VOLUME: Record<SEOKeywordType, number> = {
  [SEO_KEYWORD_TYPE.SHORT_TAIL]: 5,
  [SEO_KEYWORD_TYPE.LONG_TAIL]: 2,
  [SEO_KEYWORD_TYPE.LSI]: 3,
  [SEO_KEYWORD_TYPE.BRANDED]: 3,
  [SEO_KEYWORD_TYPE.NON_BRANDED]: 4,
  [SEO_KEYWORD_TYPE.PRODUCT]: 2,
  [SEO_KEYWORD_TYPE.CATEGORY]: 3,
  [SEO_KEYWORD_TYPE.LOCATION_BASED]: 3,
  [SEO_KEYWORD_TYPE.SEASONAL]: 3,
  [SEO_KEYWORD_TYPE.TRENDING]: 5,
} as const;

/**
 * SEO কীওয়ার্ড টাইপ কম্পিটিশন (১ = কম, ৫ = বেশি)
 */
export const SEO_KEYWORD_TYPE_COMPETITION: Record<SEOKeywordType, number> = {
  [SEO_KEYWORD_TYPE.SHORT_TAIL]: 5,
  [SEO_KEYWORD_TYPE.LONG_TAIL]: 2,
  [SEO_KEYWORD_TYPE.LSI]: 3,
  [SEO_KEYWORD_TYPE.BRANDED]: 3,
  [SEO_KEYWORD_TYPE.NON_BRANDED]: 4,
  [SEO_KEYWORD_TYPE.PRODUCT]: 3,
  [SEO_KEYWORD_TYPE.CATEGORY]: 3,
  [SEO_KEYWORD_TYPE.LOCATION_BASED]: 2,
  [SEO_KEYWORD_TYPE.SEASONAL]: 3,
  [SEO_KEYWORD_TYPE.TRENDING]: 4,
} as const;

/**
 * SEO কীওয়ার্ড টাইপ কনফিগারেশন
 */
export interface SEOKeywordTypeConfig {
  type: SEOKeywordType;
  label: string;
  description: string;
  icon: string;
  difficulty: number;
  volume: number;
  competition: number;
  avgWords: number;
  isBranded: boolean;
  isSeasonal: boolean;
  isLocationBased: boolean;
}

/**
 * SEO কীওয়ার্ড টাইপ মেটাডেটা
 */
export const SEO_KEYWORD_TYPE_METADATA: Record<SEOKeywordType, SEOKeywordTypeConfig> = {
  [SEO_KEYWORD_TYPE.SHORT_TAIL]: {
    type: SEO_KEYWORD_TYPE.SHORT_TAIL,
    label: SEO_KEYWORD_TYPE_LABELS[SEO_KEYWORD_TYPE.SHORT_TAIL],
    description: SEO_KEYWORD_TYPE_DESCRIPTIONS[SEO_KEYWORD_TYPE.SHORT_TAIL],
    icon: SEO_KEYWORD_TYPE_ICONS[SEO_KEYWORD_TYPE.SHORT_TAIL],
    difficulty: SEO_KEYWORD_TYPE_DIFFICULTY[SEO_KEYWORD_TYPE.SHORT_TAIL],
    volume: SEO_KEYWORD_TYPE_VOLUME[SEO_KEYWORD_TYPE.SHORT_TAIL],
    competition: SEO_KEYWORD_TYPE_COMPETITION[SEO_KEYWORD_TYPE.SHORT_TAIL],
    avgWords: 1,
    isBranded: false,
    isSeasonal: false,
    isLocationBased: false,
  },
  [SEO_KEYWORD_TYPE.LONG_TAIL]: {
    type: SEO_KEYWORD_TYPE.LONG_TAIL,
    label: SEO_KEYWORD_TYPE_LABELS[SEO_KEYWORD_TYPE.LONG_TAIL],
    description: SEO_KEYWORD_TYPE_DESCRIPTIONS[SEO_KEYWORD_TYPE.LONG_TAIL],
    icon: SEO_KEYWORD_TYPE_ICONS[SEO_KEYWORD_TYPE.LONG_TAIL],
    difficulty: SEO_KEYWORD_TYPE_DIFFICULTY[SEO_KEYWORD_TYPE.LONG_TAIL],
    volume: SEO_KEYWORD_TYPE_VOLUME[SEO_KEYWORD_TYPE.LONG_TAIL],
    competition: SEO_KEYWORD_TYPE_COMPETITION[SEO_KEYWORD_TYPE.LONG_TAIL],
    avgWords: 4,
    isBranded: false,
    isSeasonal: false,
    isLocationBased: false,
  },
  [SEO_KEYWORD_TYPE.LSI]: {
    type: SEO_KEYWORD_TYPE.LSI,
    label: SEO_KEYWORD_TYPE_LABELS[SEO_KEYWORD_TYPE.LSI],
    description: SEO_KEYWORD_TYPE_DESCRIPTIONS[SEO_KEYWORD_TYPE.LSI],
    icon: SEO_KEYWORD_TYPE_ICONS[SEO_KEYWORD_TYPE.LSI],
    difficulty: SEO_KEYWORD_TYPE_DIFFICULTY[SEO_KEYWORD_TYPE.LSI],
    volume: SEO_KEYWORD_TYPE_VOLUME[SEO_KEYWORD_TYPE.LSI],
    competition: SEO_KEYWORD_TYPE_COMPETITION[SEO_KEYWORD_TYPE.LSI],
    avgWords: 2,
    isBranded: false,
    isSeasonal: false,
    isLocationBased: false,
  },
  [SEO_KEYWORD_TYPE.BRANDED]: {
    type: SEO_KEYWORD_TYPE.BRANDED,
    label: SEO_KEYWORD_TYPE_LABELS[SEO_KEYWORD_TYPE.BRANDED],
    description: SEO_KEYWORD_TYPE_DESCRIPTIONS[SEO_KEYWORD_TYPE.BRANDED],
    icon: SEO_KEYWORD_TYPE_ICONS[SEO_KEYWORD_TYPE.BRANDED],
    difficulty: SEO_KEYWORD_TYPE_DIFFICULTY[SEO_KEYWORD_TYPE.BRANDED],
    volume: SEO_KEYWORD_TYPE_VOLUME[SEO_KEYWORD_TYPE.BRANDED],
    competition: SEO_KEYWORD_TYPE_COMPETITION[SEO_KEYWORD_TYPE.BRANDED],
    avgWords: 2,
    isBranded: true,
    isSeasonal: false,
    isLocationBased: false,
  },
  [SEO_KEYWORD_TYPE.NON_BRANDED]: {
    type: SEO_KEYWORD_TYPE.NON_BRANDED,
    label: SEO_KEYWORD_TYPE_LABELS[SEO_KEYWORD_TYPE.NON_BRANDED],
    description: SEO_KEYWORD_TYPE_DESCRIPTIONS[SEO_KEYWORD_TYPE.NON_BRANDED],
    icon: SEO_KEYWORD_TYPE_ICONS[SEO_KEYWORD_TYPE.NON_BRANDED],
    difficulty: SEO_KEYWORD_TYPE_DIFFICULTY[SEO_KEYWORD_TYPE.NON_BRANDED],
    volume: SEO_KEYWORD_TYPE_VOLUME[SEO_KEYWORD_TYPE.NON_BRANDED],
    competition: SEO_KEYWORD_TYPE_COMPETITION[SEO_KEYWORD_TYPE.NON_BRANDED],
    avgWords: 2,
    isBranded: false,
    isSeasonal: false,
    isLocationBased: false,
  },
  [SEO_KEYWORD_TYPE.PRODUCT]: {
    type: SEO_KEYWORD_TYPE.PRODUCT,
    label: SEO_KEYWORD_TYPE_LABELS[SEO_KEYWORD_TYPE.PRODUCT],
    description: SEO_KEYWORD_TYPE_DESCRIPTIONS[SEO_KEYWORD_TYPE.PRODUCT],
    icon: SEO_KEYWORD_TYPE_ICONS[SEO_KEYWORD_TYPE.PRODUCT],
    difficulty: SEO_KEYWORD_TYPE_DIFFICULTY[SEO_KEYWORD_TYPE.PRODUCT],
    volume: SEO_KEYWORD_TYPE_VOLUME[SEO_KEYWORD_TYPE.PRODUCT],
    competition: SEO_KEYWORD_TYPE_COMPETITION[SEO_KEYWORD_TYPE.PRODUCT],
    avgWords: 3,
    isBranded: false,
    isSeasonal: false,
    isLocationBased: false,
  },
  [SEO_KEYWORD_TYPE.CATEGORY]: {
    type: SEO_KEYWORD_TYPE.CATEGORY,
    label: SEO_KEYWORD_TYPE_LABELS[SEO_KEYWORD_TYPE.CATEGORY],
    description: SEO_KEYWORD_TYPE_DESCRIPTIONS[SEO_KEYWORD_TYPE.CATEGORY],
    icon: SEO_KEYWORD_TYPE_ICONS[SEO_KEYWORD_TYPE.CATEGORY],
    difficulty: SEO_KEYWORD_TYPE_DIFFICULTY[SEO_KEYWORD_TYPE.CATEGORY],
    volume: SEO_KEYWORD_TYPE_VOLUME[SEO_KEYWORD_TYPE.CATEGORY],
    competition: SEO_KEYWORD_TYPE_COMPETITION[SEO_KEYWORD_TYPE.CATEGORY],
    avgWords: 2,
    isBranded: false,
    isSeasonal: false,
    isLocationBased: false,
  },
  [SEO_KEYWORD_TYPE.LOCATION_BASED]: {
    type: SEO_KEYWORD_TYPE.LOCATION_BASED,
    label: SEO_KEYWORD_TYPE_LABELS[SEO_KEYWORD_TYPE.LOCATION_BASED],
    description: SEO_KEYWORD_TYPE_DESCRIPTIONS[SEO_KEYWORD_TYPE.LOCATION_BASED],
    icon: SEO_KEYWORD_TYPE_ICONS[SEO_KEYWORD_TYPE.LOCATION_BASED],
    difficulty: SEO_KEYWORD_TYPE_DIFFICULTY[SEO_KEYWORD_TYPE.LOCATION_BASED],
    volume: SEO_KEYWORD_TYPE_VOLUME[SEO_KEYWORD_TYPE.LOCATION_BASED],
    competition: SEO_KEYWORD_TYPE_COMPETITION[SEO_KEYWORD_TYPE.LOCATION_BASED],
    avgWords: 3,
    isBranded: false,
    isSeasonal: false,
    isLocationBased: true,
  },
  [SEO_KEYWORD_TYPE.SEASONAL]: {
    type: SEO_KEYWORD_TYPE.SEASONAL,
    label: SEO_KEYWORD_TYPE_LABELS[SEO_KEYWORD_TYPE.SEASONAL],
    description: SEO_KEYWORD_TYPE_DESCRIPTIONS[SEO_KEYWORD_TYPE.SEASONAL],
    icon: SEO_KEYWORD_TYPE_ICONS[SEO_KEYWORD_TYPE.SEASONAL],
    difficulty: SEO_KEYWORD_TYPE_DIFFICULTY[SEO_KEYWORD_TYPE.SEASONAL],
    volume: SEO_KEYWORD_TYPE_VOLUME[SEO_KEYWORD_TYPE.SEASONAL],
    competition: SEO_KEYWORD_TYPE_COMPETITION[SEO_KEYWORD_TYPE.SEASONAL],
    avgWords: 3,
    isBranded: false,
    isSeasonal: true,
    isLocationBased: false,
  },
  [SEO_KEYWORD_TYPE.TRENDING]: {
    type: SEO_KEYWORD_TYPE.TRENDING,
    label: SEO_KEYWORD_TYPE_LABELS[SEO_KEYWORD_TYPE.TRENDING],
    description: SEO_KEYWORD_TYPE_DESCRIPTIONS[SEO_KEYWORD_TYPE.TRENDING],
    icon: SEO_KEYWORD_TYPE_ICONS[SEO_KEYWORD_TYPE.TRENDING],
    difficulty: SEO_KEYWORD_TYPE_DIFFICULTY[SEO_KEYWORD_TYPE.TRENDING],
    volume: SEO_KEYWORD_TYPE_VOLUME[SEO_KEYWORD_TYPE.TRENDING],
    competition: SEO_KEYWORD_TYPE_COMPETITION[SEO_KEYWORD_TYPE.TRENDING],
    avgWords: 2,
    isBranded: false,
    isSeasonal: false,
    isLocationBased: false,
  },
} as const;

/**
 * SEO কীওয়ার্ড টাইপ গ্রুপ
 */
export const SEO_KEYWORD_TYPE_GROUPS = {
  LENGTH: [SEO_KEYWORD_TYPE.SHORT_TAIL, SEO_KEYWORD_TYPE.LONG_TAIL] as const,
  BRAND: [SEO_KEYWORD_TYPE.BRANDED, SEO_KEYWORD_TYPE.NON_BRANDED] as const,
  CONTEXT: [SEO_KEYWORD_TYPE.LSI, SEO_KEYWORD_TYPE.PRODUCT, SEO_KEYWORD_TYPE.CATEGORY] as const,
  DYNAMIC: [
    SEO_KEYWORD_TYPE.LOCATION_BASED,
    SEO_KEYWORD_TYPE.SEASONAL,
    SEO_KEYWORD_TYPE.TRENDING,
  ] as const,
} as const;

/**
 * SEO কীওয়ার্ড টাইপ গ্রুপ লেবেল
 */
export const SEO_KEYWORD_TYPE_GROUP_LABELS = {
  LENGTH: 'Keyword Length',
  BRAND: 'Brand Presence',
  CONTEXT: 'Content Context',
  DYNAMIC: 'Dynamic Keywords',
} as const;
