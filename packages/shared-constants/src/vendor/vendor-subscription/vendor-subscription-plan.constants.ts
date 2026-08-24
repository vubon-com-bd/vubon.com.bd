/**
 * Vendor Subscription Plan Constants
 * Plan definitions for vendor subscriptions
 */

import {
  VENDOR_SUBSCRIPTION_BILLING_CYCLES,
  type VendorBillingCycle,
} from './vendor-subscription.constants';

export const VENDOR_SUBSCRIPTION_PLAN = {
  // Plan Types
  TYPES: {
    BASIC: 'basic',
    PREMIUM: 'premium',
    ENTERPRISE: 'enterprise',
    CUSTOM: 'custom',
    TRIAL: 'trial',
  } as const,

  // Plan Categories
  CATEGORIES: {
    STARTER: 'starter',
    BUSINESS: 'business',
    PROFESSIONAL: 'professional',
    ENTERPRISE: 'enterprise',
  } as const,

  // Plan Features
  FEATURES: {
    BASIC: {
      products: 50,
      orders: 100,
      storage: 1024,
      staff: 1,
      analytics: false,
      promotion_tools: false,
      priority_support: false,
      dedicated_manager: false,
      api_access: false,
      advanced_reporting: false,
      multi_channel: false,
    },
    PREMIUM: {
      products: 200,
      orders: 500,
      storage: 5120,
      staff: 5,
      analytics: true,
      promotion_tools: true,
      priority_support: true,
      dedicated_manager: false,
      api_access: true,
      advanced_reporting: false,
      multi_channel: false,
    },
    ENTERPRISE: {
      products: 1000,
      orders: 5000,
      storage: 20480,
      staff: 20,
      analytics: true,
      promotion_tools: true,
      priority_support: true,
      dedicated_manager: true,
      api_access: true,
      advanced_reporting: true,
      multi_channel: true,
    },
    CUSTOM: {
      products: 0,
      orders: 0,
      storage: 0,
      staff: 0,
      analytics: false,
      promotion_tools: false,
      priority_support: false,
      dedicated_manager: false,
      api_access: false,
      advanced_reporting: false,
      multi_channel: false,
    },
    TRIAL: {
      products: 10,
      orders: 20,
      storage: 512,
      staff: 1,
      analytics: false,
      promotion_tools: false,
      priority_support: false,
      dedicated_manager: false,
      api_access: false,
      advanced_reporting: false,
      multi_channel: false,
    },
  } as const,

  // Plan Pricing (in BDT)
  PRICING: {
    BASIC: 999,
    PREMIUM: 2999,
    ENTERPRISE: 9999,
    CUSTOM: 0,
    TRIAL: 0,
  } as const,

  // Plan Discounts (percentage)
  DISCOUNTS: {
    QUARTERLY: 5,
    SEMI_ANNUAL: 10,
    ANNUAL: 15,
    BIENNIAL: 20,
  } as const,

  // Plan Colors (for UI)
  COLORS: {
    BASIC: '#blue-400',
    PREMIUM: '#purple-500',
    ENTERPRISE: '#gold-500',
    CUSTOM: '#gray-500',
    TRIAL: '#green-400',
  } as const,

  // Plan Icons (for UI)
  ICONS: {
    BASIC: '🔵',
    PREMIUM: '💎',
    ENTERPRISE: '🏢',
    CUSTOM: '⚙️',
    TRIAL: '🎯',
  } as const,
} as const;

// Plan Types
export type VendorSubscriptionPlanType =
  (typeof VENDOR_SUBSCRIPTION_PLAN.TYPES)[keyof typeof VENDOR_SUBSCRIPTION_PLAN.TYPES];

// Plan Categories
export type VendorSubscriptionPlanCategory =
  (typeof VENDOR_SUBSCRIPTION_PLAN.CATEGORIES)[keyof typeof VENDOR_SUBSCRIPTION_PLAN.CATEGORIES];

// Plan Features
export type VendorSubscriptionPlanFeatures =
  (typeof VENDOR_SUBSCRIPTION_PLAN.FEATURES)[keyof typeof VENDOR_SUBSCRIPTION_PLAN.FEATURES];

// Plan Colors
export type VendorSubscriptionPlanColor =
  (typeof VENDOR_SUBSCRIPTION_PLAN.COLORS)[keyof typeof VENDOR_SUBSCRIPTION_PLAN.COLORS];

// Plan Icons
export type VendorSubscriptionPlanIcon =
  (typeof VENDOR_SUBSCRIPTION_PLAN.ICONS)[keyof typeof VENDOR_SUBSCRIPTION_PLAN.ICONS];

// Utility Functions
export function vendorSubscriptionPlanGetLabel(type: VendorSubscriptionPlanType): string {
  const labels: Record<VendorSubscriptionPlanType, string> = {
    [VENDOR_SUBSCRIPTION_PLAN.TYPES.BASIC]: 'Basic',
    [VENDOR_SUBSCRIPTION_PLAN.TYPES.PREMIUM]: 'Premium',
    [VENDOR_SUBSCRIPTION_PLAN.TYPES.ENTERPRISE]: 'Enterprise',
    [VENDOR_SUBSCRIPTION_PLAN.TYPES.CUSTOM]: 'Custom',
    [VENDOR_SUBSCRIPTION_PLAN.TYPES.TRIAL]: 'Trial',
  };
  return labels[type] || 'Unknown';
}

