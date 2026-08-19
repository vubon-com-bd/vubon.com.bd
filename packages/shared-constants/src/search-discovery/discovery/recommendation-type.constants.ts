/**
 * রেকমেন্ডেশনের ধরণ সংক্রান্ত কনস্ট্যান্টসমূহ
 */

/**
 * রেকমেন্ডেশন টাইপ এনাম (পণ্যের ধরণ)
 */
export enum RecommendationItemType {
  PRODUCT = 'product',
  CATEGORY = 'category',
  BRAND = 'brand',
  BUNDLE = 'bundle',
  EDITORIAL = 'editorial',
}

/**
 * রেকমেন্ডেশন টাইপ লেবেলসমূহ (বাংলায়)
 */
export const RECOMMENDATION_ITEM_TYPE_LABELS_BN: Record<RecommendationItemType, string> = {
  [RecommendationItemType.PRODUCT]: 'পণ্য',
  [RecommendationItemType.CATEGORY]: 'ক্যাটাগরি',
  [RecommendationItemType.BRAND]: 'ব্র্যান্ড',
  [RecommendationItemType.BUNDLE]: 'বান্ডল',
  [RecommendationItemType.EDITORIAL]: 'সম্পাদকীয়',
} as const;

/**
 * রেকমেন্ডেশন টাইপ লেবেলসমূহ (ইংরেজিতে)
 */
export const RECOMMENDATION_ITEM_TYPE_LABELS_EN: Record<RecommendationItemType, string> = {
  [RecommendationItemType.PRODUCT]: 'Product',
  [RecommendationItemType.CATEGORY]: 'Category',
  [RecommendationItemType.BRAND]: 'Brand',
  [RecommendationItemType.BUNDLE]: 'Bundle',
  [RecommendationItemType.EDITORIAL]: 'Editorial',
} as const;

/**
 * রেকমেন্ডেশন টাইপ বিবরণ (বাংলায়)
 */
export const RECOMMENDATION_ITEM_TYPE_DESCRIPTIONS_BN: Record<RecommendationItemType, string> = {
  [RecommendationItemType.PRODUCT]: 'পণ্য সম্পর্কিত রেকমেন্ডেশন',
  [RecommendationItemType.CATEGORY]: 'ক্যাটাগরি সম্পর্কিত রেকমেন্ডেশন',
  [RecommendationItemType.BRAND]: 'ব্র্যান্ড সম্পর্কিত রেকমেন্ডেশন',
  [RecommendationItemType.BUNDLE]: 'পণ্যের বান্ডল সম্পর্কিত রেকমেন্ডেশন',
  [RecommendationItemType.EDITORIAL]: 'সম্পাদক দ্বারা নির্বাচিত রেকমেন্ডেশন',
} as const;

/**
 * রেকমেন্ডেশন টাইপ বিবরণ (ইংরেজিতে)
 */
export const RECOMMENDATION_ITEM_TYPE_DESCRIPTIONS_EN: Record<RecommendationItemType, string> = {
  [RecommendationItemType.PRODUCT]: 'Product recommendations',
  [RecommendationItemType.CATEGORY]: 'Category recommendations',
  [RecommendationItemType.BRAND]: 'Brand recommendations',
  [RecommendationItemType.BUNDLE]: 'Product bundle recommendations',
  [RecommendationItemType.EDITORIAL]: 'Editorially selected recommendations',
} as const;

/**
 * রেকমেন্ডেশন টাইপ আইকনসমূহ
 */
export const RECOMMENDATION_ITEM_TYPE_ICONS: Record<RecommendationItemType, string> = {
  [RecommendationItemType.PRODUCT]: '📦',
  [RecommendationItemType.CATEGORY]: '📂',
  [RecommendationItemType.BRAND]: '🏷️',
  [RecommendationItemType.BUNDLE]: '📚',
  [RecommendationItemType.EDITORIAL]: '✍️',
} as const;

/**
 * রেকমেন্ডেশন টাইপ রং
 */
export const RECOMMENDATION_ITEM_TYPE_COLORS: Record<RecommendationItemType, string> = {
  [RecommendationItemType.PRODUCT]: '#4F46E5',
  [RecommendationItemType.CATEGORY]: '#10B981',
  [RecommendationItemType.BRAND]: '#F59E0B',
  [RecommendationItemType.BUNDLE]: '#8B5CF6',
  [RecommendationItemType.EDITORIAL]: '#EC4899',
} as const;

/**
 * ডিফল্ট রেকমেন্ডেশন টাইপ
 */
export const DEFAULT_RECOMMENDATION_ITEM_TYPE = RecommendationItemType.PRODUCT;

/**
 * রেকমেন্ডেশন টাইপের ভ্যালু সমূহ
 */
export const RECOMMENDATION_ITEM_TYPE_VALUES = Object.values(
  RecommendationItemType
) as readonly RecommendationItemType[];

/**
 * রেকমেন্ডেশন টাইপ কনফিগারেশন টাইপ
 */
