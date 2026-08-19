/**
 * সার্চ ফিল্টার সংক্রান্ত কনস্ট্যান্টসমূহ
 */

/**
 * ফিল্টার টাইপসমূহ
 */
export enum FilterType {
  PRICE_RANGE = 'price_range',
  CATEGORY = 'category',
  BRAND = 'brand',
  RATING = 'rating',
  AVAILABILITY = 'availability',
  COLOR = 'color',
  SIZE = 'size',
}

/**
 * ফিল্টার অপারেটরসমূহ
 */
export enum FilterOperator {
  EQ = 'eq',
  NE = 'ne',
  GT = 'gt',
  GTE = 'gte',
  LT = 'lt',
  LTE = 'lte',
  IN = 'in',
  NIN = 'nin',
  BETWEEN = 'between',
}

/**
 * ফিল্টার লেবেলসমূহ (বাংলায়)
 */
export const FILTER_LABELS: Record<FilterType, string> = {
  [FilterType.PRICE_RANGE]: 'দামের পরিসীমা',
  [FilterType.CATEGORY]: 'ক্যাটাগরি',
  [FilterType.BRAND]: 'ব্র্যান্ড',
  [FilterType.RATING]: 'রেটিং',
  [FilterType.AVAILABILITY]: 'প্রাপ্যতা',
  [FilterType.COLOR]: 'রং',
  [FilterType.SIZE]: 'সাইজ',
} as const;

/**
 * ফিল্টার লেবেলসমূহ (ইংরেজিতে)
 */
export const FILTER_LABELS_EN: Record<FilterType, string> = {
  [FilterType.PRICE_RANGE]: 'Price Range',
  [FilterType.CATEGORY]: 'Category',
  [FilterType.BRAND]: 'Brand',
  [FilterType.RATING]: 'Rating',
  [FilterType.AVAILABILITY]: 'Availability',
  [FilterType.COLOR]: 'Color',
  [FilterType.SIZE]: 'Size',
} as const;

/**
 * ফিল্টার অপারেটর লেবেলসমূহ (বাংলায়)
 */
export const FILTER_OPERATOR_LABELS: Record<FilterOperator, string> = {
  [FilterOperator.EQ]: 'সমান',
  [FilterOperator.NE]: 'সমান নয়',
  [FilterOperator.GT]: 'এর চেয়ে বড়',
  [FilterOperator.GTE]: 'এর চেয়ে বড় বা সমান',
  [FilterOperator.LT]: 'এর চেয়ে ছোট',
  [FilterOperator.LTE]: 'এর চেয়ে ছোট বা সমান',
  [FilterOperator.IN]: 'এর মধ্যে',
  [FilterOperator.NIN]: 'এর মধ্যে নয়',
  [FilterOperator.BETWEEN]: 'এর মধ্যে (শেষ সহ)',
} as const;

/**
 * ডিফল্ট ফিল্টার অপশনসমূহ
 */
export const DEFAULT_FILTER_OPTIONS = {
  PRICE_RANGE: {
    min: 0,
    max: 100000,
    step: 100,
  },
  RATING: {
    min: 0,
    max: 5,
    step: 0.5,
  },
  AVAILABILITY: {
    options: ['in_stock', 'out_of_stock', 'pre_order'] as const,
  },
  COLOR: {
    options: [
      'red',
      'blue',
      'green',
      'yellow',
      'black',
      'white',
      'gray',
      'pink',
      'purple',
      'orange',
    ] as const,
  },
  SIZE: {
    options: ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL'] as const,
  },
} as const;

/**
 * ফিল্টার টাইপের ভ্যালু সমূহ
 */
export const FILTER_TYPE_VALUES = Object.values(FilterType) as readonly FilterType[];

/**
 * ফিল্টার অপারেটরের ভ্যালু সমূহ
 */
export const FILTER_OPERATOR_VALUES = Object.values(FilterOperator) as readonly FilterOperator[];

/**
 * ফিল্টার কনফিগারেশন টাইপ
 */
export type FilterConfig = {
  type: FilterType;
  label: string;
  operators: FilterOperator[];
  multiple?: boolean;
  range?: boolean;
  options?: readonly string[];
};

