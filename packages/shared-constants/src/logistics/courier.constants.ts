/**
 * কুরিয়ার সম্পর্কিত মৌলিক কনস্ট্যান্টসমূহ
 */

/**
 * কুরিয়ার কোডের প্রিফিক্স
 */
export const COURIER_PREFIX = 'CR-' as const;

/**
 * কুরিয়ার কোডের ফরম্যাট
 */
export const COURIER_NUMBER_FORMAT = {
  PREFIX: COURIER_PREFIX,
  SEPARATOR: '-',
  DATE_FORMAT: 'YYYYMMDD',
  RANDOM_LENGTH: 6,
} as const;

/**
 * কুরিয়ারের সর্বোচ্চ ক্ষমতা (ওজন কেজিতে)
 */
export const MAX_COURIER_WEIGHT_KG = 100;

/**
 * কুরিয়ারের সর্বোচ্চ ক্ষমতা (ভলিউম ঘনফুটে)
 */
export const MAX_COURIER_VOLUME_CUFT = 50;

/**
 * ডিফল্ট কুরিয়ার কমিশন হার (শতাংশ)
 */
export const DEFAULT_COURIER_COMMISSION_PERCENT = 10;

/**
 * কুরিয়ার রেট ক্যালকুলেশন ফর্মুলা কনস্ট্যান্ট
 */
export const COURIER_RATE_CALCULATION = {
  BASE_RATE: 50,
  RATE_PER_KG: 10,
  RATE_PER_CUFT: 5,
  MINIMUM_CHARGE: 50,
  MAXIMUM_CHARGE: 500,
  FUEL_SURCHARGE_PERCENT: 2.5,
  SERVICE_TAX_PERCENT: 5,
  DISCOUNT_PERCENT: 10,
} as const;

/**
 * কুরিয়ার রেট ক্যালকুলেশন টাইপ
 */
export type CourierRateCalculation = typeof COURIER_RATE_CALCULATION;

/**
 * কুরিয়ার রিভিউ সিস্টেম সম্পর্কিত কনস্ট্যান্ট
 */
export const COURIER_REVIEW = {
  MAX_RATING: 5,
  MIN_RATING: 1,
  DEFAULT_RATING: 3,
  REVIEW_TIMEOUT_DAYS: 7,
  MAX_REVIEW_LENGTH: 500,
  MIN_REVIEW_LENGTH: 10,
  RATING_LEVELS: {
    EXCELLENT: 5,
    GOOD: 4,
    AVERAGE: 3,
    POOR: 2,
    BAD: 1,
  },
} as const;

/**
 * কুরিয়ার রিভিউ টাইপ
 */
export type CourierReview = typeof COURIER_REVIEW;

/**
 * কুরিয়ার সার্ভিস টাইপ
 */
export const COURIER_SERVICE_TYPES = {
  STANDARD: 'standard',
  EXPRESS: 'express',
  SAME_DAY: 'same_day',
  OVERNIGHT: 'overnight',
  INTERNATIONAL: 'international',
  DOMESTIC: 'domestic',
  BULK: 'bulk',
  FRAGILE: 'fragile',
} as const;

/**
 * কুরিয়ার সার্ভিস টাইপ টাইপ
 */
export type CourierServiceType = (typeof COURIER_SERVICE_TYPES)[keyof typeof COURIER_SERVICE_TYPES];

/**
 * কুরিয়ার পেমেন্ট টাইপ
 */
export const COURIER_PAYMENT_TYPES = {
  CASH: 'cash',
  CARD: 'card',
  MOBILE_BANKING: 'mobile_banking',
  BANK_TRANSFER: 'bank_transfer',
  COD: 'cod',
} as const;

/**
 * কুরিয়ার পেমেন্ট টাইপ টাইপ
 */
export type CourierPaymentType = (typeof COURIER_PAYMENT_TYPES)[keyof typeof COURIER_PAYMENT_TYPES];

/**
 * কুরিয়ার কনফিগারেশন
 */
export const COURIER_CONFIG = {
  PREFIX: COURIER_PREFIX,
  NUMBER_FORMAT: COURIER_NUMBER_FORMAT,
  MAX_WEIGHT: MAX_COURIER_WEIGHT_KG,
  MAX_VOLUME: MAX_COURIER_VOLUME_CUFT,
  DEFAULT_COMMISSION: DEFAULT_COURIER_COMMISSION_PERCENT,
  RATE_CALCULATION: COURIER_RATE_CALCULATION,
  REVIEW: COURIER_REVIEW,
  SERVICE_TYPES: COURIER_SERVICE_TYPES,
  PAYMENT_TYPES: COURIER_PAYMENT_TYPES,
} as const;

/**
 * কুরিয়ার কনফিগারেশন টাইপ
 */
