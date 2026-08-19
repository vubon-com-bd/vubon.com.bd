/**
 * কমপ্লিমেন্টারি (পরিপূরক) আইটেম সংক্রান্ত কনস্ট্যান্টসমূহ
 */

/**
 * কমপ্লিমেন্টারি আইটেম টাইপ
 */
export enum ComplementaryItemType {
  ACCESSORY = 'accessory',
  SERVICE = 'service',
  SPARE_PART = 'spare_part',
}

/**
 * সিমিলারিটি মেট্রিক
 */
export enum SimilarityMetric {
  COSINE = 'cosine',
  JACCARD = 'jaccard',
  EUCLIDEAN = 'euclidean',
}

/**
 * কমপ্লিমেন্টারি আইটেম টাইপ লেবেলসমূহ (বাংলায়)
 */
export const COMPLEMENTARY_ITEM_TYPE_LABELS_BN: Record<ComplementaryItemType, string> = {
  [ComplementaryItemType.ACCESSORY]: 'অ্যাক্সেসরি',
  [ComplementaryItemType.SERVICE]: 'সার্ভিস',
  [ComplementaryItemType.SPARE_PART]: 'খুচরা যন্ত্রাংশ',
} as const;

/**
 * কমপ্লিমেন্টারি আইটেম টাইপ লেবেলসমূহ (ইংরেজিতে)
 */
export const COMPLEMENTARY_ITEM_TYPE_LABELS_EN: Record<ComplementaryItemType, string> = {
  [ComplementaryItemType.ACCESSORY]: 'Accessory',
  [ComplementaryItemType.SERVICE]: 'Service',
  [ComplementaryItemType.SPARE_PART]: 'Spare Part',
} as const;

/**
 * সিমিলারিটি মেট্রিক লেবেলসমূহ (বাংলায়)
 */
export const SIMILARITY_METRIC_LABELS_BN: Record<SimilarityMetric, string> = {
  [SimilarityMetric.COSINE]: 'কোসাইন',
  [SimilarityMetric.JACCARD]: 'জ্যাকার্ড',
  [SimilarityMetric.EUCLIDEAN]: 'ইউক্লিডিয়ান',
} as const;

/**
 * সিমিলারিটি মেট্রিক লেবেলসমূহ (ইংরেজিতে)
 */
export const SIMILARITY_METRIC_LABELS_EN: Record<SimilarityMetric, string> = {
  [SimilarityMetric.COSINE]: 'Cosine',
  [SimilarityMetric.JACCARD]: 'Jaccard',
  [SimilarityMetric.EUCLIDEAN]: 'Euclidean',
} as const;

/**
 * মিনিমাম সিমিলারিটি স্কোর
 */
export const MIN_SIMILARITY_SCORE = 0.5;

/**
 * সর্বোচ্চ সিমিলারিটি স্কোর
 */
export const MAX_SIMILARITY_SCORE = 1.0;

/**
 * ডিফল্ট প্রদর্শন সংখ্যা
 */
export const DEFAULT_COMPLEMENTARY_DISPLAY_COUNT = 6;

/**
 * সর্বোচ্চ প্রদর্শন সংখ্যা
 */
export const MAX_COMPLEMENTARY_DISPLAY_COUNT = 20;

/**
 * ন্যূনতম প্রদর্শন সংখ্যা
 */
export const MIN_COMPLEMENTARY_DISPLAY_COUNT = 1;

/**
 * ডিফল্ট সিমিলারিটি মেট্রিক
 */
export const DEFAULT_SIMILARITY_METRIC = SimilarityMetric.COSINE;

/**
 * সিমিলারিটি মেট্রিকের ভ্যালু সমূহ
 */
export const SIMILARITY_METRIC_VALUES = Object.values(
  SimilarityMetric
) as readonly SimilarityMetric[];

/**
 * কমপ্লিমেন্টারি আইটেম টাইপের ভ্যালু সমূহ
 */
export const COMPLEMENTARY_ITEM_TYPE_VALUES = Object.values(
  ComplementaryItemType
) as readonly ComplementaryItemType[];

/**
 * কমপ্লিমেন্টারি কনফিগারেশন টাইপ
 */
export type ComplementaryConfig = {
  itemType: ComplementaryItemType;
  labelBn: string;
  labelEn: string;
  similarityMetric: SimilarityMetric;
  minSimilarityScore: number;
  maxSimilarityScore: number;
  defaultDisplayCount: number;
  maxDisplayCount: number;
  enabled: boolean;
};

/**
 * কমপ্লিমেন্টারি কনফিগারেশনসমূহ
 */
