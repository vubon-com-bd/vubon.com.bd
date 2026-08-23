/**
 * Checkout Error Constants
 * Error definitions for checkout process
 */

export const CHECKOUT_ERROR = {
  // Error Codes
  CODES: {
    // Cart Errors
    CART_EMPTY: 'CART_EMPTY',
    CART_INVALID: 'CART_INVALID',
    CART_EXPIRED: 'CART_EXPIRED',

    // Checkout Errors
    CHECKOUT_INVALID: 'CHECKOUT_INVALID',
    CHECKOUT_EXPIRED: 'CHECKOUT_EXPIRED',
    CHECKOUT_LOCKED: 'CHECKOUT_LOCKED',

    // Step Errors
    STEP_INVALID: 'STEP_INVALID',
    STEP_MISSING_DATA: 'STEP_MISSING_DATA',
    STEP_INCOMPLETE: 'STEP_INCOMPLETE',

    // Address Errors
    ADDRESS_INVALID: 'ADDRESS_INVALID',
    ADDRESS_INCOMPLETE: 'ADDRESS_INCOMPLETE',
    ADDRESS_NOT_FOUND: 'ADDRESS_NOT_FOUND',

    // Shipping Errors
    SHIPPING_UNAVAILABLE: 'SHIPPING_UNAVAILABLE',
    SHIPPING_INVALID: 'SHIPPING_INVALID',
    SHIPPING_EXPIRED: 'SHIPPING_EXPIRED',

    // Payment Errors
    PAYMENT_FAILED: 'PAYMENT_FAILED',
    PAYMENT_DECLINED: 'PAYMENT_DECLINED',
    PAYMENT_EXPIRED: 'PAYMENT_EXPIRED',
    PAYMENT_INVALID: 'PAYMENT_INVALID',
    PAYMENT_TIMEOUT: 'PAYMENT_TIMEOUT',

    // Coupon Errors
    COUPON_INVALID: 'COUPON_INVALID',
    COUPON_EXPIRED: 'COUPON_EXPIRED',
    COUPON_USED: 'COUPON_USED',
    COUPON_NOT_APPLICABLE: 'COUPON_NOT_APPLICABLE',

    // Order Errors
    ORDER_INVALID: 'ORDER_INVALID',
    ORDER_SUBMISSION_FAILED: 'ORDER_SUBMISSION_FAILED',

    // Inventory Errors
    STOCK_UNAVAILABLE: 'STOCK_UNAVAILABLE',
    INVENTORY_ISSUE: 'INVENTORY_ISSUE',
    PRICE_CHANGED: 'PRICE_CHANGED',

    // Session Errors
    SESSION_EXPIRED: 'SESSION_EXPIRED',
    SESSION_INVALID: 'SESSION_INVALID',

    // Tax Errors
    TAX_CALCULATION_FAILED: 'TAX_CALCULATION_FAILED',

    // Discount Errors
    DISCOUNT_CALCULATION_FAILED: 'DISCOUNT_CALCULATION_FAILED',
  } as const,

  // Error Severities
  SEVERITIES: {
    LOW: 'low',
    MEDIUM: 'medium',
    HIGH: 'high',
    CRITICAL: 'critical',
  } as const,

  // Error Sources
  SOURCES: {
    CLIENT: 'client',
    SERVER: 'server',
    VALIDATION: 'validation',
    PAYMENT: 'payment',
    SHIPPING: 'shipping',
    INVENTORY: 'inventory',
  } as const,

  // Error Defaults
  DEFAULTS: {
    DEFAULT_SEVERITY: 'medium',
    DEFAULT_SOURCE: 'server',
    DEFAULT_RETRYABLE: true,
    DEFAULT_ACTIONABLE: true,
  } as const,
} as const;

// Error Codes
export type CheckoutErrorCode = (typeof CHECKOUT_ERROR.CODES)[keyof typeof CHECKOUT_ERROR.CODES];

