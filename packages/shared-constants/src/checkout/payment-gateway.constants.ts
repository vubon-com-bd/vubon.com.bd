/**
 * Payment Gateway Constants
 * Payment gateway definitions for checkout
 */

export const PAYMENT_GATEWAY = {
  // Payment Gateways
  GATEWAYS: {
    STRIPE: 'stripe',
    PAYPAL: 'paypal',
    SSLCOMMERZ: 'sslcommerz',
    AAMARPAY: 'aamarpay',
    BKASH: 'bkash',
    NAGAD: 'nagad',
    ROCKET: 'rocket',
    UPAY: 'upay',
    TAP: 'tap',
    RAZORPAY: 'razorpay',
    PAYONEER: 'payoneer',
    WISE: 'wise',
    CRYPTO: 'crypto',
    CUSTOM: 'custom',
  } as const,

  // Gateway Categories
  CATEGORIES: {
    CARD: 'card',
    MOBILE: 'mobile',
    BANK: 'bank',
    WALLET: 'wallet',
    CRYPTO: 'crypto',
    OTHER: 'other',
  } as const,

  // Gateway Statuses
  STATUSES: {
    ACTIVE: 'active',
    INACTIVE: 'inactive',
    MAINTENANCE: 'maintenance',
    SUSPENDED: 'suspended',
    DEPRECATED: 'deprecated',
  } as const,

  // Gateway Currencies
  CURRENCIES: {
    BDT: 'BDT',
    USD: 'USD',
    EUR: 'EUR',
    GBP: 'GBP',
    CAD: 'CAD',
    AUD: 'AUD',
    JPY: 'JPY',
    SGD: 'SGD',
    INR: 'INR',
    PKR: 'PKR',
  } as const,

  // Gateway Fees
  FEES: {
    STRIPE: { percentage: 2.9, fixed: 30 },
    PAYPAL: { percentage: 3.9, fixed: 30 },
    SSLCOMMERZ: { percentage: 2.5, fixed: 10 },
    AAMARPAY: { percentage: 2.5, fixed: 10 },
    BKASH: { percentage: 1.85, fixed: 0 },
    NAGAD: { percentage: 1.85, fixed: 0 },
    ROCKET: { percentage: 1.85, fixed: 0 },
    UPAY: { percentage: 1.85, fixed: 0 },
    TAP: { percentage: 2.5, fixed: 10 },
    RAZORPAY: { percentage: 2.0, fixed: 0 },
    PAYONEER: { percentage: 2.0, fixed: 0 },
    WISE: { percentage: 0.5, fixed: 0 },
    CRYPTO: { percentage: 1.0, fixed: 0 },
    CUSTOM: { percentage: 0, fixed: 0 },
  } as const,

  // Gateway Defaults
  DEFAULTS: {
    DEFAULT_GATEWAY: 'sslcommerz',
    DEFAULT_CATEGORY: 'card',
    DEFAULT_STATUS: 'active',
    DEFAULT_CURRENCY: 'BDT',
    DEFAULT_FEE_PERCENTAGE: 2.5,
    DEFAULT_FEE_FIXED: 10,
    DEFAULT_MIN_AMOUNT: 0,
    DEFAULT_MAX_AMOUNT: 1000000,
    DEFAULT_PROCESSING_TIME: 0,
  } as const,

  // Gateway Limits
  LIMITS: {
    MIN_AMOUNT: 0,
    MAX_AMOUNT: 1000000,
    MIN_FEE_PERCENTAGE: 0,
    MAX_FEE_PERCENTAGE: 100,
    MIN_FEE_FIXED: 0,
    MAX_FEE_FIXED: 1000,
    MIN_PROCESSING_TIME: 0,
    MAX_PROCESSING_TIME: 7, // days
  } as const,
} as const;

// Payment Gateways
export type PaymentGatewayType =
  (typeof PAYMENT_GATEWAY.GATEWAYS)[keyof typeof PAYMENT_GATEWAY.GATEWAYS];

// Gateway Categories
export type PaymentGatewayCategory =
  (typeof PAYMENT_GATEWAY.CATEGORIES)[keyof typeof PAYMENT_GATEWAY.CATEGORIES];

