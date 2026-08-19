/**
 * ফ্যাসেট (শ্রেণিবিভাগ) সংক্রান্ত কনস্ট্যান্টসমূহ
 */

/**
 * ফ্যাসেট ফিল্ডসমূহ
 */
export enum FacetField {
  CATEGORY = 'category',
  BRAND = 'brand',
  PRICE_RANGE = 'price_range',
  RATING = 'rating',
  COLOR = 'color',
  SIZE = 'size',
}

/**
 * ফ্যাসেট টাইপ
 */
export enum FacetType {
  TERM = 'term',
  RANGE = 'range',
  DATE_HISTOGRAM = 'date_histogram',
}

/**
 * ফ্যাসেট অর্ডার
 */
export enum FacetOrder {
  COUNT = 'count',
  TERM = 'term',
  CUSTOM = 'custom',
}

/**
 * ফ্যাসেট ফিল্ড লেবেলসমূহ (বাংলায়)
 */
export const FACET_FIELD_LABELS: Record<FacetField, string> = {
  [FacetField.CATEGORY]: 'ক্যাটাগরি',
  [FacetField.BRAND]: 'ব্র্যান্ড',
  [FacetField.PRICE_RANGE]: 'দামের পরিসীমা',
  [FacetField.RATING]: 'রেটিং',
  [FacetField.COLOR]: 'রং',
  [FacetField.SIZE]: 'সাইজ',
} as const;

/**
 * ফ্যাসেট ফিল্ড লেবেলসমূহ (ইংরেজিতে)
 */
export const FACET_FIELD_LABELS_EN: Record<FacetField, string> = {
  [FacetField.CATEGORY]: 'Category',
  [FacetField.BRAND]: 'Brand',
  [FacetField.PRICE_RANGE]: 'Price Range',
  [FacetField.RATING]: 'Rating',
  [FacetField.COLOR]: 'Color',
  [FacetField.SIZE]: 'Size',
} as const;

/**
 * ফ্যাসেট টাইপ লেবেলসমূহ (বাংলায়)
 */
export const FACET_TYPE_LABELS: Record<FacetType, string> = {
  [FacetType.TERM]: 'টার্ম ফ্যাসেট',
  [FacetType.RANGE]: 'রেঞ্জ ফ্যাসেট',
  [FacetType.DATE_HISTOGRAM]: 'তারিখ হিস্টোগ্রাম',
} as const;

/**
 * ফ্যাসেট টাইপ লেবেলসমূহ (ইংরেজিতে)
 */
export const FACET_TYPE_LABELS_EN: Record<FacetType, string> = {
  [FacetType.TERM]: 'Term Facet',
  [FacetType.RANGE]: 'Range Facet',
  [FacetType.DATE_HISTOGRAM]: 'Date Histogram',
} as const;

/**
 * ফ্যাসেট অর্ডার লেবেলসমূহ (বাংলায়)
 */
export const FACET_ORDER_LABELS: Record<FacetOrder, string> = {
  [FacetOrder.COUNT]: 'কাউন্ট অনুযায়ী',
  [FacetOrder.TERM]: 'টার্ম অনুযায়ী',
  [FacetOrder.CUSTOM]: 'কাস্টম',
} as const;

/**
 * ফ্যাসেট অর্ডার লেবেলসমূহ (ইংরেজিতে)
 */
export const FACET_ORDER_LABELS_EN: Record<FacetOrder, string> = {
  [FacetOrder.COUNT]: 'By Count',
  [FacetOrder.TERM]: 'By Term',
  [FacetOrder.CUSTOM]: 'Custom',
} as const;

/**
 * ডিফল্ট ফ্যাসেট সাইজ
 */
export const DEFAULT_FACET_SIZE = 50;

/**
 * সর্বোচ্চ ফ্যাসেট সাইজ
 */
export const MAX_FACET_SIZE = 1000;

/**
 * ন্যূনতম ফ্যাসেট সাইজ
 */
export const MIN_FACET_SIZE = 1;

/**
 * ডিফল্ট ফ্যাসেট অর্ডার
 */
export const DEFAULT_FACET_ORDER = FacetOrder.COUNT;

/**
 * ফ্যাসেট ফিল্ডের ভ্যালু সমূহ
 */
export const FACET_FIELD_VALUES = Object.values(FacetField) as readonly FacetField[];

/**
 * ফ্যাসেট টাইপের ভ্যালু সমূহ
 */
export const FACET_TYPE_VALUES = Object.values(FacetType) as readonly FacetType[];

