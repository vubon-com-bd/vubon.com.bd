/**
 * Bundle Deal Constants
 * Configuration for bundle deals and package offers
 */

export const BUNDLE_DEAL = {
  // Bundle Types
  TYPES: {
    FIXED: 'fixed',
    CUSTOM: 'custom',
    MIX_AND_MATCH: 'mix_and_match',
    BUY_X_GET_Y: 'buy_x_get_y',
    TIERED: 'tiered',
    CURATED: 'curated',
    SEASONAL: 'seasonal',
    LIMITED: 'limited',
  },

  // Bundle Categories
  CATEGORIES: {
    PRODUCT: 'product',
    SERVICE: 'service',
    HYBRID: 'hybrid',
    SUBSCRIPTION: 'subscription',
    GIFT: 'gift',
    PROMOTIONAL: 'promotional',
    CLEARANCE: 'clearance',
  },

  // Bundle Composition
  COMPOSITION: {
    FIXED_ITEMS: 'fixed_items',
    VARIABLE_ITEMS: 'variable_items',
    REQUIRED_ITEMS: 'required_items',
    OPTIONAL_ITEMS: 'optional_items',
    MINIMUM_ITEMS: 'minimum_items',
    MAXIMUM_ITEMS: 'maximum_items',
    EXACT_ITEMS: 'exact_items',
  },

  // Bundle Pricing
  PRICING: {
    FIXED_PRICE: 'fixed_price',
    PERCENTAGE_DISCOUNT: 'percentage_discount',
    TIERED_DISCOUNT: 'tiered_discount',
    DYNAMIC: 'dynamic',
    BOGO: 'bogo',
    BUY_X_GET_Y: 'buy_x_get_y',
  },

  // Bundle Rules
  RULES: {
    MIN_ITEMS: 'min_items',
    MAX_ITEMS: 'max_items',
    MIN_QUANTITY_PER_ITEM: 'min_quantity_per_item',
    MAX_QUANTITY_PER_ITEM: 'max_quantity_per_item',
    MIN_TOTAL_VALUE: 'min_total_value',
    MAX_TOTAL_VALUE: 'max_total_value',
    PER_USER_LIMIT: 'per_user_limit',
    PER_ORDER_LIMIT: 'per_order_limit',
  },

  // Bundle Defaults
  DEFAULTS: {
    MAX_ITEMS: 10,
    MIN_ITEMS: 2,
    DISCOUNT_PERCENTAGE: 15,
    MAX_DISCOUNT_PERCENTAGE: 60,
    MAX_FIXED_AMOUNT: 100000,
    DURATION_HOURS: 48,
  },

  // Bundle Limits
  LIMITS: {
    MAX_ITEMS: 20,
    MAX_VARIANTS: 10,
    MAX_CATEGORIES: 5,
    MAX_BUNDLES_PER_PRODUCT: 5,
    MAX_USER_BUNDLES: 3,
  },
} as const;

// Bundle Types
export type BundleDealType = (typeof BUNDLE_DEAL.TYPES)[keyof typeof BUNDLE_DEAL.TYPES];

// Bundle Categories
export type BundleDealCategory =
  (typeof BUNDLE_DEAL.CATEGORIES)[keyof typeof BUNDLE_DEAL.CATEGORIES];

// Bundle Composition
export type BundleDealComposition =
  (typeof BUNDLE_DEAL.COMPOSITION)[keyof typeof BUNDLE_DEAL.COMPOSITION];

// Bundle Pricing
export type BundleDealPricing = (typeof BUNDLE_DEAL.PRICING)[keyof typeof BUNDLE_DEAL.PRICING];

// Bundle Rules
export type BundleDealRule = (typeof BUNDLE_DEAL.RULES)[keyof typeof BUNDLE_DEAL.RULES];

// Utility Functions
export function flashsalesBundleDealGetTypeLabel(type: BundleDealType): string {
  const labels: Record<BundleDealType, string> = {
    [BUNDLE_DEAL.TYPES.FIXED]: 'Fixed Bundle',
    [BUNDLE_DEAL.TYPES.CUSTOM]: 'Custom Bundle',
    [BUNDLE_DEAL.TYPES.MIX_AND_MATCH]: 'Mix & Match Bundle',
    [BUNDLE_DEAL.TYPES.BUY_X_GET_Y]: 'Buy X Get Y Bundle',
    [BUNDLE_DEAL.TYPES.TIERED]: 'Tiered Bundle',
    [BUNDLE_DEAL.TYPES.CURATED]: 'Curated Bundle',
    [BUNDLE_DEAL.TYPES.SEASONAL]: 'Seasonal Bundle',
    [BUNDLE_DEAL.TYPES.LIMITED]: 'Limited Edition Bundle',
  };
  return labels[type] || 'Unknown Bundle Type';
}

