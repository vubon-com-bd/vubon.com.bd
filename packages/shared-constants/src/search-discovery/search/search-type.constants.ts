/**
 * সার্চের ধরণ (Type) সংক্রান্ত কনস্ট্যান্টসমূহ
 */

/**
 * সার্চ টাইপ এনাম
 */
export enum SearchType {
  PRODUCT = 'PRODUCT',
  CATEGORY = 'CATEGORY',
  BRAND = 'BRAND',
  VENDOR = 'VENDOR',
  ALL = 'ALL',
}

/**
 * ডিফল্ট সার্চ টাইপ
 */
export const DEFAULT_SEARCH_TYPE = SearchType.PRODUCT;

/**
 * সার্চ টাইপের লেবেলসমূহ (বাংলায়)
 */
export const SEARCH_TYPE_LABELS: Record<SearchType, string> = {
  [SearchType.PRODUCT]: 'পণ্য',
  [SearchType.CATEGORY]: 'ক্যাটাগরি',
  [SearchType.BRAND]: 'ব্র্যান্ড',
  [SearchType.VENDOR]: 'দোকান',
  [SearchType.ALL]: 'সব',
} as const;

/**
 * সার্চ টাইপের ভ্যালু সমূহ
 */
export const SEARCH_TYPE_VALUES = Object.values(SearchType) as readonly SearchType[];

/**
 * সার্চ টাইপ অপশন (সিলেক্ট ইনপুটের জন্য)
 */
export const SEARCH_TYPE_OPTIONS = SEARCH_TYPE_VALUES.map((type) => ({
  value: type,
  label: SEARCH_TYPE_LABELS[type],
}));

/**
 * সার্চ টাইপ কনফিগারেশন
 */
export type SearchTypeConfig = {
  type: SearchType;
  label: string;
  enabled: boolean;
};

/**
 * ডিফল্ট সার্চ টাইপ কনফিগারেশন
 */
export const DEFAULT_SEARCH_TYPE_CONFIG: SearchTypeConfig = {
  type: DEFAULT_SEARCH_TYPE,
  label: SEARCH_TYPE_LABELS[DEFAULT_SEARCH_TYPE],
  enabled: true,
};
