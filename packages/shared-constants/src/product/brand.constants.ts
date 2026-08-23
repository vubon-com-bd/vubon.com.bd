/**
 * Brand Constants
 * Brand configuration and settings
 */

export const PRODUCTBRAND = {
  // Brand Statuses
  STATUSES: {
    ACTIVE: 'active',
    INACTIVE: 'inactive',
    ARCHIVED: 'archived',
    PENDING: 'pending',
    DRAFT: 'draft',
  } as const,

  // Brand Types
  TYPES: {
    OWNED: 'owned',
    PARTNER: 'partner',
    EXCLUSIVE: 'exclusive',
    CUSTOM: 'custom',
  } as const,

  // Brand Verification
  VERIFICATION: {
    VERIFIED: 'verified',
    UNVERIFIED: 'unverified',
    PENDING: 'pending',
    REJECTED: 'rejected',
  } as const,

  // Brand Defaults
  DEFAULTS: {
    DEFAULT_STATUS: 'active',
    DEFAULT_TYPE: 'owned',
    DEFAULT_VERIFICATION: 'verified',
    MAX_LOGO_SIZE_MB: 5,
    DEFAULT_COUNTRY: 'BD',
  } as const,

  // Brand Limits
  LIMITS: {
    MIN_NAME_LENGTH: 2,
    MAX_NAME_LENGTH: 100,
    MAX_DESCRIPTION_LENGTH: 1000,
    MAX_WEBSITE_LENGTH: 200,
    MAX_SLUG_LENGTH: 100,
    MAX_LOGO_SIZE_MB: 5,
  } as const,
} as const;

// Brand Statuses
export type ProductBrandStatus = (typeof PRODUCTBRAND.STATUSES)[keyof typeof PRODUCTBRAND.STATUSES];

// Brand Types
export type ProductBrandType = (typeof PRODUCTBRAND.TYPES)[keyof typeof PRODUCTBRAND.TYPES];

// Brand Verification
export type ProductBrandVerification =
  (typeof PRODUCTBRAND.VERIFICATION)[keyof typeof PRODUCTBRAND.VERIFICATION];

// Brand Defaults
export type ProductBrandDefault =
  (typeof PRODUCTBRAND.DEFAULTS)[keyof typeof PRODUCTBRAND.DEFAULTS];

// Brand Limits
export type ProductBrandLimit = (typeof PRODUCTBRAND.LIMITS)[keyof typeof PRODUCTBRAND.LIMITS];

// Utility Functions
export function productbrandGetStatusLabel(status: ProductBrandStatus): string {
  const labels: Record<ProductBrandStatus, string> = {
    [PRODUCTBRAND.STATUSES.ACTIVE]: 'Active',
    [PRODUCTBRAND.STATUSES.INACTIVE]: 'Inactive',
    [PRODUCTBRAND.STATUSES.ARCHIVED]: 'Archived',
    [PRODUCTBRAND.STATUSES.PENDING]: 'Pending',
    [PRODUCTBRAND.STATUSES.DRAFT]: 'Draft',
  };
  return labels[status] || 'Unknown Status';
}

export function productbrandGetTypeLabel(type: ProductBrandType): string {
  const labels: Record<ProductBrandType, string> = {
    [PRODUCTBRAND.TYPES.OWNED]: 'Owned',
    [PRODUCTBRAND.TYPES.PARTNER]: 'Partner',
    [PRODUCTBRAND.TYPES.EXCLUSIVE]: 'Exclusive',
    [PRODUCTBRAND.TYPES.CUSTOM]: 'Custom',
  };
  return labels[type] || 'Unknown Brand Type';
}

export function productbrandGetVerificationLabel(verification: ProductBrandVerification): string {
  const labels: Record<ProductBrandVerification, string> = {
    [PRODUCTBRAND.VERIFICATION.VERIFIED]: 'Verified',
    [PRODUCTBRAND.VERIFICATION.UNVERIFIED]: 'Unverified',
    [PRODUCTBRAND.VERIFICATION.PENDING]: 'Pending',
    [PRODUCTBRAND.VERIFICATION.REJECTED]: 'Rejected',
  };
  return labels[verification] || 'Unknown Verification Status';
}

export function productbrandIsActive(status: ProductBrandStatus): boolean {
  return status === PRODUCTBRAND.STATUSES.ACTIVE;
}

export function productbrandIsVerified(verification: ProductBrandVerification): boolean {
  return verification === PRODUCTBRAND.VERIFICATION.VERIFIED;
}
