/**
 * কম্পারিজন মডেলের জন্য কনস্ট্যান্টসমূহ
 */

// কম্পারিজন টাইপ
export const ComparisonType = {
  PRODUCT: 'PRODUCT',
  BRAND: 'BRAND',
  VENDOR: 'VENDOR',
  CATEGORY: 'CATEGORY',
  PRICE: 'PRICE',
  FEATURE: 'FEATURE',
} as const;

export type ComparisonTypeType = (typeof ComparisonType)[keyof typeof ComparisonType];

// কম্পারিজন লিমিট (সর্বোচ্চ কয়টি প্রোডাক্ট তুলনা করা যাবে)
export const MAX_COMPARISON_ITEMS = 10;
export const DEFAULT_COMPARISON_ITEMS = 4;
export const MIN_COMPARISON_ITEMS = 2;

// কম্পারিজন ফিল্ডস
export const ComparisonFields = {
  PRICE: 'PRICE',
  RATING: 'RATING',
  BRAND: 'BRAND',
  FEATURE: 'FEATURE',
  SPECIFICATION: 'SPECIFICATION',
  REVIEW: 'REVIEW',
  IMAGE: 'IMAGE',
  DESCRIPTION: 'DESCRIPTION',
  CATEGORY: 'CATEGORY',
  AVAILABILITY: 'AVAILABILITY',
  WARRANTY: 'WARRANTY',
  SHIPPING: 'SHIPPING',
  RETURN_POLICY: 'RETURN_POLICY',
  CUSTOMER_SERVICE: 'CUSTOMER_SERVICE',
} as const;

export type ComparisonFieldsType = (typeof ComparisonFields)[keyof typeof ComparisonFields];

// ডিফল্ট কম্পারিজন ক্রাইটেরিয়া
export const DEFAULT_COMPARISON_CRITERIA = [
  ComparisonFields.PRICE,
  ComparisonFields.RATING,
  ComparisonFields.BRAND,
  ComparisonFields.FEATURE,
] as const;

// কম্পারিজন সেশন টাইমআউট (মিনিটে)
export const COMPARISON_SESSION_TIMEOUT_MINUTES = 30;

// কম্পারিজন শেয়ার টাইপ
export const ComparisonShareType = {
  PUBLIC: 'PUBLIC',
  PRIVATE: 'PRIVATE',
  LINK: 'LINK',
  SOCIAL: 'SOCIAL',
  EMAIL: 'EMAIL',
} as const;

export type ComparisonShareTypeType =
  (typeof ComparisonShareType)[keyof typeof ComparisonShareType];

// ডিফল্ট কম্পারিজন ভ্যালু
export const DEFAULT_COMPARISON_TYPE = ComparisonType.PRODUCT;
export const DEFAULT_COMPARISON_SHARE_TYPE = ComparisonShareType.PRIVATE;

// কম্পারিজন সোর্ট অপশন
export const ComparisonSortOption = {
  PRICE_ASC: 'PRICE_ASC',
  PRICE_DESC: 'PRICE_DESC',
  RATING_ASC: 'RATING_ASC',
  RATING_DESC: 'RATING_DESC',
  NAME_ASC: 'NAME_ASC',
  NAME_DESC: 'NAME_DESC',
  RELEVANCE: 'RELEVANCE',
} as const;

export type ComparisonSortOptionType =
  (typeof ComparisonSortOption)[keyof typeof ComparisonSortOption];

// কম্পারিজন ডিসপ্লে টাইপ
export const ComparisonDisplayType = {
  GRID: 'GRID',
  LIST: 'LIST',
  TABLE: 'TABLE',
  CARD: 'CARD',
} as const;

export type ComparisonDisplayTypeType =
  (typeof ComparisonDisplayType)[keyof typeof ComparisonDisplayType];

// ডিফল্ট ডিসপ্লে টাইপ
export const DEFAULT_COMPARISON_DISPLAY = ComparisonDisplayType.TABLE;

// কম্পারিজন ফিল্টার টাইপ
export const ComparisonFilterType = {
  CATEGORY: 'CATEGORY',
  BRAND: 'BRAND',
  PRICE_RANGE: 'PRICE_RANGE',
  RATING: 'RATING',
  AVAILABILITY: 'AVAILABILITY',
} as const;

export type ComparisonFilterTypeType =
  (typeof ComparisonFilterType)[keyof typeof ComparisonFilterType];

// কম্পারিজন থ্রেশহোল্ড
export const COMPARISON_THRESHOLDS = {
  MIN_PRICE_DIFFERENCE: 5, // percentage
  MIN_RATING_DIFFERENCE: 0.5,
  MAX_PRICE_DIFFERENCE: 100, // percentage
} as const;

// কম্পারিজন হিস্টোরি
export const COMPARISON_HISTORY_MAX_DAYS = 90;
export const COMPARISON_HISTORY_MAX_ENTRIES = 100;

// কম্পারিজন নোটিফিকেশন
export const COMPARISON_PRICE_DROP_THRESHOLD = 10; // percentage
export const COMPARISON_RATING_CHANGE_THRESHOLD = 0.5;

// কম্পারিজন মেটাডাটা কনস্ট্যান্ট
export const MAX_COMPARISON_META_FIELDS = 20;
export const COMPARISON_META_KEY_MAX_LENGTH = 100;
export const COMPARISON_META_VALUE_MAX_LENGTH = 1000;

// কম্পারিজন উইজেট টাইপ
export const ComparisonWidgetType = {
  SIDEBAR: 'SIDEBAR',
  MODAL: 'MODAL',
  PAGE: 'PAGE',
  FLOATING: 'FLOATING',
} as const;

export type ComparisonWidgetTypeType =
  (typeof ComparisonWidgetType)[keyof typeof ComparisonWidgetType];

// ডিফল্ট উইজেট টাইপ
export const DEFAULT_COMPARISON_WIDGET = ComparisonWidgetType.PAGE;

// কম্পারিজন অ্যাকশন টাইপ
export const ComparisonActionType = {
  ADD: 'ADD',
  REMOVE: 'REMOVE',
  CLEAR: 'CLEAR',
  SHARE: 'SHARE',
  SAVE: 'SAVE',
  EXPORT: 'EXPORT',
} as const;

export type ComparisonActionTypeType =
  (typeof ComparisonActionType)[keyof typeof ComparisonActionType];

// কম্পারিজন এক্সপোর্ট ফরম্যাট
export const COMPARISON_EXPORT_FORMATS = ['pdf', 'csv', 'json', 'html'] as const;

export type ComparisonExportFormatType = (typeof COMPARISON_EXPORT_FORMATS)[number];

// ডিফল্ট এক্সপোর্ট ফরম্যাট
export const DEFAULT_COMPARISON_EXPORT_FORMAT = 'pdf' as const;
