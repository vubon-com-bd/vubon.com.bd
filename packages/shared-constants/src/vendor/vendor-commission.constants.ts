/**
 * ভেন্ডার কমিশন সংক্রান্ত কনস্ট্যান্টসমূহ
 */

/**
 * কমিশন টাইপ অবজেক্ট
 */
export const CommissionType = {
  PERCENTAGE: 'PERCENTAGE',
  FIXED: 'FIXED',
  TIERED: 'TIERED',
  HYBRID: 'HYBRID',
  VOLUME_BASED: 'VOLUME_BASED',
} as const;

/**
 * কমিশন টাইপ - ইউনিয়ন টাইপ
 */
export type CommissionTypeValue = (typeof CommissionType)[keyof typeof CommissionType];

/**
 * কমিশন ক্যালকুলেশন টাইপ
 */
export const CommissionCalculationType = {
  GROSS: 'GROSS',
  NET: 'NET',
  PROFIT: 'PROFIT',
} as const;

/**
 * কমিশন ক্যালকুলেশন টাইপ - ইউনিয়ন টাইপ
 */
export type CommissionCalculationTypeValue =
  (typeof CommissionCalculationType)[keyof typeof CommissionCalculationType];

/**
 * ডিফল্ট কমিশন রেট (শতকরা)
 */
export const DEFAULT_COMMISSION_RATE = 5;

/**
 * ন্যূনতম কমিশন রেট (শতকরা)
 */
export const MIN_COMMISSION_RATE = 0;

/**
 * সর্বোচ্চ কমিশন রেট (শতকরা)
 */
export const MAX_COMMISSION_RATE = 100;

/**
 * কমিশন ফ্রিকোয়েন্সি
 */
export const CommissionFrequency = {
  MONTHLY: 'MONTHLY',
  WEEKLY: 'WEEKLY',
  PER_ORDER: 'PER_ORDER',
  CUSTOM: 'CUSTOM',
} as const;

/**
 * কমিশন ফ্রিকোয়েন্সি - ইউনিয়ন টাইপ
 */
export type CommissionFrequencyValue =
  (typeof CommissionFrequency)[keyof typeof CommissionFrequency];

/**
 * কমিশন স্ট্যাটাস
 */
export const CommissionStatus = {
  ACTIVE: 'ACTIVE',
  PAUSED: 'PAUSED',
  TERMINATED: 'TERMINATED',
} as const;

/**
 * কমিশন স্ট্যাটাস - ইউনিয়ন টাইপ
 */
export type CommissionStatusValue = (typeof CommissionStatus)[keyof typeof CommissionStatus];

/**
 * কমিশন টাইপ লেবেলসমূহ
 */
export const CommissionTypeLabels: Record<CommissionTypeValue, { en: string; bn: string }> = {
  [CommissionType.PERCENTAGE]: {
    en: 'Percentage Based',
    bn: 'শতাংশ ভিত্তিক',
  },
  [CommissionType.FIXED]: {
    en: 'Fixed Amount',
    bn: 'নির্দিষ্ট পরিমাণ',
  },
  [CommissionType.TIERED]: {
    en: 'Tiered Based',
    bn: 'স্তর ভিত্তিক',
  },
  [CommissionType.HYBRID]: {
    en: 'Hybrid',
    bn: 'মিশ্র',
  },
  [CommissionType.VOLUME_BASED]: {
    en: 'Volume Based',
    bn: 'ভলিউম ভিত্তিক',
  },
};

/**
 * কমিশন ক্যালকুলেশন টাইপ লেবেলসমূহ
 */
export const CommissionCalculationTypeLabels: Record<
  CommissionCalculationTypeValue,
  { en: string; bn: string }
> = {
  [CommissionCalculationType.GROSS]: {
    en: 'Gross Amount',
    bn: 'মোট পরিমাণ',
  },
  [CommissionCalculationType.NET]: {
    en: 'Net Amount',
    bn: 'নেট পরিমাণ',
  },
  [CommissionCalculationType.PROFIT]: {
    en: 'Profit Amount',
    bn: 'মুনাফার পরিমাণ',
  },
};

/**
 * কমিশন ফ্রিকোয়েন্সি লেবেলসমূহ
 */
export const CommissionFrequencyLabels: Record<
  CommissionFrequencyValue,
  { en: string; bn: string }
> = {
  [CommissionFrequency.MONTHLY]: {
    en: 'Monthly',
    bn: 'মাসিক',
  },
  [CommissionFrequency.WEEKLY]: {
    en: 'Weekly',
    bn: 'সাপ্তাহিক',
  },
  [CommissionFrequency.PER_ORDER]: {
    en: 'Per Order',
    bn: 'প্রতি অর্ডার',
  },
  [CommissionFrequency.CUSTOM]: {
    en: 'Custom',
    bn: 'কাস্টম',
  },
};

/**
 * কমিশন স্ট্যাটাস লেবেলসমূহ
 */
export const CommissionStatusLabels: Record<CommissionStatusValue, { en: string; bn: string }> = {
  [CommissionStatus.ACTIVE]: {
    en: 'Active',
    bn: 'সক্রিয়',
  },
  [CommissionStatus.PAUSED]: {
    en: 'Paused',
    bn: 'স্থগিত',
  },
  [CommissionStatus.TERMINATED]: {
    en: 'Terminated',
    bn: 'সমাপ্ত',
  },
};

/**
 * কমিশন টায়ার লেভেলসমূহ
 */
export const CommissionTierLevels = {
  LEVEL_1: 'LEVEL_1',
  LEVEL_2: 'LEVEL_2',
  LEVEL_3: 'LEVEL_3',
  LEVEL_4: 'LEVEL_4',
  LEVEL_5: 'LEVEL_5',
} as const;

/**
 * কমিশন টায়ার লেভেল - ইউনিয়ন টাইপ
 */
export type CommissionTierLevelValue =
  (typeof CommissionTierLevels)[keyof typeof CommissionTierLevels];

/**
 * কমিশন টায়ার থ্রেশহোল্ডসমূহ
 */
export const CommissionTierThresholds: Record<CommissionTierLevelValue, number> = {
  [CommissionTierLevels.LEVEL_1]: 0,
  [CommissionTierLevels.LEVEL_2]: 1000,
  [CommissionTierLevels.LEVEL_3]: 5000,
  [CommissionTierLevels.LEVEL_4]: 15000,
  [CommissionTierLevels.LEVEL_5]: 50000,
};

/**
 * কমিশন টায়ার রেটসমূহ (শতকরা)
 */
export const CommissionTierRates: Record<CommissionTierLevelValue, number> = {
  [CommissionTierLevels.LEVEL_1]: 5,
  [CommissionTierLevels.LEVEL_2]: 4,
  [CommissionTierLevels.LEVEL_3]: 3,
  [CommissionTierLevels.LEVEL_4]: 2,
  [CommissionTierLevels.LEVEL_5]: 1,
};