export const COMPLEMENTARY_CONFIGS: Record<ComplementaryItemType, ComplementaryConfig> = {
  [ComplementaryItemType.ACCESSORY]: {
    itemType: ComplementaryItemType.ACCESSORY,
    labelBn: COMPLEMENTARY_ITEM_TYPE_LABELS_BN[ComplementaryItemType.ACCESSORY],
    labelEn: COMPLEMENTARY_ITEM_TYPE_LABELS_EN[ComplementaryItemType.ACCESSORY],
    similarityMetric: DEFAULT_SIMILARITY_METRIC,
    minSimilarityScore: MIN_SIMILARITY_SCORE,
    maxSimilarityScore: MAX_SIMILARITY_SCORE,
    defaultDisplayCount: DEFAULT_COMPLEMENTARY_DISPLAY_COUNT,
    maxDisplayCount: MAX_COMPLEMENTARY_DISPLAY_COUNT,
    enabled: true,
  },
  [ComplementaryItemType.SERVICE]: {
    itemType: ComplementaryItemType.SERVICE,
    labelBn: COMPLEMENTARY_ITEM_TYPE_LABELS_BN[ComplementaryItemType.SERVICE],
    labelEn: COMPLEMENTARY_ITEM_TYPE_LABELS_EN[ComplementaryItemType.SERVICE],
    similarityMetric: DEFAULT_SIMILARITY_METRIC,
    minSimilarityScore: MIN_SIMILARITY_SCORE,
    maxSimilarityScore: MAX_SIMILARITY_SCORE,
    defaultDisplayCount: DEFAULT_COMPLEMENTARY_DISPLAY_COUNT,
    maxDisplayCount: MAX_COMPLEMENTARY_DISPLAY_COUNT,
    enabled: true,
  },
  [ComplementaryItemType.SPARE_PART]: {
    itemType: ComplementaryItemType.SPARE_PART,
    labelBn: COMPLEMENTARY_ITEM_TYPE_LABELS_BN[ComplementaryItemType.SPARE_PART],
    labelEn: COMPLEMENTARY_ITEM_TYPE_LABELS_EN[ComplementaryItemType.SPARE_PART],
    similarityMetric: DEFAULT_SIMILARITY_METRIC,
    minSimilarityScore: MIN_SIMILARITY_SCORE,
    maxSimilarityScore: MAX_SIMILARITY_SCORE,
    defaultDisplayCount: DEFAULT_COMPLEMENTARY_DISPLAY_COUNT,
    maxDisplayCount: MAX_COMPLEMENTARY_DISPLAY_COUNT,
    enabled: true,
  },
} as const;

/**
 * কমপ্লিমেন্টারি আইটেম টাইপ
 */
export type ComplementaryItem = {
  id: string;
  type: ComplementaryItemType;
  similarityScore: number;
  metadata?: Record<string, unknown>;
};

/**
 * কমপ্লিমেন্টারি রেসপন্স টাইপ
 */
export type ComplementaryResponse = {
  items: ComplementaryItem[];
  total: number;
  metric: SimilarityMetric;
  took: number;
};

/**
 * কমপ্লিমেন্টারি এরর মেসেজসমূহ
 */
export const COMPLEMENTARY_ERROR_MESSAGES = {
  INVALID_ITEM_TYPE: 'কমপ্লিমেন্টারি আইটেম টাইপ সঠিক নয়',
  INVALID_METRIC: 'সিমিলারিটি মেট্রিক সঠিক নয়',
  INVALID_SIMILARITY: `সিমিলারিটি স্কোর ${MIN_SIMILARITY_SCORE} থেকে ${MAX_SIMILARITY_SCORE} এর মধ্যে হতে হবে`,
  SIMILARITY_TOO_LOW: `সিমিলারিটি স্কোর ${MIN_SIMILARITY_SCORE} এর চেয়ে কম হতে পারে না`,
  INVALID_COUNT: `প্রদর্শন সংখ্যা ${MIN_COMPLEMENTARY_DISPLAY_COUNT} থেকে ${MAX_COMPLEMENTARY_DISPLAY_COUNT} এর মধ্যে হতে হবে`,
  COUNT_TOO_LOW: `প্রদর্শন সংখ্যা ${MIN_COMPLEMENTARY_DISPLAY_COUNT} এর চেয়ে কম হতে পারে না`,
  COUNT_TOO_HIGH: `প্রদর্শন সংখ্যা ${MAX_COMPLEMENTARY_DISPLAY_COUNT} এর চেয়ে বেশি হতে পারে না`,
  NO_COMPLEMENTARY_ITEMS: 'কোনো কমপ্লিমেন্টারি আইটেম পাওয়া যায়নি',
} as const;
