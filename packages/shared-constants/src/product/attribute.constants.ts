/**
 * অ্যাট্রিবিউট মডেলের জন্য কনস্ট্যান্টসমূহ
 */

// অ্যাট্রিবিউট টাইপ
export const AttributeType = {
  TEXT: 'TEXT',
  NUMBER: 'NUMBER',
  DATE: 'DATE',
  BOOLEAN: 'BOOLEAN',
  COLOR: 'COLOR',
  SELECT: 'SELECT',
} as const;

export type AttributeTypeType = (typeof AttributeType)[keyof typeof AttributeType];

// অ্যাট্রিবিউট গ্রুপ
export const AttributeGroup = {
  GENERAL: 'GENERAL',
  TECHNICAL: 'TECHNICAL',
  SHIPPING: 'SHIPPING',
  MARKETING: 'MARKETING',
} as const;

export type AttributeGroupType = (typeof AttributeGroup)[keyof typeof AttributeGroup];

// অ্যাট্রিবিউট ভিসিবিলিটি
export const AttributeVisibility = {
  VISIBLE: 'VISIBLE',
  HIDDEN: 'HIDDEN',
  FILTERABLE: 'FILTERABLE',
} as const;

export type AttributeVisibilityType =
  (typeof AttributeVisibility)[keyof typeof AttributeVisibility];

// অ্যাট্রিবিউটের সর্বোচ্চ মান
export const MAX_ATTRIBUTE_VALUES = 100;

// ডিফল্ট অ্যাট্রিবিউট প্রায়োরিটি
export const DEFAULT_ATTRIBUTE_PRIORITY = 0;

// অ্যাট্রিবিউট ভ্যালিডেশন রুলস
export const AttributeValidationRules = {
  TEXT: {
    MIN_LENGTH: 0,
    MAX_LENGTH: 500,
    PATTERN: '.*',
  },
  NUMBER: {
    MIN_VALUE: -999999999,
    MAX_VALUE: 999999999,
  },
  DATE: {
    MIN_DATE: '1900-01-01',
    MAX_DATE: '2099-12-31',
  },
  COLOR: {
    PATTERN: '^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$',
  },
  SELECT: {
    MAX_SELECTIONS: 10,
  },
} as const;

// ডিফল্ট অ্যাট্রিবিউট ভ্যালু
export const DEFAULT_ATTRIBUTE_TYPE = AttributeType.TEXT;
export const DEFAULT_ATTRIBUTE_GROUP = AttributeGroup.GENERAL;
export const DEFAULT_ATTRIBUTE_VISIBILITY = AttributeVisibility.VISIBLE;

// অ্যাট্রিবিউট নেম কনস্ট্যান্ট
export const ATTRIBUTE_NAME_MIN_LENGTH = 2;
export const ATTRIBUTE_NAME_MAX_LENGTH = 100;

// অ্যাট্রিবিউট কোড কনস্ট্যান্ট
export const ATTRIBUTE_CODE_MIN_LENGTH = 2;
export const ATTRIBUTE_CODE_MAX_LENGTH = 50;
export const ATTRIBUTE_CODE_PATTERN = /^[a-z_][a-z0-9_]*$/;

// অ্যাট্রিবিউট লেবেল কনস্ট্যান্ট
export const ATTRIBUTE_LABEL_MIN_LENGTH = 2;
export const ATTRIBUTE_LABEL_MAX_LENGTH = 100;

// অ্যাট্রিবিউট ডেসক্রিপশন কনস্ট্যান্ট
export const ATTRIBUTE_DESCRIPTION_MIN_LENGTH = 0;
export const ATTRIBUTE_DESCRIPTION_MAX_LENGTH = 500;

// অ্যাট্রিবিউট ডিফল্ট ভ্যালু কনস্ট্যান্ট
export const ATTRIBUTE_DEFAULT_VALUE_MAX_LENGTH = 500;

// অ্যাট্রিবিউট সোর্ট অপশন
export const AttributeSortOption = {
  NAME_ASC: 'NAME_ASC',
  NAME_DESC: 'NAME_DESC',
  PRIORITY_ASC: 'PRIORITY_ASC',
  PRIORITY_DESC: 'PRIORITY_DESC',
  GROUP_ASC: 'GROUP_ASC',
  GROUP_DESC: 'GROUP_DESC',
  CREATED_AT_ASC: 'CREATED_AT_ASC',
  CREATED_AT_DESC: 'CREATED_AT_DESC',
} as const;

export type AttributeSortOptionType =
  (typeof AttributeSortOption)[keyof typeof AttributeSortOption];

// ডিফল্ট অ্যাট্রিবিউট পেজিনেশন
export const DEFAULT_ATTRIBUTE_PAGE_SIZE = 20;

// অ্যাট্রিবিউট মেটাডাটা কনস্ট্যান্ট
export const MAX_ATTRIBUTE_META_FIELDS = 20;
export const ATTRIBUTE_META_KEY_MAX_LENGTH = 100;
export const ATTRIBUTE_META_VALUE_MAX_LENGTH = 1000;

// অ্যাট্রিবিউট SEO কনস্ট্যান্ট
export const ATTRIBUTE_SEO_TITLE_MIN_LENGTH = 10;
export const ATTRIBUTE_SEO_TITLE_MAX_LENGTH = 70;
export const ATTRIBUTE_SEO_DESCRIPTION_MIN_LENGTH = 50;
export const ATTRIBUTE_SEO_DESCRIPTION_MAX_LENGTH = 160;

// অ্যাট্রিবিউট কম্বিনেশন কনস্ট্যান্ট
export const MAX_ATTRIBUTE_COMBINATIONS = 50;

// অ্যাট্রিবিউট ফিল্টার কনস্ট্যান্ট
export const ATTRIBUTE_FILTER_MIN_VALUES = 2;
export const ATTRIBUTE_FILTER_MAX_VALUES = 10;

// অ্যাট্রিবিউট ইমেজ কনস্ট্যান্ট
export const MAX_ATTRIBUTE_IMAGES = 1;
export const ATTRIBUTE_IMAGE_MIN_SIZE = 100; // কিলোবাইট
export const ATTRIBUTE_IMAGE_MAX_SIZE = 1024; // কিলোবাইট
export const ATTRIBUTE_IMAGE_ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp'];

// অ্যাট্রিবিউট পজিশন কনস্ট্যান্ট
export const ATTRIBUTE_POSITION_MIN = 0;
export const ATTRIBUTE_POSITION_MAX = 999;

// অ্যাট্রিবিউট বাল্ক অপারেশন কনস্ট্যান্ট
export const MAX_ATTRIBUTES_PER_BULK_UPDATE = 50;
