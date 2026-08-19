/**
 * ভেন্ডার রেটিং সংক্রান্ত কনস্ট্যান্টসমূহ
 */

/**
 * রেটিং স্কেল
 */
export const RatingScale = {
  MIN: 1,
  MAX: 5,
  DEFAULT: 5,
} as const;

/**
 * রেটিং ফ্যাক্টর অবজেক্ট
 */
export const RatingFactors = {
  PRODUCT_QUALITY: 'PRODUCT_QUALITY',
  DELIVERY_SPEED: 'DELIVERY_SPEED',
  CUSTOMER_SERVICE: 'CUSTOMER_SERVICE',
  VALUE_FOR_MONEY: 'VALUE_FOR_MONEY',
  ACCURACY: 'ACCURACY',
} as const;

/**
 * রেটিং ফ্যাক্টর - ইউনিয়ন টাইপ
 */
export type RatingFactorValue = (typeof RatingFactors)[keyof typeof RatingFactors];

/**
 * রেটিং ওয়েটেজ (শতকরা)
 */
export const RatingWeightage: Record<RatingFactorValue, number> = {
  [RatingFactors.PRODUCT_QUALITY]: 25,
  [RatingFactors.DELIVERY_SPEED]: 20,
  [RatingFactors.CUSTOMER_SERVICE]: 25,
  [RatingFactors.VALUE_FOR_MONEY]: 15,
  [RatingFactors.ACCURACY]: 15,
};

/**
 * টায়ার আপগ্রেডের জন্য ন্যূনতম রেটিং
 */
export const MinimumRatingsForTier = {
  BRONZE: 2.0,
  SILVER: 3.0,
  GOLD: 3.5,
  PLATINUM: 4.0,
  DIAMOND: 4.5,
} as const;

/**
 * রেটিং সত্যতা যাচাই প্রয়োজন কিনা
 */
export const RatingVerificationRequired = true;

/**
 * রেটিং আপডেট ফ্রিকোয়েন্সি (ঘণ্টা)
 */
export const RatingUpdateFrequency = 24;

/**
 * রেটিং ফ্যাক্টর লেবেলসমূহ
 */
export const RatingFactorLabels: Record<RatingFactorValue, { en: string; bn: string }> = {
  [RatingFactors.PRODUCT_QUALITY]: {
    en: 'Product Quality',
    bn: 'পণ্যের গুণমান',
  },
  [RatingFactors.DELIVERY_SPEED]: {
    en: 'Delivery Speed',
    bn: 'ডেলিভারি গতি',
  },
  [RatingFactors.CUSTOMER_SERVICE]: {
    en: 'Customer Service',
    bn: 'গ্রাহক সেবা',
  },
  [RatingFactors.VALUE_FOR_MONEY]: {
    en: 'Value for Money',
    bn: 'মূল্যের তুলনায় গুণমান',
  },
  [RatingFactors.ACCURACY]: {
    en: 'Accuracy',
    bn: 'সঠিকতা',
  },
};

/**
 * রেটিং ক্যালকুলেশন ফরম্যাট
 */
export const RatingCalculationFormat = {
  AVERAGE: 'AVERAGE',
  WEIGHTED: 'WEIGHTED',
  MEDIAN: 'MEDIAN',
} as const;

/**
 * রেটিং ক্যালকুলেশন ফরম্যাট - ইউনিয়ন টাইপ
 */
export type RatingCalculationFormatValue =
  (typeof RatingCalculationFormat)[keyof typeof RatingCalculationFormat];

/**
 * রেটিং ক্যালকুলেশন ফরম্যাট লেবেলসমূহ
 */
export const RatingCalculationFormatLabels: Record<
  RatingCalculationFormatValue,
  { en: string; bn: string }
> = {
  [RatingCalculationFormat.AVERAGE]: {
    en: 'Average',
    bn: 'গড়',
  },
  [RatingCalculationFormat.WEIGHTED]: {
    en: 'Weighted',
    bn: 'ওয়েটেড',
  },
  [RatingCalculationFormat.MEDIAN]: {
    en: 'Median',
    bn: 'মেডিয়ান',
  },
};

/**
 * রেটিং ন্যূনতম রিভিউ সংখ্যা
 */
export const MinimumReviewsForRating = 5;

/**
 * রেটিং অটো-আপডেট ইন্টারভাল (দিন)
 */
export const RatingAutoUpdateIntervalDays = 7;
