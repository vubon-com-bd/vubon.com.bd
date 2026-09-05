/**
 * Payment Settings Config
 * পেমেন্ট সেটিংস কনফিগারেশন
 */

import { PAYMENT_STATUS } from '@vubon/shared-constants';

export interface PaymentSettingsConfig {
  enabled: boolean;
  status: Record<string, string>;
  defaultMethod: string;
  minAmount: number;
  maxAmount: number;
  currency: string;
  supportedMethods: string[];
  supportedGateways: string[];
  taxRate: number;
  feePercentage: number;
  feeFixed: number;
  autoConfirm: boolean;
  requireApproval: boolean;
  maxRetries: number;
  retryDelay: number;
  timeout: number;
}

export const paymentSettingsConfig: PaymentSettingsConfig = {
  enabled: true,
  status: {
    pending: PAYMENT_STATUS.PENDING,
    processing: PAYMENT_STATUS.PROCESSING,
    completed: PAYMENT_STATUS.COMPLETED,
    failed: PAYMENT_STATUS.FAILED,
    cancelled: PAYMENT_STATUS.CANCELLED,
    refunded: PAYMENT_STATUS.REFUNDED,
    partial_refunded: PAYMENT_STATUS.PARTIAL_REFUNDED,
    authorized: PAYMENT_STATUS.AUTHORIZED,
    captured: PAYMENT_STATUS.CAPTURED,
    voided: PAYMENT_STATUS.VOIDED,
    expired: PAYMENT_STATUS.EXPIRED,
    disputed: PAYMENT_STATUS.DISPUTED,
    chargeback: PAYMENT_STATUS.CHARGEBACK,
  },
  defaultMethod: 'bkash',
  minAmount: 1,
  maxAmount: 1000000,
  currency: 'BDT',
  supportedMethods: [
    'bkash',
    'nagad',
    'rocket',
    'sslcommerz',
    'stripe',
    'paypal',
    'credit_card',
    'debit_card',
    'bank_transfer',
    'cash_on_delivery',
  ],
  supportedGateways: ['sslcommerz', 'bkash', 'nagad', 'rocket', 'stripe', 'paypal'],
  taxRate: 15,
  feePercentage: 2.5,
  feeFixed: 0,
  autoConfirm: false,
  requireApproval: true,
  maxRetries: 3,
  retryDelay: 60,
  timeout: 30,
} as const;

export type PaymentSettingsConfigType = typeof paymentSettingsConfig;
