/**
 * Bundle Constants
 * Bundle configuration and settings
 */

export const DISCOVERY_BUNDLE = {
  // Bundle Types
  TYPES: {
    PRODUCT: 'product',
    SERVICE: 'service',
    HYBRID: 'hybrid',
    SEASONAL: 'seasonal',
    LIMITED: 'limited',
    CUSTOM: 'custom',
  } as const,

  // Bundle Statuses
  STATUSES: {
    ACTIVE: 'active',
    INACTIVE: 'inactive',
    DRAFT: 'draft',
    PENDING: 'pending',
    APPROVED: 'approved',
    REJECTED: 'rejected',
    EXPIRED: 'expired',
    ARCHIVED: 'archived',
    SCHEDULED: 'scheduled',
  } as const,

  // Bundle Defaults
  DEFAULTS: {
    DEFAULT_TYPE: 'product',
    DEFAULT_STATUS: 'draft',
    DEFAULT_LIMIT: 5,
    DEFAULT_CACHE_TTL: 3600,
    DEFAULT_DISCOUNT: 0.1,
    DEFAULT_MIN_ITEMS: 2,
    DEFAULT_MAX_ITEMS: 10,
    MAX_BUNDLE_ITEMS: 20,
    MIN_BUNDLE_ITEMS: 2,
    MAX_BUNDLE_DISCOUNT: 0.5,
    MIN_BUNDLE_DISCOUNT: 0.0,
  } as const,

  // Bundle Limits
  LIMITS: {
    MAX_ITEMS: 20,
    MIN_ITEMS: 2,
    MAX_CACHE_TTL: 86400,
    MIN_CACHE_TTL: 60,
    MAX_DISCOUNT: 0.5,
    MIN_DISCOUNT: 0.0,
    MAX_BUNDLES_PER_USER: 50,
    MAX_BUNDLES_PER_PRODUCT: 10,
  } as const,

  // Bundle Errors
  ERRORS: {
    CREATION_FAILED: 'creation_failed',
    UPDATE_FAILED: 'update_failed',
    INVALID_ITEMS: 'invalid_items',
    INVALID_DISCOUNT: 'invalid_discount',
    BUNDLE_EXISTS: 'bundle_exists',
    BUNDLE_NOT_FOUND: 'bundle_not_found',
    CACHE_ERROR: 'cache_error',
  } as const,
} as const;

// Bundle Types
export type DiscoveryBundleType =
  (typeof DISCOVERY_BUNDLE.TYPES)[keyof typeof DISCOVERY_BUNDLE.TYPES];

// Bundle Statuses
export type DiscoveryBundleStatus =
  (typeof DISCOVERY_BUNDLE.STATUSES)[keyof typeof DISCOVERY_BUNDLE.STATUSES];

// Bundle Defaults
export type DiscoveryBundleDefault =
  (typeof DISCOVERY_BUNDLE.DEFAULTS)[keyof typeof DISCOVERY_BUNDLE.DEFAULTS];

// Bundle Limits
export type DiscoveryBundleLimit =
  (typeof DISCOVERY_BUNDLE.LIMITS)[keyof typeof DISCOVERY_BUNDLE.LIMITS];

// Bundle Errors
export type DiscoveryBundleError =
  (typeof DISCOVERY_BUNDLE.ERRORS)[keyof typeof DISCOVERY_BUNDLE.ERRORS];

// Utility Functions
export function discoveryBundleGetTypeLabel(type: DiscoveryBundleType): string {
  const labels: Record<DiscoveryBundleType, string> = {
    [DISCOVERY_BUNDLE.TYPES.PRODUCT]: 'Product',
    [DISCOVERY_BUNDLE.TYPES.SERVICE]: 'Service',
    [DISCOVERY_BUNDLE.TYPES.HYBRID]: 'Hybrid',
    [DISCOVERY_BUNDLE.TYPES.SEASONAL]: 'Seasonal',
    [DISCOVERY_BUNDLE.TYPES.LIMITED]: 'Limited',
    [DISCOVERY_BUNDLE.TYPES.CUSTOM]: 'Custom',
  };
  return labels[type] || 'Unknown Bundle Type';
}

export function discoveryBundleGetStatusLabel(status: DiscoveryBundleStatus): string {
  const labels: Record<DiscoveryBundleStatus, string> = {
    [DISCOVERY_BUNDLE.STATUSES.ACTIVE]: 'Active',
    [DISCOVERY_BUNDLE.STATUSES.INACTIVE]: 'Inactive',
    [DISCOVERY_BUNDLE.STATUSES.DRAFT]: 'Draft',
    [DISCOVERY_BUNDLE.STATUSES.PENDING]: 'Pending',
    [DISCOVERY_BUNDLE.STATUSES.APPROVED]: 'Approved',
    [DISCOVERY_BUNDLE.STATUSES.REJECTED]: 'Rejected',
    [DISCOVERY_BUNDLE.STATUSES.EXPIRED]: 'Expired',
    [DISCOVERY_BUNDLE.STATUSES.ARCHIVED]: 'Archived',
    [DISCOVERY_BUNDLE.STATUSES.SCHEDULED]: 'Scheduled',
  };
  return labels[status] || 'Unknown Status';
}

export function discoveryBundleGetErrorLabel(error: DiscoveryBundleError): string {
  const labels: Record<DiscoveryBundleError, string> = {
    [DISCOVERY_BUNDLE.ERRORS.CREATION_FAILED]: 'Creation Failed',
    [DISCOVERY_BUNDLE.ERRORS.UPDATE_FAILED]: 'Update Failed',
    [DISCOVERY_BUNDLE.ERRORS.INVALID_ITEMS]: 'Invalid Items',
    [DISCOVERY_BUNDLE.ERRORS.INVALID_DISCOUNT]: 'Invalid Discount',
    [DISCOVERY_BUNDLE.ERRORS.BUNDLE_EXISTS]: 'Bundle Exists',
    [DISCOVERY_BUNDLE.ERRORS.BUNDLE_NOT_FOUND]: 'Bundle Not Found',
    [DISCOVERY_BUNDLE.ERRORS.CACHE_ERROR]: 'Cache Error',
  };
  return labels[error] || 'Unknown Error';
}

export function discoveryBundleIsActive(status: DiscoveryBundleStatus): boolean {
  return status === DISCOVERY_BUNDLE.STATUSES.ACTIVE;
}

export function discoveryBundleIsApproved(status: DiscoveryBundleStatus): boolean {
  const approvedStatuses: DiscoveryBundleStatus[] = [
    DISCOVERY_BUNDLE.STATUSES.APPROVED,
    DISCOVERY_BUNDLE.STATUSES.ACTIVE,
  ];
  return approvedStatuses.includes(status);
}

export function discoveryBundleGetDefaultLimit(): number {
  return DISCOVERY_BUNDLE.DEFAULTS.DEFAULT_LIMIT;
}

export function discoveryBundleGetDefaultDiscount(): number {
  return DISCOVERY_BUNDLE.DEFAULTS.DEFAULT_DISCOUNT;
}

export function discoveryBundleGetMaxItems(): number {
  return DISCOVERY_BUNDLE.DEFAULTS.MAX_BUNDLE_ITEMS;
}

export function discoveryBundleGetMinItems(): number {
  return DISCOVERY_BUNDLE.DEFAULTS.MIN_BUNDLE_ITEMS;
}
