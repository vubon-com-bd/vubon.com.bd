/**
 * শিপিং রেট সম্পর্কিত মৌলিক কনস্ট্যান্টসমূহ
 */

/**
 * রেট ক্যালকুলেশনের ভিত্তি
 */
export const RATE_CALCULATION_BASIS = {
  WEIGHT: 'weight',
  VOLUME: 'volume',
  DISTANCE: 'distance',
  WEIGHT_VOLUME: 'weight_volume',
  WEIGHT_DISTANCE: 'weight_distance',
  VOLUME_DISTANCE: 'volume_distance',
  ALL: 'all',
} as const;

/**
 * রেট ক্যালকুলেশনের ভিত্তি টাইপ
 */
export type RateCalculationBasis =
  (typeof RATE_CALCULATION_BASIS)[keyof typeof RATE_CALCULATION_BASIS];

/**
 * ডিফল্ট রেটের মান
 */
export const DEFAULT_RATE_VALUES = {
  WEIGHT: 10,
  VOLUME: 5,
  DISTANCE: 2,
  BASE: 50,
} as const;

/**
 * রেটের সর্বোচ্চ এবং সর্বনিম্ন সীমা
 */
export const RATE_LIMITS = {
  MINIMUM: 10,
  MAXIMUM: 1000,
  WEIGHT_MIN: 1,
  WEIGHT_MAX: 100,
  VOLUME_MIN: 0.1,
  VOLUME_MAX: 10,
  DISTANCE_MIN: 1,
  DISTANCE_MAX: 500,
} as const;

/**
 * ডিসকাউন্ট ফর্মুলা
 */
export const DISCOUNT_FORMULA = {
  PERCENTAGE_DISCOUNT: 'percentage',
  FIXED_DISCOUNT: 'fixed',
  BULK_DISCOUNT: 'bulk',
  SEASONAL_DISCOUNT: 'seasonal',
  LOYALTY_DISCOUNT: 'loyalty',
} as const;

/**
 * ডিসকাউন্ট ফর্মুলা টাইপ
 */
export type DiscountFormulaType = (typeof DISCOUNT_FORMULA)[keyof typeof DISCOUNT_FORMULA];

/**
 * ডিসকাউন্ট কনফিগারেশন
 */
export const DISCOUNT_CONFIG = {
  DEFAULT_PERCENTAGE: 10,
  MAX_PERCENTAGE: 50,
  BULK_THRESHOLD: 10,
  BULK_DISCOUNT_PERCENT: 15,
  SEASONAL_DISCOUNT_PERCENT: 20,
  LOYALTY_DISCOUNT_PERCENT: 5,
} as const;

/**
 * কারেন্সি কনভার্সন রেট
 */
export const CURRENCY_CONVERSION_RATES = {
  USD: 1,
  EUR: 0.85,
  GBP: 0.73,
  BDT: 110,
  INR: 83,
  CNY: 7.2,
  JPY: 150,
  CAD: 1.35,
  AUD: 1.5,
  SGD: 1.35,
} as const;

/**
 * কারেন্সি কনভার্সন রেট টাইপ
 */
export type CurrencyConversionRates = typeof CURRENCY_CONVERSION_RATES;

/**
 * শিপিং রেট ক্যালকুলেশন প্যারামিটার
 */
export interface ShippingRateCalculationParams {
  weight: number;
  volume: number;
  distance: number;
  basis: RateCalculationBasis;
  isExpress?: boolean;
  isInternational?: boolean;
  discount?: DiscountFormulaType;
  discountValue?: number;
}

/**
 * শিপিং রেট ক্যালকুলেশন ফলাফল
 */
export interface ShippingRateCalculationResult {
  baseRate: number;
  weightCharge: number;
  volumeCharge: number;
  distanceCharge: number;
  subtotal: number;
  discount: number;
  surcharge: number;
  tax: number;
  total: number;
  breakdown: {
    baseRate: number;
    weightCharge: number;
    volumeCharge: number;
    distanceCharge: number;
    discount: number;
    surcharge: number;
    tax: number;
  };
}

/**
 * শিপিং রেট কনফিগারেশন
 */
