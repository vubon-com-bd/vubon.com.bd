/**
 * Crypto Payment Constants (EXTENDS common/types)
 * @module shared-constants/business/payment/crypto-payment.constants
 */

import { TYPES } from '../../common/types.constants';

export const CRYPTO_PAYMENT = {
  // Base types from common
  ...TYPES,

  // Crypto specific
  DEFAULT_CURRENCY: 'BTC',
  CRYPTO_CACHE_TTL: 3600,
  MIN_CONFIRMATIONS: 3,
  MAX_CONFIRMATIONS: 6,

  // Crypto status
  CRYPTO_PAYMENT_STATUS: {
    PENDING: 'pending',
    PROCESSING: 'processing',
    COMPLETED: 'completed',
    FAILED: 'failed',
    CANCELLED: 'cancelled',
    REFUNDED: 'refunded',
    CONFIRMING: 'confirming',
    TIMEOUT: 'timeout',
    REJECTED: 'rejected',
  } as const,

  // Crypto currency
  CRYPTO_CURRENCY: {
    BITCOIN: 'bitcoin',
    ETHEREUM: 'ethereum',
    USDT: 'usdt',
    BINANCE: 'binance',
    SOLANA: 'solana',
    CARDANO: 'cardano',
    POLKADOT: 'polkadot',
    DOGECOIN: 'dogecoin',
    LITECOIN: 'litecoin',
    RIPPLE: 'ripple',
    TRON: 'tron',
    MATIC: 'matic',
    USDC: 'usdc',
  } as const,

  // Crypto network
  CRYPTO_NETWORK: {
    BITCOIN: 'bitcoin',
    ETHEREUM: 'ethereum',
    BSC: 'bsc',
    SOLANA: 'solana',
    POLKADOT: 'polkadot',
    TRON: 'tron',
    MATIC: 'matic',
    RIPPLE: 'ripple',
  } as const,

  // Crypto validation
  CRYPTO_VALIDATION: {
    MIN_AMOUNT: 0.0001,
    MAX_AMOUNT: 1000,
    REQUIRED_CONFIRMATIONS: 3,
    TIMEOUT_MINUTES: 60,
  } as const,
} as const;

export type CryptoPaymentStatus =
  (typeof CRYPTO_PAYMENT.CRYPTO_PAYMENT_STATUS)[keyof typeof CRYPTO_PAYMENT.CRYPTO_PAYMENT_STATUS];
export type CryptoCurrency =
  (typeof CRYPTO_PAYMENT.CRYPTO_CURRENCY)[keyof typeof CRYPTO_PAYMENT.CRYPTO_CURRENCY];
export type CryptoNetwork =
  (typeof CRYPTO_PAYMENT.CRYPTO_NETWORK)[keyof typeof CRYPTO_PAYMENT.CRYPTO_NETWORK];

export const CRYPTO_PAYMENT_STATUS_LABELS: Record<CryptoPaymentStatus, string> = {
  pending: 'Pending',
  processing: 'Processing',
  completed: 'Completed',
  failed: 'Failed',
  cancelled: 'Cancelled',
  refunded: 'Refunded',
  confirming: 'Confirming',
  timeout: 'Timeout',
  rejected: 'Rejected',
};

export const CRYPTO_PAYMENT_STATUS_COLORS: Record<CryptoPaymentStatus, string> = {
  pending: '#eab308',
  processing: '#60a5fa',
  completed: '#22c55e',
  failed: '#ef4444',
  cancelled: '#dc2626',
  refunded: '#6b7280',
  confirming: '#8b5cf6',
  timeout: '#9ca3af',
  rejected: '#ef4444',
};
