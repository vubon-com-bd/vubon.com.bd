/**
 * Checkout Constants
 * Core checkout configuration and settings
 */

export const CHECKOUT = {
  // Checkout Types
  TYPES: {
    GUEST: 'guest',
    REGISTERED: 'registered',
    EXPRESS: 'express',
    ONE_CLICK: 'one_click',
    SOCIAL: 'social',
    CUSTOM: 'custom',
  } as const,

  // Checkout Modes
  MODES: {
    SINGLE: 'single',
    MULTI_STEP: 'multi_step',
    ACCORDION: 'accordion',
    TABBED: 'tabbed',
    CUSTOM: 'custom',
  } as const,

  // Checkout Steps
  STEPS: {
    CART: 'cart',
    INFORMATION: 'information',
    SHIPPING: 'shipping',
    PAYMENT: 'payment',
    REVIEW: 'review',
    CONFIRMATION: 'confirmation',
    COMPLETE: 'complete',
  } as const,

  // Checkout Defaults
  DEFAULTS: {
    DEFAULT_TYPE: 'registered',
    DEFAULT_MODE: 'multi_step',
    DEFAULT_STEP: 'information',
    DEFAULT_CURRENCY: 'BDT',
    DEFAULT_LOCALE: 'bn',
    DEFAULT_TIMEZONE: 'Asia/Dhaka',
    SESSION_TIMEOUT_MINUTES: 30,
    MAX_ITEMS_PER_ORDER: 100,
    MIN_ORDER_AMOUNT: 0,
    MAX_ORDER_AMOUNT: 1000000,
    DEFAULT_TAX_RATE: 0,
    DEFAULT_SHIPPING_COST: 0,
    DEFAULT_DISCOUNT: 0,
    ALLOW_GUEST_CHECKOUT: true,
    REQUIRE_ACCOUNT: false,
    REQUIRE_EMAIL_VERIFICATION: false,
    REQUIRE_PHONE_VERIFICATION: false,
    SAVE_PAYMENT_METHOD: false,
    ALLOW_COUPON: true,
    ALLOW_GIFT_WRAP: false,
    ALLOW_ORDER_NOTES: true,
    ALLOW_ORDER_SCHEDULING: false,
  } as const,

  // Checkout Limits
  LIMITS: {
    MIN_ITEMS: 1,
    MAX_ITEMS: 100,
    MAX_QUANTITY_PER_ITEM: 1000,
    MIN_ORDER_AMOUNT: 0,
    MAX_ORDER_AMOUNT: 1000000,
    MAX_SHIPPING_ADDRESSES: 10,
    MAX_BILLING_ADDRESSES: 10,
    MAX_ORDER_NOTES_LENGTH: 500,
    MAX_DISCOUNT_AMOUNT: 100000,
    MAX_COUPON_PER_ORDER: 1,
    MAX_GIFT_WRAP_ITEMS: 10,
    MAX_ORDER_SCHEDULING_DAYS: 30,
  } as const,

  // Checkout Errors
  ERRORS: {
    INVALID_CART: 'invalid_cart',
    INVALID_CHECKOUT: 'invalid_checkout',
    INVALID_STEP: 'invalid_step',
    INVALID_SHIPPING: 'invalid_shipping',
    INVALID_PAYMENT: 'invalid_payment',
    INVALID_BILLING: 'invalid_billing',
    INVALID_COUPON: 'invalid_coupon',
    INVALID_ORDER: 'invalid_order',
    SESSION_EXPIRED: 'session_expired',
    PAYMENT_FAILED: 'payment_failed',
    PAYMENT_DECLINED: 'payment_declined',
    PAYMENT_TIMEOUT: 'payment_timeout',
    SHIPPING_UNAVAILABLE: 'shipping_unavailable',
    TAX_CALCULATION_FAILED: 'tax_calculation_failed',
    DISCOUNT_CALCULATION_FAILED: 'discount_calculation_failed',
    ORDER_SUBMISSION_FAILED: 'order_submission_failed',
    CART_EMPTY: 'cart_empty',
    STOCK_UNAVAILABLE: 'stock_unavailable',
    PRICE_CHANGED: 'price_changed',
    INVENTORY_ISSUE: 'inventory_issue',
  } as const,
} as const;

// Checkout Types
export type CheckoutType = (typeof CHECKOUT.TYPES)[keyof typeof CHECKOUT.TYPES];

// Checkout Modes
export type CheckoutMode = (typeof CHECKOUT.MODES)[keyof typeof CHECKOUT.MODES];

// Checkout Steps
export type CheckoutStep = (typeof CHECKOUT.STEPS)[keyof typeof CHECKOUT.STEPS];

// Checkout Defaults
export type CheckoutDefault = (typeof CHECKOUT.DEFAULTS)[keyof typeof CHECKOUT.DEFAULTS];

// Checkout Limits
export type CheckoutLimit = (typeof CHECKOUT.LIMITS)[keyof typeof CHECKOUT.LIMITS];

// Checkout Errors
export type CheckoutError = (typeof CHECKOUT.ERRORS)[keyof typeof CHECKOUT.ERRORS];

