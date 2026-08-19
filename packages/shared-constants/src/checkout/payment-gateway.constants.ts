// External libraries
// No external imports needed

// Shared packages
// No shared package imports needed

// Project files
// No project file imports needed

export enum PaymentGateway {
  SSLCOMMERZ = 'SSLCOMMERZ',
  BKASH = 'BKASH',
  NAGAD = 'NAGAD',
  ROCKET = 'ROCKET',
  STRIPE = 'STRIPE',
  PAYPAL = 'PAYPAL',
}

export enum GatewayStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  MAINTENANCE = 'MAINTENANCE',
}

export interface GatewayFeature {
  recurring: boolean;
  refund: boolean;
  partialRefund: boolean;
  subscription: boolean;
  webhook: boolean;
}

export const GATEWAY_FEATURES: Record<PaymentGateway, GatewayFeature> = {
  [PaymentGateway.SSLCOMMERZ]: {
    recurring: true,
    refund: true,
    partialRefund: true,
    subscription: true,
    webhook: true,
  },
  [PaymentGateway.BKASH]: {
    recurring: true,
    refund: true,
    partialRefund: false,
    subscription: false,
    webhook: true,
  },
  [PaymentGateway.NAGAD]: {
    recurring: true,
    refund: true,
    partialRefund: false,
    subscription: false,
    webhook: true,
  },
  [PaymentGateway.ROCKET]: {
    recurring: false,
    refund: true,
    partialRefund: false,
    subscription: false,
    webhook: false,
  },
  [PaymentGateway.STRIPE]: {
    recurring: true,
    refund: true,
    partialRefund: true,
    subscription: true,
    webhook: true,
  },
  [PaymentGateway.PAYPAL]: {
    recurring: true,
    refund: true,
    partialRefund: true,
    subscription: true,
    webhook: true,
  },
} as const;

export const GATEWAY_CONFIG = {
  [PaymentGateway.SSLCOMMERZ]: {
    apiUrl: 'https://sandbox.sslcommerz.com/gwprocess/v3/api.php',
    timeout: 30000,
    retryAttempts: 3,
    sandboxUrl: 'https://sandbox.sslcommerz.com/gwprocess/v3/api.php',
    productionUrl: 'https://secure.sslcommerz.com/gwprocess/v3/api.php',
  },
  [PaymentGateway.BKASH]: {
    apiUrl: 'https://tokenized.sandbox.bka.sh/v1.2.0-beta/tokenized/checkout',
    timeout: 25000,
    retryAttempts: 3,
    sandboxUrl: 'https://tokenized.sandbox.bka.sh/v1.2.0-beta/tokenized/checkout',
    productionUrl: 'https://tokenized.bka.sh/v1.2.0-beta/tokenized/checkout',
  },
  [PaymentGateway.NAGAD]: {
    apiUrl: 'https://api.nagad.com/v1/payment',
    timeout: 25000,
    retryAttempts: 3,
    sandboxUrl: 'https://api.nagad.com/v1/payment',
    productionUrl: 'https://api.nagad.com/v1/payment',
  },
  [PaymentGateway.ROCKET]: {
    apiUrl: 'https://api.rocket.com/v1/payment',
    timeout: 25000,
    retryAttempts: 3,
    sandboxUrl: 'https://api.rocket.com/v1/payment',
    productionUrl: 'https://api.rocket.com/v1/payment',
  },
  [PaymentGateway.STRIPE]: {
    apiUrl: 'https://api.stripe.com/v1',
    timeout: 30000,
    retryAttempts: 5,
    sandboxUrl: 'https://api.stripe.com/v1',
    productionUrl: 'https://api.stripe.com/v1',
  },
  [PaymentGateway.PAYPAL]: {
    apiUrl: 'https://api-m.sandbox.paypal.com/v2',
    timeout: 30000,
    retryAttempts: 5,
    sandboxUrl: 'https://api-m.sandbox.paypal.com/v2',
    productionUrl: 'https://api-m.paypal.com/v2',
  },
} as const;

export type GatewayConfig = typeof GATEWAY_CONFIG;

export const GATEWAY_STATUS = {
  [PaymentGateway.SSLCOMMERZ]: GatewayStatus.ACTIVE,
  [PaymentGateway.BKASH]: GatewayStatus.ACTIVE,
  [PaymentGateway.NAGAD]: GatewayStatus.ACTIVE,
  [PaymentGateway.ROCKET]: GatewayStatus.ACTIVE,
  [PaymentGateway.STRIPE]: GatewayStatus.ACTIVE,
  [PaymentGateway.PAYPAL]: GatewayStatus.ACTIVE,
} as const;

export type GatewayStatusMap = typeof GATEWAY_STATUS;

export function getGatewayConfig(gateway: PaymentGateway) {
  return GATEWAY_CONFIG[gateway];
}

export function getGatewayStatus(gateway: PaymentGateway): GatewayStatus {
  return GATEWAY_STATUS[gateway];
}

export function isGatewayActive(gateway: PaymentGateway): boolean {
  return getGatewayStatus(gateway) === GatewayStatus.ACTIVE;
}

export function getGatewayApiUrl(gateway: PaymentGateway, isProduction: boolean = false): string {
  const config = GATEWAY_CONFIG[gateway];
  return isProduction ? config.productionUrl : config.sandboxUrl;
}

export function getGatewayTimeout(gateway: PaymentGateway): number {
  return GATEWAY_CONFIG[gateway].timeout;
}

export function getGatewayRetryAttempts(gateway: PaymentGateway): number {
  return GATEWAY_CONFIG[gateway].retryAttempts;
}

export function supportsRecurring(gateway: PaymentGateway): boolean {
  return GATEWAY_FEATURES[gateway].recurring;
}

export function supportsRefund(gateway: PaymentGateway): boolean {
  return GATEWAY_FEATURES[gateway].refund;
}

export function supportsPartialRefund(gateway: PaymentGateway): boolean {
  return GATEWAY_FEATURES[gateway].partialRefund;
}

export function supportsSubscription(gateway: PaymentGateway): boolean {
  return GATEWAY_FEATURES[gateway].subscription;
}
