/**
 * লজিস্টিকস সিস্টেমের মৌলিক কনস্ট্যান্টসমূহ
 * বাংলাদেশ ভিত্তিক ই-কমার্স ওয়েবসাইটের জন্য
 */

/**
 * লজিস্টিকস সার্ভিসের নামসমূহ
 */
export const LOGISTICS_SERVICES = {
  PATHAO: 'pathao',
  REDX: 'redx',
  STEADFAST: 'steadfast',
  SUNDARBAN: 'sundarban',
  SAUZ: 'sauz',
  E_COURIER: 'e_courier',
  PAPERFLY: 'paperfly',
  DHL: 'dhl',
  FEDEX: 'fedex',
} as const;

/**
 * লজিস্টিকস সার্ভিসের টাইপ
 */
export type LogisticsService = (typeof LOGISTICS_SERVICES)[keyof typeof LOGISTICS_SERVICES];

/**
 * ডিফল্ট কারেন্সি (বাংলাদেশী টাকা)
 */
export const DEFAULT_CURRENCY = 'BDT' as const;

/**
 * ডিফল্ট সময় অঞ্চল (বাংলাদেশ সময়)
 */
export const DEFAULT_TIMEZONE = 'Asia/Dhaka' as const;

/**
 * লজিস্টিকসের সর্বোচ্চ ওজন সীমা (কেজি)
 */
export const MAX_WEIGHT_LIMIT_KG = 50;

/**
 * ট্র্যাকিং নম্বরের প্রিফিক্স
 */
export const TRACKING_PREFIXES = {
  PATHAO: 'PATH',
  REDX: 'RDX',
  STEADFAST: 'SFS',
  SUNDARBAN: 'SUN',
  SAUZ: 'SAU',
  E_COURIER: 'ECO',
  PAPERFLY: 'PFL',
  DHL: 'DHL',
  FEDEX: 'FDX',
} as const;

/**
 * ট্র্যাকিং নম্বরের প্রিফিক্স টাইপ
 */
export type TrackingPrefix = (typeof TRACKING_PREFIXES)[keyof typeof TRACKING_PREFIXES];

/**
 * ডিফল্ট পেজিনেশন সাইজ
 */
export const DEFAULT_PAGINATION_SIZE = 10;

/**
 * লজিস্টিকস স্ট্যাটাস
 */
export const LOGISTICS_STATUS = {
  PENDING: 'pending',
  PICKED_UP: 'picked_up',
  IN_TRANSIT: 'in_transit',
  OUT_FOR_DELIVERY: 'out_for_delivery',
  DELIVERED: 'delivered',
  RETURNED: 'returned',
  CANCELLED: 'cancelled',
  DELAYED: 'delayed',
  FAILED: 'failed',
} as const;

/**
 * লজিস্টিকস স্ট্যাটাস টাইপ
 */
export type LogisticsStatus = (typeof LOGISTICS_STATUS)[keyof typeof LOGISTICS_STATUS];

/**
 * লজিস্টিকস প্যাকেজ টাইপ
 */
export const PACKAGE_TYPES = {
  DOCUMENT: 'document',
  PARCEL: 'parcel',
  FRAGILE: 'fragile',
  LIQUID: 'liquid',
  ELECTRONICS: 'electronics',
  FURNITURE: 'furniture',
  CLOTHING: 'clothing',
  FOOD: 'food',
  MEDICINE: 'medicine',
} as const;

/**
 * লজিস্টিকস প্যাকেজ টাইপ
 */
export type PackageType = (typeof PACKAGE_TYPES)[keyof typeof PACKAGE_TYPES];

/**
 * লজিস্টিকস ডেলিভারি টাইপ
 */
export const DELIVERY_TYPES = {
  STANDARD: 'standard',
  EXPRESS: 'express',
  SAME_DAY: 'same_day',
  NEXT_DAY: 'next_day',
  SCHEDULED: 'scheduled',
  ECONOMY: 'economy',
} as const;

/**
 * লজিস্টিকস ডেলিভারি টাইপ
 */
export type DeliveryType = (typeof DELIVERY_TYPES)[keyof typeof DELIVERY_TYPES];

/**
 * লজিস্টিকস পেমেন্ট স্ট্যাটাস
 */
export const PAYMENT_STATUS = {
  PENDING: 'pending',
  PAID: 'paid',
  FAILED: 'failed',
  REFUNDED: 'refunded',
  PARTIALLY_PAID: 'partially_paid',
  CASH_ON_DELIVERY: 'cash_on_delivery',
} as const;

/**
 * লজিস্টিকস পেমেন্ট স্ট্যাটাস টাইপ
 */
export type PaymentStatus = (typeof PAYMENT_STATUS)[keyof typeof PAYMENT_STATUS];

/**
 * লজিস্টিকস ডেলিভারি সময় (ঘন্টায়)
 */
export const DELIVERY_TIME_HOURS = {
  STANDARD: 48,
  EXPRESS: 24,
  SAME_DAY: 6,
  NEXT_DAY: 12,
  SCHEDULED: 72,
  ECONOMY: 96,
} as const;

/**
 * লজিস্টিকস ডেলিভারি সময় টাইপ
 */
export type DeliveryTimeHours = typeof DELIVERY_TIME_HOURS;

/**
 * লজিস্টিকস কনফিগারেশন অবজেক্ট
 */
export const LOGISTICS_CONFIG = {
  DEFAULT_CURRENCY,
  DEFAULT_TIMEZONE,
  MAX_WEIGHT_LIMIT_KG,
  DEFAULT_PAGINATION_SIZE,
  SUPPORTED_SERVICES: Object.values(LOGISTICS_SERVICES),
  TRACKING_PREFIXES,
  STATUS: LOGISTICS_STATUS,
  PACKAGE_TYPES,
  DELIVERY_TYPES,
  PAYMENT_STATUS,
  DELIVERY_TIME_HOURS,
} as const;

/**
 * লজিস্টিকস কনফিগারেশন টাইপ
 */
export type LogisticsConfig = typeof LOGISTICS_CONFIG;

/**
 * লজিস্টিকস সার্ভিস কনফিগারেশন
 */
export const SERVICE_CONFIG = {
  [LOGISTICS_SERVICES.PATHAO]: {
    name: 'Pathao',
    supportedAreas: ['Dhaka', 'Chittagong', 'Sylhet', 'Khulna', 'Rajshahi', 'Barishal'],
    maxWeight: 50,
    basePrice: 60,
    perKgPrice: 15,
    codAvailable: true,
    trackingPrefix: TRACKING_PREFIXES.PATHAO,
  },
  [LOGISTICS_SERVICES.REDX]: {
    name: 'RedX',
    supportedAreas: ['Dhaka', 'Chittagong', 'Sylhet', 'Khulna', 'Rajshahi'],
    maxWeight: 40,
    basePrice: 50,
    perKgPrice: 12,
    codAvailable: true,
    trackingPrefix: TRACKING_PREFIXES.REDX,
  },
  [LOGISTICS_SERVICES.STEADFAST]: {
    name: 'Steadfast',
    supportedAreas: ['Dhaka', 'Chittagong', 'Sylhet', 'Khulna', 'Rajshahi', 'Barishal', 'Rangpur'],
    maxWeight: 45,
    basePrice: 55,
    perKgPrice: 14,
    codAvailable: true,
    trackingPrefix: TRACKING_PREFIXES.STEADFAST,
  },
} as const;

/**
 * লজিস্টিকস সার্ভিস কনফিগারেশন টাইপ
 */
export type ServiceConfig = typeof SERVICE_CONFIG;
