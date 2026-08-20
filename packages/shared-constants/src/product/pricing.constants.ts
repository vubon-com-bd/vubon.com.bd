/**
 * প্রাইসিং মডেলের জন্য কনস্ট্যান্টসমূহ
 */

// কারেন্সি টাইপ
export const ProductCurrencyType = {
  BDT: 'BDT',
  USD: 'USD',
  EUR: 'EUR',
  GBP: 'GBP',
  INR: 'INR',
  JPY: 'JPY',
  CNY: 'CNY',
  AUD: 'AUD',
  CAD: 'CAD',
  CHF: 'CHF',
} as const;

export type ProductCurrencyTypeType =
  (typeof ProductCurrencyType)[keyof typeof ProductCurrencyType];

// প্রাইস টাইপ
export const ProductPriceType = {
  FIXED: 'FIXED',
  VARIABLE: 'VARIABLE',
  DYNAMIC: 'DYNAMIC',
} as const;

export type ProductPriceTypeType = (typeof ProductPriceType)[keyof typeof ProductPriceType];

// প্রোডাক্ট ডিসকাউন্ট টাইপ
export const ProductDiscountType = {
  PERCENTAGE: 'PERCENTAGE',
  FIXED_AMOUNT: 'FIXED_AMOUNT',
  BUNDLE: 'BUNDLE',
} as const;

export type ProductDiscountTypeType =
  (typeof ProductDiscountType)[keyof typeof ProductDiscountType];

// প্রোডাক্ট ট্যাক্স টাইপ
export const ProductTaxType = {
  VAT: 'VAT',
  GST: 'GST',
  NONE: 'NONE',
  SALES_TAX: 'SALES_TAX',
  IMPORT_DUTY: 'IMPORT_DUTY',
} as const;

export type ProductTaxTypeType = (typeof ProductTaxType)[keyof typeof ProductTaxType];

// প্রাইস রাউন্ডিং পয়েন্ট
export const PRODUCT_PRICE_ROUNDING_POINT = 2;

// ডিফল্ট মার্জিন পার্সেন্টেজ
export const PRODUCT_DEFAULT_MARGIN_PERCENTAGE = 20;

// প্রোডাক্ট প্রমোশন টাইপ
export const ProductPromotionType = {
  FLASH_SALE: 'FLASH_SALE',
  BOGO: 'BOGO',
  SEASONAL: 'SEASONAL',
  CLEARANCE: 'CLEARANCE',
  BUNDLE_DEAL: 'BUNDLE_DEAL',
  FREE_SHIPPING: 'FREE_SHIPPING',
  COUPON_CODE: 'COUPON_CODE',
  MEMBER_ONLY: 'MEMBER_ONLY',
  FIRST_ORDER: 'FIRST_ORDER',
  REFERRAL: 'REFERRAL',
} as const;

export type ProductPromotionTypeType =
  (typeof ProductPromotionType)[keyof typeof ProductPromotionType];

// ডিফল্ট প্রাইসিং ভ্যালু
export const PRODUCT_DEFAULT_PRICE_TYPE = ProductPriceType.FIXED;
export const PRODUCT_DEFAULT_CURRENCY = ProductCurrencyType.BDT;
export const PRODUCT_DEFAULT_DISCOUNT_TYPE = ProductDiscountType.PERCENTAGE;
export const PRODUCT_DEFAULT_TAX_TYPE = ProductTaxType.VAT;
export const PRODUCT_DEFAULT_PROMOTION_TYPE = ProductPromotionType.SEASONAL;

// প্রাইস লিমিট কনস্ট্যান্ট (শুধু প্রাইসিং সম্পর্কিত)
export const PRODUCT_PRICE_MIN = 0;
export const PRODUCT_PRICE_MAX = 999999999.99;
export const PRODUCT_PRICE_COMPARE_AT_MIN = 0;
export const PRODUCT_PRICE_COMPARE_AT_MAX = 999999999.99;

// ডিসকাউন্ট লিমিট কনস্ট্যান্ট (শুধু প্রাইসিং সম্পর্কিত)
export const PRODUCT_DISCOUNT_MIN = 0;
export const PRODUCT_DISCOUNT_MAX = 100;
export const PRODUCT_DISCOUNT_AMOUNT_MIN = 0;
export const PRODUCT_DISCOUNT_AMOUNT_MAX = 999999999.99;

// ট্যাক্স রেট কনস্ট্যান্ট
export const PRODUCT_TAX_RATE_MIN = 0;
export const PRODUCT_TAX_RATE_MAX = 100;

// মার্জিন কনস্ট্যান্ট
export const PRODUCT_MARGIN_MIN = 0;
export const PRODUCT_MARGIN_MAX = 1000;