// Gateway Statuses
export type PaymentGatewayStatus =
  (typeof PAYMENT_GATEWAY.STATUSES)[keyof typeof PAYMENT_GATEWAY.STATUSES];

// Gateway Currencies
export type PaymentGatewayCurrency =
  (typeof PAYMENT_GATEWAY.CURRENCIES)[keyof typeof PAYMENT_GATEWAY.CURRENCIES];

// Gateway Fees
export type PaymentGatewayFee = (typeof PAYMENT_GATEWAY.FEES)[keyof typeof PAYMENT_GATEWAY.FEES];

// Gateway Defaults
export type PaymentGatewayDefault =
  (typeof PAYMENT_GATEWAY.DEFAULTS)[keyof typeof PAYMENT_GATEWAY.DEFAULTS];

// Gateway Limits
export type PaymentGatewayLimit =
  (typeof PAYMENT_GATEWAY.LIMITS)[keyof typeof PAYMENT_GATEWAY.LIMITS];

// Utility Functions
export function paymentgatewayGetGatewayLabel(gateway: PaymentGatewayType): string {
  const labels: Record<PaymentGatewayType, string> = {
    [PAYMENT_GATEWAY.GATEWAYS.STRIPE]: 'Stripe',
    [PAYMENT_GATEWAY.GATEWAYS.PAYPAL]: 'PayPal',
    [PAYMENT_GATEWAY.GATEWAYS.SSLCOMMERZ]: 'SSLCommerz',
    [PAYMENT_GATEWAY.GATEWAYS.AAMARPAY]: 'AamarPay',
    [PAYMENT_GATEWAY.GATEWAYS.BKASH]: 'bKash',
    [PAYMENT_GATEWAY.GATEWAYS.NAGAD]: 'Nagad',
    [PAYMENT_GATEWAY.GATEWAYS.ROCKET]: 'Rocket',
    [PAYMENT_GATEWAY.GATEWAYS.UPAY]: 'Upay',
    [PAYMENT_GATEWAY.GATEWAYS.TAP]: 'Tap',
    [PAYMENT_GATEWAY.GATEWAYS.RAZORPAY]: 'Razorpay',
    [PAYMENT_GATEWAY.GATEWAYS.PAYONEER]: 'Payoneer',
    [PAYMENT_GATEWAY.GATEWAYS.WISE]: 'Wise',
    [PAYMENT_GATEWAY.GATEWAYS.CRYPTO]: 'Cryptocurrency',
    [PAYMENT_GATEWAY.GATEWAYS.CUSTOM]: 'Custom',
  };
  return labels[gateway] || 'Unknown Gateway';
}

export function paymentgatewayGetCategoryLabel(category: PaymentGatewayCategory): string {
  const labels: Record<PaymentGatewayCategory, string> = {
    [PAYMENT_GATEWAY.CATEGORIES.CARD]: 'Card',
    [PAYMENT_GATEWAY.CATEGORIES.MOBILE]: 'Mobile Banking',
    [PAYMENT_GATEWAY.CATEGORIES.BANK]: 'Bank',
    [PAYMENT_GATEWAY.CATEGORIES.WALLET]: 'Digital Wallet',
    [PAYMENT_GATEWAY.CATEGORIES.CRYPTO]: 'Cryptocurrency',
    [PAYMENT_GATEWAY.CATEGORIES.OTHER]: 'Other',
  };
  return labels[category] || 'Unknown Category';
}

export function paymentgatewayGetStatusLabel(status: PaymentGatewayStatus): string {
  const labels: Record<PaymentGatewayStatus, string> = {
    [PAYMENT_GATEWAY.STATUSES.ACTIVE]: 'Active',
    [PAYMENT_GATEWAY.STATUSES.INACTIVE]: 'Inactive',
    [PAYMENT_GATEWAY.STATUSES.MAINTENANCE]: 'Maintenance',
    [PAYMENT_GATEWAY.STATUSES.SUSPENDED]: 'Suspended',
    [PAYMENT_GATEWAY.STATUSES.DEPRECATED]: 'Deprecated',
  };
  return labels[status] || 'Unknown Status';
}

