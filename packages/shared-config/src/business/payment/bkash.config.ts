/**
 * bKash Config
 * bKash পেমেন্ট গেটওয়ে কনফিগারেশন
 */

export interface BkashConfig {
  apiKey: string;
  secret: string;
  username: string;
  password: string;
  sandbox: boolean;
  currency: string;
  apiVersion: string;
  timeout: number;
  retryAttempts: number;
}

export const bkashConfig: BkashConfig = {
  apiKey: process.env.BKASH_API_KEY || 'test_api_key',
  secret: process.env.BKASH_SECRET || 'test_secret',
  username: process.env.BKASH_USERNAME || 'test_username',
  password: process.env.BKASH_PASSWORD || 'test_password',
  sandbox: process.env.NODE_ENV !== 'production',
  currency: 'BDT',
  apiVersion: '1.2.0',
  timeout: 30000,
  retryAttempts: 3,
} as const;

export type BkashConfigType = typeof bkashConfig;
