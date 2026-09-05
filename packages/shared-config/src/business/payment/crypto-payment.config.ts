/**
 * Crypto Payment Config
 * ক্রিপ্টো পেমেন্ট কনফিগারেশন
 */

export interface CryptoPaymentConfig {
  enabled: boolean;
  allowedCurrencies: string[];
  minAmount: number;
  maxAmount: number;
  confirmations: number;
  exchangeRateUpdateInterval: number;
  supportedNetworks: string[];
}

export const cryptoPaymentConfig: CryptoPaymentConfig = {
  enabled: true,
  allowedCurrencies: ['BTC', 'ETH', 'USDT', 'BNB', 'XRP', 'ADA', 'SOL', 'DOT'],
  minAmount: 1,
  maxAmount: 10000,
  confirmations: 3,
  exchangeRateUpdateInterval: 300,
  supportedNetworks: ['bitcoin', 'ethereum', 'bsc', 'solana', 'ripple', 'cardano'],
} as const;

export type CryptoPaymentConfigType = typeof cryptoPaymentConfig;