export function paymentgatewayGetCurrencyLabel(currency: PaymentGatewayCurrency): string {
  const labels: Record<PaymentGatewayCurrency, string> = {
    [PAYMENT_GATEWAY.CURRENCIES.BDT]: 'Bangladeshi Taka',
    [PAYMENT_GATEWAY.CURRENCIES.USD]: 'US Dollar',
    [PAYMENT_GATEWAY.CURRENCIES.EUR]: 'Euro',
    [PAYMENT_GATEWAY.CURRENCIES.GBP]: 'British Pound',
    [PAYMENT_GATEWAY.CURRENCIES.CAD]: 'Canadian Dollar',
    [PAYMENT_GATEWAY.CURRENCIES.AUD]: 'Australian Dollar',
    [PAYMENT_GATEWAY.CURRENCIES.JPY]: 'Japanese Yen',
    [PAYMENT_GATEWAY.CURRENCIES.SGD]: 'Singapore Dollar',
    [PAYMENT_GATEWAY.CURRENCIES.INR]: 'Indian Rupee',
    [PAYMENT_GATEWAY.CURRENCIES.PKR]: 'Pakistani Rupee',
  };
  return labels[currency] || 'Unknown Currency';
}

export function paymentgatewayGetFee(gateway: PaymentGatewayType): PaymentGatewayFee {
  const fees: Record<PaymentGatewayType, PaymentGatewayFee> = {
    [PAYMENT_GATEWAY.GATEWAYS.STRIPE]: PAYMENT_GATEWAY.FEES.STRIPE,
    [PAYMENT_GATEWAY.GATEWAYS.PAYPAL]: PAYMENT_GATEWAY.FEES.PAYPAL,
    [PAYMENT_GATEWAY.GATEWAYS.SSLCOMMERZ]: PAYMENT_GATEWAY.FEES.SSLCOMMERZ,
    [PAYMENT_GATEWAY.GATEWAYS.AAMARPAY]: PAYMENT_GATEWAY.FEES.AAMARPAY,
    [PAYMENT_GATEWAY.GATEWAYS.BKASH]: PAYMENT_GATEWAY.FEES.BKASH,
    [PAYMENT_GATEWAY.GATEWAYS.NAGAD]: PAYMENT_GATEWAY.FEES.NAGAD,
    [PAYMENT_GATEWAY.GATEWAYS.ROCKET]: PAYMENT_GATEWAY.FEES.ROCKET,
    [PAYMENT_GATEWAY.GATEWAYS.UPAY]: PAYMENT_GATEWAY.FEES.UPAY,
    [PAYMENT_GATEWAY.GATEWAYS.TAP]: PAYMENT_GATEWAY.FEES.TAP,
    [PAYMENT_GATEWAY.GATEWAYS.RAZORPAY]: PAYMENT_GATEWAY.FEES.RAZORPAY,
    [PAYMENT_GATEWAY.GATEWAYS.PAYONEER]: PAYMENT_GATEWAY.FEES.PAYONEER,
    [PAYMENT_GATEWAY.GATEWAYS.WISE]: PAYMENT_GATEWAY.FEES.WISE,
    [PAYMENT_GATEWAY.GATEWAYS.CRYPTO]: PAYMENT_GATEWAY.FEES.CRYPTO,
    [PAYMENT_GATEWAY.GATEWAYS.CUSTOM]: PAYMENT_GATEWAY.FEES.CUSTOM,
  };
  return fees[gateway] || PAYMENT_GATEWAY.FEES.CUSTOM;
}

export function paymentgatewayIsActive(status: PaymentGatewayStatus): boolean {
  return status === PAYMENT_GATEWAY.STATUSES.ACTIVE;
}

export function paymentgatewayIsMaintenance(status: PaymentGatewayStatus): boolean {
  return status === PAYMENT_GATEWAY.STATUSES.MAINTENANCE;
}

export function paymentgatewayGetDefaultGateway(): PaymentGatewayType {
  return PAYMENT_GATEWAY.DEFAULTS.DEFAULT_GATEWAY;
}

export function paymentgatewayGetDefaultCurrency(): PaymentGatewayCurrency {
  return PAYMENT_GATEWAY.DEFAULTS.DEFAULT_CURRENCY;
}