// Utility Functions
export function checkoutGetTypeLabel(type: CheckoutType): string {
  const labels: Record<CheckoutType, string> = {
    [CHECKOUT.TYPES.GUEST]: 'Guest Checkout',
    [CHECKOUT.TYPES.REGISTERED]: 'Registered Checkout',
    [CHECKOUT.TYPES.EXPRESS]: 'Express Checkout',
    [CHECKOUT.TYPES.ONE_CLICK]: 'One-Click Checkout',
    [CHECKOUT.TYPES.SOCIAL]: 'Social Checkout',
    [CHECKOUT.TYPES.CUSTOM]: 'Custom Checkout',
  };
  return labels[type] || 'Unknown Checkout Type';
}

export function checkoutGetModeLabel(mode: CheckoutMode): string {
  const labels: Record<CheckoutMode, string> = {
    [CHECKOUT.MODES.SINGLE]: 'Single Page',
    [CHECKOUT.MODES.MULTI_STEP]: 'Multi-Step',
    [CHECKOUT.MODES.ACCORDION]: 'Accordion',
    [CHECKOUT.MODES.TABBED]: 'Tabbed',
    [CHECKOUT.MODES.CUSTOM]: 'Custom',
  };
  return labels[mode] || 'Unknown Mode';
}

export function checkoutGetStepLabel(step: CheckoutStep): string {
  const labels: Record<CheckoutStep, string> = {
    [CHECKOUT.STEPS.CART]: 'Cart',
    [CHECKOUT.STEPS.INFORMATION]: 'Information',
    [CHECKOUT.STEPS.SHIPPING]: 'Shipping',
    [CHECKOUT.STEPS.PAYMENT]: 'Payment',
    [CHECKOUT.STEPS.REVIEW]: 'Review',
    [CHECKOUT.STEPS.CONFIRMATION]: 'Confirmation',
    [CHECKOUT.STEPS.COMPLETE]: 'Complete',
  };
  return labels[step] || 'Unknown Step';
}

export function checkoutGetErrorLabel(error: CheckoutError): string {
  const labels: Record<CheckoutError, string> = {
    [CHECKOUT.ERRORS.INVALID_CART]: 'Invalid Cart',
    [CHECKOUT.ERRORS.INVALID_CHECKOUT]: 'Invalid Checkout Session',
    [CHECKOUT.ERRORS.INVALID_STEP]: 'Invalid Checkout Step',
    [CHECKOUT.ERRORS.INVALID_SHIPPING]: 'Invalid Shipping Information',
    [CHECKOUT.ERRORS.INVALID_PAYMENT]: 'Invalid Payment Information',
    [CHECKOUT.ERRORS.INVALID_BILLING]: 'Invalid Billing Information',
    [CHECKOUT.ERRORS.INVALID_COUPON]: 'Invalid Coupon Code',
    [CHECKOUT.ERRORS.INVALID_ORDER]: 'Invalid Order',
    [CHECKOUT.ERRORS.SESSION_EXPIRED]: 'Session Expired',
    [CHECKOUT.ERRORS.PAYMENT_FAILED]: 'Payment Failed',
    [CHECKOUT.ERRORS.PAYMENT_DECLINED]: 'Payment Declined',
    [CHECKOUT.ERRORS.PAYMENT_TIMEOUT]: 'Payment Timeout',
    [CHECKOUT.ERRORS.SHIPPING_UNAVAILABLE]: 'Shipping Unavailable',
    [CHECKOUT.ERRORS.TAX_CALCULATION_FAILED]: 'Tax Calculation Failed',
    [CHECKOUT.ERRORS.DISCOUNT_CALCULATION_FAILED]: 'Discount Calculation Failed',
    [CHECKOUT.ERRORS.ORDER_SUBMISSION_FAILED]: 'Order Submission Failed',
    [CHECKOUT.ERRORS.CART_EMPTY]: 'Cart is Empty',
    [CHECKOUT.ERRORS.STOCK_UNAVAILABLE]: 'Stock Unavailable',
    [CHECKOUT.ERRORS.PRICE_CHANGED]: 'Price Changed',
    [CHECKOUT.ERRORS.INVENTORY_ISSUE]: 'Inventory Issue',
  };
  return labels[error] || 'Unknown Error';
}

export function checkoutIsGuestType(type: CheckoutType): boolean {
  return type === CHECKOUT.TYPES.GUEST;
}

export function checkoutIsRegisteredType(type: CheckoutType): boolean {
  return type === CHECKOUT.TYPES.REGISTERED;
}

export function checkoutIsExpressType(type: CheckoutType): boolean {
  return type === CHECKOUT.TYPES.EXPRESS || type === CHECKOUT.TYPES.ONE_CLICK;
}

export function checkoutGetDefaultSessionTimeout(): number {
  return CHECKOUT.DEFAULTS.SESSION_TIMEOUT_MINUTES;
}

export function checkoutGetDefaultCurrency(): string {
  return CHECKOUT.DEFAULTS.DEFAULT_CURRENCY;
}

export function checkoutIsValidStep(step: string): step is CheckoutStep {
  return Object.values(CHECKOUT.STEPS).includes(step as CheckoutStep);
}

export function checkoutIsValidType(type: string): type is CheckoutType {
  return Object.values(CHECKOUT.TYPES).includes(type as CheckoutType);
}
