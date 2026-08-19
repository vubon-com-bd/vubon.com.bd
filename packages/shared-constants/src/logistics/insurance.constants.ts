/**
 * বীমা সম্পর্কিত মৌলিক কনস্ট্যান্টসমূহ
 */

/**
 * বীমা পলিসি নম্বরের প্রিফিক্স
 */
export const INSURANCE_PREFIX = 'INS-' as const;

/**
 * বীমা পলিসি নম্বরের ফরম্যাট
 */
export const INSURANCE_NUMBER_FORMAT = {
  PREFIX: INSURANCE_PREFIX,
  SEPARATOR: '-',
  DATE_FORMAT: 'YYYYMMDD',
  RANDOM_LENGTH: 6,
} as const;

/**
 * ডিফল্ট বীমা কাভারেজের পরিমাণ
 */
export const DEFAULT_INSURANCE_COVERAGE = 10000;

/**
 * বীমা প্রিমিয়ামের হার (শতাংশ)
 */
export const INSURANCE_PREMIUM_RATE = 2.5;

/**
 * বীমা দাবির সময়সীমা (দিন)
 */
export const INSURANCE_CLAIM_TIME_LIMIT_DAYS = 30;

/**
 * বীমার সর্বোচ্চ সীমা
 */
export const INSURANCE_MAX_LIMIT = 100000;

/**
 * বীমার সর্বনিম্ন সীমা
 */
export const INSURANCE_MIN_LIMIT = 1000;

/**
 * বীমা দাবি প্রক্রিয়াকরণ সময় (দিন)
 */
export const INSURANCE_CLAIM_PROCESSING_DAYS = 7;

/**
 * বীমা কনফিগারেশন
 */
export const INSURANCE_CONFIG = {
  PREFIX: INSURANCE_PREFIX,
  NUMBER_FORMAT: INSURANCE_NUMBER_FORMAT,
  DEFAULT_COVERAGE: DEFAULT_INSURANCE_COVERAGE,
  PREMIUM_RATE: INSURANCE_PREMIUM_RATE,
  CLAIM_TIME_LIMIT: INSURANCE_CLAIM_TIME_LIMIT_DAYS,
  MAX_LIMIT: INSURANCE_MAX_LIMIT,
  MIN_LIMIT: INSURANCE_MIN_LIMIT,
  CLAIM_PROCESSING_DAYS: INSURANCE_CLAIM_PROCESSING_DAYS,
} as const;

/**
 * বীমা কনফিগারেশন টাইপ
 */
export type InsuranceConfig = typeof INSURANCE_CONFIG;

/**
 * বীমা পলিসি নম্বর জেনারেট করুন
 */
export function generateInsuranceNumber(): string {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const dateStr = `${year}${month}${day}`;
  const random = Math.random().toString(36).substring(2, 8).toUpperCase();
  return `${INSURANCE_PREFIX}${dateStr}${INSURANCE_NUMBER_FORMAT.SEPARATOR}${random}`;
}

/**
 * বীমা পলিসি নম্বর ভালিডেট করুন
 */
export function isValidInsuranceNumber(number: string): boolean {
  return number.startsWith(INSURANCE_PREFIX) && number.length >= 15;
}

/**
 * বীমা কাভারেজ ভালিডেট করুন
 */
export function isValidInsuranceCoverage(amount: number): boolean {
  return amount >= INSURANCE_MIN_LIMIT && amount <= INSURANCE_MAX_LIMIT;
}

/**
 * বীমা প্রিমিয়াম গণনা করুন
 */
export function calculateInsurancePremium(
  coverageAmount: number,
  rate: number = INSURANCE_PREMIUM_RATE
): number {
  if (!isValidInsuranceCoverage(coverageAmount)) {
    throw new Error('Invalid coverage amount');
  }
  return (coverageAmount * rate) / 100;
}

/**
 * বীমা দাবি সময়সীমা পেরিয়েছে কিনা
 */
export function isInsuranceClaimTimeLimitExceeded(incidentDate: Date): boolean {
  const limitDate = new Date(incidentDate);
  limitDate.setDate(limitDate.getDate() + INSURANCE_CLAIM_TIME_LIMIT_DAYS);
  return new Date() > limitDate;
}

/**
 * বীমা দাবি প্রক্রিয়াকরণ ডেডলাইন গণনা করুন
 */
export function calculateInsuranceClaimDeadline(claimDate: Date): Date {
  const deadline = new Date(claimDate);
  deadline.setDate(deadline.getDate() + INSURANCE_CLAIM_PROCESSING_DAYS);
  return deadline;
}

/**
 * বীমা কাভারেজ শতাংশ গণনা করুন
 */
export function calculateInsuranceCoveragePercentage(
  coverageAmount: number,
  totalValue: number
): number {
  if (totalValue === 0) return 0;
  return (coverageAmount / totalValue) * 100;
}