// Error Severities
export type CheckoutErrorSeverity =
  (typeof CHECKOUT_ERROR.SEVERITIES)[keyof typeof CHECKOUT_ERROR.SEVERITIES];

// Error Sources
export type CheckoutErrorSource =
  (typeof CHECKOUT_ERROR.SOURCES)[keyof typeof CHECKOUT_ERROR.SOURCES];

// Error Defaults
export type CheckoutErrorDefault =
  (typeof CHECKOUT_ERROR.DEFAULTS)[keyof typeof CHECKOUT_ERROR.DEFAULTS];

// Utility Functions
export const CHECKOUT_ERROR_MESSAGES: Record<CheckoutErrorCode, string> = {
  // Cart Errors
  [CHECKOUT_ERROR.CODES.CART_EMPTY]: 'Your cart is empty',
  [CHECKOUT_ERROR.CODES.CART_INVALID]: 'Invalid cart data',
  [CHECKOUT_ERROR.CODES.CART_EXPIRED]: 'Your cart session has expired',

  // Checkout Errors
  [CHECKOUT_ERROR.CODES.CHECKOUT_INVALID]: 'Invalid checkout session',
  [CHECKOUT_ERROR.CODES.CHECKOUT_EXPIRED]: 'Checkout session expired',
  [CHECKOUT_ERROR.CODES.CHECKOUT_LOCKED]: 'Checkout is locked',

  // Step Errors
  [CHECKOUT_ERROR.CODES.STEP_INVALID]: 'Invalid checkout step',
  [CHECKOUT_ERROR.CODES.STEP_MISSING_DATA]: 'Missing required data for this step',
  [CHECKOUT_ERROR.CODES.STEP_INCOMPLETE]: 'Step is incomplete',

  // Address Errors
  [CHECKOUT_ERROR.CODES.ADDRESS_INVALID]: 'Invalid address information',
  [CHECKOUT_ERROR.CODES.ADDRESS_INCOMPLETE]: 'Address is incomplete',
  [CHECKOUT_ERROR.CODES.ADDRESS_NOT_FOUND]: 'Address not found',

  // Shipping Errors
  [CHECKOUT_ERROR.CODES.SHIPPING_UNAVAILABLE]: 'Shipping is unavailable for this location',
  [CHECKOUT_ERROR.CODES.SHIPPING_INVALID]: 'Invalid shipping method',
  [CHECKOUT_ERROR.CODES.SHIPPING_EXPIRED]: 'Shipping selection expired',

  // Payment Errors
  [CHECKOUT_ERROR.CODES.PAYMENT_FAILED]: 'Payment processing failed',
  [CHECKOUT_ERROR.CODES.PAYMENT_DECLINED]: 'Payment was declined',
  [CHECKOUT_ERROR.CODES.PAYMENT_EXPIRED]: 'Payment session expired',
  [CHECKOUT_ERROR.CODES.PAYMENT_INVALID]: 'Invalid payment information',
  [CHECKOUT_ERROR.CODES.PAYMENT_TIMEOUT]: 'Payment request timed out',

  // Coupon Errors
  [CHECKOUT_ERROR.CODES.COUPON_INVALID]: 'Invalid coupon code',
  [CHECKOUT_ERROR.CODES.COUPON_EXPIRED]: 'Coupon has expired',
  [CHECKOUT_ERROR.CODES.COUPON_USED]: 'Coupon has already been used',
  [CHECKOUT_ERROR.CODES.COUPON_NOT_APPLICABLE]: 'Coupon is not applicable',

  // Order Errors
  [CHECKOUT_ERROR.CODES.ORDER_INVALID]: 'Invalid order data',
  [CHECKOUT_ERROR.CODES.ORDER_SUBMISSION_FAILED]: 'Order submission failed',

  // Inventory Errors
  [CHECKOUT_ERROR.CODES.STOCK_UNAVAILABLE]: 'Item is out of stock',
  [CHECKOUT_ERROR.CODES.INVENTORY_ISSUE]: 'Inventory issue detected',
  [CHECKOUT_ERROR.CODES.PRICE_CHANGED]: 'Item price has changed',

  // Session Errors
  [CHECKOUT_ERROR.CODES.SESSION_EXPIRED]: 'Session has expired',
  [CHECKOUT_ERROR.CODES.SESSION_INVALID]: 'Invalid session',

  // Tax Errors
  [CHECKOUT_ERROR.CODES.TAX_CALCULATION_FAILED]: 'Tax calculation failed',

  // Discount Errors
  [CHECKOUT_ERROR.CODES.DISCOUNT_CALCULATION_FAILED]: 'Discount calculation failed',
};

