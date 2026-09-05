/**
 * Stripe Config
 * Stripe পেমেন্ট গেটওয়ে কনফিগারেশন
 */

export interface StripeConfig {
  apiKey: string;
  webhookSecret: string;
  currency: string;
  apiVersion: string;
  timeout: number;
  retryAttempts: number;
}

export const stripeConfig: StripeConfig = {
  apiKey: process.env.STRIPE_API_KEY || 'test_api_key',
  webhookSecret: process.env.STRIPE_WEBHOOK_SECRET || 'test_webhook_secret',
  currency: 'USD',
  apiVersion: '2023-10-16',
  timeout: 30000,
  retryAttempts: 3,
} as const;

export type StripeConfigType = typeof stripeConfig;
