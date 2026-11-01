/**
 * TRC (Transport Corporation) configuration
 * @module shared-config/logistics/courier
 */
import { getOptionalEnv, getOptionalEnvBool, getOptionalEnvInt } from '../../common/env/env.helper.js';

export const TRC_CONFIG = Object.freeze({
  enabled: getOptionalEnvBool('TRC_ENABLED', false),
  apiKey: getOptionalEnv('TRC_API_KEY', ''),
  baseUrl: getOptionalEnv('TRC_BASE_URL', 'https://trc.gov.bd/api'),
  timeoutMs: getOptionalEnvInt('TRC_TIMEOUT_MS', 30000),
  supportsCOD: false,
  supportsInsurance: false,
  coverage: 'nationwide',
});
