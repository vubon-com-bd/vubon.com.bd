/**
 * কালেকশন মডেলের জন্য কনস্ট্যান্টসমূহ
 */

// কালেকশন টাইপ
export const CollectionType = {
  MANUAL: 'MANUAL',
  AUTOMATED: 'AUTOMATED',
  SMART: 'SMART',
  FEATURED: 'FEATURED',
  SEASONAL: 'SEASONAL',
  CURATED: 'CURATED',
} as const;

export type CollectionTypeType = (typeof CollectionType)[keyof typeof CollectionType];

// কালেকশন স্ট্যাটাস
export const CollectionStatus = {
  ACTIVE: 'ACTIVE',
  INACTIVE: 'INACTIVE',
  SCHEDULED: 'SCHEDULED',
  DRAFT: 'DRAFT',
  ARCHIVED: 'ARCHIVED',
} as const;

export type CollectionStatusType = (typeof CollectionStatus)[keyof typeof CollectionStatus];

// কালেকশন রুলস টাইপ
export const CollectionRulesType = {
  ALL: 'ALL',
  ANY: 'ANY',
  NONE: 'NONE',
} as const;

export type CollectionRulesTypeType =
  (typeof CollectionRulesType)[keyof typeof CollectionRulesType];

// ডিফল্ট কালেকশন থিম
export const DEFAULT_COLLECTION_THEME = 'default';

// কালেকশন ফিল্টার টাইপ
export const CollectionFilterType = {
  CATEGORY: 'CATEGORY',
  BRAND: 'BRAND',
  PRICE_RANGE: 'PRICE_RANGE',
  RATING: 'RATING',
  AVAILABILITY: 'AVAILABILITY',
  TAG: 'TAG',
  VENDOR: 'VENDOR',
  DATE_ADDED: 'DATE_ADDED',
  SALES_VELOCITY: 'SALES_VELOCITY',
  INVENTORY_STATUS: 'INVENTORY_STATUS',
} as const;

export type CollectionFilterTypeType =
  (typeof CollectionFilterType)[keyof typeof CollectionFilterType];

// কালেকশন ডিসপ্লে টাইপ
export const CollectionDisplayType = {
  GRID: 'GRID',
  LIST: 'LIST',
  CAROUSEL: 'CAROUSEL',
  MASONRY: 'MASONRY',
  TIMELINE: 'TIMELINE',
  SLIDER: 'SLIDER',
} as const;

export type CollectionDisplayTypeType =
  (typeof CollectionDisplayType)[keyof typeof CollectionDisplayType];

// ডিফল্ট কালেকশন ভ্যালু
export const DEFAULT_COLLECTION_TYPE = CollectionType.MANUAL;
export const DEFAULT_COLLECTION_STATUS = CollectionStatus.DRAFT;
export const DEFAULT_COLLECTION_RULES_TYPE = CollectionRulesType.ALL;
export const DEFAULT_COLLECTION_DISPLAY_TYPE = CollectionDisplayType.GRID;

// কালেকশন লিমিট কনস্ট্যান্ট
export const MAX_COLLECTION_ITEMS = 1000;
export const MIN_COLLECTION_ITEMS = 1;
export const DEFAULT_COLLECTION_ITEMS = 20;

// কালেকশন কন্ডিশন টাইপ
export const CollectionConditionType = {
  EQUALS: 'EQUALS',
  NOT_EQUALS: 'NOT_EQUALS',
  CONTAINS: 'CONTAINS',
  NOT_CONTAINS: 'NOT_CONTAINS',
  STARTS_WITH: 'STARTS_WITH',
  ENDS_WITH: 'ENDS_WITH',
  GREATER_THAN: 'GREATER_THAN',
  LESS_THAN: 'LESS_THAN',
  BETWEEN: 'BETWEEN',
  IN: 'IN',
  NOT_IN: 'NOT_IN',
  IS_EMPTY: 'IS_EMPTY',
  IS_NOT_EMPTY: 'IS_NOT_EMPTY',
} as const;

export type CollectionConditionTypeType =
  (typeof CollectionConditionType)[keyof typeof CollectionConditionType];

// কালেকশন সোর্ট টাইপ
export const CollectionSortType = {
  MANUAL: 'MANUAL',
  AUTOMATIC: 'AUTOMATIC',
  RANDOM: 'RANDOM',
} as const;

export type CollectionSortTypeType = (typeof CollectionSortType)[keyof typeof CollectionSortType];

// কালেকশন সোর্ট ফিল্ড
export const CollectionSortField = {
  CREATED_AT: 'CREATED_AT',
  UPDATED_AT: 'UPDATED_AT',
  TITLE: 'TITLE',
  POSITION: 'POSITION',
  SALES: 'SALES',
  RATING: 'RATING',
  POPULARITY: 'POPULARITY',
  PRICE: 'PRICE',
} as const;

export type CollectionSortFieldType =
  (typeof CollectionSortField)[keyof typeof CollectionSortField];

