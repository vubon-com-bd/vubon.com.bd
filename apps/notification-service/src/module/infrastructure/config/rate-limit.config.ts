/**
 * Rate Limit Config
 * @module notification-service/infrastructure/config
 */
import { getOptionalEnvInt } from '@vubon/shared-config/common';

export const RATE_LIMIT_INFRA_CONFIG = Object.freeze({
  perUserPerSecond: getOptionalEnvInt('RATE_LIMIT_USER_PER_SEC', 5),
  perChannelPerSecond: getOptionalEnvInt('RATE_LIMIT_CHANNEL_PER_SEC', 100),
  perProviderPerSecond: getOptionalEnvInt('RATE_LIMIT_PROVIDER_PER_SEC', 500),
  globalPerSecond: getOptionalEnvInt('RATE_LIMIT_GLOBAL_PER_SEC', 1000),
  windowSeconds: getOptionalEnvInt('RATE_LIMIT_WINDOW_SEC', 1),
  burstMultiplier: getOptionalEnvInt('RATE_LIMIT_BURST_MULT', 2),
});
