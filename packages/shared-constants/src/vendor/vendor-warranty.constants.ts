/**
 * ভেন্ডারের ওয়ারেন্টি সংক্রান্ত কনস্ট্যান্টসমূহ
 */

/**
 * ওয়ারেন্টি টাইপ অবজেক্ট
 */
export const WarrantyType = {
  STANDARD: 'STANDARD',
  EXTENDED: 'EXTENDED',
  LIFETIME: 'LIFETIME',
  LIMITED: 'LIMITED',
  PARTS_ONLY: 'PARTS_ONLY',
  LABOR_ONLY: 'LABOR_ONLY',
} as const;

/**
 * ওয়ারেন্টি টাইপ - ইউনিয়ন টাইপ
 */
export type WarrantyTypeValue = (typeof WarrantyType)[keyof typeof WarrantyType];

/**
 * ওয়ারেন্টি ডিউরেশন (দিন)
 */
export const WarrantyDuration = {
  DAYS_30: 30,
  DAYS_90: 90,
  DAYS_180: 180,
  DAYS_365: 365,
  DAYS_730: 730,
  DAYS_1095: 1095,
} as const;

/**
 * ওয়ারেন্টি ডিউরেশন - ইউনিয়ন টাইপ
 */
export type WarrantyDurationValue = (typeof WarrantyDuration)[keyof typeof WarrantyDuration];

/**
 * ওয়ারেন্টি কাভারেজ অবজেক্ট
 */
export const WarrantyCoverage = {
  PARTS: 'PARTS',
  LABOR: 'LABOR',
  SHIPPING: 'SHIPPING',
  ALL: 'ALL',
} as const;

/**
 * ওয়ারেন্টি কাভারেজ - ইউনিয়ন টাইপ
 */
export type WarrantyCoverageValue = (typeof WarrantyCoverage)[keyof typeof WarrantyCoverage];

/**
 * ওয়ারেন্টি স্ট্যাটাস অবজেক্ট
 */
export const WarrantyStatus = {
  ACTIVE: 'ACTIVE',
  EXPIRED: 'EXPIRED',
  CLAIMED: 'CLAIMED',
  INVALID: 'INVALID',
  EXTENDED: 'EXTENDED',
} as const;

/**
 * ওয়ারেন্টি স্ট্যাটাস - ইউনিয়ন টাইপ
 */
export type WarrantyStatusValue = (typeof WarrantyStatus)[keyof typeof WarrantyStatus];

/**
 * ওয়ারেন্টি ক্লেইম প্রসেসিং দিন
 */
export const WarrantyClaimProcessDays = 7;

/**
 * ওয়ারেন্টি স্থানান্তরযোগ্য
 */
export const WarrantyTransferable = true;

/**
 * ওয়ারেন্টি টাইপ লেবেলসমূহ
 */
export const WarrantyTypeLabels: Record<WarrantyTypeValue, { en: string; bn: string }> = {
  [WarrantyType.STANDARD]: {
    en: 'Standard Warranty',
    bn: 'স্ট্যান্ডার্ড ওয়ারেন্টি',
  },
  [WarrantyType.EXTENDED]: {
    en: 'Extended Warranty',
    bn: 'বর্ধিত ওয়ারেন্টি',
  },
  [WarrantyType.LIFETIME]: {
    en: 'Lifetime Warranty',
    bn: 'আজীবন ওয়ারেন্টি',
  },
  [WarrantyType.LIMITED]: {
    en: 'Limited Warranty',
    bn: 'সীমিত ওয়ারেন্টি',
  },
  [WarrantyType.PARTS_ONLY]: {
    en: 'Parts Only Warranty',
    bn: 'শুধু যন্ত্রাংশ',
  },
  [WarrantyType.LABOR_ONLY]: {
    en: 'Labor Only Warranty',
    bn: 'শুধু শ্রম',
  },
};

/**
 * ওয়ারেন্টি কাভারেজ লেবেলসমূহ
 */
export const WarrantyCoverageLabels: Record<WarrantyCoverageValue, { en: string; bn: string }> = {
  [WarrantyCoverage.PARTS]: {
    en: 'Parts Coverage',
    bn: 'যন্ত্রাংশ কাভারেজ',
  },
  [WarrantyCoverage.LABOR]: {
    en: 'Labor Coverage',
    bn: 'শ্রম কাভারেজ',
  },
  [WarrantyCoverage.SHIPPING]: {
    en: 'Shipping Coverage',
    bn: 'শিপিং কাভারেজ',
  },
  [WarrantyCoverage.ALL]: {
    en: 'All Coverage',
    bn: 'সম্পূর্ণ কাভারেজ',
  },
};

/**
 * ওয়ারেন্টি স্ট্যাটাস লেবেলসমূহ
 */
export const WarrantyStatusLabels: Record<WarrantyStatusValue, { en: string; bn: string }> = {
  [WarrantyStatus.ACTIVE]: {
    en: 'Active',
    bn: 'সক্রিয়',
  },
  [WarrantyStatus.EXPIRED]: {
    en: 'Expired',
    bn: 'মেয়াদোত্তীর্ণ',
  },
  [WarrantyStatus.CLAIMED]: {
    en: 'Claimed',
    bn: 'দাবি করা হয়েছে',
  },
  [WarrantyStatus.INVALID]: {
    en: 'Invalid',
    bn: 'অবৈধ',
  },
  [WarrantyStatus.EXTENDED]: {
    en: 'Extended',
    bn: 'বর্ধিত',
  },
};

/**
 * ওয়ারেন্টি স্ট্যাটাস রঙ কোডসমূহ
 */
export const WarrantyStatusColors: Record<WarrantyStatusValue, string> = {
  [WarrantyStatus.ACTIVE]: 'bg-green-100 text-green-800 border-green-300',
  [WarrantyStatus.EXPIRED]: 'bg-gray-100 text-gray-800 border-gray-300',
  [WarrantyStatus.CLAIMED]: 'bg-blue-100 text-blue-800 border-blue-300',
  [WarrantyStatus.INVALID]: 'bg-red-100 text-red-800 border-red-300',
  [WarrantyStatus.EXTENDED]: 'bg-purple-100 text-purple-800 border-purple-300',
};

/**
 * ওয়ারেন্টি রেনিউয়াল সময় (দিন)
 */
export const WarrantyRenewalDays = 30;

/**
 * ওয়ারেন্টি ক্লেইম উইন্ডো (দিন)
 */
export const WarrantyClaimWindowDays = 14;

/**
 * ওয়ারেন্টি ট্রান্সফার ফি
 */
export const WarrantyTransferFee = 200;
