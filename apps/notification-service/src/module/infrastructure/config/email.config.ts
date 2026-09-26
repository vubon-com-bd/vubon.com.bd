import { getOptionalEnv, getOptionalEnvInt } from '@vubon/shared-config/common';

export const EMAIL_CONFIG = Object.freeze({
  provider: getOptionalEnv('EMAIL_PROVIDER', 'sendgrid'),
  fromAddress: getOptionalEnv('EMAIL_FROM_ADDRESS', 'no-reply@vubon.com'),
  fromName: getOptionalEnv('EMAIL_FROM_NAME', 'Vubon'),
  maxPerDay: getOptionalEnvInt('EMAIL_MAX_PER_DAY', 50),
  timeoutMs: getOptionalEnvInt('EMAIL_TIMEOUT_MS', 30000),
});