export const SHIPPING_RATE_CONFIG = {
  CALCULATION_BASIS: RATE_CALCULATION_BASIS,
  DEFAULT_RATES: DEFAULT_RATE_VALUES,
  LIMITS: RATE_LIMITS,
  DISCOUNT_FORMULA,
  DISCOUNT_CONFIG,
  CURRENCY_RATES: CURRENCY_CONVERSION_RATES,
} as const;

/**
 * শিপিং রেট কনফিগারেশন টাইপ
 */
export type ShippingRateConfig = typeof SHIPPING_RATE_CONFIG;

/**
 * শিপিং রেট গণনা করুন
 */
export function calculateShippingRate(
  params: ShippingRateCalculationParams
): ShippingRateCalculationResult {
  const {
    weight,
    volume,
    distance,
    basis,
    isExpress = false,
    isInternational = false,
    discount,
    discountValue,
  } = params;
  const defaultRates = DEFAULT_RATE_VALUES;

  // বেস রেট
  let baseRate = defaultRates.BASE;
  let weightCharge = 0;
  let volumeCharge = 0;
  let distanceCharge = 0;

  // ক্যালকুলেশন বেসিস অনুযায়ী চার্জ
  if (
    basis === RATE_CALCULATION_BASIS.WEIGHT ||
    basis === RATE_CALCULATION_BASIS.WEIGHT_VOLUME ||
    basis === RATE_CALCULATION_BASIS.WEIGHT_DISTANCE ||
    basis === RATE_CALCULATION_BASIS.ALL
  ) {
    weightCharge = weight * defaultRates.WEIGHT;
  }

  if (
    basis === RATE_CALCULATION_BASIS.VOLUME ||
    basis === RATE_CALCULATION_BASIS.WEIGHT_VOLUME ||
    basis === RATE_CALCULATION_BASIS.VOLUME_DISTANCE ||
    basis === RATE_CALCULATION_BASIS.ALL
  ) {
    volumeCharge = volume * defaultRates.VOLUME;
  }

  if (
    basis === RATE_CALCULATION_BASIS.DISTANCE ||
    basis === RATE_CALCULATION_BASIS.WEIGHT_DISTANCE ||
    basis === RATE_CALCULATION_BASIS.VOLUME_DISTANCE ||
    basis === RATE_CALCULATION_BASIS.ALL
  ) {
    distanceCharge = distance * defaultRates.DISTANCE;
  }

  let subtotal = baseRate + weightCharge + volumeCharge + distanceCharge;

  // এক্সপ্রেস এবং আন্তর্জাতিক চার্জ
  let surcharge = 0;
  if (isExpress) {
    surcharge += subtotal * 0.3;
  }
  if (isInternational) {
    surcharge += subtotal * 0.5;
  }

  subtotal += surcharge;

  // ডিসকাউন্ট
  let discountAmount = 0;
  if (discount && discountValue !== undefined) {
    if (discount === DISCOUNT_FORMULA.PERCENTAGE_DISCOUNT) {
      discountAmount = subtotal * (discountValue / 100);
    } else if (discount === DISCOUNT_FORMULA.FIXED_DISCOUNT) {
      discountAmount = Math.min(discountValue, subtotal);
    } else if (discount === DISCOUNT_FORMULA.BULK_DISCOUNT) {
      if (weight >= DISCOUNT_CONFIG.BULK_THRESHOLD) {
        discountAmount = subtotal * (DISCOUNT_CONFIG.BULK_DISCOUNT_PERCENT / 100);
      }
    } else if (discount === DISCOUNT_FORMULA.SEASONAL_DISCOUNT) {
      discountAmount = subtotal * (DISCOUNT_CONFIG.SEASONAL_DISCOUNT_PERCENT / 100);
    } else if (discount === DISCOUNT_FORMULA.LOYALTY_DISCOUNT) {
      discountAmount = subtotal * (DISCOUNT_CONFIG.LOYALTY_DISCOUNT_PERCENT / 100);
    }
  }

  // ট্যাক্স
  const tax = (subtotal - discountAmount) * 0.05;

  const total = subtotal - discountAmount + tax;

  return {
    baseRate,
    weightCharge,
    volumeCharge,
    distanceCharge,
    subtotal,
    discount: discountAmount,
    surcharge,
    tax,
    total: Math.max(total, RATE_LIMITS.MINIMUM),
    breakdown: {
      baseRate,
      weightCharge,
      volumeCharge,
      distanceCharge,
      discount: discountAmount,
      surcharge,
      tax,
    },
  };
}

