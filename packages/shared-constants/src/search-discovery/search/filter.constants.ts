/**
 * ফিল্টার সংক্রান্ত কনস্ট্যান্টসমূহ
 */

/**
 * ফিল্টার টাইপ
 */
export enum FilterUIType {
  CHECKBOX = 'checkbox',
  RADIO = 'radio',
  RANGE = 'range',
  DROPDOWN = 'dropdown',
  TAGS = 'tags',
}

/**
 * ফিল্টার ডিফল্ট স্টেট
 */
export enum FilterDefaultState {
  EXPANDED = 'expanded',
  COLLAPSED = 'collapsed',
}

/**
 * ফিল্টার টাইপ লেবেলসমূহ (বাংলায়)
 */
export const FILTER_UI_TYPE_LABELS: Record<FilterUIType, string> = {
  [FilterUIType.CHECKBOX]: 'চেকবক্স',
  [FilterUIType.RADIO]: 'রেডিও',
  [FilterUIType.RANGE]: 'রেঞ্জ',
  [FilterUIType.DROPDOWN]: 'ড্রপডাউন',
  [FilterUIType.TAGS]: 'ট্যাগ',
} as const;

/**
 * ফিল্টার টাইপ লেবেলসমূহ (ইংরেজিতে)
 */
export const FILTER_UI_TYPE_LABELS_EN: Record<FilterUIType, string> = {
  [FilterUIType.CHECKBOX]: 'Checkbox',
  [FilterUIType.RADIO]: 'Radio',
  [FilterUIType.RANGE]: 'Range',
  [FilterUIType.DROPDOWN]: 'Dropdown',
  [FilterUIType.TAGS]: 'Tags',
} as const;

/**
 * ফিল্টার ডিফল্ট স্টেট লেবেলসমূহ (বাংলায়)
 */
export const FILTER_DEFAULT_STATE_LABELS: Record<FilterDefaultState, string> = {
  [FilterDefaultState.EXPANDED]: 'বিস্তারিত',
  [FilterDefaultState.COLLAPSED]: 'সংক্ষিপ্ত',
} as const;

/**
 * ফিল্টার ডিফল্ট স্টেট লেবেলসমূহ (ইংরেজিতে)
 */
export const FILTER_DEFAULT_STATE_LABELS_EN: Record<FilterDefaultState, string> = {
  [FilterDefaultState.EXPANDED]: 'Expanded',
  [FilterDefaultState.COLLAPSED]: 'Collapsed',
} as const;

/**
 * ফিল্টার অ্যাপ্লাই বাটনের টেক্সট
 */
export const FILTER_APPLY_BUTTON_TEXT = 'ফিল্টার প্রয়োগ করুন';
export const FILTER_APPLY_BUTTON_TEXT_EN = 'Apply Filters';

/**
 * ফিল্টার ক্লিয়ার বাটনের টেক্সট
 */
export const FILTER_CLEAR_BUTTON_TEXT = 'ফিল্টার মুছুন';
export const FILTER_CLEAR_BUTTON_TEXT_EN = 'Clear Filters';

/**
 * ফিল্টার রিসেট বাটনের টেক্সট
 */
export const FILTER_RESET_BUTTON_TEXT = 'সব ফিল্টার রিসেট';
export const FILTER_RESET_BUTTON_TEXT_EN = 'Reset All Filters';

/**
 * ফিল্টার টাইটেলসমূহ (বাংলায়)
 */
export const FILTER_TITLES: Record<string, string> = {
  CATEGORY: 'ক্যাটাগরি',
  BRAND: 'ব্র্যান্ড',
  PRICE: 'দাম',
  RATING: 'রেটিং',
  COLOR: 'রং',
  SIZE: 'সাইজ',
  AVAILABILITY: 'প্রাপ্যতা',
  DISCOUNT: 'ডিসকাউন্ট',
  DELIVERY: 'ডেলিভারি',
} as const;

/**
 * ফিল্টার টাইটেলসমূহ (ইংরেজিতে)
 */
