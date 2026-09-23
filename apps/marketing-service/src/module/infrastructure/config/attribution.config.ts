import { getOptionalEnv, getOptionalEnvInt } from '@vubon/shared-config/common';

export const ATTRIBUTION_CONFIG = Object.freeze({
  defaultModel: getOptionalEnv('ATTRIBUTION_DEFAULT_MODEL', 'last_click'),
  lookbackDays: getOptionalEnvInt('ATTRIBUTION_LOOKBACK_DAYS', 30),
  supportedModels: Object.freeze(['last_click', 'first_click', 'linear', 'time_decay']),
} as const);
