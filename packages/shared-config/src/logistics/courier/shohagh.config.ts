/**
 * Shohagh Paribahan configuration
 * @module shared-config/logistics/courier
 */
import { getOptionalEnv, getOptionalEnvBool, getOptionalEnvInt } from '../../common/env/env.helper.js';

export const SHOHAGH_CONFIG = Object.freeze({
  enabled: getOptionalEnvBool('SHOHAGH_ENABLED', false),
  apiKey: getOptionalEnv('SHOHAGH_API_KEY', ''),
  baseUrl: getOptionalEnv('SHOHAGH_BASE_URL', 'https://shohagh.com/api'),
  timeoutMs: getOptionalEnvInt('SHOHAGH_TIMEOUT_MS', 30000),
  supportsCOD: true,
  supportsInsurance: false,
  coverage: 'nationwide',
});
