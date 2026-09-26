/**
 * Nagad payment gateway configuration
 * @module shared-config/business/payment
 */
import { getOptionalEnv, getOptionalEnvBool, getOptionalEnvInt } from '../../common/env/env.helper';

export const NAGAD_CONFIG = Object.freeze({
  enabled: getOptionalEnvBool('NAGAD_ENABLED', false),
  merchantId: getOptionalEnv('NAGAD_MERCHANT_ID', ''),
  merchantPrivateKey: getOptionalEnv('NAGAD_MERCHANT_PRIVATE_KEY', ''),
  pgPublicKey: getOptionalEnv('NAGAD_PG_PUBLIC_KEY', ''),
  baseUrl: getOptionalEnv('NAGAD_BASE_URL', 'http://sandbox.mynagad.com:10080'),
  callbackUrl: getOptionalEnv('NAGAD_CALLBACK_URL', ''),
  timeoutMs: getOptionalEnvInt('NAGAD_TIMEOUT_MS', 30000),
});