export function flashsalesBundleDealGetCategoryLabel(category: BundleDealCategory): string {
  const labels: Record<BundleDealCategory, string> = {
    [BUNDLE_DEAL.CATEGORIES.PRODUCT]: 'Product Bundle',
    [BUNDLE_DEAL.CATEGORIES.SERVICE]: 'Service Bundle',
    [BUNDLE_DEAL.CATEGORIES.HYBRID]: 'Hybrid Bundle',
    [BUNDLE_DEAL.CATEGORIES.SUBSCRIPTION]: 'Subscription Bundle',
    [BUNDLE_DEAL.CATEGORIES.GIFT]: 'Gift Bundle',
    [BUNDLE_DEAL.CATEGORIES.PROMOTIONAL]: 'Promotional Bundle',
    [BUNDLE_DEAL.CATEGORIES.CLEARANCE]: 'Clearance Bundle',
  };
  return labels[category] || 'Unknown Category';
}

export function flashsalesBundleDealGetCompositionLabel(
  composition: BundleDealComposition
): string {
  const labels: Record<BundleDealComposition, string> = {
    [BUNDLE_DEAL.COMPOSITION.FIXED_ITEMS]: 'Fixed Items',
    [BUNDLE_DEAL.COMPOSITION.VARIABLE_ITEMS]: 'Variable Items',
    [BUNDLE_DEAL.COMPOSITION.REQUIRED_ITEMS]: 'Required Items',
    [BUNDLE_DEAL.COMPOSITION.OPTIONAL_ITEMS]: 'Optional Items',
    [BUNDLE_DEAL.COMPOSITION.MINIMUM_ITEMS]: 'Minimum Items',
    [BUNDLE_DEAL.COMPOSITION.MAXIMUM_ITEMS]: 'Maximum Items',
    [BUNDLE_DEAL.COMPOSITION.EXACT_ITEMS]: 'Exact Items',
  };
  return labels[composition] || 'Unknown Composition';
}

export function flashsalesBundleDealGetPricingLabel(pricing: BundleDealPricing): string {
  const labels: Record<BundleDealPricing, string> = {
    [BUNDLE_DEAL.PRICING.FIXED_PRICE]: 'Fixed Price',
    [BUNDLE_DEAL.PRICING.PERCENTAGE_DISCOUNT]: 'Percentage Discount',
    [BUNDLE_DEAL.PRICING.TIERED_DISCOUNT]: 'Tiered Discount',
    [BUNDLE_DEAL.PRICING.DYNAMIC]: 'Dynamic Pricing',
    [BUNDLE_DEAL.PRICING.BOGO]: 'Buy One Get One',
    [BUNDLE_DEAL.PRICING.BUY_X_GET_Y]: 'Buy X Get Y',
  };
  return labels[pricing] || 'Unknown Pricing';
}

export function flashsalesBundleDealGetRuleLabel(rule: BundleDealRule): string {
  const labels: Record<BundleDealRule, string> = {
    [BUNDLE_DEAL.RULES.MIN_ITEMS]: 'Minimum Items',
    [BUNDLE_DEAL.RULES.MAX_ITEMS]: 'Maximum Items',
    [BUNDLE_DEAL.RULES.MIN_QUANTITY_PER_ITEM]: 'Min Quantity Per Item',
    [BUNDLE_DEAL.RULES.MAX_QUANTITY_PER_ITEM]: 'Max Quantity Per Item',
    [BUNDLE_DEAL.RULES.MIN_TOTAL_VALUE]: 'Minimum Total Value',
    [BUNDLE_DEAL.RULES.MAX_TOTAL_VALUE]: 'Maximum Total Value',
    [BUNDLE_DEAL.RULES.PER_USER_LIMIT]: 'Per User Limit',
    [BUNDLE_DEAL.RULES.PER_ORDER_LIMIT]: 'Per Order Limit',
  };
  return labels[rule] || 'Unknown Rule';
}

export function flashsalesBundleDealIsValidType(type: string): type is BundleDealType {
  return Object.values(BUNDLE_DEAL.TYPES).includes(type as BundleDealType);
}

export function flashsalesBundleDealIsValidCategory(
  category: string
): category is BundleDealCategory {
  return Object.values(BUNDLE_DEAL.CATEGORIES).includes(category as BundleDealCategory);
}

export function flashsalesBundleDealGetDefaultMaxItems(): number {
  return BUNDLE_DEAL.DEFAULTS.MAX_ITEMS;
}

export function flashsalesBundleDealGetDefaultMinItems(): number {
  return BUNDLE_DEAL.DEFAULTS.MIN_ITEMS;
}

export function flashsalesBundleDealGetDefaultDiscount(): number {
  return BUNDLE_DEAL.DEFAULTS.DISCOUNT_PERCENTAGE;
}

export function flashsalesBundleDealGetMaxDiscount(): number {
  return BUNDLE_DEAL.DEFAULTS.MAX_DISCOUNT_PERCENTAGE;
}

export function flashsalesBundleDealGetMaxItemsLimit(): number {
  return BUNDLE_DEAL.LIMITS.MAX_ITEMS;
}
