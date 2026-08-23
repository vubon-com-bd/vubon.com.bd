/**
 * Product Deal Constants
 * Configuration for product-specific deals and discounts
 */

export const PRODUCT_DEAL = {
  // Product Deal Types
  TYPES: {
    SINGLE: 'single',
    MULTIPLE: 'multiple',
    BUNDLE: 'bundle',
    VARIANT: 'variant',
    CATEGORY: 'category',
    BRAND: 'brand',
    COLLECTION: 'collection',
    CUSTOM: 'custom',
  },

  // Product Deal Categories
  CATEGORIES: {
    DISCOUNT: 'discount',
    PROMOTIONAL: 'promotional',
    CLEARANCE: 'clearance',
    SEASONAL: 'seasonal',
    FLASH: 'flash',
    LIMITED: 'limited',
    EXCLUSIVE: 'exclusive',
  },

  // Product Deal Scope
  SCOPE: {
    ALL_PRODUCTS: 'all_products',
    SELECTED_PRODUCTS: 'selected_products',
    CATEGORY: 'category',
    BRAND: 'brand',
    COLLECTION: 'collection',
    VARIANT: 'variant',
    CUSTOM: 'custom',
  },

  // Product Deal Application
  APPLICATION: {
    PERCENTAGE: 'percentage',
    FIXED: 'fixed',
    PER_UNIT: 'per_unit',
    PER_ORDER: 'per_order',
    TIERED: 'tiered',
    BOGO: 'bogo',
    FREE_ITEM: 'free_item',
  },

  // Product Deal Conditions
  CONDITIONS: {
    MIN_QUANTITY: 'min_quantity',
    MAX_QUANTITY: 'max_quantity',
    MIN_ORDER_VALUE: 'min_order_value',
    MAX_ORDER_VALUE: 'max_order_value',
    PER_USER_LIMIT: 'per_user_limit',
    PER_ORDER_LIMIT: 'per_order_limit',
    FIRST_TIME_BUYER: 'first_time_buyer',
    VIP_ONLY: 'vip_only',
    MEMBERS_ONLY: 'members_only',
  },

  // Product Deal Defaults
  DEFAULTS: {
    MAX_DISCOUNT_PERCENTAGE: 70,
    MAX_FIXED_AMOUNT: 50000,
    MIN_QUANTITY: 1,
    MAX_QUANTITY_PER_USER: 10,
    DURATION_HOURS: 24,
  },

  // Product Deal Limits
  LIMITS: {
    MAX_PRODUCTS: 100,
    MAX_VARIANTS: 50,
    MAX_CATEGORIES: 20,
    MAX_BRANDS: 10,
    MAX_COLLECTIONS: 10,
  },
} as const;

// Product Deal Types
export type ProductDealType = (typeof PRODUCT_DEAL.TYPES)[keyof typeof PRODUCT_DEAL.TYPES];

// Product Deal Categories
export type ProductDealCategory =
  (typeof PRODUCT_DEAL.CATEGORIES)[keyof typeof PRODUCT_DEAL.CATEGORIES];

// Product Deal Scope
export type ProductDealScope = (typeof PRODUCT_DEAL.SCOPE)[keyof typeof PRODUCT_DEAL.SCOPE];

// Product Deal Application
export type ProductDealApplication =
  (typeof PRODUCT_DEAL.APPLICATION)[keyof typeof PRODUCT_DEAL.APPLICATION];

// Product Deal Conditions
export type ProductDealCondition =
  (typeof PRODUCT_DEAL.CONDITIONS)[keyof typeof PRODUCT_DEAL.CONDITIONS];

// Utility Functions
export function flashsalesProductDealGetTypeLabel(type: ProductDealType): string {
  const labels: Record<ProductDealType, string> = {
    [PRODUCT_DEAL.TYPES.SINGLE]: 'Single Product Deal',
    [PRODUCT_DEAL.TYPES.MULTIPLE]: 'Multiple Products Deal',
    [PRODUCT_DEAL.TYPES.BUNDLE]: 'Bundle Deal',
    [PRODUCT_DEAL.TYPES.VARIANT]: 'Variant Deal',
    [PRODUCT_DEAL.TYPES.CATEGORY]: 'Category Deal',
    [PRODUCT_DEAL.TYPES.BRAND]: 'Brand Deal',
    [PRODUCT_DEAL.TYPES.COLLECTION]: 'Collection Deal',
    [PRODUCT_DEAL.TYPES.CUSTOM]: 'Custom Deal',
  };
  return labels[type] || 'Unknown Type';
}

