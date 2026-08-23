/**
 * Payment Error Constants
 * Error definitions for payment processing
 */

export const PAYMENT_ERROR = {
  // Error Codes
  CODES: {
    // General Payment Errors
    PAYMENT_FAILED: 'PAYMENT_FAILED',
    PAYMENT_DECLINED: 'PAYMENT_DECLINED',
    PAYMENT_EXPIRED: 'PAYMENT_EXPIRED',
    PAYMENT_TIMEOUT: 'PAYMENT_TIMEOUT',
    PAYMENT_CANCELLED: 'PAYMENT_CANCELLED',

    // Card Errors
    CARD_INVALID: 'CARD_INVALID',
    CARD_EXPIRED: 'CARD_EXPIRED',
    CARD_DECLINED: 'CARD_DECLINED',
    CARD_LIMIT_EXCEEDED: 'CARD_LIMIT_EXCEEDED',
    CARD_INSUFFICIENT_FUNDS: 'CARD_INSUFFICIENT_FUNDS',
    CARD_INVALID_CVV: 'CARD_INVALID_CVV',
    CARD_INVALID_NUMBER: 'CARD_INVALID_NUMBER',

    // Authentication Errors
    AUTH_FAILED: 'AUTH_FAILED',
    AUTH_EXPIRED: 'AUTH_EXPIRED',
    AUTH_INVALID: 'AUTH_INVALID',
    AUTH_3D_FAILED: 'AUTH_3D_FAILED',

    // Gateway Errors
    GATEWAY_ERROR: 'GATEWAY_ERROR',
    GATEWAY_TIMEOUT: 'GATEWAY_TIMEOUT',
    GATEWAY_UNAVAILABLE: 'GATEWAY_UNAVAILABLE',
    GATEWAY_INVALID_RESPONSE: 'GATEWAY_INVALID_RESPONSE',

    // Validation Errors
    VALIDATION_FAILED: 'VALIDATION_FAILED',
    INVALID_AMOUNT: 'INVALID_AMOUNT',
    INVALID_CURRENCY: 'INVALID_CURRENCY',
    INVALID_METHOD: 'INVALID_METHOD',

    // Refund Errors
    REFUND_FAILED: 'REFUND_FAILED',
    REFUND_EXCEEDS_BALANCE: 'REFUND_EXCEEDS_BALANCE',
    REFUND_PARTIAL_FAILED: 'REFUND_PARTIAL_FAILED',

    // Security Errors
    FRAUD_SUSPECTED: 'FRAUD_SUSPECTED',
    RISK_THRESHOLD_EXCEEDED: 'RISK_THRESHOLD_EXCEEDED',
    BLOCKED: 'BLOCKED',
  } as const,

  // Error Severities
  SEVERITIES: {
    LOW: 'low',
    MEDIUM: 'medium',
    HIGH: 'high',
    CRITICAL: 'critical',
  } as const,

  // Error Categories
  CATEGORIES: {
    CARD: 'card',
    AUTH: 'authentication',
    GATEWAY: 'gateway',
    VALIDATION: 'validation',
    REFUND: 'refund',
    SECURITY: 'security',
    GENERAL: 'general',
  } as const,

  // Error Defaults
  DEFAULTS: {
    DEFAULT_SEVERITY: 'medium',
    DEFAULT_CATEGORY: 'general',
    DEFAULT_RETRYABLE: true,
    DEFAULT_ACTIONABLE: true,
  } as const,
} as const;

// Error Codes
export type PaymentErrorCode = (typeof PAYMENT_ERROR.CODES)[keyof typeof PAYMENT_ERROR.CODES];

// Error Severities
export type PaymentErrorSeverity =
  (typeof PAYMENT_ERROR.SEVERITIES)[keyof typeof PAYMENT_ERROR.SEVERITIES];

// Error Categories
export type PaymentErrorCategory =
  (typeof PAYMENT_ERROR.CATEGORIES)[keyof typeof PAYMENT_ERROR.CATEGORIES];

// Error Defaults
export type PaymentErrorDefault =
  (typeof PAYMENT_ERROR.DEFAULTS)[keyof typeof PAYMENT_ERROR.DEFAULTS];

