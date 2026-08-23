/**
 * Deal Discount Type Constants
 * Types of discounts and calculations
 */

export const DEAL_DISCOUNT_TYPE = {
  // Discount Types
  TYPES: {
    PERCENTAGE: 'percentage',
    FIXED: 'fixed',
    TIERED: 'tiered',
    BOGO: 'bogo',
    BUNDLE: 'bundle',
    VOLUME: 'volume',
    DYNAMIC: 'dynamic',
    CUSTOM: 'custom',
  },

  // Calculation Methods
  CALCULATIONS: {
    PERCENTAGE: 'percentage',
    FIXED_AMOUNT: 'fixed_amount',
    PER_UNIT: 'per_unit',
    PER_ORDER: 'per_order',
    PER_USER: 'per_user',
    CUSTOM: 'custom',
  },

  // Application Types
  APPLICATIONS: {
    PRODUCT: 'product',
    CATEGORY: 'category',
    CART: 'cart',
    ORDER: 'order',
    SHIPPING: 'shipping',
    TAX: 'tax',
  },

  // Tier Types
  TIER_TYPES: {
    QUANTITY: 'quantity',
    AMOUNT: 'amount',
    VOLUME: 'volume',
    USER: 'user',
    TIME: 'time',
  },
} as const;

// Discount Types
export type DealDiscountTypeType =
  (typeof DEAL_DISCOUNT_TYPE.TYPES)[keyof typeof DEAL_DISCOUNT_TYPE.TYPES];

// Calculation Methods
export type DealDiscountCalculation =
  (typeof DEAL_DISCOUNT_TYPE.CALCULATIONS)[keyof typeof DEAL_DISCOUNT_TYPE.CALCULATIONS];

// Application Types
export type DealDiscountApplication =
  (typeof DEAL_DISCOUNT_TYPE.APPLICATIONS)[keyof typeof DEAL_DISCOUNT_TYPE.APPLICATIONS];

// Tier Types
export type DealDiscountTierType =
  (typeof DEAL_DISCOUNT_TYPE.TIER_TYPES)[keyof typeof DEAL_DISCOUNT_TYPE.TIER_TYPES];

// Utility Functions
export function flashsalesDealDiscountTypeGetTypeLabel(type: DealDiscountTypeType): string {
  const labels: Record<DealDiscountTypeType, string> = {
    [DEAL_DISCOUNT_TYPE.TYPES.PERCENTAGE]: 'Percentage Discount',
    [DEAL_DISCOUNT_TYPE.TYPES.FIXED]: 'Fixed Amount Discount',
    [DEAL_DISCOUNT_TYPE.TYPES.TIERED]: 'Tiered Discount',
    [DEAL_DISCOUNT_TYPE.TYPES.BOGO]: 'Buy One Get One',
    [DEAL_DISCOUNT_TYPE.TYPES.BUNDLE]: 'Bundle Discount',
    [DEAL_DISCOUNT_TYPE.TYPES.VOLUME]: 'Volume Discount',
    [DEAL_DISCOUNT_TYPE.TYPES.DYNAMIC]: 'Dynamic Discount',
    [DEAL_DISCOUNT_TYPE.TYPES.CUSTOM]: 'Custom Discount',
  };
  return labels[type] || 'Unknown Discount Type';
}

export function flashsalesDealDiscountTypeGetCalculationLabel(
  calculation: DealDiscountCalculation
): string {
  const labels: Record<DealDiscountCalculation, string> = {
    [DEAL_DISCOUNT_TYPE.CALCULATIONS.PERCENTAGE]: 'Percentage',
    [DEAL_DISCOUNT_TYPE.CALCULATIONS.FIXED_AMOUNT]: 'Fixed Amount',
    [DEAL_DISCOUNT_TYPE.CALCULATIONS.PER_UNIT]: 'Per Unit',
    [DEAL_DISCOUNT_TYPE.CALCULATIONS.PER_ORDER]: 'Per Order',
    [DEAL_DISCOUNT_TYPE.CALCULATIONS.PER_USER]: 'Per User',
    [DEAL_DISCOUNT_TYPE.CALCULATIONS.CUSTOM]: 'Custom Calculation',
  };
  return labels[calculation] || 'Unknown Calculation';
}

export function flashsalesDealDiscountTypeGetApplicationLabel(
  application: DealDiscountApplication
): string {
  const labels: Record<DealDiscountApplication, string> = {
    [DEAL_DISCOUNT_TYPE.APPLICATIONS.PRODUCT]: 'Product Level',
    [DEAL_DISCOUNT_TYPE.APPLICATIONS.CATEGORY]: 'Category Level',
    [DEAL_DISCOUNT_TYPE.APPLICATIONS.CART]: 'Cart Level',
    [DEAL_DISCOUNT_TYPE.APPLICATIONS.ORDER]: 'Order Level',
    [DEAL_DISCOUNT_TYPE.APPLICATIONS.SHIPPING]: 'Shipping Level',
    [DEAL_DISCOUNT_TYPE.APPLICATIONS.TAX]: 'Tax Level',
  };
  return labels[application] || 'Unknown Application';
}

export function flashsalesDealDiscountTypeGetTierTypeLabel(tierType: DealDiscountTierType): string {
  const labels: Record<DealDiscountTierType, string> = {
    [DEAL_DISCOUNT_TYPE.TIER_TYPES.QUANTITY]: 'Quantity Based',
    [DEAL_DISCOUNT_TYPE.TIER_TYPES.AMOUNT]: 'Amount Based',
    [DEAL_DISCOUNT_TYPE.TIER_TYPES.VOLUME]: 'Volume Based',
    [DEAL_DISCOUNT_TYPE.TIER_TYPES.USER]: 'User Based',
    [DEAL_DISCOUNT_TYPE.TIER_TYPES.TIME]: 'Time Based',
  };
  return labels[tierType] || 'Unknown Tier Type';
}

export function flashsalesDealDiscountTypeIsValidType(type: string): type is DealDiscountTypeType {
  return Object.values(DEAL_DISCOUNT_TYPE.TYPES).includes(type as DealDiscountTypeType);
}

export function flashsalesDealDiscountTypeIsValidApplication(
  application: string
): application is DealDiscountApplication {
  return Object.values(DEAL_DISCOUNT_TYPE.APPLICATIONS).includes(
    application as DealDiscountApplication
  );
}
