export const INSURANCE_STATUS = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  EXPIRED: 'expired',
  CANCELLED: 'cancelled',
  CLAIMED: 'claimed',
  PENDING: 'pending',
} as const;

export const INSURANCE_TYPE = {
  BASIC: 'basic',
  STANDARD: 'standard',
  PREMIUM: 'premium',
  FULL_COVERAGE: 'full_coverage',
  THIRD_PARTY: 'third_party',
} as const;

export const INSURANCE_COVERAGE = {
  LOSS: 'loss',
  DAMAGE: 'damage',
  THEFT: 'theft',
  DELAY: 'delay',
  PARTIAL_LOSS: 'partial_loss',
  TOTAL_LOSS: 'total_loss',
  NATURAL_DISASTER: 'natural_disaster',
} as const;

export const INSURANCE_CLAIM_STATUS = {
  SUBMITTED: 'submitted',
  UNDER_REVIEW: 'under_review',
  APPROVED: 'approved',
  REJECTED: 'rejected',
  PAID: 'paid',
  APPEALED: 'appealed',
} as const;

export const INSURANCE = {
  STATUS: INSURANCE_STATUS,
  TYPE: INSURANCE_TYPE,
  COVERAGE: INSURANCE_COVERAGE,
  CLAIM_STATUS: INSURANCE_CLAIM_STATUS,
  MIN_VALUE: 100,
  MAX_VALUE: 10000000,
  BASIC_PREMIUM_PERCENT: 0.5,
  STANDARD_PREMIUM_PERCENT: 1.0,
  PREMIUM_PREMIUM_PERCENT: 2.0,
  FULL_COVERAGE_PREMIUM_PERCENT: 3.0,
  CLAIM_WINDOW_DAYS: 30,
  CLAIM_PROCESSING_DAYS: 15,
  REQUIRE_PROOF: true,
  REQUIRE_PHOTOS: true,
  AUTO_APPROVE_UNDER: 1000,
} as const;

export type InsuranceStatusType = (typeof INSURANCE_STATUS)[keyof typeof INSURANCE_STATUS];
export type InsuranceTypeType = (typeof INSURANCE_TYPE)[keyof typeof INSURANCE_TYPE];
export type InsuranceCoverageType = (typeof INSURANCE_COVERAGE)[keyof typeof INSURANCE_COVERAGE];
export type InsuranceClaimStatusType =
  (typeof INSURANCE_CLAIM_STATUS)[keyof typeof INSURANCE_CLAIM_STATUS];
