import { getOptionalEnv, getOptionalEnvInt } from '@vubon/shared-config/common';

export const EMAIL_CONFIG = Object.freeze({
  provider: getOptionalEnv('EMAIL_PROVIDER', 'stub'),
  fromAddress: getOptionalEnv('EMAIL_FROM', 'noreply@vubon.com.bd'),
  fromName: getOptionalEnv('EMAIL_FROM_NAME', 'Vubon'),
  maxPerMinute: getOptionalEnvInt('EMAIL_MAX_PER_MINUTE', 100),
} as const);
