/**
 * Payment Method Constants (EXTENDS common/types + common/status)
 * @module shared-constants/business/payment/payment-method.constants
 */

import { TYPES } from '../../common/types.constants';
import { STATUS } from '../../common/status.constants';
import { VERIFICATION } from '../../common/verification.constants';
import { SECURITY } from '../../common/security.constants';
import { CURRENCY } from '../../common/currency.constants';

export const PAYMENT_METHOD = {
  // Base types from common
  ...TYPES,

  // Status from common
  STATUS: STATUS,

  // Verification from common
  VERIFICATION: VERIFICATION,

  // Security from common
  SECURITY: SECURITY,

  // Currency from common
  CURRENCY: CURRENCY,

  // Payment method specific
  DEFAULT_PAYMENT_METHOD: 'bkash',
  PAYMENT_METHOD_CACHE_TTL: 3600,
  MAX_PAYMENT_METHODS_PER_USER: 10,
  PAYMENT_METHOD_EXPIRY_DAYS: 365,

  // Payment method type
  PAYMENT_METHOD_TYPE: {
    MOBILE_MONEY: 'mobile_money',
    CARD: 'card',
    BANK: 'bank',
    DIGITAL_WALLET: 'digital_wallet',
    CRYPTO: 'crypto',
    CASH: 'cash',
    OTHER: 'other',
  } as const,

  // Payment method status
  PAYMENT_METHOD_STATUS: {
    ACTIVE: 'active',
    INACTIVE: 'inactive',
    PENDING: 'pending',
    DISABLED: 'disabled',
    SUSPENDED: 'suspended',
    VERIFIED: 'verified',
    UNVERIFIED: 'unverified',
    EXPIRED: 'expired',
    REVOKED: 'revoked',
  } as const,

  // Payment method provider (Bangladesh)
  PAYMENT_METHOD_PROVIDER: {
    BKASH: 'bkash',
    NAGAD: 'nagad',
    ROCKET: 'rocket',
    UPAY: 'upay',
    TAP: 'tap',
    OK_WALLET: 'ok_wallet',
    MCASH: 'mcash',
    MYCASH: 'mycash',
    SSLCOMMERZ: 'sslcommerz',
    AAMARPAY: 'aamarpay',
    PORT_WALLET: 'port_wallet',
    STRIPE: 'stripe',
    PAYPAL: 'paypal',
    BANK_TRANSFER: 'bank_transfer',
    CASH_ON_DELIVERY: 'cash_on_delivery',
    CREDIT_CARD: 'credit_card',
    DEBIT_CARD: 'debit_card',
    BITCOIN: 'bitcoin',
    ETHEREUM: 'ethereum',
    USDT: 'usdt',
    GOOGLE_PAY: 'google_pay',
    APPLE_PAY: 'apple_pay',
    SAMSUNG_PAY: 'samsung_pay',
  } as const,

  // Payment method validation
  PAYMENT_METHOD_VALIDATION: {
    REQUIRES_OTP: true,
    REQUIRES_PIN: false,
    REQUIRES_CVV: false,
    REQUIRES_EXPIRY: false,
    REQUIRES_ACCOUNT_NUMBER: false,
    REQUIRES_VERIFICATION: true,
    REQUIRES_BIOMETRIC: false,
  } as const,

  // Payment method verification
  PAYMENT_METHOD_VERIFICATION: {
    OTP_LENGTH: 6,
    OTP_EXPIRY_SECONDS: 300,
    MAX_VERIFICATION_ATTEMPTS: 3,
    RESEND_COOLDOWN: 60,
  } as const,
} as const;

export type PaymentMethodType =
  (typeof PAYMENT_METHOD.PAYMENT_METHOD_TYPE)[keyof typeof PAYMENT_METHOD.PAYMENT_METHOD_TYPE];
export type PaymentMethodStatus =
  (typeof PAYMENT_METHOD.PAYMENT_METHOD_STATUS)[keyof typeof PAYMENT_METHOD.PAYMENT_METHOD_STATUS];
export type PaymentMethodProvider =
  (typeof PAYMENT_METHOD.PAYMENT_METHOD_PROVIDER)[keyof typeof PAYMENT_METHOD.PAYMENT_METHOD_PROVIDER];

export const PAYMENT_METHOD_STATUS_LABELS: Record<PaymentMethodStatus, string> = {
  active: 'Active',
  inactive: 'Inactive',
  pending: 'Pending',
  disabled: 'Disabled',
  suspended: 'Suspended',
  verified: 'Verified',
  unverified: 'Unverified',
  expired: 'Expired',
  revoked: 'Revoked',
};

export const PAYMENT_METHOD_STATUS_COLORS: Record<PaymentMethodStatus, string> = {
  active: '#22c55e',
  inactive: '#9ca3af',
  pending: '#eab308',
  disabled: '#dc2626',
  suspended: '#f59e0b',
  verified: '#22c55e',
  unverified: '#f59e0b',
  expired: '#9ca3af',
  revoked: '#dc2626',
};
