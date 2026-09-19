/**
 * Rocket (DBBL) payment gateway configuration
 * @module shared-config/business/payment
 */
import { getOptionalEnv, getOptionalEnvBool, getOptionalEnvInt } from '../../common/env/env.helper';

export const ROCKET_CONFIG = Object.freeze({
  enabled: getOptionalEnvBool('ROCKET_ENABLED', false),
  merchantId: getOptionalEnv('ROCKET_MERCHANT_ID', ''),
  apiKey: getOptionalEnv('ROCKET_API_KEY', ''),
  baseUrl: getOptionalEnv('ROCKET_BASE_URL', ''),
  callbackUrl: getOptionalEnv('ROCKET_CALLBACK_URL', ''),
  timeoutMs: getOptionalEnvInt('ROCKET_TIMEOUT_MS', 30000),
});
