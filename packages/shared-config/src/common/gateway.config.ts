export const gatewayConfig = {
  enabled: {
    sslcommerz: true,
    bkash: true,
    nagad: true,
    rocket: true,
    stripe: true,
    paypal: true,
    bank_transfer: true,
    cash_on_delivery: true,
  },
  default: 'sslcommerz',
  sslcommerz: {
    storeId: process.env.SSLCOMMERZ_STORE_ID || '',
    storePassword: process.env.SSLCOMMERZ_STORE_PASSWORD || '',
    sandbox: process.env.NODE_ENV !== 'production',
  },
  bkash: {
    appKey: process.env.BKASH_APP_KEY || '',
    appSecret: process.env.BKASH_APP_SECRET || '',
    sandbox: process.env.NODE_ENV !== 'production',
  },
  stripe: {
    secretKey: process.env.STRIPE_SECRET_KEY || '',
    webhookSecret: process.env.STRIPE_WEBHOOK_SECRET || '',
  },
  paypal: {
    clientId: process.env.PAYPAL_CLIENT_ID || '',
    clientSecret: process.env.PAYPAL_CLIENT_SECRET || '',
    sandbox: process.env.NODE_ENV !== 'production',
  },
};
