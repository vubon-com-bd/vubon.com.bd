/**
 * সার্চ সর্টিং অপশন সংক্রান্ত কনস্ট্যান্টসমূহ
 */

/**
 * সর্ট ফিল্ডসমূহ
 */
export enum SortField {
  RELEVANCE = 'relevance',
  PRICE = 'price',
  RATING = 'rating',
  NEWEST = 'newest',
  POPULARITY = 'popularity',
  SALES = 'sales',
}

/**
 * সর্ট অর্ডার
 */
export enum SortOrder {
  ASC = 'asc',
  DESC = 'desc',
}

/**
 * ডিফল্ট সর্ট ফিল্ড
 */
export const DEFAULT_SORT_FIELD = SortField.RELEVANCE;

/**
 * ডিফল্ট সর্ট অর্ডার
 */
export const DEFAULT_SORT_ORDER = SortOrder.DESC;

/**
 * সর্ট লেবেলসমূহ (বাংলায়)
 */
export const SORT_LABELS: Record<SortField, string> = {
  [SortField.RELEVANCE]: 'সবচেয়ে প্রাসঙ্গিক',
  [SortField.PRICE]: 'দাম: কম থেকে বেশি',
  [SortField.RATING]: 'রেটিং',
  [SortField.NEWEST]: 'নতুন',
  [SortField.POPULARITY]: 'জনপ্রিয়তা',
  [SortField.SALES]: 'বিক্রয়',
} as const;

/**
 * সর্ট লেবেলসমূহ (ইংরেজিতে)
 */
export const SORT_LABELS_EN: Record<SortField, string> = {
  [SortField.RELEVANCE]: 'Most Relevant',
  [SortField.PRICE]: 'Price: Low to High',
  [SortField.RATING]: 'Rating',
  [SortField.NEWEST]: 'Newest',
  [SortField.POPULARITY]: 'Popularity',
  [SortField.SALES]: 'Sales',
} as const;

/**
 * সর্ট ফিল্ডের ভ্যালু সমূহ
 */
export const SORT_FIELD_VALUES = Object.values(SortField) as readonly SortField[];

/**
 * সর্ট অর্ডারের ভ্যালু সমূহ
 */
export const SORT_ORDER_VALUES = Object.values(SortOrder) as readonly SortOrder[];

/**
 * সর্ট অপশন (সিলেক্ট ইনপুটের জন্য)
 */
export const SORT_OPTIONS = SORT_FIELD_VALUES.map((field) => ({
  value: field,
  label: SORT_LABELS[field],
}));

/**
 * সর্ট কনফিগারেশন টাইপ
 */
export type SortConfig = {
  field: SortField;
  order: SortOrder;
  label: string;
};

/**
 * ডিফল্ট সর্ট কনফিগারেশন
 */
export const DEFAULT_SORT_CONFIG: SortConfig = {
  field: DEFAULT_SORT_FIELD,
  order: DEFAULT_SORT_ORDER,
  label: SORT_LABELS[DEFAULT_SORT_FIELD],
};

/**
 * সর্ট ফিল্ডের বিবরণ
 */
export const SORT_FIELD_DESCRIPTIONS: Record<SortField, string> = {
  [SortField.RELEVANCE]: 'সার্চ ক্যোয়ারীর সাথে মিল অনুযায়ী সাজানো',
  [SortField.PRICE]: 'পণ্যের দাম অনুযায়ী সাজানো',
  [SortField.RATING]: 'পণ্যের রেটিং অনুযায়ী সাজানো',
  [SortField.NEWEST]: 'সর্বশেষ যোগকৃত পণ্য অনুযায়ী সাজানো',
  [SortField.POPULARITY]: 'জনপ্রিয়তা অনুযায়ী সাজানো',
  [SortField.SALES]: 'বিক্রয় সংখ্যা অনুযায়ী সাজানো',
} as const;