/**
 * ফ্যাসেট অর্ডারের ভ্যালু সমূহ
 */
export const FACET_ORDER_VALUES = Object.values(FacetOrder) as readonly FacetOrder[];

/**
 * ফ্যাসেট কনফিগারেশন টাইপ
 */
export type FacetConfig = {
  field: FacetField;
  type: FacetType;
  label: string;
  size: number;
  order: FacetOrder;
  enabled: boolean;
};

/**
 * ফ্যাসেট কনফিগারেশনসমূহ
 */
export const FACET_CONFIGS: Record<FacetField, FacetConfig> = {
  [FacetField.CATEGORY]: {
    field: FacetField.CATEGORY,
    type: FacetType.TERM,
    label: FACET_FIELD_LABELS[FacetField.CATEGORY],
    size: DEFAULT_FACET_SIZE,
    order: FacetOrder.COUNT,
    enabled: true,
  },
  [FacetField.BRAND]: {
    field: FacetField.BRAND,
    type: FacetType.TERM,
    label: FACET_FIELD_LABELS[FacetField.BRAND],
    size: DEFAULT_FACET_SIZE,
    order: FacetOrder.COUNT,
    enabled: true,
  },
  [FacetField.PRICE_RANGE]: {
    field: FacetField.PRICE_RANGE,
    type: FacetType.RANGE,
    label: FACET_FIELD_LABELS[FacetField.PRICE_RANGE],
    size: DEFAULT_FACET_SIZE,
    order: FacetOrder.TERM,
    enabled: true,
  },
  [FacetField.RATING]: {
    field: FacetField.RATING,
    type: FacetType.TERM,
    label: FACET_FIELD_LABELS[FacetField.RATING],
    size: DEFAULT_FACET_SIZE,
    order: FacetOrder.TERM,
    enabled: true,
  },
  [FacetField.COLOR]: {
    field: FacetField.COLOR,
    type: FacetType.TERM,
    label: FACET_FIELD_LABELS[FacetField.COLOR],
    size: DEFAULT_FACET_SIZE,
    order: FacetOrder.COUNT,
    enabled: true,
  },
  [FacetField.SIZE]: {
    field: FacetField.SIZE,
    type: FacetType.TERM,
    label: FACET_FIELD_LABELS[FacetField.SIZE],
    size: DEFAULT_FACET_SIZE,
    order: FacetOrder.COUNT,
    enabled: true,
  },
} as const;

/**
 * ফ্যাসেট রেঞ্জ ডিফল্ট ভ্যালু
 */
export const FACET_RANGE_DEFAULTS = {
  PRICE: {
    intervals: [
      { from: 0, to: 1000, label: '০ - ১০০০' },
      { from: 1000, to: 5000, label: '১০০০ - ৫০০০' },
      { from: 5000, to: 10000, label: '৫০০০ - ১০০০০' },
      { from: 10000, to: 50000, label: '১০০০০ - ৫০০০০' },
      { from: 50000, to: 100000, label: '৫০০০০ - ১০০০০০' },
      { from: 100000, to: Infinity, label: '১০০০০০+' },
    ],
  },
  RATING: {
    intervals: [
      { from: 0, to: 1, label: '০ - ১' },
      { from: 1, to: 2, label: '১ - ২' },
      { from: 2, to: 3, label: '২ - ৩' },
      { from: 3, to: 4, label: '৩ - ৪' },
      { from: 4, to: 5, label: '৪ - ৫' },
    ],
  },
} as const;

/**
 * ফ্যাসেট এরর মেসেজসমূহ
 */
export const FACET_ERROR_MESSAGES = {
  INVALID_FIELD: 'ফ্যাসেট ফিল্ড সঠিক নয়',
  INVALID_TYPE: 'ফ্যাসেট টাইপ সঠিক নয়',
  INVALID_SIZE: `ফ্যাসেট সাইজ ${MIN_FACET_SIZE} থেকে ${MAX_FACET_SIZE} এর মধ্যে হতে হবে`,
  SIZE_TOO_LOW: `ফ্যাসেট সাইজ ${MIN_FACET_SIZE} এর চেয়ে কম হতে পারে না`,
  SIZE_TOO_HIGH: `ফ্যাসেট সাইজ ${MAX_FACET_SIZE} এর চেয়ে বেশি হতে পারে না`,
  INVALID_ORDER: 'ফ্যাসেট অর্ডার সঠিক নয়',
  INVALID_RANGE: 'ফ্যাসেট রেঞ্জ সঠিক নয়',
} as const;
