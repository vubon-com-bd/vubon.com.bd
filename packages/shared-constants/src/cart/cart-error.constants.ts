/**
 * Cart Error Constants
 * Error definitions for cart operations
 */

// Error Codes first
export const CART_ERROR_CODES = {
  // Cart Errors
  CART_NOT_FOUND: 'CART_001',
  CART_EXPIRED: 'CART_002',
  CART_FULL: 'CART_003',
  CART_EMPTY: 'CART_004',

  // Item Errors
  ITEM_NOT_FOUND: 'ITEM_001',
  ITEM_LIMIT_EXCEEDED: 'ITEM_002',
  INVALID_QUANTITY: 'ITEM_003',
  INSUFFICIENT_STOCK: 'ITEM_004',
  OUT_OF_STOCK: 'ITEM_005',

  // Coupon Errors
  COUPON_NOT_FOUND: 'CPN_001',
  COUPON_EXPIRED: 'CPN_002',
  COUPON_USED: 'CPN_003',
  COUPON_INACTIVE: 'CPN_004',
  INVALID_CODE: 'CPN_005',

  // Promotion Errors
  PROMOTION_NOT_FOUND: 'PRM_001',
  PROMOTION_EXPIRED: 'PRM_002',
  PROMOTION_INACTIVE: 'PRM_003',
  PROMOTION_LIMIT_EXCEEDED: 'PRM_004',

  // Shipping Errors
  SHIPPING_NOT_AVAILABLE: 'SHP_001',
  INVALID_ADDRESS: 'SHP_002',
  CARRIER_ERROR: 'SHP_003',

  // Tax Errors
  TAX_NOT_CONFIGURED: 'TAX_001',
  INVALID_RATE: 'TAX_002',

  // Payment Errors
  PAYMENT_FAILED: 'PAY_001',
  PAYMENT_TIMEOUT: 'PAY_002',

  // System Errors
  SYSTEM_ERROR: 'SYS_001',
  DATABASE_ERROR: 'SYS_002',
  NETWORK_ERROR: 'SYS_003',
  TIMEOUT: 'SYS_004',

  // Permission Errors
  PERMISSION_DENIED: 'PERM_001',
  UNAUTHORIZED: 'PERM_002',

  // Validation Errors
  VALIDATION_FAILED: 'VAL_001',
  INVALID_INPUT: 'VAL_002',
  MISSING_REQUIRED: 'VAL_003',
} as const;

export type CartErrorCode = (typeof CART_ERROR_CODES)[keyof typeof CART_ERROR_CODES];

