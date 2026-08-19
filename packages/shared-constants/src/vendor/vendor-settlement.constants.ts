/**
 * ভেন্ডার সেটেলমেন্ট বা নিষ্পত্তি সংক্রান্ত কনস্ট্যান্টসমূহ
 */

/**
 * সেটেলমেন্ট স্ট্যাটাস অবজেক্ট
 */
export const SettlementStatus = {
  INITIATED: 'INITIATED',
  PROCESSING: 'PROCESSING',
  SETTLED: 'SETTLED',
  FAILED: 'FAILED',
  REVERSED: 'REVERSED',
} as const;

/**
 * সেটেলমেন্ট স্ট্যাটাস - ইউনিয়ন টাইপ
 */
export type SettlementStatusValue = (typeof SettlementStatus)[keyof typeof SettlementStatus];

/**
 * সেটেলমেন্ট টাইপ অবজেক্ট
 */
export const SettlementType = {
  REGULAR: 'REGULAR',
  ADVANCE: 'ADVANCE',
  PARTIAL: 'PARTIAL',
  FULL: 'FULL',
} as const;

/**
 * সেটেলমেন্ট টাইপ - ইউনিয়ন টাইপ
 */
export type SettlementTypeValue = (typeof SettlementType)[keyof typeof SettlementType];

/**
 * সেটেলমেন্ট পিরিয়ড
 */
export const SettlementPeriod = {
  DAILY: 'DAILY',
  WEEKLY: 'WEEKLY',
  MONTHLY: 'MONTHLY',
  CUSTOM: 'CUSTOM',
} as const;

/**
 * সেটেলমেন্ট পিরিয়ড - ইউনিয়ন টাইপ
 */
export type SettlementPeriodValue = (typeof SettlementPeriod)[keyof typeof SettlementPeriod];

/**
 * ডিফল্ট সেটেলমেন্ট দিন (মাসের তারিখ)
 */
export const SettlementScheduleDays = [1, 15] as const;

/**
 * সেটেলমেন্ট হোল্ডিং পিরিয়ড (দিন)
 */
export const SettlementHoldingDays = 3;

/**
 * সেটেলমেন্ট স্ট্যাটাস লেবেলসমূহ
 */
export const SettlementStatusLabels: Record<SettlementStatusValue, { en: string; bn: string }> = {
  [SettlementStatus.INITIATED]: {
    en: 'Initiated',
    bn: 'শুরু হয়েছে',
  },
  [SettlementStatus.PROCESSING]: {
    en: 'Processing',
    bn: 'প্রক্রিয়াধীন',
  },
  [SettlementStatus.SETTLED]: {
    en: 'Settled',
    bn: 'নিষ্পত্তি হয়েছে',
  },
  [SettlementStatus.FAILED]: {
    en: 'Failed',
    bn: 'ব্যর্থ',
  },
  [SettlementStatus.REVERSED]: {
    en: 'Reversed',
    bn: 'পুনর্বহাল',
  },
};

/**
 * সেটেলমেন্ট টাইপ লেবেলসমূহ
 */
export const SettlementTypeLabels: Record<SettlementTypeValue, { en: string; bn: string }> = {
  [SettlementType.REGULAR]: {
    en: 'Regular Settlement',
    bn: 'নিয়মিত নিষ্পত্তি',
  },
  [SettlementType.ADVANCE]: {
    en: 'Advance Settlement',
    bn: 'অগ্রিম নিষ্পত্তি',
  },
  [SettlementType.PARTIAL]: {
    en: 'Partial Settlement',
    bn: 'আংশিক নিষ্পত্তি',
  },
  [SettlementType.FULL]: {
    en: 'Full Settlement',
    bn: 'পূর্ণ নিষ্পত্তি',
  },
};

/**
 * সেটেলমেন্ট পিরিয়ড লেবেলসমূহ
 */
export const SettlementPeriodLabels: Record<SettlementPeriodValue, { en: string; bn: string }> = {
  [SettlementPeriod.DAILY]: {
    en: 'Daily',
    bn: 'দৈনিক',
  },
  [SettlementPeriod.WEEKLY]: {
    en: 'Weekly',
    bn: 'সাপ্তাহিক',
  },
  [SettlementPeriod.MONTHLY]: {
    en: 'Monthly',
    bn: 'মাসিক',
  },
  [SettlementPeriod.CUSTOM]: {
    en: 'Custom',
    bn: 'কাস্টম',
  },
};

/**
 * সেটেলমেন্ট প্রক্রিয়ার সর্বোচ্চ সময় (দিন)
 */
export const SettlementMaxProcessingDays = 5;

/**
 * সেটেলমেন্ট রিট্রাই সর্বোচ্চ সংখ্যা
 */
export const SettlementMaxRetry = 3;

/**
 * সেটেলমেন্ট টাইমআউট সময় (সেকেন্ড)
 */
export const SettlementTimeoutSeconds = 60;

/**
 * সেটেলমেন্ট ব্যাচ সাইজ
 */
export const SettlementBatchSize = 100;

/**
 * সেটেলমেন্ট ন্যূনতম পরিমাণ
 */
export const SettlementMinAmount = 10;

/**
 * সেটেলমেন্ট ফি (শতকরা)
 */
export const SettlementFeePercentage = 0.5;
