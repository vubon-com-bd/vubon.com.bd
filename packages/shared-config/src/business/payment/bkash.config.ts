/**
 * bKash payment gateway configuration
 * @module shared-config/business/payment
 */
import { getOptionalEnv, getOptionalEnvBool, getOptionalEnvInt } from '../../common/env/env.helper';

export const BKASH_CONFIG = Object.freeze({
  enabled: getOptionalEnvBool('BKASH_ENABLED', false),
  appKey: getOptionalEnv('BKASH_APP_KEY', ''),
  appSecret: getOptionalEnv('BKASH_APP_SECRET', ''),
  username: getOptionalEnv('BKASH_USERNAME', ''),
  password: getOptionalEnv('BKASH_PASSWORD', ''),
  baseUrl: getOptionalEnv('BKASH_BASE_URL', 'https://tokenized.sandbox.bka.sh/v1.2.0-beta'),
  callbackUrl: getOptionalEnv('BKASH_CALLBACK_URL', ''),
  timeoutMs: getOptionalEnvInt('BKASH_TIMEOUT_MS', 30000),
});
