import { TYPES as COMMON_TYPES } from '../../common/types.constants';

export const FREQUENTLY_BOUGHT = {
  TYPES: {
    ...COMMON_TYPES,
    TOGETHER: 'together',
    WITH: 'with',
    AFTER: 'after',
    INSTEAD: 'instead',
  },
  ASSOCIATION_RULES: {
    SUPPORT: 0.02,
    CONFIDENCE: 0.5,
    LIFT: 1.5,
  },
  MIN_TRANSACTIONS: 10,
  MAX_ASSOCIATIONS: 10,
  ANALYSIS_WINDOW_DAYS: 90,
  ASSOCIATION_UPDATE_INTERVAL_DAYS: 7,
} as const;
