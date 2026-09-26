import { getOptionalEnvInt } from '@vubon/shared-config/common';

export const FORECAST_CONFIG = Object.freeze({
  defaultModel: 'linear_regression',
  defaultHorizonDays: getOptionalEnvInt('FORECAST_DEFAULT_HORIZON', 30),
  maxHorizonDays: getOptionalEnvInt('FORECAST_MAX_HORIZON', 365),
  minHistoricalPoints: getOptionalEnvInt('FORECAST_MIN_POINTS', 3),
  defaultWindowSize: getOptionalEnvInt('FORECAST_WINDOW_SIZE', 3),
} as const);
