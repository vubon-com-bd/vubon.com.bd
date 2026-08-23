/**
 * Promotion Discount Type Constants
 * Discount type configurations for promotions
 */

export const MARKETINGPROMOTION_DISCOUNT = {
  // Discount Types
  TYPES: {
    PERCENTAGE: 'percentage',
    FIXED_AMOUNT: 'fixed_amount',
    BUY_X_GET_Y: 'buy_x_get_y',
    TIERED: 'tiered',
    VOLUME: 'volume',
    BUNDLE: 'bundle',
    DYNAMIC: 'dynamic',
    FREE_SHIPPING: 'free_shipping',
    FREE_GIFT: 'free_gift',
    UPGRADE: 'upgrade',
    COMPLIMENTARY: 'complimentary',
    EXCHANGE: 'exchange',
  } as const,

  // Discount Calculations
  CALCULATIONS: {
    PERCENTAGE_OFF: 'percentage_off',
    AMOUNT_OFF: 'amount_off',
    FIXED_PRICE: 'fixed_price',
    BUY_ONE_GET_ONE: 'buy_one_get_one',
    BUY_TWO_GET_ONE: 'buy_two_get_one',
    BUY_X_GET_Y: 'buy_x_get_y',
    PERCENTAGE_DISCOUNT: 'percentage_discount',
    AMOUNT_DISCOUNT: 'amount_discount',
    DYNAMIC_PRICING: 'dynamic_pricing',
    BUNDLE_PRICING: 'bundle_pricing',
  } as const,

  // Discount Levels
  LEVELS: {
    BASIC: 'basic',
    STANDARD: 'standard',
    PREMIUM: 'premium',
    ENTERPRISE: 'enterprise',
    WHOLESALE: 'wholesale',
    RETAIL: 'retail',
  } as const,

  // Discount Eligibility
  ELIGIBILITY: {
    ALL_CUSTOMERS: 'all_customers',
    NEW_CUSTOMERS: 'new_customers',
    RETURNING_CUSTOMERS: 'returning_customers',
    LOYALTY_MEMBERS: 'loyalty_members',
    VIP_MEMBERS: 'vip_members',
    WHOLESALE: 'wholesale',
    CORPORATE: 'corporate',
    STUDENT: 'student',
    SENIOR: 'senior',
    MILITARY: 'military',
  } as const,

  // Discount Validity
  VALIDITY: {
    ONE_TIME: 'one_time',
    MULTIPLE: 'multiple',
    UNLIMITED: 'unlimited',
    TIME_BOUND: 'time_bound',
    QUANTITY_BOUND: 'quantity_bound',
  } as const,

  // Discount Combinations
  COMBINATIONS: {
    ALLOWED: 'allowed',
    NOT_ALLOWED: 'not_allowed',
    LIMITED: 'limited',
    STACKABLE: 'stackable',
    NON_STACKABLE: 'non_stackable',
  } as const,

  // Default Discount Values
  DEFAULTS: {
    DEFAULT_PERCENTAGE: 10,
    MAX_PERCENTAGE: 100,
    DEFAULT_FIXED_AMOUNT: 100,
    MAX_FIXED_AMOUNT: 100000,
    MIN_ORDER_AMOUNT: 0,
    MAX_DISCOUNT_AMOUNT: 0,
    DEFAULT_QUANTITY: 1,
    MAX_QUANTITY: 100,
    DEFAULT_TIER: 1,
    MAX_TIER: 10,
  } as const,
} as const;

// Discount Types
export type MarketingPromotionDiscountTypeType =
  (typeof MARKETINGPROMOTION_DISCOUNT.TYPES)[keyof typeof MARKETINGPROMOTION_DISCOUNT.TYPES];

// Discount Calculations
export type MarketingPromotionDiscountCalculation =
  (typeof MARKETINGPROMOTION_DISCOUNT.CALCULATIONS)[keyof typeof MARKETINGPROMOTION_DISCOUNT.CALCULATIONS];

// Discount Levels
export type MarketingPromotionDiscountLevel =
  (typeof MARKETINGPROMOTION_DISCOUNT.LEVELS)[keyof typeof MARKETINGPROMOTION_DISCOUNT.LEVELS];

// Discount Eligibility
export type MarketingPromotionDiscountEligibility =
  (typeof MARKETINGPROMOTION_DISCOUNT.ELIGIBILITY)[keyof typeof MARKETINGPROMOTION_DISCOUNT.ELIGIBILITY];

// Discount Validity
export type MarketingPromotionDiscountValidity =
  (typeof MARKETINGPROMOTION_DISCOUNT.VALIDITY)[keyof typeof MARKETINGPROMOTION_DISCOUNT.VALIDITY];

