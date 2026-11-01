export const PAYMENT_GATEWAY = {
  STRIPE: 'stripe',
  PAYPAL: 'paypal',
  BRAINTREE: 'braintree',
  SQUARE: 'square',
  RAZORPAY: 'razorpay',
  SSLCOMMERZ: 'sslcommerz',
  BKASH: 'bkash',
  NAGAD: 'nagad',
  ROCKET: 'rocket',
  UPAY: 'upay',
  SURECASH: 'surecash',
  MANUAL: 'manual',
} as const;

export const PAYMENT_GATEWAY_STATUS = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  MAINTENANCE: 'maintenance',
  DEPRECATED: 'deprecated',
} as const;

export const PAYMENT_GATEWAY_ENV = {
  SANDBOX: 'sandbox',
  PRODUCTION: 'production',
} as const;

export type PaymentGatewayType = (typeof PAYMENT_GATEWAY)[keyof typeof PAYMENT_GATEWAY];
export type PaymentGatewayStatusType =
  (typeof PAYMENT_GATEWAY_STATUS)[keyof typeof PAYMENT_GATEWAY_STATUS];
