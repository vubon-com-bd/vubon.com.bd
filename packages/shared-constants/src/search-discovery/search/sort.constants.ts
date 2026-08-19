/**
 * সর্টিং সংক্রান্ত কনস্ট্যান্টসমূহ
 */

/**
 * সর্ট অপশনসমূহ
 */
export enum SortOption {
  RELEVANCE = 'relevance',
  PRICE_LOW_TO_HIGH = 'price_low_to_high',
  PRICE_HIGH_TO_LOW = 'price_high_to_low',
  RATING = 'rating',
  NEWEST = 'newest',
  POPULARITY = 'popularity',
}

/**
 * সর্ট লেবেলসমূহ (বাংলায়)
 */
export const SORT_OPTION_LABELS: Record<SortOption, string> = {
  [SortOption.RELEVANCE]: 'সবচেয়ে প্রাসঙ্গিক',
  [SortOption.PRICE_LOW_TO_HIGH]: 'দাম: কম থেকে বেশি',
  [SortOption.PRICE_HIGH_TO_LOW]: 'দাম: বেশি থেকে কম',
  [SortOption.RATING]: 'রেটিং',
  [SortOption.NEWEST]: 'নতুন',
  [SortOption.POPULARITY]: 'জনপ্রিয়তা',
} as const;

/**
 * সর্ট লেবেলসমূহ (ইংরেজিতে)
 */
export const SORT_OPTION_LABELS_EN: Record<SortOption, string> = {
  [SortOption.RELEVANCE]: 'Most Relevant',
  [SortOption.PRICE_LOW_TO_HIGH]: 'Price: Low to High',
  [SortOption.PRICE_HIGH_TO_LOW]: 'Price: High to Low',
  [SortOption.RATING]: 'Rating',
  [SortOption.NEWEST]: 'Newest',
  [SortOption.POPULARITY]: 'Popularity',
} as const;

/**
 * সর্ট আইকনসমূহ
 */
export const SORT_OPTION_ICONS: Record<SortOption, string> = {
  [SortOption.RELEVANCE]: '📊',
  [SortOption.PRICE_LOW_TO_HIGH]: '⬆️💰',
  [SortOption.PRICE_HIGH_TO_LOW]: '⬇️💰',
  [SortOption.RATING]: '⭐',
  [SortOption.NEWEST]: '🆕',
  [SortOption.POPULARITY]: '🔥',
} as const;

/**
 * সর্ট বিবরণসমূহ (বাংলায়)
 */
export const SORT_OPTION_DESCRIPTIONS: Record<SortOption, string> = {
  [SortOption.RELEVANCE]: 'সার্চের সাথে সবচেয়ে প্রাসঙ্গিক পণ্য দেখায়',
  [SortOption.PRICE_LOW_TO_HIGH]: 'সবচেয়ে কম দাম থেকে বেশি দামের দিকে',
  [SortOption.PRICE_HIGH_TO_LOW]: 'সবচেয়ে বেশি দাম থেকে কম দামের দিকে',
  [SortOption.RATING]: 'সর্বোচ্চ রেটিং থেকে নিম্ন রেটিংয়ের দিকে',
  [SortOption.NEWEST]: 'সর্বশেষ যোগকৃত পণ্য থেকে পুরোনোর দিকে',
  [SortOption.POPULARITY]: 'সর্বোচ্চ জনপ্রিয়তা থেকে নিম্ন জনপ্রিয়তার দিকে',
} as const;

/**
 * সর্ট বিবরণসমূহ (ইংরেজিতে)
 */
export const SORT_OPTION_DESCRIPTIONS_EN: Record<SortOption, string> = {
  [SortOption.RELEVANCE]: 'Shows most relevant products for the search',
  [SortOption.PRICE_LOW_TO_HIGH]: 'From lowest to highest price',
  [SortOption.PRICE_HIGH_TO_LOW]: 'From highest to lowest price',
  [SortOption.RATING]: 'From highest to lowest rating',
  [SortOption.NEWEST]: 'From newest to oldest products',
  [SortOption.POPULARITY]: 'From most to least popular',
} as const;

/**
 * ডিফল্ট সর্ট অপশন
 */
export const DEFAULT_SORT_OPTION = SortOption.RELEVANCE;

/**
 * সর্ট অপশনের ভ্যালু সমূহ
 */
export const SORT_OPTION_VALUES = Object.values(SortOption) as readonly SortOption[];

/**
 * সর্ট অপশন গ্রুপসমূহ
 */
export const SORT_OPTION_GROUPS = {
  RECOMMENDED: [SortOption.RELEVANCE, SortOption.POPULARITY],
  PRICE: [SortOption.PRICE_LOW_TO_HIGH, SortOption.PRICE_HIGH_TO_LOW],
  QUALITY: [SortOption.RATING, SortOption.NEWEST],
} as const;

