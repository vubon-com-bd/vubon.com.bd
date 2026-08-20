/**
 * ভেরিয়েন্ট মডেলের জন্য কনস্ট্যান্টসমূহ
 */

// ভেরিয়েন্ট টাইপ
export const VariantType = {
  SIZE: 'SIZE',
  COLOR: 'COLOR',
  STYLE: 'STYLE',
  MATERIAL: 'MATERIAL',
  CUSTOM: 'CUSTOM',
} as const;

export type VariantTypeType = (typeof VariantType)[keyof typeof VariantType];

// স্টক স্ট্যাটাস
export const StockStatus = {
  IN_STOCK: 'IN_STOCK',
  OUT_OF_STOCK: 'OUT_OF_STOCK',
  PRE_ORDER: 'PRE_ORDER',
  BACKORDER: 'BACKORDER',
} as const;

export type StockStatusType = (typeof StockStatus)[keyof typeof StockStatus];

// ভেরিয়েন্টের সর্বোচ্চ সংখ্যা
export const MAX_VARIANTS_PER_PRODUCT = 100;

// ডিফল্ট ভেরিয়েন্ট ইমেজ
export const DEFAULT_VARIANT_IMAGE = 'default-variant.png';

// SKU জেনারেশন ফরম্যাট
export const SKU_GENERATION_FORMAT = {
  PATTERN: '{PRODUCT_CODE}-{ATTRIBUTE_CODE}-{SEQUENCE}',
  SEPARATOR: '-',
  MIN_SEQUENCE_LENGTH: 3,
  MAX_SEQUENCE_LENGTH: 6,
} as const;

// ভেরিয়েন্ট অ্যাট্রিবিউটের টাইপ
export const VariantAttributeType = {
  TEXT: 'TEXT',
  NUMBER: 'NUMBER',
  COLOR: 'COLOR',
  BOOLEAN: 'BOOLEAN',
} as const;

export type VariantAttributeTypeType =
  (typeof VariantAttributeType)[keyof typeof VariantAttributeType];

// ডিফল্ট ভেরিয়েন্ট ভ্যালু
export const DEFAULT_VARIANT_TYPE = VariantType.CUSTOM;
export const DEFAULT_STOCK_STATUS = StockStatus.IN_STOCK;

// ভেরিয়েন্ট প্রাইস কনস্ট্যান্ট
export const VARIANT_PRICE_MIN = 0;
export const VARIANT_PRICE_MAX = 999999999;

// ভেরিয়েন্ট ডিসকাউন্ট কনস্ট্যান্ট
export const VARIANT_DISCOUNT_MIN = 0;
export const VARIANT_DISCOUNT_MAX = 100;

// ভেরিয়েন্ট স্টক কনস্ট্যান্ট
export const VARIANT_STOCK_MIN = 0;
export const VARIANT_STOCK_MAX = 999999;

// ভেরিয়েন্ট ওয়েট কনস্ট্যান্ট (গ্রামে)
export const VARIANT_WEIGHT_MIN = 0;
export const VARIANT_WEIGHT_MAX = 100000;

// ভেরিয়েন্ট ডাইমেনশন কনস্ট্যান্ট (সেন্টিমিটারে)
export const VARIANT_DIMENSION_MIN = 0;
export const VARIANT_DIMENSION_MAX = 1000;

// ভেরিয়েন্ট ইমেজ কনস্ট্যান্ট
export const MAX_VARIANT_IMAGES = 5;
export const VARIANT_IMAGE_MIN_SIZE = 100; // কিলোবাইট
export const VARIANT_IMAGE_MAX_SIZE = 2048; // কিলোবাইট
export const VARIANT_IMAGE_ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp'];

// ভেরিয়েন্ট মেটাডাটা কনস্ট্যান্ট
export const MAX_VARIANT_META_FIELDS = 20;
export const VARIANT_META_KEY_MAX_LENGTH = 100;
export const VARIANT_META_VALUE_MAX_LENGTH = 1000;

// ভেরিয়েন্ট বাল্ক আপডেট কনস্ট্যান্ট
export const MAX_VARIANTS_PER_BULK_UPDATE = 50;

// ভেরিয়েন্ট সোর্ট অপশন
export const VariantSortOption = {
  PRICE_ASC: 'PRICE_ASC',
  PRICE_DESC: 'PRICE_DESC',
  STOCK_ASC: 'STOCK_ASC',
  STOCK_DESC: 'STOCK_DESC',
  CREATED_AT_ASC: 'CREATED_AT_ASC',
  CREATED_AT_DESC: 'CREATED_AT_DESC',
  POSITION_ASC: 'POSITION_ASC',
  POSITION_DESC: 'POSITION_DESC',
} as const;

export type VariantSortOptionType = (typeof VariantSortOption)[keyof typeof VariantSortOption];

// ডিফল্ট ভেরিয়েন্ট পেজিনেশন
export const DEFAULT_VARIANT_PAGE_SIZE = 20;

// ভেরিয়েন্ট লেবেল কনস্ট্যান্ট
export const VARIANT_LABEL_MIN_LENGTH = 1;
export const VARIANT_LABEL_MAX_LENGTH = 100;

// ভেরিয়েন্ট ভ্যালু কনস্ট্যান্ট
export const VARIANT_VALUE_MIN_LENGTH = 1;
export const VARIANT_VALUE_MAX_LENGTH = 500;

// ভেরিয়েন্ট SKU কনস্ট্যান্ট
export const VARIANT_SKU_MIN_LENGTH = 3;
export const VARIANT_SKU_MAX_LENGTH = 50;
export const VARIANT_SKU_PATTERN = /^[A-Z0-9]+(?:-[A-Z0-9]+)*$/;

// ভেরিয়েন্ট বারকোড কনস্ট্যান্ট
export const VARIANT_BARCODE_MIN_LENGTH = 8;
export const VARIANT_BARCODE_MAX_LENGTH = 20;
export const VARIANT_BARCODE_PATTERN = /^[0-9]+$/;

// ভেরিয়েন্ট কম্বিনেশন কনস্ট্যান্ট
export const MAX_VARIANT_COMBINATIONS = 1000;

// ডিফল্ট ভেরিয়েন্ট পজিশন
export const DEFAULT_VARIANT_POSITION = 0;