export function checkouterrorGetMessage(code: CheckoutErrorCode): string {
  return CHECKOUT_ERROR_MESSAGES[code] || 'Unknown error occurred';
}

export function checkouterrorGetSeverityLabel(severity: CheckoutErrorSeverity): string {
  const labels: Record<CheckoutErrorSeverity, string> = {
    [CHECKOUT_ERROR.SEVERITIES.LOW]: 'Low',
    [CHECKOUT_ERROR.SEVERITIES.MEDIUM]: 'Medium',
    [CHECKOUT_ERROR.SEVERITIES.HIGH]: 'High',
    [CHECKOUT_ERROR.SEVERITIES.CRITICAL]: 'Critical',
  };
  return labels[severity] || 'Unknown Severity';
}

export function checkouterrorGetSourceLabel(source: CheckoutErrorSource): string {
  const labels: Record<CheckoutErrorSource, string> = {
    [CHECKOUT_ERROR.SOURCES.CLIENT]: 'Client',
    [CHECKOUT_ERROR.SOURCES.SERVER]: 'Server',
    [CHECKOUT_ERROR.SOURCES.VALIDATION]: 'Validation',
    [CHECKOUT_ERROR.SOURCES.PAYMENT]: 'Payment',
    [CHECKOUT_ERROR.SOURCES.SHIPPING]: 'Shipping',
    [CHECKOUT_ERROR.SOURCES.INVENTORY]: 'Inventory',
  };
  return labels[source] || 'Unknown Source';
}

export function checkouterrorIsRetryable(code: CheckoutErrorCode): boolean {
  const nonRetryableCodes: CheckoutErrorCode[] = [
    CHECKOUT_ERROR.CODES.CART_EMPTY,
    CHECKOUT_ERROR.CODES.COUPON_INVALID,
    CHECKOUT_ERROR.CODES.COUPON_EXPIRED,
    CHECKOUT_ERROR.CODES.COUPON_USED,
    CHECKOUT_ERROR.CODES.ADDRESS_INVALID,
    CHECKOUT_ERROR.CODES.ORDER_INVALID,
    CHECKOUT_ERROR.CODES.STOCK_UNAVAILABLE,
    CHECKOUT_ERROR.CODES.INVENTORY_ISSUE,
    CHECKOUT_ERROR.CODES.PRICE_CHANGED,
    CHECKOUT_ERROR.CODES.PAYMENT_DECLINED,
  ];
  return !nonRetryableCodes.includes(code);
}

export function checkouterrorIsActionable(code: CheckoutErrorCode): boolean {
  const nonActionableCodes: CheckoutErrorCode[] = [
    CHECKOUT_ERROR.CODES.PAYMENT_TIMEOUT,
    CHECKOUT_ERROR.CODES.SESSION_EXPIRED,
    CHECKOUT_ERROR.CODES.TAX_CALCULATION_FAILED,
    CHECKOUT_ERROR.CODES.DISCOUNT_CALCULATION_FAILED,
    CHECKOUT_ERROR.CODES.ORDER_SUBMISSION_FAILED,
  ];
  return !nonActionableCodes.includes(code);
}

export function checkouterrorGetDefaultSeverity(): CheckoutErrorSeverity {
  return CHECKOUT_ERROR.DEFAULTS.DEFAULT_SEVERITY;
}
