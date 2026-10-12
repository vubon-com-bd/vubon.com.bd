/**
 * eCourier configuration
 * @module shared-config/logistics/courier
 */
import { getOptionalEnv, getOptionalEnvBool, getOptionalEnvInt } from '../../common/env/env.helper.js';

export const ECOURIER_CONFIG = Object.freeze({
  enabled: getOptionalEnvBool('ECOURIER_ENABLED', false),
  apiKey: getOptionalEnv('ECOURIER_API_KEY', ''),
  apiSecret: getOptionalEnv('ECOURIER_API_SECRET', ''),
  userId: getOptionalEnv('ECOURIER_USER_ID', ''),
  baseUrl: getOptionalEnv('ECOURIER_BASE_URL', 'https://backoffice.ecourier.com.bd/api'),
  timeoutMs: getOptionalEnvInt('ECOURIER_TIMEOUT_MS', 30000),
  supportsCOD: true,
  supportsInsurance: false,
  coverage: 'nationwide',
});