export type CourierConfig = typeof COURIER_CONFIG;

/**
 * কুরিয়ার রেট ক্যালকুলেশন ফাংশন
 */
export interface CourierRateCalculationParams {
  weight: number;
  volume: number;
  distance: number;
  serviceType: CourierServiceType;
  isExpress?: boolean;
}

/**
 * কুরিয়ার রেট ক্যালকুলেশন ফলাফল
 */
export interface CourierRateCalculationResult {
  baseRate: number;
  weightCharge: number;
  volumeCharge: number;
  distanceCharge: number;
  fuelSurcharge: number;
  serviceTax: number;
  discount: number;
  total: number;
  breakdown: {
    baseRate: number;
    weightCharge: number;
    volumeCharge: number;
    distanceCharge: number;
    fuelSurcharge: number;
    serviceTax: number;
    discount: number;
  };
}

/**
 * কুরিয়ার রেট ক্যালকুলেট করুন
 */
export function calculateCourierRate(
  params: CourierRateCalculationParams
): CourierRateCalculationResult {
  const { weight, volume, distance, serviceType, isExpress = false } = params;

  const baseRate = COURIER_RATE_CALCULATION.BASE_RATE;
  const weightCharge = weight * COURIER_RATE_CALCULATION.RATE_PER_KG;
  const volumeCharge = volume * COURIER_RATE_CALCULATION.RATE_PER_CUFT;
  const distanceCharge = distance * 2; // প্রতি কিমি ২ টাকা

  let subtotal = baseRate + weightCharge + volumeCharge + distanceCharge;

  // এক্সপ্রেস সার্ভিসের জন্য অতিরিক্ত চার্জ
  if (isExpress || serviceType === COURIER_SERVICE_TYPES.EXPRESS) {
    subtotal *= 1.3;
  }

  // ফুয়েল সারচার্জ
  const fuelSurcharge = subtotal * (COURIER_RATE_CALCULATION.FUEL_SURCHARGE_PERCENT / 100);

  // সার্ভিস ট্যাক্স
  const serviceTax = subtotal * (COURIER_RATE_CALCULATION.SERVICE_TAX_PERCENT / 100);

  // ডিসকাউন্ট (যদি বাল্ক অর্ডার হয়)
  let discount = 0;
  if (serviceType === COURIER_SERVICE_TYPES.BULK) {
    discount = subtotal * (COURIER_RATE_CALCULATION.DISCOUNT_PERCENT / 100);
  }

  const total = subtotal + fuelSurcharge + serviceTax - discount;

  return {
    baseRate,
    weightCharge,
    volumeCharge,
    distanceCharge,
    fuelSurcharge,
    serviceTax,
    discount,
    total: Math.max(total, COURIER_RATE_CALCULATION.MINIMUM_CHARGE),
    breakdown: {
      baseRate,
      weightCharge,
      volumeCharge,
      distanceCharge,
      fuelSurcharge,
      serviceTax,
      discount,
    },
  };
}

/**
 * কুরিয়ার রেট ভালিডেট করুন
 */
export function validateCourierRate(rate: number): boolean {
  return (
    rate >= COURIER_RATE_CALCULATION.MINIMUM_CHARGE &&
    rate <= COURIER_RATE_CALCULATION.MAXIMUM_CHARGE
  );
}

/**
 * কুরিয়ার রিভিউ ভালিডেট করুন
 */
export function validateCourierReview(
  rating: number,
  review: string
): { valid: boolean; errors: string[] } {
  const errors: string[] = [];

  if (rating < COURIER_REVIEW.MIN_RATING || rating > COURIER_REVIEW.MAX_RATING) {
    errors.push(
      `রেটিং ${COURIER_REVIEW.MIN_RATING} থেকে ${COURIER_REVIEW.MAX_RATING} এর মধ্যে হতে হবে`
    );
  }

  if (review.length < COURIER_REVIEW.MIN_REVIEW_LENGTH) {
    errors.push(`রিভিউ ${COURIER_REVIEW.MIN_REVIEW_LENGTH} অক্ষরের বেশি হতে হবে`);
  }

  if (review.length > COURIER_REVIEW.MAX_REVIEW_LENGTH) {
    errors.push(`রিভিউ ${COURIER_REVIEW.MAX_REVIEW_LENGTH} অক্ষরের কম হতে হবে`);
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

/**
 * কুরিয়ার রেটিং লেভেল পাওয়া
 */
export function getCourierRatingLevel(rating: number): string {
  const levels = COURIER_REVIEW.RATING_LEVELS;
  if (rating >= levels.EXCELLENT) return 'Excellent';
  if (rating >= levels.GOOD) return 'Good';
  if (rating >= levels.AVERAGE) return 'Average';
  if (rating >= levels.POOR) return 'Poor';
  return 'Bad';
}
