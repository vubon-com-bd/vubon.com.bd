/**
 * বীমার বিভিন্ন টাইপ সম্পর্কিত কনস্ট্যান্টসমূহ
 */

/**
 * বীমা টাইপ
 */
export const INSURANCE_TYPES = {
  SHIPMENT_INSURANCE: 'shipment_insurance',
  CARGO_INSURANCE: 'cargo_insurance',
  LIABILITY_INSURANCE: 'liability_insurance',
  THEFT_INSURANCE: 'theft_insurance',
  DAMAGE_INSURANCE: 'damage_insurance',
  COMPREHENSIVE: 'comprehensive',
} as const;

/**
 * বীমা টাইপ টাইপ
 */
export type InsuranceType = (typeof INSURANCE_TYPES)[keyof typeof INSURANCE_TYPES];

/**
 * বীমা টাইপের বিবরণ
 */
export const INSURANCE_TYPE_DESCRIPTIONS: Record<InsuranceType, string> = {
  [INSURANCE_TYPES.SHIPMENT_INSURANCE]: 'শিপমেন্ট বীমা - পণ্য পরিবহনের সময় বীমা',
  [INSURANCE_TYPES.CARGO_INSURANCE]: 'কার্গো বীমা - বড় পণ্য পরিবহনের বীমা',
  [INSURANCE_TYPES.LIABILITY_INSURANCE]: 'দায়বদ্ধতা বীমা - তৃতীয় পক্ষের দায়বদ্ধতা বীমা',
  [INSURANCE_TYPES.THEFT_INSURANCE]: 'চুরি বীমা - চুরি হওয়ার বিরুদ্ধে বীমা',
  [INSURANCE_TYPES.DAMAGE_INSURANCE]: 'ক্ষতি বীমা - পণ্যের ক্ষতির বিরুদ্ধে বীমা',
  [INSURANCE_TYPES.COMPREHENSIVE]: 'সর্বব্যাপী - সমস্ত ঝুঁকি কাভারেজ',
};

/**
 * বীমা টাইপের রং (UI এর জন্য)
 */
export const INSURANCE_TYPE_COLORS: Record<InsuranceType, string> = {
  [INSURANCE_TYPES.SHIPMENT_INSURANCE]: '#3498DB', // নীল
  [INSURANCE_TYPES.CARGO_INSURANCE]: '#2ECC71', // সবুজ
  [INSURANCE_TYPES.LIABILITY_INSURANCE]: '#F39C12', // কমলা
  [INSURANCE_TYPES.THEFT_INSURANCE]: '#E74C3C', // লাল
  [INSURANCE_TYPES.DAMAGE_INSURANCE]: '#9B59B6', // বেগুনি
  [INSURANCE_TYPES.COMPREHENSIVE]: '#1ABC9C', // টিল
};

/**
 * বীমা টাইপের আইকন (UI এর জন্য)
 */
export const INSURANCE_TYPE_ICONS: Record<InsuranceType, string> = {
  [INSURANCE_TYPES.SHIPMENT_INSURANCE]: 'truck',
  [INSURANCE_TYPES.CARGO_INSURANCE]: 'ship',
  [INSURANCE_TYPES.LIABILITY_INSURANCE]: 'shield',
  [INSURANCE_TYPES.THEFT_INSURANCE]: 'lock',
  [INSURANCE_TYPES.DAMAGE_INSURANCE]: 'exclamation-triangle',
  [INSURANCE_TYPES.COMPREHENSIVE]: 'star',
};

/**
 * বীমা টাইপের প্রিমিয়াম হার
 */
export const INSURANCE_TYPE_PREMIUM_RATES: Record<InsuranceType, number> = {
  [INSURANCE_TYPES.SHIPMENT_INSURANCE]: 2.5,
  [INSURANCE_TYPES.CARGO_INSURANCE]: 3.0,
  [INSURANCE_TYPES.LIABILITY_INSURANCE]: 1.5,
  [INSURANCE_TYPES.THEFT_INSURANCE]: 4.0,
  [INSURANCE_TYPES.DAMAGE_INSURANCE]: 3.5,
  [INSURANCE_TYPES.COMPREHENSIVE]: 5.0,
};

/**
 * বীমা টাইপের কাভারেজ ফ্যাক্টর
 */
export const INSURANCE_TYPE_COVERAGE_FACTORS: Record<InsuranceType, number> = {
  [INSURANCE_TYPES.SHIPMENT_INSURANCE]: 1.0,
  [INSURANCE_TYPES.CARGO_INSURANCE]: 1.5,
  [INSURANCE_TYPES.LIABILITY_INSURANCE]: 0.8,
  [INSURANCE_TYPES.THEFT_INSURANCE]: 1.2,
  [INSURANCE_TYPES.DAMAGE_INSURANCE]: 1.3,
  [INSURANCE_TYPES.COMPREHENSIVE]: 2.0,
};