// Discount Combinations
export type MarketingPromotionDiscountCombination =
  (typeof MARKETINGPROMOTION_DISCOUNT.COMBINATIONS)[keyof typeof MARKETINGPROMOTION_DISCOUNT.COMBINATIONS];

// Default Values
export type MarketingPromotionDiscountDefault =
  (typeof MARKETINGPROMOTION_DISCOUNT.DEFAULTS)[keyof typeof MARKETINGPROMOTION_DISCOUNT.DEFAULTS];

// Utility Functions
export function marketingpromotionGetDiscountTypeLabel(
  discountType: MarketingPromotionDiscountTypeType
): string {
  const labels: Record<MarketingPromotionDiscountTypeType, string> = {
    [MARKETINGPROMOTION_DISCOUNT.TYPES.PERCENTAGE]: 'Percentage Discount',
    [MARKETINGPROMOTION_DISCOUNT.TYPES.FIXED_AMOUNT]: 'Fixed Amount Discount',
    [MARKETINGPROMOTION_DISCOUNT.TYPES.BUY_X_GET_Y]: 'Buy X Get Y',
    [MARKETINGPROMOTION_DISCOUNT.TYPES.TIERED]: 'Tiered Discount',
    [MARKETINGPROMOTION_DISCOUNT.TYPES.VOLUME]: 'Volume Discount',
    [MARKETINGPROMOTION_DISCOUNT.TYPES.BUNDLE]: 'Bundle Discount',
    [MARKETINGPROMOTION_DISCOUNT.TYPES.DYNAMIC]: 'Dynamic Discount',
    [MARKETINGPROMOTION_DISCOUNT.TYPES.FREE_SHIPPING]: 'Free Shipping',
    [MARKETINGPROMOTION_DISCOUNT.TYPES.FREE_GIFT]: 'Free Gift',
    [MARKETINGPROMOTION_DISCOUNT.TYPES.UPGRADE]: 'Upgrade Discount',
    [MARKETINGPROMOTION_DISCOUNT.TYPES.COMPLIMENTARY]: 'Complimentary',
    [MARKETINGPROMOTION_DISCOUNT.TYPES.EXCHANGE]: 'Exchange Discount',
  };
  return labels[discountType] || 'Unknown Discount Type';
}

export function marketingpromotionGetDiscountCalculationLabel(
  calculation: MarketingPromotionDiscountCalculation
): string {
  const labels: Record<MarketingPromotionDiscountCalculation, string> = {
    [MARKETINGPROMOTION_DISCOUNT.CALCULATIONS.PERCENTAGE_OFF]: 'Percentage Off',
    [MARKETINGPROMOTION_DISCOUNT.CALCULATIONS.AMOUNT_OFF]: 'Amount Off',
    [MARKETINGPROMOTION_DISCOUNT.CALCULATIONS.FIXED_PRICE]: 'Fixed Price',
    [MARKETINGPROMOTION_DISCOUNT.CALCULATIONS.BUY_ONE_GET_ONE]: 'Buy One Get One',
    [MARKETINGPROMOTION_DISCOUNT.CALCULATIONS.BUY_TWO_GET_ONE]: 'Buy Two Get One',
    [MARKETINGPROMOTION_DISCOUNT.CALCULATIONS.BUY_X_GET_Y]: 'Buy X Get Y',
    [MARKETINGPROMOTION_DISCOUNT.CALCULATIONS.PERCENTAGE_DISCOUNT]: 'Percentage Discount',
    [MARKETINGPROMOTION_DISCOUNT.CALCULATIONS.AMOUNT_DISCOUNT]: 'Amount Discount',
    [MARKETINGPROMOTION_DISCOUNT.CALCULATIONS.DYNAMIC_PRICING]: 'Dynamic Pricing',
    [MARKETINGPROMOTION_DISCOUNT.CALCULATIONS.BUNDLE_PRICING]: 'Bundle Pricing',
  };
  return labels[calculation] || 'Unknown Calculation';
}

export function marketingpromotionGetDiscountLevelLabel(
  level: MarketingPromotionDiscountLevel
): string {
  const labels: Record<MarketingPromotionDiscountLevel, string> = {
    [MARKETINGPROMOTION_DISCOUNT.LEVELS.BASIC]: 'Basic',
    [MARKETINGPROMOTION_DISCOUNT.LEVELS.STANDARD]: 'Standard',
    [MARKETINGPROMOTION_DISCOUNT.LEVELS.PREMIUM]: 'Premium',
    [MARKETINGPROMOTION_DISCOUNT.LEVELS.ENTERPRISE]: 'Enterprise',
    [MARKETINGPROMOTION_DISCOUNT.LEVELS.WHOLESALE]: 'Wholesale',
    [MARKETINGPROMOTION_DISCOUNT.LEVELS.RETAIL]: 'Retail',
  };
  return labels[level] || 'Unknown Level';
}

