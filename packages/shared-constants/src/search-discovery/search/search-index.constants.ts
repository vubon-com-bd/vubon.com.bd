/**
 * সার্চ ইন্ডেক্স সংক্রান্ত কনস্ট্যান্টসমূহ
 */

/**
 * ইন্ডেক্স নামসমূহ
 */
export enum IndexName {
  PRODUCTS = 'products',
  CATEGORIES = 'categories',
  BRANDS = 'brands',
  VENDORS = 'vendors',
  VARIANTS = 'variants',
}

/**
 * ইন্ডেক্স অ্যালিয়াসসমূহ
 */
export enum IndexAlias {
  SEARCH = 'search_alias',
  REINDEX = 'reindex_alias',
}

/**
 * ইন্ডেক্স নাম লেবেলসমূহ (বাংলায়)
 */
export const INDEX_NAME_LABELS: Record<IndexName, string> = {
  [IndexName.PRODUCTS]: 'পণ্য',
  [IndexName.CATEGORIES]: 'ক্যাটাগরি',
  [IndexName.BRANDS]: 'ব্র্যান্ড',
  [IndexName.VENDORS]: 'দোকান',
  [IndexName.VARIANTS]: 'ভেরিয়েন্ট',
} as const;

/**
 * ইন্ডেক্স নাম লেবেলসমূহ (ইংরেজিতে)
 */
export const INDEX_NAME_LABELS_EN: Record<IndexName, string> = {
  [IndexName.PRODUCTS]: 'Products',
  [IndexName.CATEGORIES]: 'Categories',
  [IndexName.BRANDS]: 'Brands',
  [IndexName.VENDORS]: 'Vendors',
  [IndexName.VARIANTS]: 'Variants',
} as const;

/**
 * ইন্ডেক্স অ্যালিয়াস লেবেলসমূহ (বাংলায়)
 */
export const INDEX_ALIAS_LABELS: Record<IndexAlias, string> = {
  [IndexAlias.SEARCH]: 'সার্চ অ্যালিয়াস',
  [IndexAlias.REINDEX]: 'রিইন্ডেক্স অ্যালিয়াস',
} as const;

/**
 * ইন্ডেক্স অ্যালিয়াস লেবেলসমূহ (ইংরেজিতে)
 */
export const INDEX_ALIAS_LABELS_EN: Record<IndexAlias, string> = {
  [IndexAlias.SEARCH]: 'Search Alias',
  [IndexAlias.REINDEX]: 'Reindex Alias',
} as const;

/**
 * ডিফল্ট ইন্ডেক্স সেটিংস
 */
export const DEFAULT_INDEX_SETTINGS = {
  number_of_shards: 2,
  number_of_replicas: 1,
  refresh_interval: '1s',
  max_result_window: 10000,
  analysis: {
    analyzer: {
      default: {
        type: 'standard',
      },
      bengali_analyzer: {
        type: 'custom',
        tokenizer: 'standard',
        filter: ['lowercase', 'bengali_stemmer', 'bengali_stop'],
      },
    },
    filter: {
      bengali_stemmer: {
        type: 'stemmer',
        language: 'bengali',
      },
      bengali_stop: {
        type: 'stop',
        stopwords: '_bengali_',
      },
    },
  },
} as const;

/**
 * ম্যাক্সিমাম ইন্ডেক্স ফিল্ড
 */
export const MAX_INDEX_FIELDS = 1000;

/**
 * ন্যূনতম ইন্ডেক্স ফিল্ড
 */
export const MIN_INDEX_FIELDS = 1;

/**
 * ইন্ডেক্স রিফ্রেশ ইন্টারভাল (সেকেন্ডে)
 */
export const INDEX_REFRESH_INTERVAL_SECONDS = 1;

/**
 * ইন্ডেক্স রিফ্রেশ ইন্টারভাল অপশনসমূহ
 */
export const INDEX_REFRESH_INTERVAL_OPTIONS = {
  REAL_TIME: '1s',
  FAST: '5s',
  NORMAL: '30s',
  SLOW: '60s',
  DISABLED: '-1',
} as const;

/**
 * ইন্ডেক্স নামের ভ্যালু সমূহ
 */
export const INDEX_NAME_VALUES = Object.values(IndexName) as readonly IndexName[];

/**
 * ইন্ডেক্স অ্যালিয়াসের ভ্যালু সমূহ
 */
export const INDEX_ALIAS_VALUES = Object.values(IndexAlias) as readonly IndexAlias[];

