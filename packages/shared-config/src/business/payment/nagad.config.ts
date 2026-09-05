/**
 * Nagad Config
 * Nagad পেমেন্ট গেটওয়ে কনফিগারেশন
 */

export interface NagadConfig {
  apiKey: string;
  secret: string;
  merchantId: string;
  sandbox: boolean;
  currency: string;
  apiVersion: string;
  timeout: number;
  retryAttempts: number;
}

export const nagadConfig: NagadConfig = {
  apiKey: process.env.NAGAD_API_KEY || 'test_api_key',
  secret: process.env.NAGAD_SECRET || 'test_secret',
  merchantId: process.env.NAGAD_MERCHANT_ID || 'test_merchant_id',
  sandbox: process.env.NODE_ENV !== 'production',
  currency: 'BDT',
  apiVersion: '1.0.0',
  timeout: 30000,
  retryAttempts: 3,
} as const;

export type NagadConfigType = typeof nagadConfig;
