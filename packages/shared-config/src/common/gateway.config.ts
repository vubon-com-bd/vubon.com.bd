/**
 * Gateway Configuration
 * গেটওয়ে কনফিগারেশন
 */
export interface GatewayConfig {
  defaultGateway: 'sslcommerz' | 'bkash' | 'nagad' | 'rocket';
  fallbackGateway: 'sslcommerz' | 'bkash' | 'nagad' | 'rocket';
  timeout: number;
  retryAttempts: number;
  retryDelay: number;
  sslcommerz: {
    storeId: string;
    storePassword: string;
    sandbox: boolean;
    apiUrl: string;
  };
  bkash: {
    appKey: string;
    appSecret: string;
    username: string;
    password: string;
    sandbox: boolean;
    apiUrl: string;
  };
  nagad: {
    merchantId: string;
    merchantSecret: string;
    sandbox: boolean;
    apiUrl: string;
  };
  rocket: {
    merchantId: string;
    merchantSecret: string;
    apiKey: string;
    sandbox: boolean;
    apiUrl: string;
  };
}

export const createGatewayConfig = (): GatewayConfig => ({
  defaultGateway: 'sslcommerz',
  fallbackGateway: 'bkash',
  timeout: 30000,
  retryAttempts: 3,
  retryDelay: 1000,
  sslcommerz: {
    storeId: process.env.SSLCOMMERZ_STORE_ID || 'test_store_id',
    storePassword: process.env.SSLCOMMERZ_STORE_PASSWORD || 'test_store_password',
    sandbox: process.env.SSLCOMMERZ_SANDBOX === 'true',
    apiUrl: process.env.SSLCOMMERZ_API_URL || 'https://sandbox.sslcommerz.com',
  },
  bkash: {
    appKey: process.env.BKASH_APP_KEY || 'test_app_key',
    appSecret: process.env.BKASH_APP_SECRET || 'test_app_secret',
    username: process.env.BKASH_USERNAME || 'test_username',
    password: process.env.BKASH_PASSWORD || 'test_password',
    sandbox: process.env.BKASH_SANDBOX === 'true',
    apiUrl: process.env.BKASH_API_URL || 'https://tokenized.sandbox.bka.sh/v1.2.0-beta',
  },
  nagad: {
    merchantId: process.env.NAGAD_MERCHANT_ID || 'test_merchant_id',
    merchantSecret: process.env.NAGAD_MERCHANT_SECRET || 'test_merchant_secret',
    sandbox: process.env.NAGAD_SANDBOX === 'true',
    apiUrl: process.env.NAGAD_API_URL || 'https://sandbox.mynagad.com/api/dfs',
  },
  rocket: {
    merchantId: process.env.ROCKET_MERCHANT_ID || 'test_merchant_id',
    merchantSecret: process.env.ROCKET_MERCHANT_SECRET || 'test_merchant_secret',
    apiKey: process.env.ROCKET_API_KEY || 'test_api_key',
    sandbox: process.env.ROCKET_SANDBOX === 'true',
    apiUrl: process.env.ROCKET_API_URL || 'https://sandbox.rocket.com/api',
  },
});
