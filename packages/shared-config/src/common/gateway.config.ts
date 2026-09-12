import { getOptionalEnv } from './env/env.validation';
import { ENVIRONMENT } from '@vubon/shared-constants/src/common/environment.constants';

const nodeEnv = getOptionalEnv('NODE_ENV', ENVIRONMENT.DEVELOPMENT);
const sandbox = nodeEnv !== ENVIRONMENT.PRODUCTION;

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
    storeId: getOptionalEnv('SSLCOMMERZ_STORE_ID', ''),
    storePassword: getOptionalEnv('SSLCOMMERZ_STORE_PASSWORD', ''),
    sandbox,
  },
  bkash: {
    appKey: getOptionalEnv('BKASH_APP_KEY', ''),
    appSecret: getOptionalEnv('BKASH_APP_SECRET', ''),
    sandbox,
  },
  stripe: {
    secretKey: getOptionalEnv('STRIPE_SECRET_KEY', ''),
    webhookSecret: getOptionalEnv('STRIPE_WEBHOOK_SECRET', ''),
  },
  paypal: {
    clientId: getOptionalEnv('PAYPAL_CLIENT_ID', ''),
    clientSecret: getOptionalEnv('PAYPAL_CLIENT_SECRET', ''),
    sandbox,
  },
} as const;