// কালেকশন সোর্ট অর্ডার
export const CollectionSortOrder = {
  ASC: 'ASC',
  DESC: 'DESC',
} as const;

export type CollectionSortOrderType =
  (typeof CollectionSortOrder)[keyof typeof CollectionSortOrder];

// কালেকশন নামের সীমা
export const COLLECTION_NAME_MIN_LENGTH = 3;
export const COLLECTION_NAME_MAX_LENGTH = 100;

// কালেকশন ডেসক্রিপশনের সীমা
export const COLLECTION_DESCRIPTION_MIN_LENGTH = 10;
export const COLLECTION_DESCRIPTION_MAX_LENGTH = 500;

// কালেকশন স্লাগের সীমা
export const COLLECTION_SLUG_MIN_LENGTH = 3;
export const COLLECTION_SLUG_MAX_LENGTH = 100;
export const COLLECTION_SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

// কালেকশন ইমেজ কনস্ট্যান্ট
export const MAX_COLLECTION_IMAGES = 5;
export const COLLECTION_IMAGE_MIN_SIZE = 100; // কিলোবাইট
export const COLLECTION_IMAGE_MAX_SIZE = 2048; // কিলোবাইট
export const COLLECTION_IMAGE_ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp'];

// কালেকশন মেটাডাটা কনস্ট্যান্ট
export const MAX_COLLECTION_META_FIELDS = 20;
export const COLLECTION_META_KEY_MAX_LENGTH = 100;
export const COLLECTION_META_VALUE_MAX_LENGTH = 1000;

// কালেকশন SEO কনস্ট্যান্ট
export const COLLECTION_SEO_TITLE_MIN_LENGTH = 10;
export const COLLECTION_SEO_TITLE_MAX_LENGTH = 70;
export const COLLECTION_SEO_DESCRIPTION_MIN_LENGTH = 50;
export const COLLECTION_SEO_DESCRIPTION_MAX_LENGTH = 160;

// কালেকশন স্মার্ট রুলস
export const COLLECTION_SMART_RULES = {
  BEST_SELLING: 'BEST_SELLING',
  NEW_ARRIVALS: 'NEW_ARRIVALS',
  HIGHEST_RATED: 'HIGHEST_RATED',
  ON_SALE: 'ON_SALE',
  RECENTLY_VIEWED: 'RECENTLY_VIEWED',
  RECOMMENDED: 'RECOMMENDED',
  MOST_POPULAR: 'MOST_POPULAR',
} as const;

export type CollectionSmartRulesType =
  (typeof COLLECTION_SMART_RULES)[keyof typeof COLLECTION_SMART_RULES];

// কালেকশন স্মার্ট রুলস কনফিগারেশন
export const COLLECTION_SMART_RULES_CONFIG = {
  [COLLECTION_SMART_RULES.BEST_SELLING]: {
    sortField: CollectionSortField.SALES,
    sortOrder: CollectionSortOrder.DESC,
    limit: 50,
  },
  [COLLECTION_SMART_RULES.NEW_ARRIVALS]: {
    sortField: CollectionSortField.CREATED_AT,
    sortOrder: CollectionSortOrder.DESC,
    limit: 30,
  },
  [COLLECTION_SMART_RULES.HIGHEST_RATED]: {
    sortField: CollectionSortField.RATING,
    sortOrder: CollectionSortOrder.DESC,
    limit: 40,
  },
  [COLLECTION_SMART_RULES.ON_SALE]: {
    condition: { field: 'discount_percentage', operator: 'greater_than', value: 0 },
    limit: 30,
  },
} as const;

// কালেকশন অটোমেটিক আপডেট
export const COLLECTION_AUTO_UPDATE_INTERVAL_HOURS = 6;
export const COLLECTION_AUTO_UPDATE_SCHEDULE = {
  MINUTES: 0,
  HOURS: '*/6',
  DAYS: '*',
} as const;

// কালেকশন টেমপ্লেট
export const COLLECTION_TEMPLATES = {
  DEFAULT: 'default',
  FEATURED: 'featured',
  SEASONAL: 'seasonal',
  SALE: 'sale',
  NEW_ARRIVALS: 'new_arrivals',
  BEST_SELLERS: 'best_sellers',
} as const;

export type CollectionTemplatesType =
  (typeof COLLECTION_TEMPLATES)[keyof typeof COLLECTION_TEMPLATES];

// কালেকশন পারমিশন
export const COLLECTION_PERMISSIONS = {
  VIEW: 'VIEW',
  CREATE: 'CREATE',
  EDIT: 'EDIT',
  DELETE: 'DELETE',
  PUBLISH: 'PUBLISH',
  UNPUBLISH: 'UNPUBLISH',
  MANAGE_ITEMS: 'MANAGE_ITEMS',
  MANAGE_RULES: 'MANAGE_RULES',
} as const;

export type CollectionPermissionsType =
  (typeof COLLECTION_PERMISSIONS)[keyof typeof COLLECTION_PERMISSIONS];
