import { getOptionalEnv, getOptionalEnvInt } from '@vubon/shared-config/common';

export const PUSH_CONFIG = Object.freeze({
  provider: getOptionalEnv('PUSH_PROVIDER', 'fcm'),
  maxPerDay: getOptionalEnvInt('PUSH_MAX_PER_DAY', 100),
  timeoutMs: getOptionalEnvInt('PUSH_TIMEOUT_MS', 30000),
});
