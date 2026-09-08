import { TYPES as COMMON_TYPES } from '../../common/types.constants';

export const ANALYTICS_RESULT = {
  TYPES: {
    ...COMMON_TYPES,
    TABLE: 'table',
    CHART: 'chart',
    METRIC: 'metric',
    CUSTOM: 'custom',
  },
  RESULT_FORMATS: {
    JSON: 'json',
    CSV: 'csv',
    TABLE: 'table',
    CHART: 'chart',
  },
  MAX_RESULT_SIZE: 10000,
  RESULT_CACHE_TTL_MINUTES: 5,
  DEFAULT_RESULT_FORMAT: 'json',
} as const;
