/**
 * রিটার্ন শিপমেন্ট সম্পর্কিত মৌলিক কনস্ট্যান্টসমূহ
 */

/**
 * রিটার্ন নম্বরের প্রিফিক্স
 */
export const RETURN_PREFIX = 'RET-' as const;

/**
 * রিটার্ন নম্বরের ফরম্যাট
 */
export const RETURN_NUMBER_FORMAT = {
  PREFIX: RETURN_PREFIX,
  SEPARATOR: '-',
  DATE_FORMAT: 'YYYYMMDD',
  RANDOM_LENGTH: 6,
} as const;

/**
 * রিটার্নের সময়সীমা (দিন)
 */
export const RETURN_TIME_LIMIT_DAYS = 7;

/**
 * রিটার্নের সর্বোচ্চ আইটেম সংখ্যা
 */
export const MAX_RETURN_ITEMS = 20;

/**
 * রিটার্ন শিপিং খরচ সম্পর্কিত কনস্ট্যান্ট
 */
export const RETURN_SHIPPING_COST = {
  FREE: 0,
  STANDARD: 50,
  EXPRESS: 100,
  INTERNATIONAL: 200,
  SURCHARGE_PERCENT: 2.5,
  MINIMUM_CHARGE: 20,
  MAXIMUM_CHARGE: 500,
} as const;

/**
 * রিটার্ন শিপিং খরচ টাইপ
 */
export type ReturnShippingCost = typeof RETURN_SHIPPING_COST;

/**
 * রিটার্ন এপ্রুভাল প্রক্রিয়ার সময়সীমা (ঘন্টা)
 */
export const RETURN_APPROVAL_TIMEOUT_HOURS = 48;

/**
 * রিটার্ন কনফিগারেশন
 */
export const RETURN_CONFIG = {
  PREFIX: RETURN_PREFIX,
  NUMBER_FORMAT: RETURN_NUMBER_FORMAT,
  TIME_LIMIT_DAYS: RETURN_TIME_LIMIT_DAYS,
  MAX_ITEMS: MAX_RETURN_ITEMS,
  SHIPPING_COST: RETURN_SHIPPING_COST,
  APPROVAL_TIMEOUT: RETURN_APPROVAL_TIMEOUT_HOURS,
} as const;

/**
 * রিটার্ন কনফিগারেশন টাইপ
 */
export type ReturnConfig = typeof RETURN_CONFIG;

/**
 * রিটার্ন নম্বর জেনারেট করুন
 */
export function generateReturnNumber(): string {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const dateStr = `${year}${month}${day}`;
  const random = Math.random().toString(36).substring(2, 8).toUpperCase();
  return `${RETURN_PREFIX}${dateStr}${RETURN_NUMBER_FORMAT.SEPARATOR}${random}`;
}

/**
 * রিটার্ন নম্বর ভালিডেট করুন
 */
export function isValidReturnNumber(number: string): boolean {
  return number.startsWith(RETURN_PREFIX) && number.length >= 15;
}

/**
 * রিটার্ন সময়সীমা ভালিডেট করুন
 */
export function isValidReturnTimeLimit(days: number): boolean {
  return days > 0 && days <= 30;
}

/**
 * রিটার্ন আইটেম সংখ্যা ভালিডেট করুন
 */
export function isValidReturnItems(count: number): boolean {
  return count > 0 && count <= MAX_RETURN_ITEMS;
}

/**
 * রিটার্ন শিপিং খরচ গণনা করুন
 */
export function calculateReturnShippingCost(
  weight: number,
  distance: number,
  isInternational: boolean = false,
  isExpress: boolean = false
): number {
  const cost = RETURN_SHIPPING_COST;
  let total = cost.STANDARD + weight * 2 + distance * 0.5;

  if (isInternational) {
    total += cost.INTERNATIONAL;
  }

  if (isExpress) {
    total += cost.EXPRESS;
  }

  const surcharge = total * (cost.SURCHARGE_PERCENT / 100);
  total += surcharge;

  total = Math.max(total, cost.MINIMUM_CHARGE);
  total = Math.min(total, cost.MAXIMUM_CHARGE);

  return total;
}

/**
 * রিটার্ন ফ্রি শিপিং উপলব্ধ কিনা
 */
export function isFreeReturnShipping(weight: number, distance: number): boolean {
  return weight <= 5 && distance <= 50;
}

/**
 * রিটার্ন এপ্রুভাল টাইমআউট গণনা করুন
 */
export function calculateReturnApprovalDeadline(requestDate: Date): Date {
  const deadline = new Date(requestDate);
  deadline.setHours(deadline.getHours() + RETURN_APPROVAL_TIMEOUT_HOURS);
  return deadline;
}

/**
 * রিটার্ন এপ্রুভাল টাইমআউট পেরিয়েছে কিনা
 */
export function isReturnApprovalTimeoutExceeded(requestDate: Date): boolean {
  const deadline = calculateReturnApprovalDeadline(requestDate);
  return new Date() > deadline;
}
