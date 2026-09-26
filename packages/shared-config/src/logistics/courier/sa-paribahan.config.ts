/**
 * SA Paribahan courier configuration
 * @module shared-config/logistics/courier
 */
import { getOptionalEnv, getOptionalEnvBool, getOptionalEnvInt } from '../../common/env/env.helper';

export const SA_PARIBAHAN_CONFIG = Object.freeze({
  enabled: getOptionalEnvBool('SA_PARIBAHAN_ENABLED', false),
  apiKey: getOptionalEnv('SA_PARIBAHAN_API_KEY', ''),
  apiSecret: getOptionalEnv('SA_PARIBAHAN_API_SECRET', ''),
  baseUrl: getOptionalEnv('SA_PARIBAHAN_BASE_URL', ''),
  merchantId: getOptionalEnv('SA_PARIBAHAN_MERCHANT_ID', ''),
  timeoutMs: getOptionalEnvInt('SA_PARIBAHAN_TIMEOUT_MS', 30000),
  supportsCOD: true,
  supportsInsurance: false,
  coverage: 'nationwide',
});
