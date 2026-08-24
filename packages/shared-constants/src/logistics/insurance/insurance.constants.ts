/**
 * Insurance Constants
 * Configuration for logistics insurance - Bangladesh based
 */

export const LOGISTICS_INSURANCE = {
  // Insurance Types
  TYPES: {
    CARGO: 'cargo',
    TRANSIT: 'transit',
    STORAGE: 'storage',
    ALL_RISK: 'all_risk',
    FPA: 'fpa', // Free of Particular Average
    WA: 'wa', // With Average
    WAR: 'war',
    STRIKE: 'strike',
  } as const,

  // Insurance Statuses
  STATUS: {
    PENDING: 'pending',
    ACTIVE: 'active',
    EXPIRED: 'expired',
    CLAIMED: 'claimed',
    CANCELLED: 'cancelled',
    UNDER_REVIEW: 'under_review',
  } as const,

  // Insurance Providers (Bangladesh)
  PROVIDERS: {
    SADHARAN_BIMA: 'sadharan_bima',
    JANATA: 'janata',
    PRAGATI: 'pragati',
    RELIANCE: 'reliance',
    GREEN_DELTA: 'green_delta',
    NATIONAL: 'national',
    OTHER: 'other',
  } as const,

  // Provider Labels
  PROVIDER_LABELS: {
    SADHARAN_BIMA: 'Sadharan Bima Corporation',
    JANATA: 'Janata Insurance',
    PRAGATI: 'Pragati Insurance',
    RELIANCE: 'Reliance Insurance',
    GREEN_DELTA: 'Green Delta Insurance',
    NATIONAL: 'National Insurance',
    OTHER: 'Other Insurance Provider',
  } as const,

  // Coverage Types
  COVERAGE_TYPES: {
    BASIC: 'basic',
    STANDARD: 'standard',
    COMPREHENSIVE: 'comprehensive',
    PREMIUM: 'premium',
  } as const,

  // Coverage Rates (% of value)
  COVERAGE_RATES: {
    BASIC: 1.0,
    STANDARD: 2.0,
    COMPREHENSIVE: 3.0,
    PREMIUM: 5.0,
  } as const,

  // Policy Terms (in months)
  POLICY_TERMS: {
    SHORT: 3,
    STANDARD: 6,
    LONG: 12,
    EXTENDED: 24,
  } as const,

  // Claim Limits (BDT)
  CLAIM_LIMITS: {
    BASIC: 100000,
    STANDARD: 500000,
    COMPREHENSIVE: 1000000,
    PREMIUM: 5000000,
  } as const,

  // Excess/Deductible (BDT)
  EXCESS: {
    BASIC: 1000,
    STANDARD: 2500,
    COMPREHENSIVE: 5000,
    PREMIUM: 10000,
  } as const,
} as const;

// Insurance Types
export type LogisticsInsuranceType =
  (typeof LOGISTICS_INSURANCE.TYPES)[keyof typeof LOGISTICS_INSURANCE.TYPES];

// Insurance Statuses
export type LogisticsInsuranceStatus =
  (typeof LOGISTICS_INSURANCE.STATUS)[keyof typeof LOGISTICS_INSURANCE.STATUS];

// Insurance Providers
export type LogisticsInsuranceProvider =
  (typeof LOGISTICS_INSURANCE.PROVIDERS)[keyof typeof LOGISTICS_INSURANCE.PROVIDERS];

// Coverage Types
export type LogisticsInsuranceCoverageType =
  (typeof LOGISTICS_INSURANCE.COVERAGE_TYPES)[keyof typeof LOGISTICS_INSURANCE.COVERAGE_TYPES];

// Utility Functions
export function logisticsInsuranceGetTypeLabel(type: LogisticsInsuranceType): string {
  const labels: Record<LogisticsInsuranceType, string> = {
    [LOGISTICS_INSURANCE.TYPES.CARGO]: 'Cargo Insurance',
    [LOGISTICS_INSURANCE.TYPES.TRANSIT]: 'Transit Insurance',
    [LOGISTICS_INSURANCE.TYPES.STORAGE]: 'Storage Insurance',
    [LOGISTICS_INSURANCE.TYPES.ALL_RISK]: 'All Risk Insurance',
    [LOGISTICS_INSURANCE.TYPES.FPA]: 'Free of Particular Average',
    [LOGISTICS_INSURANCE.TYPES.WA]: 'With Average',
    [LOGISTICS_INSURANCE.TYPES.WAR]: 'War Insurance',
    [LOGISTICS_INSURANCE.TYPES.STRIKE]: 'Strike Insurance',
  };
  return labels[type] || 'Unknown';
}

export function logisticsInsuranceGetStatusLabel(status: LogisticsInsuranceStatus): string {
  const labels: Record<LogisticsInsuranceStatus, string> = {
    [LOGISTICS_INSURANCE.STATUS.PENDING]: 'Pending',
    [LOGISTICS_INSURANCE.STATUS.ACTIVE]: 'Active',
    [LOGISTICS_INSURANCE.STATUS.EXPIRED]: 'Expired',
    [LOGISTICS_INSURANCE.STATUS.CLAIMED]: 'Claimed',
    [LOGISTICS_INSURANCE.STATUS.CANCELLED]: 'Cancelled',
    [LOGISTICS_INSURANCE.STATUS.UNDER_REVIEW]: 'Under Review',
  };
  return labels[status] || 'Unknown';
}

