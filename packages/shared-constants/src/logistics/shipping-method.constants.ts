/**
 * শিপিং পদ্ধতি সম্পর্কিত মৌলিক কনস্ট্যান্টসমূহ
 */

/**
 * শিপিং মেথড কোডের প্রিফিক্স
 */
export const SHIPPING_METHOD_PREFIX = 'SHM-' as const;

/**
 * শিপিং মেথড কোডের ফরম্যাট
 */
export const SHIPPING_METHOD_CODE_FORMAT = {
  PREFIX: SHIPPING_METHOD_PREFIX,
  SEPARATOR: '-',
  RANDOM_LENGTH: 6,
} as const;

/**
 * ডিফল্ট শিপিং সময় (দিন)
 */
export const DEFAULT_SHIPPING_TIME_DAYS = 5;

/**
 * শিপিং পদ্ধতির সর্বোচ্চ ওজন সীমা (কেজি)
 */
export const SHIPPING_METHOD_MAX_WEIGHT = {
  STANDARD: 50,
  EXPRESS: 30,
  PRIORITY: 40,
  ECONOMY: 70,
  INTERNATIONAL: 30,
  LOCAL: 50,
  FREE: 20,
} as const;

/**
 * শিপিং পদ্ধতির সর্বোচ্চ ওজন সীমা টাইপ
 */
export type ShippingMethodMaxWeight = typeof SHIPPING_METHOD_MAX_WEIGHT;

/**
 * ট্র্যাকিং সমর্থন সম্পর্কিত কনস্ট্যান্ট
 */
export const SHIPPING_TRACKING = {
  ENABLED: true,
  TRACKING_URL_PATTERN: 'https://track.example.com/',
  UPDATE_INTERVAL_HOURS: 4,
  MAX_TRACKING_ATTEMPTS: 10,
} as const;

/**
 * শিপিং ট্র্যাকিং কনফিগারেশন টাইপ
 */
export type ShippingTracking = typeof SHIPPING_TRACKING;

/**
 * বীমা কাভারেজ সম্পর্কিত কনস্ট্যান্ট
 */
export const SHIPPING_INSURANCE = {
  DEFAULT_COVERAGE_AMOUNT: 1000,
  MAX_COVERAGE_AMOUNT: 50000,
  RATE_PER_1000: 5,
  MINIMUM_PREMIUM: 10,
  PROCESSING_FEE: 50,
} as const;

/**
 * শিপিং বীমা কনফিগারেশন টাইপ
 */
export type ShippingInsurance = typeof SHIPPING_INSURANCE;

/**
 * শিপিং পদ্ধতির খরচ ফর্মুলা
 */
export const SHIPPING_COST_FORMULA = {
  BASE_COST: 50,
  COST_PER_KG: 10,
  COST_PER_KM: 2,
  MINIMUM_COST: 60,
  MAXIMUM_COST: 500,
  FUEL_SURCHARGE_PERCENT: 2.5,
  SERVICE_TAX_PERCENT: 5,
} as const;

/**
 * শিপিং পদ্ধতির খরচ ফর্মুলা টাইপ
 */
export type ShippingCostFormula = typeof SHIPPING_COST_FORMULA;

/**
 * শিপিং মেথড কনফিগারেশন
 */
export const SHIPPING_METHOD_CONFIG = {
  PREFIX: SHIPPING_METHOD_PREFIX,
  CODE_FORMAT: SHIPPING_METHOD_CODE_FORMAT,
  DEFAULT_SHIPPING_TIME_DAYS,
  MAX_WEIGHT: SHIPPING_METHOD_MAX_WEIGHT,
  TRACKING: SHIPPING_TRACKING,
  INSURANCE: SHIPPING_INSURANCE,
  COST_FORMULA: SHIPPING_COST_FORMULA,
} as const;

/**
 * শিপিং মেথড কনফিগারেশন টাইপ
 */
export type ShippingMethodConfig = typeof SHIPPING_METHOD_CONFIG;

/**
 * শিপিং মেথড কোড জেনারেট করুন
 */
export function generateShippingMethodCode(): string {
  const random = Math.random().toString(36).substring(2, 8).toUpperCase();
  return `${SHIPPING_METHOD_PREFIX}${random}`;
}

/**
 * শিপিং মেথড কোড ভালিডেট করুন
 */
export function isValidShippingMethodCode(code: string): boolean {
  return code.startsWith(SHIPPING_METHOD_PREFIX) && code.length >= 9;
}

/**
 * শিপিং খরচ গণনা করুন
 */
export function calculateShippingCost(
  weight: number,
  distance: number,
  isExpress: boolean = false,
  isInternational: boolean = false
): number {
  const formula = SHIPPING_COST_FORMULA;
  let cost = formula.BASE_COST + weight * formula.COST_PER_KG + distance * formula.COST_PER_KM;

  if (isExpress) {
    cost *= 1.3;
  }

  if (isInternational) {
    cost *= 1.5;
  }

  const fuelSurcharge = cost * (formula.FUEL_SURCHARGE_PERCENT / 100);
  const serviceTax = cost * (formula.SERVICE_TAX_PERCENT / 100);

  cost += fuelSurcharge + serviceTax;

  return Math.max(cost, formula.MINIMUM_COST);
}

/**
 * শিপিং খরচ ভালিডেট করুন
 */
export function isValidShippingCost(cost: number): boolean {
  return cost >= SHIPPING_COST_FORMULA.MINIMUM_COST && cost <= SHIPPING_COST_FORMULA.MAXIMUM_COST;
}

/**
 * শিপিং বীমা প্রিমিয়াম গণনা করুন
 */
export function calculateShippingInsurancePremium(amount: number): number {
  const insurance = SHIPPING_INSURANCE;
  let premium = (amount / 1000) * insurance.RATE_PER_1000;
  premium = Math.max(premium, insurance.MINIMUM_PREMIUM);
  return premium + insurance.PROCESSING_FEE;
}

/**
 * শিপিং বীমা কভারেজ ভালিডেট করুন
 */
export function isValidInsuranceCoverage(amount: number): boolean {
  return amount <= SHIPPING_INSURANCE.MAX_COVERAGE_AMOUNT && amount >= 0;
}

/**
 * শিপিং পদ্ধতির ট্র্যাকিং URL তৈরি করুন
 */
export function generateTrackingUrl(trackingNumber: string): string {
  return `${SHIPPING_TRACKING.TRACKING_URL_PATTERN}${trackingNumber}`;
}

/**
 * শিপিং পদ্ধতির সর্বোচ্চ ওজন সীমা পাওয়া
 */
export function getShippingMethodMaxWeight(methodType: string): number {
  return SHIPPING_METHOD_MAX_WEIGHT[methodType as keyof typeof SHIPPING_METHOD_MAX_WEIGHT] || 50;
}
