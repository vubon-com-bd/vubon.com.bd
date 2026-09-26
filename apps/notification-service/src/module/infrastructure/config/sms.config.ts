import { getOptionalEnv, getOptionalEnvInt } from '@vubon/shared-config/common';

export const SMS_CONFIG = Object.freeze({
  provider: getOptionalEnv('SMS_PROVIDER', 'twilio'),
  fromNumber: getOptionalEnv('SMS_FROM_NUMBER', ''),
  maxLength: getOptionalEnvInt('SMS_MAX_LENGTH', 160),
  maxPerDay: getOptionalEnvInt('SMS_MAX_PER_DAY', 20),
  timeoutMs: getOptionalEnvInt('SMS_TIMEOUT_MS', 30000),
});
