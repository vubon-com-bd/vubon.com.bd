import { getOptionalEnv, getOptionalEnvInt } from '@vubon/shared-config/common';

export const ROUTE_CONFIG = Object.freeze({
  maxStopsPerRoute: getOptionalEnvInt('ROUTE_MAX_STOPS', 50),
  defaultOptimization: getOptionalEnv('ROUTE_DEFAULT_OPTIMIZATION', 'balanced'),
});
