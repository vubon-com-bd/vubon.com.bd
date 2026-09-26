/**
 * Firebase Cloud Messaging configuration
 * @module shared-config/platform/notification
 */
import { getOptionalEnv, getOptionalEnvBool, getOptionalEnvInt } from '../../common/env/env.helper';

export const FCM_CONFIG = Object.freeze({
  enabled: getOptionalEnvBool('FCM_ENABLED', false),
  projectId: getOptionalEnv('FCM_PROJECT_ID', ''),
  clientEmail: getOptionalEnv('FCM_CLIENT_EMAIL', ''),
  privateKey: getOptionalEnv('FCM_PRIVATE_KEY', ''),
  serviceAccountJson: getOptionalEnv('FCM_SERVICE_ACCOUNT_JSON', ''),
  timeoutMs: getOptionalEnvInt('FCM_TIMEOUT_MS', 10000),
  maxRetries: getOptionalEnvInt('FCM_MAX_RETRIES', 3),
});
