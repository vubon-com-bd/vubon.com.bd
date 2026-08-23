/**
 * Coupon Discount Type Constants
 * Discount type definitions for coupons
 */

export const COUPON_DISCOUNT = {
  // Discount Types
  TYPES: {
    PERCENTAGE: 'percentage',
    FIXED_AMOUNT: 'fixed_amount',
    BUY_X_GET_Y: 'buy_x_get_y',
    TIERED: 'tiered',
    VOLUME: 'volume',
    BUNDLE: 'bundle',
    DYNAMIC: 'dynamic',
    CUSTOM: 'custom',
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
    EMPLOYEE: 'employee',
    B2B: 'b2b',
    B2C: 'b2c',
  } as const,

  // Discount Validity
  VALIDITY: {
    ONE_TIME: 'one_time',
    MULTIPLE: 'multiple',
    UNLIMITED: 'unlimited',
    TIME_BOUND: 'time_bound',
    QUANTITY_BOUND: 'quantity_bound',
    USAGE_BOUND: 'usage_bound',
  } as const,

  // Discount Combinations
  COMBINATIONS: {
    ALLOWED: 'allowed',
    NOT_ALLOWED: 'not_allowed',
    LIMITED: 'limited',
    STACKABLE: 'stackable',
    NON_STACKABLE: 'non_stackable',
  } as const,

  // Discount Defaults
  DEFAULTS: {
    DEFAULT_TYPE: 'percentage',
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

  // Discount Limits
  LIMITS: {
    MIN_PERCENTAGE: 1,
    MAX_PERCENTAGE: 100,
    MIN_FIXED_AMOUNT: 1,
    MAX_FIXED_AMOUNT: 100000,
    MIN_TIER: 1,
    MAX_TIER: 10,
    MIN_QUANTITY: 1,
    MAX_QUANTITY: 999,
    MIN_USES: 1,
    MAX_USES: 10000,
  } as const,
} as const;

// Discount Types
export type CouponDiscountType = (typeof COUPON_DISCOUNT.TYPES)[keyof typeof COUPON_DISCOUNT.TYPES];

// Discount Calculations
export type CouponDiscountCalculation =
  (typeof COUPON_DISCOUNT.CALCULATIONS)[keyof typeof COUPON_DISCOUNT.CALCULATIONS];

// Discount Levels
export type CouponDiscountLevel =
  (typeof COUPON_DISCOUNT.LEVELS)[keyof typeof COUPON_DISCOUNT.LEVELS];

// Discount Eligibility
export type CouponDiscountEligibility =
  (typeof COUPON_DISCOUNT.ELIGIBILITY)[keyof typeof COUPON_DISCOUNT.ELIGIBILITY];

// Discount Validity
export type CouponDiscountValidity =
  (typeof COUPON_DISCOUNT.VALIDITY)[keyof typeof COUPON_DISCOUNT.VALIDITY];

// Discount Combinations
export type CouponDiscountCombination =
  (typeof COUPON_DISCOUNT.COMBINATIONS)[keyof typeof COUPON_DISCOUNT.COMBINATIONS];

// Discount Defaults
export type CouponDiscountDefault =
  (typeof COUPON_DISCOUNT.DEFAULTS)[keyof typeof COUPON_DISCOUNT.DEFAULTS];

// Discount Limits
export type CouponDiscountLimit =
  (typeof COUPON_DISCOUNT.LIMITS)[keyof typeof COUPON_DISCOUNT.LIMITS];

// Utility Functions
export function coupondiscountGetTypeLabel(discountType: CouponDiscountType): string {
  const labels: Record<CouponDiscountType, string> = {
    [COUPON_DISCOUNT.TYPES.PERCENTAGE]: 'Percentage',
    [COUPON_DISCOUNT.TYPES.FIXED_AMOUNT]: 'Fixed Amount',
    [COUPON_DISCOUNT.TYPES.BUY_X_GET_Y]: 'Buy X Get Y',
    [COUPON_DISCOUNT.TYPES.TIERED]: 'Tiered',
    [COUPON_DISCOUNT.TYPES.VOLUME]: 'Volume',
    [COUPON_DISCOUNT.TYPES.BUNDLE]: 'Bundle',
    [COUPON_DISCOUNT.TYPES.DYNAMIC]: 'Dynamic',
    [COUPON_DISCOUNT.TYPES.CUSTOM]: 'Custom',
  };
  return labels[discountType] || 'Unknown Discount Type';
}

export function coupondiscountGetCalculationLabel(calculation: CouponDiscountCalculation): string {
  const labels: Record<CouponDiscountCalculation, string> = {
    [COUPON_DISCOUNT.CALCULATIONS.PERCENTAGE_OFF]: 'Percentage Off',
    [COUPON_DISCOUNT.CALCULATIONS.AMOUNT_OFF]: 'Amount Off',
    [COUPON_DISCOUNT.CALCULATIONS.FIXED_PRICE]: 'Fixed Price',
    [COUPON_DISCOUNT.CALCULATIONS.BUY_ONE_GET_ONE]: 'Buy One Get One',
    [COUPON_DISCOUNT.CALCULATIONS.BUY_TWO_GET_ONE]: 'Buy Two Get One',
    [COUPON_DISCOUNT.CALCULATIONS.BUY_X_GET_Y]: 'Buy X Get Y',
    [COUPON_DISCOUNT.CALCULATIONS.PERCENTAGE_DISCOUNT]: 'Percentage Discount',
    [COUPON_DISCOUNT.CALCULATIONS.AMOUNT_DISCOUNT]: 'Amount Discount',
    [COUPON_DISCOUNT.CALCULATIONS.DYNAMIC_PRICING]: 'Dynamic Pricing',
    [COUPON_DISCOUNT.CALCULATIONS.BUNDLE_PRICING]: 'Bundle Pricing',
  };
  return labels[calculation] || 'Unknown Calculation';
}

export function coupondiscountGetLevelLabel(level: CouponDiscountLevel): string {
  const labels: Record<CouponDiscountLevel, string> = {
    [COUPON_DISCOUNT.LEVELS.BASIC]: 'Basic',
    [COUPON_DISCOUNT.LEVELS.STANDARD]: 'Standard',
    [COUPON_DISCOUNT.LEVELS.PREMIUM]: 'Premium',
    [COUPON_DISCOUNT.LEVELS.ENTERPRISE]: 'Enterprise',
    [COUPON_DISCOUNT.LEVELS.WHOLESALE]: 'Wholesale',
    [COUPON_DISCOUNT.LEVELS.RETAIL]: 'Retail',
  };
  return labels[level] || 'Unknown Level';
}

export function coupondiscountGetEligibilityLabel(eligibility: CouponDiscountEligibility): string {
  const labels: Record<CouponDiscountEligibility, string> = {
    [COUPON_DISCOUNT.ELIGIBILITY.ALL_CUSTOMERS]: 'All Customers',
    [COUPON_DISCOUNT.ELIGIBILITY.NEW_CUSTOMERS]: 'New Customers',
    [COUPON_DISCOUNT.ELIGIBILITY.RETURNING_CUSTOMERS]: 'Returning Customers',
    [COUPON_DISCOUNT.ELIGIBILITY.LOYALTY_MEMBERS]: 'Loyalty Members',
    [COUPON_DISCOUNT.ELIGIBILITY.VIP_MEMBERS]: 'VIP Members',
    [COUPON_DISCOUNT.ELIGIBILITY.WHOLESALE]: 'Wholesale',
    [COUPON_DISCOUNT.ELIGIBILITY.CORPORATE]: 'Corporate',
    [COUPON_DISCOUNT.ELIGIBILITY.STUDENT]: 'Student',
    [COUPON_DISCOUNT.ELIGIBILITY.SENIOR]: 'Senior',
    [COUPON_DISCOUNT.ELIGIBILITY.MILITARY]: 'Military',
    [COUPON_DISCOUNT.ELIGIBILITY.EMPLOYEE]: 'Employee',
    [COUPON_DISCOUNT.ELIGIBILITY.B2B]: 'B2B',
    [COUPON_DISCOUNT.ELIGIBILITY.B2C]: 'B2C',
  };
  return labels[eligibility] || 'Unknown Eligibility';
}

export function coupondiscountGetValidityLabel(validity: CouponDiscountValidity): string {
  const labels: Record<CouponDiscountValidity, string> = {
    [COUPON_DISCOUNT.VALIDITY.ONE_TIME]: 'One Time',
    [COUPON_DISCOUNT.VALIDITY.MULTIPLE]: 'Multiple Uses',
    [COUPON_DISCOUNT.VALIDITY.UNLIMITED]: 'Unlimited',
    [COUPON_DISCOUNT.VALIDITY.TIME_BOUND]: 'Time Bound',
    [COUPON_DISCOUNT.VALIDITY.QUANTITY_BOUND]: 'Quantity Bound',
    [COUPON_DISCOUNT.VALIDITY.USAGE_BOUND]: 'Usage Bound',
  };
  return labels[validity] || 'Unknown Validity';
}

export function coupondiscountGetCombinationLabel(combination: CouponDiscountCombination): string {
  const labels: Record<CouponDiscountCombination, string> = {
    [COUPON_DISCOUNT.COMBINATIONS.ALLOWED]: 'Allowed',
    [COUPON_DISCOUNT.COMBINATIONS.NOT_ALLOWED]: 'Not Allowed',
    [COUPON_DISCOUNT.COMBINATIONS.LIMITED]: 'Limited',
    [COUPON_DISCOUNT.COMBINATIONS.STACKABLE]: 'Stackable',
    [COUPON_DISCOUNT.COMBINATIONS.NON_STACKABLE]: 'Non-Stackable',
  };
  return labels[combination] || 'Unknown Combination';
}

export function coupondiscountIsPercentage(discountType: CouponDiscountType): boolean {
  return discountType === COUPON_DISCOUNT.TYPES.PERCENTAGE;
}

export function coupondiscountIsFixed(discountType: CouponDiscountType): boolean {
  return discountType === COUPON_DISCOUNT.TYPES.FIXED_AMOUNT;
}

export function coupondiscountIsTiered(discountType: CouponDiscountType): boolean {
  return discountType === COUPON_DISCOUNT.TYPES.TIERED;
}

export function coupondiscountIsVolume(discountType: CouponDiscountType): boolean {
  return discountType === COUPON_DISCOUNT.TYPES.VOLUME;
}

export function coupondiscountIsBundle(discountType: CouponDiscountType): boolean {
  return discountType === COUPON_DISCOUNT.TYPES.BUNDLE;
}

export function coupondiscountGetDefaultPercentage(): number {
  return COUPON_DISCOUNT.DEFAULTS.DEFAULT_PERCENTAGE;
}

export function coupondiscountGetMaxPercentage(): number {
  return COUPON_DISCOUNT.DEFAULTS.MAX_PERCENTAGE;
}

export function coupondiscountGetDefaultFixedAmount(): number {
  return COUPON_DISCOUNT.DEFAULTS.DEFAULT_FIXED_AMOUNT;
}
