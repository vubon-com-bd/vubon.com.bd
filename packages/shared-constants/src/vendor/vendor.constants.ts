/**
 * Vendor Constants
 * Configuration for vendors
 */

export const VENDOR = {
  // Vendor Types
  TYPES: {
    INDIVIDUAL: 'individual',
    BUSINESS: 'business',
    ENTERPRISE: 'enterprise',
    PREMIUM: 'premium',
    PARTNER: 'partner',
  } as const,

  // Vendor Statuses
  STATUS: {
    PENDING: 'pending',
    ACTIVE: 'active',
    INACTIVE: 'inactive',
    SUSPENDED: 'suspended',
    BANNED: 'banned',
    CLOSED: 'closed',
  } as const,

  // Vendor Tiers
  TIERS: {
    BASIC: 'basic',
    SILVER: 'silver',
    GOLD: 'gold',
    PLATINUM: 'platinum',
    DIAMOND: 'diamond',
  } as const,

  // Vendor Verification
  VERIFICATION: {
    PENDING: 'pending',
    IN_PROGRESS: 'in_progress',
    VERIFIED: 'verified',
    REJECTED: 'rejected',
    EXPIRED: 'expired',
  } as const,

  // Vendor Approval
  APPROVAL: {
    PENDING: 'pending',
    REVIEW: 'review',
    APPROVED: 'approved',
    REJECTED: 'rejected',
    CONDITIONAL: 'conditional',
  } as const,

  // Vendor Suspension
  SUSPENSION: {
    TEMPORARY: 'temporary',
    PERMANENT: 'permanent',
    REVIEW: 'review',
    APPEAL: 'appeal',
  } as const,

  // Vendor Commission
  COMMISSION: {
    PERCENTAGE: 'percentage',
    FIXED: 'fixed',
    HYBRID: 'hybrid',
    TIERED: 'tiered',
  } as const,

  // Vendor Limits
  LIMITS: {
    MAX_PRODUCTS: 1000,
    MAX_ORDERS_PER_DAY: 500,
    MAX_REVENUE_PER_MONTH: 10000000,
    MAX_COMMISSION_RATE: 50,
    MIN_COMMISSION_RATE: 1,
  } as const,
} as const;

// Vendor Types
export type VendorType = (typeof VENDOR.TYPES)[keyof typeof VENDOR.TYPES];

// Vendor Statuses
export type VendorStatus = (typeof VENDOR.STATUS)[keyof typeof VENDOR.STATUS];

// Vendor Tiers
export type VendorTier = (typeof VENDOR.TIERS)[keyof typeof VENDOR.TIERS];

// Vendor Verification
export type VendorVerification = (typeof VENDOR.VERIFICATION)[keyof typeof VENDOR.VERIFICATION];

// Vendor Approval
export type VendorApproval = (typeof VENDOR.APPROVAL)[keyof typeof VENDOR.APPROVAL];

// Vendor Suspension
export type VendorSuspension = (typeof VENDOR.SUSPENSION)[keyof typeof VENDOR.SUSPENSION];

// Vendor Commission
export type VendorCommission = (typeof VENDOR.COMMISSION)[keyof typeof VENDOR.COMMISSION];

// Utility Functions
export function vendorGetTypeLabel(type: VendorType): string {
  const labels: Record<VendorType, string> = {
    [VENDOR.TYPES.INDIVIDUAL]: 'Individual',
    [VENDOR.TYPES.BUSINESS]: 'Business',
    [VENDOR.TYPES.ENTERPRISE]: 'Enterprise',
    [VENDOR.TYPES.PREMIUM]: 'Premium',
    [VENDOR.TYPES.PARTNER]: 'Partner',
  };
  return labels[type] || 'Unknown';
}

export function vendorGetStatusLabel(status: VendorStatus): string {
  const labels: Record<VendorStatus, string> = {
    [VENDOR.STATUS.PENDING]: 'Pending',
    [VENDOR.STATUS.ACTIVE]: 'Active',
    [VENDOR.STATUS.INACTIVE]: 'Inactive',
    [VENDOR.STATUS.SUSPENDED]: 'Suspended',
    [VENDOR.STATUS.BANNED]: 'Banned',
    [VENDOR.STATUS.CLOSED]: 'Closed',
  };
  return labels[status] || 'Unknown';
}

export function vendorGetTierLabel(tier: VendorTier): string {
  const labels: Record<VendorTier, string> = {
    [VENDOR.TIERS.BASIC]: 'Basic',
    [VENDOR.TIERS.SILVER]: 'Silver',
    [VENDOR.TIERS.GOLD]: 'Gold',
    [VENDOR.TIERS.PLATINUM]: 'Platinum',
    [VENDOR.TIERS.DIAMOND]: 'Diamond',
  };
  return labels[tier] || 'Unknown';
}

export function vendorGetVerificationLabel(verification: VendorVerification): string {
  const labels: Record<VendorVerification, string> = {
    [VENDOR.VERIFICATION.PENDING]: 'Pending',
    [VENDOR.VERIFICATION.IN_PROGRESS]: 'In Progress',
    [VENDOR.VERIFICATION.VERIFIED]: 'Verified',
    [VENDOR.VERIFICATION.REJECTED]: 'Rejected',
    [VENDOR.VERIFICATION.EXPIRED]: 'Expired',
  };
  return labels[verification] || 'Unknown';
}

export function vendorGetApprovalLabel(approval: VendorApproval): string {
  const labels: Record<VendorApproval, string> = {
    [VENDOR.APPROVAL.PENDING]: 'Pending',
    [VENDOR.APPROVAL.REVIEW]: 'In Review',
    [VENDOR.APPROVAL.APPROVED]: 'Approved',
    [VENDOR.APPROVAL.REJECTED]: 'Rejected',
    [VENDOR.APPROVAL.CONDITIONAL]: 'Conditional',
  };
  return labels[approval] || 'Unknown';
}

export function vendorGetSuspensionLabel(suspension: VendorSuspension): string {
  const labels: Record<VendorSuspension, string> = {
    [VENDOR.SUSPENSION.TEMPORARY]: 'Temporary',
    [VENDOR.SUSPENSION.PERMANENT]: 'Permanent',
    [VENDOR.SUSPENSION.REVIEW]: 'Under Review',
    [VENDOR.SUSPENSION.APPEAL]: 'Appeal',
  };
  return labels[suspension] || 'Unknown';
}

export function vendorGetCommissionLabel(commission: VendorCommission): string {
  const labels: Record<VendorCommission, string> = {
    [VENDOR.COMMISSION.PERCENTAGE]: 'Percentage',
    [VENDOR.COMMISSION.FIXED]: 'Fixed',
    [VENDOR.COMMISSION.HYBRID]: 'Hybrid',
    [VENDOR.COMMISSION.TIERED]: 'Tiered',
  };
  return labels[commission] || 'Unknown';
}

export function vendorIsActive(status: VendorStatus): boolean {
  return status === VENDOR.STATUS.ACTIVE;
}

export function vendorIsVerified(verification: VendorVerification): boolean {
  return verification === VENDOR.VERIFICATION.VERIFIED;
}

export function vendorIsApproved(approval: VendorApproval): boolean {
  return approval === VENDOR.APPROVAL.APPROVED;
}

export function vendorCanSell(status: VendorStatus): boolean {
  return status === VENDOR.STATUS.ACTIVE;
}
