/**
 * ভেন্ডার পেআউট সংক্রান্ত মৌলিক কনস্ট্যান্টসমূহ
 */

/**
 * পেআউট সাইকেল অবজেক্ট
 */
export const PayoutCycle = {
  DAILY: 'DAILY',
  WEEKLY: 'WEEKLY',
  BI_WEEKLY: 'BI_WEEKLY',
  MONTHLY: 'MONTHLY',
  QUARTERLY: 'QUARTERLY',
  MANUAL: 'MANUAL',
} as const;

/**
 * পেআউট সাইকেল - ইউনিয়ন টাইপ
 */
export type PayoutCycleValue = (typeof PayoutCycle)[keyof typeof PayoutCycle];

/**
 * ন্যূনতম পেআউট পরিমাণ
 */
export const MIN_PAYOUT_AMOUNT = 100;

/**
 * সর্বোচ্চ পেআউট পরিমাণ
 */
export const MAX_PAYOUT_AMOUNT = 1000000;

/**
 * ডিফল্ট কারেন্সি
 */
export const DEFAULT_CURRENCY = 'BDT';

/**
 * সমর্থিত কারেন্সিসমূহ
 */
export const SUPPORTED_CURRENCIES = ['BDT', 'USD', 'EUR', 'GBP'] as const;

/**
 * সমর্থিত কারেন্সি টাইপ
 */
export type SupportedCurrencyValue = (typeof SUPPORTED_CURRENCIES)[number];

/**
 * পেআউট প্রসেসিং দিন সংখ্যা
 */
export const PayoutProcessingDays = 2;

/**
 * পেআউট ফি স্ট্রাকচার
 */
export const PayoutFeeStructure = {
  FLAT: 'FLAT',
  PERCENTAGE: 'PERCENTAGE',
  TIERED: 'TIERED',
} as const;

/**
 * পেআউট ফি স্ট্রাকচার - ইউনিয়ন টাইপ
 */
export type PayoutFeeStructureValue = (typeof PayoutFeeStructure)[keyof typeof PayoutFeeStructure];

/**
 * পেআউট সাইকেল লেবেলসমূহ
 */
export const PayoutCycleLabels: Record<PayoutCycleValue, { en: string; bn: string }> = {
  [PayoutCycle.DAILY]: {
    en: 'Daily',
    bn: 'দৈনিক',
  },
  [PayoutCycle.WEEKLY]: {
    en: 'Weekly',
    bn: 'সাপ্তাহিক',
  },
  [PayoutCycle.BI_WEEKLY]: {
    en: 'Bi-Weekly',
    bn: 'পাক্ষিক',
  },
  [PayoutCycle.MONTHLY]: {
    en: 'Monthly',
    bn: 'মাসিক',
  },
  [PayoutCycle.QUARTERLY]: {
    en: 'Quarterly',
    bn: 'ত্রৈমাসিক',
  },
  [PayoutCycle.MANUAL]: {
    en: 'Manual',
    bn: 'ম্যানুয়াল',
  },
};

/**
 * পেআউট ফি স্ট্রাকচার লেবেলসমূহ
 */
export const PayoutFeeStructureLabels: Record<PayoutFeeStructureValue, { en: string; bn: string }> =
  {
    [PayoutFeeStructure.FLAT]: {
      en: 'Flat Fee',
      bn: 'স্থির ফি',
    },
    [PayoutFeeStructure.PERCENTAGE]: {
      en: 'Percentage Fee',
      bn: 'শতাংশ ফি',
    },
    [PayoutFeeStructure.TIERED]: {
      en: 'Tiered Fee',
      bn: 'স্তর ভিত্তিক ফি',
    },
  };

/**
 * ডিফল্ট পেআউট ফি (শতকরা)
 */
export const DEFAULT_PAYOUT_FEE_PERCENTAGE = 1.5;

/**
 * ডিফল্ট পেআউট ফি (স্থির)
 */
export const DEFAULT_PAYOUT_FLAT_FEE = 50;

/**
 * পেআউট রিট্রাই সর্বোচ্চ সংখ্যা
 */
export const MAX_PAYOUT_RETRY = 3;

/**
 * পেআউট টাইমআউট সময় (সেকেন্ড)
 */
export const PAYOUT_TIMEOUT_SECONDS = 30;
