/**
 * RedX courier configuration
 * @module shared-config/logistics/courier
 */
import { getOptionalEnv, getOptionalEnvBool, getOptionalEnvInt } from '../../common/env/env.helper';

export const REDX_CONFIG = Object.freeze({
  enabled: getOptionalEnvBool('REDX_ENABLED', false),
  apiKey: getOptionalEnv('REDX_API_KEY', ''),
  baseUrl: getOptionalEnv('REDX_BASE_URL', 'https://openapi.redx.com.bd/v1.0.0-beta'),
  pickupStoreId: getOptionalEnv('REDX_PICKUP_STORE_ID', ''),
  timeoutMs: getOptionalEnvInt('REDX_TIMEOUT_MS', 30000),
  supportsCOD: true,
  supportsInsurance: true,
  supportsSameDay: true,
  webhookSecret: getOptionalEnv('REDX_WEBHOOK_SECRET', ''),
});