// Error Messages using the codes
export const CART_ERROR_MESSAGES: Record<CartErrorCode, string> = {
  // Cart Errors
  [CART_ERROR_CODES.CART_NOT_FOUND]: 'Cart not found',
  [CART_ERROR_CODES.CART_EXPIRED]: 'Cart has expired',
  [CART_ERROR_CODES.CART_FULL]: 'Cart is full',
  [CART_ERROR_CODES.CART_EMPTY]: 'Cart is empty',

  // Item Errors
  [CART_ERROR_CODES.ITEM_NOT_FOUND]: 'Item not found',
  [CART_ERROR_CODES.ITEM_LIMIT_EXCEEDED]: 'Item limit exceeded',
  [CART_ERROR_CODES.INVALID_QUANTITY]: 'Invalid quantity',
  [CART_ERROR_CODES.INSUFFICIENT_STOCK]: 'Insufficient stock',
  [CART_ERROR_CODES.OUT_OF_STOCK]: 'Out of stock',

  // Coupon Errors
  [CART_ERROR_CODES.COUPON_NOT_FOUND]: 'Coupon not found',
  [CART_ERROR_CODES.COUPON_EXPIRED]: 'Coupon has expired',
  [CART_ERROR_CODES.COUPON_USED]: 'Coupon already used',
  [CART_ERROR_CODES.COUPON_INACTIVE]: 'Coupon is inactive',
  [CART_ERROR_CODES.INVALID_CODE]: 'Invalid coupon code',

  // Promotion Errors
  [CART_ERROR_CODES.PROMOTION_NOT_FOUND]: 'Promotion not found',
  [CART_ERROR_CODES.PROMOTION_EXPIRED]: 'Promotion has expired',
  [CART_ERROR_CODES.PROMOTION_INACTIVE]: 'Promotion is inactive',
  [CART_ERROR_CODES.PROMOTION_LIMIT_EXCEEDED]: 'Promotion limit exceeded',

  // Shipping Errors
  [CART_ERROR_CODES.SHIPPING_NOT_AVAILABLE]: 'Shipping not available',
  [CART_ERROR_CODES.INVALID_ADDRESS]: 'Invalid address',
  [CART_ERROR_CODES.CARRIER_ERROR]: 'Carrier error',

  // Tax Errors
  [CART_ERROR_CODES.TAX_NOT_CONFIGURED]: 'Tax not configured',
  [CART_ERROR_CODES.INVALID_RATE]: 'Invalid tax rate',

  // Payment Errors
  [CART_ERROR_CODES.PAYMENT_FAILED]: 'Payment failed',
  [CART_ERROR_CODES.PAYMENT_TIMEOUT]: 'Payment timeout',

  // System Errors
  [CART_ERROR_CODES.SYSTEM_ERROR]: 'System error',
  [CART_ERROR_CODES.DATABASE_ERROR]: 'Database error',
  [CART_ERROR_CODES.NETWORK_ERROR]: 'Network error',
  [CART_ERROR_CODES.TIMEOUT]: 'Request timeout',

  // Permission Errors
  [CART_ERROR_CODES.PERMISSION_DENIED]: 'Permission denied',
  [CART_ERROR_CODES.UNAUTHORIZED]: 'Unauthorized',

  // Validation Errors
  [CART_ERROR_CODES.VALIDATION_FAILED]: 'Validation failed',
  [CART_ERROR_CODES.INVALID_INPUT]: 'Invalid input',
  [CART_ERROR_CODES.MISSING_REQUIRED]: 'Missing required field',
} as const;

export const CART_ERROR = {
  // Error Categories
  CATEGORIES: {
    VALIDATION: 'validation',
    BUSINESS: 'business',
    SYSTEM: 'system',
    PERMISSION: 'permission',
    NETWORK: 'network',
    CUSTOM: 'custom',
  } as const,

  // Error Severities
  SEVERITIES: {
    CRITICAL: 'critical',
    HIGH: 'high',
    MEDIUM: 'medium',
    LOW: 'low',
    INFO: 'info',
  } as const,

  // Error Sources
  SOURCES: {
    CLIENT: 'client',
    SERVER: 'server',
    DATABASE: 'database',
    CACHE: 'cache',
    EXTERNAL: 'external',
    CUSTOM: 'custom',
  } as const,

  // Error Codes (reference to CART_ERROR_CODES)
  CODES: CART_ERROR_CODES,

  // Error Messages (reference to CART_ERROR_MESSAGES)
  MESSAGES: CART_ERROR_MESSAGES,

  // Error Defaults
  DEFAULTS: {
    DEFAULT_CATEGORY: 'business',
    DEFAULT_SEVERITY: 'medium',
    DEFAULT_SOURCE: 'server',
    DEFAULT_RETRYABLE: false,
    DEFAULT_RETRY_COUNT: 3,
    DEFAULT_RETRY_DELAY: 1000,
  } as const,
} as const;

// Error Categories
export type CartErrorCategory = (typeof CART_ERROR.CATEGORIES)[keyof typeof CART_ERROR.CATEGORIES];

// Error Severities
export type CartErrorSeverity = (typeof CART_ERROR.SEVERITIES)[keyof typeof CART_ERROR.SEVERITIES];

// Error Sources
export type CartErrorSource = (typeof CART_ERROR.SOURCES)[keyof typeof CART_ERROR.SOURCES];

