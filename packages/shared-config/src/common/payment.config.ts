/**
 * Payment Configuration
 * পেমেন্ট কনফিগারেশন
 */
export type PaymentGateway = 'sslcommerz' | 'bkash' | 'nagad' | 'rocket';

export interface SSLCommerzConfig {
  storeId: string;
  storePassword: string;
  successUrl: string;
  failUrl: string;
  cancelUrl: string;
  ipnUrl: string;
  sandbox: boolean;
}

export interface BkashConfig {
  appKey: string;
  appSecret: string;
  username: string;
  password: string;
  sandbox: boolean;
  baseUrl: string;
}

export interface NagadConfig {
  merchantId: string;
  merchantSecret: string;
  pgPublicKey: string;
  merchantPublicKey: string;
  sandbox: boolean;
  baseUrl: string;
}

export interface RocketConfig {
  merchantId: string;
  merchantSecret: string;
  apiKey: string;
  sandbox: boolean;
  baseUrl: string;
}

export interface PaymentConfig {
  sslcommerz: SSLCommerzConfig;
  bkash: BkashConfig;
  nagad: NagadConfig;
  rocket: RocketConfig;
  defaultGateway: PaymentGateway;
}

export const paymentConfig = (): PaymentConfig => ({
  sslcommerz: {
    storeId: process.env.SSLCOMMERZ_STORE_ID || 'test_store_id',
    storePassword: process.env.SSLCOMMERZ_STORE_PASSWORD || 'test_store_password',
    successUrl: process.env.SSLCOMMERZ_SUCCESS_URL || 'http://localhost:3000/payment/success',
    failUrl: process.env.SSLCOMMERZ_FAIL_URL || 'http://localhost:3000/payment/fail',
    cancelUrl: process.env.SSLCOMMERZ_CANCEL_URL || 'http://localhost:3000/payment/cancel',
    ipnUrl: process.env.SSLCOMMERZ_IPN_URL || 'http://localhost:3000/api/payment/sslcommerz/ipn',
    sandbox: process.env.SSLCOMMERZ_SANDBOX === 'true',
  },
  bkash: {
    appKey: process.env.BKASH_APP_KEY || 'test_app_key',
    appSecret: process.env.BKASH_APP_SECRET || 'test_app_secret',
    username: process.env.BKASH_USERNAME || 'test_username',
    password: process.env.BKASH_PASSWORD || 'test_password',
    sandbox: process.env.BKASH_SANDBOX === 'true',
    baseUrl: process.env.BKASH_BASE_URL || 'https://tokenized.sandbox.bka.sh/v1.2.0-beta',
  },
  nagad: {
    merchantId: process.env.NAGAD_MERCHANT_ID || 'test_merchant_id',
    merchantSecret: process.env.NAGAD_MERCHANT_SECRET || 'test_merchant_secret',
    pgPublicKey: process.env.NAGAD_PG_PUBLIC_KEY || 'test_pg_public_key',
    merchantPublicKey: process.env.NAGAD_MERCHANT_PUBLIC_KEY || 'test_merchant_public_key',
    sandbox: process.env.NAGAD_SANDBOX === 'true',
    baseUrl: process.env.NAGAD_BASE_URL || 'https://sandbox.mynagad.com/api/dfs',
  },
  rocket: {
    merchantId: process.env.ROCKET_MERCHANT_ID || 'test_merchant_id',
    merchantSecret: process.env.ROCKET_MERCHANT_SECRET || 'test_merchant_secret',
    apiKey: process.env.ROCKET_API_KEY || 'test_api_key',
    sandbox: process.env.ROCKET_SANDBOX === 'true',
    baseUrl: process.env.ROCKET_BASE_URL || 'https://sandbox.rocket.com/api',
  },
  defaultGateway: (process.env.DEFAULT_PAYMENT_GATEWAY as PaymentGateway) || 'sslcommerz',
});
