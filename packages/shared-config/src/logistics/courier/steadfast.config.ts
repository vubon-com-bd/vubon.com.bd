/**
 * Steadfast courier configuration
 * @module shared-config/logistics/courier
 */
import { getOptionalEnv, getOptionalEnvBool, getOptionalEnvInt } from '../../common/env/env.helper';

export const STEADFAST_CONFIG = Object.freeze({
  enabled: getOptionalEnvBool('STEADFAST_ENABLED', false),
  apiKey: getOptionalEnv('STEADFAST_API_KEY', ''),
  apiSecret: getOptionalEnv('STEADFAST_API_SECRET', ''),
  baseUrl: getOptionalEnv('STEADFAST_BASE_URL', 'https://portal.packzy.com/api/v1'),
  timeoutMs: getOptionalEnvInt('STEADFAST_TIMEOUT_MS', 30000),
  supportsCOD: true,
  supportsInsurance: false,
  coverage: 'nationwide',
});
