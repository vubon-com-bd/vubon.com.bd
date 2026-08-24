/**
 * Vendor Warranty Constants
 * Configuration for vendor warranties
 */

export const VENDOR_WARRANTY = {
  // Warranty Types
  TYPES: {
    STANDARD: 'standard',
    EXTENDED: 'extended',
    LIFETIME: 'lifetime',
    LIMITED: 'limited',
    NO_WARRANTY: 'no_warranty',
  } as const,

  // Warranty Statuses
  STATUS: {
    ACTIVE: 'active',
    EXPIRED: 'expired',
    CANCELLED: 'cancelled',
    VOID: 'void',
    PENDING: 'pending',
  } as const,

  // Warranty Coverage
  COVERAGE: {
    PARTS: 'parts',
    LABOR: 'labor',
    BOTH: 'both',
    REPLACEMENT: 'replacement',
    REFUND: 'refund',
  } as const,

  // Warranty Periods (in months)
  PERIODS: {
    STANDARD: 12,
    EXTENDED: 24,
    PREMIUM: 36,
    LIFETIME: 120,
  } as const,

  // Warranty Conditions
  CONDITIONS: {
    ORIGINAL_RECEIPT: 'original_receipt',
    REGISTERED: 'registered',
    TRANSFERABLE: 'transferable',
    INTERNATIONAL: 'international',
  } as const,

  // Warranty Exclusions
  EXCLUSIONS: {
    PHYSICAL_DAMAGE: 'physical_damage',
    WATER_DAMAGE: 'water_damage',
    UNAUTHORIZED_REPAIR: 'unauthorized_repair',
    NORMAL_WEAR: 'normal_wear',
    ACCESSORIES: 'accessories',
    SOFTWARE: 'software',
  } as const,
} as const;

// Warranty Types
export type VendorWarrantyType = (typeof VENDOR_WARRANTY.TYPES)[keyof typeof VENDOR_WARRANTY.TYPES];

// Warranty Statuses
export type VendorWarrantyStatus =
  (typeof VENDOR_WARRANTY.STATUS)[keyof typeof VENDOR_WARRANTY.STATUS];

// Warranty Coverage
export type VendorWarrantyCoverage =
  (typeof VENDOR_WARRANTY.COVERAGE)[keyof typeof VENDOR_WARRANTY.COVERAGE];

// Warranty Conditions
export type VendorWarrantyCondition =
  (typeof VENDOR_WARRANTY.CONDITIONS)[keyof typeof VENDOR_WARRANTY.CONDITIONS];

// Warranty Exclusions
export type VendorWarrantyExclusion =
  (typeof VENDOR_WARRANTY.EXCLUSIONS)[keyof typeof VENDOR_WARRANTY.EXCLUSIONS];

// Utility Functions
export function vendorWarrantyGetTypeLabel(type: VendorWarrantyType): string {
  const labels: Record<VendorWarrantyType, string> = {
    [VENDOR_WARRANTY.TYPES.STANDARD]: 'Standard Warranty',
    [VENDOR_WARRANTY.TYPES.EXTENDED]: 'Extended Warranty',
    [VENDOR_WARRANTY.TYPES.LIFETIME]: 'Lifetime Warranty',
    [VENDOR_WARRANTY.TYPES.LIMITED]: 'Limited Warranty',
    [VENDOR_WARRANTY.TYPES.NO_WARRANTY]: 'No Warranty',
  };
  return labels[type] || 'Unknown';
}

export function vendorWarrantyGetStatusLabel(status: VendorWarrantyStatus): string {
  const labels: Record<VendorWarrantyStatus, string> = {
    [VENDOR_WARRANTY.STATUS.ACTIVE]: 'Active',
    [VENDOR_WARRANTY.STATUS.EXPIRED]: 'Expired',
    [VENDOR_WARRANTY.STATUS.CANCELLED]: 'Cancelled',
    [VENDOR_WARRANTY.STATUS.VOID]: 'Void',
    [VENDOR_WARRANTY.STATUS.PENDING]: 'Pending',
  };
  return labels[status] || 'Unknown';
}

export function vendorWarrantyGetCoverageLabel(coverage: VendorWarrantyCoverage): string {
  const labels: Record<VendorWarrantyCoverage, string> = {
    [VENDOR_WARRANTY.COVERAGE.PARTS]: 'Parts Only',
    [VENDOR_WARRANTY.COVERAGE.LABOR]: 'Labor Only',
    [VENDOR_WARRANTY.COVERAGE.BOTH]: 'Parts and Labor',
    [VENDOR_WARRANTY.COVERAGE.REPLACEMENT]: 'Replacement',
    [VENDOR_WARRANTY.COVERAGE.REFUND]: 'Refund',
  };
  return labels[coverage] || 'Unknown';
}

export function vendorWarrantyGetPeriodMonths(type: VendorWarrantyType): number {
  const periods: Record<VendorWarrantyType, number> = {
    [VENDOR_WARRANTY.TYPES.STANDARD]: VENDOR_WARRANTY.PERIODS.STANDARD,
    [VENDOR_WARRANTY.TYPES.EXTENDED]: VENDOR_WARRANTY.PERIODS.EXTENDED,
    [VENDOR_WARRANTY.TYPES.LIFETIME]: VENDOR_WARRANTY.PERIODS.LIFETIME,
    [VENDOR_WARRANTY.TYPES.LIMITED]: VENDOR_WARRANTY.PERIODS.STANDARD,
    [VENDOR_WARRANTY.TYPES.NO_WARRANTY]: 0,
  };
  return periods[type] || 0;
}

export function vendorWarrantyIsActive(status: VendorWarrantyStatus): boolean {
  return status === VENDOR_WARRANTY.STATUS.ACTIVE;
}

export function vendorWarrantyIsValid(status: VendorWarrantyStatus): boolean {
  return status === VENDOR_WARRANTY.STATUS.ACTIVE || status === VENDOR_WARRANTY.STATUS.PENDING;
}

export function vendorWarrantyHasWarranty(type: VendorWarrantyType): boolean {
  return type !== VENDOR_WARRANTY.TYPES.NO_WARRANTY;
}

export function vendorWarrantyGetExclusionLabel(exclusion: VendorWarrantyExclusion): string {
  const labels: Record<VendorWarrantyExclusion, string> = {
    [VENDOR_WARRANTY.EXCLUSIONS.PHYSICAL_DAMAGE]: 'Physical Damage',
    [VENDOR_WARRANTY.EXCLUSIONS.WATER_DAMAGE]: 'Water Damage',
    [VENDOR_WARRANTY.EXCLUSIONS.UNAUTHORIZED_REPAIR]: 'Unauthorized Repair',
    [VENDOR_WARRANTY.EXCLUSIONS.NORMAL_WEAR]: 'Normal Wear and Tear',
    [VENDOR_WARRANTY.EXCLUSIONS.ACCESSORIES]: 'Accessories',
    [VENDOR_WARRANTY.EXCLUSIONS.SOFTWARE]: 'Software Issues',
  };
  return labels[exclusion] || 'Unknown';
}
