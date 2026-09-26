/**
 * Twilio SMS configuration
 * @module shared-config/platform/notification
 */
import { getOptionalEnv, getOptionalEnvBool, getOptionalEnvInt } from '../../common/env/env.helper';

export const TWILIO_CONFIG = Object.freeze({
  enabled: getOptionalEnvBool('TWILIO_ENABLED', false),
  accountSid: getOptionalEnv('TWILIO_ACCOUNT_SID', ''),
  authToken: getOptionalEnv('TWILIO_AUTH_TOKEN', ''),
  messagingServiceSid: getOptionalEnv('TWILIO_MESSAGING_SERVICE_SID', ''),
  fromNumber: getOptionalEnv('TWILIO_FROM_NUMBER', ''),
  statusCallbackUrl: getOptionalEnv('TWILIO_STATUS_CALLBACK', ''),
  timeoutMs: getOptionalEnvInt('TWILIO_TIMEOUT_MS', 10000),
  maxRetries: getOptionalEnvInt('TWILIO_MAX_RETRIES', 3),
});