/**
 * ফিল্টার কনফিগারেশনসমূহ
 */
export const FILTER_CONFIGS: Record<FilterType, FilterConfig> = {
  [FilterType.PRICE_RANGE]: {
    type: FilterType.PRICE_RANGE,
    label: FILTER_LABELS[FilterType.PRICE_RANGE],
    operators: [FilterOperator.GTE, FilterOperator.LTE, FilterOperator.BETWEEN],
    range: true,
  },
  [FilterType.CATEGORY]: {
    type: FilterType.CATEGORY,
    label: FILTER_LABELS[FilterType.CATEGORY],
    operators: [FilterOperator.EQ, FilterOperator.IN],
    multiple: true,
  },
  [FilterType.BRAND]: {
    type: FilterType.BRAND,
    label: FILTER_LABELS[FilterType.BRAND],
    operators: [FilterOperator.EQ, FilterOperator.IN],
    multiple: true,
  },
  [FilterType.RATING]: {
    type: FilterType.RATING,
    label: FILTER_LABELS[FilterType.RATING],
    operators: [FilterOperator.EQ, FilterOperator.GTE, FilterOperator.LTE, FilterOperator.BETWEEN],
    range: true,
  },
  [FilterType.AVAILABILITY]: {
    type: FilterType.AVAILABILITY,
    label: FILTER_LABELS[FilterType.AVAILABILITY],
    operators: [FilterOperator.EQ, FilterOperator.IN],
    options: DEFAULT_FILTER_OPTIONS.AVAILABILITY.options,
    multiple: true,
  },
  [FilterType.COLOR]: {
    type: FilterType.COLOR,
    label: FILTER_LABELS[FilterType.COLOR],
    operators: [FilterOperator.EQ, FilterOperator.IN],
    options: DEFAULT_FILTER_OPTIONS.COLOR.options,
    multiple: true,
  },
  [FilterType.SIZE]: {
    type: FilterType.SIZE,
    label: FILTER_LABELS[FilterType.SIZE],
    operators: [FilterOperator.EQ, FilterOperator.IN],
    options: DEFAULT_FILTER_OPTIONS.SIZE.options,
    multiple: true,
  },
} as const;

/**
 * ফিল্টার ভ্যালিডেশন রুলস
 */
export const FILTER_VALIDATION_RULES = {
  PRICE_RANGE: {
    minValue: 0,
    maxValue: 1000000,
  },
  RATING: {
    minValue: 0,
    maxValue: 5,
  },
  MAX_FILTERS_PER_QUERY: 10,
  MAX_OPERATORS_PER_FILTER: 3,
} as const;

/**
 * ফিল্টার এরর মেসেজসমূহ
 */
export const FILTER_ERROR_MESSAGES = {
  INVALID_TYPE: 'ফিল্টার টাইপ সঠিক নয়',
  INVALID_OPERATOR: 'ফিল্টার অপারেটর সঠিক নয়',
  INVALID_VALUE: 'ফিল্টার ভ্যালু সঠিক নয়',
  MAX_FILTERS_EXCEEDED: `সর্বোচ্চ ${FILTER_VALIDATION_RULES.MAX_FILTERS_PER_QUERY} টি ফিল্টার ব্যবহার করা যাবে`,
  INVALID_RANGE: 'দামের পরিসীমা সঠিক নয়',
  INVALID_RATING: 'রেটিং ০ থেকে ৫ এর মধ্যে হতে হবে',
  INVALID_AVAILABILITY: 'প্রাপ্যতা সঠিক নয়',
  INVALID_COLOR: 'রং সঠিক নয়',
  INVALID_SIZE: 'সাইজ সঠিক নয়',
} as const;

/**
 * ফিল্টার হেল্পার টাইপ
 */
export type FilterValue = string | number | boolean | (string | number)[];

export type FilterCondition = {
  field: FilterType;
  operator: FilterOperator;
  value: FilterValue;
};

export type FilterGroup = {
  operator: 'AND' | 'OR';
  conditions: FilterCondition[];
};
