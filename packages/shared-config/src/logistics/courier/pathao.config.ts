/**
 * Pathao Courier configuration
 * @module shared-config/logistics/courier
 */
import { getOptionalEnv, getOptionalEnvBool, getOptionalEnvInt } from '../../common/env/env.helper';

export const PATHAO_CONFIG = Object.freeze({
  enabled: getOptionalEnvBool('PATHAO_ENABLED', false),
  clientId: getOptionalEnv('PATHAO_CLIENT_ID', ''),
  clientSecret: getOptionalEnv('PATHAO_CLIENT_SECRET', ''),
  username: getOptionalEnv('PATHAO_USERNAME', ''),
  password: getOptionalEnv('PATHAO_PASSWORD', ''),
  baseUrl: getOptionalEnv('PATHAO_BASE_URL', 'https://api-hermes.pathao.com'),
  storeId: getOptionalEnv('PATHAO_STORE_ID', ''),
  timeoutMs: getOptionalEnvInt('PATHAO_TIMEOUT_MS', 30000),
  supportsCOD: true,
  supportsInsurance: false,
  supportsSameDay: true,
  supportsOnDemand: true,
});
