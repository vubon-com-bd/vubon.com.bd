/**
 * Vendor Subscription Constants
 * Configuration for vendor subscriptions
 */

// Subscription Types
export const VENDOR_SUBSCRIPTION_TYPES = {
  BASIC: 'basic',
  PREMIUM: 'premium',
  ENTERPRISE: 'enterprise',
  CUSTOM: 'custom',
  TRIAL: 'trial',
} as const;

export type VendorSubscriptionType =
  (typeof VENDOR_SUBSCRIPTION_TYPES)[keyof typeof VENDOR_SUBSCRIPTION_TYPES];

// Subscription Statuses
export const VENDOR_SUBSCRIPTION_STATUSES = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  PENDING: 'pending',
  EXPIRED: 'expired',
  CANCELLED: 'cancelled',
  SUSPENDED: 'suspended',
  TRIAL: 'trial',
} as const;

export type VendorSubscriptionStatus =
  (typeof VENDOR_SUBSCRIPTION_STATUSES)[keyof typeof VENDOR_SUBSCRIPTION_STATUSES];

// Subscription Billing Cycles
export const VENDOR_SUBSCRIPTION_BILLING_CYCLES = {
  MONTHLY: 'monthly',
  QUARTERLY: 'quarterly',
  SEMI_ANNUAL: 'semi_annual',
  ANNUAL: 'annual',
  BIENNIAL: 'biennial',
} as const;

export type VendorBillingCycle =
  (typeof VENDOR_SUBSCRIPTION_BILLING_CYCLES)[keyof typeof VENDOR_SUBSCRIPTION_BILLING_CYCLES];

// Subscription Features
export const VENDOR_SUBSCRIPTION_FEATURES = {
  PRODUCT_LIMIT: 'product_limit',
  ORDER_LIMIT: 'order_limit',
  STORAGE_LIMIT: 'storage_limit',
  ANALYTICS: 'analytics',
  PROMOTION_TOOLS: 'promotion_tools',
  PRIORITY_SUPPORT: 'priority_support',
  DEDICATED_MANAGER: 'dedicated_manager',
  API_ACCESS: 'api_access',
  ADVANCED_REPORTING: 'advanced_reporting',
  MULTI_CHANNEL: 'multi_channel',
} as const;

export type VendorSubscriptionFeature =
  (typeof VENDOR_SUBSCRIPTION_FEATURES)[keyof typeof VENDOR_SUBSCRIPTION_FEATURES];

// Subscription Payment Methods
export const VENDOR_SUBSCRIPTION_PAYMENT_METHODS = {
  CREDIT_CARD: 'credit_card',
  DEBIT_CARD: 'debit_card',
  BANK_TRANSFER: 'bank_transfer',
  MOBILE_BANKING: 'mobile_banking',
  DIGITAL_WALLET: 'digital_wallet',
} as const;

export type VendorSubscriptionPaymentMethod =
  (typeof VENDOR_SUBSCRIPTION_PAYMENT_METHODS)[keyof typeof VENDOR_SUBSCRIPTION_PAYMENT_METHODS];

// Subscription Limits
export const VENDOR_SUBSCRIPTION_LIMITS = {
  BASIC: {
    products: 50,
    orders: 100,
    storage: 1024, // MB
    staff: 1,
  },
  PREMIUM: {
    products: 200,
    orders: 500,
    storage: 5120, // MB
    staff: 5,
  },
  ENTERPRISE: {
    products: 1000,
    orders: 5000,
    storage: 20480, // MB
    staff: 20,
  },
  CUSTOM: {
    products: 0,
    orders: 0,
    storage: 0,
    staff: 0,
  },
  TRIAL: {
    products: 10,
    orders: 20,
    storage: 512,
    staff: 1,
  },
};

export type VendorSubscriptionLimits =
  (typeof VENDOR_SUBSCRIPTION_LIMITS)[keyof typeof VENDOR_SUBSCRIPTION_LIMITS];

// Subscription Pricing (in BDT)
export const VENDOR_SUBSCRIPTION_PRICING = {
  BASIC: 999,
  PREMIUM: 2999,
  ENTERPRISE: 9999,
  CUSTOM: 0,
  TRIAL: 0,
} as const;

export type VendorSubscriptionPricing =
  (typeof VENDOR_SUBSCRIPTION_PRICING)[keyof typeof VENDOR_SUBSCRIPTION_PRICING];

