/**
 * Karatoya Courier configuration
 * @module shared-config/logistics/courier
 */
import { getOptionalEnv, getOptionalEnvBool, getOptionalEnvInt } from '../../common/env/env.helper.js';

export const KARATOYA_CONFIG = Object.freeze({
  enabled: getOptionalEnvBool('KARATOYA_ENABLED', false),
  apiKey: getOptionalEnv('KARATOYA_API_KEY', ''),
  apiSecret: getOptionalEnv('KARATOYA_API_SECRET', ''),
  baseUrl: getOptionalEnv('KARATOYA_BASE_URL', 'https://karatoya.com.bd/api'),
  timeoutMs: getOptionalEnvInt('KARATOYA_TIMEOUT_MS', 30000),
  supportsCOD: true,
  supportsInsurance: false,
  coverage: 'nationwide',
});