/**
 * ডিফল্ট ইন্ডেক্স নাম
 */
export const DEFAULT_INDEX_NAME = IndexName.PRODUCTS;

/**
 * ডিফল্ট ইন্ডেক্স অ্যালিয়াস
 */
export const DEFAULT_INDEX_ALIAS = IndexAlias.SEARCH;

/**
 * ইন্ডেক্স কনফিগারেশন টাইপ
 */
export type IndexConfig = {
  name: IndexName;
  alias: IndexAlias;
  label: string;
  settings: typeof DEFAULT_INDEX_SETTINGS;
  maxFields: number;
  refreshInterval: string;
  enabled: boolean;
};

/**
 * ইন্ডেক্স কনফিগারেশনসমূহ
 */
export const INDEX_CONFIGS: Record<IndexName, IndexConfig> = {
  [IndexName.PRODUCTS]: {
    name: IndexName.PRODUCTS,
    alias: IndexAlias.SEARCH,
    label: INDEX_NAME_LABELS[IndexName.PRODUCTS],
    settings: DEFAULT_INDEX_SETTINGS,
    maxFields: MAX_INDEX_FIELDS,
    refreshInterval: INDEX_REFRESH_INTERVAL_OPTIONS.NORMAL,
    enabled: true,
  },
  [IndexName.CATEGORIES]: {
    name: IndexName.CATEGORIES,
    alias: IndexAlias.SEARCH,
    label: INDEX_NAME_LABELS[IndexName.CATEGORIES],
    settings: DEFAULT_INDEX_SETTINGS,
    maxFields: MAX_INDEX_FIELDS,
    refreshInterval: INDEX_REFRESH_INTERVAL_OPTIONS.NORMAL,
    enabled: true,
  },
  [IndexName.BRANDS]: {
    name: IndexName.BRANDS,
    alias: IndexAlias.SEARCH,
    label: INDEX_NAME_LABELS[IndexName.BRANDS],
    settings: DEFAULT_INDEX_SETTINGS,
    maxFields: MAX_INDEX_FIELDS,
    refreshInterval: INDEX_REFRESH_INTERVAL_OPTIONS.NORMAL,
    enabled: true,
  },
  [IndexName.VENDORS]: {
    name: IndexName.VENDORS,
    alias: IndexAlias.SEARCH,
    label: INDEX_NAME_LABELS[IndexName.VENDORS],
    settings: DEFAULT_INDEX_SETTINGS,
    maxFields: MAX_INDEX_FIELDS,
    refreshInterval: INDEX_REFRESH_INTERVAL_OPTIONS.NORMAL,
    enabled: true,
  },
  [IndexName.VARIANTS]: {
    name: IndexName.VARIANTS,
    alias: IndexAlias.SEARCH,
    label: INDEX_NAME_LABELS[IndexName.VARIANTS],
    settings: DEFAULT_INDEX_SETTINGS,
    maxFields: MAX_INDEX_FIELDS,
    refreshInterval: INDEX_REFRESH_INTERVAL_OPTIONS.NORMAL,
    enabled: true,
  },
} as const;

/**
 * ইন্ডেক্স ম্যাপিং টাইপ
 */
export type IndexMapping = {
  properties: Record<
    string,
    {
      type: string;
      analyzer?: string;
      search_analyzer?: string;
      fields?: Record<
        string,
        {
          type: string;
          analyzer?: string;
        }
      >;
    }
  >;
};

/**
 * ইন্ডেক্স এরর মেসেজসমূহ
 */
export const INDEX_ERROR_MESSAGES = {
  INVALID_NAME: 'ইন্ডেক্স নাম সঠিক নয়',
  INVALID_ALIAS: 'ইন্ডেক্স অ্যালিয়াস সঠিক নয়',
  TOO_MANY_FIELDS: `ইন্ডেক্স ফিল্ড ${MAX_INDEX_FIELDS} এর বেশি হতে পারে না`,
  TOO_FEW_FIELDS: `ইন্ডেক্স ফিল্ড ${MIN_INDEX_FIELDS} এর কম হতে পারে না`,
  INVALID_SETTINGS: 'ইন্ডেক্স সেটিংস সঠিক নয়',
  INDEX_NOT_FOUND: 'ইন্ডেক্স পাওয়া যায়নি',
  ALIAS_NOT_FOUND: 'ইন্ডেক্স অ্যালিয়াস পাওয়া যায়নি',
  REINDEX_FAILED: 'রিইন্ডেক্সিং ব্যর্থ হয়েছে',
} as const;