export type RecommendationItemTypeConfig = {
  type: RecommendationItemType;
  labelBn: string;
  labelEn: string;
  descriptionBn: string;
  descriptionEn: string;
  icon: string;
  color: string;
  enabled: boolean;
};

/**
 * রেকমেন্ডেশন টাইপ কনফিগারেশনসমূহ
 */
export const RECOMMENDATION_ITEM_TYPE_CONFIGS: Record<
  RecommendationItemType,
  RecommendationItemTypeConfig
> = {
  [RecommendationItemType.PRODUCT]: {
    type: RecommendationItemType.PRODUCT,
    labelBn: RECOMMENDATION_ITEM_TYPE_LABELS_BN[RecommendationItemType.PRODUCT],
    labelEn: RECOMMENDATION_ITEM_TYPE_LABELS_EN[RecommendationItemType.PRODUCT],
    descriptionBn: RECOMMENDATION_ITEM_TYPE_DESCRIPTIONS_BN[RecommendationItemType.PRODUCT],
    descriptionEn: RECOMMENDATION_ITEM_TYPE_DESCRIPTIONS_EN[RecommendationItemType.PRODUCT],
    icon: RECOMMENDATION_ITEM_TYPE_ICONS[RecommendationItemType.PRODUCT],
    color: RECOMMENDATION_ITEM_TYPE_COLORS[RecommendationItemType.PRODUCT],
    enabled: true,
  },
  [RecommendationItemType.CATEGORY]: {
    type: RecommendationItemType.CATEGORY,
    labelBn: RECOMMENDATION_ITEM_TYPE_LABELS_BN[RecommendationItemType.CATEGORY],
    labelEn: RECOMMENDATION_ITEM_TYPE_LABELS_EN[RecommendationItemType.CATEGORY],
    descriptionBn: RECOMMENDATION_ITEM_TYPE_DESCRIPTIONS_BN[RecommendationItemType.CATEGORY],
    descriptionEn: RECOMMENDATION_ITEM_TYPE_DESCRIPTIONS_EN[RecommendationItemType.CATEGORY],
    icon: RECOMMENDATION_ITEM_TYPE_ICONS[RecommendationItemType.CATEGORY],
    color: RECOMMENDATION_ITEM_TYPE_COLORS[RecommendationItemType.CATEGORY],
    enabled: true,
  },
  [RecommendationItemType.BRAND]: {
    type: RecommendationItemType.BRAND,
    labelBn: RECOMMENDATION_ITEM_TYPE_LABELS_BN[RecommendationItemType.BRAND],
    labelEn: RECOMMENDATION_ITEM_TYPE_LABELS_EN[RecommendationItemType.BRAND],
    descriptionBn: RECOMMENDATION_ITEM_TYPE_DESCRIPTIONS_BN[RecommendationItemType.BRAND],
    descriptionEn: RECOMMENDATION_ITEM_TYPE_DESCRIPTIONS_EN[RecommendationItemType.BRAND],
    icon: RECOMMENDATION_ITEM_TYPE_ICONS[RecommendationItemType.BRAND],
    color: RECOMMENDATION_ITEM_TYPE_COLORS[RecommendationItemType.BRAND],
    enabled: true,
  },
  [RecommendationItemType.BUNDLE]: {
    type: RecommendationItemType.BUNDLE,
    labelBn: RECOMMENDATION_ITEM_TYPE_LABELS_BN[RecommendationItemType.BUNDLE],
    labelEn: RECOMMENDATION_ITEM_TYPE_LABELS_EN[RecommendationItemType.BUNDLE],
    descriptionBn: RECOMMENDATION_ITEM_TYPE_DESCRIPTIONS_BN[RecommendationItemType.BUNDLE],
    descriptionEn: RECOMMENDATION_ITEM_TYPE_DESCRIPTIONS_EN[RecommendationItemType.BUNDLE],
    icon: RECOMMENDATION_ITEM_TYPE_ICONS[RecommendationItemType.BUNDLE],
    color: RECOMMENDATION_ITEM_TYPE_COLORS[RecommendationItemType.BUNDLE],
    enabled: true,
  },
  [RecommendationItemType.EDITORIAL]: {
    type: RecommendationItemType.EDITORIAL,
    labelBn: RECOMMENDATION_ITEM_TYPE_LABELS_BN[RecommendationItemType.EDITORIAL],
    labelEn: RECOMMENDATION_ITEM_TYPE_LABELS_EN[RecommendationItemType.EDITORIAL],
    descriptionBn: RECOMMENDATION_ITEM_TYPE_DESCRIPTIONS_BN[RecommendationItemType.EDITORIAL],
    descriptionEn: RECOMMENDATION_ITEM_TYPE_DESCRIPTIONS_EN[RecommendationItemType.EDITORIAL],
    icon: RECOMMENDATION_ITEM_TYPE_ICONS[RecommendationItemType.EDITORIAL],
    color: RECOMMENDATION_ITEM_TYPE_COLORS[RecommendationItemType.EDITORIAL],
    enabled: true,
  },
} as const;
