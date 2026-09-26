/**
 * Sundarban Courier configuration
 * @module shared-config/logistics/courier
 */
import { getOptionalEnv, getOptionalEnvBool, getOptionalEnvInt } from '../../common/env/env.helper';

export const SUNDARBAN_CONFIG = Object.freeze({
  enabled: getOptionalEnvBool('SUNDARBAN_ENABLED', false),
  apiKey: getOptionalEnv('SUNDARBAN_API_KEY', ''),
  baseUrl: getOptionalEnv('SUNDARBAN_BASE_URL', ''),
  merchantId: getOptionalEnv('SUNDARBAN_MERCHANT_ID', ''),
  timeoutMs: getOptionalEnvInt('SUNDARBAN_TIMEOUT_MS', 30000),
  supportsCOD: true,
  supportsInsurance: false,
  coverage: 'nationwide',
});
