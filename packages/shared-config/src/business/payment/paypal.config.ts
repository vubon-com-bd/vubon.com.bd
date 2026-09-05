/**
 * PayPal Config
 * PayPal পেমেন্ট গেটওয়ে কনফিগারেশন
 */

export interface PayPalConfig {
  clientId: string;
  clientSecret: string;
  sandbox: boolean;
  currency: string;
  apiVersion: string;
  timeout: number;
  retryAttempts: number;
}

export const paypalConfig: PayPalConfig = {
  clientId: process.env.PAYPAL_CLIENT_ID || 'test_client_id',
  clientSecret: process.env.PAYPAL_CLIENT_SECRET || 'test_client_secret',
  sandbox: process.env.NODE_ENV !== 'production',
  currency: 'USD',
  apiVersion: '2.0',
  timeout: 30000,
  retryAttempts: 3,
} as const;

export type PayPalConfigType = typeof paypalConfig;