/**
 * সর্ট কনফিগারেশন টাইপ
 */
export type SortConfig = {
  option: SortOption;
  label: string;
  labelEn: string;
  icon: string;
  description: string;
  descriptionEn: string;
  enabled: boolean;
};

/**
 * সর্ট কনফিগারেশনসমূহ
 */
export const SORT_CONFIGS: Record<SortOption, SortConfig> = {
  [SortOption.RELEVANCE]: {
    option: SortOption.RELEVANCE,
    label: SORT_OPTION_LABELS[SortOption.RELEVANCE],
    labelEn: SORT_OPTION_LABELS_EN[SortOption.RELEVANCE],
    icon: SORT_OPTION_ICONS[SortOption.RELEVANCE],
    description: SORT_OPTION_DESCRIPTIONS[SortOption.RELEVANCE],
    descriptionEn: SORT_OPTION_DESCRIPTIONS_EN[SortOption.RELEVANCE],
    enabled: true,
  },
  [SortOption.PRICE_LOW_TO_HIGH]: {
    option: SortOption.PRICE_LOW_TO_HIGH,
    label: SORT_OPTION_LABELS[SortOption.PRICE_LOW_TO_HIGH],
    labelEn: SORT_OPTION_LABELS_EN[SortOption.PRICE_LOW_TO_HIGH],
    icon: SORT_OPTION_ICONS[SortOption.PRICE_LOW_TO_HIGH],
    description: SORT_OPTION_DESCRIPTIONS[SortOption.PRICE_LOW_TO_HIGH],
    descriptionEn: SORT_OPTION_DESCRIPTIONS_EN[SortOption.PRICE_LOW_TO_HIGH],
    enabled: true,
  },
  [SortOption.PRICE_HIGH_TO_LOW]: {
    option: SortOption.PRICE_HIGH_TO_LOW,
    label: SORT_OPTION_LABELS[SortOption.PRICE_HIGH_TO_LOW],
    labelEn: SORT_OPTION_LABELS_EN[SortOption.PRICE_HIGH_TO_LOW],
    icon: SORT_OPTION_ICONS[SortOption.PRICE_HIGH_TO_LOW],
    description: SORT_OPTION_DESCRIPTIONS[SortOption.PRICE_HIGH_TO_LOW],
    descriptionEn: SORT_OPTION_DESCRIPTIONS_EN[SortOption.PRICE_HIGH_TO_LOW],
    enabled: true,
  },
  [SortOption.RATING]: {
    option: SortOption.RATING,
    label: SORT_OPTION_LABELS[SortOption.RATING],
    labelEn: SORT_OPTION_LABELS_EN[SortOption.RATING],
    icon: SORT_OPTION_ICONS[SortOption.RATING],
    description: SORT_OPTION_DESCRIPTIONS[SortOption.RATING],
    descriptionEn: SORT_OPTION_DESCRIPTIONS_EN[SortOption.RATING],
    enabled: true,
  },
  [SortOption.NEWEST]: {
    option: SortOption.NEWEST,
    label: SORT_OPTION_LABELS[SortOption.NEWEST],
    labelEn: SORT_OPTION_LABELS_EN[SortOption.NEWEST],
    icon: SORT_OPTION_ICONS[SortOption.NEWEST],
    description: SORT_OPTION_DESCRIPTIONS[SortOption.NEWEST],
    descriptionEn: SORT_OPTION_DESCRIPTIONS_EN[SortOption.NEWEST],
    enabled: true,
  },
  [SortOption.POPULARITY]: {
    option: SortOption.POPULARITY,
    label: SORT_OPTION_LABELS[SortOption.POPULARITY],
    labelEn: SORT_OPTION_LABELS_EN[SortOption.POPULARITY],
    icon: SORT_OPTION_ICONS[SortOption.POPULARITY],
    description: SORT_OPTION_DESCRIPTIONS[SortOption.POPULARITY],
    descriptionEn: SORT_OPTION_DESCRIPTIONS_EN[SortOption.POPULARITY],
    enabled: true,
  },
} as const;

/**
 * সর্ট এরর মেসেজসমূহ
 */
export const SORT_ERROR_MESSAGES = {
  INVALID_OPTION: 'সর্ট অপশন সঠিক নয়',
  INVALID_DIRECTION: 'সর্ট ডিরেকশন সঠিক নয়',
  INVALID_FIELD: 'সর্ট ফিল্ড সঠিক নয়',
  SORT_NOT_AVAILABLE: 'এই সর্ট অপশন উপলব্ধ নয়',
} as const;