export function marketingpromotionGetDiscountEligibilityLabel(
  eligibility: MarketingPromotionDiscountEligibility
): string {
  const labels: Record<MarketingPromotionDiscountEligibility, string> = {
    [MARKETINGPROMOTION_DISCOUNT.ELIGIBILITY.ALL_CUSTOMERS]: 'All Customers',
    [MARKETINGPROMOTION_DISCOUNT.ELIGIBILITY.NEW_CUSTOMERS]: 'New Customers',
    [MARKETINGPROMOTION_DISCOUNT.ELIGIBILITY.RETURNING_CUSTOMERS]: 'Returning Customers',
    [MARKETINGPROMOTION_DISCOUNT.ELIGIBILITY.LOYALTY_MEMBERS]: 'Loyalty Members',
    [MARKETINGPROMOTION_DISCOUNT.ELIGIBILITY.VIP_MEMBERS]: 'VIP Members',
    [MARKETINGPROMOTION_DISCOUNT.ELIGIBILITY.WHOLESALE]: 'Wholesale',
    [MARKETINGPROMOTION_DISCOUNT.ELIGIBILITY.CORPORATE]: 'Corporate',
    [MARKETINGPROMOTION_DISCOUNT.ELIGIBILITY.STUDENT]: 'Student',
    [MARKETINGPROMOTION_DISCOUNT.ELIGIBILITY.SENIOR]: 'Senior',
    [MARKETINGPROMOTION_DISCOUNT.ELIGIBILITY.MILITARY]: 'Military',
  };
  return labels[eligibility] || 'Unknown Eligibility';
}

export function marketingpromotionGetDiscountValidityLabel(
  validity: MarketingPromotionDiscountValidity
): string {
  const labels: Record<MarketingPromotionDiscountValidity, string> = {
    [MARKETINGPROMOTION_DISCOUNT.VALIDITY.ONE_TIME]: 'One Time',
    [MARKETINGPROMOTION_DISCOUNT.VALIDITY.MULTIPLE]: 'Multiple Uses',
    [MARKETINGPROMOTION_DISCOUNT.VALIDITY.UNLIMITED]: 'Unlimited',
    [MARKETINGPROMOTION_DISCOUNT.VALIDITY.TIME_BOUND]: 'Time Bound',
    [MARKETINGPROMOTION_DISCOUNT.VALIDITY.QUANTITY_BOUND]: 'Quantity Bound',
  };
  return labels[validity] || 'Unknown Validity';
}

export function marketingpromotionGetDiscountCombinationLabel(
  combination: MarketingPromotionDiscountCombination
): string {
  const labels: Record<MarketingPromotionDiscountCombination, string> = {
    [MARKETINGPROMOTION_DISCOUNT.COMBINATIONS.ALLOWED]: 'Allowed',
    [MARKETINGPROMOTION_DISCOUNT.COMBINATIONS.NOT_ALLOWED]: 'Not Allowed',
    [MARKETINGPROMOTION_DISCOUNT.COMBINATIONS.LIMITED]: 'Limited',
    [MARKETINGPROMOTION_DISCOUNT.COMBINATIONS.STACKABLE]: 'Stackable',
    [MARKETINGPROMOTION_DISCOUNT.COMBINATIONS.NON_STACKABLE]: 'Non-Stackable',
  };
  return labels[combination] || 'Unknown Combination';
}

export function marketingpromotionIsPercentageDiscount(
  discountType: MarketingPromotionDiscountTypeType
): boolean {
  return discountType === MARKETINGPROMOTION_DISCOUNT.TYPES.PERCENTAGE;
}

export function marketingpromotionIsFixedDiscount(
  discountType: MarketingPromotionDiscountTypeType
): boolean {
  return discountType === MARKETINGPROMOTION_DISCOUNT.TYPES.FIXED_AMOUNT;
}

export function marketingpromotionIsTieredDiscount(
  discountType: MarketingPromotionDiscountTypeType
): boolean {
  return discountType === MARKETINGPROMOTION_DISCOUNT.TYPES.TIERED;
}

export function marketingpromotionGetDefaultPercentage(): number {
  return MARKETINGPROMOTION_DISCOUNT.DEFAULTS.DEFAULT_PERCENTAGE;
}

export function marketingpromotionGetMaxPercentage(): number {
  return MARKETINGPROMOTION_DISCOUNT.DEFAULTS.MAX_PERCENTAGE;
}