// Utility Functions
export const PAYMENT_ERROR_MESSAGES: Record<PaymentErrorCode, string> = {
  // General Payment Errors
  [PAYMENT_ERROR.CODES.PAYMENT_FAILED]: 'Payment processing failed',
  [PAYMENT_ERROR.CODES.PAYMENT_DECLINED]: 'Payment was declined',
  [PAYMENT_ERROR.CODES.PAYMENT_EXPIRED]: 'Payment session expired',
  [PAYMENT_ERROR.CODES.PAYMENT_TIMEOUT]: 'Payment request timed out',
  [PAYMENT_ERROR.CODES.PAYMENT_CANCELLED]: 'Payment was cancelled',

  // Card Errors
  [PAYMENT_ERROR.CODES.CARD_INVALID]: 'Invalid card information',
  [PAYMENT_ERROR.CODES.CARD_EXPIRED]: 'Card has expired',
  [PAYMENT_ERROR.CODES.CARD_DECLINED]: 'Card was declined',
  [PAYMENT_ERROR.CODES.CARD_LIMIT_EXCEEDED]: 'Card limit exceeded',
  [PAYMENT_ERROR.CODES.CARD_INSUFFICIENT_FUNDS]: 'Insufficient funds',
  [PAYMENT_ERROR.CODES.CARD_INVALID_CVV]: 'Invalid CVV code',
  [PAYMENT_ERROR.CODES.CARD_INVALID_NUMBER]: 'Invalid card number',

  // Authentication Errors
  [PAYMENT_ERROR.CODES.AUTH_FAILED]: 'Authentication failed',
  [PAYMENT_ERROR.CODES.AUTH_EXPIRED]: 'Authentication expired',
  [PAYMENT_ERROR.CODES.AUTH_INVALID]: 'Invalid authentication',
  [PAYMENT_ERROR.CODES.AUTH_3D_FAILED]: '3D Secure authentication failed',

  // Gateway Errors
  [PAYMENT_ERROR.CODES.GATEWAY_ERROR]: 'Payment gateway error',
  [PAYMENT_ERROR.CODES.GATEWAY_TIMEOUT]: 'Gateway timeout',
  [PAYMENT_ERROR.CODES.GATEWAY_UNAVAILABLE]: 'Gateway unavailable',
  [PAYMENT_ERROR.CODES.GATEWAY_INVALID_RESPONSE]: 'Invalid gateway response',

  // Validation Errors
  [PAYMENT_ERROR.CODES.VALIDATION_FAILED]: 'Validation failed',
  [PAYMENT_ERROR.CODES.INVALID_AMOUNT]: 'Invalid payment amount',
  [PAYMENT_ERROR.CODES.INVALID_CURRENCY]: 'Invalid currency',
  [PAYMENT_ERROR.CODES.INVALID_METHOD]: 'Invalid payment method',

  // Refund Errors
  [PAYMENT_ERROR.CODES.REFUND_FAILED]: 'Refund processing failed',
  [PAYMENT_ERROR.CODES.REFUND_EXCEEDS_BALANCE]: 'Refund exceeds available balance',
  [PAYMENT_ERROR.CODES.REFUND_PARTIAL_FAILED]: 'Partial refund failed',

  // Security Errors
  [PAYMENT_ERROR.CODES.FRAUD_SUSPECTED]: 'Fraud suspected',
  [PAYMENT_ERROR.CODES.RISK_THRESHOLD_EXCEEDED]: 'Risk threshold exceeded',
  [PAYMENT_ERROR.CODES.BLOCKED]: 'Transaction blocked',
};

export function paymenterrorGetMessage(code: PaymentErrorCode): string {
  return PAYMENT_ERROR_MESSAGES[code] || 'Unknown payment error occurred';
}

export function paymenterrorGetSeverityLabel(severity: PaymentErrorSeverity): string {
  const labels: Record<PaymentErrorSeverity, string> = {
    [PAYMENT_ERROR.SEVERITIES.LOW]: 'Low',
    [PAYMENT_ERROR.SEVERITIES.MEDIUM]: 'Medium',
    [PAYMENT_ERROR.SEVERITIES.HIGH]: 'High',
    [PAYMENT_ERROR.SEVERITIES.CRITICAL]: 'Critical',
  };
  return labels[severity] || 'Unknown Severity';
}

