import { getOptionalEnv, getOptionalEnvInt } from '@vubon/shared-config/common';

export const SMS_CONFIG = Object.freeze({
  provider: getOptionalEnv('SMS_PROVIDER', 'stub'),
  fromNumber: getOptionalEnv('SMS_FROM', ''),
  maxPerMinute: getOptionalEnvInt('SMS_MAX_PER_MINUTE', 100),
  maxSegments: getOptionalEnvInt('SMS_MAX_SEGMENTS', 3),
} as const);