export function logisticsInsuranceGetProviderLabel(provider: LogisticsInsuranceProvider): string {
  const labels: Record<LogisticsInsuranceProvider, string> = {
    [LOGISTICS_INSURANCE.PROVIDERS.SADHARAN_BIMA]:
      LOGISTICS_INSURANCE.PROVIDER_LABELS.SADHARAN_BIMA,
    [LOGISTICS_INSURANCE.PROVIDERS.JANATA]: LOGISTICS_INSURANCE.PROVIDER_LABELS.JANATA,
    [LOGISTICS_INSURANCE.PROVIDERS.PRAGATI]: LOGISTICS_INSURANCE.PROVIDER_LABELS.PRAGATI,
    [LOGISTICS_INSURANCE.PROVIDERS.RELIANCE]: LOGISTICS_INSURANCE.PROVIDER_LABELS.RELIANCE,
    [LOGISTICS_INSURANCE.PROVIDERS.GREEN_DELTA]: LOGISTICS_INSURANCE.PROVIDER_LABELS.GREEN_DELTA,
    [LOGISTICS_INSURANCE.PROVIDERS.NATIONAL]: LOGISTICS_INSURANCE.PROVIDER_LABELS.NATIONAL,
    [LOGISTICS_INSURANCE.PROVIDERS.OTHER]: LOGISTICS_INSURANCE.PROVIDER_LABELS.OTHER,
  };
  return labels[provider] || 'Unknown';
}

export function logisticsInsuranceGetCoverageRate(
  coverageType: LogisticsInsuranceCoverageType
): number {
  const rates: Record<LogisticsInsuranceCoverageType, number> = {
    [LOGISTICS_INSURANCE.COVERAGE_TYPES.BASIC]: LOGISTICS_INSURANCE.COVERAGE_RATES.BASIC,
    [LOGISTICS_INSURANCE.COVERAGE_TYPES.STANDARD]: LOGISTICS_INSURANCE.COVERAGE_RATES.STANDARD,
    [LOGISTICS_INSURANCE.COVERAGE_TYPES.COMPREHENSIVE]:
      LOGISTICS_INSURANCE.COVERAGE_RATES.COMPREHENSIVE,
    [LOGISTICS_INSURANCE.COVERAGE_TYPES.PREMIUM]: LOGISTICS_INSURANCE.COVERAGE_RATES.PREMIUM,
  };
  return rates[coverageType] || LOGISTICS_INSURANCE.COVERAGE_RATES.STANDARD;
}

export function logisticsInsuranceGetCoverageLabel(
  coverageType: LogisticsInsuranceCoverageType
): string {
  const labels: Record<LogisticsInsuranceCoverageType, string> = {
    [LOGISTICS_INSURANCE.COVERAGE_TYPES.BASIC]: 'Basic',
    [LOGISTICS_INSURANCE.COVERAGE_TYPES.STANDARD]: 'Standard',
    [LOGISTICS_INSURANCE.COVERAGE_TYPES.COMPREHENSIVE]: 'Comprehensive',
    [LOGISTICS_INSURANCE.COVERAGE_TYPES.PREMIUM]: 'Premium',
  };
  return labels[coverageType] || 'Unknown';
}

export function logisticsInsuranceGetClaimLimit(
  coverageType: LogisticsInsuranceCoverageType
): number {
  const limits: Record<LogisticsInsuranceCoverageType, number> = {
    [LOGISTICS_INSURANCE.COVERAGE_TYPES.BASIC]: LOGISTICS_INSURANCE.CLAIM_LIMITS.BASIC,
    [LOGISTICS_INSURANCE.COVERAGE_TYPES.STANDARD]: LOGISTICS_INSURANCE.CLAIM_LIMITS.STANDARD,
    [LOGISTICS_INSURANCE.COVERAGE_TYPES.COMPREHENSIVE]:
      LOGISTICS_INSURANCE.CLAIM_LIMITS.COMPREHENSIVE,
    [LOGISTICS_INSURANCE.COVERAGE_TYPES.PREMIUM]: LOGISTICS_INSURANCE.CLAIM_LIMITS.PREMIUM,
  };
  return limits[coverageType] || LOGISTICS_INSURANCE.CLAIM_LIMITS.STANDARD;
}

export function logisticsInsuranceGetExcess(coverageType: LogisticsInsuranceCoverageType): number {
  const excess: Record<LogisticsInsuranceCoverageType, number> = {
    [LOGISTICS_INSURANCE.COVERAGE_TYPES.BASIC]: LOGISTICS_INSURANCE.EXCESS.BASIC,
    [LOGISTICS_INSURANCE.COVERAGE_TYPES.STANDARD]: LOGISTICS_INSURANCE.EXCESS.STANDARD,
    [LOGISTICS_INSURANCE.COVERAGE_TYPES.COMPREHENSIVE]: LOGISTICS_INSURANCE.EXCESS.COMPREHENSIVE,
    [LOGISTICS_INSURANCE.COVERAGE_TYPES.PREMIUM]: LOGISTICS_INSURANCE.EXCESS.PREMIUM,
  };
  return excess[coverageType] || LOGISTICS_INSURANCE.EXCESS.STANDARD;
}

export function logisticsInsuranceIsActive(status: LogisticsInsuranceStatus): boolean {
  return status === LOGISTICS_INSURANCE.STATUS.ACTIVE;
}

export function logisticsInsuranceIsActiveOrPending(status: LogisticsInsuranceStatus): boolean {
  const activeStatuses: LogisticsInsuranceStatus[] = [
    LOGISTICS_INSURANCE.STATUS.ACTIVE,
    LOGISTICS_INSURANCE.STATUS.PENDING,
    LOGISTICS_INSURANCE.STATUS.UNDER_REVIEW,
  ];
  return activeStatuses.includes(status);
}

export function logisticsInsuranceCalculatePremium(
  coverageType: LogisticsInsuranceCoverageType,
  value: number
): number {
  const rate = logisticsInsuranceGetCoverageRate(coverageType);
  return (value * rate) / 100;
}
