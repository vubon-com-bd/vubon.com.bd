/**
 * ট্যাক্স কনস্ট্যান্ট
 * ট্যাক্স এবং ভ্যাট সম্পর্কিত কনস্ট্যান্ট
 */

/**
 * ট্যাক্স টাইপ
 */
export const TAX_TYPES = {
  VAT: 'vat',
  GST: 'gst',
  SALES_TAX: 'sales_tax',
  CUSTOM_DUTY: 'custom_duty',
} as const;

export type TaxType = (typeof TAX_TYPES)[keyof typeof TAX_TYPES];

/**
 * ডিফল্ট ট্যাক্স রেট (পার্সেন্টেজে)
 */
export const DEFAULT_TAX_RATE = 15;

/**
 * ট্যাক্স ক্যাটাগরি
 */
export const TAX_CATEGORIES = {
  ESSENTIAL: 'essential',
  LUXURY: 'luxury',
  STANDARD: 'standard',
} as const;

export type TaxCategory = (typeof TAX_CATEGORIES)[keyof typeof TAX_CATEGORIES];

/**
 * ভ্যাট মুক্ত প্রোডাক্ট ক্যাটাগরি
 */
export const VAT_EXEMPT_PRODUCTS = [
  'fresh_food',
  'medicines',
  'books',
  'educational_materials',
  'agricultural_products',
] as const;

export type VatExemptProduct = (typeof VAT_EXEMPT_PRODUCTS)[number];

/**
 * ক্যালকুলেশন মেথড
 */
export const TAX_CALCULATION_METHOD = {
  INCLUSIVE: 'inclusive',
  EXCLUSIVE: 'exclusive',
} as const;

export type TaxCalculationMethod =
  (typeof TAX_CALCULATION_METHOD)[keyof typeof TAX_CALCULATION_METHOD];

/**
 * রাউন্ডিং পদ্ধতি
 */
export const TAX_ROUNDING = {
  NEAREST: 'nearest',
  CEIL: 'ceil',
  FLOOR: 'floor',
} as const;

export type TaxRounding = (typeof TAX_ROUNDING)[keyof typeof TAX_ROUNDING];

/**
 * অঞ্চলভিত্তিক ট্যাক্স হার
 */
export const TAX_BY_REGION = {
  DHAKA: 15,
  CHITTAGONG: 15,
  RAJSHAHI: 12,
  KHULNA: 12,
  BARISHAL: 10,
  SYLHET: 12,
  RANGPUR: 10,
  MYMENSINGH: 10,
} as const;

export type TaxByRegion = typeof TAX_BY_REGION;
export type TaxRegion = keyof TaxByRegion;
