/**
 * Payment Method Constants
 * Payment method definitions for checkout
 */

export const PAYMENT_METHOD = {
  // Payment Methods
  METHODS: {
    CREDIT_CARD: 'credit_card',
    DEBIT_CARD: 'debit_card',
    BANK_TRANSFER: 'bank_transfer',
    CASH_ON_DELIVERY: 'cash_on_delivery',
    MOBILE_BANKING: 'mobile_banking',
    BKASH: 'bkash',
    NAGAD: 'nagad',
    ROCKET: 'rocket',
    UPAY: 'upay',
    PAYPAL: 'paypal',
    STRIPE: 'stripe',
    SSLCOMMERZ: 'sslcommerz',
    AAMARPAY: 'aamarpay',
    DIGITAL_WALLET: 'digital_wallet',
    CRYPTO: 'crypto',
    GIFT_CARD: 'gift_card',
    INSTALLMENT: 'installment',
    CUSTOM: 'custom',
  } as const,

  // Payment Method Categories
  CATEGORIES: {
    CARD: 'card',
    BANK: 'bank',
    CASH: 'cash',
    MOBILE: 'mobile',
    WALLET: 'wallet',
    CRYPTO: 'crypto',
    INSTALLMENT: 'installment',
    OTHER: 'other',
  } as const,

  // Payment Method Statuses
  STATUSES: {
    ACTIVE: 'active',
    INACTIVE: 'inactive',
    PENDING: 'pending',
    SUSPENDED: 'suspended',
    DEPRECATED: 'deprecated',
  } as const,

  // Payment Method Icons (for UI)
  ICONS: {
    CREDIT_CARD: '💳',
    DEBIT_CARD: '💳',
    BANK_TRANSFER: '🏦',
    CASH_ON_DELIVERY: '💰',
    MOBILE_BANKING: '📱',
    BKASH: '📱',
    NAGAD: '📱',
    ROCKET: '📱',
    UPAY: '📱',
    PAYPAL: '💳',
    STRIPE: '💳',
    SSLCOMMERZ: '💳',
    AAMARPAY: '💳',
    DIGITAL_WALLET: '👛',
    CRYPTO: '₿',
    GIFT_CARD: '🎁',
    INSTALLMENT: '📅',
    CUSTOM: '⚙️',
  } as const,

  // Payment Method Defaults
  DEFAULTS: {
    DEFAULT_METHOD: 'cash_on_delivery',
    DEFAULT_CATEGORY: 'cash',
    DEFAULT_STATUS: 'active',
    DEFAULT_CURRENCY: 'BDT',
    DEFAULT_FEE_PERCENTAGE: 0,
    DEFAULT_FEE_FIXED: 0,
    DEFAULT_MIN_AMOUNT: 0,
    DEFAULT_MAX_AMOUNT: 0,
    DEFAULT_PROCESSING_TIME: 0,
  } as const,

  // Payment Method Limits
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

// Payment Methods
export type PaymentMethodType =
  (typeof PAYMENT_METHOD.METHODS)[keyof typeof PAYMENT_METHOD.METHODS];

// Payment Method Categories
export type PaymentMethodCategory =
  (typeof PAYMENT_METHOD.CATEGORIES)[keyof typeof PAYMENT_METHOD.CATEGORIES];

// Payment Method Statuses
export type PaymentMethodStatus =
  (typeof PAYMENT_METHOD.STATUSES)[keyof typeof PAYMENT_METHOD.STATUSES];

// Payment Method Icons
export type PaymentMethodIcon = (typeof PAYMENT_METHOD.ICONS)[keyof typeof PAYMENT_METHOD.ICONS];

// Payment Method Defaults
export type PaymentMethodDefault =
  (typeof PAYMENT_METHOD.DEFAULTS)[keyof typeof PAYMENT_METHOD.DEFAULTS];

// Payment Method Limits
export type PaymentMethodLimit = (typeof PAYMENT_METHOD.LIMITS)[keyof typeof PAYMENT_METHOD.LIMITS];

// Utility Functions
export function paymentmethodGetMethodLabel(method: PaymentMethodType): string {
  const labels: Record<PaymentMethodType, string> = {
    [PAYMENT_METHOD.METHODS.CREDIT_CARD]: 'Credit Card',
    [PAYMENT_METHOD.METHODS.DEBIT_CARD]: 'Debit Card',
    [PAYMENT_METHOD.METHODS.BANK_TRANSFER]: 'Bank Transfer',
    [PAYMENT_METHOD.METHODS.CASH_ON_DELIVERY]: 'Cash on Delivery',
    [PAYMENT_METHOD.METHODS.MOBILE_BANKING]: 'Mobile Banking',
    [PAYMENT_METHOD.METHODS.BKASH]: 'bKash',
    [PAYMENT_METHOD.METHODS.NAGAD]: 'Nagad',
    [PAYMENT_METHOD.METHODS.ROCKET]: 'Rocket',
    [PAYMENT_METHOD.METHODS.UPAY]: 'Upay',
    [PAYMENT_METHOD.METHODS.PAYPAL]: 'PayPal',
    [PAYMENT_METHOD.METHODS.STRIPE]: 'Stripe',
    [PAYMENT_METHOD.METHODS.SSLCOMMERZ]: 'SSLCommerz',
    [PAYMENT_METHOD.METHODS.AAMARPAY]: 'AamarPay',
    [PAYMENT_METHOD.METHODS.DIGITAL_WALLET]: 'Digital Wallet',
    [PAYMENT_METHOD.METHODS.CRYPTO]: 'Cryptocurrency',
    [PAYMENT_METHOD.METHODS.GIFT_CARD]: 'Gift Card',
    [PAYMENT_METHOD.METHODS.INSTALLMENT]: 'Installment',
    [PAYMENT_METHOD.METHODS.CUSTOM]: 'Custom',
  };
  return labels[method] || 'Unknown Payment Method';
}

export function paymentmethodGetCategoryLabel(category: PaymentMethodCategory): string {
  const labels: Record<PaymentMethodCategory, string> = {
    [PAYMENT_METHOD.CATEGORIES.CARD]: 'Card',
    [PAYMENT_METHOD.CATEGORIES.BANK]: 'Bank',
    [PAYMENT_METHOD.CATEGORIES.CASH]: 'Cash',
    [PAYMENT_METHOD.CATEGORIES.MOBILE]: 'Mobile Banking',
    [PAYMENT_METHOD.CATEGORIES.WALLET]: 'Digital Wallet',
    [PAYMENT_METHOD.CATEGORIES.CRYPTO]: 'Cryptocurrency',
    [PAYMENT_METHOD.CATEGORIES.INSTALLMENT]: 'Installment',
    [PAYMENT_METHOD.CATEGORIES.OTHER]: 'Other',
  };
  return labels[category] || 'Unknown Category';
}

export function paymentmethodGetStatusLabel(status: PaymentMethodStatus): string {
  const labels: Record<PaymentMethodStatus, string> = {
    [PAYMENT_METHOD.STATUSES.ACTIVE]: 'Active',
    [PAYMENT_METHOD.STATUSES.INACTIVE]: 'Inactive',
    [PAYMENT_METHOD.STATUSES.PENDING]: 'Pending',
    [PAYMENT_METHOD.STATUSES.SUSPENDED]: 'Suspended',
    [PAYMENT_METHOD.STATUSES.DEPRECATED]: 'Deprecated',
  };
  return labels[status] || 'Unknown Status';
}

export function paymentmethodGetMethodIcon(method: PaymentMethodType): PaymentMethodIcon {
  const icons: Record<PaymentMethodType, PaymentMethodIcon> = {
    [PAYMENT_METHOD.METHODS.CREDIT_CARD]: PAYMENT_METHOD.ICONS.CREDIT_CARD,
    [PAYMENT_METHOD.METHODS.DEBIT_CARD]: PAYMENT_METHOD.ICONS.DEBIT_CARD,
    [PAYMENT_METHOD.METHODS.BANK_TRANSFER]: PAYMENT_METHOD.ICONS.BANK_TRANSFER,
    [PAYMENT_METHOD.METHODS.CASH_ON_DELIVERY]: PAYMENT_METHOD.ICONS.CASH_ON_DELIVERY,
    [PAYMENT_METHOD.METHODS.MOBILE_BANKING]: PAYMENT_METHOD.ICONS.MOBILE_BANKING,
    [PAYMENT_METHOD.METHODS.BKASH]: PAYMENT_METHOD.ICONS.BKASH,
    [PAYMENT_METHOD.METHODS.NAGAD]: PAYMENT_METHOD.ICONS.NAGAD,
    [PAYMENT_METHOD.METHODS.ROCKET]: PAYMENT_METHOD.ICONS.ROCKET,
    [PAYMENT_METHOD.METHODS.UPAY]: PAYMENT_METHOD.ICONS.UPAY,
    [PAYMENT_METHOD.METHODS.PAYPAL]: PAYMENT_METHOD.ICONS.PAYPAL,
    [PAYMENT_METHOD.METHODS.STRIPE]: PAYMENT_METHOD.ICONS.STRIPE,
    [PAYMENT_METHOD.METHODS.SSLCOMMERZ]: PAYMENT_METHOD.ICONS.SSLCOMMERZ,
    [PAYMENT_METHOD.METHODS.AAMARPAY]: PAYMENT_METHOD.ICONS.AAMARPAY,
    [PAYMENT_METHOD.METHODS.DIGITAL_WALLET]: PAYMENT_METHOD.ICONS.DIGITAL_WALLET,
    [PAYMENT_METHOD.METHODS.CRYPTO]: PAYMENT_METHOD.ICONS.CRYPTO,
    [PAYMENT_METHOD.METHODS.GIFT_CARD]: PAYMENT_METHOD.ICONS.GIFT_CARD,
    [PAYMENT_METHOD.METHODS.INSTALLMENT]: PAYMENT_METHOD.ICONS.INSTALLMENT,
    [PAYMENT_METHOD.METHODS.CUSTOM]: PAYMENT_METHOD.ICONS.CUSTOM,
  };
  return icons[method] || PAYMENT_METHOD.ICONS.CUSTOM;
}

export function paymentmethodIsCardMethod(method: PaymentMethodType): boolean {
  const cardMethods: PaymentMethodType[] = [
    PAYMENT_METHOD.METHODS.CREDIT_CARD,
    PAYMENT_METHOD.METHODS.DEBIT_CARD,
  ];
  return cardMethods.includes(method);
}

export function paymentmethodIsMobileMethod(method: PaymentMethodType): boolean {
  const mobileMethods: PaymentMethodType[] = [
    PAYMENT_METHOD.METHODS.MOBILE_BANKING,
    PAYMENT_METHOD.METHODS.BKASH,
    PAYMENT_METHOD.METHODS.NAGAD,
    PAYMENT_METHOD.METHODS.ROCKET,
    PAYMENT_METHOD.METHODS.UPAY,
  ];
  return mobileMethods.includes(method);
}

export function paymentmethodIsCashMethod(method: PaymentMethodType): boolean {
  return method === PAYMENT_METHOD.METHODS.CASH_ON_DELIVERY;
}

export function paymentmethodIsOnlineMethod(method: PaymentMethodType): boolean {
  const onlineMethods: PaymentMethodType[] = [
    PAYMENT_METHOD.METHODS.CREDIT_CARD,
    PAYMENT_METHOD.METHODS.DEBIT_CARD,
    PAYMENT_METHOD.METHODS.BANK_TRANSFER,
    PAYMENT_METHOD.METHODS.PAYPAL,
    PAYMENT_METHOD.METHODS.STRIPE,
    PAYMENT_METHOD.METHODS.SSLCOMMERZ,
    PAYMENT_METHOD.METHODS.AAMARPAY,
    PAYMENT_METHOD.METHODS.DIGITAL_WALLET,
    PAYMENT_METHOD.METHODS.CRYPTO,
  ];
  return onlineMethods.includes(method);
}

export function paymentmethodGetDefaultMethod(): PaymentMethodType {
  return PAYMENT_METHOD.DEFAULTS.DEFAULT_METHOD;
}

export function paymentmethodIsActive(status: PaymentMethodStatus): boolean {
  return status === PAYMENT_METHOD.STATUSES.ACTIVE;
}