export function vendorSubscriptionPlanGetCategory(
  type: VendorSubscriptionPlanType
): VendorSubscriptionPlanCategory {
  const categories: Record<VendorSubscriptionPlanType, VendorSubscriptionPlanCategory> = {
    [VENDOR_SUBSCRIPTION_PLAN.TYPES.BASIC]: VENDOR_SUBSCRIPTION_PLAN.CATEGORIES.STARTER,
    [VENDOR_SUBSCRIPTION_PLAN.TYPES.PREMIUM]: VENDOR_SUBSCRIPTION_PLAN.CATEGORIES.BUSINESS,
    [VENDOR_SUBSCRIPTION_PLAN.TYPES.ENTERPRISE]: VENDOR_SUBSCRIPTION_PLAN.CATEGORIES.ENTERPRISE,
    [VENDOR_SUBSCRIPTION_PLAN.TYPES.CUSTOM]: VENDOR_SUBSCRIPTION_PLAN.CATEGORIES.ENTERPRISE,
    [VENDOR_SUBSCRIPTION_PLAN.TYPES.TRIAL]: VENDOR_SUBSCRIPTION_PLAN.CATEGORIES.STARTER,
  };
  return categories[type] || VENDOR_SUBSCRIPTION_PLAN.CATEGORIES.STARTER;
}

export function vendorSubscriptionPlanGetFeatures(
  type: VendorSubscriptionPlanType
): VendorSubscriptionPlanFeatures {
  const features: Record<VendorSubscriptionPlanType, VendorSubscriptionPlanFeatures> = {
    [VENDOR_SUBSCRIPTION_PLAN.TYPES.BASIC]: VENDOR_SUBSCRIPTION_PLAN.FEATURES.BASIC,
    [VENDOR_SUBSCRIPTION_PLAN.TYPES.PREMIUM]: VENDOR_SUBSCRIPTION_PLAN.FEATURES.PREMIUM,
    [VENDOR_SUBSCRIPTION_PLAN.TYPES.ENTERPRISE]: VENDOR_SUBSCRIPTION_PLAN.FEATURES.ENTERPRISE,
    [VENDOR_SUBSCRIPTION_PLAN.TYPES.CUSTOM]: VENDOR_SUBSCRIPTION_PLAN.FEATURES.CUSTOM,
    [VENDOR_SUBSCRIPTION_PLAN.TYPES.TRIAL]: VENDOR_SUBSCRIPTION_PLAN.FEATURES.TRIAL,
  };
  return features[type] || VENDOR_SUBSCRIPTION_PLAN.FEATURES.BASIC;
}

export function vendorSubscriptionPlanGetPrice(type: VendorSubscriptionPlanType): number {
  const prices: Record<VendorSubscriptionPlanType, number> = {
    [VENDOR_SUBSCRIPTION_PLAN.TYPES.BASIC]: VENDOR_SUBSCRIPTION_PLAN.PRICING.BASIC,
    [VENDOR_SUBSCRIPTION_PLAN.TYPES.PREMIUM]: VENDOR_SUBSCRIPTION_PLAN.PRICING.PREMIUM,
    [VENDOR_SUBSCRIPTION_PLAN.TYPES.ENTERPRISE]: VENDOR_SUBSCRIPTION_PLAN.PRICING.ENTERPRISE,
    [VENDOR_SUBSCRIPTION_PLAN.TYPES.CUSTOM]: VENDOR_SUBSCRIPTION_PLAN.PRICING.CUSTOM,
    [VENDOR_SUBSCRIPTION_PLAN.TYPES.TRIAL]: VENDOR_SUBSCRIPTION_PLAN.PRICING.TRIAL,
  };
  return prices[type] || 0;
}

export function vendorSubscriptionPlanGetColor(
  type: VendorSubscriptionPlanType
): VendorSubscriptionPlanColor {
  const colors: Record<VendorSubscriptionPlanType, VendorSubscriptionPlanColor> = {
    [VENDOR_SUBSCRIPTION_PLAN.TYPES.BASIC]: VENDOR_SUBSCRIPTION_PLAN.COLORS.BASIC,
    [VENDOR_SUBSCRIPTION_PLAN.TYPES.PREMIUM]: VENDOR_SUBSCRIPTION_PLAN.COLORS.PREMIUM,
    [VENDOR_SUBSCRIPTION_PLAN.TYPES.ENTERPRISE]: VENDOR_SUBSCRIPTION_PLAN.COLORS.ENTERPRISE,
    [VENDOR_SUBSCRIPTION_PLAN.TYPES.CUSTOM]: VENDOR_SUBSCRIPTION_PLAN.COLORS.CUSTOM,
    [VENDOR_SUBSCRIPTION_PLAN.TYPES.TRIAL]: VENDOR_SUBSCRIPTION_PLAN.COLORS.TRIAL,
  };
  return colors[type] || '#gray-400';
}

export function vendorSubscriptionPlanGetDiscount(cycle: VendorBillingCycle): number {
  const discounts: Record<VendorBillingCycle, number> = {
    [VENDOR_SUBSCRIPTION_BILLING_CYCLES.MONTHLY]: 0,
    [VENDOR_SUBSCRIPTION_BILLING_CYCLES.QUARTERLY]: VENDOR_SUBSCRIPTION_PLAN.DISCOUNTS.QUARTERLY,
    [VENDOR_SUBSCRIPTION_BILLING_CYCLES.SEMI_ANNUAL]:
      VENDOR_SUBSCRIPTION_PLAN.DISCOUNTS.SEMI_ANNUAL,
    [VENDOR_SUBSCRIPTION_BILLING_CYCLES.ANNUAL]: VENDOR_SUBSCRIPTION_PLAN.DISCOUNTS.ANNUAL,
    [VENDOR_SUBSCRIPTION_BILLING_CYCLES.BIENNIAL]: VENDOR_SUBSCRIPTION_PLAN.DISCOUNTS.BIENNIAL,
  };
  return discounts[cycle] || 0;
}
