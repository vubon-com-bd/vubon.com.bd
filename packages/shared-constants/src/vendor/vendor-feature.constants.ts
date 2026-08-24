/**
 * Vendor Feature Constants
 * Configuration for vendor features
 */

export const VENDOR_FEATURE = {
  // Feature Types
  TYPES: {
    PRODUCT: 'product',
    ORDER: 'order',
    PAYMENT: 'payment',
    ANALYTICS: 'analytics',
    PROMOTION: 'promotion',
    SUPPORT: 'support',
    TEAM: 'team',
    REPORT: 'report',
    INVENTORY: 'inventory',
    SHIPPING: 'shipping',
  } as const,

  // Feature Statuses
  STATUS: {
    ACTIVE: 'active',
    INACTIVE: 'inactive',
    PENDING: 'pending',
    BETA: 'beta',
    DEPRECATED: 'deprecated',
  } as const,

  // Feature Categories
  CATEGORIES: {
    CORE: 'core',
    ADVANCED: 'advanced',
    PREMIUM: 'premium',
    ENTERPRISE: 'enterprise',
    EXPERIMENTAL: 'experimental',
  } as const,

  // Feature Access Levels
  ACCESS_LEVELS: {
    BASIC: 'basic',
    PREMIUM: 'premium',
    ENTERPRISE: 'enterprise',
    CUSTOM: 'custom',
  } as const,

  // Feature Flags
  FLAGS: {
    ENABLED: 'enabled',
    DISABLED: 'disabled',
    PARTIAL: 'partial',
    ROLLOUT: 'rollout',
  } as const,

  // Feature Dependencies
  DEPENDENCIES: {
    ANALYTICS: 'analytics',
    PAYMENT: 'payment',
    SHIPPING: 'shipping',
    INVENTORY: 'inventory',
  } as const,

  // Feature Limits
  LIMITS: {
    MAX_FEATURES: 50,
    MAX_CUSTOM_FEATURES: 10,
  } as const,
} as const;

// Feature Types
export type VendorFeatureType = (typeof VENDOR_FEATURE.TYPES)[keyof typeof VENDOR_FEATURE.TYPES];

// Feature Statuses
export type VendorFeatureStatus =
  (typeof VENDOR_FEATURE.STATUS)[keyof typeof VENDOR_FEATURE.STATUS];

// Feature Categories
export type VendorFeatureCategory =
  (typeof VENDOR_FEATURE.CATEGORIES)[keyof typeof VENDOR_FEATURE.CATEGORIES];

// Feature Access Levels
export type VendorFeatureAccessLevel =
  (typeof VENDOR_FEATURE.ACCESS_LEVELS)[keyof typeof VENDOR_FEATURE.ACCESS_LEVELS];

// Feature Flags
export type VendorFeatureFlag = (typeof VENDOR_FEATURE.FLAGS)[keyof typeof VENDOR_FEATURE.FLAGS];

// Utility Functions
export function vendorFeatureGetTypeLabel(type: VendorFeatureType): string {
  const labels: Record<VendorFeatureType, string> = {
    [VENDOR_FEATURE.TYPES.PRODUCT]: 'Product Management',
    [VENDOR_FEATURE.TYPES.ORDER]: 'Order Management',
    [VENDOR_FEATURE.TYPES.PAYMENT]: 'Payment Processing',
    [VENDOR_FEATURE.TYPES.ANALYTICS]: 'Analytics',
    [VENDOR_FEATURE.TYPES.PROMOTION]: 'Promotion Tools',
    [VENDOR_FEATURE.TYPES.SUPPORT]: 'Customer Support',
    [VENDOR_FEATURE.TYPES.TEAM]: 'Team Management',
    [VENDOR_FEATURE.TYPES.REPORT]: 'Reporting',
    [VENDOR_FEATURE.TYPES.INVENTORY]: 'Inventory Management',
    [VENDOR_FEATURE.TYPES.SHIPPING]: 'Shipping Management',
  };
  return labels[type] || 'Unknown';
}

export function vendorFeatureGetStatusLabel(status: VendorFeatureStatus): string {
  const labels: Record<VendorFeatureStatus, string> = {
    [VENDOR_FEATURE.STATUS.ACTIVE]: 'Active',
    [VENDOR_FEATURE.STATUS.INACTIVE]: 'Inactive',
    [VENDOR_FEATURE.STATUS.PENDING]: 'Pending',
    [VENDOR_FEATURE.STATUS.BETA]: 'Beta',
    [VENDOR_FEATURE.STATUS.DEPRECATED]: 'Deprecated',
  };
  return labels[status] || 'Unknown';
}

export function vendorFeatureGetCategoryLabel(category: VendorFeatureCategory): string {
  const labels: Record<VendorFeatureCategory, string> = {
    [VENDOR_FEATURE.CATEGORIES.CORE]: 'Core',
    [VENDOR_FEATURE.CATEGORIES.ADVANCED]: 'Advanced',
    [VENDOR_FEATURE.CATEGORIES.PREMIUM]: 'Premium',
    [VENDOR_FEATURE.CATEGORIES.ENTERPRISE]: 'Enterprise',
    [VENDOR_FEATURE.CATEGORIES.EXPERIMENTAL]: 'Experimental',
  };
  return labels[category] || 'Unknown';
}

export function vendorFeatureGetAccessLevelLabel(level: VendorFeatureAccessLevel): string {
  const labels: Record<VendorFeatureAccessLevel, string> = {
    [VENDOR_FEATURE.ACCESS_LEVELS.BASIC]: 'Basic',
    [VENDOR_FEATURE.ACCESS_LEVELS.PREMIUM]: 'Premium',
    [VENDOR_FEATURE.ACCESS_LEVELS.ENTERPRISE]: 'Enterprise',
    [VENDOR_FEATURE.ACCESS_LEVELS.CUSTOM]: 'Custom',
  };
  return labels[level] || 'Unknown';
}

export function vendorFeatureIsActive(status: VendorFeatureStatus): boolean {
  return status === VENDOR_FEATURE.STATUS.ACTIVE || status === VENDOR_FEATURE.STATUS.BETA;
}

export function vendorFeatureGetFlagLabel(flag: VendorFeatureFlag): string {
  const labels: Record<VendorFeatureFlag, string> = {
    [VENDOR_FEATURE.FLAGS.ENABLED]: 'Enabled',
    [VENDOR_FEATURE.FLAGS.DISABLED]: 'Disabled',
    [VENDOR_FEATURE.FLAGS.PARTIAL]: 'Partial',
    [VENDOR_FEATURE.FLAGS.ROLLOUT]: 'Rollout',
  };
  return labels[flag] || 'Unknown';
}