export const FILTER_TITLES_EN: Record<string, string> = {
  CATEGORY: 'Category',
  BRAND: 'Brand',
  PRICE: 'Price',
  RATING: 'Rating',
  COLOR: 'Color',
  SIZE: 'Size',
  AVAILABILITY: 'Availability',
  DISCOUNT: 'Discount',
  DELIVERY: 'Delivery',
} as const;

/**
 * ফিল্টার প্লেসহোল্ডার টেক্সট
 */
export const FILTER_PLACEHOLDER_TEXT = 'ফিল্টার করুন...';
export const FILTER_PLACEHOLDER_TEXT_EN = 'Filter...';

/**
 * ফিল্টার টাইপের ভ্যালু সমূহ
 */
export const FILTER_UI_TYPE_VALUES = Object.values(FilterUIType) as readonly FilterUIType[];

/**
 * ফিল্টার ডিফল্ট স্টেটের ভ্যালু সমূহ
 */
export const FILTER_DEFAULT_STATE_VALUES = Object.values(
  FilterDefaultState
) as readonly FilterDefaultState[];

/**
 * ডিফল্ট ফিল্টার স্টেট
 */
export const DEFAULT_FILTER_STATE = FilterDefaultState.EXPANDED;

/**
 * ফিল্টার কনফিগারেশন টাইপ
 */
export type FilterUIConfig = {
  type: FilterUIType;
  label: string;
  defaultState: FilterDefaultState;
  multiple: boolean;
  searchable: boolean;
  collapsible: boolean;
  placeholder?: string;
};

/**
 * ফিল্টার কনফিগারেশনসমূহ
 */
export const FILTER_UI_CONFIGS: Record<FilterUIType, FilterUIConfig> = {
  [FilterUIType.CHECKBOX]: {
    type: FilterUIType.CHECKBOX,
    label: FILTER_UI_TYPE_LABELS[FilterUIType.CHECKBOX],
    defaultState: FilterDefaultState.EXPANDED,
    multiple: true,
    searchable: false,
    collapsible: true,
  },
  [FilterUIType.RADIO]: {
    type: FilterUIType.RADIO,
    label: FILTER_UI_TYPE_LABELS[FilterUIType.RADIO],
    defaultState: FilterDefaultState.EXPANDED,
    multiple: false,
    searchable: false,
    collapsible: true,
  },
  [FilterUIType.RANGE]: {
    type: FilterUIType.RANGE,
    label: FILTER_UI_TYPE_LABELS[FilterUIType.RANGE],
    defaultState: FilterDefaultState.EXPANDED,
    multiple: false,
    searchable: false,
    collapsible: true,
  },
  [FilterUIType.DROPDOWN]: {
    type: FilterUIType.DROPDOWN,
    label: FILTER_UI_TYPE_LABELS[FilterUIType.DROPDOWN],
    defaultState: FilterDefaultState.COLLAPSED,
    multiple: true,
    searchable: true,
    collapsible: true,
    placeholder: FILTER_PLACEHOLDER_TEXT,
  },
  [FilterUIType.TAGS]: {
    type: FilterUIType.TAGS,
    label: FILTER_UI_TYPE_LABELS[FilterUIType.TAGS],
    defaultState: FilterDefaultState.EXPANDED,
    multiple: true,
    searchable: false,
    collapsible: true,
  },
} as const;

/**
 * ফিল্টার এরর মেসেজসমূহ
 */
export const FILTER_ERROR_MESSAGES = {
  INVALID_TYPE: 'ফিল্টার টাইপ সঠিক নয়',
  INVALID_STATE: 'ফিল্টার স্টেট সঠিক নয়',
  INVALID_UI_CONFIG: 'ফিল্টার UI কনফিগারেশন সঠিক নয়',
  NO_FILTERS_APPLIED: 'কোনো ফিল্টার প্রয়োগ করা হয়নি',
  TOO_MANY_FILTERS: 'অনেক বেশি ফিল্টার প্রয়োগ করা হয়েছে',
} as const;
