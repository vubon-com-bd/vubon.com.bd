/**
 * Paperfly courier configuration
 * @module shared-config/logistics/courier
 */
import { getOptionalEnv, getOptionalEnvBool, getOptionalEnvInt } from '../../common/env/env.helper';

export const PAPERFLY_CONFIG = Object.freeze({
  enabled: getOptionalEnvBool('PAPERFLY_ENABLED', false),
  apiKey: getOptionalEnv('PAPERFLY_API_KEY', ''),
  apiSecret: getOptionalEnv('PAPERFLY_API_SECRET', ''),
  baseUrl: getOptionalEnv('PAPERFLY_BASE_URL', ''),
  merchantId: getOptionalEnv('PAPERFLY_MERCHANT_ID', ''),
  timeoutMs: getOptionalEnvInt('PAPERFLY_TIMEOUT_MS', 30000),
  supportsCOD: true,
  supportsInsurance: false,
  coverage: 'nationwide',
});