export function flashsalesProductDealGetCategoryLabel(category: ProductDealCategory): string {
  const labels: Record<ProductDealCategory, string> = {
    [PRODUCT_DEAL.CATEGORIES.DISCOUNT]: 'Discount Deal',
    [PRODUCT_DEAL.CATEGORIES.PROMOTIONAL]: 'Promotional Deal',
    [PRODUCT_DEAL.CATEGORIES.CLEARANCE]: 'Clearance Deal',
    [PRODUCT_DEAL.CATEGORIES.SEASONAL]: 'Seasonal Deal',
    [PRODUCT_DEAL.CATEGORIES.FLASH]: 'Flash Deal',
    [PRODUCT_DEAL.CATEGORIES.LIMITED]: 'Limited Edition Deal',
    [PRODUCT_DEAL.CATEGORIES.EXCLUSIVE]: 'Exclusive Deal',
  };
  return labels[category] || 'Unknown Category';
}

export function flashsalesProductDealGetScopeLabel(scope: ProductDealScope): string {
  const labels: Record<ProductDealScope, string> = {
    [PRODUCT_DEAL.SCOPE.ALL_PRODUCTS]: 'All Products',
    [PRODUCT_DEAL.SCOPE.SELECTED_PRODUCTS]: 'Selected Products',
    [PRODUCT_DEAL.SCOPE.CATEGORY]: 'Category Based',
    [PRODUCT_DEAL.SCOPE.BRAND]: 'Brand Based',
    [PRODUCT_DEAL.SCOPE.COLLECTION]: 'Collection Based',
    [PRODUCT_DEAL.SCOPE.VARIANT]: 'Variant Based',
    [PRODUCT_DEAL.SCOPE.CUSTOM]: 'Custom Scope',
  };
  return labels[scope] || 'Unknown Scope';
}

export function flashsalesProductDealGetApplicationLabel(
  application: ProductDealApplication
): string {
  const labels: Record<ProductDealApplication, string> = {
    [PRODUCT_DEAL.APPLICATION.PERCENTAGE]: 'Percentage Discount',
    [PRODUCT_DEAL.APPLICATION.FIXED]: 'Fixed Amount Discount',
    [PRODUCT_DEAL.APPLICATION.PER_UNIT]: 'Per Unit Discount',
    [PRODUCT_DEAL.APPLICATION.PER_ORDER]: 'Per Order Discount',
    [PRODUCT_DEAL.APPLICATION.TIERED]: 'Tiered Discount',
    [PRODUCT_DEAL.APPLICATION.BOGO]: 'Buy One Get One',
    [PRODUCT_DEAL.APPLICATION.FREE_ITEM]: 'Free Item',
  };
  return labels[application] || 'Unknown Application';
}

export function flashsalesProductDealGetConditionLabel(condition: ProductDealCondition): string {
  const labels: Record<ProductDealCondition, string> = {
    [PRODUCT_DEAL.CONDITIONS.MIN_QUANTITY]: 'Minimum Quantity',
    [PRODUCT_DEAL.CONDITIONS.MAX_QUANTITY]: 'Maximum Quantity',
    [PRODUCT_DEAL.CONDITIONS.MIN_ORDER_VALUE]: 'Minimum Order Value',
    [PRODUCT_DEAL.CONDITIONS.MAX_ORDER_VALUE]: 'Maximum Order Value',
    [PRODUCT_DEAL.CONDITIONS.PER_USER_LIMIT]: 'Per User Limit',
    [PRODUCT_DEAL.CONDITIONS.PER_ORDER_LIMIT]: 'Per Order Limit',
    [PRODUCT_DEAL.CONDITIONS.FIRST_TIME_BUYER]: 'First Time Buyer Only',
    [PRODUCT_DEAL.CONDITIONS.VIP_ONLY]: 'VIP Only',
    [PRODUCT_DEAL.CONDITIONS.MEMBERS_ONLY]: 'Members Only',
  };
  return labels[condition] || 'Unknown Condition';
}

export function flashsalesProductDealIsValidType(type: string): type is ProductDealType {
  return Object.values(PRODUCT_DEAL.TYPES).includes(type as ProductDealType);
}

export function flashsalesProductDealIsValidScope(scope: string): scope is ProductDealScope {
  return Object.values(PRODUCT_DEAL.SCOPE).includes(scope as ProductDealScope);
}

export function flashsalesProductDealGetDefaultMaxDiscount(): number {
  return PRODUCT_DEAL.DEFAULTS.MAX_DISCOUNT_PERCENTAGE;
}

export function flashsalesProductDealGetDefaultMaxFixedAmount(): number {
  return PRODUCT_DEAL.DEFAULTS.MAX_FIXED_AMOUNT;
}

export function flashsalesProductDealGetMaxProducts(): number {
  return PRODUCT_DEAL.LIMITS.MAX_PRODUCTS;
}

export function flashsalesProductDealGetMaxVariants(): number {
  return PRODUCT_DEAL.LIMITS.MAX_VARIANTS;
}