// Error Defaults
export type CartErrorDefault = (typeof CART_ERROR.DEFAULTS)[keyof typeof CART_ERROR.DEFAULTS];

// Utility Functions
export function carterrorGetCategoryLabel(category: CartErrorCategory): string {
  const labels: Record<CartErrorCategory, string> = {
    [CART_ERROR.CATEGORIES.VALIDATION]: 'Validation',
    [CART_ERROR.CATEGORIES.BUSINESS]: 'Business',
    [CART_ERROR.CATEGORIES.SYSTEM]: 'System',
    [CART_ERROR.CATEGORIES.PERMISSION]: 'Permission',
    [CART_ERROR.CATEGORIES.NETWORK]: 'Network',
    [CART_ERROR.CATEGORIES.CUSTOM]: 'Custom',
  };
  return labels[category] || 'Unknown Category';
}

export function carterrorGetSeverityLabel(severity: CartErrorSeverity): string {
  const labels: Record<CartErrorSeverity, string> = {
    [CART_ERROR.SEVERITIES.CRITICAL]: 'Critical',
    [CART_ERROR.SEVERITIES.HIGH]: 'High',
    [CART_ERROR.SEVERITIES.MEDIUM]: 'Medium',
    [CART_ERROR.SEVERITIES.LOW]: 'Low',
    [CART_ERROR.SEVERITIES.INFO]: 'Info',
  };
  return labels[severity] || 'Unknown Severity';
}

export function carterrorGetSourceLabel(source: CartErrorSource): string {
  const labels: Record<CartErrorSource, string> = {
    [CART_ERROR.SOURCES.CLIENT]: 'Client',
    [CART_ERROR.SOURCES.SERVER]: 'Server',
    [CART_ERROR.SOURCES.DATABASE]: 'Database',
    [CART_ERROR.SOURCES.CACHE]: 'Cache',
    [CART_ERROR.SOURCES.EXTERNAL]: 'External',
    [CART_ERROR.SOURCES.CUSTOM]: 'Custom',
  };
  return labels[source] || 'Unknown Source';
}

export function carterrorGetMessage(code: CartErrorCode): string {
  return CART_ERROR.MESSAGES[code] || 'Unknown error';
}

export function carterrorGetDefaultCategory(): CartErrorCategory {
  return CART_ERROR.DEFAULTS.DEFAULT_CATEGORY;
}

export function carterrorGetDefaultSeverity(): CartErrorSeverity {
  return CART_ERROR.DEFAULTS.DEFAULT_SEVERITY;
}

export function carterrorGetDefaultRetryCount(): number {
  return CART_ERROR.DEFAULTS.DEFAULT_RETRY_COUNT;
}

export function carterrorIsRetryable(code: CartErrorCode): boolean {
  const retryableCodes: CartErrorCode[] = [
    CART_ERROR.CODES.NETWORK_ERROR,
    CART_ERROR.CODES.TIMEOUT,
    CART_ERROR.CODES.DATABASE_ERROR,
    CART_ERROR.CODES.SYSTEM_ERROR,
  ];
  return retryableCodes.includes(code);
}

export function carterrorIsValidationError(code: CartErrorCode): boolean {
  const validationCodes: CartErrorCode[] = [
    CART_ERROR.CODES.VALIDATION_FAILED,
    CART_ERROR.CODES.INVALID_INPUT,
    CART_ERROR.CODES.MISSING_REQUIRED,
    CART_ERROR.CODES.INVALID_QUANTITY,
    CART_ERROR.CODES.INVALID_CODE,
  ];
  return validationCodes.includes(code);
}

export function carterrorIsPermissionError(code: CartErrorCode): boolean {
  const permissionCodes: CartErrorCode[] = [
    CART_ERROR.CODES.PERMISSION_DENIED,
    CART_ERROR.CODES.UNAUTHORIZED,
  ];
  return permissionCodes.includes(code);
}
