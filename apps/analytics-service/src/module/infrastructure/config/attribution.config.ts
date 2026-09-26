import { getOptionalEnvInt, getOptionalEnvBool } from '@vubon/shared-config/common';

export const ATTRIBUTION_CONFIG = Object.freeze({
  defaultModel: 'last_touch' as const,
  maxTouchpoints: getOptionalEnvInt('ATTRIBUTION_MAX_TOUCHPOINTS', 100),
  maxLookbackDays: getOptionalEnvInt('ATTRIBUTION_LOOKBACK_DAYS', 90),
  timeDecayHalfLifeDays: getOptionalEnvInt('ATTRIBUTION_DECAY_HALF_LIFE', 7),
  positionBasedFirstWeight: 0.4,
  positionBasedLastWeight: 0.4,
  computeAsync: getOptionalEnvBool('ATTRIBUTION_COMPUTE_ASYNC', true),
  cacheTtlSeconds: getOptionalEnvInt('ATTRIBUTION_CACHE_TTL', 3600),
} as const);