// মার্কআপ কনস্ট্যান্ট
export const PRODUCT_MARKUP_MIN = 0;
export const PRODUCT_MARKUP_MAX = 1000;

// প্রমোশন কনস্ট্যান্ট
export const PRODUCT_PROMOTION_DISCOUNT_MIN = 0;
export const PRODUCT_PROMOTION_DISCOUNT_MAX = 100;
export const PRODUCT_PROMOTION_DURATION_MIN_DAYS = 1;
export const PRODUCT_PROMOTION_DURATION_MAX_DAYS = 365;

// টিয়ার প্রাইসিং কনস্ট্যান্ট
export const PRODUCT_MAX_TIER_LEVELS = 10;
export const PRODUCT_MIN_QUANTITY_FOR_TIER = 2;
export const PRODUCT_MAX_QUANTITY_FOR_TIER = 10000;

// বাল্ক ডিসকাউন্ট কনস্ট্যান্ট
export const PRODUCT_BULK_DISCOUNT_MIN_QUANTITY = 10;
export const PRODUCT_BULK_DISCOUNT_MAX_QUANTITY = 10000;
export const PRODUCT_BULK_DISCOUNT_MIN_PERCENTAGE = 5;
export const PRODUCT_BULK_DISCOUNT_MAX_PERCENTAGE = 50;

// প্রাইসিং স্ট্র্যাটেজি কনস্ট্যান্ট
export const ProductPricingStrategy = {
  COMPETITIVE: 'COMPETITIVE',
  PREMIUM: 'PREMIUM',
  ECONOMY: 'ECONOMY',
  PENETRATION: 'PENETRATION',
  SKIMMING: 'SKIMMING',
  BUNDLE: 'BUNDLE',
  DYNAMIC: 'DYNAMIC',
} as const;

export type ProductPricingStrategyType =
  (typeof ProductPricingStrategy)[keyof typeof ProductPricingStrategy];

// ডিফল্ট প্রাইসিং স্ট্র্যাটেজি
export const PRODUCT_DEFAULT_PRICING_STRATEGY = ProductPricingStrategy.COMPETITIVE;

// কারেন্সি ফরম্যাট কনস্ট্যান্ট
export const PRODUCT_CURRENCY_FORMAT = {
  BDT: { locale: 'bn-BD', currency: 'BDT', symbol: '৳' },
  USD: { locale: 'en-US', currency: 'USD', symbol: '$' },
  EUR: { locale: 'de-DE', currency: 'EUR', symbol: '€' },
  GBP: { locale: 'en-GB', currency: 'GBP', symbol: '£' },
  INR: { locale: 'en-IN', currency: 'INR', symbol: '₹' },
  JPY: { locale: 'ja-JP', currency: 'JPY', symbol: '¥' },
  CNY: { locale: 'zh-CN', currency: 'CNY', symbol: '¥' },
  AUD: { locale: 'en-AU', currency: 'AUD', symbol: 'A$' },
  CAD: { locale: 'en-CA', currency: 'CAD', symbol: 'C$' },
  CHF: { locale: 'de-CH', currency: 'CHF', symbol: 'Fr' },
} as const;

// প্রাইসিং মেটাডাটা কনস্ট্যান্ট
export const PRODUCT_MAX_PRICING_META_FIELDS = 20;
export const PRODUCT_PRICING_META_KEY_MAX_LENGTH = 100;
export const PRODUCT_PRICING_META_VALUE_MAX_LENGTH = 1000;

// প্রাইসিং হিস্টোরি কনস্ট্যান্ট
export const PRODUCT_PRICING_HISTORY_MAX_DAYS = 365;
export const PRODUCT_PRICING_HISTORY_MAX_ENTRIES = 10000;

// প্রাইসিং ক্যালকুলেশন কনস্ট্যান্ট
export const PRODUCT_PRICE_CALCULATION_PRECISION = 4;
export const PRODUCT_PRICE_DISPLAY_PRECISION = 2;

// প্রাইসিং নোটিফিকেশন কনস্ট্যান্ট
export const PRODUCT_PRICE_CHANGE_NOTIFICATION_THRESHOLD = 10; // পার্সেন্টেজ
export const PRODUCT_PRICE_ALERT_CHECK_INTERVAL_HOURS = 24;

// প্রাইসিং রুলস কনস্ট্যান্ট
export const PRODUCT_MAX_PRICING_RULES = 50;
export const PRODUCT_PRICING_RULE_PRIORITY_MIN = 0;
export const PRODUCT_PRICING_RULE_PRIORITY_MAX = 1000;

// ডাইনামিক প্রাইসিং কনস্ট্যান্ট
export const PRODUCT_DYNAMIC_PRICE_UPDATE_INTERVAL_MINUTES = 15;
export const PRODUCT_DYNAMIC_PRICE_MAX_CHANGE_PERCENT = 30;