export function paymenterrorGetCategoryLabel(category: PaymentErrorCategory): string {
  const labels: Record<PaymentErrorCategory, string> = {
    [PAYMENT_ERROR.CATEGORIES.CARD]: 'Card Error',
    [PAYMENT_ERROR.CATEGORIES.AUTH]: 'Authentication Error',
    [PAYMENT_ERROR.CATEGORIES.GATEWAY]: 'Gateway Error',
    [PAYMENT_ERROR.CATEGORIES.VALIDATION]: 'Validation Error',
    [PAYMENT_ERROR.CATEGORIES.REFUND]: 'Refund Error',
    [PAYMENT_ERROR.CATEGORIES.SECURITY]: 'Security Error',
    [PAYMENT_ERROR.CATEGORIES.GENERAL]: 'General Error',
  };
  return labels[category] || 'Unknown Category';
}

export function paymenterrorIsCardError(code: PaymentErrorCode): boolean {
  const cardErrorCodes: PaymentErrorCode[] = [
    PAYMENT_ERROR.CODES.CARD_INVALID,
    PAYMENT_ERROR.CODES.CARD_EXPIRED,
    PAYMENT_ERROR.CODES.CARD_DECLINED,
    PAYMENT_ERROR.CODES.CARD_LIMIT_EXCEEDED,
    PAYMENT_ERROR.CODES.CARD_INSUFFICIENT_FUNDS,
    PAYMENT_ERROR.CODES.CARD_INVALID_CVV,
    PAYMENT_ERROR.CODES.CARD_INVALID_NUMBER,
  ];
  return cardErrorCodes.includes(code);
}

export function paymenterrorIsAuthError(code: PaymentErrorCode): boolean {
  const authErrorCodes: PaymentErrorCode[] = [
    PAYMENT_ERROR.CODES.AUTH_FAILED,
    PAYMENT_ERROR.CODES.AUTH_EXPIRED,
    PAYMENT_ERROR.CODES.AUTH_INVALID,
    PAYMENT_ERROR.CODES.AUTH_3D_FAILED,
  ];
  return authErrorCodes.includes(code);
}

export function paymenterrorIsGatewayError(code: PaymentErrorCode): boolean {
  const gatewayErrorCodes: PaymentErrorCode[] = [
    PAYMENT_ERROR.CODES.GATEWAY_ERROR,
    PAYMENT_ERROR.CODES.GATEWAY_TIMEOUT,
    PAYMENT_ERROR.CODES.GATEWAY_UNAVAILABLE,
    PAYMENT_ERROR.CODES.GATEWAY_INVALID_RESPONSE,
  ];
  return gatewayErrorCodes.includes(code);
}

export function paymenterrorIsRetryable(code: PaymentErrorCode): boolean {
  const nonRetryableCodes: PaymentErrorCode[] = [
    PAYMENT_ERROR.CODES.PAYMENT_DECLINED,
    PAYMENT_ERROR.CODES.CARD_DECLINED,
    PAYMENT_ERROR.CODES.CARD_INSUFFICIENT_FUNDS,
    PAYMENT_ERROR.CODES.CARD_INVALID_NUMBER,
    PAYMENT_ERROR.CODES.FRAUD_SUSPECTED,
    PAYMENT_ERROR.CODES.BLOCKED,
    PAYMENT_ERROR.CODES.AUTH_3D_FAILED,
  ];
  return !nonRetryableCodes.includes(code);
}

export function paymenterrorIsActionable(code: PaymentErrorCode): boolean {
  const nonActionableCodes: PaymentErrorCode[] = [
    PAYMENT_ERROR.CODES.GATEWAY_ERROR,
    PAYMENT_ERROR.CODES.GATEWAY_TIMEOUT,
    PAYMENT_ERROR.CODES.GATEWAY_UNAVAILABLE,
    PAYMENT_ERROR.CODES.GATEWAY_INVALID_RESPONSE,
    PAYMENT_ERROR.CODES.PAYMENT_TIMEOUT,
  ];
  return !nonActionableCodes.includes(code);
}

export function paymenterrorGetDefaultSeverity(): PaymentErrorSeverity {
  return PAYMENT_ERROR.DEFAULTS.DEFAULT_SEVERITY;
}
