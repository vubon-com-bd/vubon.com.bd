/**
 * SSLCommerz Config
 * SSLCommerz পেমেন্ট গেটওয়ে কনফিগারেশন
 */

export interface SSLCommerzConfig {
  storeId: string;
  storePassword: string;
  sandbox: boolean;
  successUrl: string;
  failUrl: string;
  cancelUrl: string;
  ipnUrl: string;
  currency: string;
  apiVersion: string;
  timeout: number;
  retryAttempts: number;
}

export const sslcommerzConfig: SSLCommerzConfig = {
  storeId: process.env.SSLCOMMERZ_STORE_ID || 'test_store_id',
  storePassword: process.env.SSLCOMMERZ_STORE_PASSWORD || 'test_store_password',
  sandbox: process.env.NODE_ENV !== 'production',
  successUrl: '/payment/success',
  failUrl: '/payment/fail',
  cancelUrl: '/payment/cancel',
  ipnUrl: '/payment/ipn',
  currency: 'BDT',
  apiVersion: '1.0.0',
  timeout: 30000,
  retryAttempts: 3,
} as const;

export type SSLCommerzConfigType = typeof sslcommerzConfig;
