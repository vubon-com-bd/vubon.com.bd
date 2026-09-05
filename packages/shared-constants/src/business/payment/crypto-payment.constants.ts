/**
 * Crypto Payment Constants
 * ক্রিপ্টো পেমেন্ট সম্পর্কিত কনস্ট্যান্টস
 */

import { STATUS } from '../../common';

export const CRYPTO_PAYMENT = {
  STATUS: {
    PENDING: STATUS.PENDING,
    PROCESSING: 'processing',
    COMPLETED: 'completed',
    FAILED: 'failed',
    CANCELLED: 'cancelled',
    EXPIRED: 'expired',
  },
  CURRENCIES: {
    BTC: 'btc',
    ETH: 'eth',
    USDT: 'usdt',
    BNB: 'bnb',
    XRP: 'xrp',
    ADA: 'ada',
    SOL: 'sol',
    DOT: 'dot',
    DOGE: 'doge',
    SHIB: 'shib',
  },
  NETWORKS: {
    BITCOIN: 'bitcoin',
    ETHEREUM: 'ethereum',
    BSC: 'bsc',
    SOLANA: 'solana',
    RIPPLE: 'ripple',
    CARDANO: 'cardano',
  },
  DEFAULTS: {
    CONFIRMATIONS: 3,
    EXCHANGE_RATE_UPDATE: 300,
  },
} as const;

export type CryptoPaymentStatus =
  (typeof CRYPTO_PAYMENT.STATUS)[keyof typeof CRYPTO_PAYMENT.STATUS];
export type CryptoCurrency =
  (typeof CRYPTO_PAYMENT.CURRENCIES)[keyof typeof CRYPTO_PAYMENT.CURRENCIES];
export type CryptoNetwork = (typeof CRYPTO_PAYMENT.NETWORKS)[keyof typeof CRYPTO_PAYMENT.NETWORKS];
