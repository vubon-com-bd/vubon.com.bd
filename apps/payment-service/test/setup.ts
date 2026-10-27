/**
 * Global test setup
 * - Configures test timeout
 * - Mocks environment
 */
import { jest } from '@jest/globals';

// Set test environment defaults
process.env.NODE_ENV = 'test';
process.env.PAYMENT_ENABLED = 'true';

// Increase timeout for slow CI
jest.setTimeout(30000);

// Silence console in tests (unless DEBUG_TESTS=true)
if (process.env.DEBUG_TESTS !== 'true') {
  global.console = {
    ...console,
    log: jest.fn(),
    debug: jest.fn(),
    info: jest.fn(),
    warn: jest.fn(),
  };
}


// ─── Test Gateway Credentials (fake values for tests) ───
// BKash
process.env.BKASH_ENABLED = 'true';
process.env.BKASH_APP_KEY = 'test-bkash-app-key';
process.env.BKASH_APP_SECRET = 'test-bkash-app-secret';
process.env.BKASH_USERNAME = 'test-bkash-user';
process.env.BKASH_PASSWORD = 'test-bkash-pass';
process.env.BKASH_BASE_URL = 'https://tokenized.sandbox.bka.sh/v1.2.0-beta';

// Nagad
process.env.NAGAD_ENABLED = 'true';
process.env.NAGAD_MERCHANT_ID = 'test-nagad-merchant';
process.env.NAGAD_MERCHANT_PRIVATE_KEY = 'test-nagad-pk';
process.env.NAGAD_PG_PUBLIC_KEY = 'test-nagad-pg-pk';
process.env.NAGAD_BASE_URL = 'https://sandbox-ssl.mynagad.com';

// Rocket
process.env.ROCKET_ENABLED = 'true';
process.env.ROCKET_MERCHANT_ID = 'test-rocket-merchant';
process.env.ROCKET_API_KEY = 'test-rocket-api-key';
process.env.ROCKET_BASE_URL = 'https://sandbox.rocket.com.bd';

// Stripe
process.env.STRIPE_ENABLED = 'true';
process.env.STRIPE_SECRET_KEY = 'sk_test_fake';
process.env.STRIPE_PUBLISHABLE_KEY = 'pk_test_fake';
process.env.STRIPE_WEBHOOK_SECRET = 'whsec_test_fake';
process.env.STRIPE_BASE_URL = 'https://api.stripe.com';

// PayPal
process.env.PAYPAL_ENABLED = 'true';
process.env.PAYPAL_CLIENT_ID = 'test-paypal-client-id';
process.env.PAYPAL_CLIENT_SECRET = 'test-paypal-client-secret';
process.env.PAYPAL_WEBHOOK_ID = 'test-paypal-webhook-id';
process.env.PAYPAL_BASE_URL = 'https://api-m.sandbox.paypal.com';

// SSLCommerz
process.env.SSLCOMMERZ_ENABLED = 'true';
process.env.SSLCOMMERZ_STORE_ID = 'test-sslcommerz-store';
process.env.SSLCOMMERZ_STORE_PASSWORD = 'test-sslcommerz-pass';
process.env.SSLCOMMERZ_BASE_URL = 'https://sandbox.sslcommerz.com';

// AamarPay
process.env.AAMARPAY_ENABLED = 'true';
process.env.AAMARPAY_STORE_ID = 'test-aamarpay-store';
process.env.AAMARPAY_SIGNATURE_KEY = 'test-aamarpay-sig';
process.env.AAMARPAY_BASE_URL = 'https://sandbox.aamarpay.com';

// Crypto
process.env.CRYPTO_ENABLED = 'true';
process.env.CRYPTO_API_KEY = 'test-crypto-key';
process.env.CRYPTO_BASE_URL = 'https://api.crypto.com';

// COD
process.env.COD_ENABLED = 'true';

// Gateway
process.env.PAYMENT_ACTIVE_GATEWAY = 'bkash';
process.env.PAYMENT_GATEWAY_ENV = 'sandbox';
process.env.PAYMENT_WEBHOOK_VERIFY = 'false';

// ─── End Test Gateway Credentials ───

export {};