/**
 * শিপিং রেট ভালিডেট করুন
 */
export function isValidShippingRate(rate: number): boolean {
  return rate >= RATE_LIMITS.MINIMUM && rate <= RATE_LIMITS.MAXIMUM;
}

/**
 * ডিসকাউন্ট ভালিডেট করুন
 */
export function isValidDiscount(discount: number, type: DiscountFormulaType): boolean {
  if (type === DISCOUNT_FORMULA.PERCENTAGE_DISCOUNT) {
    return discount >= 0 && discount <= DISCOUNT_CONFIG.MAX_PERCENTAGE;
  }
  return discount >= 0;
}

/**
 * কারেন্সি কনভার্ট করুন
 */
export function convertCurrency(amount: number, from: string, to: string): number {
  const rates = CURRENCY_CONVERSION_RATES as Record<string, number>;
  const fromRate = rates[from];
  const toRate = rates[to];

  if (!fromRate || !toRate) {
    throw new Error(`Invalid currency: ${from} or ${to}`);
  }

  return (amount / fromRate) * toRate;
}

/**
 * রেট ক্যালকুলেশনের ভিত্তির বিবরণ পাওয়া
 */
export function getRateCalculationBasisDescription(basis: RateCalculationBasis): string {
  const descriptions: Record<RateCalculationBasis, string> = {
    [RATE_CALCULATION_BASIS.WEIGHT]: 'ওজনভিত্তিক - পণ্যের ওজন অনুযায়ী রেট নির্ধারণ',
    [RATE_CALCULATION_BASIS.VOLUME]: 'ভলিউমভিত্তিক - পণ্যের আয়তন অনুযায়ী রেট নির্ধারণ',
    [RATE_CALCULATION_BASIS.DISTANCE]: 'দূরত্বভিত্তিক - পরিবহন দূরত্ব অনুযায়ী রেট নির্ধারণ',
    [RATE_CALCULATION_BASIS.WEIGHT_VOLUME]: 'ওজন ও ভলিউমভিত্তিক - উভয় ফ্যাক্টর বিবেচনা',
    [RATE_CALCULATION_BASIS.WEIGHT_DISTANCE]: 'ওজন ও দূরত্বভিত্তিক - উভয় ফ্যাক্টর বিবেচনা',
    [RATE_CALCULATION_BASIS.VOLUME_DISTANCE]: 'ভলিউম ও দূরত্বভিত্তিক - উভয় ফ্যাক্টর বিবেচনা',
    [RATE_CALCULATION_BASIS.ALL]: 'সবগুলো - ওজন, ভলিউম ও দূরত্ব সব বিবেচনা',
  };
  return descriptions[basis];
}

/**
 * ডিসকাউন্ট ফর্মুলার বিবরণ পাওয়া
 */
export function getDiscountFormulaDescription(formula: DiscountFormulaType): string {
  const descriptions: Record<DiscountFormulaType, string> = {
    [DISCOUNT_FORMULA.PERCENTAGE_DISCOUNT]: 'শতকরা ডিসকাউন্ট - মোট খরচের উপর শতকরা হার',
    [DISCOUNT_FORMULA.FIXED_DISCOUNT]: 'নির্দিষ্ট ডিসকাউন্ট - নির্দিষ্ট পরিমাণ ছাড়',
    [DISCOUNT_FORMULA.BULK_DISCOUNT]: 'বাল্ক ডিসকাউন্ট - বড় অর্ডারে ছাড়',
    [DISCOUNT_FORMULA.SEASONAL_DISCOUNT]: 'মৌসুমী ডিসকাউন্ট - নির্দিষ্ট মৌসুমে ছাড়',
    [DISCOUNT_FORMULA.LOYALTY_DISCOUNT]: 'লয়ালটি ডিসকাউন্ট - নিয়মিত গ্রাহকদের জন্য ছাড়',
  };
  return descriptions[formula];
}
