/**
 * Vendor Activity Type Constants
 * Types of vendor activities
 */

export const VENDOR_ACTIVITY_TYPE = {
  // Activity Categories
  CATEGORIES: {
    AUTH: 'auth',
    PRODUCT: 'product',
    ORDER: 'order',
    PAYMENT: 'payment',
    PROFILE: 'profile',
    SETTINGS: 'settings',
    SUPPORT: 'support',
    REPORT: 'report',
    TEAM: 'team',
    SYSTEM: 'system',
  } as const,

  // Activity Scopes
  SCOPES: {
    GLOBAL: 'global',
    VENDOR: 'vendor',
    TEAM: 'team',
    USER: 'user',
  } as const,

  // Activity Priorities
  PRIORITIES: {
    CRITICAL: 'critical',
    HIGH: 'high',
    MEDIUM: 'medium',
    LOW: 'low',
  } as const,

  // Activity Retention (in days)
  RETENTION: {
    CRITICAL: 365,
    HIGH: 180,
    MEDIUM: 90,
    LOW: 30,
    INFO: 7,
  } as const,

  // Activity Logging
  LOGGING: {
    ALWAYS: 'always',
    ON_ERROR: 'on_error',
    ON_SUCCESS: 'on_success',
    NEVER: 'never',
  } as const,
} as const;

// Activity Categories
export type VendorActivityTypeCategory =
  (typeof VENDOR_ACTIVITY_TYPE.CATEGORIES)[keyof typeof VENDOR_ACTIVITY_TYPE.CATEGORIES];

// Activity Scopes
export type VendorActivityTypeScope =
  (typeof VENDOR_ACTIVITY_TYPE.SCOPES)[keyof typeof VENDOR_ACTIVITY_TYPE.SCOPES];

// Activity Priorities
export type VendorActivityTypePriority =
  (typeof VENDOR_ACTIVITY_TYPE.PRIORITIES)[keyof typeof VENDOR_ACTIVITY_TYPE.PRIORITIES];

// Activity Retention
export type VendorActivityTypeRetention =
  (typeof VENDOR_ACTIVITY_TYPE.RETENTION)[keyof typeof VENDOR_ACTIVITY_TYPE.RETENTION];

// Activity Logging
export type VendorActivityTypeLogging =
  (typeof VENDOR_ACTIVITY_TYPE.LOGGING)[keyof typeof VENDOR_ACTIVITY_TYPE.LOGGING];

// Utility Functions
export function vendorActivityTypeGetCategoryLabel(category: VendorActivityTypeCategory): string {
  const labels: Record<VendorActivityTypeCategory, string> = {
    [VENDOR_ACTIVITY_TYPE.CATEGORIES.AUTH]: 'Authentication',
    [VENDOR_ACTIVITY_TYPE.CATEGORIES.PRODUCT]: 'Product',
    [VENDOR_ACTIVITY_TYPE.CATEGORIES.ORDER]: 'Order',
    [VENDOR_ACTIVITY_TYPE.CATEGORIES.PAYMENT]: 'Payment',
    [VENDOR_ACTIVITY_TYPE.CATEGORIES.PROFILE]: 'Profile',
    [VENDOR_ACTIVITY_TYPE.CATEGORIES.SETTINGS]: 'Settings',
    [VENDOR_ACTIVITY_TYPE.CATEGORIES.SUPPORT]: 'Support',
    [VENDOR_ACTIVITY_TYPE.CATEGORIES.REPORT]: 'Report',
    [VENDOR_ACTIVITY_TYPE.CATEGORIES.TEAM]: 'Team',
    [VENDOR_ACTIVITY_TYPE.CATEGORIES.SYSTEM]: 'System',
  };
  return labels[category] || 'Unknown';
}

export function vendorActivityTypeGetScopeLabel(scope: VendorActivityTypeScope): string {
  const labels: Record<VendorActivityTypeScope, string> = {
    [VENDOR_ACTIVITY_TYPE.SCOPES.GLOBAL]: 'Global',
    [VENDOR_ACTIVITY_TYPE.SCOPES.VENDOR]: 'Vendor',
    [VENDOR_ACTIVITY_TYPE.SCOPES.TEAM]: 'Team',
    [VENDOR_ACTIVITY_TYPE.SCOPES.USER]: 'User',
  };
  return labels[scope] || 'Unknown';
}

export function vendorActivityTypeGetPriorityLabel(priority: VendorActivityTypePriority): string {
  const labels: Record<VendorActivityTypePriority, string> = {
    [VENDOR_ACTIVITY_TYPE.PRIORITIES.CRITICAL]: 'Critical',
    [VENDOR_ACTIVITY_TYPE.PRIORITIES.HIGH]: 'High',
    [VENDOR_ACTIVITY_TYPE.PRIORITIES.MEDIUM]: 'Medium',
    [VENDOR_ACTIVITY_TYPE.PRIORITIES.LOW]: 'Low',
  };
  return labels[priority] || 'Unknown';
}

export function vendorActivityTypeGetRetention(priority: VendorActivityTypePriority): number {
  const retention: Record<VendorActivityTypePriority, number> = {
    [VENDOR_ACTIVITY_TYPE.PRIORITIES.CRITICAL]: VENDOR_ACTIVITY_TYPE.RETENTION.CRITICAL,
    [VENDOR_ACTIVITY_TYPE.PRIORITIES.HIGH]: VENDOR_ACTIVITY_TYPE.RETENTION.HIGH,
    [VENDOR_ACTIVITY_TYPE.PRIORITIES.MEDIUM]: VENDOR_ACTIVITY_TYPE.RETENTION.MEDIUM,
    [VENDOR_ACTIVITY_TYPE.PRIORITIES.LOW]: VENDOR_ACTIVITY_TYPE.RETENTION.LOW,
  };
  return retention[priority] || VENDOR_ACTIVITY_TYPE.RETENTION.INFO;
}

export function vendorActivityTypeGetLogging(
  priority: VendorActivityTypePriority
): VendorActivityTypeLogging {
  const logging: Record<VendorActivityTypePriority, VendorActivityTypeLogging> = {
    [VENDOR_ACTIVITY_TYPE.PRIORITIES.CRITICAL]: VENDOR_ACTIVITY_TYPE.LOGGING.ALWAYS,
    [VENDOR_ACTIVITY_TYPE.PRIORITIES.HIGH]: VENDOR_ACTIVITY_TYPE.LOGGING.ALWAYS,
    [VENDOR_ACTIVITY_TYPE.PRIORITIES.MEDIUM]: VENDOR_ACTIVITY_TYPE.LOGGING.ON_ERROR,
    [VENDOR_ACTIVITY_TYPE.PRIORITIES.LOW]: VENDOR_ACTIVITY_TYPE.LOGGING.ON_SUCCESS,
  };
  return logging[priority] || VENDOR_ACTIVITY_TYPE.LOGGING.NEVER;
}