// Utility Functions
export function vendorSubscriptionGetTypeLabel(type: VendorSubscriptionType): string {
  const labels: Record<VendorSubscriptionType, string> = {
    [VENDOR_SUBSCRIPTION_TYPES.BASIC]: 'Basic',
    [VENDOR_SUBSCRIPTION_TYPES.PREMIUM]: 'Premium',
    [VENDOR_SUBSCRIPTION_TYPES.ENTERPRISE]: 'Enterprise',
    [VENDOR_SUBSCRIPTION_TYPES.CUSTOM]: 'Custom',
    [VENDOR_SUBSCRIPTION_TYPES.TRIAL]: 'Trial',
  };
  return labels[type] || 'Unknown';
}

export function vendorSubscriptionGetStatusLabel(status: VendorSubscriptionStatus): string {
  const labels: Record<VendorSubscriptionStatus, string> = {
    [VENDOR_SUBSCRIPTION_STATUSES.ACTIVE]: 'Active',
    [VENDOR_SUBSCRIPTION_STATUSES.INACTIVE]: 'Inactive',
    [VENDOR_SUBSCRIPTION_STATUSES.PENDING]: 'Pending',
    [VENDOR_SUBSCRIPTION_STATUSES.EXPIRED]: 'Expired',
    [VENDOR_SUBSCRIPTION_STATUSES.CANCELLED]: 'Cancelled',
    [VENDOR_SUBSCRIPTION_STATUSES.SUSPENDED]: 'Suspended',
    [VENDOR_SUBSCRIPTION_STATUSES.TRIAL]: 'Trial',
  };
  return labels[status] || 'Unknown';
}

export function vendorSubscriptionGetBillingCycleLabel(cycle: VendorBillingCycle): string {
  const labels: Record<VendorBillingCycle, string> = {
    [VENDOR_SUBSCRIPTION_BILLING_CYCLES.MONTHLY]: 'Monthly',
    [VENDOR_SUBSCRIPTION_BILLING_CYCLES.QUARTERLY]: 'Quarterly',
    [VENDOR_SUBSCRIPTION_BILLING_CYCLES.SEMI_ANNUAL]: 'Semi-Annual',
    [VENDOR_SUBSCRIPTION_BILLING_CYCLES.ANNUAL]: 'Annual',
    [VENDOR_SUBSCRIPTION_BILLING_CYCLES.BIENNIAL]: 'Biennial',
  };
  return labels[cycle] || 'Unknown';
}

export function vendorSubscriptionGetPaymentMethodLabel(
  method: VendorSubscriptionPaymentMethod
): string {
  const labels: Record<VendorSubscriptionPaymentMethod, string> = {
    [VENDOR_SUBSCRIPTION_PAYMENT_METHODS.CREDIT_CARD]: 'Credit Card',
    [VENDOR_SUBSCRIPTION_PAYMENT_METHODS.DEBIT_CARD]: 'Debit Card',
    [VENDOR_SUBSCRIPTION_PAYMENT_METHODS.BANK_TRANSFER]: 'Bank Transfer',
    [VENDOR_SUBSCRIPTION_PAYMENT_METHODS.MOBILE_BANKING]: 'Mobile Banking',
    [VENDOR_SUBSCRIPTION_PAYMENT_METHODS.DIGITAL_WALLET]: 'Digital Wallet',
  };
  return labels[method] || 'Unknown';
}

export function vendorSubscriptionIsActive(status: VendorSubscriptionStatus): boolean {
  return (
    status === VENDOR_SUBSCRIPTION_STATUSES.ACTIVE || status === VENDOR_SUBSCRIPTION_STATUSES.TRIAL
  );
}

export function vendorSubscriptionCanRenew(status: VendorSubscriptionStatus): boolean {
  return (
    status === VENDOR_SUBSCRIPTION_STATUSES.ACTIVE ||
    status === VENDOR_SUBSCRIPTION_STATUSES.EXPIRED
  );
}

export function vendorSubscriptionGetPlanLimits(
  type: VendorSubscriptionType
): VendorSubscriptionLimits {
  const limits: Record<VendorSubscriptionType, VendorSubscriptionLimits> = {
    [VENDOR_SUBSCRIPTION_TYPES.BASIC]: VENDOR_SUBSCRIPTION_LIMITS.BASIC,
    [VENDOR_SUBSCRIPTION_TYPES.PREMIUM]: VENDOR_SUBSCRIPTION_LIMITS.PREMIUM,
    [VENDOR_SUBSCRIPTION_TYPES.ENTERPRISE]: VENDOR_SUBSCRIPTION_LIMITS.ENTERPRISE,
    [VENDOR_SUBSCRIPTION_TYPES.CUSTOM]: VENDOR_SUBSCRIPTION_LIMITS.CUSTOM,
    [VENDOR_SUBSCRIPTION_TYPES.TRIAL]: VENDOR_SUBSCRIPTION_LIMITS.TRIAL,
  };
  return limits[type] || VENDOR_SUBSCRIPTION_LIMITS.BASIC;
}