/**
 * বীমা টাইপের সর্বোচ্চ কাভারেজ
 */
export const INSURANCE_TYPE_MAX_COVERAGE: Record<InsuranceType, number> = {
  [INSURANCE_TYPES.SHIPMENT_INSURANCE]: 50000,
  [INSURANCE_TYPES.CARGO_INSURANCE]: 100000,
  [INSURANCE_TYPES.LIABILITY_INSURANCE]: 25000,
  [INSURANCE_TYPES.THEFT_INSURANCE]: 30000,
  [INSURANCE_TYPES.DAMAGE_INSURANCE]: 40000,
  [INSURANCE_TYPES.COMPREHENSIVE]: 150000,
};

/**
 * বীমা টাইপ গ্রুপ
 */
export const INSURANCE_TYPE_GROUPS = {
  ALL: Object.values(INSURANCE_TYPES),
  TRANSPORT: [INSURANCE_TYPES.SHIPMENT_INSURANCE, INSURANCE_TYPES.CARGO_INSURANCE] as const,
  RISK: [INSURANCE_TYPES.THEFT_INSURANCE, INSURANCE_TYPES.DAMAGE_INSURANCE] as const,
  COMPREHENSIVE: [INSURANCE_TYPES.COMPREHENSIVE] as const,
} as const;

/**
 * বীমা টাইপ গ্রুপ টাইপ
 */
export type InsuranceTypeGroup = typeof INSURANCE_TYPE_GROUPS;

/**
 * বীমা টাইপ কনফিগারেশন
 */
export const INSURANCE_TYPE_CONFIG = {
  TYPES: INSURANCE_TYPES,
  DESCRIPTIONS: INSURANCE_TYPE_DESCRIPTIONS,
  COLORS: INSURANCE_TYPE_COLORS,
  ICONS: INSURANCE_TYPE_ICONS,
  PREMIUM_RATES: INSURANCE_TYPE_PREMIUM_RATES,
  COVERAGE_FACTORS: INSURANCE_TYPE_COVERAGE_FACTORS,
  MAX_COVERAGE: INSURANCE_TYPE_MAX_COVERAGE,
  GROUPS: INSURANCE_TYPE_GROUPS,
} as const;

/**
 * বীমা টাইপ কনফিগারেশন টাইপ
 */
export type InsuranceTypeConfig = typeof INSURANCE_TYPE_CONFIG;

/**
 * চেক করে যে বীমা টাইপ ট্রান্সপোর্ট কিনা
 */
export function isTransportInsuranceType(type: InsuranceType): boolean {
  return (INSURANCE_TYPE_GROUPS.TRANSPORT as readonly InsuranceType[]).includes(type);
}

/**
 * চেক করে যে বীমা টাইপ রিস্ক কিনা
 */
export function isRiskInsuranceType(type: InsuranceType): boolean {
  return (INSURANCE_TYPE_GROUPS.RISK as readonly InsuranceType[]).includes(type);
}

/**
 * চেক করে যে বীমা টাইপ কম্প্রিহেন্সিভ কিনা
 */
export function isComprehensiveInsuranceType(type: InsuranceType): boolean {
  return (INSURANCE_TYPE_GROUPS.COMPREHENSIVE as readonly InsuranceType[]).includes(type);
}

/**
 * বীমা টাইপের বিবরণ পাওয়া
 */
export function getInsuranceTypeDescription(type: InsuranceType): string {
  return INSURANCE_TYPE_DESCRIPTIONS[type];
}

/**
 * বীমা টাইপের প্রিমিয়াম হার পাওয়া
 */
export function getInsuranceTypePremiumRate(type: InsuranceType): number {
  return INSURANCE_TYPE_PREMIUM_RATES[type];
}

/**
 * বীমা টাইপের কাভারেজ ফ্যাক্টর পাওয়া
 */
export function getInsuranceTypeCoverageFactor(type: InsuranceType): number {
  return INSURANCE_TYPE_COVERAGE_FACTORS[type];
}

/**
 * বীমা টাইপের সর্বোচ্চ কাভারেজ পাওয়া
 */
export function getInsuranceTypeMaxCoverage(type: InsuranceType): number {
  return INSURANCE_TYPE_MAX_COVERAGE[type];
}

/**
 * বীমা টাইপের জন্য প্রিমিয়াম গণনা করুন
 */
export function calculateInsuranceTypePremium(type: InsuranceType, coverageAmount: number): number {
  const rate = INSURANCE_TYPE_PREMIUM_RATES[type];
  const maxCoverage = INSURANCE_TYPE_MAX_COVERAGE[type];

  if (coverageAmount > maxCoverage) {
    throw new Error(`Coverage amount exceeds maximum for ${type}`);
  }

  return (coverageAmount * rate) / 100;
}
