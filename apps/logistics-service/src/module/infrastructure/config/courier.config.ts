import { getOptionalEnv, getOptionalEnvInt } from '@vubon/shared-config/common';

export const COURIER_CONFIG = Object.freeze({
  maxActiveCouriers: getOptionalEnvInt('COURIER_MAX_ACTIVE', 50),
  apiTimeoutMs: getOptionalEnvInt('COURIER_API_TIMEOUT_MS', 30000),
  retryAttempts: getOptionalEnvInt('COURIER_RETRY_ATTEMPTS', 3),
  autoSelectCheapest: getOptionalEnv('COURIER_AUTO_SELECT_CHEAPEST', 'false') === 'true',
});
