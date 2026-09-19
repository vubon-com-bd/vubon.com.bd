/**
 * AWS SES configuration
 * @module shared-config/platform/notification
 */
import { getOptionalEnv, getOptionalEnvBool, getOptionalEnvInt } from '../../common/env/env.helper';

export const SES_CONFIG = Object.freeze({
  enabled: getOptionalEnvBool('SES_ENABLED', false),
  region: getOptionalEnv('SES_REGION', 'ap-south-1'),
  accessKeyId: getOptionalEnv('SES_ACCESS_KEY_ID', ''),
  secretAccessKey: getOptionalEnv('SES_SECRET_ACCESS_KEY', ''),
  configurationSet: getOptionalEnv('SES_CONFIG_SET', ''),
  maxSendRatePerSecond: getOptionalEnvInt('SES_MAX_SEND_RATE', 14),
  timeoutMs: getOptionalEnvInt('SES_TIMEOUT_MS', 10000),
});
