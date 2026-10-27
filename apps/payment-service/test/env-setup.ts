/**
 * Env-only setup — runs in setupFiles (before anything else)
 * Sets ALL test env vars BEFORE any module loads.
 */
process.env.NODE_ENV = 'test';
process.env.PAYMENT_ENABLED = 'true';

// Gateways
process.env.BKASH_ENABLED = 'true';
process.env.BKASH_APP_KEY = 'test';
process.env.BKASH_APP_SECRET = 'test';
process.env.BKASH_USERNAME = 'test';
process.env.BKASH_PASSWORD = 'test';

process.env.NAGAD_ENABLED = 'true';
process.env.NAGAD_MERCHANT_ID = 'test';
process.env.NAGAD_MERCHANT_PRIVATE_KEY = 'test';
process.env.NAGAD_PG_PUBLIC_KEY = 'test';

process.env.ROCKET_ENABLED = 'true';
process.env.ROCKET_MERCHANT_ID = 'test';
process.env.ROCKET_API_KEY = 'test';

process.env.STRIPE_ENABLED = 'true';
process.env.STRIPE_SECRET_KEY = 'sk_test_fake';
process.env.STRIPE_WEBHOOK_SECRET = 'whsec_test_fake';

process.env.PAYPAL_ENABLED = 'true';
process.env.PAYPAL_CLIENT_ID = 'test-paypal-client-id';
process.env.PAYPAL_CLIENT_SECRET = 'test-paypal-client-secret';
process.env.PAYPAL_WEBHOOK_ID = 'test-paypal-webhook-id';

process.env.SSLCOMMERZ_ENABLED = 'true';
process.env.SSLCOMMERZ_STORE_ID = 'test';
process.env.SSLCOMMERZ_STORE_PASSWORD = 'test';

process.env.AAMARPAY_ENABLED = 'true';
process.env.AAMARPAY_STORE_ID = 'test';
process.env.AAMARPAY_SIGNATURE_KEY = 'test';

process.env.COD_ENABLED = 'true';
